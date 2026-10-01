# Devices & UI Element Motion

Deterministic Remotion recipes for putting an app on a device and for how individual interface atoms enter, respond, and resolve. Every value is derived from `useCurrentFrame()` — every "pop" is a measured ease-out or a tuned `spring`, never `Math.random()`.

### Rack-Focus Phone Entrance (defocus rise)
**What it looks like:** A single phone materializes low-center of a near-white wash in heavy gaussian blur (~18px) and, over ~8 frames, translates upward ~40px while the virtual lens racks to sharp — blur 18px→0 and the Y-rise are coupled on ONE progress value. A long soft floor shadow forms beneath (opacity 0→0.4 over the same window); an optional faint accent rim wraps the bezel as it sharpens. It settles into a small ambient float loop. The exit mirrors the entrance: scale ~1.04, a slight tilt, Y-rise, blur 0→heavy, ease-in acceleration off the top of frame.
```tsx
// Determinism: blur is computed from frame via interpolate — NEVER animated per-frame at full res.
// Pre-render the blurred phone as a SECOND <Img>/screenshot if perf matters; here we use a static blur swap.
const FloatPhone: React.FC<{src: string}> = ({src}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  // entrance 0..8f
  const p = interpolate(frame, [0, 8], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)});
  const blur = interpolate(p, [0, 1], [18, 0]);          // px
  const y = interpolate(p, [0, 1], [40, 0]);             // rise
  const shadow = interpolate(p, [0, 1], [0, 0.4]);
  // ambient float after settle (deterministic sine on frame)
  const floatY = Math.sin((frame / fps) * Math.PI * 0.8) * 2.5;
  return (
    <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', backgroundColor: '#FAFAF9'}}>
      <div style={{
        transform: `translateY(${y + floatY}px)`,
        filter: `blur(${blur}px)`,                        // single static value per frame, not a stack
        boxShadow: `0 40px 60px rgba(24,24,27,${shadow})`,
        borderRadius: 44,
      }}>
        <PhoneFrame width={300}><Img src={src} /></PhoneFrame>
      </div>
    </AbsoluteFill>
  );
};
```
**Craft:** entrance 8f ease-out (`Easing.out(Easing.cubic)`); blur + Y-rise share one progress value; floor-shadow opacity 0→0.4 in the same window; ambient float ±2.5px, ~0.8Hz. Exit 5–6f ease-in (`Easing.in`), scale→1.04, blur 0→18. Add the accent rim only when the beat wants emphasis; drop it entirely for a flatter, calmer read.
**When to use:** the calm "here is the app" reveal; pairs entrance + exit as one reusable component. Use a real app screenshot on the screen, not a placeholder — this is the highest-trust beat.

### In-Frame Screen Swap / Scroll (content push inside a fixed device)
**What it looks like:** The phone holds a static perspective while the CONTENT inside the screen changes — it holds one screen, then the in-screen content scrolls up over ~10–15 frames to reveal a lower card, or hard-cuts to a different screen roughly every ~15 frames. The device is motionless; only the screen layer translates or swaps, so the eye reads "the app is doing something," not "the camera moved."
```tsx
// Real app footage is the highest-fidelity source: OffthreadVideo of a screen recording, masked to the frame.
const PhoneWithScreenScroll: React.FC = () => {
  const frame = useCurrentFrame();
  // in-app scroll: hold, then push content up
  const scrollY = interpolate(frame, [0, 126, 141, 999], [0, 0, -260, -260], {
    extrapolateRight: 'clamp', easing: Easing.inOut(Easing.cubic),
  });
  return (
    <PhoneFrame width={300}>
      {/* Option A — composite a real screen recording (best trust): */}
      <OffthreadVideo src={staticFile('app-home-capture.mp4')} />
      {/* Option B — a tall static screenshot that scrolls inside the clipped screen: */}
      {/* <div style={{transform:`translateY(${scrollY}px)`}}><Img src={staticFile('app-home-tall.png')} /></div> */}
    </PhoneFrame>
  );
};
```
**Craft:** hold ~42f, scroll 15f `Easing.inOut(Easing.cubic)`, ~260px travel (≈ one card). The device transform stays constant. Hard content cuts every ~15f give a montage feel; a smooth scroll gives a single-feature read. Composite a real screen recording via `OffthreadVideo` for maximum fidelity.
**When to use:** demonstrate a feed / list / multi-screen flow without moving the device. Interchangeable with a synthetic-cursor tap when you want to motivate the scroll.

