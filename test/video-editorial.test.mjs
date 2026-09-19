import assert from 'node:assert/strict';
import {mkdirSync, mkdtempSync, rmSync, writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import test from 'node:test';
import {buildEditorialEpisode} from '../apps/video-factory/src/editorial-planner.mjs';
import {evaluateEditorialQuality, loadEditorialConfig} from '../apps/video-factory/src/editorial-quality.mjs';
import {representativeFrames} from '../apps/video-factory/src/video-qa.mjs';

const config = loadEditorialConfig(new URL('../config/video-editorial.json', import.meta.url));

function researchFixture() {
  return {
    status: 'completed',
    project: {
      name: 'Signal Map', url: 'https://github.com/fixture/signal-map',
      versionOrCommit: '248f5ed318a8b32805675f294f39a6627edef653', license: 'MIT', primaryLanguage: 'JavaScript',
    },
    executiveSummary: 'Signal Map 把服务依赖整理成可核对的结构化关系，并输出适合评审的可视化结果。',
    audience: ['需要理解系统依赖的开发者', '负责方案评审的架构师', '制作技术分享的内容创作者'],
    findings: Array.from({length: 4}, (_, index) => ({
      title: `核心机制 ${index + 1}`,
      detail: `读取结构化输入；检查第 ${index + 1} 类关系；生成可以继续复核的结果。`,
    })),
    claims: Array.from({length: 5}, (_, index) => ({
      claim: `源码明确处理第 ${index + 1} 类关系。`, confidence: 'high',
      evidence: [{source: `src/feature-${index + 1}.mjs:${index + 2}`, detail: `validateRelation(input, ${index + 1})`}],
    })),
    demoPlan: [
      {step: '检查输入', command: 'node cli.mjs validate', expected: '输出诊断', status: 'not-run'},
      {step: '生成结果', command: 'node cli.mjs render', expected: '输出图片', status: 'not-run'},
    ],
    demoability: {score: 4, confidence: 'medium', reason: '有明确示例但未运行。'},
    limitations: ['本期仅静态研究，没有运行项目。', '结构正确不能证明系统事实完整。'],
    video: {
      title: 'Signal Map：把依赖关系讲清楚',
      hook: '一张依赖图看起来很直观，但它能不能回到源码证据？',
      sections: [
        {heading: '问题', narration: '先看它试图解决的沟通问题。', visual: '展示项目结果。'},
        {heading: '机制', narration: '再把输入、校验和输出拆成清晰步骤。', visual: '使用流程动画。'},
        {heading: '边界', narration: '最后区分结构检查和事实核验。', visual: '使用对比卡。'},
      ],
      closing: '保留结构和证据，再决定是否把它用于真实项目。',
      visualAssets: [{path: 'docs/hero.png', purpose: '展示项目的依赖图结果', licenseBasis: 'MIT'}],
    },
  };
}

test('editorial planner creates a concise problem-led B-roll plan', (t) => {
  const repositoryRoot = mkdtempSync(join(tmpdir(), 'zimeiti-editorial-'));
  t.after(() => rmSync(repositoryRoot, {recursive: true, force: true}));
  mkdirSync(join(repositoryRoot, 'docs'), {recursive: true});
  writeFileSync(join(repositoryRoot, 'docs', 'hero.png'), Buffer.from([0x89, 0x50, 0x4e, 0x47]));
  const {episode, warnings} = buildEditorialEpisode({
    research: researchFixture(), repositoryRoot, config, dataDate: '2026-09-15',
    trendRow: {stars: 12345, trendScore: 42.5, weekId: '2026-W38'},
  });
  const report = evaluateEditorialQuality(episode, config);
  assert.equal(config.durationSeconds.maxScene, 32);
  assert.deepEqual(report.errors, []);
  assert.deepEqual(warnings, []);
  assert.equal(episode.scenes[0].type, 'hero');
  assert.doesNotMatch(episode.scenes[0].source, /非本机实测/);
  assert.equal(episode.scenes[0].stat.value, '12,345');
  assert.equal(episode.meta.showEvidenceLabels, false);
  assert.equal(episode.scenes.length, config.sceneCount.target);
  assert.ok(report.metrics.bRollCoverage >= config.bRoll.minimumCoverage);
  assert.ok(new Set(episode.scenes.map((scene) => scene.type)).size >= config.rhythm.minDistinctTypes);
  assert.ok(episode.scenes.every((scene) => scene.source && scene.evidenceMode));
  assert.ok(episode.scenes.every((scene) => scene.showEvidenceLabels === false));
  assert.ok(episode.scenes.every((scene) =>
    scene.sentences.every((item) => item.text && typeof item.sentenceEnd === 'boolean' && !item.text.includes('…'))));
  assert.equal(episode.meta.narrationProfile, 'code-analysis');
  assert.equal(episode.scenes[1].heading, '它具体解决什么麻烦？');
  const spoken = episode.scenes.flatMap((scene) => scene.sentences).map((item) => item.text).join('');
  assert.doesNotMatch(spoken, /官方素材|非本机实测|趋势分|证据边界/);
  assert.equal((spoken.match(/stars/giu) ?? []).length, 1);
  const outro = episode.scenes.find((scene) => scene.type === 'outro');
  assert.equal(outro.sentences.map((item) => item.text).join(''),
    '保留结构和证据，再决定是否把它用于真实项目。');
});

test('editorial planner rejects repository media path traversal', (t) => {
  const repositoryRoot = mkdtempSync(join(tmpdir(), 'zimeiti-editorial-'));
  t.after(() => rmSync(repositoryRoot, {recursive: true, force: true}));
  const research = researchFixture();
  research.video.visualAssets[0].path = '../outside.png';
  assert.throws(() => buildEditorialEpisode({research, repositoryRoot, config}), /Unsafe visual asset path/);
});

test('subtitle soft splitting preserves the complete narration and Latin words', (t) => {
  const repositoryRoot = mkdtempSync(join(tmpdir(), 'zimeiti-editorial-'));
  t.after(() => rmSync(repositoryRoot, {recursive: true, force: true}));
  const research = researchFixture();
  research.video.visualAssets = [];
  research.video.sections[0].narration =
    '相较通用绘图器或 Mermaid 图表工具，它的用途更清楚。';
  const shortConfig = {...config, text: {...config.text, softSubtitleCharacters: 18}};
  const {episode} = buildEditorialEpisode({research, repositoryRoot, config: shortConfig});
  const scene = episode.scenes.find((item) =>
    item.sentences?.some((cue) => cue.text.includes('Mermaid')));
  assert.equal(scene.sentences.map((item) => item.text).join(''),
    '相较通用绘图器或 Mermaid 图表工具，它的用途更清楚。');
  assert.ok(scene.sentences.length > 1);
});

test('subtitle soft splitting does not discard enumerated items', (t) => {
  const repositoryRoot = mkdtempSync(join(tmpdir(), 'zimeiti-editorial-'));
  t.after(() => rmSync(repositoryRoot, {recursive: true, force: true}));
  const research = researchFixture();
  research.video.visualAssets = [];
  research.video.sections[0].narration =
    '先打开现成 HTML，再依次展示 doctor、validate、deliver 和 compare。';
  const shortConfig = {...config, text: {...config.text, softSubtitleCharacters: 12}};
  const {episode} = buildEditorialEpisode({research, repositoryRoot, config: shortConfig});
  const scene = episode.scenes.find((item) =>
    item.sentences?.some((cue) => cue.text.includes('现成网页')));
  assert.equal(scene.sentences.map((item) => item.text).join(''),
    '先打开现成网页，再依次展示环境检查命令、校验命令、交付命令和差异比较命令。');
});

test('editorial planner keeps a complete selected example without research-report framing', (t) => {
  const repositoryRoot = mkdtempSync(join(tmpdir(), 'zimeiti-editorial-'));
  t.after(() => rmSync(repositoryRoot, {recursive: true, force: true}));
  const research = researchFixture();
  research.video.visualAssets = [];
  const {episode} = buildEditorialEpisode({research, repositoryRoot, config});
  const narrations = episode.scenes.flatMap((scene) => scene.sentences ?? []).map((item) => item.text);
  assert.ok(narrations.some((text) => text.startsWith('读取结构化输入；')));
  assert.ok(episode.scenes.some((scene) => scene.sentences.map((item) => item.text).join('') ===
    '读取结构化输入；检查第 1 类关系；生成可以继续复核的结果。'));
});

test('editorial planner gives code-switched technical narration a Chinese spoken form', (t) => {
  const repositoryRoot = mkdtempSync(join(tmpdir(), 'zimeiti-editorial-'));
  t.after(() => rmSync(repositoryRoot, {recursive: true, force: true}));
  const research = researchFixture();
  research.video.visualAssets = [];
  research.video.sections[0].narration = 'CLI 根据图类型选择 Renderer；再通过 Typed JSON IR 交付。';
  const {episode} = buildEditorialEpisode({research, repositoryRoot, config});
  const scene = episode.scenes.find((item) =>
    item.sentences?.some((cue) => cue.text.includes('命令行工具')));
  assert.equal(scene.sentences.map((item) => item.text).join(''),
    '命令行工具根据图类型选择渲染器；再通过类型化中间表示交付。');
  assert.ok(scene.sentences.every((item) => item.spoken === undefined));
});

test('evidence wrapping never splits a Latin identifier across lines', (t) => {
  const repositoryRoot = mkdtempSync(join(tmpdir(), 'zimeiti-editorial-'));
  t.after(() => rmSync(repositoryRoot, {recursive: true, force: true}));
  const research = researchFixture();
  research.video.visualAssets = [];
  research.claims[0].evidence[0].detail = 'frontmatter 设置 disable-model-invocation: true。';
  const expandedConfig = {...config, sceneCount: {...config.sceneCount, target: 12, max: 12}};
  const {episode} = buildEditorialEpisode({research, repositoryRoot, config: expandedConfig});
  const scene = episode.scenes.find((item) => item.type === 'code' && item.code.includes('disable-model'));
  assert.ok(scene);
  assert.match(scene.code, /disable-model-invocation: true/u);
  assert.doesNotMatch(scene.code, /disable-model-invocatio\nn/u);
});

test('proper product names stay in English while explanatory jargon can be translated', (t) => {
  const repositoryRoot = mkdtempSync(join(tmpdir(), 'zimeiti-editorial-'));
  t.after(() => rmSync(repositoryRoot, {recursive: true, force: true}));
  const research = researchFixture();
  research.video.visualAssets = [];
  research.video.sections[0].narration = 'Claude 和 OpenAI 都可以使用这个规则。';
  const {episode} = buildEditorialEpisode({research, repositoryRoot, config});
  const spoken = episode.scenes.flatMap((scene) => scene.sentences ?? []).map((item) => item.text).join('');
  assert.match(spoken, /Claude 和 OpenAI/);
  assert.deepEqual(evaluateEditorialQuality(episode, config).errors, []);
});

test('editorial quality rejects untranslated Latin terms in spoken narration', (t) => {
  const repositoryRoot = mkdtempSync(join(tmpdir(), 'zimeiti-editorial-'));
  t.after(() => rmSync(repositoryRoot, {recursive: true, force: true}));
  const research = researchFixture();
  research.video.visualAssets = [];
  const {episode} = buildEditorialEpisode({research, repositoryRoot, config});
  episode.scenes[0].sentences[0].spoken = '这里使用 Kubernetes。';
  const report = evaluateEditorialQuality(episode, config);
  assert.ok(report.errors.some((error) => /untranslated Latin terms: Kubernetes/.test(error)));
});

test('quality gate rejects monotonous plans and selects representative frames deterministically', () => {
  const scenes = Array.from({length: 20}, (_, index) => ({
    type: index === 19 ? 'outro' : 'text', duration: 5,
    heading: `Scene ${index}`, source: 'research.json', evidenceMode: 'source',
    captions: [{startFrame: 0, endFrame: 100, text: `Narration ${index}`}],
  }));
  const storyboard = {meta: {template: 'editorial', fps: 30, researchMode: 'static-source-review'}, scenes};
  const report = evaluateEditorialQuality(storyboard, config);
  assert.ok(report.errors.some((error) => /repeats/.test(error)));
  assert.ok(report.errors.some((error) => /distinct scene types/.test(error)));
  const samples = representativeFrames(storyboard, 8);
  assert.equal(samples.length, 8);
  assert.equal(samples[0].frame, 0);
  assert.equal(samples.at(-1).sceneIndex, 19);
});
