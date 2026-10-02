// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Adapted from Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// Modified 2026-10-02 for zimeiti: configurable content, project theme, local frames, offline assets.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md.
import React from 'react';
import {AbsoluteFill,Img,staticFile,useCurrentFrame,useVideoConfig,interpolate,Easing,spring} from 'remotion';
const clamp={extrapolateLeft:'clamp',extrapolateRight:'clamp'};
const progress=(f,a,d,easing=Easing.out(Easing.cubic))=>interpolate(f,[a,a+Math.max(1,d)],[0,1],{...clamp,easing});
const colors=theme=>theme?.palette??{ink:'#23252b',muted:'#72747c',accent:'#6557e8',panel:'#fff',line:'#d9d6cf'};
export default function ClockWipe({before,after,startFrame=30,durationFrames=60,color,theme}) {
 const f=useCurrentFrame(),{width,height}=useVideoConfig(),p=progress(f,startFrame,durationFrames,Easing.linear),cx=width/2,cy=height/2,r=Math.hypot(width,height),angle=p*Math.PI*2;
 const points=[[cx,cy],...Array.from({length:73},(_,i)=>[cx+r*Math.sin(angle*i/72),cy-r*Math.cos(angle*i/72)])].map(q=>q.join('px ')+'px').join(',');
 return <AbsoluteFill>{p<1&&<AbsoluteFill>{before}</AbsoluteFill>}{f>=startFrame&&<AbsoluteFill style={p<1?{clipPath:'polygon('+points+')'}:undefined}>{after}</AbsoluteFill>}{f>=startFrame&&p<1&&<svg width={width} height={height} style={{position:'absolute',inset:0,pointerEvents:'none'}}><line x1={cx} y1={cy} x2={cx+r*Math.sin(angle)} y2={cy-r*Math.cos(angle)} stroke={color??colors(theme).accent} strokeWidth={7}/></svg>}</AbsoluteFill>;
}
