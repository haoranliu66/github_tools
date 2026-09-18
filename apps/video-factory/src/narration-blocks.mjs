function clean(value) {
  return String(value ?? '').replace(/\s+/gu, ' ').trim();
}

function spokenText(segment) {
  return clean(segment?.spoken ?? segment?.text);
}

export function joinNarrationSegments(segments) {
  return segments.reduce((text, segment) => {
    const next = spokenText(segment);
    if (!next) return text;
    if (!text) return next;
    return /[A-Za-z0-9]$/u.test(text) && /^[A-Za-z0-9]/u.test(next)
      ? `${text} ${next}`
      : `${text}${next}`;
  }, '');
}

function uniqueSceneIndexes(segments) {
  return [...new Set(segments.map((segment) => segment.sceneIndex))];
}

function topicsFor(segments) {
  return [...new Set(segments.map((segment) => segment.topic).filter(Boolean))];
}

function blockFromSegments(segments, details = {}) {
  const sceneIndexes = uniqueSceneIndexes(segments);
  const topics = topicsFor(segments);
  return {
    ...details,
    segments,
    text: joinNarrationSegments(segments),
    sceneIndexes,
    sceneCount: sceneIndexes.length,
    topics,
    primaryTopic: topics.length === 1 ? topics[0] : null,
  };
}

function profileFor(draft, config) {
  const settings = config?.narrationBlocks;
  if (!settings || typeof settings !== 'object') throw new Error('narrationBlocks configuration is required.');
  const name = draft?.meta?.narrationProfile ?? settings.defaultProfile;
  const profile = settings.profiles?.[name];
  if (!profile) throw new Error(`Unknown narration profile: ${name}`);
  for (const key of ['minScenes', 'targetScenes', 'maxScenes']) {
    if (!Number.isInteger(profile[key]) || profile[key] < 1) {
      throw new Error(`Narration profile ${name}.${key} must be a positive integer.`);
    }
  }
  if (profile.minScenes > profile.targetScenes || profile.targetScenes > profile.maxScenes ||
      profile.maxScenes > 6) {
    throw new Error(`Narration profile ${name} must satisfy minScenes <= targetScenes <= maxScenes <= 6.`);
  }
  return {name, profile, settings};
}

function sceneSegments(scene, sceneIndex) {
  if (!Array.isArray(scene?.sentences) || scene.sentences.length === 0) {
    throw new Error(`Scene ${sceneIndex} needs narration before block planning.`);
  }
  return scene.sentences.map((sentence, sentenceIndex) => {
    const text = clean(sentence?.text);
    const spoken = spokenText(sentence);
    if (!text || !spoken) throw new Error(`Scene ${sceneIndex} narration ${sentenceIndex} is empty.`);
    return {
      sceneIndex,
      sentenceIndex,
      text,
      ...(sentence.spoken ? {spoken} : {}),
      sentenceEnd: sentence.sentenceEnd === true || /[。！？.!?]$/u.test(text),
      topic: clean(scene.narrationTopic || `scene-${sceneIndex}`),
    };
  });
}

function canCombine(left, right, profile, characterLimit) {
  const merged = blockFromSegments([...left.segments, ...right.segments]);
  return merged.sceneCount <= profile.maxScenes && merged.text.length <= characterLimit;
}

function mergeSparseBlocks(blocks, profile, characterLimit) {
  const result = [...blocks];
  for (let index = result.length - 1; index >= 0; index -= 1) {
    if (result[index].sceneCount >= profile.minScenes || result.length === 1) continue;
    const previous = result[index - 1];
    const next = result[index + 1];
    if (previous && canCombine(previous, result[index], profile, characterLimit)) {
      result.splice(index - 1, 2, blockFromSegments([...previous.segments, ...result[index].segments]));
      index -= 1;
    } else if (next && canCombine(result[index], next, profile, characterLimit)) {
      result.splice(index, 2, blockFromSegments([...result[index].segments, ...next.segments]));
    }
  }
  return result;
}

export function buildNarrationBlocks(draft, config) {
  if (!Array.isArray(draft?.scenes) || draft.scenes.length === 0) {
    throw new Error('Narration block planning requires at least one scene.');
  }
  const {name, profile, settings} = profileFor(draft, config);
  const characterLimit = settings.maxRequestCharacters;
  if (!Number.isInteger(characterLimit) || characterLimit < 1 || characterLimit > 1000) {
    throw new Error('narrationBlocks.maxRequestCharacters must be an integer from 1 to 1000.');
  }

  const scenes = draft.scenes.map((scene, sceneIndex) => ({
    sceneIndex,
    topic: clean(scene.narrationTopic || `scene-${sceneIndex}`),
    segments: sceneSegments(scene, sceneIndex),
  }));
  const blocks = [];
  let current = null;
  for (const scene of scenes) {
    const candidate = current
      ? blockFromSegments([...current.segments, ...scene.segments])
      : blockFromSegments(scene.segments);
    const topicChanged = current && current.segments.at(-1)?.topic !== scene.topic;
    const reachedTarget = topicChanged && current && current.sceneCount >= profile.targetScenes;
    const hardTopicBreak = topicChanged && profile.topicChange === 'hard' &&
      current.sceneCount >= profile.minScenes;
    const exceedsHardLimit = candidate.sceneCount > profile.maxScenes || candidate.text.length > characterLimit;
    if (current && (reachedTarget || hardTopicBreak || exceedsHardLimit)) {
      blocks.push(current);
      current = blockFromSegments(scene.segments);
    } else {
      current = candidate;
    }
  }
  if (current) blocks.push(current);

  const balanced = mergeSparseBlocks(blocks, profile, characterLimit);
  return balanced.map((block, index) => ({
    ...block,
    id: `block-${String(index).padStart(3, '0')}`,
    profile: name,
  }));
}

