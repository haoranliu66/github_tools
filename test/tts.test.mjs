import assert from 'node:assert/strict';
import {mkdtempSync, readFileSync, rmSync, writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import test from 'node:test';
import {
  preflightTts,
  publicTtsMetadata,
  registerQwenVoice,
  resolveQwenServiceConfig,
  resolveTtsConfig,
  synthesizeNarrationJobs,
} from '../apps/video-factory/src/tts.mjs';

const voiceId = '0123456789abcdef0123456789abcdef';

function wave() {
  const buffer = Buffer.alloc(44);
  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(36, 4);
  buffer.write('WAVE', 8);
  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16);
  buffer.writeUInt16LE(1, 20);
  buffer.writeUInt16LE(1, 22);
  buffer.writeUInt32LE(24000, 24);
  buffer.writeUInt32LE(48000, 28);
  buffer.writeUInt16LE(2, 32);
  buffer.writeUInt16LE(16, 34);
  buffer.write('data', 36);
  buffer.writeUInt32LE(0, 40);
  return buffer;
}

test('Qwen TTS configuration is explicit and never exposes the API key in metadata', () => {
  assert.throws(() => resolveTtsConfig({}), /VIDEO_TTS_PROVIDER/);
  const config = resolveTtsConfig({
    VIDEO_TTS_PROVIDER: 'qwen', QWEN_TTS_BASE_URL: 'http://127.0.0.1:8000',
    QWEN_TTS_API_KEY: 'top-secret', QWEN_TTS_VOICE_ID: voiceId,
  });
  assert.equal(config.provider, 'qwen');
  assert.deepEqual(publicTtsMetadata(config), {
    provider: 'qwen', service: 'http://127.0.0.1:8000', voiceId, language: 'Chinese',
  });
  assert.equal(JSON.stringify(publicTtsMetadata(config)).includes('top-secret'), false);
});

test('Qwen preflight verifies health, authentication, and the registered voice', async () => {
  const config = resolveTtsConfig({
    VIDEO_TTS_PROVIDER: 'qwen', QWEN_TTS_BASE_URL: 'http://127.0.0.1:8000',
    QWEN_TTS_API_KEY: 'top-secret', QWEN_TTS_VOICE_ID: voiceId,
  });
  const fetchImpl = async (url, options = {}) => {
    if (url.endsWith('/health')) return Response.json({status: 'ok', model: 'Qwen', cuda: 'GPU'});
    assert.equal(options.headers.Authorization, 'Bearer top-secret');
    return Response.json({voices: [{voice_id: voiceId, name: 'narrator'}]});
  };
  const result = await preflightTts(config, {fetchImpl});
  assert.equal(result.voiceName, 'narrator');
  assert.equal(result.model, 'Qwen');
});

test('Qwen synthesis posts serial jobs and writes validated WAV files', async () => {
  const directory = mkdtempSync(join(tmpdir(), 'zimeiti-tts-'));
  try {
    const config = resolveTtsConfig({
      VIDEO_TTS_PROVIDER: 'qwen', QWEN_TTS_BASE_URL: 'http://127.0.0.1:8000',
      QWEN_TTS_API_KEY: 'top-secret', QWEN_TTS_VOICE_ID: voiceId,
    });
    const requests = [];
    const fetchImpl = async (url, options) => {
      requests.push({url, options, body: JSON.parse(options.body)});
      return new Response(wave(), {status: 200, headers: {'Content-Type': 'audio/wav'}});
    };
    const jobs = [
      {text: '第一句', path: join(directory, 'one.wav')},
      {text: '第二句', path: join(directory, 'two.wav')},
    ];
    const result = await synthesizeNarrationJobs(jobs, config, {fetchImpl});
    assert.equal(result.count, 2);
    assert.deepEqual(requests.map((request) => request.body.text), ['第一句', '第二句']);
    assert.equal(requests.every((request) => request.options.headers.Authorization === 'Bearer top-secret'), true);
    assert.equal(readFileSync(jobs[0].path).toString('ascii', 0, 4), 'RIFF');
    assert.equal(readFileSync(jobs[1].path).toString('ascii', 8, 12), 'WAVE');
  } finally {
    rmSync(directory, {recursive: true, force: true});
  }
});

test('Windows narration remains available only when explicitly selected', () => {
  assert.deepEqual(resolveTtsConfig({VIDEO_TTS_PROVIDER: 'windows'}), {
    provider: 'windows', voice: 'Microsoft Huihui Desktop', rate: 1,
  });
});

test('voice registration works before a default voice is selected', async () => {
  const directory = mkdtempSync(join(tmpdir(), 'zimeiti-voice-register-'));
  try {
    const audioPath = join(directory, 'reference.wav');
    writeFileSync(audioPath, wave());
    const config = resolveQwenServiceConfig({
      QWEN_TTS_BASE_URL: 'http://127.0.0.1:8000', QWEN_TTS_API_KEY: 'top-secret',
    }, {requireVoice: false});
    const fetchImpl = async (url, options) => {
      assert.equal(url, 'http://127.0.0.1:8000/v1/voices');
      assert.equal(options.method, 'POST');
      assert.equal(options.headers.Authorization, 'Bearer top-secret');
      assert.equal(options.body.get('name'), 'second-voice');
      assert.equal(options.body.get('ref_text'), '准确逐字稿');
      assert.equal(options.body.get('ref_audio').name, 'reference.wav');
      return Response.json({voice_id: voiceId, name: 'second-voice'});
    };
    const result = await registerQwenVoice({
      name: 'second-voice', audioPath, refText: '准确逐字稿',
    }, config, {fetchImpl});
    assert.deepEqual(result, {voiceId, name: 'second-voice'});
  } finally {
    rmSync(directory, {recursive: true, force: true});
  }
});
