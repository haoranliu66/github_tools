// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Adapted from Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// Modified 2026-10-02 for zimeiti: configurable content, project theme, local frames, offline assets.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md.
import React from 'react';
import {AbsoluteFill,Img,staticFile,useCurrentFrame,useVideoConfig,interpolate,Easing,spring} from 'remotion';
const clamp={extrapolateLeft:'clamp',extrapolateRight:'clamp'};
const progress=(f,a,d,easing=Easing.out(Easing.cubic))=>interpolate(f,[a,a+Math.max(1,d)],[0,1],{...clamp,easing});
const colors=theme=>theme?.palette??{ink:'#23252b',muted:'#72747c',accent:'#6557e8',panel:'#fff',line:'#d9d6cf'};
export default function SpotlightHero({children,note,width=920,height=450,startFrame=0,durationFrames=150,theme}) {
 const f=useCurrentFrame()-startFrame,c=colors(theme),d=Math.max(1,durationFrames),p=f/d;
 const x=interpolate(p,[0,.05,.12,.17,.22,.35],[25,25,70,42,50,50],clamp),y=interpolate(p,[0,.05,.12,.17,.22,.35],[30,30,45,60,50,50],clamp);
 const lift=progress(f,d*.35,d*.08,Easing.bezier(.2,1.25,.3,1))*(1-progress(f,d*.83,d*.12));
 const bob=p>.43&&p<.83?Math.sin((p-.43)*Math.PI*10)*5:0,beam=progress(f,d*.44,d*.38,Easing.linear);
 return <AbsoluteFill style={{alignItems:'center',justifyContent:'center',overflow:'hidden'}}><div style={{position:'relative',width,height,perspective:1200}}><div style={{position:'absolute',inset:0,transform:'rotateY('+(lift*18)+'deg) rotateX('+(lift*6)+'deg) translateY('+(-lift*45+bob)+'px) scale('+(1+lift*.08)+')',transformStyle:'preserve-3d',background:c.panel,borderRadius:theme?.geometry?.radius??24,boxShadow:'0 '+(10+lift*40)+'px '+(25+lift*50)+'px #0003'}}>{children}{p>.44&&p<.83&&<svg width={width} height={height} style={{position:'absolute',inset:0,overflow:'visible',pointerEvents:'none'}}><rect x={3} y={3} width={width-6} height={height-6} rx={theme?.geometry?.radius??24} pathLength={1} stroke={c.accent} strokeWidth={5} strokeDasharray='.14 1' strokeDashoffset={-beam*2} fill='none'/></svg>}</div>{note&&<div style={{position:'absolute',left:0,right:0,bottom:-100,textAlign:'center',fontSize:42,color:c.ink,opacity:lift}}>{note}</div>}</div><AbsoluteFill style={{pointerEvents:'none',background:'radial-gradient(600px 450px at '+x+'% '+y+'%,transparent 35%,#0003 100%)',opacity:progress(f,0,12)}}/></AbsoluteFill>;
}
