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

function sentence(text) {
  return [{text: clip(text, 64)}];
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

function findingFlow(finding, commit) {
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
    sentences: sentence(`${finding.title}：${clip(finding.detail, 42)}`),
  };
}

function claimCode(claim, commit) {
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
    sentences: sentence(claim.claim),
  };
}

function mediaScene(asset, commit, index) {
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
    sentences: sentence(`${clip(asset.purpose, 34)}，这是仓库中的官方素材，不是本机实测。`),
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
    sentences: sentence(research.video.hook),
  } : {
    type: 'contrast',
    heading: clip(research.video.hook, 34),
    left: {eyebrow: 'FIRST LOOK', title: name, body: '先看项目解决什么问题', tone: 'positive'},
    right: {eyebrow: 'REAL QUESTION', title: '证据够吗？', body: '再看源码、限制与适用场景', tone: 'positive'},
    evidenceMode: 'editorial',
    keyword: name,
    source: sourceLabel('research.json / editorial hook', commit),
    sentences: sentence(research.video.hook),
  };

  const scenes = [opening, {
    type: 'flow',
    heading: '先建立一条清晰的理解路径',
    steps: overviewItems.map((item) => ({title: clip(item, 14), detail: '依据研究包逐项核对'})),
    activeIndex: overviewItems.length - 1,
    evidenceMode: 'source',
    keyword: '理解路径',
    source: sourceLabel('research.json findings', commit),
    sentences: sentence(`这期从${overviewItems.slice(0, 3).join('、')}三个层面看清它。`),
  }];

  if (trendRow && Number.isFinite(trendRow.stars)) {
    scenes.push({
      type: 'stat', heading: '热度只是线索', value: trendRow.stars.toLocaleString('en-US'),
      label: 'GitHub Stars', body: `${dataDate || trendRow.weekId || '当周'} 采集快照`,
      evidenceMode: 'data', keyword: '热度',
      source: `数据：weekly trend report · 趋势分 ${trendRow.trendScore} / 93`,
      sentences: sentence(`采集时它有${trendRow.stars.toLocaleString('zh-CN')}颗星，但热度只是一条线索。`),
    });
  }
  scenes.push({
    type: 'text', eyebrow: 'THE THESIS', heading: clip(research.executiveSummary, 34),
    body: '接下来把结论拆回机制、源码证据和使用边界。', evidenceMode: 'source', keyword: '机制',
    source: sourceLabel('research.json executiveSummary', commit), sentences: sentence(research.executiveSummary),
  });

  const mainCount = Math.max(sections.length, findings.length, claims.length, 1);
  for (let index = 0; index < Math.min(mainCount, 6); index += 1) {
    const section = sections[index];
    if (section) scenes.push({
      type: 'text', eyebrow: `PART ${String(index + 1).padStart(2, '0')}`,
      heading: clip(section.heading, 32), body: clip(section.visual, 52),
      evidenceMode: 'editorial', keyword: clip(section.heading, 8),
      source: sourceLabel('research.json video plan', commit), sentences: sentence(section.narration),
    });
    const finding = findings[index];
    if (finding) scenes.push(findingFlow(finding, commit));
    const claim = claims[index];
    if (claim) scenes.push(claimCode(claim, commit));
    if (index < assets.length) scenes.push(mediaScene(assets[index], commit, index));
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
    sentences: sentence(`它主要适合${(research.audience ?? []).slice(0, 3).map((item) => clip(item, 16)).join('、') || '关注项目机制和采用边界的读者'}。`),
  }, {
    type: 'flow', heading: hasPassedDemo ? '演示验证路径' : '如果要实测，应该这样验证',
    steps: demoSteps, activeIndex: hasPassedDemo ? demoSteps.length - 1 : 0,
    evidenceMode: hasPassedDemo ? 'demo' : 'source', keyword: hasPassedDemo ? '已验证' : '实测',
    source: sourceLabel('research.json demoPlan', commit),
    sentences: sentence(hasPassedDemo ? '这些步骤已有通过记录，但仍要结合本机环境复核。' : '这些演示步骤来自研究计划，本期没有把它们说成已经通过。'),
  }, ...limitations.slice(0, 2).map((limitation, index) => ({
    type: 'contrast', heading: index ? '采用前再看一个限制' : '这里有一道重要边界',
    left: {eyebrow: 'VERIFIED', title: '源码能确认', body: clip(verified, 34), tone: 'positive'},
    right: {eyebrow: 'LIMIT', title: '仍需复核', body: clip(limitation, 38), tone: 'negative'},
    evidenceMode: 'source', keyword: '仍需复核',
    source: sourceLabel('research.json claims / limitations', commit), sentences: sentence(limitation),
  })), {
    type: 'text', eyebrow: 'EVIDENCE BOUNDARY',
    heading: hasPassedDemo ? '结论包含已通过的演示步骤' : '本期只做了源码研究',
    body: hasPassedDemo ? '运行结论只覆盖研究包记录的通过步骤。' : '官方素材用于解释功能，没有包装成本机端到端实测。',
    evidenceMode: hasPassedDemo ? 'demo' : 'source', keyword: hasPassedDemo ? '通过步骤' : '源码研究',
    source: sourceLabel('research.json demoability', commit),
    sentences: sentence(hasPassedDemo ? '运行结论只覆盖研究包中明确通过的步骤。' : '本期没有运行项目，功能结论来自源码和仓库资料。'),
  }, {
    type: 'flow', heading: '一句话带走', steps: [
      {title: '看问题', detail: '它解决什么'}, {title: '看机制', detail: '源码怎样实现'}, {title: '看边界', detail: '哪些仍未验证'},
    ], activeIndex: 2, evidenceMode: 'editorial', keyword: '证据',
    source: sourceLabel('editorial conclusion / research.json', commit), sentences: sentence(research.video.closing),
  }, {
    type: 'outro', eyebrow: 'OPEN SOURCE NOTES', title: clip(research.video.closing, 38),
    subtitle: '先看证据，再决定是否采用。', tagline: research.project.url,
    evidenceMode: 'editorial', keyword: '先看证据',
    source: `${sourceLabel('research.json', commit)} · ${hasPassedDemo ? '含已通过演示步骤' : '本期非运行实测'}`,
    sentences: sentence('项目链接和证据放在简介里，先看清，再采用。'),
  }];

  while (scenes.length + tail.length < config.sceneCount.min) {
    const claim = claims[(scenes.length + tail.length) % Math.max(1, claims.length)] ?? {claim: verified, evidence: []};
    scenes.push(claimCode(claim, commit));
  }
  const maximumCore = config.sceneCount.max - tail.length;
  const finalScenes = [...scenes.slice(0, maximumCore), ...tail];
  return {
    episode: {
      meta: {
        title: research.video.title,
        repo: research.project.url.replace(/^https?:\/\/github\.com\//, ''),
        template: 'editorial', accent: '#b8f76c', width: 1920, height: 1080, fps: 30,
        researchMode: hasPassedDemo ? 'verified-demo' : 'static-source-review',
        commit, dataDate, planner: 'editorial', visualAssetCount: assets.length,
      },
      scenes: finalScenes,
    },
    warnings,
  };
}
