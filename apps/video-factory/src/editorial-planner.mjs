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

const SPOKEN_REPLACEMENTS = [
  [/Before\s*\/\s*After/giu, '前后'],
  [/Action first/giu, '行动优先'],
  [/Steps numbered/giu, '步骤编号'],
  [/canonical\s+SKILL\.md/giu, '主技能规则文件'],
  [/skills[\\/]i-have-adhd[\\/]SKILL\.md/giu, '项目的技能规则文件'],
  [/SKILL\.md/gu, '技能规则文件'],
  [/INSTALL\.md/gu, '安装说明'],
  [/SessionStart/gu, '会话启动'],
  [/always-on/giu, '持续启用'],
  [/frontmatter/giu, '文档头部元数据'],
  [/\bmanifest\b/giu, '清单文件'],
  [/\bcanonical\b/giu, '主规则'],
  [/\bskills\b/giu, '技能'],
  [/平衡结论[:：]?/gu, '简单说，'],
  [/核心机制/gu, '它的做法'],
  [/证据边界/gu, '使用限制'],
  [/低门槛/gu, '容易上手'],
  [/工程封装完整/gu, '安装和使用方式比较完整'],
  [/可靠性增强器/gu, '答案正确性的保证'],
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
  return text.split(/(?<=[。！？])|(?<=[.!?])(?=\s|$)/u).map((item) => item.trim()).filter(Boolean);
}

