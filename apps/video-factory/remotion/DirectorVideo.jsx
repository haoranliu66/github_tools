import React,{useContext} from 'react';
import {AbsoluteFill,Audio,Sequence,staticFile,useCurrentFrame} from 'remotion';
import {ShotRegistryContext} from './ShotRegistry.jsx';
import {visualContext} from './visual-context.mjs';
import {captionAtFrame} from './caption-display.mjs';

function Beat({scene,beat,meta}) {
  const frame=useCurrentFrame();const registry=useContext(ShotRegistryContext);const Component=registry[beat.implementation.key];
  if(!Component) throw new Error(`Compiled director shot is missing: ${beat.implementation.key}`);
  const context=visualContext(scene,beat,meta.fps);
  return <Component frame={frame} scene={context.scene} beat={context.beat} fps={meta.fps} style={meta.style}
    accent={meta.style.palette.accent} assets={(meta.materials??[]).filter(m=>context.beat.assetIds.includes(m.id))} durationInFrames={beat.endFrame-beat.startFrame}/>;
}
function Captions({meta}) {
  const frame=useCurrentFrame();const cue=captionAtFrame(meta.globalCaptions,frame);
  if(!cue) return null;const s=meta.style;const c=s.captions;
  return <div style={{position:'absolute',left:`${c.marginPercent}%`,right:`${c.marginPercent}%`,bottom:c.bottom,
    display:'flex',justifyContent:c.align,fontFamily:s.typography.body}}><div style={{fontSize:c.fontSize,lineHeight:1.45,
    padding:'12px 24px',textAlign:c.align,color:c.color,background:c.background,borderRadius:c.radius,
    boxShadow:c.shadow,maxWidth:'100%'}}>{cue.text}</div></div>;
}
export function DirectorVideo({meta,scenes,voiceover}) {
  const s=meta.style;let cursor=0;
  return <AbsoluteFill style={{background:s.background,color:s.palette.ink,fontFamily:s.typography.body,
    '--video-accent':s.palette.accent,'--video-panel':s.palette.panel,'--video-radius':`${s.geometry.radius}px`}}>
    {scenes.map(scene=> {const start=cursor;cursor+=Math.round(scene.duration*meta.fps);
      return scene.visualBeats.map(beat=><Sequence key={beat.id} from={start+beat.startFrame} durationInFrames={beat.endFrame-beat.startFrame}>
        <Beat scene={scene} beat={beat} meta={meta}/></Sequence>);
    })}
    <Captions meta={meta}/>
    {voiceover?<Audio src={staticFile(voiceover)}/>:null}
  </AbsoluteFill>;
}
