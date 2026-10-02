// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Adapted from Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// Modified 2026-10-02 for zimeiti: configurable content, project theme, local frames, offline assets.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md.
import React from 'react';
import {AbsoluteFill,Img,staticFile,useCurrentFrame,useVideoConfig,interpolate,Easing,spring} from 'remotion';
const clamp={extrapolateLeft:'clamp',extrapolateRight:'clamp'};
const progress=(f,a,d,easing=Easing.out(Easing.cubic))=>interpolate(f,[a,a+Math.max(1,d)],[0,1],{...clamp,easing});
const colors=theme=>theme?.palette??{ink:'#23252b',muted:'#72747c',accent:'#6557e8',panel:'#fff',line:'#d9d6cf'};
export default function BezierMerge({sources=[],target='',startFrame=0,durationFrames=150,theme}) {
 const f=useCurrentFrame()-startFrame,{width,height}=useVideoConfig(),c=colors(theme),n=sources.length,tx=width*.72,ty=height*.46,sx=width*.2;
 const draw=progress(f,6,durationFrames*.22),merge=progress(f,durationFrames*.34,durationFrames*.4,Easing.inOut(Easing.cubic)),erase=progress(f,durationFrames*.78,durationFrames*.12),packetOn=progress(f,10,12)*(1-progress(f,durationFrames*.69,durationFrames*.07));
 const point=(y,u)=>{const v=1-u;return {x:v**3*sx+3*v*v*u*width*.42+3*v*u*u*width*.5+u**3*tx,y:v**3*y+3*v*v*u*y+3*v*u*u*ty+u**3*ty};};
 return <AbsoluteFill>{sources.map((label,i)=>{const y=height*.22+(n<=1?height*.24:i*height*.48/(n-1)),pos=point(y,merge),size=130*(1-merge),phase=((Math.max(0,f)/durationFrames*2+i*.13)%1),q=point(y,phase);return <React.Fragment key={i}><svg width={width} height={height} style={{position:'absolute',inset:0}}><path d={'M'+sx+','+y+' C'+width*.42+','+y+' '+width*.5+','+ty+' '+tx+','+ty} fill='none' stroke={c.muted} strokeWidth={3} pathLength={1} strokeDasharray={1} strokeDashoffset={erase>0?-erase:1-draw} opacity={1-erase}/></svg><div style={{position:'absolute',left:pos.x-size/2,top:pos.y-size/2,width:size,height:size,borderRadius:999,background:c.panel,border:'2px solid '+c.line,display:'flex',alignItems:'center',justifyContent:'center',fontSize:34*(1-merge),opacity:1-merge,color:c.ink}}>{label}</div><div style={{position:'absolute',left:q.x-9,top:q.y-9,width:18,height:18,borderRadius:99,background:c.accent,opacity:packetOn}}/></React.Fragment>;})}<div style={{position:'absolute',left:tx-120,top:ty-75,width:240,height:150,borderRadius:theme?.geometry?.radius??22,background:c.panel,border:'3px solid '+c.accent,display:'flex',alignItems:'center',justifyContent:'center',fontSize:42,color:c.ink,boxShadow:theme?.geometry?.shadow}}>{target}</div></AbsoluteFill>;
}
