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

// Audio drafts contain semantic units, not final visual scenes.
// Preserve narration boundaries; visual cuts remain independent.
export function buildNarrationBlocks(draft, config) {
  if (!Array.isArray(draft?.scenes) || draft.scenes.length === 0) {
    throw new Error('Narration block planning requires semantic units.');
  }
  const settings = config?.narrationBlocks;
  if (settings?.segmentation !== 'semantic') {
    throw new Error('Narration requires semantic segmentation.');
  }
  if (!Number.isInteger(settings.maxRequestCharacters) || settings.maxRequestCharacters < 1 || settings.maxRequestCharacters > 1000) {
    throw new Error('narrationBlocks.maxRequestCharacters must be an integer from 1 to 1000.');
  }
  const ids = new Set();
  return draft.scenes.map((scene, sceneIndex) => {
    const semanticBlockId = clean(scene.semanticBlockId || scene.id || scene.narrationTopic || 'unit-' + sceneIndex);
    if (ids.has(semanticBlockId)) throw new Error('Semantic unit IDs must be unique: ' + semanticBlockId);
    ids.add(semanticBlockId);
    return blockFromSegments(sceneSegments(scene, sceneIndex), {
      id: 'block-' + String(sceneIndex).padStart(3, '0'), semanticBlockId,
    });
  });
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
  const inherited = {semanticBlockId: block.semanticBlockId ?? block.id, splitReason: reason};
  return [
    blockFromSegments(block.segments.slice(0, selected.index), inherited),
    blockFromSegments(block.segments.slice(selected.index), inherited),
  ];
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
    accepted.push({...block, ...generated});
  }

  return {
    blocks: accepted.map((block, index) => ({...block, id: `block-${String(index).padStart(3, '0')}`})),
    stats: {requests, splitCount, timeoutSplitCount},
  };
}
