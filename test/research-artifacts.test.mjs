import assert from 'node:assert/strict';
import {existsSync, mkdtempSync, readFileSync, readdirSync, rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import test from 'node:test';
import {writeResearchArtifacts} from '../apps/repo-researcher/src/artifacts.mjs';

function completedResearch() {
  return {
    status: 'completed',
    blockedReason: '',
    inspectedFiles: ['README.md', 'src/index.mjs'],
    project: {name: 'tiny-notes', url: 'local:fixture/tiny-notes',
      versionOrCommit: '248f5ed318a8b32805675f294f39a6627edef653', license: 'MIT', primaryLanguage: 'JavaScript'},
    executiveSummary: 'Formats a note as a Markdown list item.', audience: ['Developers'],
    findings: [{title: 'Formatting', detail: 'Trims input and prefixes a dash.'}],
    claims: [{claim: 'Trims whitespace.', confidence: 'high',
      evidence: [{source: 'src/index.mjs:2', detail: 'String(input ?? "").trim()'}]}],
    demoPlan: [{step: 'Format a note', command: 'node src/index.mjs hello', expected: '- hello', status: 'not-run'}],
    demoability: {score: 4, confidence: 'medium', reason: 'Quick Start and a small visual example are documented; not executed.'},
    limitations: ['Static inspection only.'],
    video: {title: 'Tiny Notes', hook: 'A tiny formatter',
      sections: [{heading: 'How it works', narration: 'Trims and prefixes input.', visual: 'Show source.'}],
      closing: 'Review before use.',
      visualAssets: [{path: 'docs/example.png', purpose: 'Show the official example', licenseBasis: 'MIT'}]},
  };
}

function temporaryOutput(t) {
  const directory = mkdtempSync(join(tmpdir(), 'zimeiti-research-test-'));
  t.after(() => rmSync(directory, {recursive: true, force: true}));
  return directory;
}

test('completed static research produces seven artifacts without claiming execution', (t) => {
  const root = temporaryOutput(t);
  const output = writeResearchArtifacts(completedResearch(), root);
  assert.equal(readdirSync(output).length, 7);
  const result = JSON.parse(readFileSync(join(output, 'research.json'), 'utf8'));
  assert.equal(result.status, 'completed');
  assert.equal(result.demoPlan[0].status, 'not-run');
  assert.equal(result.demoability.score, 4);
  assert.match(readFileSync(join(output, 'research_brief.md'), 'utf8'), /可演示性：4\/7/);
  assert.equal(JSON.parse(readFileSync(join(output, 'storyboard.json'), 'utf8')).scenes[0].title, 'Tiny Notes');
  assert.equal(JSON.parse(readFileSync(join(output, 'media_manifest.json'), 'utf8')).items.length, 1);
});

for (const score of [-1, 7.5, 8, undefined]) {
  test(`invalid demoability score ${score} cannot produce publishable artifacts`, (t) => {
    const root = temporaryOutput(t);
    const result = completedResearch();
    result.demoability = {score, confidence: 'medium', reason: 'fixture'};
    assert.throws(() => writeResearchArtifacts(result, root),
      /demoability|演示/);
    assert.deepEqual(readdirSync(root), []);
  });
}

test('an unexecuted demo cannot claim more than four demoability points', (t) => {
  const root = temporaryOutput(t);
  const result = completedResearch();
  result.demoability = {score: 5, confidence: 'high', reason: 'Documentation only.'};
  assert.throws(() => writeResearchArtifacts(result, root),
    /demoability|演示|execut/i);
  assert.deepEqual(readdirSync(root), []);
});

test('a passed demo can claim the full seven demoability points', (t) => {
  const root = temporaryOutput(t);
  const result = completedResearch();
  result.demoPlan[0].status = 'passed';
  result.demoability = {score: 7, confidence: 'high', reason: 'The concise demo passed.'};
  const output = writeResearchArtifacts(result, root);
  assert.match(readFileSync(join(output, 'research_brief.md'), 'utf8'), /可演示性：7\/7/);
});

for (const demoability of [
  {score: 4, confidence: 'certain', reason: 'fixture'},
  {score: 4, confidence: 'medium', reason: ''},
]) {
  test('invalid demoability evidence cannot produce publishable artifacts', (t) => {
    const root = temporaryOutput(t);
    const result = completedResearch();
    result.demoability = demoability;
    assert.throws(() => writeResearchArtifacts(result, root),
      /demoability|演示/i);
    assert.deepEqual(readdirSync(root), []);
  });
}

for (const status of ['blocked', 'failed', undefined]) {
  test(`research status ${status} cannot produce a script or storyboard`, (t) => {
    const root = temporaryOutput(t);
    const result = {...completedResearch(), status, blockedReason: 'Read command rejected by policy.'};
    assert.throws(() => writeResearchArtifacts(result, root), /research|blocked|completed/i);
    assert.deepEqual(readdirSync(root), []);
  });
}

for (const versionOrCommit of ['未能获取；未完成版本固定', '', 'main']) {
  test(`unfixed revision ${JSON.stringify(versionOrCommit)} cannot produce publishable artifacts`, (t) => {
    const root = temporaryOutput(t);
    const result = completedResearch();
    result.project.versionOrCommit = versionOrCommit;
    assert.throws(() => writeResearchArtifacts(result, root), /commit|revision/i);
    assert.deepEqual(readdirSync(root), []);
  });
}

test('a completed label without inspected files cannot hide a read failure', (t) => {
  const root = temporaryOutput(t);
  const result = {...completedResearch(), inspectedFiles: []};
  assert.throws(() => writeResearchArtifacts(result, root), /inspected|files/i);
  assert.deepEqual(readdirSync(root), []);
});

test('tool-error evidence is not accepted as repository evidence', (t) => {
  const root = temporaryOutput(t);
  const result = completedResearch();
  result.claims[0].evidence = [{source: 'functions.exec', detail: 'blocked by policy'}];
  assert.throws(() => writeResearchArtifacts(result, root), /evidence/i);
  assert.deepEqual(readdirSync(root), []);
});
