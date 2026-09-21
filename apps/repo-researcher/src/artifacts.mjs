import {mkdirSync, writeFileSync} from 'node:fs';
import {join} from 'node:path';
import {assertEditorialResearch} from './editorial-contract.mjs';

function markdownList(items) {
  return items.length ? items.map((item) => `- ${item}`).join('\n') : '- 暂无';
}

function sectionDuration(narration) {
  const chineseCharacters = (narration.match(/[\u3400-\u9fff]/g) ?? []).length;
  const otherWords = narration.replace(/[\u3400-\u9fff]/g, ' ').trim().split(/\s+/).filter(Boolean).length;
  return Math.max(6, Math.ceil(chineseCharacters / 4.2 + otherWords / 2.6));
}

function validateDemoability(result) {
  const demoability = result.demoability;
  const confidenceLevels = new Set(['high', 'medium', 'low']);
  if (!Number.isInteger(demoability?.score) || demoability.score < 0 || demoability.score > 7 ||
      !confidenceLevels.has(demoability?.confidence) ||
      typeof demoability?.reason !== 'string' || !demoability.reason.trim()) {
    throw new Error('Research demoability must include an integer score from 0 to 7, confidence, and reason.');
  }
  const hasPassedDemo = Array.isArray(result.demoPlan) &&
    result.demoPlan.some((item) => item?.status === 'passed');
  if (demoability.score > 4 && !hasPassedDemo) {
    throw new Error('Research demoability above 4 requires at least one successfully executed demo step.');
  }
}

function validateResearchEvidence(result) {
  if (result.blockedReason?.trim()) {
    throw new Error('Completed research cannot retain a blocked reason.');
  }
  if (result.inspectedFiles.length !== 1 ||
      !/(?:^|[\\/])README(?:\.[^\\/]+)?$/iu.test(result.inspectedFiles[0])) {
    throw new Error('Completed research may list only the official README in inspectedFiles.');
  }
  if (!Array.isArray(result.claims) || result.claims.length === 0) {
    throw new Error('Completed research requires at least one evidenced claim.');
  }
  result.claims.forEach((claim, claimIndex) => {
    if (!Array.isArray(claim?.evidence) || claim.evidence.length === 0) {
      throw new Error(`Claim ${claimIndex} requires official README or executed-demo evidence.`);
    }
    claim.evidence.forEach((evidence, evidenceIndex) => {
      if (typeof evidence?.detail !== 'string' || !evidence.detail.trim()) {
        throw new Error(`Claim ${claimIndex} evidence ${evidenceIndex} requires a useful detail.`);
      }
      if (evidence.source === 'official-readme') return;
      const match = /^executed-demo:(\d+)$/u.exec(evidence.source ?? '');
      const demoIndex = match ? Number(match[1]) : -1;
      if (!match || result.demoPlan?.[demoIndex]?.status !== 'passed') {
        throw new Error(
          `Claim ${claimIndex} evidence ${evidenceIndex} must use official-readme or a passed executed-demo index.`,
        );
      }
    });
  });
}

function toStoryboard(result) {
  const scenes = [
    {
      type: 'title',
      duration: 5,
      title: result.video.title,
      subtitle: result.video.hook,
    },
    ...result.video.sections.map((section, index) => ({
      type: index % 3 === 1 ? 'bullets' : 'text',
      duration: sectionDuration(section.narration),
      heading: section.heading,
      body: section.narration,
      bullets: [section.visual],
    })),
    {
      type: 'outro',
      duration: 6,
      title: result.video.closing,
      subtitle: result.project.url,
    },
  ];

  return {
    meta: {
      title: result.video.title,
      repo: result.project.name,
      accent: '#7c5cff',
      width: 1920,
      height: 1080,
      fps: 30,
    },
    scenes,
  };
}

export function validateResearchResult(result, {expectedEditorialContract = null} = {}) {
  if (result.status !== 'completed') {
    throw new Error(`Research is not completed (${result.status ?? 'missing status'}): ${result.blockedReason || 'No verified research result.'}`);
  }
  if (!/^(?:[a-f0-9]{40}|[a-f0-9]{64})$/i.test(result.project?.versionOrCommit ?? '')) {
    throw new Error('Research must identify the full inspected Git commit SHA.');
  }
  const inspectedFiles = result.inspectedFiles;
  if (!Array.isArray(inspectedFiles) || !inspectedFiles.length ||
      inspectedFiles.some((file) => typeof file !== 'string' || !file.trim())) {
    throw new Error('Research must list the files actually inspected.');
  }
  validateDemoability(result);
  validateResearchEvidence(result);
  assertEditorialResearch(result, expectedEditorialContract);
}

