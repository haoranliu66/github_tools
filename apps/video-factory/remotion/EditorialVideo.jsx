import React from 'react';
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

const ink = '#f4f8fb';
const muted = '#9fb0bf';
const panelFill = '#0e1c28e8';
const panelBorder = '#355064';
const fallbackAccent = '#b8f76c';
const source = (path) => /^https?:\/\//i.test(path) ? path : staticFile(path);
const panel = {
  background: panelFill,
  border: `1px solid ${panelBorder}`,
  borderRadius: 24,
  boxShadow: '0 28px 80px #02080d99',
};
function MediaAsset({scene, style}) {
  const mediaStyle = {width: '100%', height: '100%', objectFit: 'cover', ...style};
  if (/\.(mp4|webm|mov|m4v)$/i.test(scene.src)) {
    return <Video src={source(scene.src)} muted volume={0} style={mediaStyle} />;
  }
  return <Img src={source(scene.src)} style={mediaStyle} />;
}

function activeVisualBeat(scene, frame) {
  const beats = scene.visualBeats ?? [];
  if (!beats.length) return null;
  const timed = beats.findLast((beat) => Number.isInteger(beat.startFrame) && frame >= beat.startFrame);
  if (timed) return timed;
  const durationFrames = Math.max(1, Math.round((scene.duration ?? 1) * 30));
  return beats[Math.min(beats.length - 1, Math.floor(frame / durationFrames * beats.length))];
}

function focalStyle(beat, fallbackScale, progress = 0) {
  const region = beat?.focalRegion;
  if (!region) return {transform: `scale(${fallbackScale})`, transformOrigin: 'center'};
  const centerX = (region.x + region.width / 2) * 100;
  const centerY = (region.y + region.height / 2) * 100;
  const scale = Math.min(2.8, Math.max(1.08, 0.82 / Math.max(region.width, region.height)));
  return {
    objectPosition: `${centerX}% ${centerY}%`,
    transformOrigin: `${centerX}% ${centerY}%`,
    transform: `scale(${scale + progress * 0.025})`,
  };
}

function EvidencePill() {
  return null;
}

