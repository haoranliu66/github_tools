import React from 'react';
import {AbsoluteFill, Audio, Img, Series, Video, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';

const ink = '#eff4f8';
const muted = '#a3b1c0';
const green = '#b8f76c';
const source = (path) => /^https?:\/\//i.test(path) ? path : staticFile(path);
const panel = {background: '#111f2c', border: '1px solid #31404d', borderRadius: 22};

function SignalMap({frame}) {
  const nodes = [{x: 38, y: 205, label: '意图', color: green}, {x: 242, y: 65, label: 'JSON', color: '#69d7f2'},
    {x: 242, y: 345, label: '校验', color: '#69d7f2'}, {x: 448, y: 205, label: '图解', color: green}];
  const lines = [[110, 246, 314, 106], [110, 246, 314, 386], [314, 106, 520, 246], [314, 386, 520, 246]];
  return <svg viewBox="0 0 640 480" style={{width: '100%', height: '100%'}}>
    {lines.map(([x1, y1, x2, y2], i) => {
      const t = ((frame / 90 + i * 0.2) % 1);
      return <g key={i}><line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#3c5366" strokeWidth="2" />
        <circle cx={x1 + (x2 - x1) * t} cy={y1 + (y2 - y1) * t} r="5" fill={green} /></g>;
    })}
    {nodes.map(n => <g key={n.label}><rect x={n.x} y={n.y} width="144" height="82" rx="15" fill="#142533" stroke={n.color} strokeWidth="2" />
      <text x={n.x + 72} y={n.y + 50} textAnchor="middle" fill={n.color} fontSize="28" fontWeight="700">{n.label}</text></g>)}
  </svg>;
}

function Content({scene, frame, fps}) {
  const progress = Math.min(1, frame / Math.max(1, scene.duration * fps));
  if (scene.type === 'title' || scene.type === 'outro') return <div style={{display: 'flex', alignItems: 'center', height: '100%', gap: 30}}>
    <div style={{width: 1090}}>
      <div style={{fontSize: 25, letterSpacing: 5, color: green, marginBottom: 34}}>{scene.eyebrow || 'OPEN SOURCE / EP.001'}</div>
      <div style={{fontSize: scene.type === 'title' ? 142 : 82, lineHeight: 1.12, letterSpacing: -5, fontWeight: 850, whiteSpace: 'pre-line'}}>{scene.title}</div>
      <div style={{fontSize: 50, lineHeight: 1.5, marginTop: 36, color: '#c7d4df', whiteSpace: 'pre-line'}}>{scene.subtitle}</div>
      <div style={{display: 'inline-block', ...panel, padding: '14px 25px', color: green, fontSize: 24, marginTop: 36}}>{scene.tagline}</div>
    </div>
    <div style={{width: 650, height: 520}}><SignalMap frame={frame} /><div style={{textAlign: 'center', fontSize: 20, color: muted}}>机制示意 · 非运行录屏</div></div>
  </div>;
  if (scene.type === 'stat') return <div style={{display: 'flex', gap: 90, alignItems: 'center', height: '100%'}}>
    <div style={{width: 990}}><div style={{fontSize: 44}}>{scene.heading}</div>
      <div style={{fontSize: 205, fontWeight: 850, color: green, letterSpacing: -10, margin: '20px 0'}}>{scene.value}</div>
      <div style={{fontSize: 40, color: muted}}>{scene.label}</div><div style={{fontSize: 25, color: muted, marginTop: 32}}>{scene.body}</div></div>
    <div style={{...panel, padding: '44px 50px', flex: 1}}>{scene.bullets.map((line, i) => <div key={i} style={{padding: '26px 0', borderBottom: i === scene.bullets.length - 1 ? 0 : '1px solid #31404d'}}><div style={{fontSize: 18, color: green, marginBottom: 14}}>SCOUT / 0{i + 1}</div><div style={{fontSize: 33}}>{line}</div></div>)}</div>
  </div>;
  if (scene.type === 'media') return <div style={{display: 'flex', gap: 40, alignItems: 'center', height: '100%'}}>
    <div style={{width: 430, flexShrink: 0}}><div style={{color: green, fontSize: 22, marginBottom: 25}}>REPOSITORY EVIDENCE</div>
      <h2 style={{fontSize: 57, lineHeight: 1.25, margin: '0 0 30px', whiteSpace: 'pre-line'}}>{scene.heading}</h2>
      <div style={{fontSize: 29, lineHeight: 1.7, color: muted, whiteSpace: 'pre-line'}}>{scene.body}</div>
      <div style={{fontSize: 21, color: green, marginTop: 32}}>{scene.caption}</div>
    </div>
    <div style={{...panel, width: 1270, height: 666, overflow: 'hidden', position: 'relative'}}>
      {/\.(mp4|webm|mov)$/i.test(scene.src) ? <Video src={source(scene.src)} muted style={{width: '100%', height: '100%', objectFit: 'contain'}} /> :
        <Img src={source(scene.src)} style={{width: '100%', height: '100%', objectFit: scene.fit ?? 'contain', objectPosition: scene.position ?? 'center', transform: `scale(${1 + progress * 0.035})`}} />}
      <div style={{position: 'absolute', right: 14, top: 14, background: '#06121de8', border: '1px solid #52616d', padding: '9px 15px', fontSize: 18, borderRadius: 7}}>官方示例图 · 非本机实测</div>
    </div>
  </div>;
  if (scene.type === 'code') return <div style={{height: '100%'}}><h2 style={{fontSize: 62, margin: '8px 0 30px'}}>{scene.heading}</h2>
    <div style={{display: 'flex', gap: 45}}><pre style={{...panel, width: 1130, margin: 0, padding: 36, fontSize: 32, lineHeight: 1.55, color: '#b7eaff', whiteSpace: 'pre-wrap'}}>{scene.code}</pre>
      <div style={{flex: 1, paddingTop: 24}}><div style={{fontSize: 32, color: green, lineHeight: 1.6}}>{scene.body}</div><div style={{fontSize: 24, color: muted, lineHeight: 1.7, marginTop: 38}}>{scene.note}</div></div></div>
  </div>;
  const bullets = scene.bullets ?? [scene.body];
  return <div style={{height: '100%'}}><div style={{fontSize: 22, color: green, margin: '15px 0 20px'}}>{scene.eyebrow ?? 'HOW IT WORKS'}</div>
    <h2 style={{fontSize: 67, margin: '0 0 55px'}}>{scene.heading}</h2>
    <div style={{display: 'grid', gridTemplateColumns: `repeat(${bullets.length}, 1fr)`, gap: 28}}>{bullets.map((bullet, i) => {
      const enter = spring({frame: frame - i * 8, fps, config: {damping: 200}});
      return <div key={i} style={{...panel, padding: 33, minHeight: 300, opacity: enter, transform: `translateY(${(1 - enter) * 20}px)`}}>
        <div style={{display: 'flex', justifyContent: 'space-between', color: green, fontSize: 37, marginBottom: 35}}><span>0{i + 1}</span><span>{i < bullets.length - 1 ? '→' : '✓'}</span></div>
        <div style={{fontSize: 37, lineHeight: 1.45, whiteSpace: 'pre-line'}}>{bullet}</div>
      </div>;
    })}</div><div style={{fontSize: 26, color: muted, marginTop: 36}}>{scene.note}</div>
  </div>;
}

function EditorialScene({scene, meta, index, total, startFrame, totalFrames}) {
  const frame = useCurrentFrame();
  const {fps, width, height} = useVideoConfig();
  const caption = scene.captions?.find(c => frame >= c.startFrame && frame < c.endFrame);
  const opacity = interpolate(frame, [0, 8], [0, 1], {extrapolateRight: 'clamp'});
  return <AbsoluteFill style={{background: '#08121d', fontFamily: '"Microsoft YaHei", "Segoe UI", sans-serif', color: ink}}>
    <div style={{position: 'absolute', width: 1920, height: 1080, transform: `scale(${Math.min(width / 1920, height / 1080)})`, transformOrigin: 'top left', overflow: 'hidden', background: 'radial-gradient(ellipse at 84% 10%, #153143 0%, #08121d 57%)'}}>
      <div style={{position: 'absolute', inset: 0, opacity: 0.09, backgroundImage: 'linear-gradient(#a6c7d8 1px, transparent 1px),linear-gradient(90deg,#a6c7d8 1px,transparent 1px)', backgroundSize: '80px 80px'}} />
      <div style={{position: 'absolute', left: 88, top: 44, display: 'flex', gap: 24, alignItems: 'center'}}><div style={{width: 28, height: 28, background: green, borderRadius: 7}} /><div style={{fontSize: 24, letterSpacing: 3}}>开源观察 / OPEN SOURCE NOTES</div></div>
      <div style={{position: 'absolute', right: 88, top: 46, fontSize: 24, color: muted}}>{meta.repo} <span style={{color: green, marginLeft: 24}}>#{String(index + 1).padStart(2, '0')}</span></div>
      <div style={{position: 'absolute', top: 108, left: 88, right: 88, height: 1, background: '#304251'}} />
      <div style={{position: 'absolute', left: 88, top: 162, width: 1744, height: 670, opacity}}><Content scene={scene} frame={frame} fps={fps} /></div>
      <div style={{position: 'absolute', top: 873, left: 88, right: 88, height: 105, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        {caption && <div style={{fontSize: 40, lineHeight: 1.4, color: '#ffffff', padding: '14px 32px', background: '#02090fe6', borderRadius: 10, maxWidth: 1680, textAlign: 'center'}}>{caption.text}</div>}
      </div>
      <div style={{position: 'absolute', left: 88, top: 1003, right: 200, fontSize: 18, color: muted}}>{scene.source}</div>
      <div style={{position: 'absolute', right: 88, top: 1000, color: green, fontSize: 22}}>{index + 1} / {total}</div>
      <div style={{position: 'absolute', left: 0, bottom: 0, height: 5, width: `${(startFrame + frame + 1) / totalFrames * 100}%`, background: green}} />
    </div>
  </AbsoluteFill>;
}

export function EditorialVideo({meta, scenes, voiceover}) {
  const totalFrames = scenes.reduce((sum, scene) => sum + Math.max(1, Math.round(scene.duration * meta.fps)), 0);
  let startFrame = 0;
  return <AbsoluteFill><Series>{scenes.map((scene, index) => {
    const from = startFrame;
    const duration = Math.max(1, Math.round(scene.duration * meta.fps));
    startFrame += duration;
    return <Series.Sequence key={index} durationInFrames={duration}><EditorialScene scene={scene} meta={meta} index={index} total={scenes.length} startFrame={from} totalFrames={totalFrames} /></Series.Sequence>;
  })}</Series>{voiceover && <Audio src={source(voiceover)} />}</AbsoluteFill>;
}
