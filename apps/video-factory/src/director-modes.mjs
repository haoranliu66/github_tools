import {existsSync,mkdirSync,readFileSync,writeFileSync,realpathSync} from 'node:fs';
import {dirname,join,resolve,sep} from 'node:path';
import {hash,validateCreativeSource} from './creative-plan.mjs';
import {visualLayoutSchema,layoutTasks,taskDigest} from './director-layout.mjs';
import {realizeVisualBeat,shotTaskPrompt} from './director-context.mjs';
import {preparedMaterialBridge,materialLinksForShots} from './production-materials.mjs';
import {writeShotPreviewHarness} from './shot-preview.mjs';

export const directorMode=(totalFrames,fps)=>{
  if(!Number.isInteger(totalFrames)||totalFrames<1||!Number.isFinite(fps)||fps<=0)throw new Error('Director mode requires measured audio frames and fps.');
  return totalFrames/fps<120?'short':'long';
};
const text={type:'string',minLength:1},strings={type:'array',items:text};
const object=properties=>({type:'object',additionalProperties:false,required:Object.keys(properties),properties});
export function authoringSchema(mode) {
  const properties={layout:visualLayoutSchema(),sharedSourceFile:text,
    joins:{type:'array',minItems:1,items:object({id:text,incoming:text,outgoing:text})}};
  if(mode==='short')properties.shots={type:'array',minItems:1,items:object({id:text,sourceFile:text,libraryIds:strings,summary:text})};
  return object(properties);
}
export function validateJoins(layout,joins) {
  const ids=layout.scenes.flatMap(s=>s.beats.map(b=>b.id));
  if(!Array.isArray(joins)||joins.length!==ids.length||new Set(joins.map(j=>j.id)).size!==ids.length||joins.some(j=>!ids.includes(j.id)||!j.incoming?.trim()||!j.outgoing?.trim()))throw new Error('Director must define incoming and outgoing continuity for every actual segment.');
  return joins;
}
export function readSharedModule(runDirectory,file) {
  const expected=join(runDirectory,'shared.jsx');
  if(typeof file!=='string'||resolve(file)!==resolve(expected)||!existsSync(expected))throw new Error('Director must write the assigned shared.jsx module.');
  const source=readFileSync(expected,'utf8');validateCreativeSource(source,{requireDefault:false});return source;
}
export function prepareSegmentAssignments({layout,plan,runDirectory,audio,style,materials,production,sharedSource,joins=[]}) {
  const tasks=layoutTasks(layout,plan),bridge=preparedMaterialBridge(plan);
  return tasks.map((shot,i)=>{
    const directory=join(runDirectory,shot.id);mkdirSync(directory,{recursive:true});
    const sourceFile=join(directory,'shot.jsx'),assignmentFile=join(directory,'assignment.json');
    const captions=audio.clips.filter(c=>c.startFrame<shot.endFrame&&c.endFrame>shot.startFrame).map(c=>({...c,startFrame:Math.max(c.startFrame,shot.startFrame)-shot.startFrame,endFrame:Math.min(c.endFrame,shot.endFrame)-shot.startFrame}));
    const parent=layout.scenes.find(s=>s.id===shot.sceneId),parentTasks=tasks.filter(t=>t.sceneId===shot.sceneId);
    const previewScene={...parent,source:'https://github.com/'+plan.fullName,claimIndexes:[...new Set(parentTasks.flatMap(t=>t.claimIndexes))].sort((a,b)=>a-b)},previewBeat={...parent.beats.find(b=>b.id===shot.id),claimIndexes:shot.claimIndexes};
    const assignment={fullName:plan.fullName,sourceFile,durationInFrames:shot.durationInFrames,fps:audio.fps,style,assets:materials.filter(m=>shot.assetIds.includes(m.id)),captions,publicDirectory:production,scene:previewScene,beat:previewBeat,
      continuity:joins.find(j=>j.id===shot.id),designContext:plan.preproduction.designContext,materialLinks:materialLinksForShots(plan,shot.planShotIds)};
    writeFileSync(assignmentFile,JSON.stringify(assignment,null,2)+'\n');
    writeFileSync(join(directory,'shared.jsx'),sharedSource);writeFileSync(join(directory,'prepared-materials.jsx'),bridge);
    writeShotPreviewHarness(join(directory,'preview'),assignment);
    return {shot,join:joins.find(j=>j.id===shot.id),previous:tasks[i-1],next:tasks[i+1],sourceFile,assignmentFile,captions};
  });
}
export function collectImplementations({entries,records,runInputs,libraries,sharedSource}) {
  if(!Array.isArray(records)||new Set(records.map(r=>r.id)).size!==entries.length||records.length!==entries.length)throw new Error('Whole-film authoring must return every assigned segment exactly once.');
  return Object.fromEntries(entries.map(entry=>{
    const r=records.find(r=>r.id===entry.shot.id);
    if(!r||typeof r.sourceFile!=='string'||resolve(r.sourceFile)!==resolve(entry.sourceFile)||!existsSync(entry.sourceFile))throw new Error('Missing assigned source: '+entry.shot.id);
    return [entry.shot.id,{...realizeVisualBeat(entry.shot,r,readFileSync(entry.sourceFile,'utf8'),libraries),taskDigest:taskDigest({shot:entry.shot,previous:entry.previous,next:entry.next,join:entry.join,sharedDigest:hash(sharedSource)},runInputs)}];
  }));
}
export async function implementLongSegments({entries,joins,sharedSource,runInputs,libraries,retained={},runAgent,childContract,childSkill,previewScript,onComplete=()=>{}}) {
  let cursor=0;const result={},sharedDigest=hash(sharedSource);
  const protectedFiles=entries.flatMap(e=>['shared.jsx','prepared-materials.jsx','motion-library.jsx','shot-runtime.jsx'].map(n=>join(dirname(e.sourceFile),n)));
  const protectedHashes=Object.fromEntries(protectedFiles.map(p=>[p,hash(readFileSync(p))]));
  async function worker(){while(cursor<entries.length){const entry=entries[cursor++],id=entry.shot.id;
    const digest=taskDigest({shot:entry.shot,previous:entry.previous,next:entry.next,join:entry.join,sharedDigest},runInputs),old=retained[id];
    if(old?.taskDigest===digest&&resolve(old.sourceFile)===resolve(entry.sourceFile)&&existsSync(entry.sourceFile)&&old.sourceDigest===hash(readFileSync(entry.sourceFile)))result[id]=old;
    else {
      const boundary=joins.find(j=>j.id===id),task=childContract+'\n'+childSkill+'\n'+shotTaskPrompt({...entry,join:boundary,previewCommand:'node '+JSON.stringify(previewScript)+' '+JSON.stringify(entry.assignmentFile)});
      const answer=await runAgent(task,{workingDirectory:dirname(entry.sourceFile),outputPath:entry.assignmentFile.replace('assignment.json','result.json'),sandbox:'workspace-write'});
      if(typeof answer.value.sourceFile!=='string'||resolve(answer.value.sourceFile)!==resolve(entry.sourceFile)||!existsSync(entry.sourceFile))throw new Error('Shot agent did not write its assigned source: '+id);
      result[id]={...realizeVisualBeat(entry.shot,answer.value,readFileSync(entry.sourceFile,'utf8'),libraries),taskDigest:digest,childSessionId:answer.sessionId};
    }await onComplete(id,result[id]);
  }}
  const workers=await Promise.allSettled(Array.from({length:Math.min(2,entries.length)},worker));
  const failed=workers.find(r=>r.status==='rejected');if(failed)throw failed.reason;
  for(const [path,digest] of Object.entries(protectedHashes))if(hash(readFileSync(path))!==digest)throw new Error('Shot agent modified a shared module or bridge.');
  for(const entry of entries){
    if(readFileSync(entry.sourceFile.replace('shot.jsx','shared.jsx'),'utf8')!==sharedSource)throw new Error('Shot agent modified shared code: '+entry.shot.id);
    if(hash(readFileSync(entry.sourceFile))!==result[entry.shot.id].sourceDigest)throw new Error('Shot source changed after its implementation: '+entry.shot.id);
  }return result;
}

