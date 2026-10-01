#!/usr/bin/env node
import {validateCliOptions} from '../../shared/cli-options.mjs';
import {spawnSync} from 'node:child_process';
import {existsSync, readFileSync, mkdirSync, rmSync, writeFileSync} from 'node:fs';
import {basename, dirname, extname, join, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import ffmpegInstaller from '@ffmpeg-installer/ffmpeg';
import {durationInFrames, loadStoryboard} from './storyboard.mjs';
import {buildRenderArgs} from './render-command.mjs';
import {resolveApprovedStoryboard} from './approval.mjs';
import {assertEditorialQuality, loadEditorialConfig} from './editorial-quality.mjs';
import {writeVideoQa} from './video-qa.mjs';
import {requireVisualPreflight} from './visual-preflight.mjs';
import {writeRenderEntry} from './render-entry.mjs';

const PROJECT_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../../..');
const PUBLIC_ROOT = join(PROJECT_ROOT, 'apps/video-factory/public');
const REMOTION_CLI = join(PROJECT_ROOT, 'node_modules/@remotion/cli/remotion-cli.js');
const EDITORIAL_CONFIG = join(PROJECT_ROOT, 'config/video-editorial.json');

function optionValue(name, fallback = null) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : fallback;
}

function invokeRemotion(args) {
  if (!existsSync(REMOTION_CLI)) throw new Error('Remotion CLI is not installed. Run pnpm install first.');
  return spawnSync(process.execPath, [REMOTION_CLI, ...args], {
    cwd: PROJECT_ROOT,
    stdio: 'inherit',
  });
}

function stageStoryboard(storyboard,storyboardPath){
  const runDirectory=join(PUBLIC_ROOT,'generated',String(Date.now())+'-'+process.pid);mkdirSync(runDirectory,{recursive:true});
  const propsPath=join(runDirectory,'storyboard.json');writeFileSync(propsPath,JSON.stringify(storyboard));
  return {runDirectory,propsPath,publicRoot:dirname(storyboardPath)};
}

function postprocess(inputPath, outputPath) {
  const ffmpegPath = ffmpegInstaller?.path;
  if (!ffmpegPath) throw new Error('@ffmpeg-installer/ffmpeg did not provide an executable.');
  const result = spawnSync(ffmpegPath, [
    '-y',
    '-i', inputPath,
    '-c:v', 'libx264',
    '-preset', 'medium',
    '-crf', '18',
    '-pix_fmt', 'yuv420p',
    '-c:a', 'aac',
    '-b:a', '192k',
    '-movflags', '+faststart',
    outputPath,
  ], {stdio: 'inherit'});
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`FFmpeg failed with exit code ${result.status}`);
}

