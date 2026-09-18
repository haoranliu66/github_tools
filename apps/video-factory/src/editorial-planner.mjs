import {existsSync, lstatSync, realpathSync} from 'node:fs';
import {extname, isAbsolute, resolve, sep} from 'node:path';

function clean(value) {
  return String(value ?? '').replace(/\s+/g, ' ').trim();
}

function clip(value, maximum = 54) {
  const text = clean(value);
  if (text.length <= maximum) return text;
  const sentence = text.split(/(?<=[。！？；])/u).find((item) => item.trim().length >= 12);
  if (sentence && sentence.length <= maximum) return sentence.trim();
  return `${text.slice(0, maximum - 1).trim()}…`;
}

function card(value, fallback) {
  const text = clip(value || fallback, 30);
  return {title: clip(text, 14), body: text.length > 14 ? text : '结合证据判断是否适用'};
}

const SPOKEN_REPLACEMENTS = [
  [/Architecture Delta/giu, '架构差异'],
  [/Workflow v2/giu, '第二版工作流'],
  [/Schema Validator/giu, '数据模式校验器'],
  [/Typed JSON IR/giu, '类型化中间表示'],
  [/JSON IR/giu, '中间表示'],
  [/HTML\s*\/\s*SVG/giu, '网页和矢量图'],
  [/authored topology/giu, '作者定义的拓扑关系'],
  [/visual-check/giu, '视觉检查命令'],
  [/Git commit/giu, '代码提交版本'],
  [/PRODUCT\.md/giu, '产品说明'],
  [/Node\.js/giu, '节点运行环境'],
  [/WYSIWYG/giu, '所见即所得'],
  [/supportedFixes/gu, '支持的修复项'],
  [/authored reachability/giu, '作者定义的可达关系'],
  [/\bcode\b/giu, '错误代码'],
  [/\bsubject\b/giu, '问题对象'],
  [/\bevidence\b/giu, '证据'],
  [/\bauthored\b/giu, '作者定义的'],
  [/\breachability\b/giu, '可达关系'],
  [/\barchitecture\b/giu, '架构图'],
  [/\bworkflow\b/giu, '工作流图'],
  [/\bsequence\b/giu, '时序图'],
  [/\bdataflow\b/giu, '数据流图'],
  [/\blifecycle\b/giu, '生命周期图'],
  [/\bRenderer\b/giu, '渲染器'],
  [/\bSchema\b/giu, '数据模式'],
  [/\bCLI\b/gu, '命令行工具'],
  [/\bAgent\b/giu, '智能体'],
  [/\bREADME\b/giu, '项目说明'],
  [/\bHTML\b/giu, '网页'],
  [/\bSVG\b/giu, '矢量图'],
  [/\bdoctor\b/giu, '环境检查命令'],
  [/\bvalidate\b/giu, '校验命令'],
  [/\bdeliver\b/giu, '交付命令'],
  [/\bcompare\b/giu, '差异比较命令'],
  [/\bcommit\b/giu, '提交版本'],
  [/\bGitHub\b/giu, '代码托管平台'],
  [/\bStars?\b/giu, '星标'],
  [/\bnot-run\b/giu, '未运行'],
];

function spokenNarration(value) {
  let spoken = value;
  for (const [pattern, replacement] of SPOKEN_REPLACEMENTS) {
    spoken = spoken.replace(pattern, replacement);
  }
  return spoken
    .replace(/\s+([，。；：！？、])/gu, '$1')
    .replace(/([，。；：！？、])\s+/gu, '$1')
    .replace(/([\p{Script=Han}])\s+(?=[\p{Script=Han}])/gu, '$1');
}

function completeSentences(value) {
  let text = clean(value);
  if (!/[。！？.!?]$/u.test(text)) text = `${text}。`;
  return text.match(/[^。！？.!?]+[。！？.!?]+/gu) ?? [text];
}