### Depth-Staggered Device Array (parallax bed / isometric stack)
**What it looks like:** Two related forms. (1) **Fan array** — a hero center phone flanked by 4–5 smaller phones at progressively greater depth / smaller scale; they assemble by drifting in from the sides (each offset ~2–3f, ease-out, ~20f total), then the whole array "breathes" — a slow parallax sine (~3–4s period) where nearer phones translate more than farther ones, plus a unified levitation. (2) **Isometric stack** — three phones share an identical ~12° rotateY tilt, stacked front-to-back and offset up-right into a receding diagonal staircase; front sharp, rear two progressively softer; slow parallax dolly + ambient float; one accent pill is the single saturated color against a muted set.
```tsx
const DEVICES = [ // depth-ordered: scale + depth drive both size and parallax amplitude
  {src:'screen-1.png', x:-260, scale:0.66, depth:0.3, blur:3},
  {src:'screen-2.png', x:0,    scale:1.0,  depth:1.0, blur:0},  // hero
  {src:'screen-3.png', x:260,  scale:0.66, depth:0.3, blur:3},
];
const DeviceArray: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return (
    <AbsoluteFill style={{backgroundColor:'#FAFAF9', justifyContent:'center', alignItems:'center'}}>
      {DEVICES.map((d, i) => {
        // staggered assemble: each phone offset by i*3 frames
        const inP = interpolate(frame, [i*3, i*3+18], [0, 1], {extrapolateLeft:'clamp', extrapolateRight:'clamp', easing: Easing.out(Easing.cubic)});
        const assembleX = interpolate(inP, [0, 1], [d.x * 1.6, d.x]);
        // parallax breathing: amplitude scales with proximity (depth)
        const breathe = Math.sin((frame / fps) * Math.PI * 0.5 + i) * (6 * d.depth);
        return (
          <div key={i} style={{position:'absolute', transform:`translateX(${assembleX}px) translateY(${breathe}px) scale(${d.scale})`,
                               filter:`blur(${d.blur}px)`, opacity:inP, zIndex: Math.round(d.depth*10),
                               boxShadow:'0 24px 40px rgba(24,24,27,0.18)'}}>
            <PhoneFrame width={300}><Img src={staticFile(d.src)} /></PhoneFrame>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
```
**Craft:** assemble ~20f, per-phone stagger ~2–3f, ease-out; parallax sine ~0.25Hz, per-phone amplitude ∝ proximity (`6 * depth`px); far phones use a STATIC pre-blur (`blur:3`), not a live filter. Keep it sparse — **hero + 2**, not 5. One accent (a single CTA pill) against a muted set is the scarce-color discipline that reads premium. The parallax-breathing bed is a strong reusable ambient component.
**When to use:** "one app, many screens" feature montage. Fan vs. isometric-stack are interchangeable; the stack reads tighter and more confident.

### Frame-keyed screen-content swap behind device motion
**What it looks like:** While a phone is rotating edge-on (or at peak motion blur), the on-screen UI hard-cuts from one app screen to another. The swap is a single-frame cut deliberately placed at the narrowest / most-blurred frame, so it's invisible and reads as the phone "showing more of the app." There is no transition on the screen itself; the device motion hides it.
```tsx
const frame = useCurrentFrame();
const SWAP_FRAME = 15; // hand-picked: the turntable edge-on / peak-blur frame
const screenSrc = frame < SWAP_FRAME ? screenA : screenB; // instant source swap, no crossfade
// device rotation is the cover — screen is narrowest here so the cut is masked
const rotY = interpolate(frame, [0, 15, 30], [0, 90, 180]); // edge-on at the swap frame
return (
  <AbsoluteFill style={{ perspective: 1200, justifyContent: 'center', alignItems: 'center' }}>
    <div style={{ transform: `rotateY(${rotY}deg)`, transformStyle: 'preserve-3d' }}>
      <Img src={screenSrc} style={{ /* mapped onto the phone screen plane */ }} />
    </div>
  </AbsoluteFill>
);
```
**Craft:** No transition on the screen layer — a clean `frame < SWAP_FRAME ? A : B` source swap. The ONLY craft is timing the swap to the device's edge-on frame (`rotateY ≈ 90°`) or the lift-out blur peak. Pick the swap frame off the rotation curve, not arbitrarily.
**When to use:** Showing multiple app screens on ONE phone without a clumsy crossfade — turntable spins, lift-outs, fast pans. A cheap, clean way to cycle several screens on one device.

