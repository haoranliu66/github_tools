// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Adapted from Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// Modified 2026-10-02 for zimeiti: configurable content, project theme, local frames, offline assets.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md.
import React from 'react';
import {AbsoluteFill,Img,staticFile,useCurrentFrame,useVideoConfig,interpolate,Easing,spring} from 'remotion';
const clamp={extrapolateLeft:'clamp',extrapolateRight:'clamp'};
const progress=(f,a,d,easing=Easing.out(Easing.cubic))=>interpolate(f,[a,a+Math.max(1,d)],[0,1],{...clamp,easing});
const colors=theme=>theme?.palette??{ink:'#23252b',muted:'#72747c',accent:'#6557e8',panel:'#fff',line:'#d9d6cf'};
export default function TimelineTravel({items=[],startFrame=12,travelFrames=92,gap=1400,zoomPeak=1.18,theme}) {
 const f=useCurrentFrame(),{width,height,fps}=useVideoConfig(),c=colors(theme),axis=height*.68,total=Math.max(0,items.length-1)*gap;
 const camAt=g=>interpolate(progress(g,startFrame,travelFrames,Easing.linear),[0,.15,.88,1],[0,.055,.9,1],{easing:Easing.inOut(Easing.quad)})*total;
 const cam=camAt(f),zoom=1+(zoomPeak-1)*progress(f,startFrame+travelFrames,10);
 return <AbsoluteFill style={{overflow:'hidden'}}><AbsoluteFill style={{transform:'scale('+zoom+')',transformOrigin:'50% 62%'}}><div style={{position:'absolute',width:width+total,height,transform:'translateX('+(-cam)+'px)'}}><div style={{position:'absolute',left:width/2-180,top:axis,width:total+360,height:4,background:c.line}}/>{items.map((item,i)=>{
 let pop=startFrame;for(let g=startFrame;g<=startFrame+travelFrames;g++)if(camAt(g)>=i*gap){pop=g-6;break;}
 const s=spring({frame:f-pop,fps,config:{damping:13,stiffness:160,mass:.9},durationInFrames:26});
 return <div key={i} style={{position:'absolute',left:width/2+i*gap,top:0}}><div style={{position:'absolute',left:-3,top:axis-20,height:40,width:6,background:c.accent}}/><div style={{position:'absolute',left:-190,top:axis+42,width:380,textAlign:'center',fontSize:46,color:c.ink}}>{item.label}</div>{f>=pop&&<div style={{position:'absolute',left:-240,top:axis-300,width:480,height:260,transform:'scaleY('+s+') scaleX('+(0.6+.4*s)+')',transformOrigin:'50% 100%',opacity:Math.min(1,s*2)}}>{item.content}</div>}</div>;
 })}</div></AbsoluteFill></AbsoluteFill>;
}
