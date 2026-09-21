import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';
import test from 'node:test';
import {
  assertEditorialResearch,
  contractMetadata,
  EDITORIAL_CONTRACT_FILES,
  loadEditorialContract,
} from '../apps/repo-researcher/src/editorial-contract.mjs';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));

function researchFixture(contract = loadEditorialContract(projectRoot)) {
  return {
    claims: [{claim: 'The tool formats input.', confidence: 'high', evidence: []}],
    editorialContract: contractMetadata(contract),
    editorialBrief: {
      intendedViewer: '想快速整理文字的人',
      familiarProblem: '复制来的文字需要反复清理格式',
      oneSentenceAnswer: '这个项目自动清理文字并输出整齐列表',
      titlePromise: '几秒钟整理一段零散文字',
      concreteExamples: [{
        problem: '一段文字前后带着多余空格',
        projectAction: '项目清理空格并补上列表符号',
        usefulResult: '整理后的内容可以直接复制',
        claimIndexes: [0],
      }],
      bRollPlan: [{
        purpose: '展示整理前后的差别',
        visual: '并排显示原始文字与整理后的列表',
        claimIndexes: [0],
      }],
    },
    visualEvidencePackage: {
      hookMoment: {
        purpose: '先展示整理前后的明显差别', narrationCue: '复制来的文字', visualMode: 'compare',
        assetIds: [], claimIndexes: [0], truthMode: 'source-derived-animation', leadSeconds: 0.3,
      },
      visualBeats: Array.from({length: 6}, (_, index) => ({
        id: `beat-${index + 1}`,
        sectionIndex: index % 2,
        role: ['show', 'prove', 'change'][index % 3],
        purpose: `展示第 ${index + 1} 个整理变化`,
        narrationCue: index % 2 === 0 ? '文字' : '项目',
        visualMode: ['progressive-flow', 'compare', 'code-highlight'][index % 3],
        assetIds: [], claimIndexes: [0], truthMode: 'source-derived-animation',
        durationHint: 3, leadSeconds: 0.3,
      })),
      demoMoments: [],
      mechanismSteps: [{id: 'trim', label: '清理空格', detail: '移除文字前后的空格', claimIndexes: [0]}],
      evidenceAssets: [],
      contrastMoments: [{
        id: 'before-after', before: '文字带着多余空格', after: '文字已经整理完成',
        claimIndexes: [0], truthMode: 'source-derived-animation',
      }],
    },
    video: {
      title: '快速整理零散文字',
      hook: '复制来的文字总要重新排版',
      sections: [
        {heading: '原来的麻烦', narration: '文字前后带着空格。', visual: '展示杂乱输入。'},
        {heading: '项目的处理', narration: '项目清理格式并输出列表。', visual: '展示整理结果。'},
      ],
      closing: '适合经常整理短笔记的人。',
    },
  };
}

test('trusted editorial contract loads every routed file with a stable digest', () => {
  const first = loadEditorialContract(projectRoot);
  const second = loadEditorialContract(projectRoot);
  assert.equal(first.digest, second.digest);
  assert.equal(first.sources.length, EDITORIAL_CONTRACT_FILES.length);
  assert.deepEqual(first.sources.map((source) => source.path), EDITORIAL_CONTRACT_FILES);
  assert.ok(first.sources.every((source) => source.content.length > 100 && /^[a-f0-9]{64}$/u.test(source.digest)));
});

test('research editorial brief accepts the current trusted contract and claim mappings', () => {
  const contract = loadEditorialContract(projectRoot);
  assert.doesNotThrow(() => assertEditorialResearch(researchFixture(contract), contract));
});

test('research editorial wording is guided by the skill instead of sentence-count gating', () => {
  const contract = loadEditorialContract(projectRoot);
  const research = researchFixture(contract);
  research.editorialBrief.familiarProblem = '复制来的文字很乱。整理它又很费时间。';
  assert.doesNotThrow(() => assertEditorialResearch(research, contract));
});

test('research editorial brief rejects a stale skill digest', () => {
  const contract = loadEditorialContract(projectRoot);
  const research = researchFixture(contract);
  research.editorialContract.digest = 'f'.repeat(64);
  assert.throws(() => assertEditorialResearch(research, contract), /stale/i);
});

test('research editorial brief rejects invalid evidence mappings', () => {
  const contract = loadEditorialContract(projectRoot);
  const invalidIndex = researchFixture(contract);
  invalidIndex.editorialBrief.concreteExamples[0].claimIndexes = [9];
  assert.throws(() => assertEditorialResearch(invalidIndex, contract), /claim index/i);

  const duplicateIndex = researchFixture(contract);
  duplicateIndex.editorialBrief.concreteExamples[0].claimIndexes = [0, 0];
  assert.throws(() => assertEditorialResearch(duplicateIndex, contract), /claim index/i);

});

test('research copy style is guided by the skill instead of semantic word gates', () => {
  const contract = loadEditorialContract(projectRoot);
  const research = researchFixture(contract);
  research.video.hook += ' 这是官方素材，项目已有 10,000 stars。';
  research.visualEvidencePackage.mechanismSteps[0].detail = '静态研究得到的处理步骤';
  assert.doesNotThrow(() => assertEditorialResearch(research, contract));
});

test('static research rejects fake demos and visual cues that are not in narration', () => {
  const contract = loadEditorialContract(projectRoot);
  const fakeDemo = researchFixture(contract);
  fakeDemo.visualEvidencePackage.visualBeats[0].truthMode = 'executed-demo';
  assert.throws(() => assertEditorialResearch(fakeDemo, contract), /executed-demo/i);

  const missingCue = researchFixture(contract);
  missingCue.visualEvidencePackage.visualBeats[0].narrationCue = '不存在的旁白';
  assert.throws(() => assertEditorialResearch(missingCue, contract), /exact substring/i);

  const invalidCrop = researchFixture(contract);
  invalidCrop.visualEvidencePackage.visualBeats[0].focalRegion = {x: 0.8, y: 0, width: 0.4, height: 1};
  assert.throws(() => assertEditorialResearch(invalidCrop, contract), /normalized image bounds/i);
});
