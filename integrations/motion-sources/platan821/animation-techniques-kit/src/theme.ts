// ---------------------------------------------------------------------------
// PLACEHOLDER brand tokens. Swap these for your own palette + fonts.
// The whole point of this kit: the MOTION is reusable, the LOOK is yours.
// ---------------------------------------------------------------------------
import {loadFont as loadInter} from '@remotion/google-fonts/Inter';
import {loadFont as loadLora} from '@remotion/google-fonts/Lora';

// A simple dual-register default: sans for product/UI voice, serif for long-read.
export const inter = loadInter().fontFamily;
export const lora = loadLora().fontFamily;

// Replace with your brand palette. Keep it small — one accent goes a long way.
export const COLORS = {
  bgLight: '#FAFAF9', // light background (avoid pure #FFFFFF — reads flat/cheap)
  bgDark: '#0E0E12', // dark background
  ink: '#18181B', // primary text
  accent: '#6366F1', // your ONE accent, used sparingly
  accent2: '#8B5CF6', // gradient partner for the accent
  white: '#FFFFFF',
} as const;

export const GRADIENTS = {
  // Gradient-filled TEXT is one of the highest-leverage "premium" cues you get.
  accent: `linear-gradient(120deg, ${COLORS.accent} 0%, ${COLORS.accent2} 100%)`,
  inkHero: `linear-gradient(120deg, ${COLORS.ink} 0%, #52525B 100%)`,
} as const;

// One motion physics for the whole video: asymmetric — fast attack, slow settle.
// Reuse these three everywhere instead of hand-tuning springs per element.
export const SPRINGS = {
  settle: {damping: 200, stiffness: 110, mass: 0.7}, // arrives, no overshoot
  pop: {damping: 14, stiffness: 170, mass: 0.9}, // one overshoot (hero arrivals)
  gentle: {damping: 200, stiffness: 60, mass: 1}, // slow (camera / ambient)
} as const;

// Cubic-bezier easings for interpolate().
export const BEZIER = {
  settle: [0.16, 1, 0.3, 1] as const, // ease-out-expo-ish (fast attack / slow settle)
  camera: [0.6, 0.02, 0.3, 1] as const, // ease-in-out for camera moves
};

export const FPS = 30;
export const W = 1920;
export const H = 1080;
