import React from 'react';
import {interpolate, spring} from 'remotion';

// Adapted from the installed Remotion plugin's frame timing and annotation guidance.
// Explicit frame props keep these effects beat-relative and safe for out-of-order rendering.
export function FrameReveal({frame, fps = 30, start = 0, duration = 18, distance = 28, children, style = {}}) {
  const local = Math.max(0, frame - start);
  const progress = frame < start ? 0 : spring({frame: local, fps, durationInFrames: Math.max(1, duration),
    config: {damping: 200}});
  return <div style={{...style, opacity: progress, translate: `0 ${(1 - progress) * distance}px`,
    scale: 0.96 + 0.04 * progress}}>{children}</div>;
}

export function FrameAnnotation({frame, start = 0, duration = 18, width = 240, height = 80,
  kind = 'highlight', color = '#64e7cf', strokeWidth = 4, style = {}}) {
  const progress = interpolate(frame, [start, start + Math.max(1, duration)], [0, 1],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const inset = strokeWidth + 2;
  const outline = {fill: 'none', stroke: color, strokeWidth, pathLength: 1,
    strokeDasharray: 1, strokeDashoffset: 1 - progress, strokeLinecap: 'round'};
  return <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}
    style={{position: 'absolute', pointerEvents: 'none', overflow: 'visible', ...style}}>
    {kind === 'highlight' ? <rect x={0} y={height * 0.2} width={width * progress} height={height * 0.65} fill={color} opacity={0.28}/> :
      kind === 'circle' ? <ellipse cx={width / 2} cy={height / 2} rx={Math.max(1, width / 2 - inset)} ry={Math.max(1, height / 2 - inset)} {...outline}/> :
      kind === 'underline' ? <path d={`M${inset} ${height - inset} H${width - inset}`} {...outline}/> :
      <rect x={inset} y={inset} width={Math.max(1, width - inset * 2)} height={Math.max(1, height - inset * 2)} rx={12} {...outline}/>}
  </svg>;
}
