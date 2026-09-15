import assert from 'node:assert/strict';
import {existsSync, mkdirSync, mkdtempSync, readdirSync, rmSync, writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import test from 'node:test';
import {cloneRepository} from '../apps/repo-researcher/src/clone.mjs';

test('a transient clone failure is retried in disposable directories and published atomically', (t) => {
  const root = mkdtempSync(join(tmpdir(), 'zimeiti-clone-test-'));
  t.after(() => rmSync(root, {recursive: true, force: true}));
  const target = join(root, 'fixture--example');
  let attempts = 0;

  const result = cloneRepository('fixture/example', target, {
    runGit: ({target: temporaryTarget}) => {
      attempts += 1;
      mkdirSync(temporaryTarget, {recursive: true});
      writeFileSync(join(temporaryTarget, 'attempt.txt'), String(attempts));
      if (attempts === 1) return {status: 128, stderr: 'fatal: unable to access: connection reset'};
      mkdirSync(join(temporaryTarget, '.git'));
      return {status: 0, stderr: ''};
    },
    maxAttempts: 3,
    retryDelayMs: 0,
  });

  assert.deepEqual(result, {reused: false, attempts: 2});
  assert.equal(existsSync(join(target, '.git')), true);
  assert.equal(readdirSync(root).some((name) => name.includes('.clone-')), false);
});

test('a non-git destination is preserved and rejected', (t) => {
  const root = mkdtempSync(join(tmpdir(), 'zimeiti-clone-test-'));
  t.after(() => rmSync(root, {recursive: true, force: true}));
  const target = join(root, 'fixture--example');
  mkdirSync(target);
  writeFileSync(join(target, 'keep.txt'), 'user data');

  assert.throws(
    () => cloneRepository('fixture/example', target, {runGit: () => ({status: 0, stderr: ''})}),
    /exists but is not a Git repository/,
  );
  assert.equal(existsSync(join(target, 'keep.txt')), true);
});

test('a permanent clone error is not retried and leaves no partial destination', (t) => {
  const root = mkdtempSync(join(tmpdir(), 'zimeiti-clone-test-'));
  t.after(() => rmSync(root, {recursive: true, force: true}));
  const target = join(root, 'fixture--missing');
  let attempts = 0;

  assert.throws(() => cloneRepository('fixture/missing', target, {
    runGit: ({target: temporaryTarget}) => {
      attempts += 1;
      mkdirSync(temporaryTarget, {recursive: true});
      return {status: 128, stderr: 'remote: Repository not found.'};
    },
    maxAttempts: 3,
    retryDelayMs: 0,
  }), /Repository not found/);

  assert.equal(attempts, 1);
  assert.equal(existsSync(target), false);
  assert.equal(readdirSync(root).some((name) => name.includes('.clone-')), false);
});

test('a stalled clone receives a per-attempt timeout and is retried', (t) => {
  const root = mkdtempSync(join(tmpdir(), 'zimeiti-clone-test-'));
  t.after(() => rmSync(root, {recursive: true, force: true}));
  const target = join(root, 'fixture--timeout');
  const receivedTimeouts = [];

  assert.throws(() => cloneRepository('fixture/timeout', target, {
    runGit: ({target: temporaryTarget, timeoutMs}) => {
      receivedTimeouts.push(timeoutMs);
      mkdirSync(temporaryTarget, {recursive: true});
      return {
        status: null,
        stderr: '',
        error: {code: 'ETIMEDOUT', message: 'spawnSync git ETIMEDOUT'},
      };
    },
    maxAttempts: 3,
    retryDelayMs: 0,
    cloneTimeoutMs: 12_345,
  }), /ETIMEDOUT/);

  assert.deepEqual(receivedTimeouts, [12_345, 12_345, 12_345]);
  assert.equal(existsSync(target), false);
  assert.equal(readdirSync(root).some((name) => name.includes('.clone-')), false);
});
