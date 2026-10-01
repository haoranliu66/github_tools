import {requireVisualPreflight} from '../../video-factory/src/visual-preflight.mjs';
import {validateFactResearch,loadFactReadme} from '../../repo-researcher/src/fact-research.mjs';
import {createHash} from 'node:crypto';
import {existsSync, mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {join, relative, resolve} from 'node:path';
import {loadSelection, resolveSelectionProjectPath} from './selection.mjs';
import {loadEditorialContract} from '../../repo-researcher/src/editorial-contract.mjs';
import {verifyCreativeProgram} from '../../video-factory/src/creative-program.mjs';
import {loadEditorialPlan, loadVideoEditingSkill} from '../../video-factory/src/editorial-agent.mjs';
import {
  finalRankingWeekDirectory,
  projectLayoutFromSelection,
} from '../../shared/pipeline-paths.mjs';

function sha256(value) {
  return createHash('sha256').update(value).digest('hex');
}

export function latestResearch(projectRoot, fullName, selection, {
  editorialContract = loadEditorialContract(projectRoot),
} = {}) {
  const layout = projectLayoutFromSelection(projectRoot, selection, fullName);
  const directory = layout.resourcesDirectory;
  const researchPath = join(directory, 'research.json');
  const storyboardPath=layout.storyboardPath;
  if (!existsSync(researchPath)) return null;
  try {
    const research = JSON.parse(readFileSync(researchPath, 'utf8'));
    validateFactResearch(research,{contract:editorialContract,readmeText:loadFactReadme(directory)});
    if(!existsSync(join(directory,'editorial-plan.json'))||!existsSync(join(directory,'media_manifest.json')))throw new Error('Current complete scoped plan and used-material manifest are required.');
    return {status: 'completed', directory, research, storyboardPath, layout};
  } catch (error) {
    return {status: 'incomplete', directory, reason: error.message, layout};
  }
}

function productionStoryboard(projectRoot, selection, fullName, research, editorialContract, editingSkill) {
  const layout = projectLayoutFromSelection(projectRoot, selection, fullName);
  const storyboardPath = layout.storyboardPath;
  if (!existsSync(storyboardPath)) {
    throw new Error(`Approved production storyboard does not exist for ${fullName}: ${storyboardPath}`);
  }
  const serialized = readFileSync(storyboardPath, 'utf8');
  const storyboard = JSON.parse(serialized);
  if (storyboard.meta?.editorialContractDigest !== research.editorialContract.digest ||
      storyboard.meta?.researchCommit !== research.project.versionOrCommit) {
    throw new Error(`Approved production storyboard is stale for ${fullName}; run video:prepare again.`);
  }
  const editorialPlan = loadEditorialPlan({
    resourcesDirectory: layout.resourcesDirectory,
    fullName,
    researchText: readFileSync(join(layout.resourcesDirectory, 'research.json'), 'utf8'),
    contract: editorialContract,
    editingSkill: editingSkill ?? loadVideoEditingSkill(projectRoot),
  });
  if (storyboard.meta?.editorialPlanDigest !== editorialPlan.digest) {
    throw new Error(`Approved production storyboard has a stale editorial plan for ${fullName}; run video:prepare again.`);
  }
  if(storyboard.meta.productionStage!=='visual-ready') throw new Error('Audio is ready but final visual direction is missing. Run video:direct.');
  const preflightPath=storyboard.meta?.visualPreflight?.reportPath;if(!preflightPath)throw new Error('Current visual preflight is required.');
  verifyCreativeProgram(storyboard,layout.resourcesDirectory);
  requireVisualPreflight({...JSON.parse(readFileSync(preflightPath,'utf8')),reportPath:preflightPath},storyboard);

  
  return {storyboardPath, storyboardDigest: sha256(serialized), editorialPlanDigest: editorialPlan.digest};
}

function markdownFor(result) {
  return [
    `# 研究后最终榜 · ${result.weekId}`,
    '',
    `> 基础榜：${result.sourceReport}`,
    '',
    '> 沿用基础趋势分（最高 93）；研究只交付本片策划和素材，不额外评估可演示性。只有人工批准且当前制作完整的项目可进入视频渲染。',
    '',
    '| # | 项目 | 趋势分 / 93 | 最终分 / 93 | 研究状态 | 视频批准 |',
    '|---:|---|---:|---:|---|---|',
    ...result.rows.map((row) =>
      `| ${row.finalRank ?? '-'} | ${row.fullName} | ${row.trendScore} | ${row.finalScore ?? '-'} | ${row.researchStatus} | ${row.videoApproved ? '是' : '否'} |`,
    ),
    '',
  ].join('\n');
}

export function writeFinalRanking({
  projectRoot,
  selectionPath,
  generatedAt = new Date(),
  editorialContract = loadEditorialContract(projectRoot),
  editingSkill = null,
}) {
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
    const research = latestResearch(projectRoot, fullName, selection, {editorialContract});
    const completed = research?.status === 'completed';
    const finalScore=completed?Number(base.trendScore.toFixed(2)):null;
    const videoApproved = completed && selection.videoProjects.includes(fullName);
    const production = videoApproved
      ? productionStoryboard(projectRoot, selection, fullName, research.research, editorialContract, editingSkill)
      : null;
    const storyboardPath = completed ? (production?.storyboardPath ?? research.storyboardPath) : null;
    return {
      finalRank: null,
      weekId: selection.weekId,
      fullName,
      baseRank: base.rank,
      trendScore: base.trendScore,
      trendScoreMax: 93,
      finalScore,
      finalScoreMax: 93,
      researchStatus: completed ? 'completed' : research?.status ?? 'missing',
      researchIssue: completed ? null : research?.reason ?? 'No current-schema research package found.',
      researchPath: research ? relative(projectRoot, research.directory).replaceAll('\\', '/') : null,
      editorialContractDigest: completed ? research.research.editorialContract.digest : null,
      researchCommit: completed ? research.research.project.versionOrCommit : null,
      projectPath: relative(projectRoot, layout.projectDirectory).replaceAll('\\', '/'),
      storyboardPath: storyboardPath
        ? relative(projectRoot, storyboardPath).replaceAll('\\', '/')
        : null,
      videoPath: relative(projectRoot, layout.videoPath).replaceAll('\\', '/'),
      storyboardDigest: production?.storyboardDigest ?? null,
      editorialPlanDigest: production?.editorialPlanDigest ?? null,
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
