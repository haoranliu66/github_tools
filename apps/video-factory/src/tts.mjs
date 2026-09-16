import {mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {basename, dirname, extname} from 'node:path';

const DEFAULT_QWEN_TIMEOUT_MS = 20 * 60 * 1000;

function required(value, name) {
  const normalized = String(value ?? '').trim();
  if (!normalized) throw new Error(`${name} is required.`);
  return normalized;
}

function qwenEndpoint(baseUrl, path) {
  return new URL(path, `${baseUrl.replace(/\/$/, '')}/`).toString();
}

function bearer(config) {
  return {Authorization: `Bearer ${config.apiKey}`};
}

async function responseError(response) {
  const detail = (await response.text()).slice(0, 500).replace(/\s+/g, ' ').trim();
  return `HTTP ${response.status}${detail ? `: ${detail}` : ''}`;
}

function assertWave(buffer) {
  if (buffer.length < 44 || buffer.toString('ascii', 0, 4) !== 'RIFF' ||
      buffer.toString('ascii', 8, 12) !== 'WAVE') {
    throw new Error('Qwen TTS returned an invalid WAV payload.');
  }
}

export function resolveTtsConfig(env = process.env) {
  const provider = required(env.VIDEO_TTS_PROVIDER, 'VIDEO_TTS_PROVIDER').toLowerCase();
  if (provider === 'windows') {
    const rate = Number(env.WINDOWS_TTS_RATE ?? 1);
    if (!Number.isInteger(rate) || rate < -10 || rate > 10) {
      throw new Error('WINDOWS_TTS_RATE must be an integer from -10 to 10.');
    }
    return {
      provider,
      voice: String(env.WINDOWS_TTS_VOICE ?? 'Microsoft Huihui Desktop').trim(),
      rate,
    };
  }
  if (provider !== 'qwen') throw new Error('VIDEO_TTS_PROVIDER must be qwen or windows.');

  return resolveQwenServiceConfig(env);
}

export function resolveQwenServiceConfig(env = process.env, {requireVoice = true} = {}) {
  const baseUrl = required(env.QWEN_TTS_BASE_URL, 'QWEN_TTS_BASE_URL');
  const parsedUrl = new URL(baseUrl);
  if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
    throw new Error('QWEN_TTS_BASE_URL must use http or https.');
  }
  const voiceId = String(env.QWEN_TTS_VOICE_ID ?? '').trim();
  if (requireVoice && !voiceId) throw new Error('QWEN_TTS_VOICE_ID is required.');
  if (voiceId && !/^[a-f0-9]{32}$/i.test(voiceId)) {
    throw new Error('QWEN_TTS_VOICE_ID must be a 32-character hexadecimal ID.');
  }
  const timeoutMs = Number(env.QWEN_TTS_TIMEOUT_MS ?? DEFAULT_QWEN_TIMEOUT_MS);
  if (!Number.isInteger(timeoutMs) || timeoutMs < 1000) {
    throw new Error('QWEN_TTS_TIMEOUT_MS must be an integer of at least 1000.');
  }
  return {
    provider: 'qwen',
    baseUrl: parsedUrl.toString().replace(/\/$/, ''),
    apiKey: required(env.QWEN_TTS_API_KEY, 'QWEN_TTS_API_KEY'),
    voiceId: voiceId ? voiceId.toLowerCase() : null,
    language: String(env.QWEN_TTS_LANGUAGE ?? 'Chinese').trim() || 'Chinese',
    timeoutMs,
  };
}

export async function listQwenVoices(config, {fetchImpl = fetch} = {}) {
  const response = await fetchImpl(qwenEndpoint(config.baseUrl, '/v1/voices'), {
    headers: bearer(config),
    signal: AbortSignal.timeout(Math.min(config.timeoutMs, 30_000)),
  });
  if (!response.ok) throw new Error(`Qwen TTS voice lookup failed: ${await responseError(response)}`);
  const body = await response.json();
  return Array.isArray(body.voices) ? body.voices : [];
}

