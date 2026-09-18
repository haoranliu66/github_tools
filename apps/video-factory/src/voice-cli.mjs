#!/usr/bin/env node
import {readFileSync, renameSync, writeFileSync} from 'node:fs';
import {dirname, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {ensureQwenTransport} from './qwen-tunnel.mjs';
import {
  listQwenVoices,
  preflightTts,
  registerQwenVoice,
  resolveQwenServiceConfig,
  resolveTtsConfig,
} from './tts.mjs';

const PROJECT_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../../..');
const ENV_PATH = resolve(PROJECT_ROOT, '.env.local');

function optionValue(name) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : null;
}

function requireOption(name) {
  const value = optionValue(name);
  if (!value) throw new Error(`${name} is required.`);
  return value;
}

function activateVoice(voiceId) {
  if (!/^[a-f0-9]{32}$/i.test(voiceId)) throw new Error('voice_id must be 32 hexadecimal characters.');
  const source = readFileSync(ENV_PATH, 'utf8');
  const line = `QWEN_TTS_VOICE_ID=${voiceId.toLowerCase()}`;
  const next = /^\s*QWEN_TTS_VOICE_ID\s*=.*$/m.test(source)
    ? source.replace(/^\s*QWEN_TTS_VOICE_ID\s*=.*$/m, line)
    : `${source.replace(/\s*$/, '')}\n${line}\n`;
  const temporary = `${ENV_PATH}.tmp-${process.pid}`;
  writeFileSync(temporary, next, {encoding: 'utf8', mode: 0o600});
  renameSync(temporary, ENV_PATH);
}

async function main() {
  const command = process.argv[2] ?? 'check';
  if (command === 'check') {
    const config = resolveTtsConfig();
    const transport = await ensureQwenTransport(config);
    try {
      const report = await preflightTts(config);
      console.log(JSON.stringify({status: 'passed', transport: transport.mode, ...report}, null, 2));
    } finally {
      await transport.close();
    }
    return;
  }
  const service = resolveQwenServiceConfig(process.env, {requireVoice: false});
  const transport = await ensureQwenTransport(service);
  try {
    if (command === 'list') {
      const voices = await listQwenVoices(service);
      console.log(JSON.stringify({transport: transport.mode, voices}, null, 2));
      return;
    }
    if (command === 'use') {
      const voiceId = requireOption('--voice-id').toLowerCase();
      const voices = await listQwenVoices(service);
      const voice = voices.find((item) => item.voice_id === voiceId);
      if (!voice) throw new Error(`Registered voice not found: ${voiceId}`);
      activateVoice(voiceId);
      console.log(JSON.stringify({status: 'activated', voice}, null, 2));
      return;
    }
    if (command === 'register') {
      const refText = optionValue('--ref-text') ??
        readFileSync(resolve(requireOption('--ref-text-file')), 'utf8').trim();
      const result = await registerQwenVoice({
        name: requireOption('--name'),
        audioPath: resolve(requireOption('--audio')),
        refText,
      }, service);
      if (process.argv.includes('--activate')) activateVoice(result.voiceId);
      console.log(JSON.stringify({status: 'registered', activated: process.argv.includes('--activate'), ...result}, null, 2));
      return;
    }
  } finally {
    await transport.close();
  }
  throw new Error('Usage: voice-cli.mjs <check|list|use|register> [options]');
}

try {
  await main();
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
