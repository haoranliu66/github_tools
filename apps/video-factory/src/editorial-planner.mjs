import {existsSync, lstatSync, realpathSync} from 'node:fs';
import {extname, isAbsolute, resolve, sep} from 'node:path';

function clean(value) {
  return String(value ?? '').replace(/\s+/g, ' ').trim();
}

function approximateStarMagnitude(stars) {
  if (!Number.isFinite(stars) || stars <= 0) return '';
  if (stars >= 10_000) return `${Math.floor(stars / 10_000)} 万多`;
  if (stars >= 1_000) return `${Math.floor(stars / 1_000)} 千多`;
  if (stars >= 100) return '几百';
  return '几十';
}

function escapedPattern(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/gu, '\\$&');
}

function addApproximatePopularity(value, name, starMagnitude) {
  const text = clean(value);
  if (!starMagnitude) return text;
  const projectPattern = new RegExp(escapedPattern(name), 'iu');
  if (projectPattern.test(text)) {
    return text.replace(projectPattern, `${name}，目前已经收获 ${starMagnitude} stars`);
  }
  return `${text}${/[。！？.!?]$/u.test(text) ? '' : '。'}这个开源工具可能会帮到你，它叫 ${name}，` +
    `目前已经收获 ${starMagnitude} stars。`;
}

function splitProjectOpening(hook, name, familiarProblem) {
  const sentences = completeSentences(hook);
  const namePattern = new RegExp(escapedPattern(name), 'iu');
  const projectSentenceIndex = sentences.findIndex((sentence) => namePattern.test(sentence));
  if (projectSentenceIndex > 0) {
    return {
      problem: sentences.slice(0, projectSentenceIndex).join(''),
      introduction: sentences.slice(projectSentenceIndex).join(''),
    };
  }
  if (projectSentenceIndex === 0 && sentences.length > 1) {
    return {
      problem: completeSentences(familiarProblem)[0] ?? familiarProblem,
      introduction: sentences.join(''),
    };
  }
  return {
    problem: sentences.join('') || completeSentences(familiarProblem).join(''),
    introduction: `这个开源工具可能会帮到你，它叫 ${name}。`,
  };
}

