import {mkdirSync,readFileSync,writeFileSync} from 'node:fs';
import {join,resolve,extname} from 'node:path';
import {spawnSync} from 'node:child_process';
import ffmpeg from '@ffmpeg-installer/ffmpeg';
import {hash} from './creative-plan.mjs';

const ROOT=resolve(import.meta.dirname,'../../..');
export const selectedMaterialIdentity=assets=>hash(JSON.stringify(assets.map(a=>({id:a.id,kind:a.kind,source:a.source,purpose:a.purpose}))));

export function materialInspectionSchema(packageSchema) {
  const text={type:'string',minLength:1};
  return {type:'object',additionalProperties:false,required:['package','observations'],properties:{package:packageSchema,
    observations:{type:'array',items:{type:'object',additionalProperties:false,required:['assetId','sha256','evidenceIds','visualObservation'],
      properties:{assetId:text,sha256:text,evidenceIds:{type:'array',minItems:1,items:text},visualObservation:text}}}}};
}
export function validateSelectedMaterialInspection(response,records) {
  if(!response.package||!Array.isArray(response.observations)||response.observations.length!==records.length)throw new Error('Material handoff requires observations of every selected asset.');
  const seen=new Set();
  for(const observation of response.observations) {
    const record=records.find(r=>r.id===observation.assetId),expected=record?.evidence.map(e=>e.id).sort();
    if(!record||seen.has(record.id)||observation.sha256!==record.sha256||!observation.visualObservation?.trim()||!Array.isArray(observation.evidenceIds)||JSON.stringify([...observation.evidenceIds].sort())!==JSON.stringify(expected))throw new Error('Material observation is missing, stale or refers to unseen evidence.');
    seen.add(record.id);
  }
  return response.package;
}

// Only selected local assets are decoded; no candidate catalog or third-party code is executed.
export function prepareSelectedMaterialEvidence(assets,{resourcesDirectory,evidenceDirectory,runner=spawnSync}) {
  mkdirSync(evidenceDirectory,{recursive:true});
  const records=[];
  for(const asset of assets) {
    const extension=asset.kind==='svg'?'.svg':extname(asset.source).toLowerCase();
    const file=`visual-assets/${asset.id}${extension}`,path=join(resourcesDirectory,file),sha256=hash(readFileSync(path));
    const movie=['.mp4','.webm','.mov','.m4v'].includes(extension),animated=movie||extension==='.gif';
    let width,height,durationSeconds=null;
    if(extension==='.svg') {
      const svg=readFileSync(path,'utf8');
      if(/<script|<foreignObject|\bon\w+\s*=|(?:href|url)\s*[=(]["']?(?:https?:|\/\/)|<!DOCTYPE/iu.test(svg))throw new Error('Selected SVG must be self-contained and offline: '+asset.id);
      const view=svg.match(/viewBox\s*=\s*["']([\d.\s,-]+)["']/u)?.[1].split(/[\s,]+/u).map(Number);
      width=view?.[2]??Number(svg.match(/\bwidth\s*=\s*["'](\d+(?:\.\d+)?)/u)?.[1]);height=view?.[3]??Number(svg.match(/\bheight\s*=\s*["'](\d+(?:\.\d+)?)/u)?.[1]);
    }else {
      const probe=runner(ffmpeg.path,['-hide_banner','-i',path],{encoding:'utf8',windowsHide:true,maxBuffer:2*1024*1024,timeout:30000});
      if(probe.error)throw probe.error;
      const info=probe.stderr??'',dimensions=info.match(/Video:[^\n]*?\b(\d{1,6})x(\d{1,6})\b/u),duration=info.match(/Duration:\s*(\d+):(\d+):(\d+(?:\.\d+)?)/u);
      width=Number(dimensions?.[1]);height=Number(dimensions?.[2]);
      if(animated&&duration)durationSeconds=Number(duration[1])*3600+Number(duration[2])*60+Number(duration[3]);
    }
    if(!Number.isFinite(width)||!Number.isFinite(height)||width<=0||height<=0)throw new Error('Selected material has no decodable dimensions: '+asset.id);
    let times=[0];
    if(animated) {
      const decoded=runner(ffmpeg.path,['-hide_banner','-i',path,'-vf','showinfo','-an','-progress','pipe:1','-nostats','-f','null','-'],{encoding:'utf8',windowsHide:true,maxBuffer:16*1024*1024,timeout:120000});
      if(decoded.error||decoded.status!==0)throw new Error('Selected animation cannot be decoded: '+asset.id);
      if(!(durationSeconds>0))durationSeconds=Number([...decoded.stdout.matchAll(/out_time_us=(\d+)/gu)].at(-1)?.[1])/1e6;
      const frameTimes=[...decoded.stderr.matchAll(/\bpts_time:([\d.]+)/gu)].map(m=>Number(m[1]));
      if(!(durationSeconds>0)||!frameTimes.length)throw new Error('Selected animated material has no measured duration or frames: '+asset.id);
      const middle=frameTimes.reduce((best,time)=>Math.abs(time-durationSeconds*.5)<Math.abs(best-durationSeconds*.5)?time:best,frameTimes[0]);
      times=[...new Set([frameTimes[0],middle,frameTimes.at(-1)])];
    }
    const evidence=[];
    for(const [index,timeSeconds] of times.entries()) {
      const image=join(evidenceDirectory,`${asset.id}-${index}.png`);
      if(extension==='.svg') {
        const entry=join(evidenceDirectory,`${asset.id}-entry.jsx`);
        writeFileSync(entry,`import React from 'react';import {Composition,Img,AbsoluteFill,registerRoot,staticFile} from 'remotion';const View=()=> <AbsoluteFill style={{background:'#ececec',justifyContent:'center',alignItems:'center'}}><Img src={staticFile(${JSON.stringify(file)})} style={{maxWidth:'95%',maxHeight:'95%',objectFit:'contain'}}/></AbsoluteFill>;registerRoot(()=> <Composition id="Material" component={View} durationInFrames={1} fps={30} width={1280} height={720}/>);`);
        const rendered=runner(process.execPath,[join(ROOT,'node_modules/@remotion/cli/remotion-cli.js'),'still',entry,'Material',image,'--public-dir='+resourcesDirectory,'--log=error'],{cwd:ROOT,encoding:'utf8',windowsHide:true,maxBuffer:3*1024*1024,timeout:120000});
        if(rendered.error||rendered.status!==0)throw new Error('Selected SVG preview failed: '+(rendered.error?.message??rendered.stderr+rendered.stdout).slice(-2000));
      }else {
        const rendered=runner(ffmpeg.path,['-y','-hide_banner','-loglevel','error','-ss',String(timeSeconds),'-i',path,'-frames:v','1','-vf','scale=min(1280\\,iw):-2',image],{encoding:'utf8',windowsHide:true,maxBuffer:2*1024*1024,timeout:60000});
        if(rendered.error||rendered.status!==0)throw new Error('Selected material preview failed: '+(rendered.error?.message??rendered.stderr));
      }
      evidence.push({id:`${asset.id}-${index}`,file:image,timeSeconds,sha256:hash(readFileSync(image))});
    }
    records.push({id:asset.id,kind:asset.kind,purpose:asset.purpose,file,sha256,width,height,durationSeconds,animated,evidence});
  }
  writeFileSync(join(evidenceDirectory,'manifest.json'),JSON.stringify({selectionDigest:selectedMaterialIdentity(assets),assets:records},null,2)+'\n');
  return records;
}
