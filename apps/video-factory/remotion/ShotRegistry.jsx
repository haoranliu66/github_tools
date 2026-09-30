import React, {createContext, useContext} from 'react';
export const ShotRegistryContext = createContext({});
export function PlannedShot({scene, beat, frame, fps, accent}) {
  const registry = useContext(ShotRegistryContext);
  const implementation = beat?.implementation;
  if (!implementation) return null;
  const Component = registry[implementation.key];
  if (!Component) throw new Error(`Compiled shot is missing: ${implementation.key}`);
  return <Component scene={scene} beat={beat} frame={Math.max(0, frame - (beat.startFrame ?? 0))}
    durationInFrames={Math.max(1, (beat.endFrame ?? Math.round(scene.duration * fps)) - (beat.startFrame ?? 0))}
    fps={fps} accent={accent}/>;
}
