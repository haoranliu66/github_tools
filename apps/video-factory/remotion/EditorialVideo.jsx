import {PlannedShot} from './ShotRegistry.jsx';
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
import {ObjectActionStage} from './ObjectActionStage.jsx';

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

function entranceStyle(entrance, localFrame, fps) {
  const reveal = Math.min(1, Math.max(0, spring({
    frame: Math.max(0, localFrame), fps, config: {damping: 24, stiffness: 130, mass: 0.9},
  })));
  const shift = (1 - reveal) * 78;
  const transform = entrance === 'slide-left' ? `translateX(${-shift}px)`
    : entrance === 'slide-right' ? `translateX(${shift}px)`
      : entrance === 'push-in' ? `scale(${0.95 + reveal * 0.05})` : 'none';
  return {opacity: reveal, transform};
}

function BeatEntrance({beat, frame, fps, children, preserve = false}) {
  const localFrame = preserve ? fps : Math.max(0, frame - (beat?.startFrame ?? 0));
  return <div style={{position: 'absolute', inset: 0,
    ...entranceStyle(beat?.entrance ?? 'fade', localFrame, fps)}}>{children}</div>;
}

function activeVisualBeat(scene, frame) {
  const beats = scene.visualBeats ?? [];
  if (!beats.length) return null;
  const timed = beats.findLast((beat) => Number.isInteger(beat.startFrame) && frame >= beat.startFrame);
  if (timed) return timed;
  if (beats.some((beat) => Number.isInteger(beat.startFrame))) return beats[0];
  const durationFrames = Math.max(1, Math.round((scene.duration ?? 1) * 30));
  return beats[Math.min(beats.length - 1, Math.floor(frame / durationFrames * beats.length))];
}

function focalTarget(beat, fallbackScale) {
  const region = beat?.focalRegion;
  if (!region) return {centerX: 50, centerY: 50, scale: fallbackScale};
  return {
    centerX: (region.x + region.width / 2) * 100,
    centerY: (region.y + region.height / 2) * 100,
    scale: Math.min(2.8, Math.max(1.08, 0.82 / Math.max(region.width, region.height))),
  };
}

