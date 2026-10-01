# Scene & Screenshot Transitions

The connective tissue between beats — how one scene hands off to the next. A small vocabulary carries most reels: hard cuts, dips through a solid color, defocus dissolves, match cuts, and one high-craft hero morph. Most are interchangeable — vary the mechanism so a 5+ beat reel never reuses the same handoff twice in a row. These are timing/transform techniques, which is Remotion's strong suit; the one meta-move under all of them is "shape the speed graph so its peak lands on the cut."

---

### Match Cut (easy)

**What it looks like:** One element stays visually locked dead-centre while everything around it hard-cuts to a different state, carried by a subtle zoom (~1.15×) whose speed peaks exactly on the cut — e.g. a button holds while a dull grey grid recolours to a vivid one, in place.

```tsx
<MatchCut
  cutFrame={60}
  zoomPeak={1.18}
  hero={<SaveButton />}          // the anchor — never moves
  before={<GreyGridScene />}
  after={<ColourGridScene />}    // hard-swapped IN PLACE; nothing slides
/>
```

**Craft:** The anchor is rendered on top of a swapped background inside one scaled container — nested transform composition IS the null-parent trick. A match cut is a _clean substitution_: keep before/after at the SAME layout so the swap is an in-place restate, not a flash (the classic mistake — scattered→grid positions differ, so it reads as a jarring double-flash; matched positions fix it). The subtle zoom, speed-peaking on the cut, carries the eye across the seam. Keep the zoom ≤1.2×.

**When to use:** "Your world reorganises around the thing you did" — the anchor stays, the mess becomes order.

---

### Match-Zoom (element → scene) (medium)

**What it looks like:** Push straight into one element until it fills the frame — then it _becomes_ the next scene: e.g. a saved card turns into a glowing node at the centre of a graph scene.

```tsx
<MatchZoom
  cutFrame={50}
  focal={{x: 780, y: 420, w: 360, h: 240}}   // element to zoom into (composition coords)
  outgoing={<ConceptCard />}
  incoming={<GraphScene />}                  // opens at the focal point, settles to rest
/>
```

**Craft:** `transform-origin` sits on the focal centre so the push converges on the element (not the frame centre); the outgoing accelerates to full-frame exactly on the cut, the incoming decelerates from a slight overscale — as if the camera flew _through_ the element and coasted to a stop inside the new scene. Make the incoming's opening focal (the hero node here) match the element you zoomed into, so the two scenes read as one push.

**When to use:** When a saved element should visibly _become_ a node in a graph/scene — the light→dark register flip reads as a genuine graph-register moment.

---

### Mockup Continuity (motion-into-device) (medium)

**What it looks like:** A full-bleed moving UI plays, then the camera pulls back — one continuous scale, speed peaking on the cut — to reveal it was running inside a phone all along. The UI's own motion never breaks across the seam.

```tsx
<MockupContinuity
  cutFrame={60}
  deviceWidth={300}
  ui={(f) => <ScrollingFeed frame={f} />}   // a PURE function of frame → motion can't break
/>
```

**Craft:** There is only ever ONE continuously-scaled `DeviceFrame`; only its scale changes. Because the UI is a pure function of frame, the seam is _guaranteed_ seamless — no two comps cross-dissolved. Remotion is cleaner than a faked-3D compositor here — it's real geometry.

**When to use:** "…and it's live in the app" — hand a moving UI into a real device.

---

### Dip-to-Color (medium)

**What it looks like:** Two related effects: a full-frame brighten to white over ~6f as a section divider (near-linear), and a 1-frame saturated background-color flash synced to a reveal. Both punctuate a beat by pushing the whole frame through a solid color.

```tsx
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';

// Full-frame dip through a solid color at the seam between two scenes.
// Outgoing scene fades UP into the color (first half), incoming fades DOWN out of it (second half).
const DipToColor: React.FC<{dipFrames?: number}> = ({dipFrames = 10}) => {
  const frame = useCurrentFrame();
  const half = dipFrames / 2;
  const cover = frame < half
    ? interpolate(frame, [0, half], [0, 1])          // rise into the color
    : interpolate(frame, [half, dipFrames], [1, 0]); // fall out of the color
  return <AbsoluteFill style={{backgroundColor: '#FAFAF9', opacity: cover}} />;
};
// @remotion/transitions ships this directly:
import {fade} from '@remotion/transitions/fade';
// <TransitionSeries.Transition presentation={fade({ /* through a solid bg layer */ })} ... />
```

**Craft:** Soft dip = 8-10f total (rise ~4-5f, fall ~4-5f), easeInOut. A pure-white flash (~6f near-linear) or a saturated 1-frame hard cut both read harsh — lengthen and de-saturate for a calmer register. Sync the apex to the cut for "snap into being". Use a dark dip color (e.g. `#0E0E12`) when crossing into a dark/graph beat, a light one (e.g. `#FAFAF9`) for identity-act seams.

**When to use:** Dividing acts (dark hero act → light headline act) or crossing between a light scene and a dark graph scene — the single most reusable calm transition.

---

### Defocus Dissolve (rack blur-out → blur-clear-in) (medium)

**What it looks like:** The outgoing scene rack-defocuses to a near-white wash (blur 0→heavy over ~8f) while its content lifts and fades; faint ghosts of the incoming scene bleed in at low opacity for a ~4f cross-dissolve overlap. The reverse — a heavy gaussian blur ramping DOWN to sharp to reveal the incoming content — is the same primitive run forward (a blur-clear "now it's ready" reveal, ~16f ease-out).

```tsx
import {AbsoluteFill, interpolate, Easing, useCurrentFrame, useVideoConfig} from 'remotion';
// Remotion has no blur transition preset. The RIGHT way to defocus is NOT to animate the blur
// RADIUS per-frame (a full-frame Gaussian recomputed every frame is a documented perf trap) —
// render the blurred state ONCE as a STATIC pre-blurred layer and cross-fade its OPACITY against
// the sharp layer.
const DefocusDissolve: React.FC<{children: React.ReactNode; mode: 'out' | 'in'}> = ({children, mode}) => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const t = interpolate(frame, [0, durationInFrames], [0, 1], {
    easing: Easing.out(Easing.cubic), extrapolateRight: 'clamp',
  });
  const blurShown = mode === 'out' ? t : 1 - t; // out: sharp→blurred ; in: blurred→sharp
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{opacity: 1 - blurShown}}>{children}</AbsoluteFill>
      {/* pre-blurred plate — radius is CONSTANT (24px), only opacity animates → cheap + deterministic */}
      <AbsoluteFill style={{filter: 'blur(24px)', opacity: blurShown}}>{children}</AbsoluteFill>
    </AbsoluteFill>
  );
};
// Overlap two of these (~4f) in a TransitionSeries window for the cross-dissolve handoff.
```

**Craft:** Blur-out ~8f ease-in; blur-clear-in ~16f ease-out (the reveal direction is slower — it earns the payoff). Cross-dissolve overlap ~4f where both scenes co-exist faintly. Resolve onto a flat field (e.g. a light greige `#DADAE0`).

**When to use:** Calm hand-off between any two beats; the blur-clear-IN is a premium "now it's ready" reveal (content finishing processing, a scene finishing populating).
