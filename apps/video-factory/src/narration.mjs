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

export function buildNarratedStoryboard(draft, durations, {gapSeconds = 0.24, minSceneSeconds = 0} = {}) {
  const fps = draft.meta?.fps;
  if (!Number.isFinite(fps) || fps <= 0 || !Number.isFinite(gapSeconds) || gapSeconds < 0 ||
      !Number.isFinite(minSceneSeconds) || minSceneSeconds < 0) throw new Error('Invalid timing settings.');
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
    const minimumFrames = Math.ceil(minSceneSeconds * fps);
    if (sceneFrames < minimumFrames) {
      clips.at(-1).frames += minimumFrames - sceneFrames;
      sceneFrames = minimumFrames;
    }
    scene.duration = sceneFrames / fps;
    totalFrames += sceneFrames;
    delete scene.sentences;
  }
  return {storyboard, clips, totalFrames};
}

function speechWeight(value) {
  const text = String(value ?? '');
  const han = (text.match(/[\p{Script=Han}]/gu) ?? []).length;
  const words = (text.match(/[A-Za-z0-9]+(?:[.+-][A-Za-z0-9]+)*/gu) ?? []).length;
  const punctuation = (text.match(/[，。；：！？、,.!?;:]/gu) ?? []).length;
  return Math.max(1, han + words * 2 + punctuation * 0.25);
}

function allocateFrames(totalFrames, segments) {
  if (!Number.isInteger(totalFrames) || totalFrames < segments.length) {
    throw new Error('Narration audio is too short for its subtitle cues.');
  }
  const distributable = totalFrames - segments.length;
  const weights = segments.map((segment) => speechWeight(segment.spoken ?? segment.text));
  const weightTotal = weights.reduce((sum, weight) => sum + weight, 0);
  const exact = weights.map((weight) => distributable * weight / weightTotal);
  const frames = exact.map((value) => 1 + Math.floor(value));
  let remainder = totalFrames - frames.reduce((sum, value) => sum + value, 0);
  const order = exact.map((value, index) => ({index, fraction: value - Math.floor(value)}))
    .sort((left, right) => right.fraction - left.fraction || left.index - right.index);
  for (let index = 0; index < remainder; index += 1) frames[order[index % order.length].index] += 1;
  return frames;
}

function allocateFramesWithSceneMaximum(totalFrames, segments, maxSceneFrames, trailingGapFrames) {
  if (!maxSceneFrames) return allocateFrames(totalFrames, segments);
  const groups = [];
  for (const [segmentIndex, segment] of segments.entries()) {
    let group = groups.at(-1);
    if (!group || group.sceneIndex !== segment.sceneIndex) {
      group = {sceneIndex: segment.sceneIndex, segmentIndexes: [], segments: []};
      groups.push(group);
    }
    group.segmentIndexes.push(segmentIndex);
    group.segments.push(segment);
  }
  const groupSegments = groups.map((group) => ({
    text: group.segments.map((segment) => segment.spoken ?? segment.text).join(''),
  }));
  const allocations = allocateFrames(totalFrames, groupSegments);
  const capacities = groups.map((group, index) => {
    const gap = index === groups.length - 1 ? trailingGapFrames : 0;
    return maxSceneFrames - gap;
  });
  for (const [index, group] of groups.entries()) {
    if (capacities[index] < group.segments.length) {
      throw new Error(`Scene ${group.sceneIndex} cannot fit its narration cues within the configured maximum.`);
    }
  }
  let excess = 0;
  for (let index = 0; index < allocations.length; index += 1) {
    if (allocations[index] > capacities[index]) {
      excess += allocations[index] - capacities[index];
      allocations[index] = capacities[index];
    }
  }
  const redistributionOrder = groupSegments
    .map((segment, index) => ({index, weight: speechWeight(segment.text)}))
    .sort((left, right) => right.weight - left.weight || left.index - right.index);
  while (excess > 0) {
    let distributed = false;
    for (const {index} of redistributionOrder) {
      if (allocations[index] >= capacities[index]) continue;
      allocations[index] += 1;
      excess -= 1;
      distributed = true;
      if (excess === 0) break;
    }
    if (!distributed) throw new Error('Narration block cannot fit within the configured scene maximum.');
  }
  const frames = Array(segments.length).fill(0);
  for (const [groupIndex, group] of groups.entries()) {
    const groupFrames = allocateFrames(allocations[groupIndex], group.segments);
    for (const [localIndex, segmentIndex] of group.segmentIndexes.entries()) {
      frames[segmentIndex] = groupFrames[localIndex];
    }
  }
  return frames;
}

