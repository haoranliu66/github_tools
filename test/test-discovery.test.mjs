import assert from 'node:assert/strict';
import test from 'node:test';
import {mkdtempSync, mkdirSync, writeFileSync, rmSync} from 'node:fs';
import {join} from 'node:path';
import {tmpdir} from 'node:os';
import * as discovery from '../scripts/run-project-tests.mjs';

test('project test discovery never descends into cloned repositories', () => {
  assert.equal(typeof discovery.discoverProjectTests, 'function');
  const root = mkdtempSync(join(tmpdir(), 'zimeiti-test-discovery-'));
  try {
    mkdirSync(join(root, 'test'));
    mkdirSync(join(root, 'workspaces', 'repos', 'untrusted', 'test'), {recursive: true});
    writeFileSync(join(root, 'test', 'own.test.mjs'), '');
    writeFileSync(join(root, 'workspaces', 'repos', 'untrusted', 'test', 'external.test.mjs'), '');
    assert.deepEqual(discovery.discoverProjectTests(root), [join(root, 'test', 'own.test.mjs')]);
  } finally { rmSync(root, {recursive: true, force: true}); }
});
