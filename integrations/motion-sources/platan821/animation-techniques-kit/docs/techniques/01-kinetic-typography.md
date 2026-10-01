# Kinetic Typography & Text Reveals

Recipes where the type itself carries the motion — words assembling, swapping, sweeping, and resolving on screen. Every recipe is deterministic (all motion driven by `useCurrentFrame()`, no `Math.random()`).

### Sequential Word Build — Ghost-Ahead Pre-Flash — medium
**What it looks like:** A phrase assembles one word at a time, but each incoming word appears first as a faint grey "ghost" a beat AHEAD of where it lands, then the *prior* word snaps to solid white exactly as the next ghost arrives. Cadence is ~6f per word (one word every ~0.2s); each word also nudges up ~6–10px as it solidifies, ease-out. The grey-ahead pre-flash is the signature — it gives forward momentum, as if the sentence is being thought a word ahead of being said.
```tsx
// Deterministic ghost-ahead word build. One driver: frame. No randomness.
const WORDS = ['Ship', 'your', 'idea', 'in', 'a', 'single', 'weekend'];
const PER_WORD = 6;        // frames between word commits
const RISE = 8;            // px upward settle
const GhostAheadBuild: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ background: '#0a0a0a', justifyContent: 'center', padding: 80 }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0 14px' }}>
        {WORDS.map((w, i) => {
          const ghostAt = i * PER_WORD;          // grey ghost appears
          const commitAt = ghostAt + PER_WORD;   // snaps solid as next word ghosts in
          // opacity: 0 -> 0.35 (ghost) -> 1 (solid)
          const opacity = interpolate(frame, [ghostAt, ghostAt + 2, commitAt], [0, 0.35, 1], {
            extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
          });
          const isSolid = frame >= commitAt;
          const ty = interpolate(frame, [commitAt - 3, commitAt], [RISE, 0], {
            extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic),
          });
          return (
            <span key={i} style={{
              fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 64,
              color: isSolid ? '#FFFFFF' : '#888888',
              opacity, transform: `translateY(${ty}px)`,
            }}>{w}</span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
```
**Craft:** ~6f cadence; ghost opacity 0.35, commit at 1.0; mid-grey `#888` ghost → white `#FFFFFF` solid; ~8px ease-out rise on commit; no bounce, no overshoot. The pre-flash overlap (next ghost visible while the prior word is still settling) is what reads as momentum — never gap the words to fully-resolved-before-next.
**When to use:** Premium narration/manifesto copy where the product "speaks" a sentence — the most editorial of the word-builds, reads quietest.

### Sequential Word/Line Stagger — Cascade Build — easy
**What it looks like:** A sentence assembles word-by-word (or line-by-line), each successive word simply fading + rising into place from a slightly offset position while prior words remain (each word enters ~6–10f apart, fade+rise ~6–8f ease-out). A stacked headline variant builds top-lines-first in a quick *downward* line stagger, each chunk ~3f fade+rise, 1–2f offset between lines, then a long ~3.6s static dwell. No ghost pre-flash — the plainer, more legible cousin of the ghost-ahead build.
```tsx
// Plain cascade stagger (word OR line). Deterministic.
const TOKENS = ['Build', 'faster', 'every', 'day']; // or whole lines
const STAGGER = 8;  // frames between tokens
const DUR = 7;      // per-token fade+rise duration
const CascadeBuild: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: '#0E0E12', justifyContent: 'center', padding: 80 }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0 16px' }}>
        {TOKENS.map((t, i) => {
          const start = i * STAGGER;
          const p = interpolate(frame, [start, start + DUR], [0, 1], {
            extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic),
          });
          return (
            <span key={i} style={{
              fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 60, color: '#FAFAF9',
              opacity: p, transform: `translateY(${(1 - p) * 14}px)`,
            }}>{t}</span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
```
**Craft:** word variant ~8–10f stagger, ~6–8f per-token fade+rise; line variant tighter (~3f per chunk, 1–2f line offset); all ease-out; ~14px rise. Final line typically holds ~30f+ (a deliberate breathing pause). Mixed weight/size across tokens carries hierarchy.
**When to use:** Value-prop and headline copy — the safest, most legible kinetic-type device (line-stagger for stacked editorial headlines, word-stagger for single flowing lines).

### Word-by-Word Tagline Fade-Up — easy
**What it looks like:** A short tagline resolves word-by-word with NO slide and NO ghost — pure opacity 0→1 with only a tiny rise, each word ~5–8f apart, then a calm centered hold (~10f). A single word can also resolve inside a pill as a pure opacity+sharpen ramp with no slide. The most restrained reveal — focus/opacity only.
```tsx
const TaglineFadeUp: React.FC<{words: string[]}> = ({ words }) => {
  const frame = useCurrentFrame();
  const STAGGER = 5, DUR = 6;
  return (
    <AbsoluteFill style={{ background: '#FAFAF9', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ display: 'flex', gap: 12 }}>
        {words.map((w, i) => {
          const start = i * STAGGER;
          const o = interpolate(frame, [start, start + DUR], [0, 1], {
            extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.quad),
          });
          return (
            <span key={i} style={{
              fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 44, color: '#18181B',
              opacity: o, transform: `translateY(${(1 - o) * 4}px)`,
            }}>{w}</span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
```
**Craft:** ~6f per-word fade, ~5f stagger, ~4px rise (barely any), ease-out; hold ~10f. The discipline IS the restraint — no slide, no color shift, no overshoot.
**When to use:** Quiet setup taglines and supporting lines; pairs ahead of a louder reveal/lockup.