function splitCandidates(block) {
  const candidates = [];
  let leftCharacters = 0;
  const target = block.text.length / 2;
  for (let index = 0; index < block.segments.length - 1; index += 1) {
    const segment = block.segments[index];
    leftCharacters += spokenText(segment).length;
    if (!segment.sentenceEnd) continue;
    const sceneBoundary = segment.sceneIndex !== block.segments[index + 1].sceneIndex;
    candidates.push({
      index: index + 1,
      sceneBoundary,
      distance: Math.abs(leftCharacters - target),
    });
  }
  return candidates.sort((left, right) =>
    Number(right.sceneBoundary) - Number(left.sceneBoundary) || left.distance - right.distance);
}

export function splitNarrationBlock(block, reason = 'limit') {
  const selected = splitCandidates(block)[0];
  if (!selected) return null;
  const inherited = {profile: block.profile, splitReason: reason};
  return [
    blockFromSegments(block.segments.slice(0, selected.index), inherited),
    blockFromSegments(block.segments.slice(selected.index), inherited),
  ];
}

export function mergeNarrationBlocks(left, right) {
  return blockFromSegments([...left.segments, ...right.segments], {
    profile: left.profile ?? right.profile,
    mergeReason: 'short-same-topic',
  });
}

function isTimeout(error) {
  return error?.name === 'AbortError' || error?.name === 'TimeoutError' ||
    /timed?\s*out|timeout/iu.test(String(error?.message ?? ''));
}

function validSynthesis(result) {
  return result && Buffer.isBuffer(result.wave) && Number.isFinite(result.duration) && result.duration > 0;
}

export async function fitNarrationBlocks(blocks, synthesize, {
  maxCharacters = 1000,
  maxSeconds = 64,
  maxScenes = 6,
  shortBlockSeconds = 8,
} = {}) {
  if (!Array.isArray(blocks) || blocks.length === 0) throw new Error('Narration blocks are required.');
  if (typeof synthesize !== 'function') throw new Error('A narration synthesizer is required.');
  const accepted = [];
  const pending = [...blocks];
  let requests = 0;
  let splitCount = 0;
  let timeoutSplitCount = 0;

  while (pending.length) {
    const block = pending.shift();
    if (block.text.length > maxCharacters) {
      const parts = splitNarrationBlock(block, 'request-character-limit');
      if (!parts) throw new Error(`Narration block exceeds ${maxCharacters} characters without a complete-sentence split point.`);
      pending.unshift(...parts);
      splitCount += 1;
      continue;
    }

    let generated;
    try {
      requests += 1;
      generated = await synthesize(block);
    } catch (error) {
      if (!isTimeout(error)) throw error;
      const parts = splitNarrationBlock(block, 'request-timeout');
      if (!parts) throw new Error(`Narration block timed out without a complete-sentence split point: ${error.message}`);
      pending.unshift(...parts);
      splitCount += 1;
      timeoutSplitCount += 1;
      continue;
    }
    if (!validSynthesis(generated)) throw new Error('Narration synthesizer returned invalid audio metadata.');
    if (generated.duration > maxSeconds) {
      const parts = splitNarrationBlock(block, 'audio-duration-limit');
      if (!parts) {
        throw new Error(`Narration block is ${generated.duration.toFixed(3)}s and exceeds ${maxSeconds}s ` +
          'without a complete-sentence split point.');
      }
      pending.unshift(...parts);
      splitCount += 1;
      continue;
    }
    accepted.push({...block, ...generated});
  }

  let mergeCount = 0;
  for (let index = 0; index < accepted.length - 1;) {
    const left = accepted[index];
    const right = accepted[index + 1];
    const sameTopic = left.primaryTopic && left.primaryTopic === right.primaryTopic;
    const hasShortNeighbor = left.duration < shortBlockSeconds || right.duration < shortBlockSeconds;
    const candidate = mergeNarrationBlocks(left, right);
    const eligible = sameTopic && hasShortNeighbor && candidate.sceneCount <= maxScenes &&
      candidate.text.length <= maxCharacters;
    if (!eligible) {
      index += 1;
      continue;
    }
    try {
      requests += 1;
      const generated = await synthesize(candidate);
      if (validSynthesis(generated) && generated.duration <= maxSeconds) {
        accepted.splice(index, 2, {...candidate, ...generated});
        mergeCount += 1;
        if (index > 0) index -= 1;
        continue;
      }
    } catch {
      // Merging is an optimization. Keep both already valid blocks if it fails.
    }
    index += 1;
  }

  return {
    blocks: accepted.map((block, index) => ({...block, id: `block-${String(index).padStart(3, '0')}`})),
    stats: {requests, splitCount, timeoutSplitCount, mergeCount},
  };
}
