#!/usr/bin/env node
import {mkdirSync, writeFileSync} from 'node:fs';
import {spawnSync} from 'node:child_process';
import {dirname, join, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {validateCliOptions} from '../../shared/cli-options.mjs';
import {loadSelection} from '../../trend-scout/src/selection.mjs';
import {localDateString} from '../../trend-scout/src/week.mjs';
import {projectLayoutFromSelection} from '../../shared/pipeline-paths.mjs';

const PROJECT_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../../..');
const RESEARCH_CLI = join(PROJECT_ROOT, 'apps/repo-researcher/src/cli.mjs');

function optionValue(name, fallback = null) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : fallback;
}

export function researchArgs(fullName,{selectionPath,dryRun=false,styleId,contentSkill=null,form=null}={}) {
  if(!styleId)throw new Error('Human style selection required: use --style STYLE_ID.');
  const args = [RESEARCH_CLI, '--repo', fullName, '--selection', selectionPath, '--style', styleId];
  if(contentSkill)args.push('--content-skill',contentSkill);if(form)args.push('--form',form);
  if (dryRun) args.push('--dry-run');
  return args;
}

export function runResearchBatch({
  selectionPath,
  projectRoot = PROJECT_ROOT,
  dryRun = false,
  styleId,contentSkill=null,form=null,
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
      dryRun,styleId,contentSkill,form,
    }), {
      cwd: projectRoot,
      encoding:'utf8',windowsHide:true,
    });
    if(processResult.stdout)process.stdout.write(processResult.stdout);if(processResult.stderr)process.stderr.write(processResult.stderr);
    const message=String(processResult.stdout??'').split(/\r?\n/u).filter(Boolean).map(line=>{try{return JSON.parse(line);}catch{return null;}}).filter(Boolean).at(-1);
    const successful=!processResult.error&&processResult.status===0;
    const stageStatus=message?.status;
    const item = {
      fullName,
      status: !successful?'failed':dryRun?'dry-run':stageStatus==='production-planned'?'completed':stageStatus==='awaiting-main-agent'?'awaiting-main-agent':'failed',
      ...(message?.taskPath?{taskPath:message.taskPath}:{}),
      exitCode: processResult.status ?? null,
      error: processResult.error?.message ?? null,
    };
    results.push(item);
    writeFileSync(join(layout.resourcesDirectory, 'research-batch-result.json'), `${JSON.stringify({
      schemaVersion: 1,
      weekId: selection.weekId,
      selectionFile: absolutePath,
      startedOn: localDateString(now),
      dryRun,
      ...item,
    }, null, 2)}\n`, 'utf8');
  }
  const manifest = {
    schemaVersion: 1,
    weekId: selection.weekId,
    selectionFile: absolutePath,
    startedOn: localDateString(now),
    dryRun,
    results,
  };
  return {manifest, failed: results.filter((item) => item.status === 'failed').length};
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const selectionPath = optionValue('--selection');
    if (!selectionPath) throw new Error('Usage: batch.mjs --selection PATH [--dry-run]');
    validateCliOptions(process.argv.slice(2),{values:['--selection','--style','--content-skill','--form'],booleans:['--dry-run']});
    const output = runResearchBatch({
      selectionPath,
      dryRun: process.argv.includes('--dry-run'),styleId:optionValue('--style'),contentSkill:optionValue('--content-skill'),form:optionValue('--form'),
    });
    console.log(`Research batch prepared: ${output.manifest.results.length} projects, ` +
      `${output.failed} failed. Per-project status is stored under each resources directory.`);
    if (output.failed) process.exitCode = 1;
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