function focalStyle(beat, fallbackScale, progress = 0, previousBeat = null, blend = 1) {
  if (!beat?.focalRegion && !previousBeat?.focalRegion) {
    return {transform: `scale(${fallbackScale})`, transformOrigin: 'center'};
  }
  const target = focalTarget(beat, fallbackScale);
  const previous = previousBeat ? focalTarget(previousBeat, fallbackScale) : target;
  const centerX = previous.centerX + (target.centerX - previous.centerX) * blend;
  const centerY = previous.centerY + (target.centerY - previous.centerY) * blend;
  const scale = previous.scale + (target.scale - previous.scale) * blend;
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
      {beat?.stage ? <ObjectActionStage stage={beat.stage}
        frame={Math.max(0, frame - (beat.startFrame ?? 0))} fps={fps} accent={accent} />
        : beat?.shot ? <IllustrationShot beat={beat} frame={frame} fps={fps} accent={accent} />
        : beat?.canvas ? <DiagramCanvas canvas={beat.canvas} slots={beat.canvas.nodes} frame={frame} fps={fps} accent={accent} />
        : <MediaAsset scene={{...scene, src: beat?.src ?? scene.src}} style={{
        objectPosition: scene.position ?? 'center',
        ...focalStyle(beat, scale, progress),
        ...(scene.kicker === 'GITHUB REPOSITORY' ? {
          objectPosition: 'left top',
          transformOrigin: 'left top',
          transform: `scale(${1.5 + progress * 0.03})`,
        } : {}),
        translate: `${x}% ${y}%`,
        filter: 'saturate(.9) contrast(1.05)',
      }} />}
      <div style={{
        position: 'absolute', inset: 0,
        background: scene.stat
          ? 'linear-gradient(90deg, #03090fc9 0%, #06101b75 43%, #06101b05 78%, #06101b44 100%)'
          : 'linear-gradient(90deg, #03090ff5 0%, #06101bd0 38%, #06101b22 72%, #06101b99 100%)',
      }} />
      <div style={{
        position: 'absolute', left: 54, top: 54, width: scene.stat ? 650 : 1020,
        opacity: reveal, transform: `translateY(${(1 - reveal) * 26}px)`,
      }}>
        <EvidencePill mode={scene.evidenceMode} accent={accent} />
        {scene.kicker && <div style={{fontSize: 22, letterSpacing: 5, color: accent, marginTop: 28}}>{scene.kicker}</div>}
        <h1 style={{
          margin: '24px 0 0', fontSize: scene.headlineSize ?? (scene.stat ? 62 : 82), lineHeight: 1.12,
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
  const nodes = steps.map((step, index) => ({
    id: step.id ?? `step-${index}`, label: step.title,
    kind: index === 0 ? 'input' : index === steps.length - 1 ? 'result' : 'action',
  }));
  const visible = nodes.slice(0, active + 1);
  return <DiagramCanvas canvas={{nodes: visible, edges: visible.slice(1).map((node, index) => ({
    from: visible[index].id, to: node.id,
  })), focusId: visible.at(-1)?.id}} previousCanvas={{nodes: visible.slice(0, -1), edges: []}}
    slots={nodes} frame={Math.max(0, frame - (beat?.startFrame ?? 0))} fps={fps} accent={accent} />;
}

function DiagramCanvas({canvas, previousCanvas = null, slots, frame, fps, accent}) {
  const width = 1650;
  const nodeWidth = Math.min(270, (width - 80) / Math.max(1, slots.length) - 30);
  const gap = slots.length > 1 ? (width - nodeWidth * slots.length) / (slots.length - 1) : 0;
  const positions = new Map(slots.map((node, index) => [node.id, 40 + index * (nodeWidth + gap)]));
  const kinds = {input: '输入', action: '处理', result: '结果', note: '说明'};
  const entered = spring({frame, fps, config: {damping: 180}});
  const previousNodes = new Set(previousCanvas?.nodes?.map((node) => node.id) ?? []);
  const previousEdges = new Set(previousCanvas?.edges?.map((edge) => `${edge.from}:${edge.to}`) ?? []);
  return (
    <div style={{position: 'relative', width: '100%', height: '100%', background: 'radial-gradient(ellipse at 50% 55%, #163344 0%, #091823 52%, #06101a 100%)'}}>
      <div style={{position: 'absolute', left: '50%', top: '50%', width, height: 430, transform: 'translate(-50%, -50%)'}}>
        <svg width={width} height="430" style={{position: 'absolute', inset: 0}}>
          {canvas.edges.map((edge, index) => {
            const from = positions.get(edge.from);
            const to = positions.get(edge.to);
            if (from == null || to == null) return null;
            const x1 = from + nodeWidth / 2;
            const x2 = to + nodeWidth / 2;
            return <g key={`${edge.from}-${edge.to}-${index}`}
              opacity={previousEdges.has(`${edge.from}:${edge.to}`) ? 1 : entered}>
              <line x1={x1} y1="210" x2={x2} y2="210" stroke={accent} strokeWidth="5" />
              <circle cx={x1 + (x2 - x1) * Math.min(1, Math.max(0, (frame % 30) / 29))} cy="210" r="10" fill={accent} />
            </g>;
          })}
        </svg>
        {canvas.nodes.map((node) => {
          const focused = node.id === canvas.focusId;
          return <div key={node.id} style={{
            position: 'absolute', left: positions.get(node.id), top: 115, width: nodeWidth, height: 190,
            borderRadius: 26, border: `3px solid ${focused ? accent : panelBorder}`,
            background: focused ? '#193745' : '#10232e', boxShadow: focused ? `0 0 40px ${accent}44` : '0 18px 38px #0006',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            opacity: previousNodes.has(node.id) ? 1 : entered,
            transform: `translateY(${previousNodes.has(node.id) ? 0 : (1 - entered) * 18}px)`,
          }}>
            <div style={{width: 54, height: 54, borderRadius: node.kind === 'result' ? 28 : 14,
              border: `4px solid ${focused ? accent : '#7892a2'}`, marginBottom: 19,
              background: node.kind === 'result' ? `${accent}22` : 'transparent'}} />
            <div style={{fontSize: 17, color: focused ? accent : muted, letterSpacing: 3}}>{kinds[node.kind] ?? '步骤'}</div>
            <div style={{fontSize: 31, fontWeight: 760, marginTop: 9, textAlign: 'center', lineHeight: 1.2}}>{node.label}</div>
          </div>;
        })}
      </div>
    </div>
  );
}

function IllustrationShot({beat, previousBeat = null, frame, fps, accent}) {
  const shot = beat.shot;
  const localFrame = Math.max(0, frame - (beat.startFrame ?? 0));
  const sameSubject = previousBeat?.shot?.kind === shot.kind &&
    ['title', 'before', 'action', 'result'].every((key) => previousBeat.shot[key] === shot[key]);
  const change = Math.min(1, Math.max(0, spring({
    frame: localFrame, fps, config: {damping: 26, stiffness: 145},
  })));
  const focusAmount = (key) => {
    const prior = sameSubject && previousBeat.shot.focus === key ? 1 : 0;
    return prior + ((shot.focus === key ? 1 : 0) - prior) * change;
  };
  const card = (key, label, value) => {
    const emphasis = focusAmount(key);
    const crossed = key === 'before' && shot.negateBefore && shot.focus !== 'before';
    return <div key={key} style={{position: 'relative', flex: 1, minWidth: 0,
      padding: '30px 32px', borderRadius: 26, background: '#142c3a',
      border: `3px solid ${emphasis > 0.5 ? accent : '#3a5668'}`,
      boxShadow: `0 0 ${Math.round(emphasis * 46)}px ${accent}55`,
      opacity: 0.56 + emphasis * 0.44,
      transform: `scale(${1 + emphasis * 0.035})`}}>
      <div style={{fontSize: 21, letterSpacing: 3, color: emphasis > 0.5 ? accent : muted}}>{label}</div>
      <div style={{fontSize: 34, lineHeight: 1.35, fontWeight: 760, marginTop: 20,
        wordBreak: 'break-word'}}>{value}</div>
      {crossed && <div style={{position: 'absolute', inset: 0, display: 'grid', placeItems: 'center',
        opacity: change, fontSize: 180, fontWeight: 900, color: '#ff726e',
        textShadow: '0 10px 34px #07111dcc', transform: `scale(${0.8 + change * 0.2})`}}>×</div>}
    </div>;
  };
  const stages = <div style={{display: 'flex', gap: 22, alignItems: 'stretch', width: '100%'}}>
    {card('before', '原来的问题', shot.before)}
    {card('action', '项目的动作', shot.action)}
    {card('result', '看到的变化', shot.result)}
  </div>;
  const questionLabels = {before: '先看到的问题', action: '项目怎么帮忙', result: '最后得到什么'};
  return <BeatEntrance beat={beat} frame={frame} fps={fps} preserve={sameSubject}>
    <div style={{position: 'absolute', inset: 0, padding: shot.kind === 'question' ? '66px 92px' : '42px 64px',
      background: 'radial-gradient(ellipse at 80% 12%, #1c4250 0%, #081923 52%, #06101a 100%)',
      display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 30}}>
      {shot.kind === 'browser' ? <div style={{...panel, overflow: 'hidden', width: '100%', height: '100%'}}>
        <div style={{height: 72, background: '#173241', borderBottom: '2px solid #39576a',
          display: 'flex', alignItems: 'center', gap: 14, padding: '0 28px'}}>
          {['#ff756e', '#f8ca65', '#83d78b'].map((color) =>
            <div key={color} style={{width: 16, height: 16, borderRadius: 8, background: color}} />)}
          <div style={{marginLeft: 24, borderRadius: 12, background: '#0b1f2c', padding: '12px 26px',
            color: muted, fontSize: 23, minWidth: 420}}>{shot.title}</div>
        </div>
        <div style={{height: 'calc(100% - 72px)', display: 'flex', alignItems: 'center',
          padding: '44px 50px', gap: 24}}>{stages}</div>
      </div> : shot.kind === 'comparison' ? <>
        <div style={{fontSize: 48, fontWeight: 820, marginBottom: 20}}>{shot.title}</div>
        <div style={{display: 'flex', alignItems: 'center', gap: 22, width: '100%'}}>
          {card('before', '以前', shot.before)}
          <div style={{flex: '0 0 280px', textAlign: 'center', color: accent, fontSize: 28,
            opacity: change, transform: `translateX(${(1 - change) * -50}px)`}}>
            <div style={{fontSize: 54}}>→</div>{shot.action}
          </div>
          {card('result', '现在', shot.result)}
        </div>
      </> : <>
        <div style={{fontSize: 78, lineHeight: 1.18, fontWeight: 850, maxWidth: 1450,
          borderLeft: `10px solid ${accent}`, paddingLeft: 36,
          transform: `translateX(${(1 - change) * -95}px)`, opacity: change}}>{shot.title}</div>
        {shot.negateBefore && shot.focus !== 'before' && <div style={{fontSize: 27,
          color: '#ff8580', opacity: change}}>× {shot.before}</div>}
        <div style={{width: '70%', minHeight: 190}}>{card(shot.focus,
          questionLabels[shot.focus], shot[shot.focus])}</div>
      </>}
    </div>
  </BeatEntrance>;
}

function CanvasContent({scene, frame, fps, accent}) {
  const beat = activeVisualBeat(scene, frame);
  const previousBeat = (scene.visualBeats ?? [])[(scene.visualBeats ?? []).indexOf(beat) - 1];
  const previousStageBeat = (scene.visualBeats ?? [])
    .slice(0, (scene.visualBeats ?? []).indexOf(beat)).findLast((item) => item.stage);
  const snapshots = (scene.visualBeats ?? []).filter((item) => item.canvas);
  const slots = [...new Map(snapshots.flatMap((item) => item.canvas.nodes)
    .map((node) => [node.id, node])).values()];
  const progress = interpolate(frame, [0, Math.max(1, scene.duration * fps)], [0, 1], {extrapolateRight: 'clamp'});
  return <div style={{height: '100%', position: 'relative', overflow: 'hidden', borderRadius: 26}}>
    {beat?.stage
      ? <ObjectActionStage stage={beat.stage} previousStage={previousStageBeat?.stage}
          frame={Math.max(0, frame - (beat.startFrame ?? 0))} fps={fps} accent={accent} />
      : beat?.shot
      ? <IllustrationShot beat={beat} previousBeat={previousBeat} frame={frame} fps={fps} accent={accent} />
      : beat?.canvas
      ? <DiagramCanvas canvas={beat.canvas} previousCanvas={previousBeat?.canvas} slots={slots}
          frame={Math.max(0, frame - (beat.startFrame ?? 0))} fps={fps} accent={accent} />
      : <MediaBeatVisual scene={scene} beat={beat} frame={frame} fps={fps} accent={accent}
          progress={progress} zoom={1.02 + progress * 0.025} offsetX={0} offsetY={0} />}
    {scene.heading && <div style={{position: 'absolute', left: 28, top: 26, ...panel,
      padding: '12px 20px', fontSize: 27, fontWeight: 720, maxWidth: 780}}>{scene.heading}</div>}
  </div>;
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
  if (beat?.shot) return <IllustrationShot beat={beat} frame={frame} fps={fps} accent={accent} />;
  if (mode === 'progressive-flow') return <BeatFlowVisual beat={beat} frame={frame} fps={fps} accent={accent} />;
  if (mode === 'compare') return <BeatCompareVisual beat={beat} frame={frame} fps={fps} accent={accent} />;
  if (beat?.src || ['media-crop', 'readme-crop', 'screen-recording'].includes(mode) || !mode) {
    const beats = scene.visualBeats ?? [];
    const previousBeat = beats[beats.indexOf(beat) - 1];
    const sameCanvas = beat?.src && previousBeat?.src === beat.src;
    const rawBlend = sameCanvas && Number.isInteger(beat.startFrame)
      ? Math.max(0, Math.min(1, (frame - beat.startFrame) / Math.max(1, fps * 0.35)))
      : 1;
    const blend = rawBlend * rawBlend * (3 - 2 * rawBlend);
    return (
      <BeatEntrance beat={beat} frame={frame} fps={fps} preserve={sameCanvas}>
        <MediaAsset scene={{...scene, src: beat?.src ?? scene.src}} style={{
        objectFit: scene.fit ?? 'cover',
        objectPosition: scene.position ?? 'center',
        ...focalStyle(beat, zoom, progress, sameCanvas ? previousBeat : null, blend),
        translate: `${offsetX}% ${offsetY}%`,
        }} />
      </BeatEntrance>
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
  const plannedBeat = activeVisualBeat(scene, frame);
  if (plannedBeat?.implementation) return <PlannedShot scene={scene} beat={plannedBeat} frame={frame} fps={fps} accent={accent}/>;
  if (scene.type === 'hero') return <HeroContent scene={scene} frame={frame} fps={fps} accent={accent} />;
  if (['media', 'flow', 'contrast'].includes(scene.type) && scene.visualBeats?.length) {
    return <CanvasContent scene={scene} frame={frame} fps={fps} accent={accent} />;
  }
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
