import {
  copyFileSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import {tmpdir} from 'node:os';
import {basename, dirname, join, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {spawnSync} from 'node:child_process';
import ffmpeg from '@ffmpeg-installer/ffmpeg';
import {buildNarrationBlocks, fitNarrationBlocks} from '../apps/video-factory/src/narration-blocks.mjs';
import {
  buildNarratedStoryboardFromBlocks,
  concatPcmWav,
  toSrt,
  wavDuration,
} from '../apps/video-factory/src/narration.mjs';
import {validateStoryboard} from '../apps/video-factory/src/storyboard.mjs';
import {ensureQwenTransport} from '../apps/video-factory/src/qwen-tunnel.mjs';
import {
  preflightTts,
  publicTtsMetadata,
  resolveTtsConfig,
  synthesizeNarrationBlocks,
} from '../apps/video-factory/src/tts.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const draftPath = resolve(process.argv[2] ?? 'episodes/001-archify/episode.json');
const output = resolve(process.argv[3] ?? 'output/videos/manual-project/resources/production');
if (existsSync(join(output, 'storyboard.json'))) {
  throw new Error('Episode output exists. Choose a new output directory to preserve the previous cut.');
}
mkdirSync(join(output, 'audio'), {recursive: true});
const draft = JSON.parse(readFileSync(draftPath, 'utf8'));
const editorialConfig = draft.meta?.template === 'editorial'
  ? JSON.parse(readFileSync(join(root, 'config/video-editorial.json'), 'utf8'))
  : null;
const narrationConfig = editorialConfig ?? {
  narrationBlocks: {
    defaultProfile: 'code-analysis',
    requiredMaxNewTokens: 1024,
    maxRequestCharacters: 1000,
    maxAudioSeconds: 64,
    gapSeconds: 0.24,
    profiles: {
      'code-analysis': {
        minScenes: 2, targetScenes: 3, maxScenes: 5, shortBlockSeconds: 10, topicChange: 'hard',
      },
    },
  },
};
const blockSettings = narrationConfig.narrationBlocks;
const profileName = draft.meta?.narrationProfile ?? blockSettings.defaultProfile;
const profile = blockSettings.profiles[profileName];
if (!profile) throw new Error(`Unknown narration profile: ${profileName}`);
const plannedBlocks = buildNarrationBlocks(draft, narrationConfig);
const jobPath = join(output, 'audio', 'jobs.json');
writeFileSync(jobPath, JSON.stringify(plannedBlocks.map((block) => ({
  id: block.id,
  profile: block.profile,
  sceneIndexes: block.sceneIndexes,
  topics: block.topics,
  characters: block.text.length,
  text: block.text,
})), null, 2));

function run(command, args) {
  const result = spawnSync(command, args, {cwd: root, encoding: 'utf8', maxBuffer: 10 * 1024 * 1024});
  if (result.error || result.status !== 0) {
    throw new Error(`${command} failed: ${result.error?.message ?? result.stderr}`);
  }
  return result.stdout;
}

async function synthesizeWindowsNarrationBlocks(blocks, ttsConfig) {
  const temporaryDirectory = mkdtempSync(join(tmpdir(), 'zimeiti-windows-tts-'));
  let candidateIndex = 0;
  try {
    const fitted = await fitNarrationBlocks(blocks, async (block) => {
      const index = candidateIndex;
      candidateIndex += 1;
      const path = join(temporaryDirectory, `candidate-${String(index).padStart(3, '0')}.wav`);
      const candidateJobs = join(temporaryDirectory, `candidate-${String(index).padStart(3, '0')}.json`);
      writeFileSync(candidateJobs, JSON.stringify([{text: block.text, path}], null, 2));
      run('powershell.exe', [
        '-NoProfile', '-File', join(root, 'scripts/synthesize-narration.ps1'),
        '-JobPath', candidateJobs, '-Voice', ttsConfig.voice, '-Rate', String(ttsConfig.rate),
      ]);
      const wave = readFileSync(path);
      return {wave, duration: wavDuration(wave)};
    }, {
      maxCharacters: blockSettings.maxRequestCharacters,
      maxSeconds: blockSettings.maxAudioSeconds,
      maxScenes: profile.maxScenes,
      shortBlockSeconds: profile.shortBlockSeconds,
    });
    const written = fitted.blocks.map((block, index) => {
      const path = join(output, 'audio', `block-${String(index).padStart(3, '0')}.wav`);
      writeFileSync(path, block.wave);
      const {wave, ...metadata} = block;
      return {...metadata, path};
    });
    return {provider: 'windows', count: written.length, blocks: written, stats: fitted.stats};
  } finally {
    rmSync(temporaryDirectory, {recursive: true, force: true});
  }
}

const ttsConfig = resolveTtsConfig();
const transport = await ensureQwenTransport(ttsConfig);
let synthesis;
let ttsPreflight;
try {
  ttsPreflight = await preflightTts(ttsConfig);
  if (ttsConfig.provider === 'qwen') {
    console.log(transport.started
      ? `Automatic SSH tunnel ready: ${transport.destination}.`
      : 'Using an already available Qwen TTS connection.');
    console.log(`Qwen TTS ready: ${ttsPreflight.model}, voice ${ttsPreflight.voiceName}.`);
    if (!Number.isInteger(ttsPreflight.maxNewTokens) ||
        ttsPreflight.maxNewTokens < blockSettings.requiredMaxNewTokens) {
      throw new Error(`Qwen TTS must report max_new_tokens >= ${blockSettings.requiredMaxNewTokens}; ` +
        `received ${ttsPreflight.maxNewTokens ?? 'not reported'}.`);
    }
    if (!Number.isInteger(ttsPreflight.maxTextCharacters) ||
        ttsPreflight.maxTextCharacters < blockSettings.maxRequestCharacters) {
      throw new Error(`Qwen TTS must report max_text_chars >= ${blockSettings.maxRequestCharacters}; ` +
        `received ${ttsPreflight.maxTextCharacters ?? 'not reported'}.`);
    }
    synthesis = await synthesizeNarrationBlocks(plannedBlocks, ttsConfig, {
      outputDirectory: join(output, 'audio'),
      maxCharacters: blockSettings.maxRequestCharacters,
      maxSeconds: blockSettings.maxAudioSeconds,
      maxScenes: profile.maxScenes,
      shortBlockSeconds: profile.shortBlockSeconds,
    });
  } else {
    synthesis = await synthesizeWindowsNarrationBlocks(plannedBlocks, ttsConfig);
  }
} finally {
  await transport.close();
}

const measuredSeconds = synthesis.blocks.map((block) => block.duration);
const result = buildNarratedStoryboardFromBlocks(draft, synthesis.blocks, {
  gapSeconds: blockSettings.gapSeconds,
  minimumTotalSeconds: editorialConfig ? editorialConfig.durationSeconds.min : 0,
  maxSceneSeconds: editorialConfig ? editorialConfig.durationSeconds.maxScene : 0,
});
for (const [index, clip] of result.audioClips.entries()) {
  run(ffmpeg.path, [
    '-y', '-hide_banner', '-loglevel', 'error', '-i', synthesis.blocks[index].path,
    '-af', 'apad', '-t', String(clip.frames / draft.meta.fps), '-ar', '48000', '-ac', '2',
    '-c:a', 'pcm_s16le', join(output, 'audio', `padded-${index}.wav`),
  ]);
}
const concatPath = join(output, 'audio', 'concat.txt');
writeFileSync(concatPath, result.audioClips.map((_, index) => `file 'padded-${index}.wav'`).join('\n'));
concatPcmWav(ffmpeg.path, concatPath, join(output, 'narration.wav'));
const measuredTotal = wavDuration(readFileSync(join(output, 'narration.wav')));
if (Math.abs(measuredTotal - result.totalFrames / draft.meta.fps) > 1 / draft.meta.fps) {
  throw new Error('Narration duration does not match the storyboard.');
}
result.storyboard.voiceover = 'narration.wav';
const stagedAssets = new Map();
for (const scene of result.storyboard.scenes) {
  if (!scene.src || /^https?:\/\//i.test(scene.src)) continue;
  const sourcePath = resolve(dirname(draftPath), scene.src);
  let stagedPath = stagedAssets.get(sourcePath);
  if (!stagedPath) {
    const safeBase = basename(sourcePath).replace(/[^A-Za-z0-9_.-]/g, '-');
    stagedPath = join('assets', `${String(stagedAssets.size + 1).padStart(2, '0')}-${safeBase}`);
    mkdirSync(join(output, 'assets'), {recursive: true});
    copyFileSync(sourcePath, join(output, stagedPath));
    stagedAssets.set(sourcePath, stagedPath);
  }
  scene.src = stagedPath.replaceAll('\\', '/');
}
const errors = validateStoryboard(result.storyboard);
if (errors.length) throw new Error(errors.join('\n'));
writeFileSync(join(output, 'storyboard.json'), JSON.stringify(result.storyboard, null, 2));
writeFileSync(join(output, 'subtitles.srt'), toSrt(result.clips, draft.meta.fps), 'utf8');
writeFileSync(join(output, 'timing.json'), JSON.stringify({
  tts: {
    ...publicTtsMetadata(ttsConfig),
    maxNewTokens: ttsPreflight.maxNewTokens,
    maxTextCharacters: ttsPreflight.maxTextCharacters,
  },
  narrationProfile: profileName,
  plannedBlockCount: plannedBlocks.length,
  finalBlockCount: synthesis.blocks.length,
  synthesisStats: synthesis.stats,
  measuredSeconds,
  measuredTotal,
  totalFrames: result.totalFrames,
  blocks: result.storyboard.narrationBlocks,
  clips: result.clips,
}, null, 2));
copyFileSync(draftPath, join(output, 'episode.source.json'));
console.log(JSON.stringify({
  output,
  scenes: draft.scenes.length,
  narrationBlocks: synthesis.blocks.length,
  captions: result.clips.length,
  duration: measuredTotal,
  totalFrames: result.totalFrames,
}));
