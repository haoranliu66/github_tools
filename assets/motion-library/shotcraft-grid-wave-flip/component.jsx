// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Adapted from Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// Modified 2026-10-02 for zimeiti: configurable content, project theme, local frames, offline assets.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md.
import React from 'react';
import {AbsoluteFill,Img,staticFile,useCurrentFrame,useVideoConfig,interpolate,Easing,spring} from 'remotion';
const clamp={extrapolateLeft:'clamp',extrapolateRight:'clamp'};
const progress=(f,a,d,easing=Easing.out(Easing.cubic))=>interpolate(f,[a,a+Math.max(1,d)],[0,1],{...clamp,easing});
const colors=theme=>theme?.palette??{ink:'#23252b',muted:'#72747c',accent:'#6557e8',panel:'#fff',line:'#d9d6cf'};
export default function GridWaveFlip({items=[],columns=3,cellWidth=480,cellHeight=230,gap=28,startFrame=20,staggerFrames=6,durationFrames=14,theme}) {
 const f=useCurrentFrame(),c=colors(theme),cols=Math.max(1,Math.floor(columns)),rows=Math.ceil(items.length/cols),lastDiagonal=Math.max(0,...items.map((_,i)=>Math.floor(i/cols)+i%cols));
 return <div style={{display:'grid',gridTemplateColumns:'repeat('+cols+','+cellWidth+'px)',gap,perspective:1200}}>{items.map((node,i)=>{
 const diagonal=Math.floor(i/cols)+i%cols,delay=startFrame+diagonal*staggerFrames,last=diagonal===lastDiagonal&&i===items.length-1;
 const angle=progress(f,delay,durationFrames,Easing.bezier(.35,0,.25,1))*(last?190:180)-(last?10*progress(f,delay+durationFrames,8):0),lift=Math.sin(Math.min(180,Math.max(0,angle))*Math.PI/180),base={position:'absolute',inset:0,borderRadius:theme?.geometry?.radius??14,backfaceVisibility:'hidden',WebkitBackfaceVisibility:'hidden',overflow:'hidden'};
 return <div key={i} style={{position:'relative',width:cellWidth,height:cellHeight}}><div style={{position:'absolute',inset:0,transformStyle:'preserve-3d',transform:'rotateX('+angle+'deg)',boxShadow:'0 '+(4+lift*22)+'px '+(10+lift*40)+'px #0002'}}><div style={{...base,background:c.line,display:'flex',alignItems:'center',justifyContent:'center'}}><span style={{height:26,width:26,borderRadius:99,background:c.muted}}/></div><div style={{...base,transform:'rotateX(180deg)',background:c.panel}}>{node}</div></div></div>;
 })}</div>;
}
