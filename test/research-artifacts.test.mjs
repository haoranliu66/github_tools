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
    inspectedFiles: ['README.md'],
    project: {name: 'tiny-notes', url: 'local:fixture/tiny-notes',
      versionOrCommit: '248f5ed318a8b32805675f294f39a6627edef653', license: 'MIT', primaryLanguage: 'JavaScript'},
    executiveSummary: 'Formats a note as a Markdown list item.', audience: ['Developers'],
    findings: [{title: 'Formatting', detail: 'Trims input and prefixes a dash.'}],
    claims: [{claim: 'Trims whitespace.', confidence: 'high',
      evidence: [{source: 'official-readme', detail: 'The Usage section shows whitespace being trimmed.'}]}],
    demoPlan: [{step: 'Format a note', command: 'node src/index.mjs hello', expected: '- hello', status: 'not-run'}],
    demoability: {score: 4, confidence: 'medium', reason: 'Quick Start and a small visual example are documented; not executed.'},
    limitations: ['Static inspection only.'],
    editorialContract: {
      schemaVersion: 1,
      name: 'video-production-quality',
      digest: 'a'.repeat(64),
      files: [
        {path: '.agents/skills/video-production-quality/SKILL.md', digest: '1'.repeat(64)},
        {path: '.agents/skills/video-production-quality/references/market-patterns.md', digest: '2'.repeat(64)},
        {path: '.agents/skills/video-production-quality/references/visual-evidence-and-beats.md', digest: '3'.repeat(64)},
        {path: '.agents/skills/video-production-quality/references/acceptance-checklist.md', digest: '4'.repeat(64)},
      ],
    },
    editorialBrief: {
      intendedViewer: '想快速整理笔记的人',
      familiarProblem: '复制一段文字后还要手动清理空格和添加列表符号',
      oneSentenceAnswer: 'Tiny Notes 自动清理文字并把它变成列表项',
      titlePromise: '几秒钟把零散文字变成整齐列表',
      concreteExamples: [{
        problem: '输入内容前后带着多余空格',
        projectAction: 'Tiny Notes 清理空格并补上列表符号',
        usefulResult: '输出可以直接放进 Markdown 笔记',
        claimIndexes: [0],
      }],
      bRollPlan: [{
        purpose: '展示整理前后的差别',
        visual: '并排显示原始文字和整理后的列表项',
        claimIndexes: [0],
      }],
    },
    visualEvidencePackage: {
      hookMoment: {
        purpose: '先展示整理后的列表结果', narrationCue: 'A tiny formatter', visualMode: 'media-crop',
        assetIds: ['example-image'], claimIndexes: [0], truthMode: 'repository-media', leadSeconds: 0.3,
      },
      visualBeats: Array.from({length: 6}, (_, index) => ({
        id: `beat-${index + 1}`,
        sectionIndex: index % 2,
        role: ['show', 'prove', 'change'][index % 3],
        purpose: `展示第 ${index + 1} 个格式变化`,
        narrationCue: index % 2 === 0 ? '复制来的文字' : 'Tiny Notes',
        visualMode: index % 2 === 0 ? 'media-crop' : 'progressive-flow',
        assetIds: index % 2 === 0 ? ['example-image'] : [],
        claimIndexes: [0], truthMode: index % 2 === 0 ? 'repository-media' : 'source-derived-animation',
        durationHint: 3, leadSeconds: 0.3,
      })),
      demoMoments: [],
      mechanismSteps: [{id: 'trim', label: '清理', detail: '移除多余空格', claimIndexes: [0]}],
      evidenceAssets: [{
        id: 'example-image', path: 'docs/example.png', purpose: '展示项目提供的输入输出示例',
        mediaType: 'image', licenseBasis: 'MIT', truthMode: 'repository-media', claimIndexes: [0],
      }],
      contrastMoments: [{
        id: 'before-after', before: '文字带着空格', after: '文字变成列表项',
        claimIndexes: [0], truthMode: 'source-derived-animation',
      }],
    },
    video: {title: 'Tiny Notes', hook: 'A tiny formatter',
      sections: [
        {heading: '原来的麻烦', narration: '复制来的文字常常带着多余空格。', visual: '展示整理前的文字。'},
        {heading: '整理后的结果', narration: 'Tiny Notes 清理空格并补上列表符号。', visual: '展示整理后的列表项。'},
      ],
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
  assert.match(readFileSync(join(output, 'research_brief.md'), 'utf8'), /视频编辑简报/);
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

test('README evidence does not need a source-file or line-number mapping', (t) => {
  const root = temporaryOutput(t);
  const result = completedResearch();
  result.claims[0].evidence = [{source: 'official-readme', detail: 'The Usage section documents the result.'}];
  assert.doesNotThrow(() => writeResearchArtifacts(result, root));
  assert.ok(existsSync(join(root, 'claims.json')));
});

test('source files, releases, and issues cannot be used as feature evidence', (t) => {
  const root = temporaryOutput(t);
  for (const source of ['src/index.mjs', 'release:v1.0.0', 'issue:42']) {
    const result = completedResearch();
    result.claims[0].evidence = [{source, detail: 'Legacy evidence source.'}];
    assert.throws(() => writeResearchArtifacts(result, root), /official-readme|executed-demo/i);
  }
  assert.deepEqual(readdirSync(root), []);
});

test('executed-demo evidence must point to a passed retained demo step', (t) => {
  const root = temporaryOutput(t);
  const rejected = completedResearch();
  rejected.claims[0].evidence = [{source: 'executed-demo:0', detail: 'Observed output.'}];
  assert.throws(() => writeResearchArtifacts(rejected, root), /passed executed-demo/i);

  const accepted = completedResearch();
  accepted.demoPlan[0].status = 'passed';
  accepted.claims[0].evidence = [{source: 'executed-demo:0', detail: 'Observed output.'}];
  assert.doesNotThrow(() => writeResearchArtifacts(accepted, root));
});
