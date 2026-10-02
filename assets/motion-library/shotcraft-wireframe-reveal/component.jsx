// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Adapted from Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// Modified 2026-10-02 for zimeiti: configurable content, project theme, local frames, offline assets.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md.
import React from 'react';
import {AbsoluteFill,Img,staticFile,useCurrentFrame,useVideoConfig,interpolate,Easing,spring} from 'remotion';
const clamp={extrapolateLeft:'clamp',extrapolateRight:'clamp'};
const progress=(f,a,d,easing=Easing.out(Easing.cubic))=>interpolate(f,[a,a+Math.max(1,d)],[0,1],{...clamp,easing});
const colors=theme=>theme?.palette??{ink:'#23252b',muted:'#72747c',accent:'#6557e8',panel:'#fff',line:'#d9d6cf'};
export default function WireframeReveal({paths=[],children,startFrame=10,drawFrames=34,staggerFrames=4,scanStartFrame=70,scanFrames=30,theme}) {
 const f=useCurrentFrame(),{width,height}=useVideoConfig(),c=colors(theme),scan=progress(f,scanStartFrame,scanFrames,Easing.bezier(.55,0,.25,1));
 return <AbsoluteFill>{scan<1&&<svg width={width} height={height} viewBox={'0 0 '+width+' '+height} style={{position:'absolute',inset:0}}>{paths.map((d,i)=>{const p=progress(f,startFrame+i*staggerFrames,drawFrames);return <path key={i} d={d} fill='none' stroke={c.muted} strokeWidth={3} pathLength={1} strokeDasharray={1} strokeDashoffset={1-p} opacity={p>0?1:0}/>;})}</svg>}{scan>0&&<AbsoluteFill style={scan<1?{clipPath:'inset(0 '+((1-scan)*100)+'% 0 0)'}:undefined}>{children}</AbsoluteFill>}{scan>0&&scan<1&&<div style={{position:'absolute',top:0,bottom:0,left:width*scan-2,width:4,background:c.accent,boxShadow:'0 0 18px '+c.accent}}/>}</AbsoluteFill>;
}
