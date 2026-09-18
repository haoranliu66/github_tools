import {spawn} from 'node:child_process';
import {once} from 'node:events';
import {existsSync} from 'node:fs';
import {isAbsolute} from 'node:path';
import {setTimeout as sleep} from 'node:timers/promises';

const LOOPBACK_HOSTS = new Set(['127.0.0.1', 'localhost', '::1']);

function required(value, name) {
  const normalized = String(value ?? '').trim();
  if (!normalized) throw new Error(`${name} is required when automatic Qwen SSH tunneling is enabled.`);
  return normalized;
}

function integer(value, name, fallback, {min = 1, max = 65535} = {}) {
  const parsed = Number(value ?? fallback);
  if (!Number.isInteger(parsed) || parsed < min || parsed > max) {
    throw new Error(`${name} must be an integer from ${min} to ${max}.`);
  }
  return parsed;
}

function enabled(value) {
  const normalized = String(value ?? 'false').trim().toLowerCase();
  if (['true', '1', 'yes'].includes(normalized)) return true;
  if (['false', '0', 'no', ''].includes(normalized)) return false;
  throw new Error('QWEN_TTS_AUTO_TUNNEL must be true or false.');
}

function safeSshToken(value, name) {
  const normalized = required(value, name);
  if (/\s|[\u0000-\u001f]/.test(normalized) || normalized.startsWith('-')) {
    throw new Error(`${name} contains unsupported characters.`);
  }
  return normalized;
}

export function resolveQwenTunnelConfig(ttsConfig, env = process.env) {
  const automatic = enabled(env.QWEN_TTS_AUTO_TUNNEL);
  if (!automatic) return {enabled: false};
  if (ttsConfig?.provider !== 'qwen') throw new Error('Automatic Qwen tunneling requires the qwen TTS provider.');
  const endpoint = new URL(ttsConfig.baseUrl);
  if (endpoint.protocol !== 'http:' || !LOOPBACK_HOSTS.has(endpoint.hostname)) {
    throw new Error('Automatic Qwen tunneling requires QWEN_TTS_BASE_URL to use local HTTP loopback.');
  }
  const keyPath = required(env.QWEN_TTS_SSH_KEY, 'QWEN_TTS_SSH_KEY');
  if (!isAbsolute(keyPath)) throw new Error('QWEN_TTS_SSH_KEY must be an absolute path.');
  if (!existsSync(keyPath)) throw new Error(`QWEN_TTS_SSH_KEY does not exist: ${keyPath}`);
  return {
    enabled: true,
    executable: String(env.QWEN_TTS_SSH_EXECUTABLE ?? 'ssh').trim() || 'ssh',
    host: safeSshToken(env.QWEN_TTS_SSH_HOST, 'QWEN_TTS_SSH_HOST'),
    user: safeSshToken(env.QWEN_TTS_SSH_USER, 'QWEN_TTS_SSH_USER'),
    keyPath,
    sshPort: integer(env.QWEN_TTS_SSH_PORT, 'QWEN_TTS_SSH_PORT', 22),
    localHost: endpoint.hostname === 'localhost' ? '127.0.0.1' : endpoint.hostname,
    localPort: integer(endpoint.port, 'QWEN_TTS_BASE_URL port', 80),
    remoteHost: safeSshToken(env.QWEN_TTS_REMOTE_HOST ?? '127.0.0.1', 'QWEN_TTS_REMOTE_HOST'),
    remotePort: integer(env.QWEN_TTS_REMOTE_PORT, 'QWEN_TTS_REMOTE_PORT', 8000),
    startupTimeoutMs: integer(env.QWEN_TTS_TUNNEL_START_TIMEOUT_MS,
      'QWEN_TTS_TUNNEL_START_TIMEOUT_MS', 20_000, {min: 1000, max: 60_000}),
  };
}

async function healthAvailable(baseUrl, fetchImpl) {
  try {
    const response = await fetchImpl(new URL('/health', `${baseUrl.replace(/\/$/, '')}/`), {
      signal: AbortSignal.timeout(1200),
    });
    return response.ok;
  } catch {
    return false;
  }
}

async function stopChild(child, sleepImpl) {
  if (!child || child.exitCode !== null || child.signalCode) return;
  const exited = once(child, 'exit').catch(() => []);
  child.kill();
  await Promise.race([exited, sleepImpl(2000)]);
  if (child.exitCode === null && !child.signalCode) child.kill('SIGKILL');
}

export async function ensureQwenTransport(ttsConfig, {
  env = process.env,
  fetchImpl = fetch,
  spawnImpl = spawn,
  sleepImpl = sleep,
  nowImpl = Date.now,
} = {}) {
  if (ttsConfig?.provider !== 'qwen') {
    return {mode: 'local', started: false, close: async () => {}};
  }
  if (await healthAvailable(ttsConfig.baseUrl, fetchImpl)) {
    return {mode: 'existing', started: false, close: async () => {}};
  }
  const tunnel = resolveQwenTunnelConfig(ttsConfig, env);
  if (!tunnel.enabled) {
    throw new Error('Qwen TTS is unreachable and automatic SSH tunneling is disabled.');
  }

  const destination = `${tunnel.user}@${tunnel.host}`;
  const args = [
    '-N', '-T',
    '-i', tunnel.keyPath,
    '-p', String(tunnel.sshPort),
    '-L', `${tunnel.localHost}:${tunnel.localPort}:${tunnel.remoteHost}:${tunnel.remotePort}`,
    '-o', 'BatchMode=yes',
    '-o', 'ExitOnForwardFailure=yes',
    '-o', 'ConnectTimeout=10',
    '-o', 'ServerAliveInterval=30',
    '-o', 'ServerAliveCountMax=3',
    '-o', 'LogLevel=ERROR',
    destination,
  ];
  let child;
  try {
    child = spawnImpl(tunnel.executable, args, {
      windowsHide: true,
      stdio: ['ignore', 'ignore', 'pipe'],
    });
  } catch (error) {
    throw new Error(`Unable to start the automatic Qwen SSH tunnel: ${error.message}`);
  }
  let processError = null;
  let exit = null;
  let stderr = '';
  child.once('error', (error) => { processError = error; });
  child.once('exit', (code, signal) => { exit = {code, signal}; });
  child.stderr?.on('data', (chunk) => { stderr = `${stderr}${chunk}`.slice(-2000); });

  const deadline = nowImpl() + tunnel.startupTimeoutMs;
  while (nowImpl() < deadline) {
    if (processError || exit) {
      await stopChild(child, sleepImpl);
      const detail = processError?.message ?? stderr.trim() ?? `exit ${exit?.code ?? exit?.signal}`;
      throw new Error(`Automatic Qwen SSH tunnel failed: ${detail || 'ssh exited before the service became ready'}`);
    }
    if (await healthAvailable(ttsConfig.baseUrl, fetchImpl)) {
      let closed = false;
      return {
        mode: 'started',
        started: true,
        destination,
        close: async () => {
          if (closed) return;
          closed = true;
          await stopChild(child, sleepImpl);
        },
      };
    }
    await sleepImpl(250);
  }
  await stopChild(child, sleepImpl);
  throw new Error(`Automatic Qwen SSH tunnel timed out after ${tunnel.startupTimeoutMs} ms.`);
}
