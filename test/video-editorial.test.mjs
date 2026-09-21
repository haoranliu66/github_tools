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

function addVisualEvidencePackage(research) {
  research.visualEvidencePackage = {
    hookMoment: {
      purpose: '先展示依赖图结果', narrationCue: '一张依赖图', visualMode: 'media-crop',
      assetIds: ['hero-image'], claimIndexes: [0], truthMode: 'repository-media', leadSeconds: 0.3,
      focalRegion: {x: 0, y: 0, width: 1, height: 1},
    },
    visualBeats: [
      {id: 'input-wide', sectionIndex: 0, role: 'show', purpose: '展示原始问题', narrationCue: '沟通问题',
        visualMode: 'media-crop', assetIds: ['hero-image'], claimIndexes: [0], truthMode: 'repository-media',
        durationHint: 3, leadSeconds: 0.3, focalRegion: {x: 0, y: 0, width: 1, height: 1}},
      {id: 'input-focus', sectionIndex: 0, role: 'change', purpose: '聚焦整理后的关系', narrationCue: '沟通问题',
        visualMode: 'media-crop', assetIds: ['hero-image'], claimIndexes: [0], truthMode: 'repository-media',
        durationHint: 3, leadSeconds: 0.3, focalRegion: {x: 0.1, y: 0.1, width: 0.6, height: 0.6}},
      {id: 'flow-input', sectionIndex: 1, role: 'show', purpose: '显示输入步骤', narrationCue: '输入',
        visualMode: 'progressive-flow', assetIds: [], claimIndexes: [1], truthMode: 'source-derived-animation',
        durationHint: 3, leadSeconds: 0.3, stepIndex: 0},
      {id: 'flow-output', sectionIndex: 1, role: 'change', purpose: '连接校验和输出', narrationCue: '输出',
        visualMode: 'progressive-flow', assetIds: [], claimIndexes: [1], truthMode: 'source-derived-animation',
        durationHint: 3, leadSeconds: 0.3, stepIndex: 2},
      {id: 'limit-before', sectionIndex: 2, role: 'prove', purpose: '显示结构检查的范围', narrationCue: '结构检查',
        visualMode: 'compare', assetIds: [], claimIndexes: [2], truthMode: 'source-derived-animation',
        durationHint: 3, leadSeconds: 0.3},
      {id: 'limit-after', sectionIndex: 2, role: 'change', purpose: '对比事实核验', narrationCue: '事实核验',
        visualMode: 'compare', assetIds: [], claimIndexes: [2], truthMode: 'source-derived-animation',
        durationHint: 3, leadSeconds: 0.3},
    ],
    demoMoments: [],
    mechanismSteps: [
      {id: 'input', label: '输入', detail: '读取结构化输入', claimIndexes: [1]},
      {id: 'check', label: '检查', detail: '检查关系', claimIndexes: [1]},
      {id: 'output', label: '输出', detail: '生成结果', claimIndexes: [1]},
    ],
    evidenceAssets: [{
      id: 'hero-image', path: 'docs/hero.png', purpose: '展示项目的依赖图结果', mediaType: 'image',
      licenseBasis: 'MIT', truthMode: 'repository-media', claimIndexes: [0],
    }],
    contrastMoments: [{
      id: 'truth-limit', before: '只检查结构', after: '仍需核对系统事实',
      claimIndexes: [2], truthMode: 'source-derived-animation',
    }],
  };
  return research;
}

