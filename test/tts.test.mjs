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
  synthesizeNarrationBlocks,
  synthesizeNarrationJobs,
} from '../apps/video-factory/src/tts.mjs';

const voiceId = '0123456789abcdef0123456789abcdef';

function wave(seconds = 0) {
  const dataBytes = Math.round(48000 * seconds);
  const buffer = Buffer.alloc(44 + dataBytes);
  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(36 + dataBytes, 4);
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
  buffer.writeUInt32LE(dataBytes, 40);
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
    if (url.endsWith('/health')) {
      return Response.json({
        status: 'ok', model: 'Qwen', cuda: 'GPU', max_new_tokens: 1024, max_text_chars: 1000,
      });
    }
    assert.equal(options.headers.Authorization, 'Bearer top-secret');
    return Response.json({voices: [{voice_id: voiceId, name: 'narrator'}]});
  };
  const result = await preflightTts(config, {fetchImpl});
  assert.equal(result.voiceName, 'narrator');
  assert.equal(result.model, 'Qwen');
  assert.equal(result.maxNewTokens, 1024);
  assert.equal(result.maxTextCharacters, 1000);
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

test('fixed episode sampling is sent unchanged with every narration request', async () => {
  const directory = mkdtempSync(join(tmpdir(), 'zimeiti-tts-fixed-sampling-'));
  try {
    const config = resolveTtsConfig({
      VIDEO_TTS_PROVIDER: 'qwen', QWEN_TTS_BASE_URL: 'http://127.0.0.1:8000',
      QWEN_TTS_API_KEY: 'top-secret', QWEN_TTS_VOICE_ID: voiceId,
      QWEN_TTS_SEED: '20260918', QWEN_TTS_TEMPERATURE: '0.8',
      QWEN_TTS_SUBTALKER_TEMPERATURE: '0.8',
    });
    const bodies = [];
    const fetchImpl = async (_url, options) => {
      bodies.push(JSON.parse(options.body));
      return new Response(wave(2), {status: 200});
    };
    await synthesizeNarrationJobs([
      {text: '第一段。', path: join(directory, 'one.wav')},
      {text: '第二段。', path: join(directory, 'two.wav')},
    ], config, {fetchImpl});
    const expected = {
      seed: 20260918,
      do_sample: true,
      top_k: 50,
      top_p: 1,
      temperature: 0.8,
      repetition_penalty: 1.05,
      subtalker_dosample: true,
      subtalker_top_k: 50,
      subtalker_top_p: 1,
      subtalker_temperature: 0.8,
    };
    assert.equal(bodies.length, 2);
    for (const body of bodies) {
      assert.deepEqual(Object.fromEntries(Object.keys(expected).map((key) => [key, body[key]])), expected);
    }
    assert.deepEqual(publicTtsMetadata(config).sampling, {
      mode: 'episode-fixed',
      seed: 20260918,
      doSample: true,
      topK: 50,
      topP: 1,
      temperature: 0.8,
      repetitionPenalty: 1.05,
      subtalkerDoSample: true,
      subtalkerTopK: 50,
      subtalkerTopP: 1,
      subtalkerTemperature: 0.8,
    });
  } finally {
    rmSync(directory, {recursive: true, force: true});
  }
});

test('Qwen synthesis retries overlong clips before writing narration', async () => {
  const directory = mkdtempSync(join(tmpdir(), 'zimeiti-tts-retry-'));
  try {
    const config = resolveTtsConfig({
      VIDEO_TTS_PROVIDER: 'qwen', QWEN_TTS_BASE_URL: 'http://127.0.0.1:8000',
      QWEN_TTS_API_KEY: 'top-secret', QWEN_TTS_VOICE_ID: voiceId,
    });
    let requests = 0;
    const fetchImpl = async () => {
      requests += 1;
      return new Response(wave(requests === 1 ? 9 : 3), {status: 200});
    };
    const path = join(directory, 'retry.wav');
    const result = await synthesizeNarrationJobs([{text: '精简口播', path}], config, {
      fetchImpl, maxSeconds: 8.26, maxAttempts: 3,
    });
    assert.equal(result.count, 1);
    assert.equal(requests, 2);
    assert.equal(readFileSync(path).length, wave(3).length);
  } finally {
    rmSync(directory, {recursive: true, force: true});
  }
});

test('adaptive Qwen blocks split measured overlong audio and write only final blocks', async () => {
  const directory = mkdtempSync(join(tmpdir(), 'zimeiti-tts-blocks-'));
  try {
    const config = resolveTtsConfig({
      VIDEO_TTS_PROVIDER: 'qwen', QWEN_TTS_BASE_URL: 'http://127.0.0.1:8000',
      QWEN_TTS_API_KEY: 'top-secret', QWEN_TTS_VOICE_ID: voiceId,
    });
    const segments = [0, 1, 2, 3].map((sceneIndex) => ({
      sceneIndex, sentenceIndex: 0, text: `第${sceneIndex + 1}句。`, sentenceEnd: true, topic: 'mechanism',
    }));
    const blocks = [{
      id: 'block-000', profile: 'code-analysis', segments,
      text: segments.map((item) => item.text).join(''), sceneIndexes: [0, 1, 2, 3],
      sceneCount: 4, topics: ['mechanism'], primaryTopic: 'mechanism',
    }];
    const fetchImpl = async (_url, options) => {
      const text = JSON.parse(options.body).text;
      return new Response(wave(text.includes('第1句') && text.includes('第3句') ? 70 : 20), {status: 200});
    };
    const result = await synthesizeNarrationBlocks(blocks, config, {
      fetchImpl, outputDirectory: directory, maxSeconds: 64, shortBlockSeconds: 0,
    });
    assert.equal(result.blocks.length, 2);
    assert.equal(result.stats.splitCount, 1);
    assert.ok(result.blocks.every((block) => readFileSync(block.path).toString('ascii', 0, 4) === 'RIFF'));
    assert.equal(result.blocks.map((block) => block.text).join(''), blocks[0].text);
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
