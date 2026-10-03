// Technical request fragments retain one semantic identity and one visual range.
export function semanticBlockWindows(blocks, totalFrames) {
  const windows = [];
  for (const [index, block] of blocks.entries()) {
    const id = block.semanticBlockId;
    if (!id) throw new Error('Semantic narration identity is missing; regenerate narration from the current plan.');
    const startFrame = block.startFrame;
    const endFrame = block.timelineEndFrame ?? blocks[index + 1]?.startFrame ?? totalFrames;
    if (!Number.isInteger(startFrame) || !Number.isInteger(endFrame) || endFrame <= startFrame ||
        startFrame !== (windows.at(-1)?.endFrame ?? 0) || endFrame > totalFrames) {
      throw new Error('Semantic narration ranges must cover measured audio contiguously.');
    }
    if (windows.at(-1)?.id === id) windows.at(-1).endFrame = endFrame;
    else {
      if (windows.some(window => window.id === id)) throw new Error('Semantic narration fragments must remain adjacent.');
      windows.push({id, startFrame, endFrame});
    }
  }
  if (windows.length && windows.at(-1).endFrame !== totalFrames) throw new Error('Semantic narration does not cover the complete audio.');
  return windows;
}

export function validateSemanticScenes(scenes, windows) {
  for (const window of windows) {
    const matching = scenes.filter(scene => scene.startFrame < window.endFrame && scene.endFrame > window.startFrame);
    let cursor = window.startFrame;
    for (const scene of matching) {
      if (scene.startFrame > cursor) throw new Error('Visual coverage has a gap in semantic narration block ' + window.id + '.');
      cursor = Math.max(cursor, Math.min(scene.endFrame, window.endFrame));
    }
    if (cursor !== window.endFrame) throw new Error('Visual coverage is incomplete for semantic narration block ' + window.id + '.');
  }
}
