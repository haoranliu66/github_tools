import assert from 'node:assert/strict';
import {mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync} from 'node:fs';
import {join, resolve} from 'node:path';
import {tmpdir} from 'node:os';
import test from 'node:test';
import {assertEditorialContractMetadata, contractMetadata, EDITORIAL_CONTRACT_FILES,
  loadEditorialContract, trustedContractPrompt} from '../apps/repo-researcher/src/editorial-contract.mjs';
const projectRoot = resolve(import.meta.dirname, '..');

test('the production contract consists only of the main skill with stable normalized digests', () => {
  const first = loadEditorialContract(projectRoot), second = loadEditorialContract(projectRoot);
  assert.equal(first.digest, second.digest);
  assert.deepEqual(first.sources.map(s => s.path), EDITORIAL_CONTRACT_FILES);
  assert.equal(first.sources.length, 1);
  assert.doesNotThrow(() => assertEditorialContractMetadata(contractMetadata(first), second));
  const prompt = trustedContractPrompt(first);
  assert.deepEqual(prompt.metadata, contractMetadata(first));
  assert.match(prompt.body, /BEGIN TRUSTED FILE/u);
});

test('optional references do not become mandatory contract inputs', (t) => {
  const root = mkdtempSync(join(tmpdir(), 'zimeiti-current-contract-'));
  t.after(() => rmSync(root, {recursive: true, force: true}));
  const file = EDITORIAL_CONTRACT_FILES[0];
  mkdirSync(join(root, '.agents/skills/video-production-quality'), {recursive: true});
  writeFileSync(join(root, file), readFileSync(join(projectRoot, file)));
  assert.equal(loadEditorialContract(root).digest, loadEditorialContract(projectRoot).digest);
});

test('contract drift and substituted or malformed source identities are rejected', () => {
  const contract = loadEditorialContract(projectRoot), metadata = contractMetadata(contract);
  const stale = structuredClone(metadata); stale.digest = 'f'.repeat(64);
  assert.throws(() => assertEditorialContractMetadata(stale, contract), /stale/u);
  const substituted = structuredClone(metadata); substituted.files[0].path = 'other.md';
  assert.throws(() => assertEditorialContractMetadata(substituted), /single trusted/u);
  const expanded = structuredClone(metadata); expanded.files.push({...expanded.files[0]});
  assert.throws(() => assertEditorialContractMetadata(expanded), /single trusted/u);
  const malformed = structuredClone(metadata); malformed.files[0].digest = 'invalid';
  assert.throws(() => assertEditorialContractMetadata(malformed), /single trusted/u);
});