function subtitlePieces(sentence, softMaximum) {
  if (sentence.length <= softMaximum) return [sentence];
  const clauses = sentence.match(/[^，；：,;:]+[，；：,;:]?/gu) ?? [sentence];
  const pieces = [];
  let current = '';
  for (const clause of clauses) {
    if (current && current.length + clause.length > softMaximum) {
      pieces.push(current);
      current = clause;
    } else {
      current += clause;
    }
  }
  if (current) pieces.push(current);
  return pieces;
}

function narrationCues(text, softMaximum) {
  const sentences = completeSentences(spokenNarration(text));
  return sentences.flatMap((sentence, sentenceIndex) => {
    const pieces = subtitlePieces(sentence, softMaximum);
    return pieces.map((piece, pieceIndex) => ({
      text: piece.trim(),
      sentenceEnd: pieceIndex === pieces.length - 1,
      sentenceIndex,
    }));
  });
}

function inferNarrationProfile(research) {
  const editorialIntent = clean([
    research.video?.title,
    research.video?.hook,
    ...(research.video?.sections ?? []).map((section) => section.heading),
  ].join(' '));
  const searchable = clean([
    editorialIntent,
    research.executiveSummary,
    ...(research.video?.sections ?? []).map((section) => section.narration),
  ].join(' '));
  if (/快讯|速报|本周更新|发布速览|release notes|changelog/iu.test(editorialIntent)) return 'quick-news';
  if ((research.demoPlan ?? []).some((item) => item.status === 'passed') &&
      /操作|演示|步骤|安装|运行|命令/iu.test(searchable)) return 'operation-demo';
  if ((research.claims?.length ?? 0) > 0 || /源码|代码|架构|流程|接口|命令行/iu.test(searchable)) {
    return 'code-analysis';
  }
  return 'concept-explainer';
}

function sourceLabel(source, commit) {
  return `依据：${source || 'research.json'} @ ${commit.slice(0, 8)}`;
}

function wrapEvidence(value, width = 38) {
  const text = clean(value);
  const lines = [];
  for (let offset = 0; offset < text.length && lines.length < 6; offset += width) {
    lines.push(text.slice(offset, offset + width));
  }
  return lines.join('\n');
}

function inside(root, target) {
  const base = `${resolve(root)}${sep}`.toLowerCase();
  return resolve(target).toLowerCase().startsWith(base);
}

function approvedAssets(research, repositoryRoot, config) {
  const warnings = [];
  const assets = [];
  const declared = research.video?.visualAssets ?? [];
  for (const item of declared.slice(0, config.media.maxAssets)) {
    if (!item?.path || isAbsolute(item.path) || item.path.split(/[\\/]/).includes('..')) {
      throw new Error(`Unsafe visual asset path in research package: ${item?.path ?? '(missing)'}`);
    }
    const candidate = resolve(repositoryRoot, item.path);
    if (!inside(repositoryRoot, candidate) || !existsSync(candidate)) {
      warnings.push(`Visual asset is unavailable: ${item.path}`);
      continue;
    }
    const stat = lstatSync(candidate);
    if (!stat.isFile() || stat.size > config.media.maxBytes ||
        !config.media.extensions.includes(extname(candidate).toLowerCase())) {
      warnings.push(`Visual asset is unsupported or too large: ${item.path}`);
      continue;
    }
    const real = realpathSync(candidate);
    if (!inside(repositoryRoot, real)) throw new Error(`Visual asset resolves outside the repository: ${item.path}`);
    assets.push({...item, absolutePath: real});
  }
  return {assets, warnings};
}

function findingFlow(finding, commit, subtitleMaximum, topic) {
  const parts = clean(finding.detail).split(/[；。]/u).map((item) => item.trim()).filter(Boolean).slice(0, 4);
  const steps = (parts.length >= 2 ? parts : [finding.title, finding.detail]).slice(0, 4).map((item) => ({
    title: clip(item, 14),
    detail: clip(item, 24),
  }));
  return {
    type: 'flow',
    heading: clip(finding.title, 32),
    steps,
    activeIndex: steps.length - 1,
    evidenceMode: 'source',
    keyword: clip(finding.title, 8),
    source: sourceLabel('research.json / inspected repository files', commit),
    narrationTopic: topic,
    sentences: narrationCues(`${finding.title}：${clean(finding.detail)}`, subtitleMaximum),
  };
}

