#!/usr/bin/env node
import {mkdirSync, writeFileSync} from 'node:fs';
import {spawnSync} from 'node:child_process';
import {dirname, join, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {loadSelection} from '../../trend-scout/src/selection.mjs';
import {localDateString} from '../../trend-scout/src/week.mjs';
import {projectLayoutFromSelection} from '../../shared/pipeline-paths.mjs';

const PROJECT_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../../..');
const RESEARCH_CLI = join(PROJECT_ROOT, 'apps/repo-researcher/src/cli.mjs');

function optionValue(name, fallback = null) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : fallback;
}

export function researchArgs(fullName, {selectionPath, allowRun = false, dryRun = false} = {}) {
  const args = [RESEARCH_CLI, 'research', fullName, '--selection', selectionPath];
  if (allowRun) args.push('--allow-run');
  if (dryRun) args.push('--dry-run');
  return args;
}

export function runResearchBatch({
  selectionPath,
  projectRoot = PROJECT_ROOT,
  allowRun = false,
  dryRun = false,
  runner = spawnSync,
  now = new Date(),
} = {}) {
  const {selection, absolutePath} = loadSelection(selectionPath, {requireApproved: true});
  const results = [];
  for (const fullName of selection.selectedRepositories) {
    const layout = projectLayoutFromSelection(projectRoot, selection, fullName);
    mkdirSync(layout.resourcesDirectory, {recursive: true});
    const processResult = runner(process.execPath, researchArgs(fullName, {
      selectionPath: absolutePath,
      allowRun,
      dryRun,
    }), {
      cwd: projectRoot,
      stdio: 'inherit',
    });
    const item = {
      fullName,
      status: !processResult.error && processResult.status === 0 ? 'completed' : 'failed',
      exitCode: processResult.status ?? null,
      error: processResult.error?.message ?? null,
    };
    results.push(item);
    writeFileSync(join(layout.resourcesDirectory, 'research-batch-result.json'), `${JSON.stringify({
      schemaVersion: 1,
      weekId: selection.weekId,
      selectionFile: absolutePath,
      startedOn: localDateString(now),
      allowRun,
      dryRun,
      ...item,
    }, null, 2)}\n`, 'utf8');
  }
  const manifest = {
    schemaVersion: 1,
    weekId: selection.weekId,
    selectionFile: absolutePath,
    startedOn: localDateString(now),
    allowRun,
    dryRun,
    results,
  };
  return {manifest, failed: results.filter((item) => item.status === 'failed').length};
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const selectionPath = optionValue('--selection');
    if (!selectionPath) throw new Error('Usage: batch.mjs --selection PATH [--dry-run] [--allow-run]');
    const output = runResearchBatch({
      selectionPath,
      allowRun: process.argv.includes('--allow-run'),
      dryRun: process.argv.includes('--dry-run'),
    });
    console.log(`Research batch completed: ${output.manifest.results.length} projects, ` +
      `${output.failed} failed. Per-project status is stored under each resources directory.`);
    if (output.failed) process.exitCode = 1;
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
