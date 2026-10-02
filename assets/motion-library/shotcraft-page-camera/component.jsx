// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Adapted from Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// Modified 2026-10-02 for zimeiti: configurable content, project theme, local frames, offline assets.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md.
import React from 'react';
import {AbsoluteFill,Img,staticFile,useCurrentFrame,useVideoConfig,interpolate,Easing,spring} from 'remotion';
const clamp={extrapolateLeft:'clamp',extrapolateRight:'clamp'};
const progress=(f,a,d,easing=Easing.out(Easing.cubic))=>interpolate(f,[a,a+Math.max(1,d)],[0,1],{...clamp,easing});
const colors=theme=>theme?.palette??{ink:'#23252b',muted:'#72747c',accent:'#6557e8',panel:'#fff',line:'#d9d6cf'};
export default function PageCamera({src,children,pageWidth=1920,pageH=1080,keys=[{frame:0,cx:960,cy:540,zoom:1}],theme,frame:frameProp}) {
 const ownFrame=useCurrentFrame(),f=frameProp??ownFrame,{width,height}=useVideoConfig();
 if(!keys.length||keys.some((k,i)=>!Number.isFinite(k.frame)||!Number.isFinite(k.cx)||!Number.isFinite(k.cy)||!Number.isFinite(k.zoom)||k.zoom<=0||(k.persp!==undefined&&(!Number.isFinite(k.persp)||k.persp<=0))||(i>0&&k.frame<=keys[i-1].frame)))throw new Error('PageCamera needs ordered finite keys and positive zoom/perspective.');
 let a=keys[0],b=a;
 if(f>=keys.at(-1).frame)a=b=keys.at(-1);
 else if(f>keys[0].frame){for(let i=0;i<keys.length-1;i++)if(f>=keys[i].frame&&f<keys[i+1].frame){a=keys[i];b=keys[i+1];break;}}
 const t=a===b?0:progress(f,a.frame,b.frame-a.frame,Easing.bezier(.33,0,.15,1)),lerp=(k,def=0)=>(a[k]??def)+((b[k]??def)-(a[k]??def))*t;
 const cx=lerp('cx'),cy=lerp('cy'),zoom=lerp('zoom',1);
 return <AbsoluteFill style={{overflow:'hidden',background:theme?.background??'#faf7f2'}}><div style={{position:'absolute',inset:0,perspective:lerp('persp',1400)*zoom,perspectiveOrigin:width/2+'px '+height/2+'px'}}><div style={{position:'absolute',width:pageWidth,height:pageH,zoom,transform:'translate('+(width/2/zoom-cx)+'px,'+(height/2/zoom-cy)+'px) rotateY('+lerp('rotY')+'deg) rotateX('+lerp('rotX')+'deg) rotateZ('+lerp('rotZ')+'deg)',transformOrigin:cx+'px '+cy+'px',transformStyle:'preserve-3d'}}>{src&&<Img src={staticFile(src)} style={{position:'absolute',width:pageWidth,height:pageH}}/>}{children}</div></div></AbsoluteFill>;
}
