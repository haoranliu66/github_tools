// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Adapted from Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// Modified 2026-10-02 for zimeiti: configurable content, project theme, local frames, offline assets.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md.
import React from 'react';
import {AbsoluteFill,Img,staticFile,useCurrentFrame,useVideoConfig,interpolate,Easing,spring} from 'remotion';
const clamp={extrapolateLeft:'clamp',extrapolateRight:'clamp'};
const progress=(f,a,d,easing=Easing.out(Easing.cubic))=>interpolate(f,[a,a+Math.max(1,d)],[0,1],{...clamp,easing});
const colors=theme=>theme?.palette??{ink:'#23252b',muted:'#72747c',accent:'#6557e8',panel:'#fff',line:'#d9d6cf'};
export default function BlindsSlice({before,after,strips=12,startFrame=20,staggerFrames=2,durationFrames=10,theme}) {
 const f=useCurrentFrame(),{width,height}=useVideoConfig(),n=Math.max(1,Math.floor(strips)),w=width/n,end=startFrame+(n-1)*staggerFrames+Math.max(1,durationFrames);
 if(f>=end)return <AbsoluteFill>{after}</AbsoluteFill>;
 return <AbsoluteFill style={{overflow:'hidden',background:theme?.background}}>{Array.from({length:n},(_,i)=>{
 const x=i*w,p=progress(f,startFrame+i*staggerFrames,durationFrames,Easing.in(Easing.cubic));
 const slice=node=><div style={{position:'absolute',left:-x,top:0,width,height}}>{node}</div>;
 return <div key={i} style={{position:'absolute',left:x,top:0,width:w+.25,height,overflow:'hidden'}}><div style={{position:'absolute',inset:0,overflow:'hidden',transform:'scaleX('+(1-p)+')',transformOrigin:'0% 50%'}}>{slice(before)}</div><div style={{position:'absolute',inset:0,overflow:'hidden',transform:'scaleX('+p+')',transformOrigin:'100% 50%'}}>{slice(after)}</div>{p>0&&p<1&&<div style={{position:'absolute',top:0,bottom:0,left:w*(1-p),width:3,background:colors(theme).accent}}/>}</div>;
 })}</AbsoluteFill>;
}
