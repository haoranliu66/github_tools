export const clamp = (n, low = 0, high = 1) => Math.max(low, Math.min(high, n));
export const mix = (a, b, t) => a + (b - a) * t;
export const ease = (t) => { const p = clamp(t); return p * p * (3 - 2 * p); };

// Values are functions of frame alone: out-of-order rendering is reproducible.
export function sampleKeys(keys, frame, fallback = 0) {
  if (!keys?.length) return fallback;
  if (frame <= keys[0].at) return keys[0].value;
  for (let i = 1; i < keys.length; i++) {
    if (frame <= keys[i].at) return mix(keys[i - 1].value, keys[i].value,
      ease((frame - keys[i - 1].at) / (keys[i].at - keys[i - 1].at)));
  }
  return keys.at(-1).value;
}

export function arcPoint(from, to, progress, bend = 70) {
  const t = clamp(progress);
  return {x: mix(from.x, to.x, t), y: mix(from.y, to.y, t) - Math.sin(t * Math.PI) * bend};
}

export function objectPose(object, tracks, frame) {
  const pose = {x: object.x, y: object.y, opacity: 1, scale: 1, reveal: 1, highlight: 0};
  for (const track of tracks ?? []) if (track.target === object.id) {
    pose[track.property] = sampleKeys(track.keys, frame, pose[track.property]);
  }
  return pose;
}

export function cameraTranslation(key) {
  // Accept explicit focus targets as well as small camera translations. Older agent
  // drafts used content centers; do not translate the whole scene by those coordinates.
  const targeted=key.mode==='target'||(key.mode!=='translation'&&(Math.abs(key.x)>100||Math.abs(key.y)>80));
  return targeted ? {x:(800-key.x)*(key.scale-1),y:(340-key.y)*(key.scale-1),scale:key.scale} : key;
}