### Staggered grid / list cascade (waterfall populate)
**What it looks like:** Two variants of one mechanism. Grid: a side panel scales in (~12f ease-out), then result thumbnails populate in a row-major staggered cascade — each tile fades + scales ~0.92→1.0 with a small per-tile delay (~3–4f), producing a waterfall fill (~40–50f for the whole grid). Row: a horizontal row of rounded cards cascades left-to-right — each fades + scales 92%→100% + rises ~10px, offset ~3–4f from its neighbor, with a slight settle overshoot (1.0→1.02→1.0).
```tsx
const frame = useCurrentFrame();
const STAGGER = 4, TILE_DUR = 8;   // 30-80ms guidance → ~4f at 30fps; keep total under ~800ms
return (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
    {tiles.map((tile, i) => {
      const local = frame - i * STAGGER;
      const p = interpolate(local, [0, TILE_DUR], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
      const scale = interpolate(p, [0, 1], [0.92, 1]);
      const ty    = interpolate(p, [0, 1], [10, 0]);    // optional row-variant rise
      return (
        <div key={tile.id} style={{ opacity: p, transform: `translateY(${ty}px) scale(${scale})`,
          background: '#fff', borderRadius: 16, boxShadow: '0 6px 18px rgba(0,0,0,0.10)' }}>
          {/* tile content */}
        </div>
      );
    })}
  </div>
);
```
**Craft:** Per-tile delay ~4f (30–80ms band); per-tile fade + scale ~8f `Easing.out(cubic)`; keep the full set under ~800ms so it never drags. A gentle settle overshoot (1.0→1.02→1.0) is optional. Row-major index drives the diagonal-feeling wave.
**When to use:** A feed populating, a library filling in, search results landing. Grid vs single-row are interchangeable — same `frame - i*STAGGER` core.

### 3D card perspective-rise to flat
**What it looks like:** A document / panel enters from lower frame on a slight 3D perspective tilt (top edge further, ~12–18° X-rotation), rising and de-rotating flat to face-on as it scales up slightly and settles (~20f ease-out + a ~4f micro-overshoot). A soft drop shadow grows under it as it "lands"; content fades in ~8f AFTER the card settles.
```tsx
const frame = useCurrentFrame();
const IN_DUR = 20;
const p = interpolate(frame, [0, IN_DUR], [0, 1], { extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
const overshoot = spring({ frame: frame - IN_DUR, fps: 30, config: { damping: 14, mass: 0.5 } }); // ~4f settle
const rotX = interpolate(p, [0, 1], [16, 0]);           // tilt → flat, cap under 18°
const ty   = interpolate(p, [0, 1], [80, 0]);
const scale = interpolate(p, [0, 1], [0.94, 1]) + overshoot * 0.012;
const shadow = interpolate(p, [0, 1], [0, 0.16]);
const contentOpacity = interpolate(frame, [IN_DUR + 8, IN_DUR + 18], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
return (
  <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', perspective: 1000 }}>
    <div style={{ transform: `translateY(${ty}px) rotateX(${rotX}deg) scale(${scale})`,
                  background: '#fff', borderRadius: 20, padding: 28,
                  boxShadow: `0 18px 40px rgba(0,0,0,${shadow})` }}>
      <div style={{ opacity: contentOpacity }}>{/* card content */}</div>
    </div>
  </AbsoluteFill>
);
```
**Craft:** Rise + de-rotate ~20f `Easing.out(cubic)`; tilt capped under 18° (more reads as a gimmick). A tuned `spring` (damping 14) supplies a ~4f micro-overshoot on scale only. Shadow alpha grows 0→0.16 as the card "lands" — pre-blur the shadow, animate its alpha, never the blur radius. Content staggers in 8f after settle.
**When to use:** Introducing any single panel — a content card, a hero surface. The perspective-rise-to-flat with a growing shadow is the premium, restrained way to land a card.

### Modal pop — scale-in from center with backdrop dim
**What it looks like:** A modal scales in from ~0.9→1.0 at center with a brief overshoot (~1.02), opacity 0→1 over the same span, while the backdrop dims slightly; list rows inside stagger-fade in after the shell settles. Shell ~10f ease-out-back; backdrop dim ~8f linear; rows stagger ~5f each.
```tsx
const frame = useCurrentFrame();
const shell = spring({ frame, fps: 30, config: { damping: 12, stiffness: 180, mass: 0.7 } }); // easeOutBack-like, ~1.02 overshoot
const scale = interpolate(shell, [0, 1], [0.9, 1]);
const opacity = interpolate(frame, [0, 8], [0, 1], { extrapolateRight: 'clamp' });
const backdrop = interpolate(frame, [0, 8], [0, 0.35], { extrapolateRight: 'clamp' });
return (
  <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
    <AbsoluteFill style={{ background: `rgba(24,24,27,${backdrop})` }} /> {/* soft dim, not pure black */}
    <div style={{ transform: `scale(${scale})`, opacity, background: '#fff', borderRadius: 24, padding: 28 }}>
      {rows.map((r, i) => {
        const rowOp = interpolate(frame, [10 + i * 5, 18 + i * 5], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
        return <div key={r.id} style={{ opacity: rowOp }}>{r.label}</div>;
      })}
    </div>
  </AbsoluteFill>
);
```
**Craft:** Shell on a `spring` tuned to read as ease-out-back (damping 12) — overshoot stays ≤1.02, not a bounce. Backdrop dims to ~0.35 over 8f. Rows only begin after the shell lands (start f10), staggered 5f each. Add a selection accent on the chosen row and a reduced-motion plain-fade fallback.
**When to use:** Any modal / dialog reveal — picker, confirm, offer sheet.
