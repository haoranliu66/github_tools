import {existsSync, mkdirSync, renameSync, rmSync} from 'node:fs';
import {spawnSync} from 'node:child_process';
import {dirname, join} from 'node:path';

function defaultRunGit({url, target, timeoutMs, sslBackend = null}) {
  const args = ['clone', '--depth', '1', '--filter=blob:none', url, target];
  if (sslBackend) args.unshift('-c', `http.sslBackend=${sslBackend}`);
  return spawnSync(
    'git',
    args,
    {encoding: 'utf8', maxBuffer: 4 * 1024 * 1024, timeout: timeoutMs, killSignal: 'SIGKILL'},
  );
}

function sleepSync(milliseconds) {
  if (milliseconds <= 0) return;
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, milliseconds);
}

function retryableCloneFailure(result) {
  const detail = `${result.error?.message ?? ''}\n${result.stderr ?? ''}`;
  return /could not resolve|failed to connect|connection (?:reset|closed)|etimedout|timed? out|tls|early eof|rpc failed|http (?:5\d\d|429)|network|unable to access|SEC_E_NO_CREDENTIALS|AcquireCredentialsHandle/i.test(detail);
}

function schannelCredentialFailure(result) {
  const detail = `${result.error?.message ?? ''}\n${result.stderr ?? ''}`;
  return /SEC_E_NO_CREDENTIALS|AcquireCredentialsHandle/i.test(detail);
}

function cloneFailureDetail(result) {
  return String(result.stderr || result.error?.message || `exit code ${result.status ?? 'unknown'}`)
    .trim()
    .replace(/\s+/g, ' ')
    .slice(0, 500);
}

export function cloneRepository(fullName, target, {
  runGit = defaultRunGit,
  maxAttempts = 3,
  retryDelayMs = 600,
  cloneTimeoutMs = 120_000,
} = {}) {
  if (!Number.isInteger(cloneTimeoutMs) || cloneTimeoutMs <= 0) {
    throw new Error('cloneTimeoutMs must be a positive integer.');
  }
  if (existsSync(join(target, '.git'))) return {reused: true, attempts: 0};
  if (existsSync(target)) {
    throw new Error(`Clone destination exists but is not a Git repository: ${target}`);
  }

  mkdirSync(dirname(target), {recursive: true});
  const url = `https://github.com/${fullName}.git`;
  let lastResult = null;
  let sslBackend = null;

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    const temporaryTarget = `${target}.clone-${process.pid}-${Date.now()}-${attempt}`;
    try {
      lastResult = runGit({url, target: temporaryTarget, timeoutMs: cloneTimeoutMs, sslBackend});
      if (lastResult.status === 0 && existsSync(join(temporaryTarget, '.git'))) {
        renameSync(temporaryTarget, target);
        return {reused: false, attempts: attempt};
      }
    } finally {
      if (existsSync(temporaryTarget)) rmSync(temporaryTarget, {recursive: true, force: true});
    }

    if (schannelCredentialFailure(lastResult)) sslBackend = 'openssl';
    if (!retryableCloneFailure(lastResult) || attempt === maxAttempts) break;
    sleepSync(retryDelayMs * (2 ** (attempt - 1)));
  }

  throw new Error(`git clone failed: ${cloneFailureDetail(lastResult ?? {})}`);
}
