import {mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {basename, dirname, extname, join} from 'node:path';
import {wavDuration} from './narration.mjs';
import {fitNarrationBlocks} from './narration-blocks.mjs';

const DEFAULT_QWEN_TIMEOUT_MS = 20 * 60 * 1000;
const FIXED_SAMPLING_CONTROLS = [
  'seed',
  'do_sample',
  'top_k',
  'top_p',
  'temperature',
  'repetition_penalty',
  'subtalker_dosample',
  'subtalker_top_k',
  'subtalker_top_p',
  'subtalker_temperature',
];

function required(value, name) {
  const normalized = String(value ?? '').trim();
  if (!normalized) throw new Error(`${name} is required.`);
  return normalized;
}

function boundedNumber(value, name, fallback, {integer = false, minimum, maximum}) {
  const normalized = String(value ?? '').trim();
  const number = normalized ? Number(normalized) : fallback;
  if (!Number.isFinite(number) || (integer && !Number.isInteger(number)) ||
      number < minimum || number > maximum) {
    const kind = integer ? 'an integer' : 'a number';
    throw new Error(`${name} must be ${kind} from ${minimum} to ${maximum}.`);
  }
  return number;
}

function booleanSetting(value, name, fallback) {
  const normalized = String(value ?? '').trim().toLowerCase();
  if (!normalized) return fallback;
  if (['1', 'true', 'yes'].includes(normalized)) return true;
  if (['0', 'false', 'no'].includes(normalized)) return false;
  throw new Error(`${name} must be true or false.`);
}

function fixedSampling(env) {
  const seedValue = String(env.QWEN_TTS_SEED ?? '').trim();
  if (!seedValue) return null;
  return {
    mode: 'episode-fixed',
    seed: boundedNumber(seedValue, 'QWEN_TTS_SEED', 0, {
      integer: true, minimum: 0, maximum: 2147483647,
    }),
    doSample: booleanSetting(env.QWEN_TTS_DO_SAMPLE, 'QWEN_TTS_DO_SAMPLE', true),
    topK: boundedNumber(env.QWEN_TTS_TOP_K, 'QWEN_TTS_TOP_K', 50, {
      integer: true, minimum: 1, maximum: 1000,
    }),
    topP: boundedNumber(env.QWEN_TTS_TOP_P, 'QWEN_TTS_TOP_P', 1, {
      minimum: 0.01, maximum: 1,
    }),
    temperature: boundedNumber(env.QWEN_TTS_TEMPERATURE, 'QWEN_TTS_TEMPERATURE', 0.9, {
      minimum: 0.01, maximum: 2,
    }),
    repetitionPenalty: boundedNumber(
      env.QWEN_TTS_REPETITION_PENALTY,
      'QWEN_TTS_REPETITION_PENALTY',
      1.05,
      {minimum: 0.1, maximum: 2},
    ),
    subtalkerDoSample: booleanSetting(
      env.QWEN_TTS_SUBTALKER_DO_SAMPLE,
      'QWEN_TTS_SUBTALKER_DO_SAMPLE',
      true,
    ),
    subtalkerTopK: boundedNumber(env.QWEN_TTS_SUBTALKER_TOP_K, 'QWEN_TTS_SUBTALKER_TOP_K', 50, {
      integer: true, minimum: 1, maximum: 1000,
    }),
    subtalkerTopP: boundedNumber(env.QWEN_TTS_SUBTALKER_TOP_P, 'QWEN_TTS_SUBTALKER_TOP_P', 1, {
      minimum: 0.01, maximum: 1,
    }),
    subtalkerTemperature: boundedNumber(
      env.QWEN_TTS_SUBTALKER_TEMPERATURE,
      'QWEN_TTS_SUBTALKER_TEMPERATURE',
      0.9,
      {minimum: 0.01, maximum: 2},
    ),
  };
}

function qwenSpeechBody(text, config) {
  const body = {voice_id: config.voiceId, text, language: config.language};
  if (!config.sampling) return body;
  return {
    ...body,
    seed: config.sampling.seed,
    do_sample: config.sampling.doSample,
    top_k: config.sampling.topK,
    top_p: config.sampling.topP,
    temperature: config.sampling.temperature,
    repetition_penalty: config.sampling.repetitionPenalty,
    subtalker_dosample: config.sampling.subtalkerDoSample,
    subtalker_top_k: config.sampling.subtalkerTopK,
    subtalker_top_p: config.sampling.subtalkerTopP,
    subtalker_temperature: config.sampling.subtalkerTemperature,
  };
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

async function requestQwenWave(text, config, fetchImpl, label) {
  const endpoint = qwenEndpoint(config.baseUrl, '/v1/audio/speech');
  let response;
  try {
    response = await fetchImpl(endpoint, {
      method: 'POST',
      headers: {...bearer(config), 'Content-Type': 'application/json; charset=utf-8'},
      body: JSON.stringify(qwenSpeechBody(text, config)),
      signal: AbortSignal.timeout(config.timeoutMs),
    });
  } catch (error) {
    const wrapped = new Error(`Qwen TTS ${label} failed: ${error.message}`);
    wrapped.name = error.name;
    throw wrapped;
  }
  if (!response.ok) throw new Error(`Qwen TTS ${label} failed: ${await responseError(response)}`);
  const wave = Buffer.from(await response.arrayBuffer());
  assertWave(wave);
  return wave;
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
    sampling: fixedSampling(env),
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
    ...(config.sampling ? {sampling: config.sampling} : {}),
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
    throw new Error(`Qwen TTS health check failed. Verify the automatic tunnel and service configuration: ${error.message}`);
  }

  let voices;
  try {
    voices = await listQwenVoices(config, {fetchImpl});
  } catch (error) {
    throw new Error(`Qwen TTS authentication or voice lookup failed: ${error.message}`);
  }
  const voice = voices.find((item) => item.voice_id === config.voiceId);
  if (!voice) throw new Error(`Qwen TTS voice is not registered: ${config.voiceId}`);
  const generationLimit = Number(health.max_new_tokens);
  const textLimit = Number(health.max_text_chars);
  const samplingControls = Array.isArray(health.sampling_controls)
    ? health.sampling_controls.filter((item) => typeof item === 'string')
    : [];
  if (config.sampling) {
    const missing = FIXED_SAMPLING_CONTROLS.filter((item) => !samplingControls.includes(item));
    if (missing.length) {
      throw new Error(`Qwen TTS service does not support fixed sampling controls: ${missing.join(', ')}.`);
    }
  }
  return {
    ...publicTtsMetadata(config),
    model: health.model,
    cuda: health.cuda,
    voiceName: voice.name,
    ...(Number.isInteger(generationLimit) ? {maxNewTokens: generationLimit} : {}),
    ...(Number.isInteger(textLimit) ? {maxTextCharacters: textLimit} : {}),
    ...(samplingControls.length ? {samplingControls} : {}),
  };
}

export async function synthesizeNarrationJobs(jobs, config, {
  fetchImpl = fetch, maxSeconds = null, maxAttempts = 1,
} = {}) {
  if (config.provider !== 'qwen') throw new Error('Remote synthesis requires the qwen provider.');
  if (!Array.isArray(jobs) || jobs.length === 0) throw new Error('Narration jobs are required.');
  if (maxSeconds !== null && (!Number.isFinite(maxSeconds) || maxSeconds <= 0)) {
    throw new Error('maxSeconds must be a positive number.');
  }
  if (!Number.isInteger(maxAttempts) || maxAttempts < 1 || maxAttempts > 5) {
    throw new Error('maxAttempts must be an integer from 1 to 5.');
  }
  for (const [index, job] of jobs.entries()) {
    const text = required(job?.text, `jobs[${index}].text`);
    const path = required(job?.path, `jobs[${index}].path`);
    if (text.length > 1000) throw new Error(`jobs[${index}].text exceeds the service limit of 1000 characters.`);
    let wave;
    const rejectedDurations = [];
    for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
      wave = await requestQwenWave(text, config, fetchImpl, `request ${index + 1}/${jobs.length}`);
      if (maxSeconds === null) break;
      const duration = wavDuration(wave);
      if (duration <= maxSeconds) break;
      rejectedDurations.push(Number(duration.toFixed(3)));
      wave = null;
    }
    if (!wave) {
      throw new Error(`Qwen TTS request ${index + 1}/${jobs.length} exceeded ${maxSeconds}s ` +
        `after ${maxAttempts} attempts (${rejectedDurations.join(', ')}s).`);
    }
    mkdirSync(dirname(path), {recursive: true});
    writeFileSync(path, wave);
  }
  return {provider: 'qwen', count: jobs.length};
}

export async function synthesizeNarrationBlocks(blocks, config, {
  fetchImpl = fetch,
  outputDirectory,
  maxCharacters = 1000,
  maxSeconds = 64,
  maxScenes = 6,
  shortBlockSeconds = 8,
} = {}) {
  if (config.provider !== 'qwen') throw new Error('Adaptive narration blocks require the qwen provider.');
  const directory = required(outputDirectory, 'outputDirectory');
  const fitted = await fitNarrationBlocks(blocks, async (block) => {
    const wave = await requestQwenWave(block.text, config, fetchImpl, `block ${block.id ?? 'pending'}`);
    return {wave, duration: wavDuration(wave)};
  }, {maxCharacters, maxSeconds, maxScenes, shortBlockSeconds});

  mkdirSync(directory, {recursive: true});
  const written = fitted.blocks.map((block, index) => {
    const path = join(directory, `block-${String(index).padStart(3, '0')}.wav`);
    writeFileSync(path, block.wave);
    const {wave, ...metadata} = block;
    return {...metadata, path};
  });
  return {provider: 'qwen', count: written.length, blocks: written, stats: fitted.stats};
}
