import React from 'react';
import {EditorialVideo} from './EditorialVideo';
import {
  AbsoluteFill,
  Audio,
  Img,
  Series,
  Video,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

const fontFamily = 'Inter, "Microsoft YaHei", "PingFang SC", system-ui, sans-serif';

const assetSource = (src) => (/^https?:\/\//i.test(src) ? src : staticFile(src));

function Shell({children, meta, sceneIndex, totalScenes}) {
  const frame = useCurrentFrame();
  const {durationInFrames, width, height} = useVideoConfig();
  const designScale = Math.min(width / 1280, height / 720);
  const scalePx = (value, minimum = 0) => Math.max(minimum, value * designScale);
  const progress = interpolate(frame, [0, Math.max(1, durationInFrames - 1)], [0, 100]);
  return (
    <AbsoluteFill style={{
      color: '#f7f7fb',
      background: 'radial-gradient(circle at 75% 20%, #211a48 0%, #0d1020 38%, #080a12 100%)',
      fontFamily,
      padding: '7% 8%',
      overflow: 'hidden',
    }}>
      <AbsoluteFill style={{
        opacity: 0.16,
        backgroundImage: 'linear-gradient(rgba(255,255,255,.10) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.10) 1px, transparent 1px)',
        backgroundSize: `${scalePx(48, 12)}px ${scalePx(48, 12)}px`,
      }} />
      <div style={{position: 'absolute', top: scalePx(32, 8), left: scalePx(50, 12), fontSize: scalePx(22, 8), color: '#aeb4c8'}}>
        GITHUB KNOWLEDGE LAB
      </div>
      <div style={{position: 'absolute', top: scalePx(32, 8), right: scalePx(50, 12), fontSize: scalePx(22, 8), color: meta.accent}}>
        {meta.repo}
      </div>
      <div style={{position: 'relative', zIndex: 2, height: '100%', display: 'flex', alignItems: 'center'}}>
        <div style={{width: `${100 / designScale}%`, transform: `scale(${designScale})`, transformOrigin: 'left center'}}>
          {children}
        </div>
      </div>
      <div style={{position: 'absolute', bottom: scalePx(30, 8), left: scalePx(50, 12), right: scalePx(50, 12), height: scalePx(5, 2), background: '#262b3c', borderRadius: 5}}>
        <div style={{height: '100%', width: `${progress}%`, background: meta.accent, borderRadius: 5}} />
      </div>
      <div style={{position: 'absolute', bottom: scalePx(44, 12), right: scalePx(50, 12), fontSize: scalePx(18, 8), color: '#727b94'}}>
        {sceneIndex + 1}/{totalScenes}
      </div>
    </AbsoluteFill>
  );
}

function Entrance({children}) {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const value = spring({frame, fps, config: {damping: 18, stiffness: 110}});
  return (
    <div style={{width: '100%', opacity: value, transform: `translateY(${(1 - value) * 45}px)`}}>
      {children}
    </div>
  );
}

function TitleScene({scene, meta}) {
  return (
    <Entrance>
      <div style={{maxWidth: 1400}}>
        <div style={{fontSize: 28, color: meta.accent, fontWeight: 700, letterSpacing: 2}}>本周开源新星</div>
        <h1 style={{fontSize: 86, lineHeight: 1.08, margin: '28px 0', letterSpacing: -3}}>{scene.title}</h1>
        <p style={{fontSize: 38, lineHeight: 1.5, color: '#c7cada', margin: 0}}>{scene.subtitle}</p>
      </div>
    </Entrance>
  );
}

function TextScene({scene, meta}) {
  return (
    <Entrance>
      <div style={{borderLeft: `10px solid ${meta.accent}`, paddingLeft: 42, maxWidth: 1450}}>
        <h2 style={{fontSize: 64, margin: '0 0 28px'}}>{scene.heading}</h2>
        <p style={{fontSize: 37, lineHeight: 1.65, color: '#d2d5e1', margin: 0}}>{scene.body}</p>
      </div>
    </Entrance>
  );
}

function BulletsScene({scene, meta}) {
  const bullets = scene.bullets?.length ? scene.bullets : [scene.body];
  return (
    <Entrance>
      <h2 style={{fontSize: 62, margin: '0 0 36px'}}>{scene.heading}</h2>
      <div style={{display: 'grid', gap: 22}}>
        {bullets.map((bullet, index) => (
          <div key={`${bullet}-${index}`} style={{display: 'flex', gap: 22, fontSize: 34, color: '#d7d9e5'}}>
            <span style={{color: meta.accent, fontWeight: 800}}>{String(index + 1).padStart(2, '0')}</span>
            <span>{bullet}</span>
          </div>
        ))}
      </div>
    </Entrance>
  );
}

function StatScene({scene, meta}) {
  return (
    <Entrance>
      <div style={{fontSize: 30, color: '#adb3c6'}}>{scene.heading || '趋势信号'}</div>
      <div style={{fontSize: 150, lineHeight: 1, fontWeight: 900, color: meta.accent, margin: '26px 0'}}>{scene.value}</div>
      <div style={{fontSize: 48, fontWeight: 650}}>{scene.label}</div>
      {scene.body ? <p style={{fontSize: 30, color: '#abb1c2'}}>{scene.body}</p> : null}
    </Entrance>
  );
}

function CodeScene({scene, meta}) {
  return (
    <Entrance>
      <h2 style={{fontSize: 52, margin: '0 0 24px'}}>{scene.heading}</h2>
      <pre style={{
        background: '#090b14', border: '2px solid #30354b', borderRadius: 24,
        padding: 40, fontSize: 29, lineHeight: 1.55, overflow: 'hidden',
        boxShadow: `0 24px 80px ${meta.accent}22`, whiteSpace: 'pre-wrap',
      }}><code>{scene.code}</code></pre>
    </Entrance>
  );
}

function MediaScene({scene}) {
  const isVideo = /\.(mp4|mov|webm|m4v)$/i.test(scene.src);
  const mediaStyle = {width: '100%', maxHeight: '78vh', objectFit: 'contain', borderRadius: 24, boxShadow: '0 24px 80px rgba(0,0,0,.5)'};
  return (
    <Entrance>
      {isVideo ? <Video src={assetSource(scene.src)} style={mediaStyle} volume={scene.volume ?? 0} /> : <Img src={assetSource(scene.src)} style={mediaStyle} />}
      {scene.caption ? <div style={{fontSize: 28, marginTop: 18, color: '#bec3d3'}}>{scene.caption}</div> : null}
    </Entrance>
  );
}

function Scene({scene, meta}) {
  if (scene.type === 'title' || scene.type === 'outro') return <TitleScene scene={scene} meta={meta} />;
  if (scene.type === 'bullets') return <BulletsScene scene={scene} meta={meta} />;
  if (scene.type === 'stat') return <StatScene scene={scene} meta={meta} />;
  if (scene.type === 'code') return <CodeScene scene={scene} meta={meta} />;
  if (scene.type === 'media') return <MediaScene scene={scene} />;
  return <TextScene scene={scene} meta={meta} />;
}

export function KnowledgeVideo(props) {
  if (props.meta.template === 'editorial') return <EditorialVideo {...props} />;
  const {meta, scenes, voiceover} = props;
  return (
    <AbsoluteFill>
      <Series>
        {scenes.map((scene, index) => (
          <Series.Sequence key={`${scene.type}-${index}`} durationInFrames={Math.max(1, Math.round(scene.duration * meta.fps))}>
            <Shell meta={meta} sceneIndex={index} totalScenes={scenes.length}>
              <Scene scene={scene} meta={meta} />
            </Shell>
          </Series.Sequence>
        ))}
      </Series>
      {voiceover ? <Audio src={assetSource(voiceover)} /> : null}
    </AbsoluteFill>
  );
}
