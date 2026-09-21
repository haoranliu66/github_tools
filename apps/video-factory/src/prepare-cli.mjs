#!/usr/bin/env node
import {spawnSync} from 'node:child_process';
import {existsSync, mkdirSync, mkdtempSync, readFileSync, renameSync, rmSync, statSync, writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {basename, dirname, join, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {latestResearch} from '../../trend-scout/src/final-report.mjs';
import {loadSelection, resolveSelectionProjectPath} from '../../trend-scout/src/selection.mjs';
import {projectLayoutFromSelection, safeRepositoryName} from '../../shared/pipeline-paths.mjs';
import {buildEditorialEpisode} from './editorial-planner.mjs';
import {assertEditorialQuality, loadEditorialConfig} from './editorial-quality.mjs';
import {loadStoryboard} from './storyboard.mjs';
import {
  assertEditorialResearch,
  loadEditorialContract,
} from '../../repo-researcher/src/editorial-contract.mjs';

const PROJECT_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../../..');
const PREPARE_SCRIPT = join(PROJECT_ROOT, 'scripts/prepare-episode.mjs');
const CONFIG_PATH = join(PROJECT_ROOT, 'config/video-editorial.json');

const WINDOWS_BROWSER_CANDIDATES = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
];

function optionValue(name) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : null;
}

export function replaceProductionDirectory(stagingDirectory, productionDirectory) {
  const staging = resolve(stagingDirectory);
  const production = resolve(productionDirectory);
  if (staging === production || dirname(staging) !== dirname(production)) {
    throw new Error('Production staging and destination must be distinct sibling directories.');
  }
  if (!existsSync(staging)) throw new Error(`Production staging directory is missing: ${staging}`);

  const backupDirectory = `${production}.replace-${process.pid}-${Date.now()}`;
  const hadPreviousProduction = existsSync(production);
  if (hadPreviousProduction) renameSync(production, backupDirectory);
  try {
    renameSync(staging, production);
  } catch (error) {
    if (hadPreviousProduction && !existsSync(production) && existsSync(backupDirectory)) {
      renameSync(backupDirectory, production);
    }
    throw error;
  }
  if (existsSync(backupDirectory)) rmSync(backupDirectory, {recursive: true, force: true});
}

export function captureGithubRepositoryPreview(repositoryUrl, destination, {
  browserExecutable = WINDOWS_BROWSER_CANDIDATES.find((candidate) => existsSync(candidate)),
} = {}) {
  const parsed = new URL(repositoryUrl);
  if (parsed.protocol !== 'https:' || parsed.hostname !== 'github.com') {
    throw new Error(`Repository preview requires a public GitHub URL: ${repositoryUrl}`);
  }
  if (existsSync(destination) && statSync(destination).size > 10_000) return destination;
  if (!browserExecutable) throw new Error('Chrome or Edge is required to capture the official GitHub repository page.');
  mkdirSync(dirname(destination), {recursive: true});
  const profileDirectory = `${destination}.browser-${process.pid}-${Date.now()}`;
  try {
    const result = spawnSync(browserExecutable, [
      '--headless=new',
      '--disable-gpu',
      '--hide-scrollbars',
      '--no-first-run',
      '--no-default-browser-check',
      '--force-device-scale-factor=1',
      '--window-size=1440,900',
      '--virtual-time-budget=6000',
      `--user-data-dir=${profileDirectory}`,
      `--screenshot=${destination}`,
      repositoryUrl,
    ], {
      cwd: PROJECT_ROOT,
      encoding: 'utf8',
      maxBuffer: 2 * 1024 * 1024,
      timeout: 45_000,
      windowsHide: true,
    });
    if (result.error || result.status !== 0 || !existsSync(destination) || statSync(destination).size <= 10_000) {
      throw new Error(`Official GitHub repository screenshot failed: ${result.error?.message ?? result.stderr ?? `exit ${result.status}`}`);
    }
    return destination;
  } finally {
    rmSync(profileDirectory, {recursive: true, force: true});
  }
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
  const productionDirectory = dirname(storyboardPath);

  const research = latestResearch(PROJECT_ROOT, fullName, selection);
  if (research?.status !== 'completed') throw new Error(`Completed research is required for ${fullName}.`);
  const editorialContract = loadEditorialContract(PROJECT_ROOT);
  assertEditorialResearch(research.research, editorialContract);
  const reportPath = resolveSelectionProjectPath(PROJECT_ROOT, selection.sourceReport);
  const trendRows = JSON.parse(readFileSync(reportPath, 'utf8'));
  const trendRow = trendRows.find((row) => row.fullName === fullName) ?? null;
  const repositoryRoot = join(PROJECT_ROOT, 'workspaces/repos', safeRepositoryName(fullName));
  if (!existsSync(repositoryRoot)) throw new Error(`Cloned repository is unavailable: ${repositoryRoot}`);
  const dataDate = basename(reportPath).match(/^(\d{4}-\d{2}-\d{2})\.json$/)?.[1] ?? '';
  const config = loadEditorialConfig(CONFIG_PATH);
  const repositoryPreviewPath = captureGithubRepositoryPreview(
    research.research.project.url,
    join(layout.resourcesDirectory, 'github-repository-preview.png'),
  );
  const planned = buildEditorialEpisode({
    research: research.research, trendRow, repositoryRoot, repositoryPreviewPath, config, dataDate,
  });
  const planningReport = assertEditorialQuality(planned.episode, config);
  const temporaryDirectory = mkdtempSync(join(tmpdir(), 'zimeiti-video-plan-'));
  const stagingDirectory = join(layout.resourcesDirectory,
    `.production-staging-${process.pid}-${Date.now()}`);
  const draftPath = join(temporaryDirectory, 'episode.json');
  writeFileSync(draftPath, `${JSON.stringify(planned.episode, null, 2)}\n`, 'utf8');
  try {
    const result = spawnSync(process.execPath, [PREPARE_SCRIPT, draftPath, stagingDirectory], {
      cwd: PROJECT_ROOT,
      stdio: 'inherit',
    });
    if (result.error) throw result.error;
    if (result.status !== 0) throw new Error(`Narrated episode preparation failed with exit code ${result.status}.`);
    const stagedStoryboardPath = join(stagingDirectory, 'storyboard.json');
    const {storyboard} = loadStoryboard(stagedStoryboardPath);
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
    writeFileSync(join(stagingDirectory, 'qa-report.json'), `${JSON.stringify(qaReport, null, 2)}\n`, 'utf8');

    replaceProductionDirectory(stagingDirectory, productionDirectory);
    console.log(`Prepared editorial storyboard: ${storyboardPath}`);
    console.log(`Quality gate passed: ${preparedReport.metrics.sceneCount} scenes, ` +
      `${preparedReport.metrics.totalDurationSeconds}s, ${preparedReport.metrics.distinctSceneTypes} scene types.`);
  } finally {
    rmSync(temporaryDirectory, {recursive: true, force: true});
    if (existsSync(stagingDirectory)) rmSync(stagingDirectory, {recursive: true, force: true});
  }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    main();
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
