import React from 'react';
import {AbsoluteFill,Composition,Img,OffthreadVideo,registerRoot,staticFile} from 'remotion';
const Asset=({src})=><AbsoluteFill style={{background:'#f5f2eb',alignItems:'center',justifyContent:'center'}}>{/\.(mp4|webm|mov|m4v)$/i.test(src)?<OffthreadVideo src={staticFile(src)} style={{maxWidth:'100%',maxHeight:'100%',objectFit:'contain'}}/>:<Img src={staticFile(src)} style={{maxWidth:'100%',maxHeight:'100%',objectFit:'contain'}}/>}</AbsoluteFill>;
registerRoot(()=> <Composition id="AssetPreview" component={Asset} durationInFrames={90} fps={30} width={1280} height={720} defaultProps={{src:'image.svg'}}/>);
