#!/usr/bin/env node
import {copyFileSync,mkdirSync,readFileSync,writeFileSync,existsSync} from 'node:fs';
import {join,resolve,extname} from 'node:path';
import {refreshProductionReferenceIndex} from './reference-index.mjs';
import {spawnSync} from 'node:child_process';
import {hash,loadLibraries,safeResourcePath,validateCreativeSource} from './creative-plan.mjs';
const ROOT=resolve(import.meta.dirname,'../../..');
const arg=name=>{const i=process.argv.indexOf(name);return i<0?null:process.argv[i+1];};
const command=process.argv[2]??'list';
try {
  if(command==='list')console.log(JSON.stringify(loadLibraries(ROOT),null,2));
  else if(command==='demo') {
    const catalog=loadLibraries(ROOT),id=arg('--id'),selected=id?catalog.motions.filter(m=>m.id===id):catalog.motions;
    if(!selected.length)throw new Error('Unknown motion.');
    for(const m of selected) {
      if(!m.demoEntry&&existsSync(safeResourcePath(ROOT,m.demo))){console.log('retained demo: '+m.id);continue;}
      const output=safeResourcePath(ROOT,m.demo);mkdirSync(resolve(output,'..'),{recursive:true});
      const props=join(resolve(output,'..'),'props.json');writeFileSync(props,JSON.stringify({id:m.id}));
      const entry=m.demoEntry??'apps/video-factory/remotion/MaterialDemo.jsx';
      const r=spawnSync(process.execPath,[join(ROOT,'node_modules/@remotion/cli/remotion-cli.js'),'render',safeResourcePath(ROOT,entry),'MaterialDemo',output,'--props='+props,'--scale=0.5','--concurrency=2','--log=error'],{cwd:ROOT,encoding:'utf8',windowsHide:true,timeout:180000,maxBuffer:6*1024*1024});
      if(r.error||r.status!==0)throw new Error('Material demo failed '+m.id+': '+(r.error?.message??r.stderr+r.stdout).slice(-2000));
      console.log('demo: '+m.id);
    }
  } else if(command==='add') {
    const file=arg('--request');if(!file)throw new Error('Usage: video:library add --request FILE (id, module, demo, example, supports)');
    const a=JSON.parse(readFileSync(resolve(file),'utf8'));
    if(!/^[a-z][a-z0-9-]+$/u.test(a.id)||!a.supports?.length||!a.example?.trim()||!a.module||!a.demo)throw new Error('A material needs runnable code, actual effect demo, usage example and expression scenarios.');
    let source=readFileSync(resolve(a.module),'utf8');validateCreativeSource(source);
    source=source.replace(/(['"])\.\/(?:motion-library|shot-runtime)\.jsx\1/gu,"'../../../apps/video-factory/remotion/MaterialRuntime.jsx'");
    if(!existsSync(resolve(a.demo))||!['.mp4','.webm','.gif'].includes(extname(a.demo)))throw new Error('Retained playable effect demo is required.');
    const filePath=join(ROOT,'config/motion-library.json'),catalog=JSON.parse(readFileSync(filePath,'utf8'));
    if(a.reuseScope==='project'&&!/^[^/]+\/[^/]+$/u.test(a.sourceProject??''))throw new Error('Project-scoped materials require sourceProject owner/name.');
    if(catalog.motions.some(m=>m.id===a.id))throw new Error('Material ID already exists.');
    const directory=join(ROOT,'assets/motion-library',a.id);mkdirSync(directory,{recursive:true});
    writeFileSync(join(directory,'component.jsx'),source);copyFileSync(resolve(a.demo),join(directory,'demo'+extname(a.demo)));writeFileSync(join(directory,'usage.md'),a.example);
    catalog.motions.push({id:a.id,exportName:'Material_'+a.id.replaceAll('-','_'),module:`assets/motion-library/${a.id}/component.jsx`,codePath:`assets/motion-library/${a.id}/component.jsx`,sha256:hash(source),
      demo:`assets/motion-library/${a.id}/demo${extname(a.demo)}`,usage:`assets/motion-library/${a.id}/usage.md`,supports:a.supports,dependencies:a.dependencies??['react','remotion'],reuseScope:a.reuseScope??'universal',...(a.reuseScope==='project'?{sourceProject:a.sourceProject}:{})});
    writeFileSync(filePath,JSON.stringify(catalog,null,2)+'\n');refreshProductionReferenceIndex(ROOT);console.log('Added production material '+a.id);
  }else throw new Error('Usage: video:library list|demo|add. Review judgments belong outside the material library.');
}catch(e){console.error(e.message);process.exitCode=1;}
