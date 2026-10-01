// Adapted from pinned MIT sources. Notices and originals: integrations/motion-sources.
import React from 'react';
import {AbsoluteFill,Easing,interpolate,spring,useCurrentFrame,useVideoConfig} from 'remotion';
export {CardFlip,BrushReveal,BrowserFrame,CodeDiff,AccentTypewriter} from './ExpandedMotion.jsx';
export {GradientText,KineticHeadline,DrawOnUnderline} from './vendor/animation-techniques-kit/text.tsx';
const progress=(f,start=0,duration=24)=>interpolate(f,[start,start+duration],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:Easing.out(Easing.cubic)});

// 01-kinetic-typography: preserve the ghost-before-commit rhythm; accept Chinese token arrays.
export function GhostAhead({tokens,startFrame=0,staggerFrames=6,color='currentColor',style}) {
  const f=useCurrentFrame()-startFrame;
  return <div style={{display:'flex',flexWrap:'wrap',gap:'0 .2em',...style}}>{tokens.map((t,i)=> {
    const at=i*staggerFrames;const opacity=interpolate(f,[at,at+2,at+staggerFrames],[0,.35,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
    return <span key={i} style={{opacity,color,translate:`0px ${(1-progress(f,at+staggerFrames-3,3))*8}px`}}>{t}</span>;
  })}</div>;
}
// 03-scene-transitions: static blur plate, animate opacity rather than recomputing blur radius.
export function DefocusReveal({children,startFrame=0,durationFrames=16,style}) {
  const p=progress(useCurrentFrame(),startFrame,durationFrames);
  return <div style={{position:'relative',...style}}><div style={{opacity:p}}>{children}</div>
    <div style={{position:'absolute',inset:0,filter:'blur(24px)',opacity:1-p}}>{children}</div></div>;
}
export function DipToColor({cutFrame=30,durationFrames=10,color='#FAFAF9'}) {
  const f=useCurrentFrame();const half=durationFrames/2;
  const opacity=interpolate(f,[cutFrame-half,cutFrame,cutFrame+half],[0,1,0],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
  return <AbsoluteFill style={{backgroundColor:color,opacity,pointerEvents:'none'}}/>;
}
export function MatchCut({before,after,anchor,cutFrame=60,zoomPeak=1.15,durationFrames=20}) {
  const f=useCurrentFrame();const scale=interpolate(f,[cutFrame-durationFrames,cutFrame,cutFrame+durationFrames],[1,zoomPeak,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:Easing.inOut(Easing.cubic)});
  return <AbsoluteFill style={{scale}}>{f<cutFrame?before:after}{anchor}</AbsoluteFill>;
}
// 05-devices-and-ui-motion: perspective entry and waterfall UI population.
export function PerspectivePanel({children,startFrame=0,durationFrames=20,style}) {
  const f=useCurrentFrame();const p=progress(f,startFrame,durationFrames);
  return <div style={{perspective:1000}}><div style={{translate:`0px ${(1-p)*80}px`,transform:`rotateX(${(1-p)*16}deg)`,scale:.94+p*.06,opacity:p,...style}}>{children}</div></div>;
}
export function CascadeGrid({items,renderItem,columns=3,startFrame=0,staggerFrames=4,style}) {
  const f=useCurrentFrame();return <div style={{display:'grid',gridTemplateColumns:`repeat(${columns},1fr)`,gap:16,...style}}>{items.map((item,i)=> {
    const p=progress(f,startFrame+i*staggerFrames,8);
    return <div key={item.id??i} style={{opacity:p,scale:.92+p*.08,translate:`0px ${(1-p)*10}px`}}>{renderItem(item,i)}</div>;
  })}</div>;
}
// 09-dataviz: fixed pathLength avoids asynchronous DOM measurement during parallel frame rendering.
export function CountUp({target,startFrame=0,durationFrames=68,style}) {
  const p=progress(useCurrentFrame(),startFrame,durationFrames);return <span style={{fontVariantNumeric:'tabular-nums',...style}}>{Math.round(target*p).toLocaleString('en-US')}</span>;
}
export function DrawPath({d,startFrame=0,durationFrames=58,color='currentColor',viewBox='0 0 800 400',style}) {
  const p=progress(useCurrentFrame(),startFrame,durationFrames);
  return <svg viewBox={viewBox} style={{width:'100%',overflow:'visible',...style}}><path d={d} pathLength={1} stroke={color} strokeWidth={5} fill="none" strokeLinecap="round" strokeDasharray={1} strokeDashoffset={1-p}/></svg>;
}
// remotion-cinematic/src/engine/camera/interpolate.ts: segment interpolation and easing presets.
export function CameraMove({children,keys,easing='cinematic',style}) {
  const frame=useCurrentFrame();const easingFn=easing==='snappy'?Easing.bezier(.16,1,.3,1):easing==='linear'?Easing.linear:Easing.bezier(.22,.61,.36,1);
  let pose=keys[0]??{x:0,y:0,scale:1};
  if(frame>=keys.at(-1)?.frame) pose=keys.at(-1);
  else for(let i=0;i<keys.length-1;i++) if(frame>=keys[i].frame&&frame<keys[i+1].frame) {
    const a=keys[i],b=keys[i+1];pose=Object.fromEntries(['x','y','scale'].map(k=>[k,interpolate(frame,[a.frame,b.frame],[a[k],b[k]],{easing:easingFn})]));break;
  }
  return <div style={{position:'absolute',inset:0,translate:`${pose.x}px ${pose.y}px`,scale:pose.scale,...style}}>{children}</div>;
}
// Project-authored information transfer: explicit content travels along the path.
export function FlowPacket({from,to,label,startFrame=0,durationFrames=40,color='#65dcfb',style}) {
  const f=useCurrentFrame();const p=progress(f,startFrame,durationFrames);
  return <><svg style={{position:'absolute',inset:0,width:'100%',height:'100%'}}><path d={`M${from.x},${from.y} Q${(from.x+to.x)/2},${Math.min(from.y,to.y)-100} ${to.x},${to.y}`} fill="none" stroke={color} strokeWidth={3} pathLength={1} strokeDasharray={1} strokeDashoffset={1-p}/></svg>
    <div style={{position:'absolute',left:from.x+(to.x-from.x)*p,top:from.y+(to.y-from.y)*p-4*p*(1-p)*100,translate:'-50% -50%',background:color,color:'#10131f',padding:'12px 24px',borderRadius:14,opacity:f<startFrame?0:1,...style}}>{label}</div></>;
}
