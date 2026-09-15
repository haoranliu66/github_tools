import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';

const SCENE_TYPES = new Set(['title', 'text', 'bullets', 'stat', 'code', 'media', 'outro']);

export function validateStoryboard(storyboard) {
  const errors = [];
  if (!storyboard || typeof storyboard !== 'object') return ['Storyboard must be a JSON object.'];
  if (!storyboard.meta || typeof storyboard.meta !== 'object') errors.push('meta is required.');
  if (!storyboard.meta?.title) errors.push('meta.title is required.');
  if (!Number.isFinite(storyboard.meta?.fps) || storyboard.meta.fps <= 0) errors.push('meta.fps must be positive.');
  if (!Number.isInteger(storyboard.meta?.width) || storyboard.meta.width < 240) errors.push('meta.width must be an integer >= 240.');
  if (!Number.isInteger(storyboard.meta?.height) || storyboard.meta.height < 240) errors.push('meta.height must be an integer >= 240.');
  if (!Array.isArray(storyboard.scenes) || storyboard.scenes.length === 0) {
    errors.push('scenes must contain at least one scene.');
    return errors;
  }

  storyboard.scenes.forEach((scene, index) => {
    const prefix = `scenes[${index}]`;
    if (!SCENE_TYPES.has(scene.type)) errors.push(`${prefix}.type is unsupported: ${scene.type}`);
    if (!Number.isFinite(scene.duration) || scene.duration <= 0) errors.push(`${prefix}.duration must be positive.`);
    if (scene.type === 'media' && !scene.src) errors.push(`${prefix}.src is required for media scenes.`);
    if (scene.type === 'stat' && (scene.value === undefined || !scene.label)) {
      errors.push(`${prefix} requires value and label.`);
    }
    if (scene.captions !== undefined) {
      let previousEnd = 0;
      if (!Array.isArray(scene.captions)) errors.push(`${prefix}.captions must be an array.`);
      else scene.captions.forEach((cue, cueIndex) => {
        if (!Number.isInteger(cue.startFrame) || !Number.isInteger(cue.endFrame)
          || cue.startFrame < previousEnd || cue.endFrame <= cue.startFrame
          || cue.endFrame > Math.round(scene.duration * storyboard.meta?.fps)
          || typeof cue.text !== 'string' || !cue.text.trim()) {
          errors.push(`${prefix}.captions[${cueIndex}] has invalid text or timing.`);
        }
        previousEnd = cue.endFrame;
      });
    }
  });
  return errors;
}

export function loadStoryboard(filePath) {
  const absolutePath = resolve(filePath);
  const storyboard = JSON.parse(readFileSync(absolutePath, 'utf8'));
  const errors = validateStoryboard(storyboard);
  if (errors.length) throw new Error(`Invalid storyboard:\n- ${errors.join('\n- ')}`);
  return {storyboard, absolutePath};
}

export function durationInFrames(storyboard) {
  return storyboard.scenes.reduce(
    (total, scene) => total + Math.max(1, Math.round(scene.duration * storyboard.meta.fps)),
    0,
  );
}
