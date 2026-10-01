import {existsSync,mkdirSync,readFileSync,writeFileSync} from 'node:fs';
import {spawnSync} from 'node:child_process';
import {createRequire} from 'node:module';
import {join,resolve} from 'node:path';
import {runToolAgent} from './codex-runner.mjs';
import {productionPackageSchema,validateProductionPackage} from './production-package.mjs';
const ROOT=resolve(import.meta.dirname,'../../..'),require=createRequire(import.meta.url);
export function plannedMaterialEvidence(value,{libraries,resourcesDirectory,work}) {
  const images=[];const ffmpeg=require('@ffmpeg-installer/ffmpeg').path;
  const run=(exe,args)=>{const r=spawnSync(exe,args,{cwd:ROOT,encoding:'utf8',windowsHide:true,timeout:180000,maxBuffer:4*1024*1024});if(r.error||r.status!==0)throw new Error((r.error?.message??r.stderr+r.stdout).slice(-2400));};
  for(const id of [...new Set(value.shots.flatMap(s=>s.libraryIds))]) {
    const material=libraries.motions.find(m=>m.id===id);if(!material?.demo||!existsSync(join(ROOT,material.demo)))throw new Error('Selected material needs its actual effect demo: '+id);
    const frames=join(work,`motion-${id}.jpg`);
    run(ffmpeg,['-y','-hide_banner','-loglevel','error','-i',join(ROOT,material.demo),'-vf','fps=2,scale=640:-2,tile=2x3:nb_frames=6:padding=4:margin=4','-frames:v','1',frames]);images.push(frames);
  }
  const entry=join(ROOT,'apps/video-factory/remotion/AssetPreview.jsx');
  for(const asset of value.assets) {
    const src=`visual-assets/${asset.id}.${asset.kind==='svg'?'svg':asset.source.split('.').at(-1).toLowerCase()}`;
    const props=join(work,`asset-${asset.id}.json`),image=join(work,`asset-${asset.id}.png`);writeFileSync(props,JSON.stringify({src}));
    run(process.execPath,[join(ROOT,'node_modules/@remotion/cli/remotion-cli.js'),'still',entry,'AssetPreview',image,'--props='+props,'--public-dir='+resourcesDirectory,'--frame=30','--log=error']);images.push(image);
  }
  return images;
}
export async function inspectPlannedMaterials(value,{libraries,resourcesDirectory,work,sessionId,readmeText}) {
  const images=plannedMaterialEvidence(value,{libraries,resourcesDirectory,work});if(!images.length)return {value,sessionId};
  const schemaPath=join(work,'inspected-package.schema.json');writeFileSync(schemaPath,JSON.stringify(productionPackageSchema()));
  const result=await runToolAgent(`Inspect these actual selected effect demos and production assets. They are provided in order: ${JSON.stringify(images)}. Confirm they explain the planned shots, retain the same narration/style/story and revise visual realization notes if necessary. Do not add unused materials or unrelated research. Return the complete production package JSON, preserving all SVG sources and selected media paths. designContext contains only rules needed to realize the visuals; do not narrate this inspection, list inspected filenames or provide review verdicts. Current package: ${JSON.stringify(value)}`,{workingDirectory:ROOT,outputPath:join(work,'inspected-package.json'),schemaPath,sessionId,images,sandbox:'read-only'});
  validateProductionPackage(result.value,{readmeText,libraries});
  const before=JSON.stringify(value.assets),after=JSON.stringify(result.value.assets),beforeIds=[...new Set(value.shots.flatMap(s=>s.libraryIds))].sort(),afterIds=[...new Set(result.value.shots.flatMap(s=>s.libraryIds))].sort();
  if(before!==after||JSON.stringify(beforeIds)!==JSON.stringify(afterIds))throw new Error('Material selection changed after inspection; rerun scoped planning to inspect the final selection.');
  return result;
}