### Motion-Blur Smear Word-Swap — hard
**What it looks like:** Each word holds crisp ~12–15f, then over ~5–8f accelerates sideways and dissolves into a horizontal directional smear (blur length grows ~40–80px as it exits); the next word arrives already blurred from the opposite side and decelerates to crisp. Opacity dips to ~30% at the smear midpoint then returns to 100%, ~30f per swap cycle (15f hold + 8f out + 7f in). A metronomic centered variant cycles a phrase with an overlapping motion-blur cross-dissolve. Ease-IN on exit (accelerate into smear), ease-OUT on entry (decelerate to rest).
```tsx
// Smear via PRE-BLURRED ghost copies (never animate blur radius per-frame).
// Two stacked layers per word: crisp (opacity) + a pre-blurred smear copy (opacity+offset).
const WORDS = ['Notes', 'Docs', 'Links', 'Ideas', 'Everything'];
const CYCLE = 30, HOLD = 15;
const SmearSwap: React.FC = () => {
  const frame = useCurrentFrame();
  const i = Math.min(Math.floor(frame / CYCLE), WORDS.length - 1);
  const local = frame - i * CYCLE;
  // crisp word: in (decel) -> hold -> out (accel)
  const crispOpacity = interpolate(local, [0, 4, HOLD, HOLD + 8], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  // smear ghost: visible only during the blur transitions, offset horizontally
  const smearOpacity = interpolate(local, [0, 4, HOLD, HOLD + 6, CYCLE], [0.5, 0, 0, 0.45, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const smearX = interpolate(local, [0, 4], [-70, 0], { extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
  const Word = ({ blur, x, o }: {blur: number; x: number; o: number}) => (
    <span style={{
      position: 'absolute', fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 88,
      color: '#18181B', filter: `blur(${blur}px)`, transform: `translateX(${x}px)`, opacity: o,
    }}>{WORDS[i]}</span>
  );
  return (
    <AbsoluteFill style={{ background: '#FAFAF9', justifyContent: 'center', alignItems: 'center' }}>
      <Word blur={0} x={0} o={crispOpacity} />
      <Word blur={12} x={smearX} o={smearOpacity} />
    </AbsoluteFill>
  );
};
```
**Craft:** ~30f/cycle (15f hold, 8f out, 7f in); blur copy pre-rendered at a fixed radius (~12px) — animate its OPACITY + X offset, never the radius. Opacity floor ~30% at smear midpoint. Ease-in exit / ease-out entry; the blur sells the speed so no overshoot needed. Keep the blur soft and the cadence ~1s/word for a calm register; limit to ONE opening hook beat (do not stack many).
**When to use:** Energetic hook openers and rapid word-cycling lists (e.g. "what you can save: articles · videos · notes").

### Scale-Emphasis Hero-Word Build — medium
**What it looks like:** A line builds in stages where a GIANT gradient hero word carries the emphasis via a scale jump: small/white secondary words assemble first, then a hero word fills the full screen width as a gradient, then optionally a final word punches in large with faint motion-blur ghost trails behind it. The small-line-to-giant-word scale contrast is the whole emphasis.
```tsx
const HeroWordBuild: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const small = interpolate(frame, [0, 12], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
  const heroScale = spring({ frame: frame - 14, fps, from: 0.7, to: 1, config: { damping: 16, stiffness: 110 } });
  const heroO = interpolate(frame, [14, 22], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  return (
    <AbsoluteFill style={{ background: '#0E0E12', justifyContent: 'center', alignItems: 'center', gap: 8 }}>
      <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 36, color: '#FAFAF9', opacity: small }}>Build your product in a</span>
      <span style={{
        fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: 140, lineHeight: 1,
        backgroundImage: 'linear-gradient(90deg, #6366F1, #8B5CF6)', WebkitBackgroundClip: 'text', backgroundClip: 'text',
        color: 'transparent', opacity: heroO, transform: `scale(${heroScale})`,
      }}>remarkable</span>
    </AbsoluteFill>
  );
};
```
**Craft:** secondary line ~30f staggered build; hero word scale-in ~15f (spring from ~0.7, damping ~16, slight ease-out); optional final punch-word ~10f with ghost trails (pre-blurred copies decaying ~5f). The scale jump (≈4× size between small line and hero word) does the work.
**When to use:** Closing payoff cards ("…in a *remarkable* way") — a strong end-card pattern.

### Per-Letter Wordmark Resolve — medium
**What it looks like:** A wordmark types/builds in letter-by-letter, each glyph arriving in its final color and position, sequentially left-to-right, resolving a logo lockup (~3–4f per letter, ~22f full build; each letter lands in final color — no separate color crossfade). The CTA lockup build is the same family — words fade in then a pill scales in beside them (word build ~6f/group, then a grey→white opacity+scale settle on the pill).
```tsx
const LetterResolve: React.FC<{word: string}> = ({ word }) => {
  const frame = useCurrentFrame();
  const PER = 3;
  return (
    <AbsoluteFill style={{ background: '#FAFAF9', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
      {word.split('').map((ch, i) => {
        const start = i * PER;
        const o = interpolate(frame, [start, start + 3], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
        const ty = interpolate(frame, [start, start + 3], [10, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
        return (
          <span key={i} style={{
            fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: 96, color: '#6366F1',
            opacity: o, transform: `translateY(${ty}px)`,
          }}>{ch}</span>
        );
      })}
    </AbsoluteFill>
  );
};
```
**Craft:** ~3–4f per letter, sequential L→R, each lands in final color/position (no color crossfade); full build ~22f; final hold. For a CTA pill: word build ~6f/group, then pill grey→white opacity + slight-scale settle ~5f ease-out. Keep it monochrome, or build a single accent on ONE letter only — a per-letter multicolor build reads busy.
**When to use:** Final wordmark/logo resolve and CTA lockups.
