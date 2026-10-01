#!/usr/bin/env node
import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import {join,resolve,dirname} from 'node:path';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {loadLibraries,safeResourcePath} from './creative-plan.mjs';
const ROOT=resolve(import.meta.dirname,'../../..');
export function writeShotPreviewHarness(directory,{sourceFile,durationInFrames,fps,style,assets=[],scene={},beat={},fullName=null}) {
  mkdirSync(directory,{recursive:true});
  const path=p=>JSON.stringify(resolve(p).replaceAll('\\','/'));
  const bridge=`export * from ${path(join(ROOT,'apps/video-factory/remotion/MotionLibrary.jsx'))};\nexport {FrameReveal,FrameAnnotation} from ${path(join(ROOT,'apps/video-factory/remotion/RemotionEffects.jsx'))};\n`;
  const extra=loadLibraries(ROOT,{fullName}).motions.filter(m=>m.module&&(m.reuseScope!=='project'||m.sourceProject===fullName)).map(m=>`export {default as ${m.exportName}} from ${path(safeResourcePath(ROOT,m.module))};`).join('\n');
  writeFileSync(join(dirname(sourceFile),'motion-library.jsx'),bridge+extra);writeFileSync(join(dirname(sourceFile),'shot-runtime.jsx'),bridge+extra);
  const props={durationInFrames,fps,style,assets,scene,beat,accent:style.palette.accent};
  const entry=join(directory,'entry.jsx');
  writeFileSync(entry,`import React from 'react';import {AbsoluteFill,Composition,registerRoot,useCurrentFrame} from 'remotion';import Shot from ${path(sourceFile)};\nconst View=props=><AbsoluteFill style={{background:props.style.background,color:props.style.palette.ink,fontFamily:props.style.typography.body}}><Shot {...props} frame={useCurrentFrame()}/></AbsoluteFill>;\nregisterRoot(()=> <Composition id="ShotPreview" component={View} durationInFrames={${durationInFrames}} fps={${fps}} width={1920} height={1080} defaultProps={${JSON.stringify(props)}}/>);`);
  return entry;
}
export function renderShotPreview(assignmentFile,{runner=spawnSync}={}) {
  const assignment=JSON.parse(readFileSync(assignmentFile,'utf8'));const directory=join(dirname(assignmentFile),'preview');
  const entry=writeShotPreviewHarness(directory,assignment);const output=join(directory,'preview.mp4');
  const run=args=>{const r=runner(process.execPath,[join(ROOT,'node_modules/@remotion/cli/remotion-cli.js'),...args],{cwd:ROOT,encoding:'utf8',windowsHide:true,maxBuffer:6*1024*1024,timeout:180000});if(r.error||r.status!==0)throw new Error((r.error?.message??r.stderr+r.stdout).slice(-3500));};
  run(['render',entry,'ShotPreview',output,'--public-dir='+assignment.publicDirectory,'--scale=0.5','--concurrency=2','--log=error']);
  const image=join(directory,'middle.png');run(['still',entry,'ShotPreview',image,'--public-dir='+assignment.publicDirectory,'--frame='+Math.floor(assignment.durationInFrames/2),'--scale=0.75','--log=error']);
  return {output,image};
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url))try{console.log(JSON.stringify(renderShotPreview(resolve(process.argv[2]))));}catch(e){console.error(e.message);process.exitCode=1;}
