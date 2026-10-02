// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Adapted from Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// Modified 2026-10-02 for zimeiti: configurable content, project theme, local frames, offline assets.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md.
import React from 'react';
import {AbsoluteFill,Img,staticFile,useCurrentFrame,useVideoConfig,interpolate,Easing,spring} from 'remotion';
const clamp={extrapolateLeft:'clamp',extrapolateRight:'clamp'};
const progress=(f,a,d,easing=Easing.out(Easing.cubic))=>interpolate(f,[a,a+Math.max(1,d)],[0,1],{...clamp,easing});
const colors=theme=>theme?.palette??{ink:'#23252b',muted:'#72747c',accent:'#6557e8',panel:'#fff',line:'#d9d6cf'};
export default function FlashCut({startFrame=20,durationFrames=10,color='rgba(255,248,235,.98)',peak=.85}) {
 const f=useCurrentFrame(),d=Math.max(1,durationFrames),o=interpolate(f,[startFrame,startFrame+d*.4,startFrame+d],[0,peak,0],clamp);
 return <AbsoluteFill style={{pointerEvents:'none',opacity:o,background:'radial-gradient(ellipse at 50% 45%,'+color+',transparent 80%)'}}/>;
}
