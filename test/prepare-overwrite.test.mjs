import assert from 'node:assert/strict';
import {existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import test from 'node:test';
import {replaceProductionDirectory} from '../apps/video-factory/src/prepare-cli.mjs';

test('successful preparation replaces the mapped production directory', (t) => {
  const root = mkdtempSync(join(tmpdir(), 'zimeiti-production-replace-'));
  t.after(() => rmSync(root, {recursive: true, force: true}));
  const production = join(root, 'production');
  const staging = join(root, '.production-staging-test');
  mkdirSync(production);
  mkdirSync(staging);
  writeFileSync(join(production, 'old.txt'), 'old');
  writeFileSync(join(staging, 'storyboard.json'), '{"version":"new"}');

  replaceProductionDirectory(staging, production);

  assert.equal(existsSync(staging), false);
  assert.equal(existsSync(join(production, 'old.txt')), false);
  assert.equal(readFileSync(join(production, 'storyboard.json'), 'utf8'), '{"version":"new"}');
  assert.ok(!readdirSync(root).some((name) => name.startsWith('production.replace-')));
});