export async function registerQwenVoice({name, audioPath, refText}, config, {fetchImpl = fetch} = {}) {
  const cleanName = required(name, 'Voice name');
  const cleanText = required(refText, 'Reference transcript');
  const cleanPath = required(audioPath, 'Reference audio path');
  const extension = extname(cleanPath).toLowerCase();
  const supported = new Set(['.wav', '.mp3', '.flac', '.m4a', '.ogg', '.opus']);
  if (!supported.has(extension)) throw new Error(`Unsupported reference audio type: ${extension || 'unknown'}`);
  const audio = readFileSync(cleanPath);
  if (!audio.length) throw new Error('Reference audio is empty.');
  if (audio.length > 20 * 1024 * 1024) throw new Error('Reference audio exceeds the 20 MB service limit.');
  const form = new FormData();
  form.append('name', cleanName);
  form.append('ref_text', cleanText);
  form.append('ref_audio', new Blob([audio]), basename(cleanPath));
  const response = await fetchImpl(qwenEndpoint(config.baseUrl, '/v1/voices'), {
    method: 'POST',
    headers: bearer(config),
    body: form,
    signal: AbortSignal.timeout(config.timeoutMs),
  });
  if (!response.ok) throw new Error(`Qwen TTS voice registration failed: ${await responseError(response)}`);
  const result = await response.json();
  if (!/^[a-f0-9]{32}$/i.test(result.voice_id ?? '')) {
    throw new Error('Qwen TTS returned an invalid voice_id.');
  }
  return {voiceId: result.voice_id.toLowerCase(), name: result.name ?? cleanName};
}

export function publicTtsMetadata(config) {
  if (config.provider === 'windows') {
    return {provider: 'windows', voice: config.voice, rate: config.rate};
  }
  return {
    provider: 'qwen',
    service: config.baseUrl,
    voiceId: config.voiceId,
    language: config.language,
  };
}

export async function preflightTts(config, {fetchImpl = fetch} = {}) {
  if (config.provider === 'windows') return publicTtsMetadata(config);
  let health;
  try {
    const response = await fetchImpl(qwenEndpoint(config.baseUrl, '/health'), {
      signal: AbortSignal.timeout(Math.min(config.timeoutMs, 30_000)),
    });
    if (!response.ok) throw new Error(await responseError(response));
    health = await response.json();
  } catch (error) {
    throw new Error(`Qwen TTS health check failed. Verify the SSH tunnel and service: ${error.message}`);
  }

  let voices;
  try {
    voices = await listQwenVoices(config, {fetchImpl});
  } catch (error) {
    throw new Error(`Qwen TTS authentication or voice lookup failed: ${error.message}`);
  }
  const voice = voices.find((item) => item.voice_id === config.voiceId);
  if (!voice) throw new Error(`Qwen TTS voice is not registered: ${config.voiceId}`);
  return {...publicTtsMetadata(config), model: health.model, cuda: health.cuda, voiceName: voice.name};
}

export async function synthesizeNarrationJobs(jobs, config, {fetchImpl = fetch} = {}) {
  if (config.provider !== 'qwen') throw new Error('Remote synthesis requires the qwen provider.');
  if (!Array.isArray(jobs) || jobs.length === 0) throw new Error('Narration jobs are required.');
  const endpoint = qwenEndpoint(config.baseUrl, '/v1/audio/speech');
  for (const [index, job] of jobs.entries()) {
    const text = required(job?.text, `jobs[${index}].text`);
    const path = required(job?.path, `jobs[${index}].path`);
    if (text.length > 1000) throw new Error(`jobs[${index}].text exceeds the service limit of 1000 characters.`);
    let response;
    try {
      response = await fetchImpl(endpoint, {
        method: 'POST',
        headers: {...bearer(config), 'Content-Type': 'application/json; charset=utf-8'},
        body: JSON.stringify({voice_id: config.voiceId, text, language: config.language}),
        signal: AbortSignal.timeout(config.timeoutMs),
      });
    } catch (error) {
      throw new Error(`Qwen TTS request ${index + 1}/${jobs.length} failed: ${error.message}`);
    }
    if (!response.ok) {
      throw new Error(`Qwen TTS request ${index + 1}/${jobs.length} failed: ${await responseError(response)}`);
    }
    const wave = Buffer.from(await response.arrayBuffer());
    assertWave(wave);
    mkdirSync(dirname(path), {recursive: true});
    writeFileSync(path, wave);
  }
  return {provider: 'qwen', count: jobs.length};
}