function preparedVisualEpisode(t) {
  const repositoryRoot = mkdtempSync(join(tmpdir(), 'zimeiti-editorial-'));
  t.after(() => rmSync(repositoryRoot, {recursive: true, force: true}));
  mkdirSync(join(repositoryRoot, 'docs'), {recursive: true});
  writeFileSync(join(repositoryRoot, 'docs', 'hero.png'), Buffer.from([0x89, 0x50, 0x4e, 0x47]));
  const {episode} = buildEditorialEpisode({
    research: addVisualEvidencePackage(researchFixture()), repositoryRoot, config,
  });
  episode.scenes.forEach((scene) => {
    scene.duration = 7.5;
    scene.visualBeats.forEach((beat, index) => {
      beat.alignment = 'cue';
      beat.startFrame = 90 + index * 60;
      beat.endFrame = 150 + index * 60;
    });
  });
  return episode;
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
  assert.equal(episode.scenes[0].stat.value, '1 万多');
  assert.equal(episode.meta.showEvidenceLabels, false);
  assert.equal(episode.scenes.length, config.sceneCount.target);
  assert.ok(report.metrics.bRollCoverage >= config.bRoll.minimumCoverage);
  assert.ok(new Set(episode.scenes.map((scene) => scene.type)).size >= config.rhythm.minDistinctTypes);
  assert.ok(episode.scenes.every((scene) => scene.source && scene.evidenceMode));
  assert.ok(episode.scenes.every((scene) => scene.showEvidenceLabels === false));
  assert.ok(episode.scenes.every((scene) =>
    scene.sentences.every((item) => item.text && typeof item.sentenceEnd === 'boolean' && !item.text.includes('…'))));
  assert.equal(episode.meta.narrationProfile, 'concept-explainer');
  assert.equal(episode.scenes[1].heading, '它具体解决什么麻烦？');
  const spoken = episode.scenes.flatMap((scene) => scene.sentences).map((item) => item.text).join('');
  assert.doesNotMatch(spoken, /官方素材|非本机实测|趋势分|证据边界/);
  assert.equal((spoken.match(/stars/giu) ?? []).length, 1);
  const outro = episode.scenes.find((scene) => scene.type === 'outro');
  assert.equal(outro.sentences.map((item) => item.text).join(''),
    '保留结构和证据，再决定是否把它用于真实项目。');
});

