import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';

const SCENE_TYPES = new Set([
  'title', 'text', 'bullets', 'stat', 'code', 'media', 'hero', 'flow', 'contrast', 'audience', 'outro',
]);
const VISUAL_BEAT_ROLES = new Set(['show', 'prove', 'change']);
const VISUAL_TRUTH_MODES = new Set(['executed-demo', 'repository-media', 'source-derived-animation']);

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
    if (['media', 'hero'].includes(scene.type) && !scene.src) {
      errors.push(`${prefix}.src is required for ${scene.type} scenes.`);
    }
    if (scene.type === 'flow' && (!Array.isArray(scene.steps) || scene.steps.length < 2)) {
      errors.push(`${prefix}.steps must contain at least two flow steps.`);
    }
    if (scene.type === 'contrast' && (!scene.left || !scene.right)) {
      errors.push(`${prefix} requires left and right comparison items.`);
    }
    if (scene.type === 'audience' && (!Array.isArray(scene.items) || scene.items.length < 2)) {
      errors.push(`${prefix}.items must contain at least two audience items.`);
    }
    if (scene.type === 'stat' && (scene.value === undefined || !scene.label)) {
      errors.push(`${prefix} requires value and label.`);
    }
    if (storyboard.meta?.visualBeatContractVersion === 1) {
      if (!Array.isArray(scene.visualBeats) || scene.visualBeats.length === 0) {
        errors.push(`${prefix}.visualBeats must contain at least one beat.`);
      } else {
        let previousBeatEnd = 0;
        scene.visualBeats.forEach((beat, beatIndex) => {
          if (!VISUAL_BEAT_ROLES.has(beat.role) || !VISUAL_TRUTH_MODES.has(beat.truthMode) ||
              !Array.isArray(beat.claimIndexes) || beat.claimIndexes.length === 0 ||
              !Number.isInteger(beat.startFrame) || !Number.isInteger(beat.endFrame) ||
              beat.startFrame < previousBeatEnd || beat.endFrame <= beat.startFrame ||
              beat.endFrame > Math.round(scene.duration * storyboard.meta.fps)) {
            errors.push(`${prefix}.visualBeats[${beatIndex}] has invalid evidence or timing.`);
          }
          previousBeatEnd = beat.endFrame;
        });
      }
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
