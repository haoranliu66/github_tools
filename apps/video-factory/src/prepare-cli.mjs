#!/usr/bin/env node
import {spawnSync} from 'node:child_process';
import {existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {basename, dirname, join, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {latestResearch} from '../../trend-scout/src/final-report.mjs';
import {loadSelection, resolveSelectionProjectPath} from '../../trend-scout/src/selection.mjs';
import {projectLayoutFromSelection, safeRepositoryName} from '../../shared/pipeline-paths.mjs';
import {buildEditorialEpisode} from './editorial-planner.mjs';
import {assertEditorialQuality, loadEditorialConfig} from './editorial-quality.mjs';
import {loadStoryboard} from './storyboard.mjs';

const PROJECT_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../../..');
const PREPARE_SCRIPT = join(PROJECT_ROOT, 'scripts/prepare-episode.mjs');
const CONFIG_PATH = join(PROJECT_ROOT, 'config/video-editorial.json');

function optionValue(name) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : null;
}

function main() {
  const selectionPath = optionValue('--selection');
  const fullName = optionValue('--repo');
  if (!selectionPath || !fullName) {
    throw new Error('Usage: prepare-cli.mjs --selection apps/trend-scout/trend_reports/YYYY-Www/selection.json --repo owner/name');
  }
  const {selection} = loadSelection(selectionPath, {requireApproved: true});
  if (!selection.selectedRepositories.includes(fullName)) {
    throw new Error(`Repository is not in the approved weekly research selection: ${fullName}`);
  }
  if (!selection.videoProjects.includes(fullName)) {
    throw new Error(`Repository is not approved for video production: ${fullName}`);
  }
  const layout = projectLayoutFromSelection(PROJECT_ROOT, selection, fullName);
  const storyboardPath = layout.storyboardPath;
  if (existsSync(storyboardPath)) {
    throw new Error(`Production storyboard already exists; refusing to overwrite it: ${storyboardPath}`);
  }

  const research = latestResearch(PROJECT_ROOT, fullName, selection);
  if (research?.status !== 'completed') throw new Error(`Completed research is required for ${fullName}.`);
  const reportPath = resolveSelectionProjectPath(PROJECT_ROOT, selection.sourceReport);
  const trendRows = JSON.parse(readFileSync(reportPath, 'utf8'));
  const trendRow = trendRows.find((row) => row.fullName === fullName) ?? null;
  const repositoryRoot = join(PROJECT_ROOT, 'workspaces/repos', safeRepositoryName(fullName));
  if (!existsSync(repositoryRoot)) throw new Error(`Cloned repository is unavailable: ${repositoryRoot}`);
  const dataDate = basename(reportPath).match(/^(\d{4}-\d{2}-\d{2})\.json$/)?.[1] ?? '';
  const config = loadEditorialConfig(CONFIG_PATH);
  const planned = buildEditorialEpisode({
    research: research.research, trendRow, repositoryRoot, config, dataDate,
  });
  const planningReport = assertEditorialQuality(planned.episode, config);
  const temporaryDirectory = mkdtempSync(join(tmpdir(), 'zimeiti-video-plan-'));
  const draftPath = join(temporaryDirectory, 'episode.json');
  writeFileSync(draftPath, `${JSON.stringify(planned.episode, null, 2)}\n`, 'utf8');
  try {
    const result = spawnSync(process.execPath, [PREPARE_SCRIPT, draftPath, dirname(storyboardPath)], {
      cwd: PROJECT_ROOT,
      stdio: 'inherit',
    });
    if (result.error) throw result.error;
    if (result.status !== 0) throw new Error(`Narrated episode preparation failed with exit code ${result.status}.`);
    const {storyboard} = loadStoryboard(storyboardPath);
    const preparedReport = assertEditorialQuality(storyboard, config);
    const qaReport = {
      schemaVersion: 1,
      repository: fullName,
      researchPath: research.directory,
      storyboardPath,
      plannerWarnings: planned.warnings,
      planning: planningReport,
      prepared: preparedReport,
      status: 'passed',
    };
    writeFileSync(join(dirname(storyboardPath), 'qa-report.json'), `${JSON.stringify(qaReport, null, 2)}\n`, 'utf8');
    console.log(`Prepared editorial storyboard: ${storyboardPath}`);
    console.log(`Quality gate passed: ${preparedReport.metrics.sceneCount} scenes, ` +
      `${preparedReport.metrics.totalDurationSeconds}s, ${preparedReport.metrics.distinctSceneTypes} scene types.`);
  } finally {
    rmSync(temporaryDirectory, {recursive: true, force: true});
  }
}

try {
  main();
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
