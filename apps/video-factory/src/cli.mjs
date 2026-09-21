#!/usr/bin/env node
import {spawnSync} from 'node:child_process';
import {copyFileSync, existsSync, mkdirSync, rmSync, writeFileSync} from 'node:fs';
import {basename, dirname, extname, join, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import ffmpegInstaller from '@ffmpeg-installer/ffmpeg';
import {durationInFrames, loadStoryboard} from './storyboard.mjs';
import {buildRenderArgs} from './render-command.mjs';
import {resolveApprovedStoryboard} from './approval.mjs';
import {assertEditorialQuality, loadEditorialConfig} from './editorial-quality.mjs';
import {writeVideoQa} from './video-qa.mjs';

const PROJECT_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../../..');
const ENTRY_POINT = join(PROJECT_ROOT, 'apps/video-factory/remotion/index.jsx');
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

function stageAsset(sourcePath, runDirectory, stagedAssets) {
  const absoluteSource = resolve(sourcePath);
  if (!existsSync(absoluteSource)) throw new Error(`Media asset does not exist: ${absoluteSource}`);
  const existing = stagedAssets.get(absoluteSource);
  if (existing) return existing;
  mkdirSync(runDirectory, {recursive: true});
  const safeBase = basename(absoluteSource).replace(/[^A-Za-z0-9_.-]/g, '-');
  const destination = join(runDirectory, `${String(stagedAssets.size + 1).padStart(2, '0')}-${safeBase}`);
  copyFileSync(absoluteSource, destination);
  const stagedPath = destination.slice(PUBLIC_ROOT.length + 1).replaceAll('\\', '/');
  stagedAssets.set(absoluteSource, stagedPath);
  return stagedPath;
}

function stageStoryboard(storyboard, storyboardPath) {
  const runId = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  const runDirectory = join(PUBLIC_ROOT, 'generated', runId);
  const baseDirectory = dirname(storyboardPath);
  const staged = structuredClone(storyboard);
  const stagedAssets = new Map();

  if (staged.voiceover && !/^https?:\/\//i.test(staged.voiceover)) {
    staged.voiceover = stageAsset(resolve(baseDirectory, staged.voiceover), runDirectory, stagedAssets);
  }
  for (const scene of staged.scenes) {
    if (scene.src && !/^https?:\/\//i.test(scene.src)) {
      scene.src = stageAsset(resolve(baseDirectory, scene.src), runDirectory, stagedAssets);
    }
    for (const beat of scene.visualBeats ?? []) {
      if (beat.src && !/^https?:\/\//i.test(beat.src)) {
        beat.src = stageAsset(resolve(baseDirectory, beat.src), runDirectory, stagedAssets);
      }
    }
  }
  mkdirSync(runDirectory, {recursive: true});
  const propsPath = join(runDirectory, 'storyboard.json');
  writeFileSync(propsPath, `${JSON.stringify(staged, null, 2)}\n`, 'utf8');
  return {staged, runDirectory, propsPath};
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
    storyboardArg = optionValue(
      '--storyboard',
      join(PROJECT_ROOT, 'apps/video-factory/examples/storyboard.example.json'),
    );
  }
  const {storyboard, absolutePath} = loadStoryboard(storyboardArg);
  const frames = durationInFrames(storyboard);
  const editorialConfig = storyboard.meta.template === 'editorial'
    ? loadEditorialConfig(EDITORIAL_CONFIG)
    : null;
  if (editorialConfig) assertEditorialQuality(storyboard, editorialConfig);

  if (command === 'validate') {
    console.log(`Storyboard is valid: ${storyboard.scenes.length} scenes, ${frames} frames.`);
    return;
  }
  if (command !== 'render' && command !== 'studio') {
    throw new Error('Usage: cli.mjs <validate|render|studio> [options]');
  }

  if (command === 'studio') {
    const staged = stageStoryboard(storyboard, absolutePath);
    try {
      const relativeProps = staged.propsPath.slice(PROJECT_ROOT.length + 1);
      const studioResult = invokeRemotion([
        'studio', ENTRY_POINT, `--props=${relativeProps}`, `--public-dir=${PUBLIC_ROOT}`,
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

  const outputPath = resolve(optionValue('--output', approved.videoPath));
  if (outputPath.toLowerCase() !== approved.videoPath.toLowerCase()) {
    throw new Error(`Video output must use the approved project path: ${approved.videoPath}.`);
  }
  const rawOutput = process.argv.includes('--skip-ffmpeg')
    ? outputPath
    : join(dirname(outputPath), `${basename(outputPath, extname(outputPath))}.remotion${extname(outputPath) || '.mp4'}`);
  mkdirSync(dirname(outputPath), {recursive: true});
  const staged = stageStoryboard(storyboard, absolutePath);

  try {
    const relativeProps = staged.propsPath.slice(PROJECT_ROOT.length + 1);
    const renderResult = invokeRemotion(buildRenderArgs({
      entry: ENTRY_POINT, output: rawOutput, props: relativeProps, publicRoot: PUBLIC_ROOT,
    }));
    if (renderResult.error) throw renderResult.error;
    if (renderResult.status !== 0) throw new Error(`Remotion render failed with exit code ${renderResult.status}`);

    if (!process.argv.includes('--skip-ffmpeg')) {
      postprocess(rawOutput, outputPath);
      rmSync(rawOutput, {force: true});
    }
    if (editorialConfig) {
      const qa = writeVideoQa({
        ffmpegPath: ffmpegInstaller.path,
        videoPath: outputPath,
        storyboard,
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