function HeroContent({scene, frame, fps, accent}) {
  const progress = interpolate(frame, [0, Math.max(1, scene.duration * fps)], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const reveal = spring({frame, fps, config: {damping: 180}});
  const beat = activeVisualBeat(scene, frame);
  const scale = 1.04 + progress * 0.08;
  const x = (scene.panX ?? -2) * progress;
  const y = (scene.panY ?? -1) * progress;
  return (
    <div style={{position: 'relative', width: '100%', height: '100%', overflow: 'hidden', borderRadius: 28}}>
      <MediaAsset scene={{...scene, src: beat?.src ?? scene.src}} style={{
        objectPosition: scene.position ?? 'center',
        ...focalStyle(beat, scale, progress),
        translate: `${x}% ${y}%`,
        filter: 'saturate(.9) contrast(1.05)',
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(90deg, #03090ff5 0%, #06101bd0 38%, #06101b22 72%, #06101b99 100%)',
      }} />
      <div style={{
        position: 'absolute', left: 54, top: 54, width: scene.stat ? 920 : 1020,
        opacity: reveal, transform: `translateY(${(1 - reveal) * 26}px)`,
      }}>
        <EvidencePill mode={scene.evidenceMode} accent={accent} />
        {scene.kicker && <div style={{fontSize: 22, letterSpacing: 5, color: accent, marginTop: 28}}>{scene.kicker}</div>}
        <h1 style={{
          margin: '24px 0 0', fontSize: scene.headlineSize ?? 82, lineHeight: 1.12,
          letterSpacing: -3, whiteSpace: 'pre-line',
        }}>{scene.headline ?? scene.title}</h1>
        {scene.subhead && <div style={{fontSize: 31, lineHeight: 1.55, color: '#c8d5df', marginTop: 26, whiteSpace: 'pre-line'}}>{scene.subhead}</div>}
      </div>
      {scene.stat && (
        <div style={{
          position: 'absolute', right: 54, bottom: 54, ...panel, width: 470, padding: '32px 38px',
          transform: `translateX(${(1 - reveal) * 42}px)`, opacity: reveal,
        }}>
          <div style={{fontSize: 18, color: accent, letterSpacing: 3}}>{scene.stat.eyebrow}</div>
          <div style={{fontSize: 92, lineHeight: 1.05, fontWeight: 850, color: ink, margin: '14px 0'}}>{scene.stat.value}</div>
          <div style={{fontSize: 24, color: muted}}>{scene.stat.label}</div>
        </div>
      )}
      {scene.badges?.length ? (
        <div style={{position: 'absolute', left: 54, bottom: 48, display: 'flex', gap: 12}}>
          {scene.badges.map((badge) => (
            <div key={badge} style={{...panel, padding: '11px 18px', fontSize: 19, color: '#c8d5df'}}>{badge}</div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function FlowContent({scene, frame, fps, accent}) {
  const beat = activeVisualBeat(scene, frame);
  const progressiveIndex = beat
    ? (Number.isInteger(beat.stepIndex) ? beat.stepIndex : (scene.visualBeats ?? []).indexOf(beat))
    : scene.steps.length - 1;
  const active = Math.min(scene.steps.length - 1,
    Number.isInteger(progressiveIndex) ? progressiveIndex : (scene.activeIndex ?? scene.steps.length - 1));
  const pulse = 0.65 + Math.sin(frame / 7) * 0.2;
  return (
    <div style={{height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
      <div style={{display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 30, marginBottom: 62}}>
        <div>
          <EvidencePill mode={scene.evidenceMode} accent={accent} />
          <h2 style={{fontSize: 62, margin: '24px 0 0', lineHeight: 1.18, letterSpacing: -2, whiteSpace: 'pre-line'}}>{scene.heading}</h2>
        </div>
        {scene.note && <div style={{maxWidth: 600, fontSize: 25, lineHeight: 1.55, color: muted, textAlign: 'right'}}>{scene.note}</div>}
      </div>
      <div style={{display: 'grid', gridTemplateColumns: `repeat(${scene.steps.length}, 1fr)`, gap: 42}}>
        {scene.steps.map((step, index) => {
          const entered = spring({frame: frame - index * 4, fps, config: {damping: 180}});
          const enabled = index <= active;
          const current = index === active;
          return (
            <div key={typeof step === 'string' ? step : step.title} style={{
              position: 'relative', ...panel, minHeight: 230, padding: '30px 28px',
              opacity: entered * (enabled ? 1 : 0.3),
              transform: `translateY(${(1 - entered) * 24}px) scale(${current ? 1.035 : 1})`,
              borderColor: current ? accent : panelBorder,
              boxShadow: current ? `0 0 0 2px ${accent}33, 0 28px 80px #02080d99` : panel.boxShadow,
            }}>
              <div style={{fontSize: 17, letterSpacing: 3, color: current ? accent : muted}}>0{index + 1}</div>
              <div style={{fontSize: 35, fontWeight: 750, marginTop: 28, whiteSpace: 'pre-line'}}>
                {typeof step === 'string' ? step : step.title}
              </div>
              {typeof step === 'object' && step.detail && <div style={{fontSize: 22, lineHeight: 1.5, color: muted, marginTop: 16}}>{step.detail}</div>}
              {index < scene.steps.length - 1 && (
                <div style={{
                  position: 'absolute', right: -43, top: '50%', width: 44, height: 3,
                  background: enabled ? accent : panelBorder,
                }}>
                  {enabled && <div style={{
                    position: 'absolute', right: -1, top: -4, width: 11, height: 11,
                    borderRadius: 12, background: accent, opacity: pulse,
                  }} />}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CodeContent({scene, frame, fps, accent}) {
  const lines = String(scene.code ?? '').split('\n');
  const beat = activeVisualBeat(scene, frame);
  const highlighted = new Set(beat?.lineNumbers?.length ? beat.lineNumbers : (scene.highlightLines ?? []));
  const reveal = spring({frame, fps, config: {damping: 180}});
  return (
    <div style={{height: '100%', display: 'grid', gridTemplateColumns: scene.diagram ? '1.28fr .72fr' : '1fr', gap: 34, alignItems: 'center'}}>
      <div>
        <EvidencePill mode={scene.evidenceMode} accent={accent} />
        <h2 style={{fontSize: 52, margin: '22px 0 26px', lineHeight: 1.22}}>{scene.heading}</h2>
        <div style={{...panel, overflow: 'hidden', padding: '25px 0'}}>
          {lines.map((line, index) => {
            const lineNumber = index + 1;
            const isHot = highlighted.has(lineNumber);
            return (
              <div key={`${lineNumber}-${line}`} style={{
                display: 'grid', gridTemplateColumns: '58px 1fr', padding: '7px 28px',
                background: isHot ? `${accent}20` : 'transparent',
                borderLeft: `5px solid ${isHot ? accent : 'transparent'}`,
                color: isHot ? '#ffffff' : '#a9c5d5',
                fontFamily: 'Consolas, monospace', fontSize: 28, lineHeight: 1.45,
              }}>
                <span style={{color: isHot ? accent : '#536b7b', userSelect: 'none'}}>{lineNumber}</span>
                <span style={{whiteSpace: 'pre'}}>{line || ' '}</span>
              </div>
            );
          })}
        </div>
      </div>
      {scene.diagram && (
        <div style={{...panel, height: 430, padding: 34, opacity: reveal, transform: `translateX(${(1 - reveal) * 28}px)`}}>
          <div style={{fontSize: 19, color: accent, letterSpacing: 3}}>{scene.diagram.eyebrow}</div>
          <div style={{height: 310, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 18}}>
            <div style={{...panel, padding: '26px 32px', fontSize: 34, borderColor: accent}}>{scene.diagram.from}</div>
            <div style={{position: 'relative', flex: 1, height: 3, background: accent}}>
              <div style={{
                position: 'absolute', left: `${interpolate(frame % 45, [0, 44], [0, 92])}%`,
                top: -6, width: 14, height: 14, borderRadius: 14, background: accent,
              }} />
              <div style={{position: 'absolute', width: '100%', top: 15, textAlign: 'center', color: muted, fontSize: 20}}>{scene.diagram.label}</div>
            </div>
            <div style={{...panel, padding: '26px 32px', fontSize: 34, borderColor: accent}}>{scene.diagram.to}</div>
          </div>
        </div>
      )}
    </div>
  );
}

function BeatFlowVisual({beat, frame, fps, accent}) {
  const steps = beat?.flowSteps?.length ? beat.flowSteps : [
    {title: '描述问题', detail: '说清输入和关系'},
    {title: '项目处理', detail: '把关系整理成图'},
    {title: '得到结果', detail: '沿着图继续讲解'},
  ];
  const active = Math.max(0, Math.min(steps.length - 1,
    Number.isInteger(beat?.stepIndex) ? beat.stepIndex : steps.length - 1));
  const localFrame = Math.max(0, frame - (beat?.startFrame ?? 0));
  return (
    <div style={{height: '100%', padding: 42, display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
      <div style={{fontSize: 22, color: accent, letterSpacing: 3}}>一步一步看</div>
      <div style={{fontSize: 34, lineHeight: 1.35, marginTop: 16, marginBottom: 38}}>{beat?.purpose}</div>
      <div style={{display: 'grid', gridTemplateColumns: `repeat(${steps.length}, 1fr)`, gap: 18}}>
        {steps.map((step, index) => {
          const entered = spring({frame: localFrame - index * 3, fps, config: {damping: 180}});
          const enabled = index <= active;
          const current = index === active;
          return (
            <div key={step.id ?? step.title} style={{
              position: 'relative', minHeight: 220, padding: '26px 22px', borderRadius: 20,
              border: `2px solid ${current ? accent : panelBorder}`,
              background: current ? `${accent}18` : '#091721',
              opacity: entered * (enabled ? 1 : 0.28),
              transform: `translateY(${(1 - entered) * 20}px)`,
            }}>
              <div style={{fontSize: 17, color: current ? accent : muted}}>0{index + 1}</div>
              <div style={{fontSize: 27, fontWeight: 780, lineHeight: 1.25, marginTop: 22}}>{step.title}</div>
              <div style={{fontSize: 19, lineHeight: 1.5, color: muted, marginTop: 16}}>{step.detail}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function BeatCompareVisual({beat, frame, fps, accent}) {
  const localFrame = Math.max(0, frame - (beat?.startFrame ?? 0));
  const before = beat?.contrast?.before ?? '原来的信息分散在描述里';
  const after = beat?.contrast?.after ?? beat?.purpose ?? '项目把变化直接摆出来';
  return (
    <div style={{height: '100%', padding: 42, display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
      <div style={{fontSize: 22, color: accent, letterSpacing: 3, marginBottom: 28}}>前后对照</div>
      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24}}>
        <ContrastCard item={{eyebrow: '之前', title: '不容易看懂', body: before}} tone="negative" accent={accent} frame={localFrame} fps={fps} delay={0} />
        <ContrastCard item={{eyebrow: '之后', title: '变化更清楚', body: after}} tone="positive" accent={accent} frame={localFrame} fps={fps} delay={5} />
      </div>
    </div>
  );
}

function BeatStatementVisual({beat, frame, fps, accent}) {
  const localFrame = Math.max(0, frame - (beat?.startFrame ?? 0));
  const reveal = spring({frame: localFrame, fps, config: {damping: 180}});
  return (
    <div style={{height: '100%', padding: 54, display: 'flex', flexDirection: 'column', justifyContent: 'center', opacity: reveal}}>
      <div style={{fontSize: 22, color: accent, letterSpacing: 3}}>当前重点</div>
      <div style={{fontSize: 54, lineHeight: 1.22, fontWeight: 820, marginTop: 28}}>{beat?.purpose}</div>
    </div>
  );
}

function MediaBeatVisual({scene, beat, frame, fps, accent, progress, zoom, offsetX, offsetY}) {
  const mode = beat?.visualMode;
  if (mode === 'progressive-flow') return <BeatFlowVisual beat={beat} frame={frame} fps={fps} accent={accent} />;
  if (mode === 'compare') return <BeatCompareVisual beat={beat} frame={frame} fps={fps} accent={accent} />;
  if (beat?.src || ['media-crop', 'readme-crop', 'screen-recording'].includes(mode) || !mode) {
    return (
      <MediaAsset scene={{...scene, src: beat?.src ?? scene.src}} style={{
        objectFit: scene.fit ?? 'cover',
        objectPosition: scene.position ?? 'center',
        ...focalStyle(beat, zoom, progress),
        translate: `${offsetX}% ${offsetY}%`,
      }} />
    );
  }
  return <BeatStatementVisual beat={beat} frame={frame} fps={fps} accent={accent} />;
}

function MediaContent({scene, frame, fps, accent}) {
  const progress = interpolate(frame, [0, Math.max(1, scene.duration * fps)], [0, 1], {extrapolateRight: 'clamp'});
  const zoom = (scene.zoom ?? 1.08) + progress * (scene.zoomTravel ?? 0.06);
  const offsetX = (scene.panX ?? 0) * progress;
  const offsetY = (scene.panY ?? -1.5) * progress;
  const beat = activeVisualBeat(scene, frame);
  return (
    <div style={{height: '100%', display: 'grid', gridTemplateColumns: '410px 1fr', gap: 34, alignItems: 'center'}}>
      <div>
        <EvidencePill mode={scene.evidenceMode} accent={accent} />
        <h2 style={{fontSize: 54, lineHeight: 1.2, margin: '24px 0', whiteSpace: 'pre-line'}}>{scene.heading}</h2>
        {scene.callout && <div style={{...panel, borderColor: accent, marginTop: 28, padding: '19px 22px', color: accent, fontSize: 23}}>{scene.callout}</div>}
      </div>
      <div style={{...panel, height: 650, overflow: 'hidden', position: 'relative'}}>
        <MediaBeatVisual scene={scene} beat={beat} frame={frame} fps={fps} accent={accent}
          progress={progress} zoom={zoom} offsetX={offsetX} offsetY={offsetY} />
        <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(90deg, #06101b44, transparent 22%, transparent 78%, #06101b33)'}} />
        {scene.marker && (
          <div style={{
            position: 'absolute', left: scene.marker.x, top: scene.marker.y,
            width: scene.marker.width, height: scene.marker.height,
            border: `4px solid ${accent}`, borderRadius: 14,
            boxShadow: `0 0 0 999px #02070c33, 0 0 32px ${accent}88`,
          }} />
        )}
      </div>
    </div>
  );
}

function ContrastCard({item, tone, accent, frame, fps, delay, visible = true}) {
  const entered = spring({frame: frame - delay, fps, config: {damping: 170}});
  const positive = tone === 'positive';
  const color = positive ? accent : '#ff6f7d';
  return (
    <div style={{
      ...panel, minHeight: 420, padding: '44px 46px', borderColor: color,
      opacity: entered * (visible ? 1 : 0.22),
      transform: `translateY(${(1 - entered) * 34}px) scale(${visible ? 1 : 0.97})`,
    }}>
      <div style={{fontSize: 21, color, letterSpacing: 4}}>{item.eyebrow}</div>
      <div style={{fontSize: 58, lineHeight: 1.16, fontWeight: 800, marginTop: 26, whiteSpace: 'pre-line'}}>{item.title}</div>
      {item.body && <div style={{fontSize: 29, lineHeight: 1.58, color: muted, marginTop: 28, whiteSpace: 'pre-line'}}>{item.body}</div>}
      <div style={{position: 'absolute', right: 42, bottom: 32, color, fontSize: 58}}>{positive ? '\u2713' : '\u00d7'}</div>
    </div>
  );
}

function ContrastContent({scene, frame, fps, accent}) {
  const beat = activeVisualBeat(scene, frame);
  const beatIndex = beat ? (scene.visualBeats ?? []).indexOf(beat) : 1;
  return (
    <div style={{height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 38}}>
        <div>
          <EvidencePill mode={scene.evidenceMode} accent={accent} />
          <h2 style={{fontSize: 58, margin: '22px 0 0'}}>{scene.heading}</h2>
        </div>
        {scene.note && <div style={{fontSize: 24, color: muted, maxWidth: 560, textAlign: 'right'}}>{scene.note}</div>}
      </div>
      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 34}}>
        <ContrastCard item={scene.left} tone={scene.left.tone ?? 'negative'} accent={accent} frame={frame} fps={fps} delay={0} visible />
        <ContrastCard item={scene.right} tone={scene.right.tone ?? 'positive'} accent={accent} frame={frame} fps={fps} delay={6} visible={beatIndex >= 1} />
      </div>
    </div>
  );
}

function AudienceContent({scene, frame, fps, accent}) {
  return (
    <div style={{height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
      <EvidencePill mode={scene.evidenceMode} accent={accent} />
      <h2 style={{fontSize: 62, margin: '24px 0 44px'}}>{scene.heading}</h2>
      <div style={{display: 'grid', gridTemplateColumns: `repeat(${scene.items.length}, 1fr)`, gap: 26}}>
        {scene.items.map((item, index) => {
          const entered = spring({frame: frame - index * 5, fps, config: {damping: 170}});
          return (
            <div key={item.title} style={{
              ...panel, minHeight: 330, padding: '36px 34px', opacity: entered,
              transform: `translateY(${(1 - entered) * 30}px)`,
              borderTop: `5px solid ${index === scene.activeIndex ? accent : panelBorder}`,
            }}>
              <div style={{fontSize: 18, letterSpacing: 3, color: accent}}>0{index + 1}</div>
              <div style={{fontSize: 38, fontWeight: 800, marginTop: 28}}>{item.title}</div>
              <div style={{fontSize: 25, lineHeight: 1.55, color: muted, marginTop: 24}}>{item.body}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function StatContent({scene, frame, fps, accent}) {
  const reveal = spring({frame, fps, config: {damping: 175}});
  return (
    <div style={{height: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 70, alignItems: 'center'}}>
      <div>
        <EvidencePill mode={scene.evidenceMode} accent={accent} />
        <h2 style={{fontSize: 68, lineHeight: 1.18, margin: '28px 0'}}>{scene.heading}</h2>
        {scene.body && <div style={{fontSize: 29, lineHeight: 1.55, color: muted}}>{scene.body}</div>}
      </div>
      <div style={{...panel, borderColor: accent, padding: '58px 62px', opacity: reveal, transform: `scale(${0.94 + reveal * 0.06})`}}>
        <div style={{fontSize: 122, lineHeight: 1, fontWeight: 880, color: ink}}>{scene.value}</div>
        <div style={{fontSize: 27, color: accent, letterSpacing: 3, marginTop: 28}}>{scene.label}</div>
      </div>
    </div>
  );
}

function StatementContent({scene, frame, fps, accent}) {
  const reveal = spring({frame, fps, config: {damping: 180}});
  return (
    <div style={{height: '100%', display: 'flex', alignItems: 'center'}}>
      <div style={{width: '100%', opacity: reveal, transform: `translateY(${(1 - reveal) * 28}px)`}}>
        <EvidencePill mode={scene.evidenceMode} accent={accent} />
        <div style={{fontSize: 22, letterSpacing: 5, color: accent, marginTop: 30}}>{scene.eyebrow}</div>
        <h2 style={{fontSize: scene.type === 'outro' ? 78 : 68, lineHeight: 1.2, letterSpacing: -2, margin: '22px 0', whiteSpace: 'pre-line'}}>{scene.heading ?? scene.title}</h2>
        {scene.body || scene.subtitle ? <div style={{fontSize: 32, lineHeight: 1.58, color: '#c5d2dc', maxWidth: 1300, whiteSpace: 'pre-line'}}>{scene.body ?? scene.subtitle}</div> : null}
        {scene.tagline && <div style={{...panel, display: 'inline-block', padding: '15px 22px', marginTop: 34, fontSize: 22, color: accent}}>{scene.tagline}</div>}
      </div>
    </div>
  );
}

function SceneContent({scene, frame, fps, accent}) {
  if (scene.type === 'hero') return <HeroContent scene={scene} frame={frame} fps={fps} accent={accent} />;
  if (scene.type === 'flow') return <FlowContent scene={scene} frame={frame} fps={fps} accent={accent} />;
  if (scene.type === 'code') return <CodeContent scene={scene} frame={frame} fps={fps} accent={accent} />;
  if (scene.type === 'media') return <MediaContent scene={scene} frame={frame} fps={fps} accent={accent} />;
  if (scene.type === 'contrast') return <ContrastContent scene={scene} frame={frame} fps={fps} accent={accent} />;
  if (scene.type === 'audience') return <AudienceContent scene={scene} frame={frame} fps={fps} accent={accent} />;
  if (scene.type === 'stat') return <StatContent scene={scene} frame={frame} fps={fps} accent={accent} />;
  return <StatementContent scene={scene} frame={frame} fps={fps} accent={accent} />;
}

function HighlightedCaption({text, keyword, accent}) {
  if (!keyword || !text.includes(keyword)) return text;
  const [before, ...rest] = text.split(keyword);
  return <>{before}<span style={{color: accent}}>{keyword}</span>{rest.join(keyword)}</>;
}

function EditorialScene({scene, meta, index, total, startFrame, totalFrames}) {
  const frame = useCurrentFrame();
  const {fps, width, height, durationInFrames} = useVideoConfig();
  const accent = meta.accent ?? fallbackAccent;
  const caption = scene.captions?.find((cue) => frame >= cue.startFrame && frame < cue.endFrame);
  const opacity = index === 0
    ? interpolate(
      frame,
      [Math.max(1, durationInFrames - 5), durationInFrames],
      [1, 0],
      {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
    )
    : interpolate(
      frame,
      [0, 6, Math.max(7, durationInFrames - 5), durationInFrames],
      [0, 1, 1, 0],
      {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
    );
  return (
    <AbsoluteFill style={{background: '#06101a', fontFamily: '"Microsoft YaHei", "Segoe UI", sans-serif', color: ink}}>
      <div style={{
        position: 'absolute', width: 1920, height: 1080,
        transform: `scale(${Math.min(width / 1920, height / 1080)})`, transformOrigin: 'top left',
        overflow: 'hidden', background: 'radial-gradient(ellipse at 82% 8%, #18374a 0%, #07121c 56%, #040a10 100%)',
      }}>
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.08,
          backgroundImage: 'linear-gradient(#9bb9c8 1px, transparent 1px),linear-gradient(90deg,#9bb9c8 1px,transparent 1px)',
          backgroundSize: '72px 72px',
        }} />
        <div style={{position: 'absolute', left: 64, top: 38, display: 'flex', gap: 18, alignItems: 'center'}}>
          <div style={{width: 19, height: 19, background: accent, borderRadius: 5}} />
          <div style={{fontSize: 20, letterSpacing: 3}}>{'\u5f00\u6e90\u89c2\u5bdf / OPEN SOURCE NOTES'}</div>
        </div>
        <div style={{position: 'absolute', right: 64, top: 39, fontSize: 20, color: muted}}>
          {meta.repo}<span style={{color: accent, marginLeft: 22}}>#{String(index + 1).padStart(2, '0')}</span>
        </div>
        <div style={{position: 'absolute', left: 64, right: 64, top: 85, height: 1, background: '#2b4353'}} />
        <div style={{position: 'absolute', left: 64, right: 64, top: 112, height: 735, opacity}}>
          <SceneContent scene={scene} frame={frame} fps={fps} accent={accent} />
        </div>
        <div style={{position: 'absolute', left: 64, right: 64, top: 864, height: 92, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          {caption && (
            <div style={{
              fontSize: 38, lineHeight: 1.42, color: '#ffffff', padding: '12px 28px',
              background: '#01070de8', borderRadius: 10, maxWidth: 1650, textAlign: 'center',
              boxShadow: '0 12px 40px #00000066',
            }}>
              <HighlightedCaption text={caption.text} keyword={scene.keyword} accent={accent} />
            </div>
          )}
        </div>
        {meta.showEvidenceLabels !== false && (
          <div style={{position: 'absolute', left: 64, right: 180, top: 985, fontSize: 16, color: muted, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{scene.source}</div>
        )}
        <div style={{position: 'absolute', right: 64, top: 980, color: accent, fontSize: 20}}>{index + 1} / {total}</div>
        <div style={{position: 'absolute', left: 0, bottom: 0, width: '100%', height: 5, background: '#1b2c38'}}>
          <div style={{height: '100%', width: `${(startFrame + frame + 1) / totalFrames * 100}%`, background: accent}} />
        </div>
      </div>
    </AbsoluteFill>
  );
}

export function EditorialVideo({meta, scenes, voiceover}) {
  const totalFrames = scenes.reduce(
    (sum, scene) => sum + Math.max(1, Math.round(scene.duration * meta.fps)),
    0,
  );
  let startFrame = 0;
  return (
    <AbsoluteFill>
      <Series>
        {scenes.map((scene, index) => {
          const from = startFrame;
          const duration = Math.max(1, Math.round(scene.duration * meta.fps));
          startFrame += duration;
          return (
            <Series.Sequence key={`${scene.type}-${index}`} durationInFrames={duration}>
              <EditorialScene
                scene={scene}
                meta={meta}
                index={index}
                total={scenes.length}
                startFrame={from}
                totalFrames={totalFrames}
              />
            </Series.Sequence>
          );
        })}
      </Series>
      {voiceover && <Audio src={source(voiceover)} />}
    </AbsoluteFill>
  );
}
