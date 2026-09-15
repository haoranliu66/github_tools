import {spawnSync} from 'node:child_process';
import {basename, dirname, resolve} from 'node:path';

export function concatPcmWav(ffmpegPath, listPath, outputPath) {
  const list = resolve(listPath);
  const result = spawnSync(ffmpegPath, ['-y', '-hide_banner', '-loglevel', 'error', '-f', 'concat',
    '-safe', '1', '-i', basename(list), '-c:a', 'pcm_s16le', resolve(outputPath)],
  {cwd: dirname(list), encoding: 'utf8'});
  if (result.error || result.status !== 0) throw new Error(`Audio concatenation failed: ${result.error?.message ?? result.stderr}`);
}

export function wavDuration(buffer) {
  if (buffer.length < 44 || buffer.toString('ascii', 0, 4) !== 'RIFF' || buffer.toString('ascii', 8, 12) !== 'WAVE') {
    throw new Error('Expected a PCM RIFF/WAVE file.');
  }
  let byteRate = 0;
  let dataBytes = 0;
  for (let offset = 12; offset + 8 <= buffer.length;) {
    const id = buffer.toString('ascii', offset, offset + 4);
    const size = buffer.readUInt32LE(offset + 4);
    if (offset + 8 + size > buffer.length) throw new Error('Truncated WAV chunk.');
    if (id === 'fmt ') {
      if (size < 16 || buffer.readUInt16LE(offset + 8) !== 1) throw new Error('Expected PCM audio.');
      byteRate = buffer.readUInt32LE(offset + 16);
    }
    if (id === 'data') dataBytes += size;
    offset += 8 + size + (size % 2);
  }
  if (!byteRate || !dataBytes) throw new Error('WAV contains no PCM samples.');
  return dataBytes / byteRate;
}

export function buildNarratedStoryboard(draft, durations, {gapSeconds = 0.24} = {}) {
  const fps = draft.meta?.fps;
  if (!Number.isFinite(fps) || fps <= 0 || !Number.isFinite(gapSeconds) || gapSeconds < 0) throw new Error('Invalid timing settings.');
  const count = draft.scenes.reduce((n, scene) => n + (scene.sentences?.length ?? 0), 0);
  if (count !== durations.length || durations.some(d => !Number.isFinite(d) || d <= 0)) throw new Error('Missing or invalid narration durations.');
  const storyboard = structuredClone(draft);
  const clips = [];
  let totalFrames = 0;
  for (const [sceneIndex, scene] of storyboard.scenes.entries()) {
    if (!scene.sentences?.length) throw new Error(`Scene ${sceneIndex} needs narration.`);
    let sceneFrames = 0;
    scene.captions = scene.sentences.map((sentence, sentenceIndex) => {
      if (typeof sentence.text !== 'string' || !sentence.text.trim()) throw new Error('Caption text is empty.');
      const seconds = durations[clips.length];
      const spokenFrames = Math.ceil(seconds * fps);
      const frames = Math.ceil((seconds + gapSeconds) * fps);
      const cue = {startFrame: sceneFrames, endFrame: sceneFrames + spokenFrames, text: sentence.text};
      clips.push({sceneIndex, sentenceIndex, text: sentence.text, frames, spokenFrames, startFrame: totalFrames + sceneFrames});
      sceneFrames += frames;
      return cue;
    });
    scene.duration = sceneFrames / fps;
    totalFrames += sceneFrames;
    delete scene.sentences;
  }
  return {storyboard, clips, totalFrames};
}

export function toSrt(clips, fps) {
  const stamp = (frame) => {
    let ms = Math.round(frame * 1000 / fps);
    const hours = Math.floor(ms / 3600000); ms %= 3600000;
    const minutes = Math.floor(ms / 60000); ms %= 60000;
    const seconds = Math.floor(ms / 1000); ms %= 1000;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')},${String(ms).padStart(3, '0')}`;
  };
  return clips.map((c, i) => `${i + 1}\n${stamp(c.startFrame)} --> ${stamp(c.startFrame + c.spokenFrames)}\n${c.text}\n`).join('\n');
}
