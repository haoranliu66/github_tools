import React from 'react';
import {interpolate, spring} from 'remotion';

const clamp = (value) => Math.max(0, Math.min(1, value));
const mix = (from, to, amount) => from + (to - from) * amount;

function Glyph({kind, accent, active, scanProgress}) {
  const stroke = active ? accent : '#bfd1dc';
  const common = {fill: 'none', stroke, strokeWidth: 5, strokeLinecap: 'round', strokeLinejoin: 'round'};
  if (kind === 'file' || kind === 'code') return <svg width="108" height="118" viewBox="0 0 108 118">
    <path d="M18 7h49l23 23v79H18z" {...common} />
    <path d="M67 7v23h23" {...common} />
    <path d="M32 52h40M32 67h34M32 82h26" {...common} strokeWidth="4" />
    {kind === 'code' && <rect x="30" y="47" width="51" height="25" rx="5" fill={accent}
      opacity={0.12 + 0.55 * scanProgress} />}
  </svg>;
  if (kind === 'folder') return <svg width="128" height="108" viewBox="0 0 128 108">
    <path d="M8 22h43l12 13h57v64H8z" {...common} />
    <path d="M8 41h112" {...common} />
  </svg>;
  if (kind === 'window') return <svg width="192" height="120" viewBox="0 0 192 120">
    <rect x="7" y="8" width="178" height="104" rx="12" {...common} />
    <path d="M7 34h178M28 21h2M46 21h2M64 21h2" {...common} />
    <path d="M27 56h55M27 73h83M27 90h61" {...common} strokeWidth="4" />
    <rect x="127" y="51" width="39" height="42" rx="5" fill={accent} opacity="0.26" />
  </svg>;
  if (kind === 'review') return <svg width="122" height="122" viewBox="0 0 122 122">
    <circle cx="61" cy="61" r="48" {...common} />
    <path d="M40 62l14 14 29-31" {...common} />
    <circle cx="61" cy="61" r="57" fill={accent} opacity={active ? 0.1 : 0.03} />
  </svg>;
  if (kind === 'search') return <svg width="122" height="122" viewBox="0 0 122 122">
    <circle cx="53" cy="50" r="29" {...common} />
    <path d="M75 72l30 31" {...common} />
    <path d="M42 50h23" {...common} strokeWidth="3" />
  </svg>;
  if (kind === 'comment') return <svg width="130" height="118" viewBox="0 0 130 118">
    <path d="M12 12h106v73H61l-29 22V85H12z" {...common} />
    <path d="M31 38h68M31 55h48" {...common} strokeWidth="4" />
  </svg>;
  return <svg width="122" height="122" viewBox="0 0 122 122">
    <circle cx="61" cy="61" r="48" {...common} />
    <path d="M37 62l15 15 32-34" {...common} />
  </svg>;
}

function ExampleObject({object, accent, active, scanProgress, entered}) {
  const detail = String(object.detail ?? '').trim();
  if (!detail) return <Glyph kind={object.kind} accent={accent} active={active}
    scanProgress={scanProgress} />;
  const border = active ? accent : '#658294';
  if (object.kind === 'window') return <div style={{width: 270, height: 158, border: `3px solid ${border}`,
    borderRadius: 14, background: '#122936', overflow: 'hidden'}}>
    <div style={{height: 30, borderBottom: `2px solid ${border}`, display: 'flex', alignItems: 'center',
      gap: 6, paddingLeft: 12}}>{[0, 1, 2].map((item) => <div key={item} style={{width: 8, height: 8,
      borderRadius: 8, background: item === 0 ? accent : '#7392a3'}} />)}</div>
    <div style={{height: 126, display: 'grid', placeItems: 'center', padding: 14}}>
      <div style={{border: `2px solid ${accent}`, borderRadius: 9, padding: '10px 17px',
        background: `${accent}20`, fontSize: 19, lineHeight: 1.25, maxWidth: 230,
        opacity: 0.25 + entered * 0.75}}>{detail}</div>
    </div>
  </div>;
  if (object.kind === 'code') {
    const lines = detail.split(/\n|；/u).map((line) => line.trim()).filter(Boolean).slice(0, 3);
    return <div style={{width: 286, minHeight: 154, border: `3px solid ${border}`, borderRadius: 14,
      background: '#0b202c', padding: '13px 12px', display: 'flex', flexDirection: 'column',
      justifyContent: 'center', gap: 5}}>
      {lines.map((line, index) => <div key={`${index}-${line}`} style={{display: 'grid',
        gridTemplateColumns: '24px 1fr', gap: 9, padding: '5px 7px', borderRadius: 5,
        background: index === 0 ? `${accent}30` : 'transparent',
        fontFamily: 'Consolas, monospace', fontSize: 18, lineHeight: 1.25,
        color: index === 0 ? '#f4f8fb' : '#9eb5c1'}}>
        <span style={{color: accent}}>{index + 1}</span><span>{line}</span>
      </div>)}
    </div>;
  }
  if (object.kind === 'comment') return <div style={{width: 280, minHeight: 138,
    border: `3px solid ${border}`, borderRadius: 16, background: '#12303b', padding: 20,
    display: 'grid', placeItems: 'center', textAlign: 'left', fontSize: 20,
    lineHeight: 1.35}}>{detail}</div>;
  return <div style={{display: 'flex', alignItems: 'center', gap: 12,
    border: `2px solid ${border}`, borderRadius: 12, background: '#102631', padding: '10px 14px'}}>
    <div style={{transform: 'scale(.6)', width: 68, height: 70, transformOrigin: 'left top'}}>
      <Glyph kind={object.kind} accent={accent} active={active} scanProgress={scanProgress} />
    </div>
    <div style={{fontSize: 19, lineHeight: 1.25, maxWidth: 165, textAlign: 'left'}}>{detail}</div>
  </div>;
}