function alignVisualBeats(scene, fps) {
  if (!Array.isArray(scene.visualBeats) || scene.visualBeats.length === 0) return;
  const sceneFrames = Math.max(1, Math.round(scene.duration * fps));
  const captions = scene.captions ?? [];
  const fullText = captions.map((cue) => cue.text).join('');
  let previousStart = -1;
  scene.visualBeats = scene.visualBeats.map((beat, index) => {
    const cue = String(beat.narrationCue ?? '');
    const cueCharacter = cue ? fullText.indexOf(cue) : -1;
    let startFrame = Math.floor(index * sceneFrames / scene.visualBeats.length);
    let alignment = 'distributed';
    if (cueCharacter >= 0 && captions.length) {
      let characterCursor = 0;
      const caption = captions.find((item) => {
        characterCursor += item.text.length;
        return cueCharacter < characterCursor;
      }) ?? captions.at(-1);
      const captionStartCharacter = characterCursor - caption.text.length;
      const fraction = Math.max(0, Math.min(1,
        (cueCharacter - captionStartCharacter) / Math.max(1, caption.text.length)));
      startFrame = caption.startFrame + Math.round((caption.endFrame - caption.startFrame) * fraction) -
        Math.round(Number(beat.leadSeconds ?? 0) * fps);
      alignment = 'cue';
    }
    startFrame = Math.max(previousStart + 1, Math.min(sceneFrames - 1, startFrame));
    previousStart = startFrame;
    return {...beat, startFrame, alignment};
  }).map((beat, index, beats) => ({
    ...beat,
    endFrame: beats[index + 1]?.startFrame ?? sceneFrames,
  }));
}

