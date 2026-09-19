import {existsSync, mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {join, relative, resolve} from 'node:path';
import {loadSelection, resolveSelectionProjectPath} from './selection.mjs';
import {
  finalRankingWeekDirectory,
  projectLayoutFromSelection,
} from '../../shared/pipeline-paths.mjs';

export function latestResearch(projectRoot, fullName, selection) {
  const layout = projectLayoutFromSelection(projectRoot, selection, fullName);
  const directory = layout.resourcesDirectory;
  const researchPath = join(directory, 'research.json');
  const storyboardPath = join(directory, 'storyboard.json');
  if (!existsSync(researchPath)) return null;
  try {
    const research = JSON.parse(readFileSync(researchPath, 'utf8'));
    const score = research?.demoability?.score;
    if (research.status !== 'completed' || !Number.isInteger(score) || score < 0 || score > 7 ||
        !existsSync(storyboardPath)) {
      return {status: 'incomplete', directory, research, reason: 'Research lacks a valid demoability score or storyboard.'};
    }
    return {status: 'completed', directory, research, storyboardPath, layout};
  } catch (error) {
    return {status: 'incomplete', directory, reason: error.message, layout};
  }
}

function productionStoryboard(projectRoot, selection, fullName) {
  const storyboardPath = projectLayoutFromSelection(projectRoot, selection, fullName).storyboardPath;
  if (!existsSync(storyboardPath)) {
    throw new Error(`Approved production storyboard does not exist for ${fullName}: ${storyboardPath}`);
  }
  return storyboardPath;
}

function markdownFor(result) {
  return [
    `# 研究后最终榜 · ${result.weekId}`,
    '',
    `> 基础榜：${result.sourceReport}`,
    '',
    '> 最终分 = 基础趋势分（最高 93）+ 可演示性（最高 7）。只有人工批准且研究完整的项目可以进入视频制作。',
    '',
    '| # | 项目 | 趋势分 / 93 | 可演示性 / 7 | 最终分 / 100 | 研究状态 | 视频批准 |',
    '|---:|---|---:|---:|---:|---|---|',
    ...result.rows.map((row) =>
      `| ${row.finalRank ?? '-'} | ${row.fullName} | ${row.trendScore} | ${row.demoabilityScore ?? '-'} | ${row.finalScore ?? '-'} | ${row.researchStatus} | ${row.videoApproved ? '是' : '否'} |`,
    ),
    '',
  ].join('\n');
}

export function writeFinalRanking({projectRoot, selectionPath, generatedAt = new Date()}) {
  const {selection, absolutePath} = loadSelection(selectionPath, {requireApproved: true});
  const reportPath = resolveSelectionProjectPath(projectRoot, selection.sourceReport);
  const baseRows = JSON.parse(readFileSync(reportPath, 'utf8'));
  if (!Array.isArray(baseRows)) throw new Error('Base trend report must be a JSON array.');
  const byName = new Map(baseRows.map((row) => [row.fullName, row]));

  const rows = selection.selectedRepositories.map((fullName) => {
    const base = byName.get(fullName);
    if (!base) throw new Error(`Selected repository is absent from the base report: ${fullName}`);
    if (base.eligibleForResearch === false || base.rankingStatus === 'not-rediscovered') {
      throw new Error(`Selected repository is not eligible for research this week: ${fullName}`);
    }
    const layout = projectLayoutFromSelection(projectRoot, selection, fullName);
    const research = latestResearch(projectRoot, fullName, selection);
    const completed = research?.status === 'completed';
    const demoabilityScore = completed ? research.research.demoability.score : null;
    const finalScore = completed ? Number((base.trendScore + demoabilityScore).toFixed(2)) : null;
    const videoApproved = completed && selection.videoProjects.includes(fullName);
    const storyboardPath = completed
      ? (videoApproved ? productionStoryboard(projectRoot, selection, fullName) : research.storyboardPath)
      : null;
    return {
      finalRank: null,
      weekId: selection.weekId,
      fullName,
      baseRank: base.rank,
      trendScore: base.trendScore,
      trendScoreMax: 93,
      demoabilityScore,
      demoabilityScoreMax: 7,
      demoabilityConfidence: completed ? research.research.demoability.confidence : null,
      demoabilityReason: completed ? research.research.demoability.reason : null,
      finalScore,
      finalScoreMax: 100,
      researchStatus: completed ? 'completed' : research?.status ?? 'missing',
      researchIssue: completed ? null : research?.reason ?? 'No current-schema research package found.',
      researchPath: research ? relative(projectRoot, research.directory).replaceAll('\\', '/') : null,
      projectPath: relative(projectRoot, layout.projectDirectory).replaceAll('\\', '/'),
      storyboardPath: storyboardPath
        ? relative(projectRoot, storyboardPath).replaceAll('\\', '/')
        : null,
      videoPath: relative(projectRoot, layout.videoPath).replaceAll('\\', '/'),
      videoApproved,
    };
  }).sort((a, b) => {
    if (a.finalScore === null && b.finalScore !== null) return 1;
    if (a.finalScore !== null && b.finalScore === null) return -1;
    return (b.finalScore ?? 0) - (a.finalScore ?? 0) || a.fullName.localeCompare(b.fullName);
  });
  let finalRank = 0;
  rows.forEach((row) => {
    if (row.finalScore !== null) row.finalRank = ++finalRank;
  });

  const result = {
    schemaVersion: 1,
    weekId: selection.weekId,
    generatedAt: generatedAt.toISOString(),
    sourceReport: relative(projectRoot, reportPath).replaceAll('\\', '/'),
    selectionFile: relative(projectRoot, absolutePath).replaceAll('\\', '/'),
    rows,
  };
  const outputDirectory = finalRankingWeekDirectory(projectRoot, selection.weekId);
  mkdirSync(outputDirectory, {recursive: true});
  const jsonPath = join(outputDirectory, 'final-ranking.json');
  const markdownPath = join(outputDirectory, 'final-ranking.md');
  writeFileSync(jsonPath, `${JSON.stringify(result, null, 2)}\n`, 'utf8');
  writeFileSync(markdownPath, markdownFor(result), 'utf8');
  return {result, jsonPath, markdownPath};
}
