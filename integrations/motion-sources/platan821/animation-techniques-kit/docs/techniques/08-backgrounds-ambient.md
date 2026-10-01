# Backgrounds & Ambient Beds

The quiet bed of motion under every premium promo — mounted above the cut sequence so it runs continuously and never resets on a beat change. All motion is frame-derived and noise-driven, never `Math.random()`; the whole register is sub-perceptual — you should feel it before you can point at it.

### Drifting Node / Dot Field

**What it looks like:** Behind a headline, ~14–18 small soft-edged circular dots are scattered across the upper two-thirds of a dark field. They drift slowly and independently — ~1–3 px/frame per dot, pure looping ambient with no easing keyframes. Some sink toward the lower edge and one grows larger near "camera" as a fake depth cue. No hard motion — just a gentle liveness bed under the type.

```tsx
import {useCurrentFrame, useVideoConfig, AbsoluteFill} from 'remotion';
import {noise2D} from '@remotion/noise';

const COUNT = 16;
const NODES = new Array(COUNT).fill(0).map((_, i) => ({
  seed: `node-${i}`,
  baseX: noise2D('x', i, 0) * 0.5 + 0.5,   // deterministic 0..1 spawn
  baseY: noise2D('y', i, 0) * 0.5 + 0.5,
  size: 6 + (noise2D('s', i, 0) * 0.5 + 0.5) * 14,
  // two-tone: indigo core, cyan accent
  color: i % 3 === 0 ? '#6366F1' : '#5BC8FF',
}));

export const NodeField: React.FC = () => {
  const frame = useCurrentFrame();
  const {width, height} = useVideoConfig();
  const t = frame * 0.012; // ambient, not busy
  return (
    <AbsoluteFill style={{backgroundColor: '#0E0E12'}}>
      {NODES.map((n, i) => {
        const dx = noise2D(n.seed + 'dx', t, i) * 40;       // slow wander ±40px
        const dy = noise2D(n.seed + 'dy', t, i) * 40;
        const depth = 0.5 + noise2D(n.seed + 'z', t * 0.6, i) * 0.5; // 0..1 scale
        const x = n.baseX * width + dx;
        const y = n.baseY * height + dy;
        return (
          <div key={i} style={{
            position: 'absolute', left: x, top: y,
            width: n.size * depth, height: n.size * depth, borderRadius: '50%',
            background: `radial-gradient(circle, ${n.color} 0%, transparent 70%)`,
            opacity: 0.35 + depth * 0.4,
            filter: 'blur(0.5px)',
          }} />
        );
      })}
    </AbsoluteFill>
  );
};
```

**Craft:** frame multiplier 0.012; per-dot wander ±40px on independent noise seeds (never one shared clock — that bobs in unison); fake-depth scale 0.5–1.0 also from noise; opacity coupled to depth (0.35–0.75) so far dots recede; tiny 0.5px blur softens the AA edge into a glow. Count ~16 DOM dots is well under the ~80 ceiling; go canvas only past that. Let the bed run continuously across cuts — never reset it on a beat change.

**When to use:** A liveness bed under an intro/headline beat; interchangeable with a soft-bokeh bed — a node-field reads as "network/graph," bokeh reads as "soft photographic lights." Use the node-field when the brand IS a graph.

### Idle Float / Levitation Loop

**What it looks like:** During every hold, a hero object never sits perfectly still — it drifts up and down ~2–4px on a slow sine (~2–2.5s period), and its floor shadow scales and softens in counter-phase: the shadow grows and lightens as the object rises, tightens and darkens as it settles. In multi-object arrays each element's phase is offset so the group shimmers rather than bobbing in unison. Purely positional — no color change.

```tsx
import {useCurrentFrame, useVideoConfig, interpolate} from 'remotion';
import {noise2D} from '@remotion/noise';

const Floating: React.FC<{seed: string; children: React.ReactNode}> = ({seed, children}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = (frame / fps);
  // smooth noise instead of a bare sine — organic, never mechanical
  const lift = noise2D(seed, t * 0.5, 0) * 4;            // ±4px
  const shadowScale = interpolate(lift, [-4, 4], [0.92, 1.08]); // grows as it rises
  const shadowAlpha = interpolate(lift, [-4, 4], [0.28, 0.14]); // lightens as it rises
  return (
    <>
      <div style={{
        position: 'absolute', bottom: 40, left: '50%',
        width: 220, height: 28, transform: `translateX(-50%) scaleX(${shadowScale})`,
        borderRadius: '50%', filter: 'blur(18px)',
        background: `rgba(24,24,27,${shadowAlpha})`, // soft shadow
      }} />
      <div style={{transform: `translateY(${-lift}px)`}}>{children}</div>
    </>
  );
};
// arrays: <Floating seed="a" /> <Floating seed="b" /> -> different seeds = offset phase
```

**Craft:** amplitude ±3–4px (sub-perceptual — bigger reads as bouncing); period ~2–2.5s (`t*0.5` on noise ≈ that); shadow counter-animates on the SAME clock (scale 0.92→1.08, alpha 0.28→0.14, big 18px blur); per-element phase = different noise seed, never an added delay. Keep the shadow warm-neutral, never a cool grey.

**When to use:** Every hero hold / end-card dwell — a hold should never be frozen. A floor-level technique to apply to every product still.