test('editorial planner consumes every researched visual beat instead of repeating one still', (t) => {
  const repositoryRoot = mkdtempSync(join(tmpdir(), 'zimeiti-editorial-'));
  t.after(() => rmSync(repositoryRoot, {recursive: true, force: true}));
  mkdirSync(join(repositoryRoot, 'docs'), {recursive: true});
  writeFileSync(join(repositoryRoot, 'docs', 'hero.png'), Buffer.from([0x89, 0x50, 0x4e, 0x47]));
  const research = addVisualEvidencePackage(researchFixture());
  const {episode} = buildEditorialEpisode({research, repositoryRoot, config});
  const beatIds = episode.scenes.flatMap((scene) => scene.visualBeats ?? []).map((beat) => beat.id);
  assert.equal(episode.meta.visualBeatContractVersion, 1);
  assert.equal(episode.scenes.length, research.video.sections.length + 3);
  assert.match(episode.scenes[1].src, /^https:\/\/opengraph\.githubassets\.com\//u);
  assert.equal(episode.scenes[1].stat, undefined);
  assert.ok(!episode.scenes.some((scene) => ['它具体解决什么麻烦？', '它适合你吗？'].includes(scene.heading)));
  assert.ok(research.visualEvidencePackage.visualBeats.every((beat) => beatIds.includes(beat.id)));
  assert.ok(episode.scenes.some((scene) => scene.type === 'flow'));
  assert.ok(episode.scenes.some((scene) => scene.type === 'contrast'));
  assert.ok(episode.scenes.some((scene) => scene.type === 'media' && scene.visualBeats.length > 1));
  const structuredBeats = episode.scenes.flatMap((scene) => scene.visualBeats ?? []);
  assert.ok(structuredBeats.some((beat) => beat.visualMode === 'progressive-flow' && beat.flowSteps?.length >= 3));
  assert.ok(structuredBeats.some((beat) => beat.visualMode === 'compare' && beat.contrast?.before && beat.contrast?.after));
  assert.deepEqual(evaluateEditorialQuality(episode, config).errors, []);
});

test('visual production removes a repeated hook sentence instead of adding problem and fit scenes', (t) => {
  const repositoryRoot = mkdtempSync(join(tmpdir(), 'zimeiti-editorial-'));
  t.after(() => rmSync(repositoryRoot, {recursive: true, force: true}));
  mkdirSync(join(repositoryRoot, 'docs'), {recursive: true});
  writeFileSync(join(repositoryRoot, 'docs', 'hero.png'), Buffer.from([0x89, 0x50, 0x4e, 0x47]));
  const research = addVisualEvidencePackage(researchFixture());
  research.video.hook = '缓存没命中，请求到底去了哪儿？';
  research.video.sections[0].narration = '缓存没命中，请求接下来去哪儿？Archify 能把系统描述变成图。';
  research.visualEvidencePackage.visualBeats[0].narrationCue = '缓存没命中';
  research.visualEvidencePackage.visualBeats[1].narrationCue = '变成图';
  const {episode} = buildEditorialEpisode({research, repositoryRoot, config});
  const spoken = episode.scenes.flatMap((scene) => scene.sentences ?? []).map((item) => item.text).join('');
  assert.equal((spoken.match(/缓存没命中/gu) ?? []).length, 1);
  assert.ok(!episode.scenes.some((scene) => ['它具体解决什么麻烦？', '它适合你吗？'].includes(scene.heading)));
  assert.equal(episode.scenes.at(-1).sentences.map((item) => item.text).join(''), research.video.closing);
  assert.doesNotMatch(episode.scenes.at(-1).sentences.map((item) => item.text).join(''), /项目地址见画面/u);
});

test('authored continuous narration keeps section transitions and uses approximate popularity once', (t) => {
  const repositoryRoot = mkdtempSync(join(tmpdir(), 'zimeiti-editorial-'));
  t.after(() => rmSync(repositoryRoot, {recursive: true, force: true}));
  mkdirSync(join(repositoryRoot, 'docs'), {recursive: true});
  writeFileSync(join(repositoryRoot, 'docs', 'hero.png'), Buffer.from([0x89, 0x50, 0x4e, 0x47]));
  const research = addVisualEvidencePackage(researchFixture());
  research.video.hook = '一个人梳理服务关系时，很容易越画越乱。这个开源工具可能会帮到你，它叫 Signal Map。';
  research.video.sections[0].narration = '先把输入交给它，关系就会顺着同一个例子展开。';
  research.video.sections[1].narration = '接着沿着这份结果检查关键连接。';
  research.video.sections[2].narration = '最后把整理好的图留给下一次修改。';
  research.video.closing = '如果你经常独立梳理项目，可以先收藏 Signal Map。';
  research.video.fullNarration = research.video.hook +
    research.video.sections.map((section) => section.narration).join('') + research.video.closing;
  research.visualEvidencePackage.hookMoment.narrationCue = '一个人梳理';
  research.visualEvidencePackage.visualBeats.forEach((beat) => {
    beat.narrationCue = research.video.sections[beat.sectionIndex].narration.slice(0, 6);
  });
  const {episode} = buildEditorialEpisode({
    research, repositoryRoot, config, trendRow: {stars: 61_476},
  });
  const spoken = episode.scenes.flatMap((scene) => scene.sentences ?? []).map((item) => item.text).join('');
  assert.match(spoken, /它叫 Signal Map，目前已经收获 6 万多 stars/u);
  assert.equal((spoken.match(/stars/giu) ?? []).length, 1);
  assert.match(spoken, /同一个例子展开。接着沿着这份结果/u);
  assert.match(spoken, /先收藏 Signal Map/u);
  assert.doesNotMatch(spoken, /61[,.]?476/u);
});

test('visual beat cues preserve intentional English terms from the research copy', (t) => {
  const repositoryRoot = mkdtempSync(join(tmpdir(), 'zimeiti-editorial-'));
  t.after(() => rmSync(repositoryRoot, {recursive: true, force: true}));
  mkdirSync(join(repositoryRoot, 'docs'), {recursive: true});
  writeFileSync(join(repositoryRoot, 'docs', 'hero.png'), Buffer.from([0x89, 0x50, 0x4e, 0x47]));
  const research = addVisualEvidencePackage(researchFixture());
  research.video.sections[1].narration = 'CLI 读取输入、校验关系，再输出结果。';
  research.visualEvidencePackage.visualBeats[2].narrationCue = 'CLI';
  research.visualEvidencePackage.visualBeats[3].narrationCue = '输出结果';
  const {episode} = buildEditorialEpisode({research, repositoryRoot, config});
  const scene = episode.scenes.find((item) =>
    item.visualBeats?.some((beat) => beat.id === 'flow-input'));
  const spoken = scene.sentences.map((item) => item.text).join('');
  assert.equal(scene.visualBeats[0].narrationCue, 'CLI');
  assert.match(spoken, /CLI/u);
});

test('editorial planner preserves English terms without a language gate', (t) => {
  const repositoryRoot = mkdtempSync(join(tmpdir(), 'zimeiti-editorial-'));
  t.after(() => rmSync(repositoryRoot, {recursive: true, force: true}));
  mkdirSync(join(repositoryRoot, 'docs'), {recursive: true});
  writeFileSync(join(repositoryRoot, 'docs', 'hero.png'), Buffer.from([0x89, 0x50, 0x4e, 0x47]));
  const research = addVisualEvidencePackage(researchFixture());
  research.video.sections[0].narration = 'API 先读取输入，再返回结果。';
  research.visualEvidencePackage.visualBeats[0].narrationCue = 'API';
  const {episode} = buildEditorialEpisode({
    research,
    repositoryRoot,
    config,
  });
  const spoken = episode.scenes.flatMap((scene) => scene.sentences ?? [])
    .map((item) => item.text).join('');
  assert.match(spoken, /API 先读取输入/u);
  assert.ok(episode.scenes.flatMap((scene) => scene.visualBeats ?? [])
    .some((beat) => beat.narrationCue === 'API'));
  assert.deepEqual(evaluateEditorialQuality(episode, config).errors, []);
});

test('visual semantic gap remains a reported metric instead of a program gate', (t) => {
  const episode = preparedVisualEpisode(t);
  episode.scenes[0].duration = 10;
  episode.scenes[0].visualBeats.forEach((beat) => {
    beat.startFrame = 0;
    beat.endFrame = 30;
  });
  const report = evaluateEditorialQuality(episode, config);
  assert.ok(report.metrics.maxSemanticVisualGapSeconds > 6);
  assert.ok(!report.errors.some((error) => /visual semantic gap/i.test(error)));
});

test('repeated visual composition is left to skill guidance and human review', (t) => {
  const episode = preparedVisualEpisode(t);
  const beats = episode.scenes.flatMap((scene) => scene.visualBeats);
  for (const beat of beats.slice(0, 2)) {
    beat.visualMode = 'media-crop';
    beat.assetIds = ['hero-image'];
    beat.focalRegion = {x: 0, y: 0, width: 1, height: 1};
  }
  const report = evaluateEditorialQuality(episode, config);
  assert.ok(!report.errors.some((error) => /same media asset, crop, and mode/.test(error)));
});

test('dynamic media containers are measured by their semantic beat changes', () => {
  const scenes = Array.from({length: 4}, (_, index) => ({
    type: 'media', duration: 8, src: `asset-${index}.png`, heading: `Scene ${index}`,
    source: 'research.json', evidenceMode: 'source',
    captions: [{startFrame: 0, endFrame: 240, text: `Narration ${index}`}],
    visualBeats: [
      {role: 'show', truthMode: 'repository-media', claimIndexes: [0], leadSeconds: 0,
        visualMode: 'media-crop'},
      {role: 'change', truthMode: 'source-derived-animation', claimIndexes: [0], leadSeconds: 0.3,
        visualMode: index % 2 ? 'compare' : 'progressive-flow'},
    ],
  }));
  const storyboard = {
    meta: {template: 'editorial', fps: 30, researchMode: 'static-source-review', showEvidenceLabels: false},
    scenes: [
      {type: 'hero', duration: 8, src: 'hero.png', source: 'github', evidenceMode: 'official',
        captions: [{startFrame: 0, endFrame: 240, text: 'Opening'}]},
      ...scenes,
      {type: 'outro', duration: 8, heading: '结束', source: 'research.json', evidenceMode: 'editorial',
        captions: [{startFrame: 0, endFrame: 240, text: 'Closing'}]},
    ],
  };
  const report = evaluateEditorialQuality(storyboard, config);
  assert.ok(!report.errors.some((error) => /scene type media repeats/.test(error)));
});

test('visual cue coverage remains a reported metric instead of a program gate', (t) => {
  const episode = preparedVisualEpisode(t);
  const beats = episode.scenes.flatMap((scene) => scene.visualBeats);
  beats.forEach((beat, index) => {
    beat.alignment = index === 0 ? 'cue' : 'distributed';
  });
  const report = evaluateEditorialQuality(episode, config);
  assert.ok(report.metrics.visualCueCoverage < 0.8);
  assert.ok(!report.errors.some((error) => /cue alignment must be at least/.test(error)));
});

test('prepared visual beat quality reports missing beats without crashing', (t) => {
  const episode = preparedVisualEpisode(t);
  episode.meta.narrationAlignment = 'measured-block-weighted-cues';
  episode.scenes[0].visualBeats = [];
  const report = evaluateEditorialQuality(episode, config);
  assert.ok(report.errors.some((error) => /scenes\[0\] requires at least one visual beat/.test(error)));
  assert.ok(report.errors.some((error) => /alignment result for every beat/.test(error)));
});

test('editorial planner keeps limitations out of narration and production directions off screen', (t) => {
  const repositoryRoot = mkdtempSync(join(tmpdir(), 'zimeiti-editorial-'));
  t.after(() => rmSync(repositoryRoot, {recursive: true, force: true}));
  mkdirSync(join(repositoryRoot, 'docs'), {recursive: true});
  writeFileSync(join(repositoryRoot, 'docs', 'hero.png'), Buffer.from([0x89, 0x50, 0x4e, 0x47]));
  const research = researchFixture();
  research.editorialBrief = {
    intendedViewer: '需要向同事讲清流程、但不想手工排图的人。',
    familiarProblem: '流程写成一大段，听的人还是分不清先后。',
    oneSentenceAnswer: '把系统关系做成可交互图，沿着连线就能看懂流程。',
  };
  research.video.sections[0].visual = '镜头1：先推近截图，再高亮箭头。';
  research.limitations = [
    'Agent 对系统的理解与 JSON 内容可能不准确。',
    '源文件未显示模型费用或首次出图成功率，不能承诺零成本或一次成功。',
  ];
  const {episode} = buildEditorialEpisode({research, repositoryRoot, config});
  const spoken = episode.scenes.flatMap((scene) => scene.sentences ?? []).map((item) => item.text).join('');
  const media = episode.scenes.find((scene) => scene.type === 'media');
  assert.doesNotMatch(spoken, /人。[,，。]/u);
  assert.match(spoken, /这个项目值得看看/u);
  assert.doesNotMatch(spoken, /模型费用|首次出图成功率|一个限制|不过/u);
  assert.doesNotMatch(media.body, /镜头1|推近|高亮/u);
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
    item.sentences?.some((cue) => cue.text.includes('现成 HTML')));
  assert.equal(scene.sentences.map((item) => item.text).join(''),
    '先打开现成 HTML，再依次展示 doctor、validate、deliver 和 compare。');
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

test('editorial planner does not rewrite code-switched narration in program logic', (t) => {
  const repositoryRoot = mkdtempSync(join(tmpdir(), 'zimeiti-editorial-'));
  t.after(() => rmSync(repositoryRoot, {recursive: true, force: true}));
  const research = researchFixture();
  research.video.visualAssets = [];
  research.video.sections[0].narration = 'CLI 根据图类型选择 Renderer；再通过 Typed JSON IR 交付。';
  const {episode} = buildEditorialEpisode({research, repositoryRoot, config});
  const scene = episode.scenes.find((item) =>
    item.sentences?.some((cue) => cue.text.includes('CLI')));
  assert.equal(scene.sentences.map((item) => item.text).join(''),
    'CLI 根据图类型选择 Renderer；再通过 Typed JSON IR 交付。');
  assert.ok(scene.sentences.every((item) => item.spoken === undefined));
});

test('claim fallback uses a feature flow instead of manufacturing source-code B-roll', (t) => {
  const repositoryRoot = mkdtempSync(join(tmpdir(), 'zimeiti-editorial-'));
  t.after(() => rmSync(repositoryRoot, {recursive: true, force: true}));
  const research = researchFixture();
  research.video.visualAssets = [];
  research.claims[0].evidence[0].detail = 'frontmatter 设置 disable-model-invocation: true。';
  const expandedConfig = {...config, sceneCount: {...config.sceneCount, target: 12, max: 12}};
  const {episode} = buildEditorialEpisode({research, repositoryRoot, config: expandedConfig});
  assert.ok(episode.scenes.some((item) =>
    item.type === 'flow' && item.steps?.some((step) => step.title === '项目功能')));
  assert.ok(!episode.scenes.some((item) => item.type === 'code'));
});

test('proper product names stay in English', (t) => {
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

test('editorial quality does not reject English terms in spoken narration', (t) => {
  const repositoryRoot = mkdtempSync(join(tmpdir(), 'zimeiti-editorial-'));
  t.after(() => rmSync(repositoryRoot, {recursive: true, force: true}));
  const research = researchFixture();
  research.video.visualAssets = [];
  const {episode} = buildEditorialEpisode({research, repositoryRoot, config});
  episode.scenes[0].sentences[0].spoken = '这里使用 Kubernetes。';
  const report = evaluateEditorialQuality(episode, config);
  assert.ok(!report.errors.some((error) => /untranslated Latin terms/.test(error)));
});

test('narration length uses a soft target before the relaxed hard limit', () => {
  const makeStoryboard = (characters) => ({
    meta: {template: 'editorial', fps: 30, researchMode: 'static-source-review'},
    scenes: [{
      type: 'outro', duration: 60, heading: '结尾', source: 'research.json', evidenceMode: 'source',
      captions: [{startFrame: 0, endFrame: 1800, text: '字'.repeat(characters)}],
    }],
  });
  const softReport = evaluateEditorialQuality(
    makeStoryboard(config.text.softNarrationCharacters + 16), config);
  assert.ok(softReport.warnings.some((warning) => /short-form soft target/.test(warning)));
  assert.ok(!softReport.errors.some((error) => /short-form hard limit/.test(error)));

  const hardReport = evaluateEditorialQuality(
    makeStoryboard(config.text.maxNarrationCharacters + 1), config);
  assert.ok(hardReport.errors.some((error) => /short-form hard limit/.test(error)));
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
