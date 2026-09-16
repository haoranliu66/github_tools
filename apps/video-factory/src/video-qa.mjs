import {spawnSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import {mkdirSync, readFileSync, rmSync, writeFileSync} from 'node:fs';
import {dirname, join, relative} from 'node:path';

function runFfmpeg(ffmpegPath, args, label) {
  const result = spawnSync(ffmpegPath, args, {encoding: 'utf8', maxBuffer: 20 * 1024 * 1024});
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`${label} failed: ${result.stderr || `exit ${result.status}`}`);
}

export function representativeFrames(storyboard, count = 8) {
  const fps = storyboard.meta.fps;
  const ranges = [];
  let start = 0;
  for (const scene of storyboard.scenes) {
    const duration = Math.max(1, Math.round(scene.duration * fps));
    ranges.push({start, duration});
    start += duration;
  }
  const indices = [];
  const desired = Math.min(count, ranges.length);
  for (let sample = 0; sample < desired; sample += 1) {
    indices.push(Math.round(sample * (ranges.length - 1) / Math.max(1, desired - 1)));
  }
  return [...new Set(indices)].map((index, sampleIndex) => ({
    sampleIndex: sampleIndex + 1,
    sceneIndex: index,
    frame: index === 0 ? 0 : ranges[index].start + Math.floor(ranges[index].duration * 0.5),
  }));
}

export function writeVideoQa({ffmpegPath, videoPath, storyboard, sampleCount = 8}) {
  runFfmpeg(ffmpegPath, [
    '-v', 'error', '-xerror', '-i', videoPath,
    '-map', '0:v:0', '-map', '0:a:0', '-f', 'null', '-',
  ], 'Full audio/video decode');

  const qaDirectory = join(dirname(videoPath), 'qa', 'final');
  rmSync(qaDirectory, {recursive: true, force: true});
  mkdirSync(qaDirectory, {recursive: true});
  const samples = representativeFrames(storyboard, sampleCount);
  for (const sample of samples) {
    const output = join(qaDirectory, `sample-${String(sample.sampleIndex).padStart(2, '0')}.png`);
    runFfmpeg(ffmpegPath, [
      '-y', '-hide_banner', '-loglevel', 'error',
      '-ss', String(sample.frame / storyboard.meta.fps), '-i', videoPath, '-frames:v', '1', output,
    ], `QA frame ${sample.frame}`);
    sample.file = relative(qaDirectory, output).replaceAll('\\', '/');
  }
  const rows = Math.ceil(samples.length / 2);
  const contactSheet = join(qaDirectory, 'contact-sheet.png');
  runFfmpeg(ffmpegPath, [
    '-y', '-hide_banner', '-loglevel', 'error', '-framerate', '1', '-start_number', '1',
    '-i', join(qaDirectory, 'sample-%02d.png'),
    '-vf', `scale=640:-1,tile=2x${rows}:padding=12:margin=12`, '-frames:v', '1', contactSheet,
  ], 'QA contact sheet');

  const totalFrames = storyboard.scenes.reduce(
    (sum, scene) => sum + Math.max(1, Math.round(scene.duration * storyboard.meta.fps)), 0,
  );
  const videoBytes = readFileSync(videoPath);
  const report = {
    schemaVersion: 1,
    status: 'passed',
    videoPath,
    bytes: videoBytes.length,
    sha256: createHash('sha256').update(videoBytes).digest('hex'),
    width: storyboard.meta.width,
    height: storyboard.meta.height,
    fps: storyboard.meta.fps,
    totalFrames,
    durationSeconds: Number((totalFrames / storyboard.meta.fps).toFixed(3)),
    audioVideoDecode: 'passed',
    samples,
    contactSheet: relative(join(qaDirectory, '..'), contactSheet).replaceAll('\\', '/'),
  };
  writeFileSync(join(qaDirectory, 'report.json'), `${JSON.stringify(report, null, 2)}\n`, 'utf8');
  return {report, qaDirectory, contactSheet};
}