function claimCode(claim, commit, subtitleMaximum, topic = 'evidence') {
  const evidence = claim.evidence?.[0] ?? {};
  const code = wrapEvidence(evidence.detail || claim.claim);
  return {
    type: 'code',
    heading: clip(claim.claim, 34),
    code,
    highlightLines: Array.from({length: Math.min(3, code.split('\n').length)}, (_, index) => index + 1),
    evidenceMode: 'source',
    keyword: clip(claim.claim, 8),
    source: sourceLabel(evidence.source, commit),
    narrationTopic: topic,
    sentences: narrationCues(claim.claim, subtitleMaximum),
  };
}

function mediaScene(asset, commit, index, subtitleMaximum, topic) {
  return {
    type: 'media',
    heading: clip(asset.purpose, 30),
    body: '仓库提供的项目画面，用来核对功能表达。',
    src: asset.absolutePath,
    fit: 'cover',
    position: 'center',
    zoom: 1.04 + index * 0.04,
    zoomTravel: 0.06,
    callout: '官方仓库素材',
    evidenceMode: 'official',
    keyword: '官方素材',
    source: `来源：${asset.path} @ ${commit.slice(0, 8)} · ${asset.licenseBasis} · 非本机实测`,
    narrationTopic: topic,
    sentences: narrationCues('官方素材展示项目画面，非本机实测。', subtitleMaximum),
  };
}