export function writeResearchArtifacts(result, outputDirectory, {expectedEditorialContract = null} = {}) {
  validateResearchResult(result, {expectedEditorialContract});

  mkdirSync(outputDirectory, {recursive: true});

  const brief = [
    `# ${result.project.name} 研究简报`,
    '',
    `- 仓库：${result.project.url}`,
    `- 版本/提交：${result.project.versionOrCommit}`,
    `- License：${result.project.license}`,
    `- 主要语言：${result.project.primaryLanguage}`,
    `- 可演示性：${result.demoability.score}/7（${result.demoability.confidence}）`,
    `- 评分理由：${result.demoability.reason}`,
    '',
    '## 一句话结论',
    '',
    result.executiveSummary,
    '',
    '## 视频编辑简报',
    '',
    `- 目标观众：${result.editorialBrief.intendedViewer}`,
    `- 熟悉问题：${result.editorialBrief.familiarProblem}`,
    `- 一句话答案：${result.editorialBrief.oneSentenceAnswer}`,
    `- 标题承诺：${result.editorialBrief.titlePromise}`,
    `- 制作 Skill 摘要：${result.editorialContract.digest}`,
    '',
    '### 具体例子',
    '',
    ...result.editorialBrief.concreteExamples.flatMap((example, index) => [
      `${index + 1}. 问题：${example.problem}`,
      `   - 项目动作：${example.projectAction}`,
      `   - 有用结果：${example.usefulResult}`,
      `   - 事实索引：${example.claimIndexes.join(', ')}`,
    ]),
    '',
    '### 视觉 Beat 计划',
    '',
    `- 开场：${result.visualEvidencePackage.hookMoment.purpose}；真实性：${result.visualEvidencePackage.hookMoment.truthMode}`,
    ...result.visualEvidencePackage.visualBeats.map((beat, index) =>
      `${index + 1}. [${beat.role}] ${beat.purpose}；模式：${beat.visualMode}；真实性：${beat.truthMode}；` +
      `旁白锚点：${beat.narrationCue}；事实索引：${beat.claimIndexes.join(', ')}`),
    '',
    '## 适合人群',
    '',
    markdownList(result.audience),
    '',
    '## 关键发现',
    '',
    ...result.findings.flatMap((finding) => [`### ${finding.title}`, '', finding.detail, '']),
    '## 局限',
    '',
    markdownList(result.limitations),
    '',
  ].join('\n');

  const demo = [
    `# ${result.project.name} 演示步骤`,
    '',
    `- 可演示性：${result.demoability.score}/7（${result.demoability.confidence}）`,
    `- 评分理由：${result.demoability.reason}`,
    '',
    ...result.demoPlan.flatMap((item, index) => [
      `## ${index + 1}. ${item.step}`,
      '',
      `- 状态：${item.status}`,
      `- 命令：\`${item.command || '无'}\``,
      `- 预期：${item.expected}`,
      '',
    ]),
  ].join('\n');

  const script = [
    `# ${result.video.title}`,
    '',
    ...(result.video.fullNarration ? [
      '## 连贯口播原稿',
      '',
      result.video.fullNarration,
      '',
      '## 分镜拆分',
      '',
    ] : []),
    `> ${result.video.hook}`,
    '',
    ...result.video.sections.flatMap((section) => [
      `## ${section.heading}`,
      '',
      section.narration,
      '',
      `画面建议：${section.visual}`,
      '',
    ]),
    '## 结尾',
    '',
    result.video.closing,
    '',
  ].join('\n');

  const files = {
    'research.json': result,
    'research_brief.md': brief,
    'claims.json': result.claims,
    'demo_steps.md': demo,
    'script.md': script,
    'storyboard.json': toStoryboard(result),
    'media_manifest.json': {
      repository: result.project.url,
      items: (result.visualEvidencePackage.evidenceAssets ?? []).map((item) => ({
        id: item.id,
        file: item.path,
        purpose: item.purpose,
        mediaType: item.mediaType,
        licenseBasis: item.licenseBasis,
        truthMode: item.truthMode,
        claimIndexes: item.claimIndexes,
      })),
      note: '真实性以逐资产 truthMode 为准；repository-media 与 source-derived-animation 不能当作本机运行证据。',
    },
  };

  for (const [name, content] of Object.entries(files)) {
    const serialized = typeof content === 'string' ? content : `${JSON.stringify(content, null, 2)}\n`;
    writeFileSync(join(outputDirectory, name), serialized, 'utf8');
  }
  return outputDirectory;
}