export function ObjectActionStage({stage, previousStage = null, frame, fps, accent}) {
  const local = Math.max(0, frame);
  const entered = clamp(spring({frame: local, fps, config: {damping: 25, stiffness: 110}}));
  const eased = entered * entered * (3 - 2 * entered);
  const previous = new Map(previousStage?.objects?.map((object) => [object.id, object]) ?? []);
  const scanProgress = stage.action.type === 'scan'
    ? clamp(interpolate(local, [0, Math.max(1, fps * 1.5)], [0, 1], {extrapolateRight: 'clamp'}))
    : 0;
  const positions = new Map(stage.objects.map((object) => {
    const prior = previous.get(object.id);
    return [object.id, {
      x: mix(prior?.x ?? Math.max(0.02, object.x - 0.06), object.x, eased),
      y: mix(prior?.y ?? object.y + 0.06, object.y, eased),
    }];
  }));
  const objects = new Map(stage.objects.map((object) => [object.id, object]));
  const targeted = new Set(stage.action.targets);
  return <div style={{position: 'absolute', inset: 0, overflow: 'hidden',
    background: 'radial-gradient(ellipse at 50% 55%, #173342 0%, #0a1b27 56%, #06101a 100%)'}}>
    <svg viewBox="0 0 1000 600" preserveAspectRatio="none" style={{position: 'absolute', inset: 0,
      width: '100%', height: '100%', overflow: 'visible'}}>
      {stage.links.map((link, index) => {
        const from = positions.get(link.from);
        const to = positions.get(link.to);
        if (!from || !to) return null;
        const fromCode = stage.action.type === 'anchor' && objects.get(link.from)?.kind === 'code' &&
          objects.get(link.from)?.detail;
        const toCode = stage.action.type === 'anchor' && objects.get(link.to)?.kind === 'code' &&
          objects.get(link.to)?.detail;
        const x1 = from.x * 1000;
        const y1 = (from.y - (fromCode ? 0.045 : 0)) * 600;
        const x2 = to.x * 1000;
        const y2 = (to.y - (toCode ? 0.045 : 0)) * 600;
        return <g key={`${link.from}-${link.to}-${index}`}>
          <line x1={x1} y1={y1} x2={x2} y2={y2}
            stroke={accent} strokeWidth="3" opacity={0.18 + eased * 0.48}
            strokeDasharray={stage.action.type === 'anchor' ? '14 10' : undefined}
            strokeDashoffset={stage.action.type === 'anchor' ? (1 - eased) * 100 : 0} />
          {stage.action.type === 'anchor' && (fromCode || toCode) && <circle
            cx={fromCode ? x1 : x2} cy={fromCode ? y1 : y2} r="10" fill={accent}
            opacity={eased} />}
          {(stage.action.type === 'gather' || stage.action.type === 'move') && <circle
            cx={mix(from.x, to.x, (local % Math.max(1, fps)) / Math.max(1, fps)) * 1000}
            cy={mix(from.y, to.y, (local % Math.max(1, fps)) / Math.max(1, fps)) * 600}
            r="6" fill={accent} opacity="0.85" />}
        </g>;
      })}
    </svg>
    {stage.objects.map((object) => {
      const position = positions.get(object.id);
      const prior = previous.get(object.id);
      const focus = targeted.has(object.id);
      const active = object.state !== 'idle' || focus;
      const scale = (stage.action.type === 'expand' && focus ? 1 + 0.17 * eased : 1) *
        (stage.action.type === 'focus' && focus ? 1 + 0.08 * eased : 1);
      const opacity = prior ? 1 : 0.12 + 0.88 * eased;
      return <div key={object.id} style={{position: 'absolute', left: `${position.x * 100}%`,
        top: `${position.y * 100}%`, transform: `translate(-50%, -50%) scale(${scale})`,
        opacity, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
        minWidth: 120, maxWidth: 300, color: '#f4f8fb', textAlign: 'center'}}>
        <div style={{position: 'relative', filter: active ? `drop-shadow(0 0 20px ${accent}66)` : 'none'}}>
          <ExampleObject object={object} accent={accent} active={active}
            scanProgress={focus ? scanProgress : 0} entered={eased} />
          {stage.action.type === 'scan' && focus && <div style={{position: 'absolute', top: 0,
            left: `${scanProgress * 100}%`, width: 5, height: '100%', background: accent,
            boxShadow: `0 0 24px 8px ${accent}88`, opacity: scanProgress < 1 ? 0.8 : 0}} />}
          {object.state === 'done' && <div style={{position: 'absolute', right: -20, top: -10,
            width: 34, height: 34, borderRadius: 18, background: accent, color: '#092012',
            fontSize: 27, lineHeight: '34px', fontWeight: 900}}>✓</div>}
        </div>
        <div style={{fontSize: 29, fontWeight: 760, lineHeight: 1.2,
          textShadow: '0 2px 12px #06101a', color: active ? '#f4f8fb' : '#b6c8d4'}}>{object.label}</div>
      </div>;
    })}
  </div>;
}
