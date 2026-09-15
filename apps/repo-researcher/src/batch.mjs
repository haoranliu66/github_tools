#!/usr/bin/env node
import {mkdirSync, writeFileSync} from 'node:fs';
import {spawnSync} from 'node:child_process';
import {dirname, join, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {loadSelection} from '../../trend-scout/src/selection.mjs';
import {localDateString} from '../../trend-scout/src/week.mjs';

const PROJECT_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../../..');
const RESEARCH_CLI = join(PROJECT_ROOT, 'apps/repo-researcher/src/cli.mjs');

function optionValue(name, fallback = null) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : fallback;
}

export function researchArgs(fullName, {allowRun = false, dryRun = false} = {}) {
  const args = [RESEARCH_CLI, 'research', fullName];
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
    const processResult = runner(process.execPath, researchArgs(fullName, {allowRun, dryRun}), {
      cwd: projectRoot,
      stdio: 'inherit',
    });
    results.push({
      fullName,
      status: !processResult.error && processResult.status === 0 ? 'completed' : 'failed',
      exitCode: processResult.status ?? null,
      error: processResult.error?.message ?? null,
    });
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
  const outputDirectory = join(projectRoot, 'output/research-batches');
  mkdirSync(outputDirectory, {recursive: true});
  const outputPath = join(outputDirectory, `${selection.weekId}.json`);
  writeFileSync(outputPath, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
  return {manifest, outputPath, failed: results.filter((item) => item.status === 'failed').length};
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
    console.log(`Research batch manifest: ${output.outputPath}`);
    if (output.failed) process.exitCode = 1;
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}