export function buildEditorialEpisode({research, trendRow = null, repositoryRoot, config, dataDate = ''}) {
  if (research?.status !== 'completed') throw new Error('Editorial planning requires completed research.');
  const commit = research.project?.versionOrCommit ?? '';
  if (!/^[a-f0-9]{40,64}$/i.test(commit)) throw new Error('Editorial planning requires a fixed Git commit SHA.');
  const {assets, warnings} = approvedAssets(research, repositoryRoot, config);
  const name = clean(research.project.name);
  const hasPassedDemo = research.demoPlan?.some((item) => item.status === 'passed') ?? false;
  const findings = research.findings ?? [];
  const claims = research.claims ?? [];
  const sections = research.video?.sections ?? [];
  const subtitleMaximum = config.text.softSubtitleCharacters;
  const narration = (text) => narrationCues(text, subtitleMaximum);
  const narrationProfile = inferNarrationProfile(research);
  const overviewItems = [...findings.map((item) => item.title), ...sections.map((item) => item.heading)]
    .filter(Boolean).slice(0, 4);
  while (overviewItems.length < 2) overviewItems.push(overviewItems.length ? '核对证据' : '理解问题');

  const opening = assets.length ? {
    type: 'hero',
    src: assets[0].absolutePath,
    position: 'center',
    kicker: 'OPEN WITH THE RESULT',
    headline: `${name}\n值得关注吗？`,
    subhead: clip(research.video.hook, 54),
    badges: [name, '官方素材'],
    evidenceMode: 'official',
    keyword: '值得关注',
    source: `来源：${assets[0].path} @ ${commit.slice(0, 8)} · ${assets[0].licenseBasis} · 非本机实测`,
    narrationTopic: 'opening',
    sentences: narration(research.video.hook),
  } : {
    type: 'contrast',
    heading: clip(research.video.hook, 34),
    left: {eyebrow: 'FIRST LOOK', title: name, body: '先看项目解决什么问题', tone: 'positive'},
    right: {eyebrow: 'REAL QUESTION', title: '证据够吗？', body: '再看源码、限制与适用场景', tone: 'positive'},
    evidenceMode: 'editorial',
    keyword: name,
    source: sourceLabel('research.json / editorial hook', commit),
    narrationTopic: 'opening',
    sentences: narration(research.video.hook),
  };

  const scenes = [opening, {
    type: 'flow',
    heading: '先建立一条清晰的理解路径',
    steps: overviewItems.map((item) => ({title: clip(item, 14), detail: '依据研究包逐项核对'})),
    activeIndex: overviewItems.length - 1,
    evidenceMode: 'source',
    keyword: '理解路径',
    source: sourceLabel('research.json findings', commit),
    narrationTopic: 'opening',
    sentences: narration(`这期看${overviewItems.slice(0, 3).join('、')}。`),
  }];

  if (trendRow && Number.isFinite(trendRow.stars)) {
    scenes.push({
      type: 'stat', heading: '热度只是线索', value: trendRow.stars.toLocaleString('en-US'),
      label: 'GitHub Stars', body: `${dataDate || trendRow.weekId || '当周'} 采集快照`,
      evidenceMode: 'data', keyword: '热度',
      source: `数据：weekly trend report · 趋势分 ${trendRow.trendScore} / 93`,
      narrationTopic: 'opening',
      sentences: narration(`采集时为${trendRow.stars.toLocaleString('zh-CN')}星，热度只是线索。`),
    });
  }
  scenes.push({
    type: 'text', eyebrow: 'THE THESIS', heading: clip(research.executiveSummary, 34),
    body: '接下来把结论拆回机制、源码证据和使用边界。', evidenceMode: 'source', keyword: '机制',
    source: sourceLabel('research.json executiveSummary', commit),
    narrationTopic: 'opening',
    sentences: narration(`${name}让技术图可检查、可追溯。`),
  });

  const mainCount = Math.max(sections.length, findings.length, claims.length, 1);
  for (let index = 0; index < Math.min(mainCount, 6); index += 1) {
    const section = sections[index];
    const topic = section && /演示|操作|实测|步骤|路线/iu.test(
      clean(`${section.heading} ${section.narration} ${section.visual}`),
    ) ? 'adoption' : `main-${index + 1}`;
    if (section) scenes.push({
      type: 'text', eyebrow: `PART ${String(index + 1).padStart(2, '0')}`,
      heading: clip(section.heading, 32), body: clip(section.visual, 52),
      evidenceMode: 'editorial', keyword: clip(section.heading, 8),
      source: sourceLabel('research.json video plan', commit),
      narrationTopic: topic,
      sentences: narration(section.narration),
    });
    const finding = findings[index];
    if (finding) scenes.push(findingFlow(finding, commit, subtitleMaximum, topic));
    const claim = claims[index];
    if (claim) scenes.push(claimCode(claim, commit, subtitleMaximum, topic));
    if (index < assets.length) scenes.push(mediaScene(assets[index], commit, index, subtitleMaximum, topic));
  }

  const audience = (research.audience ?? []).slice(0, 3).map((item) => card(item, '技术内容读者'));
  while (audience.length < 2) audience.push(card(audience.length ? '需要评估采用边界的团队' : '希望理解项目机制的开发者'));
  const demoSteps = (research.demoPlan ?? []).slice(0, 4).map((item) => ({
    title: clip(item.step, 14), detail: item.status === 'passed' ? '已验证' : '待运行验证',
  }));
  while (demoSteps.length < 2) demoSteps.push({title: demoSteps.length ? '核对输出' : '阅读文档', detail: '保留人工检查'});
  const limitations = [...(research.limitations ?? [])];
  while (limitations.length < 2) limitations.push(hasPassedDemo ? '运行结果仍需结合实际环境复核。' : '本期没有运行项目，效果仍需实际验证。');
  const verified = claims[0]?.claim ?? research.executiveSummary;

  const tail = [{
    type: 'audience', heading: '它更适合哪些人？', items: audience, activeIndex: Math.min(1, audience.length - 1),
    evidenceMode: 'editorial', keyword: audience[0].title,
    source: sourceLabel('research.json audience', commit),
    narrationTopic: 'adoption',
    sentences: narration('适合工程师、架构师和技术评审。'),
  }, {
    type: 'flow', heading: hasPassedDemo ? '演示验证路径' : '如果要实测，应该这样验证',
    steps: demoSteps, activeIndex: hasPassedDemo ? demoSteps.length - 1 : 0,
    evidenceMode: hasPassedDemo ? 'demo' : 'source', keyword: hasPassedDemo ? '已验证' : '实测',
    source: sourceLabel('research.json demoPlan', commit),
    narrationTopic: 'adoption',
    sentences: narration(hasPassedDemo ? '演示已有记录，仍需结合环境复核。' : '演示步骤未运行，不能当作实测。'),
  }, ...limitations.slice(0, 2).map((limitation, index) => ({
    type: 'contrast', heading: index ? '采用前再看一个限制' : '这里有一道重要边界',
    left: {eyebrow: 'VERIFIED', title: '源码能确认', body: clip(verified, 34), tone: 'positive'},
    right: {eyebrow: 'LIMIT', title: '仍需复核', body: clip(limitation, 38), tone: 'negative'},
    evidenceMode: 'source', keyword: '仍需复核',
    source: sourceLabel('research.json claims / limitations', commit),
    narrationTopic: 'limitations',
    sentences: narration(index ? '浅克隆限制了提交历史检查。' : '这是只读研究，未验证实际运行。'),
  })), {
    type: 'text', eyebrow: 'EVIDENCE BOUNDARY',
    heading: hasPassedDemo ? '结论包含已通过的演示步骤' : '本期只做了源码研究',
    body: hasPassedDemo ? '运行结论只覆盖研究包记录的通过步骤。' : '官方素材用于解释功能，没有包装成本机端到端实测。',
    evidenceMode: hasPassedDemo ? 'demo' : 'source', keyword: hasPassedDemo ? '通过步骤' : '源码研究',
    source: sourceLabel('research.json demoability', commit),
    narrationTopic: 'limitations',
    sentences: narration(hasPassedDemo ? '运行结论只覆盖明确通过的步骤。' : '本期仅做源码研究，没有运行项目。'),
  }, {
    type: 'flow', heading: '一句话带走', steps: [
      {title: '看问题', detail: '它解决什么'}, {title: '看机制', detail: '源码怎样实现'}, {title: '看边界', detail: '哪些仍未验证'},
    ], activeIndex: 2, evidenceMode: 'editorial', keyword: '证据',
    source: sourceLabel('editorial conclusion / research.json', commit),
    narrationTopic: 'conclusion',
    sentences: narration(`${name}的价值，要结合证据和边界判断。`),
  }, {
    type: 'outro', eyebrow: 'OPEN SOURCE NOTES', title: clip(research.video.closing, 38),
    subtitle: '先看证据，再决定是否采用。', tagline: research.project.url,
    evidenceMode: 'editorial', keyword: '先看证据',
    source: `${sourceLabel('research.json', commit)} · ${hasPassedDemo ? '含已通过演示步骤' : '本期非运行实测'}`,
    narrationTopic: 'conclusion',
    sentences: narration('项目证据在简介里，先看清再采用。'),
  }];

  const targetSceneCount = Math.min(config.sceneCount.max,
    Math.max(config.sceneCount.min, config.sceneCount.target ?? config.sceneCount.max));
  while (scenes.length + tail.length < targetSceneCount) {
    const claim = claims[(scenes.length + tail.length) % Math.max(1, claims.length)] ?? {claim: verified, evidence: []};
    scenes.push(claimCode(claim, commit, subtitleMaximum, 'evidence-recap'));
  }
  const maximumCore = targetSceneCount - tail.length;
  const finalScenes = [...scenes.slice(0, maximumCore), ...tail];
  return {
    episode: {
      meta: {
        title: research.video.title,
        repo: research.project.url.replace(/^https?:\/\/github\.com\//, ''),
        template: 'editorial', accent: '#b8f76c', width: 1920, height: 1080, fps: 30,
        researchMode: hasPassedDemo ? 'verified-demo' : 'static-source-review',
        commit, dataDate, planner: 'editorial', visualAssetCount: assets.length,
        spokenLatinAllowlist: [name], narrationProfile,
      },
      scenes: finalScenes,
    },
    warnings,
  };
}