function conciseNarration(value, maximum = 84) {
  const viewerText = clean(value)
    .replace(/^用[^：]{0,48}切入[:：]/u, '')
    .replace(/^(?:展示|打开)[^：]{0,48}[:：]/u, '')
    .replace(/^(?:平衡)?结论[:：]/u, '');
  const sentences = completeSentences(viewerText);
  let selected = '';
  for (const sentence of sentences) {
    if (selected && selected.length + sentence.length > maximum) break;
    selected += sentence;
    if (selected.length >= maximum) break;
  }
  if (selected.length <= maximum) return selected;
  const clauses = selected.match(/[^，；：,;:]+[，；：,;:]?/gu) ?? [selected];
  let compact = '';
  for (const clause of clauses) {
    if (compact && compact.length + clause.length > maximum) break;
    compact += clause;
  }
  compact = compact.trim().replace(/[，；：,;:]$/u, '。');
  return /[。！？.!?]$/u.test(compact) ? compact : `${compact}。`;
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
  let text = clean(value);
  const lines = [];
  const tokenCharacter = /[A-Za-z0-9_.+-]/u;
  while (text && lines.length < 6) {
    if (text.length <= width) {
      lines.push(text);
      break;
    }
    let end = width;
    if (tokenCharacter.test(text[end - 1]) && tokenCharacter.test(text[end])) {
      const prefix = text.slice(0, end);
      const whitespace = Math.max(prefix.lastIndexOf(' '), prefix.lastIndexOf('\t'));
      if (whitespace > 0) {
        end = whitespace;
      } else {
        while (end < text.length && tokenCharacter.test(text[end - 1]) && tokenCharacter.test(text[end])) end += 1;
      }
    } else {
      const prefix = text.slice(0, end);
      const naturalBreaks = ['，', '；', '：', '。', '、', ',', ';', ':', ' ']
        .map((separator) => prefix.lastIndexOf(separator));
      const naturalBreak = Math.max(...naturalBreaks);
      if (naturalBreak >= Math.floor(width * 0.6)) end = naturalBreak + 1;
    }
    lines.push(text.slice(0, end).trim());
    text = text.slice(end).trimStart();
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

function findingFlow(finding, commit, subtitleMaximum, topic, narrationText = finding.detail) {
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
    sentences: narrationCues(conciseNarration(narrationText, 86), subtitleMaximum),
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

function mediaScene(asset, commit, index, subtitleMaximum, topic, narrationText) {
  return {
    type: 'media',
    heading: clip(asset.purpose, 30),
    body: clip(asset.purpose, 46),
    src: asset.absolutePath,
    fit: 'cover',
    position: 'center',
    zoom: 1.04 + index * 0.04,
    zoomTravel: 0.06,
    evidenceMode: 'official',
    keyword: clip(asset.purpose, 8),
    source: `来源：${asset.path} @ ${commit.slice(0, 8)} · ${asset.licenseBasis}`,
    narrationTopic: topic,
    sentences: narrationCues(narrationText || asset.purpose, subtitleMaximum),
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
  const starValue = trendRow && Number.isFinite(trendRow.stars)
    ? trendRow.stars.toLocaleString('en-US')
    : '';
  const starSentence = starValue ? `目前在 GitHub 已收获约 ${starValue} stars。` : '';
  const openingNarration = `${conciseNarration(research.video.hook, 72)}${starSentence}`;

  const opening = assets.length ? {
    type: 'hero',
    src: assets[0].absolutePath,
    position: 'center',
    kicker: '它解决什么问题？',
    headline: name,
    subhead: clip(research.video.hook, 54),
    badges: [name],
    stat: starValue ? {eyebrow: 'GITHUB', value: starValue, label: 'Stars'} : undefined,
    evidenceMode: 'official',
    keyword: name,
    source: `来源：${assets[0].path} @ ${commit.slice(0, 8)} · ${assets[0].licenseBasis}`,
    narrationTopic: 'opening',
    sentences: narration(openingNarration),
  } : {
    type: 'contrast',
    heading: clip(research.video.hook, 34),
    left: {eyebrow: '原来的麻烦', title: '信息太多', body: clip(research.video.hook, 38), tone: 'negative'},
    right: {eyebrow: '项目的回答', title: name, body: clip(research.executiveSummary, 38), tone: 'positive'},
    note: starValue ? `GitHub · ${starValue} stars` : undefined,
    evidenceMode: 'source',
    keyword: name,
    source: sourceLabel('research.json / editorial hook', commit),
    narrationTopic: 'opening',
    sentences: narration(openingNarration),
  };

  const firstSection = sections[0];
  const firstFinding = findings[0];
  const problemScene = {
    type: 'contrast',
    heading: '它具体解决什么麻烦？',
    left: {
      eyebrow: '以前',
      title: '问题',
      body: clip(firstSection?.narration || research.video.hook, 40),
      tone: 'negative',
    },
    right: {
      eyebrow: '用了这个项目',
      title: '变化',
      body: clip(firstFinding?.detail || research.executiveSummary, 40),
      tone: 'positive',
    },
    evidenceMode: 'source',
    keyword: clip(firstFinding?.title || name, 8),
    source: sourceLabel('research.json problem and findings', commit),
    narrationTopic: 'problem',
    sentences: narration(conciseNarration(
      firstFinding?.detail || firstSection?.narration || research.executiveSummary, 58,
    )),
  };

  const explanations = [];
  const usefulSections = sections.filter((section) =>
    !/机制|架构|源码|代码|评测|安装|清单|manifest|钩子|扩展|演示/iu.test(
      clean(`${section.heading} ${section.narration}`),
    ),
  );
  for (const [index, section] of usefulSections.slice(0, 2).entries()) {
    explanations.push({
      type: 'text',
      eyebrow: '举个例子',
      heading: clip(section.heading, 30),
      body: clip(section.visual, 48),
      evidenceMode: 'source',
      keyword: clip(section.heading, 8),
      source: sourceLabel('research.json video example', commit),
      narrationTopic: `example-${index + 1}`,
      sentences: narration(conciseNarration(section.narration, 78)),
    });
  }
  for (const [index, asset] of assets.slice(1, 3).entries()) {
    explanations.push(mediaScene(
      asset, commit, index + 1, subtitleMaximum, `example-media-${index + 1}`,
      conciseNarration(asset.purpose, 72),
    ));
  }
  const usefulFindings = findings.slice(1).filter((finding) =>
    !/机制|架构|源码|代码|评测|安装|清单|manifest|钩子|扩展/iu.test(
      clean(`${finding.title} ${finding.detail}`),
    ),
  );
  for (const [index, finding] of usefulFindings.slice(0, 2).entries()) {
    explanations.push(findingFlow(finding, commit, subtitleMaximum, `example-finding-${index + 1}`));
  }

  const remainingProblemDetail = completeSentences(firstFinding?.detail ?? '').slice(1).join('');
  if (firstFinding) {
    explanations.push(findingFlow(
      firstFinding, commit, subtitleMaximum, 'example-problem',
      remainingProblemDetail || firstFinding.detail,
    ));
  }
  if (claims[0]) explanations.push(claimCode(claims[0], commit, subtitleMaximum, 'example-proof'));

  const audience = clean(research.audience?.[0] || '想用更少步骤解决这个问题的人');
  const practicalLimitation = (research.limitations ?? []).find((item) =>
    !/本期|静态|未运行|没有运行|浅克隆|提交历史|研究/iu.test(item),
  );
  const fitScene = {
    type: 'contrast',
    heading: '它适合你吗？',
    left: {eyebrow: '适合', title: '可以关注', body: clip(audience, 38), tone: 'positive'},
    right: {
      eyebrow: '先想清楚',
      title: practicalLimitation ? '一个限制' : '你的需求',
      body: clip(practicalLimitation || research.video.closing, 40),
      tone: practicalLimitation ? 'negative' : 'positive',
    },
    evidenceMode: 'editorial',
    keyword: name,
    source: sourceLabel('research.json audience / limitations', commit),
    narrationTopic: 'conclusion',
    sentences: narration(conciseNarration(
      practicalLimitation
        ? `如果你是${audience}，可以关注这个项目。不过，${practicalLimitation}`
        : `如果你是${audience}，这个项目值得看看。`,
      78,
    )),
  };

  const outro = {
    type: 'outro',
    eyebrow: 'OPEN SOURCE NOTES',
    title: clip(spokenNarration(conciseNarration(research.video.closing, 72)), 38),
    subtitle: research.project.url,
    evidenceMode: 'editorial',
    keyword: name,
    source: sourceLabel('research.json', commit),
    narrationTopic: 'conclusion',
    sentences: narration(conciseNarration(research.video.closing, 72)),
  };

  const targetSceneCount = Math.min(config.sceneCount.max,
    Math.max(config.sceneCount.min, config.sceneCount.target ?? config.sceneCount.max));
  const explanationSlots = Math.max(2, targetSceneCount - 4);
  while (explanations.length < explanationSlots) {
    const claim = claims[explanations.length % Math.max(1, claims.length)] ?? {
      claim: research.executiveSummary,
      evidence: [],
    };
    explanations.push(claimCode(claim, commit, subtitleMaximum, 'example'));
  }
  const finalScenes = [opening, problemScene, ...explanations.slice(0, explanationSlots), fitScene, outro]
    .map((scene) => ({...scene, showEvidenceLabels: false}));
  return {
    episode: {
      meta: {
        title: research.video.title,
        repo: research.project.url.replace(/^https?:\/\/github\.com\//, ''),
        template: 'editorial', accent: '#b8f76c', width: 1920, height: 1080, fps: 30,
        researchMode: hasPassedDemo ? 'verified-demo' : 'static-source-review',
        commit, dataDate, planner: 'editorial', visualAssetCount: assets.length,
        spokenLatinAllowlist: [name], narrationProfile,
        showEvidenceLabels: config.evidence.viewerLabels ?? false,
      },
      scenes: finalScenes,
    },
    warnings,
  };
}
