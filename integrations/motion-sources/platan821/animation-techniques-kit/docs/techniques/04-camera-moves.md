# Camera Moves (push, pan, dolly, parallax, orbit)

In 2D Remotion a "camera" is fiction: wrap content in an `<AbsoluteFill>` and animate ITS `transform` (scale/translate/rotate) from `useCurrentFrame()` — scaling up "pushes in", translating "pans/trucks", and layering planes at different translate speeds fakes parallax. A *true* 3D camera (real volume, edge-on passes, lighting that crawls across a bezel) only exists via `@remotion/three` (an `<OrthographicCamera>`/`<PerspectiveCamera>` whose position you drive by frame) or a pre-rendered Blender plate played back through `<OffthreadVideo>`. Rule for ALL of these: slow, eased, sub-perceptual — a camera move should be felt, not noticed.

---

### Slow Push-In (Dolly-In) (easy)

**What it looks like:** An upright subject grows uniformly while the framing tilts down a touch; scale ramps ~1.0→1.12 over ~75f (2.5s) with very gentle ease-in-out, ambient micro-float continuing underneath. No cut — one continuous breath toward the subject.

```tsx
// 2D pseudo-camera: scale an AbsoluteFill wrapper. Push-in == grow scale.
import {AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing} from 'remotion';
export const PushIn: React.FC<{children: React.ReactNode}> = ({children}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const scale = interpolate(frame, [0, 2.5 * fps], [1.0, 1.12], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.cubic),
  });
  // optional downward "tilt" as the push lands
  const ty = interpolate(frame, [0, 2.5 * fps], [0, 14], {extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{transform: `translateY(${ty}px) scale(${scale})`, transformOrigin: '50% 45%'}}>
      {children}
    </AbsoluteFill>
  );
};
```

**Craft:** 75f / 2.5s, scale delta only 12% (premium = restrained), `Easing.inOut(cubic)`. Put the float on a *separate* slow sine so the dolly stays clean. `transformOrigin` slightly above center sells the downward tilt. Exit by lifting + rack-blurring to a white wash (~6f) for the handoff.

**When to use:** The single most reusable camera move — "here's the product, lean in."

---

### Pull-Back-then-Push-Into-CTA (Push-Pull Reframe) (medium)

**What it looks like:** The camera pulls back out of a composite to reveal the full editor (~24f, easeInOutCubic), briefly holds, then immediately pushes in toward a corner action pill (~30f, easeInOutCubic), landing on a glassy hero CTA that fills frame on a soft gradient — one continuous cutless scale move, out then in.

```tsx
// Push-pull: scale below 1 to pull back (reveal context), then above 1 to push into the CTA.
import {AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing} from 'remotion';
export const PushPullToCta: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = (s: number) => s * fps;
  // out (1.0->0.8) hold (~6f) then in toward CTA anchor (0.8->1.25)
  const scale = interpolate(frame, [0, t(0.8), t(1.0), t(2.0)], [1.0, 0.8, 0.8, 1.25],
    {extrapolateRight: 'clamp', easing: Easing.inOut(Easing.cubic)});
  // pan the frame toward where the CTA sits (top-right) as we push in
  const tx = interpolate(frame, [t(1.0), t(2.0)], [0, -180], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const ty = interpolate(frame, [t(1.0), t(2.0)], [0, 120], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{transform: `translate(${tx}px, ${ty}px) scale(${scale})`, transformOrigin: '78% 22%'}}>
      {/* editor composite + final CTA pill */}
    </AbsoluteFill>
  );
};
```

**Craft:** out 24f → hold ~6f → in 30f, all `easeInOutCubic`, no cut between (a held push-pull). The push-in's `transformOrigin` lands on the CTA's screen position; translate the frame so the CTA arrives dead-center. Pull-back scale 0.8, push-in scale 1.25. Keep it cutless for a premium, intentional finish.

**When to use:** The strongest way to END a promo — reveal the whole product, then collapse onto the one action.

---

### Edge-On Flip Reveal (true 3D Y-flip) (hard)

**What it looks like:** The phone rotates HARD around its vertical axis until nearly edge-on — at the peak you see ONLY the thin dark side profile (true volume; a flat plane cannot show this), then it continues to reveal the back (camera bump visible) and resolves to a front-facing final lockup. ~12-15f, motion-blurred at the fastest part of the spin; ease-in to peak speed at edge-on, ease-out as it settles.

```tsx
// True 3D fast Y-flip with an eased peak. Uses @remotion/three (drive rotation by frame).
import {useCurrentFrame, useVideoConfig, interpolate, Easing} from 'remotion';
// inside <ThreeCanvas>:
const frame = useCurrentFrame();
const {fps} = useVideoConfig();
const rotY = interpolate(frame, [0, 0.5 * fps], [0, Math.PI * 2], { // full flip in ~15f
  extrapolateRight: 'clamp',
  easing: Easing.bezier(0.5, 0, 0.5, 1), // ease-in to the edge-on peak, ease-out to lockup
});
// <group rotation={[0, rotY, 0]}> ... screen face swaps to final UI as it resolves
```

**Craft:** Full revolution in ~15f, S-curve easing so peak velocity hits at the edge-on frame. Motion blur is automatic on a real 3D render at speed; in `@remotion/three` you can fake it by reducing screen detail mid-spin or accept the crisp frames. Resolve to the final front-facing pose. A 2D `rotateY` CANNOT show the side rim — this is the literal "device in motion must be true 3D" test. Last-resort: a Blender-rendered flip plate via `<OffthreadVideo>` if a rigged `.glb` is unavailable.

**When to use:** A fast reveal that flips from one face/screen to the final lockup — the punchier sibling of a slow turntable.

---

### Ken Burns on Stills (slow zoom-and-pan) (easy)

**What it looks like:** A static still (or UI screenshot) given a slow continuous scale + drift so it never sits dead-still — a 2-3px ambient float, a constant slow drift. The premium "designed resting state": even a hold breathes.

```tsx
// Ken Burns: slow scale + opposing pan on a still. Keep amounts tiny for premium-calm.
import {AbsoluteFill, Img, useCurrentFrame, useVideoConfig, interpolate, Easing} from 'remotion';
export const KenBurns: React.FC<{src: string}> = ({src}) => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const scale = interpolate(frame, [0, durationInFrames], [1.0, 1.08], {easing: Easing.inOut(Easing.quad)});
  const tx = interpolate(frame, [0, durationInFrames], [0, -24], {easing: Easing.inOut(Easing.quad)});
  return (
    <AbsoluteFill>
      <Img src={src} style={{width: '110%', height: '110%', transform: `translateX(${tx}px) scale(${scale})`}} />
    </AbsoluteFill>
  );
};
```

**Craft:** Scale 1.0→1.08, pan ~24px over the WHOLE clip duration — must be barely perceptible. Oversize the image (110%) so the pan never reveals an edge. `Easing.inOut(quad)` keeps both ends soft. The cheapest "liveness-in-ambient-layer" win.

**When to use:** The default resting state for any held still/screenshot — nothing should ever sit perfectly frozen.
