#!/usr/bin/env node
import {mkdirSync,readFileSync,writeFileSync,existsSync} from 'node:fs';
import {join,resolve,extname} from 'node:path';
import {refreshProductionReferenceIndex} from './reference-index.mjs';
import {searchMaterials} from './material-search.mjs';
import {findStyle,searchStyles,styleMarkdown} from './style-library.mjs';
import {spawnSync} from 'node:child_process';
import {hash,safeResourcePath,validateCreativeSource} from './creative-plan.mjs';
import {readMotionCatalog,findMaterial,readMaterialUsage,materialDetails,checkMaterial,validateMaterialUsage,validateRetrievalDescription} from './material-usage.mjs';
const ROOT=resolve(import.meta.dirname,'../../..');
const arg=name=>{const i=process.argv.indexOf(name);return i<0?null:process.argv[i+1];};
const command=process.argv[2]??'help',options={fullName:arg('--repo')};
const help=`Motion reuse: search by visual description → usage for selected ID → implement and preview.
search --query TEXT [--queries FILE] [--repo owner/name] [--limit 5] [--type style]
style --id ID [--section purpose|color|typography|composition|materials|motion|captions|adaptation|tokens]
usage --id ID [--repo owner/name] [--section purpose|example|parameters|assets|timing|references]
show --id ID [--repo owner/name]                 selected resource paths
audio --id ID [--repo owner/name]                optional audio file/cue metadata, no embedded bytes
references --query TOPIC [--limit 5]            selected Remotion reference paths
list [--offset 0] [--limit 20] [--repo owner/name]  description-only maintenance page
demo --id ID [--repo owner/name]                retain/rebuild this selected demo
check --id ID [--repo owner/name]               validate usage and local resources
add --request FILE                             description, module, demo, usageFile, supports
Do not preload the whole library or source/review archives. Read selected usage before reuse.`;
try {
  if(command==='help'||process.argv.includes('--help'))console.log(help);
  else if(command==='list') {
    const catalog=readMotionCatalog(ROOT,options),offset=Number(arg('--offset')??0),limit=Number(arg('--limit')??20);
    if(!Number.isInteger(offset)||offset<0||!Number.isInteger(limit)||limit<1||limit>50)throw new Error('List needs a nonnegative offset and limit from 1 to 50.');
    console.log(JSON.stringify({total:catalog.length,offset,matches:catalog.slice(offset,offset+limit).map(({id,description})=>({id,description}))},null,2));
  } else if(command==='style')console.log(styleMarkdown(findStyle(ROOT,arg('--id')),{section:arg('--section')}));
  else if(command==='search') {
    const queriesFile=arg('--queries'),queries=queriesFile?JSON.parse(readFileSync(resolve(queriesFile),'utf8')):[];
    if(!Array.isArray(queries)||queries.some(q=>typeof q!=='string'))throw new Error('--queries must contain a JSON array of visual needs.');
    const type=arg('--type')??'motion';if(!['motion','style'].includes(type))throw new Error('--type must be motion or style.');
    const searchOptions={query:arg('--query')??'',queries,limit:Number(arg('--limit')??5),...options};
    console.log(JSON.stringify({retrieval:'description-only keyword + concept expansion + reciprocal-rank fusion',next:type==='style'?'style --id SELECTED_ID':'usage --id SELECTED_ID',matches:type==='style'?searchStyles(ROOT,searchOptions):searchMaterials(readMotionCatalog(ROOT,options),searchOptions)},null,2));
  } else if(command==='show')console.log(JSON.stringify(materialDetails(findMaterial(ROOT,arg('--id'),options)),null,2));
  else if(command==='audio') {
    const material=findMaterial(ROOT,arg('--id'),options);if(!material.optionalAudio)throw new Error('This material has no optional audio preset.');
    const preset=JSON.parse(readFileSync(safeResourcePath(ROOT,material.optionalAudio.manifest),'utf8'));
    console.log(JSON.stringify({id:material.id,enabledByDefault:false,fps:preset.fps,durationInFrames:preset.durationInFrames,files:preset.files,config:preset.config,next:'Stage only the chosen MP3 files as used production assets, map their keys to staged public paths through audio, and use config.SFX for cue timing. Do not read the embedded audio data into agent context.'},null,2));
  }
  else if(command==='usage')console.log(readMaterialUsage(ROOT,arg('--id'),{...options,section:arg('--section')}));
  else if(command==='check')console.log(JSON.stringify(checkMaterial(ROOT,arg('--id'),options),null,2));
  else if(command==='references') {
    const query=arg('--query')?.trim().toLowerCase(),limit=Number(arg('--limit')??5);if(!query||!Number.isInteger(limit)||limit<1||limit>20)throw new Error('Describe a reference topic and use limit from 1 to 20.');
    const synonyms={时间:'timing',编排:'sequencing',文字:'text',文本:'text',转场:'transitions',图片:'images',裁切:'cropping',视频:'embedding-videos',渲染:'render',预览:'studio'};
    const terms=[query,...Object.entries(synonyms).filter(([word])=>query.includes(word)).map(([,word])=>word)];
    const manifest=JSON.parse(readFileSync(join(ROOT,'integrations/remotion/manifest.json'),'utf8'));
    console.log(JSON.stringify({matches:manifest.files.filter(f=>terms.some(t=>f.path.toLowerCase().includes(t))).slice(0,limit).map(f=>({id:f.path,file:'integrations/remotion/skills/'+f.path})),next:'Read only the matched reference needed for the current implementation question.'},null,2));
  } else if(command==='demo') {
    if(!arg('--id'))throw new Error('Choose a material first: demo --id ID.');
    const m=findMaterial(ROOT,arg('--id'),options);
    if(!m.demoEntry&&existsSync(safeResourcePath(ROOT,m.demo)))console.log('retained demo: '+m.id);
    else {
      const output=safeResourcePath(ROOT,m.demo);mkdirSync(resolve(output,'..'),{recursive:true});
      const props=join(resolve(output,'..'),'props.json');writeFileSync(props,JSON.stringify({id:m.id}));
      const entry=m.demoEntry??'apps/video-factory/remotion/MaterialDemo.jsx';
      const r=spawnSync(process.execPath,[join(ROOT,'node_modules/@remotion/cli/remotion-cli.js'),'render',safeResourcePath(ROOT,entry),'MaterialDemo',output,'--props='+props,'--scale=0.5','--concurrency=2','--log=error'],{cwd:ROOT,encoding:'utf8',windowsHide:true,timeout:180000,maxBuffer:6*1024*1024});
      if(r.error||r.status!==0)throw new Error('Material demo failed '+m.id+': '+(r.error?.message??r.stderr+r.stdout).slice(-2000));console.log('demo: '+m.id);
    }
  } else if(command==='add') {
    const file=arg('--request');if(!file)throw new Error('Usage: add --request FILE (id, description, module, demo, usageFile, supports).');
    const requestPath=resolve(file),a=JSON.parse(readFileSync(requestPath,'utf8'));
    if(!/^[a-z][a-z0-9-]+$/u.test(a.id)||!a.description?.trim()||!Array.isArray(a.supports)||!a.supports.length||a.supports.some(s=>typeof s!=='string'||!s.trim())||!a.usageFile||!a.module||!a.demo)throw new Error('A material needs a retrieval description, executable module, playable demo, standardized usageFile and expression scenarios.');
    if(['source','origin','quality','review','reviewer'].some(key=>key in a))throw new Error('Keep source/license/review records in the separate source archive.');
    validateRetrievalDescription(a.description);
    if(a.reuseScope&&!['universal','project'].includes(a.reuseScope))throw new Error('reuseScope must be universal or project.');
    const exportName='Material_'+a.id.replaceAll('-','_'),usage=readFileSync(resolve(resolve(requestPath,'..'),a.usageFile),'utf8');validateMaterialUsage(usage,{exportName});
    let source=readFileSync(resolve(resolve(requestPath,'..'),a.module),'utf8');validateCreativeSource(source);
    source=source.replace(/(['"])\.\/(?:motion-library|shot-runtime)\.jsx\1/gu,"'../../../apps/video-factory/remotion/MaterialRuntime.jsx'");
    const demoPath=resolve(resolve(requestPath,'..'),a.demo);if(!existsSync(demoPath)||!['.mp4','.webm','.gif'].includes(extname(demoPath)))throw new Error('Retained playable effect demo is required.');
    const filePath=join(ROOT,'config/motion-library.json'),catalog=JSON.parse(readFileSync(filePath,'utf8'));
    if(a.reuseScope==='project'&&!/^[^/]+\/[^/]+$/u.test(a.sourceProject??''))throw new Error('Project-scoped materials require sourceProject owner/name.');
    if(catalog.motions.some(m=>m.id===a.id))throw new Error('Material ID already exists.');
    const directory=join(ROOT,'assets/motion-library',a.id);mkdirSync(directory,{recursive:true});
    writeFileSync(join(directory,'component.jsx'),source);writeFileSync(join(directory,'demo'+extname(demoPath)),readFileSync(demoPath));writeFileSync(join(directory,'usage.md'),usage);
    catalog.motions.push({id:a.id,exportName,module:`assets/motion-library/${a.id}/component.jsx`,codePath:`assets/motion-library/${a.id}/component.jsx`,sha256:hash(source),demo:`assets/motion-library/${a.id}/demo${extname(demoPath)}`,usage:`assets/motion-library/${a.id}/usage.md`,description:a.description.trim(),supports:a.supports,dependencies:a.dependencies??['react','remotion'],reuseScope:a.reuseScope??'universal',...(a.reuseScope==='project'?{sourceProject:a.sourceProject}:{})});
    writeFileSync(filePath,JSON.stringify(catalog,null,2)+'\n');refreshProductionReferenceIndex(ROOT);console.log('Added production material '+a.id);
  } else throw new Error(help);
}catch(e){console.error(e.message);process.exitCode=1;}
