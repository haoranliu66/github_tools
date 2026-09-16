import {mkdirSync, writeFileSync} from 'node:fs';
import {join} from 'node:path';

function markdownList(items) {
  return items.length ? items.map((item) => `- ${item}`).join('\n') : '- 暂无';
}

function safeName(fullName) {
  return fullName.replace('/', '--').replace(/[^A-Za-z0-9_.-]/g, '-');
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

export function writeResearchArtifacts(result, outputRoot, fullName, date) {
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
  const hasRepositoryEvidence = result.claims?.some((claim) => claim.evidence?.some((evidence) =>
    typeof evidence.detail === 'string' && evidence.detail.trim() &&
    inspectedFiles.some((file) => evidence.source === file || evidence.source?.startsWith(`${file}:`)),
  ));
  if (!hasRepositoryEvidence) throw new Error('Research must cite evidence from an inspected repository file.');
  validateDemoability(result);

  const directory = join(outputRoot, date, safeName(fullName));
  mkdirSync(directory, {recursive: true});

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
      items: (result.video.visualAssets ?? []).map((item) => ({
        file: item.path,
        purpose: item.purpose,
        licenseBasis: item.licenseBasis,
        type: 'official-repository-asset-not-local-demo',
      })),
      note: '仓库素材只能作为官方来源画面，不能当作本机运行证据；另行补充的媒体仍需审核授权。',
    },
  };

  for (const [name, content] of Object.entries(files)) {
    const serialized = typeof content === 'string' ? content : `${JSON.stringify(content, null, 2)}\n`;
    writeFileSync(join(directory, name), serialized, 'utf8');
  }
  return directory;
}
