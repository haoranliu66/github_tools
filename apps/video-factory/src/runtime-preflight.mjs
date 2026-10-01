#!/usr/bin/env node
import {spawnSync} from 'node:child_process';
import {existsSync,mkdirSync,mkdtempSync,readFileSync,rmSync,writeFileSync} from 'node:fs';
import {dirname,join,resolve} from 'node:path';
import {writeRenderEntry} from './render-entry.mjs';
const ROOT=resolve(import.meta.dirname,'../../..');

export function compileVisualProgram(storyboard,resourcesDirectory) {
  const checkRoot=join(resourcesDirectory,'production','qa','runtime');mkdirSync(checkRoot,{recursive:true});
  const folder=mkdtempSync(join(checkRoot,'shot-check-'));
  let retained=false;
  try {
    const entry=writeRenderEntry(storyboard,resourcesDirectory,join(folder,'index.jsx'));
    const props=join(folder,'props.json');writeFileSync(props,JSON.stringify(storyboard));
    const result=spawnSync(process.execPath,[join(ROOT,'node_modules/@remotion/cli/remotion-cli.js'),'compositions',entry,`--props=${props}`,'--log=error'],
      {cwd:ROOT,encoding:'utf8',windowsHide:true,timeout:120_000,maxBuffer:4*1024*1024});
    if(result.error||result.status!==0) throw new Error(`Shot bundle failed: ${result.error?.message??(result.stderr+result.stdout).slice(-4000)}`);
    let cursor=0;const sampleFrames=[];
    for(const scene of storyboard.scenes){for(const beat of scene.visualBeats){sampleFrames.push(cursor+beat.startFrame,cursor+beat.startFrame+Math.floor((beat.endFrame-beat.startFrame)/2),cursor+beat.endFrame-1);}cursor+=Math.round(scene.duration*storyboard.meta.fps);}
    const selected=[...new Set(sampleFrames)].sort((a,b)=>a-b);
    const smoke=spawnSync(process.execPath,[join(ROOT,'node_modules/@remotion/cli/remotion-cli.js'),'render',entry,'KnowledgeShare',join(folder,'runtime-check'),
      '--sequence','--frames='+selected.join(','),'--public-dir='+join(resourcesDirectory,'production'),'--props='+props,'--concurrency=2','--scale=0.25','--log=error'],
      {cwd:ROOT,encoding:'utf8',windowsHide:true,timeout:120_000,maxBuffer:4*1024*1024});
    if(smoke.error||smoke.status!==0)throw new Error('Shot runtime smoke failed: '+(smoke.error?.message??(smoke.stderr+smoke.stdout).slice(-4000)));
    retained=true;
    return {status:'passed',output:result.stdout.trim(),runtimeCheck:{status:'passed',sampleCount:selected.length,coverage:'start, middle and end of every beat',visualJudgment:'pending-visual-preflight',directory:folder,frames:selected}};
  } finally {if(!retained)rmSync(folder,{recursive:true,force:true});}
}