function githubPreviewUrl(repositoryUrl, commit) {
  const fullName = repositoryUrl.replace(/^https?:\/\/github\.com\//iu, '').replace(/\/$/u, '');
  if (!/^[^/\s]+\/[^/\s]+$/u.test(fullName)) return '';
  return `https://opengraph.githubassets.com/${commit}/${fullName}`;
}

function clip(value, maximum = 54) {
  const text = clean(value);
  if (text.length <= maximum) return text;
  const sentence = text.split(/(?<=[。！？；])/u).find((item) => item.trim().length >= 12);
  if (sentence && sentence.length <= maximum) return sentence.trim();
  return `${text.slice(0, maximum - 1).trim()}…`;
}

const SPOKEN_REPLACEMENTS = [
  [/本次固定到完整\s*HEAD\s*[a-f0-9]{40,64}。?/giu, ''],
];

function spokenNarration(value) {
  let spoken = value;
  for (const [pattern, replacement] of SPOKEN_REPLACEMENTS) {
    spoken = spoken.replace(pattern, replacement);
  }
  return spoken
    .replace(/^[，。；：！？、\s]+/u, '')
    .replace(/([。！？])\1+/gu, '$1')
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

function characterBigrams(value) {
  const text = spokenNarration(value).replace(/[\s，。！？；：、,.!?;:()[\]{}]/gu, '');
  if (text.length < 2) return new Set(text ? [text] : []);
  return new Set(Array.from({length: text.length - 1}, (_, index) => text.slice(index, index + 2)));
}

function sentenceSimilarity(left, right) {
  const leftBigrams = characterBigrams(left);
  const rightBigrams = characterBigrams(right);
  if (!leftBigrams.size || !rightBigrams.size) return 0;
  const overlap = [...leftBigrams].filter((item) => rightBigrams.has(item)).length;
  return overlap / Math.min(leftBigrams.size, rightBigrams.size);
}

function removeRepeatedSentences(value, previousNarration) {
  const previous = completeSentences(previousNarration);
  const distinct = completeSentences(spokenNarration(value)).filter((sentence) =>
    !previous.some((earlier) => sentenceSimilarity(sentence, earlier) >= 0.5));
  return distinct.join('');
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
  const evidenceAssets = research.visualEvidencePackage?.evidenceAssets ?? [];
  const declared = evidenceAssets.length ? evidenceAssets : (research.video?.visualAssets ?? []).map((item, index) => ({
    id: `legacy-${index + 1}`,
    mediaType: 'image',
    truthMode: 'repository-media',
    claimIndexes: [0],
    ...item,
  }));
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
    const isVideo = ['.mp4', '.webm', '.mov', '.m4v'].includes(extname(candidate).toLowerCase());
    const maximumBytes = isVideo ? (config.media.maxVideoBytes ?? config.media.maxBytes) : config.media.maxBytes;
    if (!stat.isFile() || stat.size > maximumBytes ||
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

function firstCue(text) {
  const compact = clean(text).replace(/^[，。；：！？、\s]+/u, '');
  return compact.slice(0, Math.min(12, compact.length));
}

function middleCue(text, fraction = 0.5) {
  const compact = clean(text);
  if (compact.length <= 12) return compact;
  const start = Math.max(0, Math.min(compact.length - 6, Math.floor(compact.length * fraction) - 3));
  return compact.slice(start, start + 8).replace(/^[，。；：！？、\s]+|[，。；：！？、\s]+$/gu, '') || firstCue(compact);
}

function automaticBeat(id, purpose, narrationText, claimIndexes = [0], overrides = {}) {
  return {
    id,
    role: 'change',
    purpose: clip(purpose, 54),
    narrationCue: firstCue(spokenNarration(narrationText)),
    visualMode: 'statement',
    assetIds: [],
    claimIndexes,
    truthMode: 'source-derived-animation',
    durationHint: 3,
    leadSeconds: 0.3,
    ...overrides,
  };
}

function hydrateVisualBeats(beats, assetMap) {
  return beats.map((beat, index) => {
    const asset = (beat.assetIds ?? []).map((id) => assetMap.get(id)).find(Boolean);
    return {
      ...beat,
      narrationCue: spokenNarration(beat.narrationCue),
      beatIndex: index,
      ...(asset ? {
        src: asset.absolutePath,
        assetPath: asset.path,
        licenseBasis: asset.licenseBasis,
      } : {}),
    };
  });
}

function enrichVisualBeats(beats, visualPackage) {
  const mechanismSteps = (visualPackage.mechanismSteps ?? []).map((step) => ({
    id: step.id,
    title: clip(step.label, 18),
    detail: clip(step.detail, 42),
    claimIndexes: step.claimIndexes ?? [],
  }));
  const contrastMoments = visualPackage.contrastMoments ?? [];
  return beats.map((beat) => {
    if (beat.visualMode === 'progressive-flow' && mechanismSteps.length) {
      const matches = mechanismSteps
        .map((step, index) => step.claimIndexes.some((claimIndex) => beat.claimIndexes.includes(claimIndex)) ? index : -1)
        .filter((index) => index >= 0);
      const inferredIndex = beat.role === 'change' ? matches.at(-1) : matches[0];
      return {
        ...beat,
        flowSteps: mechanismSteps,
        stepIndex: Number.isInteger(beat.stepIndex)
          ? beat.stepIndex
          : (Number.isInteger(inferredIndex) ? inferredIndex : Math.min(beat.beatIndex, mechanismSteps.length - 1)),
      };
    }
    if (beat.visualMode === 'compare') {
      const contrast = contrastMoments.find((item) =>
        item.claimIndexes?.some((claimIndex) => beat.claimIndexes.includes(claimIndex)));
      if (contrast) return { ...beat, contrast: {before: contrast.before, after: contrast.after} };
    }
    return beat;
  });
}

function beatScene({section, beats, visualPackage, claims, commit, subtitleMaximum, index}) {
  const hydrated = enrichVisualBeats(beats, visualPackage);
  const modes = new Set(hydrated.map((beat) => beat.visualMode));
  const assetBeat = hydrated.find((beat) => beat.src);
  const narrationText = spokenNarration(clean(section.narration));
  const shared = {
    heading: clip(section.heading, 30),
    evidenceMode: hydrated.every((beat) => beat.truthMode === 'executed-demo') ? 'demo' : 'source',
    keyword: clip(hydrated[0]?.narrationCue || section.heading, 8),
    source: sourceLabel('research.json visualEvidencePackage', commit),
    narrationTopic: `example-${index + 1}`,
    sentences: narrationCues(narrationText, subtitleMaximum),
    visualBeats: hydrated,
  };
  if (assetBeat && [...modes].some((mode) =>
    ['media-crop', 'readme-crop', 'screen-recording', 'stat-overlay'].includes(mode))) {
    return {
      type: 'media',
      ...shared,
      body: clip(completeSentences(section.narration)[0] || section.heading, 46),
      src: assetBeat.src,
      fit: 'contain',
      position: 'center',
      zoom: 1.02,
      zoomTravel: 0.02,
    };
  }
  if (modes.has('compare')) {
    const contrast = visualPackage.contrastMoments?.find((item) =>
      item.claimIndexes?.some((claimIndex) => hydrated.some((beat) => beat.claimIndexes.includes(claimIndex))));
    return {
      type: 'contrast',
      ...shared,
      left: {eyebrow: '之前', title: '原来的状态', body: clip(contrast?.before || hydrated[0].purpose, 40), tone: 'negative'},
      right: {eyebrow: '之后', title: '项目带来的变化', body: clip(contrast?.after || hydrated.at(-1).purpose, 40), tone: 'positive'},
    };
  }
  if (modes.has('code-highlight')) {
    const claimIndex = hydrated.flatMap((beat) => beat.claimIndexes)[0] ?? 0;
    const claim = claims[claimIndex] ?? claims[0] ?? {claim: section.narration, evidence: []};
    const evidence = claim.evidence?.[0] ?? {};
    const code = wrapEvidence(evidence.detail || claim.claim);
    return {
      type: 'code',
      ...shared,
      code,
      highlightLines: hydrated.flatMap((beat) => beat.lineNumbers ?? []).length
        ? [...new Set(hydrated.flatMap((beat) => beat.lineNumbers ?? []))]
        : Array.from({length: Math.min(3, code.split('\n').length)}, (_, lineIndex) => lineIndex + 1),
    };
  }
  const mechanism = visualPackage.mechanismSteps ?? [];
  const steps = (mechanism.length ? mechanism : hydrated.map((beat) => ({
    label: beat.purpose,
    detail: beat.purpose,
  }))).slice(0, 6).map((step) => ({
    title: clip(step.label || step.purpose, 14),
    detail: clip(step.detail || step.purpose, 24),
  }));
  while (steps.length < 2) steps.push({title: '得到结果', detail: clip(section.heading, 24)});
  return {
    type: 'flow',
    ...shared,
    steps,
    activeIndex: steps.length - 1,
  };
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
    source: sourceLabel('research.json / official README or authorized local run', commit),
    narrationTopic: topic,
    sentences: narrationCues(conciseNarration(narrationText, 86), subtitleMaximum),
  };
}

function claimFlow(claim, commit, subtitleMaximum, topic = 'evidence') {
  const evidence = claim.evidence?.[0] ?? {};
  return {
    type: 'flow',
    heading: clip(claim.claim, 34),
    steps: [
      {title: '项目功能', detail: clip(claim.claim, 24)},
      {title: '具体效果', detail: clip(evidence.detail || claim.claim, 24)},
    ],
    activeIndex: 1,
    evidenceMode: 'source',
    keyword: clip(claim.claim, 8),
    source: sourceLabel(evidence.source, commit),
    narrationTopic: topic,
    sentences: narrationCues(claim.claim, subtitleMaximum),
  };
}

function mediaScene(asset, commit, index, subtitleMaximum, topic, narrationText, display = {}) {
  return {
    type: 'media',
    heading: clip(display.heading || asset.purpose, 30),
    body: clip(display.body || asset.purpose, 46),
    src: asset.absolutePath,
    fit: display.fit || 'cover',
    position: display.position || 'center',
    zoom: 1.04 + index * 0.04,
    zoomTravel: 0.06,
    evidenceMode: 'official',
    keyword: clip(asset.purpose, 8),
    source: `来源：${asset.path} @ ${commit.slice(0, 8)} · ${asset.licenseBasis}`,
    narrationTopic: topic,
    sentences: narrationCues(narrationText || asset.purpose, subtitleMaximum),
  };
}

export function buildEditorialEpisode({
  research,
  trendRow = null,
  repositoryRoot,
  repositoryPreviewPath = null,
  config,
  dataDate = '',
}) {
  if (research?.status !== 'completed') throw new Error('Editorial planning requires completed research.');
  const commit = research.project?.versionOrCommit ?? '';
  if (!/^[a-f0-9]{40,64}$/i.test(commit)) throw new Error('Editorial planning requires a fixed Git commit SHA.');
  const {assets, warnings} = approvedAssets(research, repositoryRoot, config);
  const name = clean(research.project.name);
  const hasPassedDemo = research.demoPlan?.some((item) => item.status === 'passed') ?? false;
  const findings = research.findings ?? [];
  const claims = research.claims ?? [];
  const sections = research.video?.sections ?? [];
  const editorialBrief = research.editorialBrief ?? {};
  const visualPackage = research.visualEvidencePackage ?? null;
  const assetMap = new Map(assets.map((asset) => [asset.id, asset]));
  const subtitleMaximum = config.text.softSubtitleCharacters;
  const narration = (text) => narrationCues(text, subtitleMaximum);
  const narrationProfile = inferNarrationProfile(research);
  const starValue = approximateStarMagnitude(trendRow?.stars);
  const openingHook = visualPackage
    ? completeSentences(clean(research.video.hook)).join('')
    : conciseNarration(research.video.hook, 72);
  const openingParts = splitProjectOpening(openingHook, name, editorialBrief.familiarProblem ?? '');
  const openingProblemNarration = openingParts.problem;
  const projectIntroductionNarration = addApproximatePopularity(openingParts.introduction, name, starValue);
  const openingNarration = visualPackage
    ? `${openingProblemNarration}${projectIntroductionNarration}`
    : addApproximatePopularity(openingHook, name, starValue);
  const hookMoment = visualPackage?.hookMoment ? {
    id: 'hook-moment',
    role: 'show',
    durationHint: 3,
    ...visualPackage.hookMoment,
  } : automaticBeat('hook-moment', '直接展示项目最强结果', research.video.hook, [0], {
    role: 'show', visualMode: assets.length ? 'media-crop' : 'compare', assetIds: assets[0]?.id ? [assets[0].id] : [],
  });
  const openingBeatDrafts = [hookMoment];
  const openingBeats = hydrateVisualBeats(openingBeatDrafts, assetMap);
  const openingAsset = openingBeats[0]?.src ? assetMap.get(hookMoment.assetIds?.[0]) : assets[0];

  const opening = openingAsset ? {
    type: 'hero',
    src: openingAsset.absolutePath,
    position: 'center',
    kicker: '它解决什么问题？',
    headline: name,
    subhead: clip(openingProblemNarration, 54),
    badges: [name],
    stat: !visualPackage && starValue ? {eyebrow: 'GITHUB', value: starValue, label: 'Stars'} : undefined,
    evidenceMode: 'official',
    keyword: name,
    source: `来源：${openingAsset.path} @ ${commit.slice(0, 8)} · ${openingAsset.licenseBasis}`,
    narrationTopic: 'opening',
    sentences: narration(visualPackage ? openingProblemNarration : openingNarration),
    visualBeats: openingBeats,
  } : {
    type: 'contrast',
    heading: clip(openingProblemNarration, 34),
    left: {eyebrow: '原来的麻烦', title: '信息太多', body: clip(openingProblemNarration, 38), tone: 'negative'},
    right: {eyebrow: '项目的回答', title: name, body: clip(research.executiveSummary, 38), tone: 'positive'},
    note: !visualPackage && starValue ? `GitHub · ${starValue} stars` : undefined,
    evidenceMode: 'source',
    keyword: name,
    source: sourceLabel('research.json / editorial hook', commit),
    narrationTopic: 'opening',
    sentences: narration(visualPackage ? openingProblemNarration : openingNarration),
    visualBeats: openingBeats,
  };

  const repositoryPreview = repositoryPreviewPath || githubPreviewUrl(research.project.url, commit);
  const githubOpening = visualPackage ? {
    type: 'hero',
    src: repositoryPreview,
    position: 'center',
    panX: -1,
    panY: 0,
    kicker: 'GITHUB REPOSITORY',
    headline: name,
    subhead: clip(editorialBrief.oneSentenceAnswer || research.executiveSummary, 54),
    badges: ['Open Source'],
    stat: starValue ? {eyebrow: 'GITHUB', value: starValue, label: 'Stars'} : undefined,
    evidenceMode: 'official',
    keyword: name,
    source: `来源：${research.project.url} @ ${commit.slice(0, 8)}`,
    narrationTopic: 'project-introduction',
    sentences: narration(projectIntroductionNarration),
    visualBeats: [automaticBeat('github-repository', '展示官方 GitHub 仓库预览并轻微推近',
      projectIntroductionNarration, [0], {
        role: 'show', visualMode: 'media-crop', durationHint: 3, leadSeconds: 0,
      })],
  } : null;

  const firstSection = sections[0];
  const firstFinding = findings[0];
  const problemNarration = conciseNarration(
    editorialBrief.oneSentenceAnswer || firstFinding?.detail || firstSection?.narration || research.executiveSummary, 58,
  );
  const problemScene = {
    type: 'contrast',
    heading: '它具体解决什么麻烦？',
    left: {
      eyebrow: '以前',
      title: '问题',
      body: clip(editorialBrief.familiarProblem || firstSection?.narration || research.video.hook, 40),
      tone: 'negative',
    },
    right: {
      eyebrow: '用了这个项目',
      title: '变化',
      body: clip(editorialBrief.oneSentenceAnswer || firstFinding?.detail || research.executiveSummary, 40),
      tone: 'positive',
    },
    evidenceMode: 'source',
    keyword: clip(firstFinding?.title || name, 8),
    source: sourceLabel('research.json problem and findings', commit),
    narrationTopic: 'problem',
    sentences: narration(problemNarration),
    visualBeats: [
      automaticBeat('problem-before', '先显示原来的麻烦', problemNarration, [0], {
        role: 'show', visualMode: 'compare', durationHint: 3,
      }),
      automaticBeat('problem-answer', '再显示项目给出的答案', middleCue(problemNarration), [0], {
        role: 'change', visualMode: 'statement', durationHint: 3,
      }),
    ],
  };

  const explanations = [];
  if (visualPackage) {
    let previousNarration = openingNarration;
    for (const [index, section] of sections.entries()) {
      const beats = visualPackage.visualBeats.filter((beat) => beat.sectionIndex === index);
      if (!beats.length) continue;
      const distinctNarration = clean(research.video.fullNarration)
        ? spokenNarration(section.narration)
        : removeRepeatedSentences(section.narration, previousNarration);
      if (!distinctNarration) continue;
      explanations.push(beatScene({
        section: {...section, narration: distinctNarration},
        beats: hydrateVisualBeats(beats, assetMap),
        visualPackage,
        claims,
        commit,
        subtitleMaximum,
        index,
      }));
      previousNarration += distinctNarration;
    }
  } else {
    const usefulSections = sections.filter((section) =>
      !/机制|架构|源码|代码|评测|安装|清单|manifest|钩子|扩展|演示/iu.test(
        clean(`${section.heading} ${section.narration}`),
      ),
    );
    for (const [index, section] of usefulSections.slice(0, 2).entries()) {
      const narrationText = conciseNarration(section.narration, 78);
      if (assets.length) {
        explanations.push(mediaScene(
          assets[index % assets.length], commit, index + 1, subtitleMaximum, `example-${index + 1}`,
          narrationText,
          {
            heading: section.heading,
            body: completeSentences(section.narration)[0] || section.heading,
            fit: 'contain',
            position: index % 2 === 0 ? 'center top' : 'center bottom',
          },
        ));
      } else {
        explanations.push({
          type: 'text',
          eyebrow: '举个例子',
          heading: clip(section.heading, 30),
          body: clip(completeSentences(section.narration)[0] || section.heading, 48),
          evidenceMode: 'source',
          keyword: clip(section.heading, 8),
          source: sourceLabel('research.json video example', commit),
          narrationTopic: `example-${index + 1}`,
          sentences: narration(narrationText),
        });
      }
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
    if (claims[0]) explanations.push(claimFlow(claims[0], commit, subtitleMaximum, 'example-proof'));
  }

  const audience = clean(
    editorialBrief.intendedViewer || research.audience?.[0] || '想用更少步骤解决这个问题的人',
  ).replace(/[。！？；，、]+$/u, '');
  const fitNarration = conciseNarration(
    `如果你是${audience}，这个项目值得看看。`,
    78,
  );
  const fitBeats = [automaticBeat('fit-viewer', '说明什么人会真正用到它', fitNarration, [0], {
    role: 'show', visualMode: 'compare', durationHint: 3,
  })];
  fitBeats.push(automaticBeat('fit-decision', '收束到是否值得关注', middleCue(fitNarration, 0.82), [0], {
    role: 'change', visualMode: 'stat-overlay', durationHint: 3,
  }));
  const fitScene = {
    type: 'contrast',
    heading: '它适合你吗？',
    left: {eyebrow: '适合', title: '可以关注', body: clip(audience, 38), tone: 'positive'},
    right: {
      eyebrow: '你会得到',
      title: '项目已有功能',
      body: clip(editorialBrief.oneSentenceAnswer || research.video.closing, 40),
      tone: 'positive',
    },
    evidenceMode: 'editorial',
    keyword: name,
    source: sourceLabel('research.json audience / documented functions', commit),
    narrationTopic: 'conclusion',
    sentences: narration(fitNarration),
    visualBeats: fitBeats,
  };

  const outroNarration = visualPackage
    ? spokenNarration(research.video.closing)
    : conciseNarration(research.video.closing, 72);
  const outro = {
    type: 'outro',
    eyebrow: 'OPEN SOURCE NOTES',
    title: visualPackage ? name : clip(spokenNarration(outroNarration), 38),
    subtitle: research.project.url,
    evidenceMode: 'editorial',
    keyword: name,
    source: sourceLabel('research.json', commit),
    narrationTopic: 'conclusion',
    sentences: narration(outroNarration),
    visualBeats: [automaticBeat('outro-result', '用收藏建议结束', outroNarration, [0], {
      role: 'show', visualMode: 'statement', durationHint: 3, leadSeconds: 0,
    })],
  };

  const targetSceneCount = visualPackage
    ? Math.min(config.sceneCount.max, Math.max(config.sceneCount.min, explanations.length + 3))
    : Math.min(config.sceneCount.max,
      Math.max(config.sceneCount.min, config.sceneCount.target ?? config.sceneCount.max));
  const explanationSlots = Math.max(2, targetSceneCount - 4);
  while (!visualPackage && explanations.length < explanationSlots) {
    const claim = claims[explanations.length % Math.max(1, claims.length)] ?? {
      claim: research.executiveSummary,
      evidence: [],
    };
    explanations.push(claimFlow(claim, commit, subtitleMaximum, 'example'));
  }
  const plannedScenes = visualPackage
    ? [opening, githubOpening, ...explanations, outro]
    : [opening, problemScene, ...explanations.slice(0, explanationSlots), fitScene, outro];
  const finalScenes = plannedScenes
    .map((scene) => ({...scene, showEvidenceLabels: false}));
  return {
    episode: {
      meta: {
        title: research.video.title,
        repo: research.project.url.replace(/^https?:\/\/github\.com\//, ''),
        template: 'editorial', accent: '#b8f76c', width: 1920, height: 1080, fps: 30,
        researchMode: hasPassedDemo ? 'verified-demo' : 'static-source-review',
        commit, dataDate, planner: 'editorial', visualAssetCount: assets.length,
        editorialContractDigest: research.editorialContract?.digest,
        researchCommit: commit,
        ...(visualPackage ? {visualBeatContractVersion: 1} : {}),
        narrationProfile,
        showEvidenceLabels: config.evidence.viewerLabels ?? false,
      },
      scenes: finalScenes,
    },
    warnings,
  };
}