function main() {
  validateCliOptions(process.argv.slice(3),{values:['--storyboard','--final-ranking','--repo','--output'],booleans:['--skip-ffmpeg']});
  const command = process.argv[2] ?? 'validate';
  let storyboardArg;
  let approved = null;
  if (command === 'render' || command === 'studio') {
    if (process.argv.includes('--storyboard')) {
      throw new Error('Direct storyboard rendering is disabled. Use --final-ranking and --repo.');
    }
    approved = resolveApprovedStoryboard({
      projectRoot: PROJECT_ROOT,
      finalRankingPath: optionValue('--final-ranking'),
      fullName: optionValue('--repo'),
    });
    storyboardArg = approved.storyboardPath;
  } else {
    storyboardArg=optionValue('--storyboard');if(!storyboardArg)throw new Error('Validation requires the current --storyboard PATH.');
  }
  const {storyboard, absolutePath} = loadStoryboard(storyboardArg);
  const frames = durationInFrames(storyboard);
  const editorialConfig=loadEditorialConfig(EDITORIAL_CONFIG);
  if(storyboard.meta.productionStage==='visual-ready')assertEditorialQuality(storyboard,editorialConfig);
  if(command==='render') {
    const path=storyboard.meta.visualPreflight?.reportPath;
    if(!path)throw new Error('Visual preflight is required before rendering final output.');
    requireVisualPreflight({...JSON.parse(readFileSync(path,'utf8')),reportPath:path},storyboard);
  }

  if (command === 'validate') {
    console.log(`Storyboard is valid: ${storyboard.scenes.length} scenes, ${frames} frames.`);
    return;
  }
  if (command !== 'render' && command !== 'studio') {
    throw new Error('Usage: cli.mjs <validate|render|studio> [options]');
  }

  if (command === 'studio') {
    const staged = stageStoryboard(storyboard, absolutePath);
    const shotEntry = join(staged.runDirectory, 'shot-entry.jsx');
    const entryPoint = writeRenderEntry(storyboard, dirname(dirname(absolutePath)), shotEntry);
    try {
      const relativeProps = staged.propsPath.slice(PROJECT_ROOT.length + 1);
      const studioResult = invokeRemotion([
        'studio', entryPoint, '--no-open', `--props=${relativeProps}`, `--public-dir=${staged.publicRoot}`,
      ]);
      if (studioResult.error) throw studioResult.error;
      if (studioResult.status !== 0) {
        throw new Error(`Remotion Studio failed with exit code ${studioResult.status}`);
      }
    } finally {
      rmSync(staged.runDirectory, {recursive: true, force: true});
    }
    return;
  }

  if(storyboard.meta.directorVersion!==1||storyboard.meta.visualProgram?.schemaVersion!==3)throw new Error('Production rendering requires the current post-audio director program. Generate content, new audio and final visuals first.');
  const outputPath = resolve(optionValue('--output', approved.videoPath));
  if (outputPath.toLowerCase() !== approved.videoPath.toLowerCase()) {
    throw new Error(`Video output must use the approved project path: ${approved.videoPath}.`);
  }
  const rawOutput = process.argv.includes('--skip-ffmpeg')
    ? outputPath
    : join(dirname(outputPath), `${basename(outputPath, extname(outputPath))}.remotion${extname(outputPath) || '.mp4'}`);
  mkdirSync(dirname(outputPath), {recursive: true});
  const staged = stageStoryboard(storyboard, absolutePath);
  const shotEntry = join(staged.runDirectory, 'shot-entry.jsx');
  const entryPoint = writeRenderEntry(storyboard, dirname(dirname(absolutePath)), shotEntry);

  try {
    const relativeProps = staged.propsPath.slice(PROJECT_ROOT.length + 1);
    const renderResult = invokeRemotion(buildRenderArgs({
      entry: entryPoint, output: rawOutput, props: relativeProps, publicRoot: staged.publicRoot,
    }));
    if (renderResult.error) throw renderResult.error;
    if (renderResult.status !== 0) throw new Error(`Remotion render failed with exit code ${renderResult.status}`);

    if (!process.argv.includes('--skip-ffmpeg')) {
      postprocess(rawOutput, outputPath);
      rmSync(rawOutput, {force: true});
    }
    {
      const qa = writeVideoQa({
        ffmpegPath: ffmpegInstaller.path,
        videoPath: outputPath,
        storyboard,
        visualPreflight:storyboard.meta.visualPreflight?.reportPath?{...JSON.parse(readFileSync(storyboard.meta.visualPreflight.reportPath,'utf8')),reportPath:storyboard.meta.visualPreflight.reportPath}:null,
        sampleCount: editorialConfig.qa.sampleFrames,
        qaDirectory: join(dirname(approved.storyboardPath), 'qa', 'final'),
      });
      console.log(`Video QA passed; contact sheet: ${qa.contactSheet}`);
    }
    console.log(`Rendered ${frames} frames to ${outputPath}`);
  } finally {
    rmSync(staged.runDirectory, {recursive: true, force: true});
  }
}

try {
  main();
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
