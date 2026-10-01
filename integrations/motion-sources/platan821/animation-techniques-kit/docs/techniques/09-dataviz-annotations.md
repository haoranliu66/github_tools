# Data-Viz & Annotations

Numbers, curves, and meters that animate meaning into existence — a line draws itself, a counter rolls to a round number, an arc sweeps. All of it is single-source-of-truth deterministic: every pixel keyed off `useCurrentFrame()` and a measured path length, never a timer or `Math.random()`.

### Odometer / Count-Up Number Ticker

**What it looks like:** A stat value increments rapidly from 0 and decelerates hard into the final figure so it *lands* rather than stops — fast, near-linear in the early digits, strong ease-out in the last ~15f. Milestone specks can pop as it climbs; a reset back to 0 is a hard 1-frame cut. A synced variant ties the same count to a fill bar so both decelerate onto the round value together.

```tsx
import {useCurrentFrame, interpolate, Easing} from 'remotion';

export const CountUp: React.FC<{target: number; start?: number; dur?: number}> =
({target, start = 0, dur = 68}) => {
  const frame = useCurrentFrame();
  const raw = interpolate(frame, [start, start + dur], [0, target], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic), // fast early, ease-out land
  });
  const value = Math.round(raw); // round so it snaps to the integer, not 99.6
  return (
    <span style={{
      fontVariantNumeric: 'tabular-nums', // fixed-width digits = no horizontal jitter
      fontWeight: 700, color: '#18181B',
    }}>{value.toLocaleString()}</span>
  );
};
```

**Craft:** ~68f for a 4-digit climb, ~50–60f for a 2–3 digit one. `Easing.out(Easing.cubic)` is the canonical "land" curve — covers most of the distance early, crawls the last 5%. `Math.round()` the interpolated value (never display the raw float). `tabular-nums` / `fontVariantNumeric` so digit-width changes don't shift the layout. For a true rolling **odometer** look (digits sliding vertically rather than re-rendering), stack each digit column in its own clipped `<div>` and translate by `-digit * digitHeight`; for stat moments the plain count-up reads identically and is cheaper.

**When to use:** Any milestone stat — revenue, followers, ARR, streaks, items completed. The pro term is **odometer** (the rolling-digit variant) / **number ticker** / **animated counter** (the re-rendered-value variant) — interchangeable. Keep numbers in a sans typeface; the ease-out-to-a-round-number land is the satisfying micro-moment.

### Draw-On Line / Growth Curve

**What it looks like:** A path renders itself from one endpoint, the leading edge advancing at roughly constant arc-length per frame — a stroke starts bottom-left, climbs as a gentle S-curve (small dip, then a strong up-and-to-the-right ramp), and reaches the top-right over ~58f (~1.9s). The rising motion *is* the message; a static headline sits over the animating curve.

```tsx
import {useCurrentFrame, interpolate, Easing} from 'remotion';
import {useRef, useState, useEffect} from 'react';

const D = 'M40,360 C160,330 240,360 320,300 S520,120 760,40'; // growth curve
export const GrowthCurve: React.FC = () => {
  const frame = useCurrentFrame();
  const ref = useRef<SVGPathElement>(null);
  const [len, setLen] = useState(0);
  useEffect(() => { if (ref.current) setLen(ref.current.getTotalLength()); }, []);
  // measure once; animate the dash window LEN -> 0 (draw-on)
  const start = 0, dur = 58; // ~58f (~1.9s) draw-on window
  const p = interpolate(frame, [start, start + dur], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.bezier(0.33, 0, 0.2, 1), // slight ease through the steep section
  });
  return (
    <svg viewBox="0 0 800 400" width="100%">
      <path ref={ref} d={D} fill="none" stroke="#14B8A6" strokeWidth={5}
        strokeLinecap="round" strokeLinejoin="round"
        strokeDasharray={len} strokeDashoffset={len * (1 - p)} />
    </svg>
  );
};
```

**Craft:** ~58f draw-on. `strokeDasharray = totalLength`, animate `strokeDashoffset` from `LEN → 0`. Measure `getTotalLength()` once in a layout effect, gate render on `len > 0` so frame 0 isn't blank-then-pop. ~5px stroke, `strokeLinecap="round"` so the leading edge reads as a glowing head, not a blunt cut. Easing is gentle (bezier, not pure linear) — most of the curve draws at steady arc-length, easing through the steep ramp so the climb feels *earned*.

**When to use:** Growth/benefit headlines, "up and to the right" stories, any single-metric trend. The pro term is **trim path** (After Effects) / **write-on** / **line-draw** — all interchangeable names for the SVG `strokeDashoffset` reveal; "path reveal" and "self-drawing line" are the same thing. Pairs with a decaying curve behind it — one ease-out climb against one exponential decay tells a whole retention story in a single beat.
