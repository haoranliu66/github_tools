import assert from 'node:assert/strict';
import {existsSync, mkdtempSync, readFileSync, rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import test from 'node:test';
import {buildSourceChoicePrompt, decideSource, SOURCE_CHOICE_SCHEMA} from '../apps/repo-researcher/src/source-choice.mjs';
import {downloadOnlineMedia, getOnlineSourcePreview, stageOnlinePreview} from '../apps/repo-researcher/src/online-source.mjs';

const commit = 'a'.repeat(40);
const media = Buffer.from('mock image');
const asFile = (path, content) => ({type: 'file', path, name: path.split('/').at(-1),
  size: Buffer.byteLength(content), encoding: 'base64', content: Buffer.from(content).toString('base64')});
const json = (value) => new Response(JSON.stringify(value), {headers: {'content-type': 'application/json'}});

function fakeFetch(url, {headers}) {
  const value = String(url);
  if (value.endsWith('/repos/acme/demo')) return json({default_branch: 'main', license: {spdx_id: 'MIT'}, language: 'JavaScript'});
  if (value.endsWith('/commits/main')) return json({sha: commit});
  if (value.endsWith(`/readme?ref=${commit}`)) {
    return json(asFile('README.md', '# Demo\n![screen](docs/screen.png)'));
  }
  if (value.endsWith(`/contents?ref=${commit}`)) {
    return json([{type: 'file', name: 'LICENSE', size: 11}]);
  }
  if (value.endsWith(`/contents/LICENSE?ref=${commit}`)) return json(asFile('LICENSE', 'MIT License'));
  if (value.endsWith(`/contents/docs/screen.png?ref=${commit}`)) {
    if (headers.Accept === 'application/vnd.github.raw+json') return new Response(media);
    return json({type: 'file', size: media.length});
  }
  throw new Error(`Unexpected GitHub URL: ${value}`);
}

test('auto source choice follows the agent but keeps execution and size boundaries', () => {
  const choice = {mode: 'online', reason: 'README and one image explain the video.', videoNeeds: ['result screenshot']};
  assert.equal(decideSource({choice}).mode, 'online');
  assert.equal(decideSource({choice, supportedMediaCount: 9}).mode, 'clone');
  assert.equal(decideSource({allowRun: true, choice}).mode, 'clone');
  assert.throws(() => decideSource({requested: 'online', allowRun: true}), /requires a local checkout/);
  assert.throws(() => decideSource({requested: 'auto'}), /did not return/);
  assert.deepEqual(new Set(SOURCE_CHOICE_SCHEMA.required), new Set(Object.keys(SOURCE_CHOICE_SCHEMA.properties)));
  const prompt = buildSourceChoicePrompt({fullName: 'acme/demo', sha: commit, readmeName: 'README.md', candidates: []});
  assert.match(prompt, /README-supported functions/);
  assert.match(prompt, new RegExp(commit));
  assert.match(prompt, /Never execute project code/);
  assert.match(prompt, /not choose clone merely to inspect source code/);
});

test('online research stages a pinned README and copies only checked README media', async (t) => {
  const root = mkdtempSync(join(tmpdir(), 'zimeiti-online-test-'));
  t.after(() => rmSync(root, {recursive: true, force: true}));
  const preview = await getOnlineSourcePreview('acme/demo', {requestOptions: {fetchImpl: fakeFetch}});
  assert.equal(preview.sha, commit);
  assert.deepEqual(preview.candidates.map((item) => item.path), ['docs/screen.png']);
  const directory = stageOnlinePreview(preview, root);
  assert.equal(readFileSync(join(directory, 'README.md'), 'utf8'), preview.readmeText);
  assert.equal(readFileSync(join(directory, 'LICENSE'), 'utf8'), 'MIT License');
  assert.equal(JSON.parse(readFileSync(join(directory, 'SOURCE_METADATA.json'), 'utf8')).commit, commit);
  assert.equal(existsSync(join(directory, '.git')), false);
  assert.deepEqual(await downloadOnlineMedia(preview, directory, {requestOptions: {fetchImpl: fakeFetch}}),
    {files: 1, bytes: media.length});
  assert.deepEqual(readFileSync(join(directory, 'docs/screen.png')), media);
});

test('online source rejects unverified root README and does not silently ignore missing local media', async (t) => {
  const root = mkdtempSync(join(tmpdir(), 'zimeiti-online-test-'));
  t.after(() => rmSync(root, {recursive: true, force: true}));
  const preview = await getOnlineSourcePreview('acme/demo', {requestOptions: {fetchImpl: fakeFetch}});
  const directory = stageOnlinePreview(preview, root);
  await assert.rejects(downloadOnlineMedia(preview, directory, {
    requestOptions: {fetchImpl: async (url, options) => {
      if (String(url).includes('/contents/docs/screen.png')) {
        return new Response('not found', {status: 404});
      }
      return fakeFetch(url, options);
    }, maxAttempts: 1},
  }), /GitHub request failed/);
  await assert.rejects(getOnlineSourcePreview('acme/demo', {requestOptions: {
    fetchImpl: async (url, options) => String(url).includes('/readme?')
      ? json(asFile('docs/README.md', '# wrong location')) : fakeFetch(url, options),
  }}), /root official README/);
});
