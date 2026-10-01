# Emphasis & Accent Hits

Accent hits are the scarcest motion currency — one per beat, landing on the single word or element that carries the meaning. Keep them soft and singular: a radial glow that fades to alpha 0, a single ripple, a marker stroke — never a spray. If two accents fire in one shot, cut one.

### Glow-Bloom Flare + Particle Emit

**What it looks like:** A held element detonates into a two-phase celebration. First a soft radial halo blooms behind it — rising fast, then a long slow decay toward alpha 0. Then a sparse ring of ~10–12 small dots flings outward from its edges, peaking early and falling ballistically under gravity before fading, leaving a calm element with a faint residual glow.

```tsx
const HIT = 71, BLOOM_PEAK = 77, EMIT = 78, END = 92;
const f = useCurrentFrame();
// radial glow: rise then long decay; peak alpha 0.55, fades to 0 (~70% of life), THEN reads as blur
const bloom = f < BLOOM_PEAK
  ? interpolate(f, [HIT, BLOOM_PEAK], [0, 1], { extrapolateLeft: 'clamp', easing: Easing.out(Easing.cubic) })
  : interpolate(f, [BLOOM_PEAK, END], [1, 0], { extrapolateRight: 'clamp', easing: Easing.in(Easing.quad) });
const glowAlpha = 0.55 * bloom; // static blur radius; only alpha animates
// particles: deterministic per-index, no random() — gravity arc
const N = 11;
return <>
  <RadialGlow color="#14B8A6" alpha={glowAlpha} />{/* success-accent halo */}
  {Array.from({ length: N }).map((_, i) => {
    const seed = random(`spark-${i}`);            // deterministic
    const ang = (i / N) * Math.PI * 2 + seed;
    const life = interpolate(f, [EMIT, END], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const dist = interpolate(life, [0, 1], [0, 70 + seed * 30], { easing: Easing.out(Easing.quad) });
    const x = Math.cos(ang) * dist, y = Math.sin(ang) * dist + life * life * 60; // +gravity
    const a = interpolate(life, [0, 0.6, 1], [0, 1, 0]);
    return <Dot key={i} cx={x} cy={y} opacity={a} color={i % 3 === 0 ? '#FDE68A' : '#8B5CF6'} />;
  })}
</>;
```

**Craft:** Two phases, clearly staged (flare first ~6f, *then* emit). Glow peak alpha 0.55, fades to 0 over ~13f (the ~70% fade-then-blur rule); blur radius is constant — only alpha animates. Particles: deterministic `random('spark-i')` for angle/distance, ballistic with `life²·gravity`, fade `[0,0.6,1]→[0,1,0]`. Sparsity: ~11 particles is the ceiling for premium; 30+ reads as cheap confetti.

**When to use:** The level-up / correct-streak / "done!" reward beat. One per celebration, not per repeated action. Interchangeable with a drifting-confetti emitter — pick whichever fits the moment; never run both on the same beat.

### Hand-Drawn Underline Draw-On

**What it looks like:** Once a line of text is fully settled, a hand-drawn underline strokes on beneath one keyword — a short dash appears at the left, extends rightward like a marker drawing (organic, slightly wavy, not a straight rule), then completes full-width and thickens slightly with a casual end flourish. The organic wobble is what sells "hand-drawn marker."

```tsx
const START = 331, END = 357;
const f = useCurrentFrame();
const PATH_LEN = 240;
// trim-path reveal: dashoffset shrinks left→right
const draw = interpolate(f, [START, END], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.ease) });
const width = interpolate(f, [START, END], [3.5, 5], { extrapolateRight: 'clamp' }); // slight thickening at tail
return (
  <Svg>
    <Path d={WAVY_UNDERLINE_PATH}            // pre-baked wavy path, NOT a straight line
      stroke="#6366F1" strokeWidth={width} strokeLinecap="round"
      strokeDasharray={PATH_LEN}
      strokeDashoffset={PATH_LEN * (1 - draw)} />
  </Svg>
);
```

**Craft:** ~26f, left→right, near-linear with an ease-out tail. Use `strokeDasharray`/`strokeDashoffset` (trim-path) on a *pre-baked wavy* path — the wobble is authored into the SVG `d`, not animated per-frame. Slight stroke-width thickening (~3.5→5px) at the tail = the marker "press" flourish. One keyword underlined per beat.

**When to use:** Highlighting a single benefit word/phrase after the text has fully settled (never during type-on). The classic explainer "emphasize THIS word" move. Interchangeable family with a highlighter-sweep wash and a draw-on circle/arrow — pick any one per phrase; never stack two on the same word.
