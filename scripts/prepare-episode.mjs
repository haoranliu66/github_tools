import {readFileSync, writeFileSync, mkdirSync, existsSync, copyFileSync} from 'node:fs';
import {basename, dirname, join, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {spawnSync} from 'node:child_process';
import ffmpeg from '@ffmpeg-installer/ffmpeg';
import {buildNarratedStoryboard, toSrt, wavDuration, concatPcmWav} from '../apps/video-factory/src/narration.mjs';
import {validateStoryboard} from '../apps/video-factory/src/storyboard.mjs';
import {preflightTts, publicTtsMetadata, resolveTtsConfig, synthesizeNarrationJobs} from '../apps/video-factory/src/tts.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const draftPath = resolve(process.argv[2] ?? 'episodes/001-archify/episode.json');
const output = resolve(process.argv[3] ?? 'output/video/001-archify');
if (existsSync(join(output, 'storyboard.json'))) throw new Error('Episode output exists. Choose a new output directory to preserve the previous cut.');
mkdirSync(join(output, 'audio'), {recursive: true});
const draft = JSON.parse(readFileSync(draftPath, 'utf8'));
const editorialConfig = draft.meta?.template === 'editorial'
  ? JSON.parse(readFileSync(join(root, 'config/video-editorial.json'), 'utf8'))
  : null;
const jobs = draft.scenes.flatMap(s => s.sentences).map((sentence, index) => ({
  text: sentence.spoken ?? sentence.text,
  path: join(output, 'audio', `sentence-${String(index).padStart(3, '0')}.wav`),
}));
const jobPath = join(output, 'audio', 'jobs.json');
writeFileSync(jobPath, JSON.stringify(jobs, null, 2));
function run(command, args) {
  const result = spawnSync(command, args, {cwd: root, encoding: 'utf8', maxBuffer: 10 * 1024 * 1024});
  if (result.error || result.status !== 0) throw new Error(`${command} failed: ${result.error?.message ?? result.stderr}`);
  return result.stdout;
}
const ttsConfig = resolveTtsConfig();
const ttsPreflight = await preflightTts(ttsConfig);
if (ttsConfig.provider === 'qwen') {
  console.log(`Qwen TTS ready: ${ttsPreflight.model}, voice ${ttsPreflight.voiceName}.`);
  await synthesizeNarrationJobs(jobs, ttsConfig);
} else {
  console.log(run('powershell.exe', [
    '-NoProfile', '-File', join(root, 'scripts/synthesize-narration.ps1'),
    '-JobPath', jobPath, '-Voice', ttsConfig.voice, '-Rate', String(ttsConfig.rate),
  ]));
}
const measuredSeconds = jobs.map(j => wavDuration(readFileSync(j.path)));
const result = buildNarratedStoryboard(draft, measuredSeconds, {
  minSceneSeconds: editorialConfig ? editorialConfig.durationSeconds.min / draft.scenes.length : 0,
});
for (const [index, clip] of result.clips.entries()) {
  run(ffmpeg.path, ['-y', '-hide_banner', '-loglevel', 'error', '-i', jobs[index].path,
    '-af', 'apad', '-t', String(clip.frames / draft.meta.fps), '-ar', '48000', '-ac', '2',
    '-c:a', 'pcm_s16le', join(output, 'audio', `padded-${index}.wav`)]);
}
const concatPath = join(output, 'audio', 'concat.txt');
writeFileSync(concatPath, result.clips.map((_, index) => `file 'padded-${index}.wav'`).join('\n'));
concatPcmWav(ffmpeg.path, concatPath, join(output, 'narration.wav'));
const measuredTotal = wavDuration(readFileSync(join(output, 'narration.wav')));
if (Math.abs(measuredTotal - result.totalFrames / draft.meta.fps) > 1 / draft.meta.fps) throw new Error('Narration duration does not match the storyboard.');
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
writeFileSync(join(output, 'timing.json'), JSON.stringify({tts: publicTtsMetadata(ttsConfig),
  measuredSeconds, measuredTotal, totalFrames: result.totalFrames, clips: result.clips}, null, 2));
copyFileSync(draftPath, join(output, 'episode.source.json'));
console.log(JSON.stringify({output, scenes: draft.scenes.length, captions: jobs.length, duration: measuredTotal, totalFrames: result.totalFrames}));
