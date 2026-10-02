// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Adapted from Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// Modified 2026-10-02 for zimeiti: configurable content, project theme, local frames, offline assets.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md.
import React from 'react';
import {AbsoluteFill,Img,staticFile,useCurrentFrame,useVideoConfig,interpolate,Easing,spring} from 'remotion';
const clamp={extrapolateLeft:'clamp',extrapolateRight:'clamp'};
const progress=(f,a,d,easing=Easing.out(Easing.cubic))=>interpolate(f,[a,a+Math.max(1,d)],[0,1],{...clamp,easing});
const colors=theme=>theme?.palette??{ink:'#23252b',muted:'#72747c',accent:'#6557e8',panel:'#fff',line:'#d9d6cf'};
export default function RowEmbed({items=[],startFrame=12,staggerFrames=9,durationFrames=12,gap=18,width=1400,theme}) {
 const f=useCurrentFrame(),c=colors(theme);
 return <div style={{display:'flex',flexDirection:'column',gap,width}}>{items.map((node,i)=>{const cue=startFrame+i*staggerFrames,land=cue+Math.max(1,durationFrames),p=progress(f,cue,durationFrames,Easing.bezier(.3,0,.25,1)),air=1-p,scale=f<land?1.06-.065*p:.995+.005*progress(f,land,4,Easing.out(Easing.quad)),spread=progress(f,land,5),seam=1-progress(f,land+2,6);
 return <div key={i} style={{position:'relative',opacity:progress(f,cue,3),transform:'perspective(900px) translateY('+(-120*air)+'px) rotateX('+(16*air)+'deg) scale('+scale+')',background:c.panel,borderRadius:theme?.geometry?.radius??10,boxShadow:'0 '+(30*air)+'px '+(60*air)+'px #0003'}}>{node}{f>=land&&f<land+8&&<div style={{position:'absolute',bottom:0,left:(1-spread)*50+'%',width:spread*100+'%',height:3,background:c.accent,opacity:seam}}/>}</div>;
 })}</div>;
}
