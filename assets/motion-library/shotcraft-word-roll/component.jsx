// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Adapted from Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// Modified 2026-10-02 for zimeiti: configurable content, project theme, local frames, offline assets.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md.
import React from 'react';
import {AbsoluteFill,Img,staticFile,useCurrentFrame,useVideoConfig,interpolate,Easing,spring} from 'remotion';
const clamp={extrapolateLeft:'clamp',extrapolateRight:'clamp'};
const progress=(f,a,d,easing=Easing.out(Easing.cubic))=>interpolate(f,[a,a+Math.max(1,d)],[0,1],{...clamp,easing});
const colors=theme=>theme?.palette??{ink:'#23252b',muted:'#72747c',accent:'#6557e8',panel:'#fff',line:'#d9d6cf'};
export default function WordRoll({prefix='',words=[],startFrame=20,stepFrames=30,rollFrames=16,rowHeight=100,width=600,fontSize=72,theme}) {
 const f=useCurrentFrame(),c=colors(theme);let p=0;
 const ease=u=>{const outQuint=1-(1-u)**5,v=u-1,outBack=1+2.70158*v**3+1.70158*v**2;return .7*outQuint+.3*outBack;};
 for(let i=1;i<words.length;i++)p+=ease(progress(f,startFrame+(i-1)*Math.max(rollFrames,stepFrames),rollFrames,Easing.linear));
 return <div style={{display:'flex',alignItems:'center',gap:30,fontWeight:800,fontSize,color:c.ink}}><span>{prefix}</span><div style={{position:'relative',height:rowHeight*3,width,overflow:'hidden'}}><div style={{position:'absolute',inset:'0 auto auto 0',transform:'translateY('+(rowHeight-p*rowHeight)+'px)'}}>{words.map((word,i)=>{const d=Math.abs(i-p);return <div key={i} style={{height:rowHeight,display:'flex',alignItems:'center',filter:'blur('+Math.min(8,d*5)+'px)',opacity:Math.max(.12,1-d*.65),color:d<.22?c.accent:c.muted}}>{word}</div>;})}</div></div></div>;
}
