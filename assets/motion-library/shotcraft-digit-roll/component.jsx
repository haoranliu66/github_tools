// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Adapted from Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// Modified 2026-10-02 for zimeiti: configurable content, project theme, local frames, offline assets.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md.
import React from 'react';
import {AbsoluteFill,Img,staticFile,useCurrentFrame,useVideoConfig,interpolate,Easing,spring} from 'remotion';
const clamp={extrapolateLeft:'clamp',extrapolateRight:'clamp'};
const progress=(f,a,d,easing=Easing.out(Easing.cubic))=>interpolate(f,[a,a+Math.max(1,d)],[0,1],{...clamp,easing});
const colors=theme=>theme?.palette??{ink:'#23252b',muted:'#72747c',accent:'#6557e8',panel:'#fff',line:'#d9d6cf'};
export default function DigitRoll({value='',startFrame=0,staggerFrames=4,durationFrames=22,fontSize=76,color,theme}) {
 const f=useCurrentFrame(),h=fontSize*1.15,c=color??colors(theme).accent;
 return <span style={{display:'inline-flex',height:h,overflow:'hidden',verticalAlign:'bottom',fontFamily:theme?.typography?.code??'Consolas,monospace',color:c}}>{String(value).split('').map((ch,i)=>{
 const target='0123456789'.indexOf(ch);if(target<0)return <span key={i} style={{fontSize,lineHeight:h+'px'}}>{ch}</span>;
 const t=progress(f,startFrame+i*staggerFrames,durationFrames,Easing.bezier(.25,.8,.25,1));
 return <span key={i} style={{display:'inline-block',height:h,width:fontSize*.65,textAlign:'center'}}><span style={{display:'block',transform:'translateY('+(-(10+target)*t*h)+'px)'}}>{'01234567890123456789'.split('').map((d,j)=><span key={j} style={{display:'block',fontSize,lineHeight:h+'px',height:h,fontVariantNumeric:'tabular-nums'}}>{d}</span>)}</span></span>;
 })}</span>;
}