export function buildNarratedStoryboardFromBlocks(draft, blocks, {
  gapSeconds = 0.24,
  minimumTotalSeconds = 0,
  maxSceneSeconds = 0,
} = {}) {
  const fps = draft.meta?.fps;
  if (!Number.isFinite(fps) || fps <= 0 || !Number.isFinite(gapSeconds) || gapSeconds < 0 ||
      !Number.isFinite(minimumTotalSeconds) || minimumTotalSeconds < 0 ||
      !Number.isFinite(maxSceneSeconds) || maxSceneSeconds < 0) {
    throw new Error('Invalid block timing settings.');
  }
  if (!Array.isArray(blocks) || blocks.length === 0) throw new Error('Narration blocks are required.');
  const storyboard = structuredClone(draft);
  const bounds = storyboard.scenes.map(() => ({start: null, end: null}));
  const blockSpokenFrames = blocks.map((block, index) => {
    if (!Array.isArray(block.segments) || block.segments.length === 0 ||
        !Number.isFinite(block.duration) || block.duration <= 0) {
      throw new Error(`Narration block ${index} is missing segments or measured duration.`);
    }
    return Math.max(block.segments.length, Math.ceil(block.duration * fps));
  });
  const baseGapFrames = Math.ceil(gapSeconds * fps);
  const baseTotalFrames = blockSpokenFrames.reduce((sum, frames) => sum + frames, 0) +
    baseGapFrames * blocks.length;
  let extraFrames = Math.max(0, Math.ceil(minimumTotalSeconds * fps) - baseTotalFrames);
  const gapFrames = blocks.map(() => baseGapFrames);
  for (let index = 0; extraFrames > 0; index = (index + 1) % gapFrames.length) {
    gapFrames[index] += 1;
    extraFrames -= 1;
  }

  const subtitleClips = [];
  const audioClips = [];
  const blockSummaries = [];
  let totalFrames = 0;
  let previousSceneIndex = -1;
  const maxSceneFrames = maxSceneSeconds ? Math.floor(maxSceneSeconds * fps) : 0;
  for (const [blockIndex, block] of blocks.entries()) {
    const spokenFrames = blockSpokenFrames[blockIndex];
    const segmentFrames = allocateFramesWithSceneMaximum(
      spokenFrames, block.segments, maxSceneFrames, gapFrames[blockIndex],
    );
    let blockCursor = 0;
    for (const [segmentIndex, segment] of block.segments.entries()) {
      const sceneIndex = segment.sceneIndex;
      if (!Number.isInteger(sceneIndex) || sceneIndex < 0 || sceneIndex >= storyboard.scenes.length ||
          sceneIndex < previousSceneIndex) {
        throw new Error(`Narration block ${blockIndex} has an invalid scene order.`);
      }
      previousSceneIndex = sceneIndex;
      const startFrame = totalFrames + blockCursor;
      const endFrame = startFrame + segmentFrames[segmentIndex];
      if (bounds[sceneIndex].start === null) bounds[sceneIndex].start = startFrame;
      bounds[sceneIndex].end = endFrame;
      storyboard.scenes[sceneIndex].captions ??= [];
      storyboard.scenes[sceneIndex].captions.push({
        startFrame,
        endFrame,
        text: segment.text,
      });
      subtitleClips.push({
        sceneIndex,
        sentenceIndex: segment.sentenceIndex,
        text: segment.text,
        spoken: segment.spoken ?? segment.text,
        startFrame,
        spokenFrames: segmentFrames[segmentIndex],
      });
      blockCursor += segmentFrames[segmentIndex];
    }
    const frames = spokenFrames + gapFrames[blockIndex];
    const lastSceneIndex = block.segments.at(-1).sceneIndex;
    bounds[lastSceneIndex].end = totalFrames + frames;
    audioClips.push({
      blockIndex,
      id: block.id,
      text: block.text,
      frames,
      spokenFrames,
      startFrame: totalFrames,
    });
    blockSummaries.push({
      id: block.id,
      profile: block.profile,
      sceneIndexes: block.sceneIndexes,
      topics: block.topics,
      startFrame: totalFrames,
      endFrame: totalFrames + spokenFrames,
      duration: Number(block.duration.toFixed(3)),
      timelineDuration: Number((frames / fps).toFixed(3)),
      characters: block.text.length,
      ...(block.splitReason ? {splitReason: block.splitReason} : {}),
      ...(block.mergeReason ? {mergeReason: block.mergeReason} : {}),
    });
    totalFrames += frames;
  }

  let sceneStart = 0;
  for (const [sceneIndex, scene] of storyboard.scenes.entries()) {
    const bound = bounds[sceneIndex];
    if (bound.start === null || bound.end === null) throw new Error(`Scene ${sceneIndex} has no narration timing.`);
    if (bound.start !== sceneStart) throw new Error(`Scene ${sceneIndex} narration is not contiguous.`);
    scene.captions = scene.captions.map((cue) => ({
      startFrame: cue.startFrame - sceneStart,
      endFrame: cue.endFrame - sceneStart,
      text: cue.text,
    }));
    scene.duration = (bound.end - sceneStart) / fps;
    alignVisualBeats(scene, fps);
    sceneStart = bound.end;
    delete scene.sentences;
    delete scene.narrationTopic;
  }
  if (sceneStart !== totalFrames) throw new Error('Narration blocks do not cover the complete timeline.');
  storyboard.meta.narrationAlignment = 'measured-block-weighted-cues';
  storyboard.narrationBlocks = blockSummaries;
  return {storyboard, clips: subtitleClips, audioClips, totalFrames};
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
