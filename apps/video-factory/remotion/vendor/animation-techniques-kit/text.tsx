import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {COLORS, inter} from './theme';

/**
 * Gradient-filled text — a cheap, high-leverage "premium" cue.
 * (Most template video tools can't do gradient fills on live text; code can.)
 */
export const GradientText: React.FC<{
  gradient: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}> = ({gradient, style, children}) => (
  <span
    style={{
      backgroundImage: gradient,
      WebkitBackgroundClip: 'text',
      backgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      color: 'transparent',
      ...style,
    }}
  >
    {children}
  </span>
);

/** Word-by-word kinetic headline: each word springs up + fades in, staggered. */
export const KineticHeadline: React.FC<{
  text: string;
  startFrame?: number;
  staggerFrames?: number;
  style?: React.CSSProperties;
  /** optional per-word gradient (renders each word with GradientText) */
  gradient?: string;
}> = ({text, startFrame = 0, staggerFrames = 3, style, gradient}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const words = text.split(' ');

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.28em',
        fontFamily: inter,
        color: COLORS.ink,
        ...style,
      }}
    >
      {words.map((word, i) => {
        const wordStart = startFrame + i * staggerFrames;
        const s = spring({
          frame: frame - wordStart,
          fps,
          config: {damping: 18, stiffness: 160, mass: 0.9},
        });
        const y = interpolate(s, [0, 1], [34, 0]);
        const opacity = interpolate(frame - wordStart, [0, 6], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
        return (
          <span
            key={i}
            style={{
              display: 'inline-block',
              transform: `translateY(${y}px)`,
              opacity,
              willChange: 'transform, opacity',
            }}
          >
            {gradient ? <GradientText gradient={gradient}>{word}</GradientText> : word}
          </span>
        );
      })}
    </div>
  );
};

/** Hand-drawn underline/highlighter that draws itself on — an annotation accent. */
export const DrawOnUnderline: React.FC<{
  width: number;
  startFrame?: number;
  durationFrames?: number;
  color?: string;
  strokeWidth?: number;
  style?: React.CSSProperties;
}> = ({
  width,
  startFrame = 0,
  durationFrames = 18,
  color = COLORS.accent,
  strokeWidth = 7,
  style,
}) => {
  const frame = useCurrentFrame();
  const h = 22;
  // a slightly hand-drawn, curved underline
  const d = `M 4 ${h - 7} C ${width * 0.3} ${h - 1}, ${width * 0.62} ${h - 13}, ${width - 4} ${h - 6}`;
  const len = width * 1.15;
  const progress = interpolate(frame, [startFrame, startFrame + durationFrames], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: (t) => 1 - Math.pow(1 - t, 3), // ease-out cubic
  });
  return (
    <svg width={width} height={h} style={{overflow: 'visible', ...style}}>
      <path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={len}
        strokeDashoffset={len * progress}
      />
    </svg>
  );
};

