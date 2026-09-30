import React from 'react';
import {AbsoluteFill, Img} from 'remotion';
import {arcPoint, cameraTranslation, clamp, objectPose, sampleKeys} from './motion-math.mjs';

// Camera target interpolation is adapted from remotion-cinematic AutoZoom (MIT).
// See docs/visual-agent-sources.json and docs/licenses/remotion-cinematic.txt.
export function CameraStage({keys = [], frame, children}) {
  const track = (property, fallback) => sampleKeys(keys.map(k => ({at: k.at, value: cameraTranslation(k)[property]})), frame, fallback);
  return <AbsoluteFill style={{transform: `translate(${track('x', 0)}px, ${track('y', 0)}px) scale(${track('scale', 1)})`, transformOrigin: '50% 50%'}}>{children}</AbsoluteFill>;
}

function MemoryGlyph({accent}) {
  return <svg width="116" height="130" viewBox="0 0 116 130"><ellipse cx="58" cy="24" rx="43" ry="16" fill={`${accent}24`} stroke={accent} strokeWidth="3"/>
    <path d="M15 24v70c0 22 86 22 86 0V24M15 60c0 22 86 22 86 0M15 88c0 22 86 22 86 0" fill="none" stroke={accent} strokeWidth="3"/></svg>;
}

export function VisualObject({object, pose, accent}) {
  const {kind, label, detail} = object;
  const lines = object.lines ?? String(detail ?? '').split(/\n|；/u).filter(Boolean);
  const active = pose.highlight;
  const chrome = ['chat', 'code', 'document', 'diagram', 'comment'].includes(kind);
  return <div style={{position: 'absolute', left: pose.x, top: pose.y, width: object.w, height: object.h,
    transform: `translate(-50%, -50%) scale(${pose.scale})`, opacity: clamp(pose.opacity),
    color: '#f5f8fb', overflow: 'hidden', borderRadius: kind === 'memory' ? 38 : 20,
    border: chrome ? `2px solid ${active > .1 ? accent : '#3b5369'}` : 'none',
    background: chrome ? '#0e1d2c' : 'transparent', boxShadow: chrome ? `0 22px 70px #0005, 0 0 ${active * 36}px ${accent}33` : 'none'}}>
    {chrome && <div style={{height: 40, background: '#203043', display: 'flex', alignItems: 'center', gap: 7, padding: '0 18px', fontSize: 17, color: '#b7c8d8'}}>
      {[0, 1, 2].map(i => <span key={i} style={{width: 8, height: 8, borderRadius: 10, background: i === 0 ? accent : '#60758c'}}/>)}<span style={{marginLeft: 10}}>{label}</span></div>}
    {kind === 'image' ? <Img src={object.src} style={{width: '100%', height: '100%', objectFit: 'contain'}}/> : kind === 'memory' ?
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, padding: 18}}><MemoryGlyph accent={accent}/><div style={{fontSize: 27, fontWeight: 750}}>{label}</div>{lines.map((l,i) => <div key={i} style={{color: accent, fontSize: 22}}>{l}</div>)}</div> :
      <div style={{padding: chrome ? '18px 22px' : 12, display: 'flex', flexDirection: 'column', gap: 11}}>
        {!chrome && <div style={{fontSize: kind === 'text' ? 48 : 29, fontWeight: 800, lineHeight: 1.22}}>{label}</div>}
        {lines.map((line, i) => {
          const progress = clamp(pose.reveal * lines.length - i);
          return <div key={`${i}-${line}`} style={{fontFamily: kind === 'code' ? 'Consolas, monospace' : 'inherit', fontSize: kind === 'code' ? 23 : 26,
            lineHeight: 1.35, color: kind === 'code' ? '#c9e3f7' : '#eef4fb', borderRadius: 10,
            padding: kind === 'chat' ? '12px 16px' : '7px 8px', background: kind === 'chat' ? (i % 2 ? '#223951' : `${accent}22`) :
              active > .1 && i === 0 ? `${accent}24` : 'transparent', opacity: progress,
            transform: `translateY(${(1-progress)*12}px)`, whiteSpace: 'pre-wrap', wordBreak: 'break-word'}}>
            {kind === 'code' && <span style={{display: 'inline-block', width: 36, color: '#6e91b0'}}>{i + 1}</span>}{line}</div>;
        })}
      </div>}
    {object.state === 'done' && <div style={{position: 'absolute', right: 13, top: 10, color: accent, fontSize: 24}}>✓</div>}
    {active > 0 && <div style={{position: 'absolute', left: `${active * 100}%`, top: chrome ? 40 : 0, bottom: 0,
      width: 3, background: accent, opacity: active < .98 ? .65 : 0, boxShadow: `0 0 24px 8px ${accent}55`}}/>}
  </div>;
}

export function ChoreographyScene({spec, frame, accent = '#b8f76c'}) {
  const objects = new Map(spec.objects.map(o => [o.id, o]));
  const poses = new Map(spec.objects.map(o => [o.id, objectPose(o, spec.tracks, frame)]));
  return <AbsoluteFill style={{overflow: 'hidden', background: 'radial-gradient(ellipse at 55% 60%, #172c43, #070f1d 70%)'}}>
    <div style={{position: 'absolute', width: 1600, height: 680, left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}}>
      <CameraStage keys={spec.camera} frame={frame}>
        <svg viewBox="0 0 1600 680" style={{position: 'absolute', width: '100%', height: '100%'}}>
          {(spec.connections ?? []).map((c, i) => {
            const a = poses.get(c.from); const b = poses.get(c.to); if (!a || !b) return null;
            const p = clamp((frame - c.start) / Math.max(1, c.end - c.start));
            const visible = frame >= c.start; const bend = c.bend ?? 65;
            const control = {x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 - bend};
            const point = arcPoint(a, b, p, bend * .5);
            return <g key={`${c.from}-${c.to}-${i}`} opacity={visible ? Math.min(a.opacity, b.opacity) : 0}>
              <path d={`M ${a.x} ${a.y} Q ${control.x} ${control.y} ${b.x} ${b.y}`} fill="none" stroke={accent} strokeWidth="3"
                pathLength="1" strokeDasharray="1" strokeDashoffset={1 - p} opacity=".42"/>
              {c.packet && p > 0 && p < 1 && <g transform={`translate(${point.x},${point.y})`}>
                <rect x="-46" y="-18" width="92" height="36" rx="10" fill={accent}/><text textAnchor="middle" y="6" fill="#0c1b22" fontSize="17" fontWeight="700">{c.label || '信息'}</text></g>}
            </g>;
          })}
        </svg>
        {spec.objects.map(o => <VisualObject key={o.id} object={o} pose={poses.get(o.id)} accent={accent}/>)}
        {(spec.overlays ?? []).map((o,i) => {
          const p = clamp((frame - o.start) / Math.max(1, o.end - o.start));
          if(frame < o.start || frame > o.end + 24) return null;
          const target = poses.get(o.target); const def = objects.get(o.target); if(!target || !def) return null;
          return <div key={i} style={{position: 'absolute', left: target.x - def.w / 2 - 8, top: target.y - def.h / 2 - 8,
            width: def.w + 16, height: def.h + 16, border: `3px solid ${accent}`, borderRadius: 24,
            opacity: Math.sin(p * Math.PI) * .8, boxShadow: `0 0 28px ${accent}55`}}/>;
        })}
      </CameraStage>
    </div>
  </AbsoluteFill>;
}