export function stageAuthoringRequest(request,{resourcesDirectory,runDirectory}) {
  const root=realpathSync(resourcesDirectory),ids=new Set(request.layout.scenes.flatMap(s=>s.beats.map(b=>b.id)));
  const readLocal=path=>{
    if(typeof path!=='string')throw new Error('Authoring request needs local source links.');
    const file=realpathSync(resolve(resourcesDirectory,path));if(!file.startsWith(root+sep))throw new Error('Authoring source link escapes this project resources.');return readFileSync(file,'utf8');
  };
  const shared=readLocal(request.sharedSourceFile);validateCreativeSource(shared,{requireDefault:false});
  if(!Array.isArray(request.shots)||request.shots.length!==ids.size||new Set(request.shots.map(r=>r.id)).size!==ids.size||request.shots.some(r=>!ids.has(r.id)))throw new Error('Authoring request needs exactly the planned segment sources.');
  const sources=request.shots.map(r=>{const source=readLocal(r.sourceFile);validateCreativeSource(source);return {record:r,source};});
  mkdirSync(runDirectory,{recursive:true});const sharedSourceFile=join(runDirectory,'shared.jsx');writeFileSync(sharedSourceFile,shared);
  const shots=sources.map(({record,source})=>{const directory=join(runDirectory,record.id);mkdirSync(directory,{recursive:true});const sourceFile=join(directory,'shot.jsx');writeFileSync(sourceFile,source);return {...record,sourceFile};});
  return {...request,sharedSourceFile,shots};
}
