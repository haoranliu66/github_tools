import {isDeepStrictEqual} from 'node:util';
import {copyFileSync,existsSync,mkdirSync,readFileSync,writeFileSync} from 'node:fs';
import {dirname,join,resolve,sep} from 'node:path';
import {contentSchema,validateContent,hash,makeCreativePlan} from './creative-plan.mjs';
import {layoutFromVisual,validateVisualLayout,layoutTasks} from './director-layout.mjs';
import {SHARING_TYPE,selectContentRoute,contentRouteSchema,sharingSchema,validateContentProfile} from './content-skill.mjs';
import {contractMetadata} from '../../repo-researcher/src/editorial-contract.mjs';
const text={type:'string',minLength:1},strings={type:'array',items:text};
const object=properties=>({type:'object',additionalProperties:false,required:Object.keys(properties),properties});
export function productionPackageSchema(route=selectContentRoute()) {
  return object({contentRoute:contentRouteSchema(route),...(route.skill===SHARING_TYPE?{sharing:sharingSchema()}:{}),claims:{type:'array',minItems:1,items:object({claim:text,quote:text})},content:contentSchema(),
    designContext:text,shots:{type:'array',minItems:1,items:object({id:text,unitId:text,narrationCue:text,
      purpose:text,visualDesign:text,continuity:text,route:{type:'string',enum:['library','compose','custom']},
      libraryIds:strings,assetIds:strings})},assets:{type:'array',items:object({id:text,
      kind:{type:'string',enum:['svg','readme-media','file']},source:text,purpose:text})},
    customMaterials:{type:'array',items:object({id:text,exportName:text,source:text,usage:text,demoSource:text,shotIds:{...strings,minItems:1}})}});
}
export function validateProductionPackage(value,{readmeText,libraries,route}) {
  if(!value.claims?.length)throw new Error('Used claims are required.');
  const normalize=t=>t.replace(/\s+/gu,' ').trim();
  for(const c of value.claims)if(!c.claim?.trim()||!c.quote?.trim()||!normalize(readmeText).includes(normalize(c.quote)))throw new Error('Claim needs an exact official README excerpt.');
  validateContent(value.content,value,libraries);
  const usedClaims=new Set(value.content.units.flatMap(u=>u.claimIndexes));
  if(value.claims.some((_,i)=>!usedClaims.has(i)))throw new Error('Remove claims unused by this narration.');
  if(!value.designContext?.trim()||!value.shots?.length)throw new Error('A complete visual design and shots are required.');
  const assetIds=new Set(value.assets.map(a=>a.id)),shotIds=new Set(),usedAssets=new Set();
  if(assetIds.size!==value.assets.length)throw new Error('Duplicate asset ID.');
  let cursor=0;
  for(const shot of value.shots) {
    const unit=value.content.units.find(u=>u.id===shot.unitId);
    if(!/^[a-zA-Z][a-zA-Z0-9_-]*$/u.test(shot.id)||!unit||!unit.narration.includes(shot.narrationCue)||shotIds.has(shot.id)||!shot.continuity?.trim()||!shot.visualDesign?.trim())throw new Error('Shot needs a unique ID, exact narration cue and continuity design.');
    const at=value.content.fullNarration.indexOf(shot.narrationCue,cursor);
    if(at<0)throw new Error('Shot cues must follow the narration order.');cursor=at+shot.narrationCue.length;shotIds.add(shot.id);
    for(const id of shot.libraryIds)if(!libraries.motions.some(m=>m.id===id))throw new Error('Unavailable planned motion: '+id);
    if(shot.route==='library'&&!shot.libraryIds.length)throw new Error('Library route requires an actual component.');
    for(const id of shot.assetIds){if(!assetIds.has(id))throw new Error('Unavailable planned asset: '+id);usedAssets.add(id);}
  }
  if(value.content.units.some(u=>!value.shots.some(s=>s.unitId===u.id)))throw new Error('Every narration unit needs its planned visuals.');
  if(value.assets.some(a=>!usedAssets.has(a.id)))throw new Error('Remove assets unused by this production.');
  for(const a of value.assets) {
    if(!/^[a-z][a-z0-9_-]*$/u.test(a.id)||!a.purpose?.trim())throw new Error('Invalid asset ID or use.');
    if(a.kind==='svg'&&(!/^\s*<svg\b/u.test(a.source)||/<script|<foreignObject|\bon\w+\s*=|(?:href|url)\s*[=(]["']?(?:https?:|\/\/)|<!DOCTYPE/iu.test(a.source)))throw new Error('SVG must be a self-contained offline image.');
  }
  const customIds=new Set(),customExports=new Set();
  for(const m of value.customMaterials??[]) {
    if(!/^[a-z][a-z0-9_-]*$/u.test(m.id)||assetIds.has(m.id)||customIds.has(m.id)||!/^[A-Z][A-Za-z0-9_]*$/u.test(m.exportName)||!m.shotIds?.length||m.shotIds.some(id=>!shotIds.has(id)))throw new Error('Custom material needs a unique export and actual shot references.');
    if(customExports.has(m.exportName))throw new Error('Duplicate custom material export: '+m.exportName);customExports.add(m.exportName);
    customIds.add(m.id);
    if([m.source,m.usage,m.demoSource].some(p=>typeof p!=='string'||!p.trim()))throw new Error('Custom material needs runnable code, usage and demo implementation.');
  }
  validateContentProfile(value,value.shots,{expectedRoute:route});
  return value;
}
export function validateMaterialNarrativeIdentity(initial,final) {
  const spokenIdentity=value=>({claims:value.claims,contentRoute:value.contentRoute,
    title:value.content.title,styleId:value.content.styleId,fullNarration:value.content.fullNarration,
    units:value.content.units.map(({id,heading,narration,claimIndexes})=>({id,heading,narration,claimIndexes})),
    ...(value.contentRoute.skill===SHARING_TYPE?{promise:value.sharing.viewerPromise,story:value.sharing.story,example:value.sharing.example}:{})});
  if(!isDeepStrictEqual(spokenIdentity(initial),spokenIdentity(final)))throw new Error('Material inspection changed the agreed narration or factual story.');
  return final;
}
export function createProductionPackage(value,{fullName,preview,contract,editingSkill,feedbackText='',libraries}) {
  validateProductionPackage(value,{readmeText:preview.readmeText,libraries});
  const research={schemaVersion:3,workflow:'scoped-production-package',status:'completed',blockedReason:'',
    project:{name:fullName.split('/').at(-1),url:`https://github.com/${fullName}`,versionOrCommit:preview.sha},
    claims:value.claims.map(c=>({claim:c.claim,confidence:'high',evidence:[{source:'official-readme',detail:preview.readmeName,quote:c.quote}]})),
    editorialContract:contractMetadata(contract),
    sourceAudit:{mode:'scoped-github-readme',commit:preview.sha,readmeSha256:hash(preview.readmeText)}};
  const researchText=JSON.stringify(research,null,2)+'\n';
  const plan=makeCreativePlan({fullName,researchText,contract,editingSkill,feedbackText,content:value.content,libraries});
  plan.workflow=research.workflow;plan.phase='production-planned';
  plan.preproduction={contentRoute:structuredClone(value.contentRoute),...(value.contentRoute.skill===SHARING_TYPE?{sharing:structuredClone(value.sharing)}:{}),designContext:value.designContext,shots:value.shots,components:[],customMaterials:(value.customMaterials??[]).map(m=>({id:m.id,exportName:m.exportName,shotIds:m.shotIds,codeFile:`prepared-materials/${m.id}/component.jsx`,usageFile:`prepared-materials/${m.id}/usage.md`,demoFile:`prepared-materials/${m.id}/demo.mp4`})),assets:value.assets.map(a=>({id:a.id,
    kind:a.kind,purpose:a.purpose,file:`visual-assets/${a.id}${a.kind==='svg'?'.svg':'.'+a.source.split('.').at(-1).toLowerCase()}`}))};
  plan.preproductionDigest=hash(JSON.stringify(plan.preproduction));
  return {research,researchText,plan};
}
export function stagePlannedAssets(value,{resourcesDirectory,sourceDirectory,candidates}) {
  const directory=join(resourcesDirectory,'visual-assets');mkdirSync(directory,{recursive:true});
  for(const a of value.assets) {
    if(a.kind==='svg'){writeFileSync(join(directory,a.id+'.svg'),a.source);continue;}
    if(a.kind!=='file'&&!candidates.some(c=>c.materializable&&c.path===a.source))throw new Error('Requested media must be an available README asset.');
    const sourceRoot=a.kind==='file'?resourcesDirectory:sourceDirectory;
    const source=resolve(sourceRoot,a.source);
    if(!source.startsWith(resolve(sourceRoot)+sep)||!existsSync(source))throw new Error('Selected source media is unavailable.');
    const extension=a.source.split('.').at(-1).toLowerCase();
    if(!['png','jpg','jpeg','webp','gif','svg','mp4','webm','mov','m4v'].includes(extension))throw new Error('Unsupported production asset.');
    const destination=join(directory,a.id+'.'+extension);if(source!==destination)copyFileSync(source,destination);
  }
}
export function validatePlannedAssets(plan,resourcesDirectory) {
  if(!plan.preproduction||plan.preproductionDigest!==hash(JSON.stringify(plan.preproduction)))throw new Error('Complete current research production plan is required.');
  return plan.preproduction.assets.map(a=>{const path=resolve(resourcesDirectory,a.file);
    if(!path.startsWith(resolve(resourcesDirectory)+sep)||!existsSync(path))throw new Error('Missing planned material: '+a.id);
    if(a.sha256&&hash(readFileSync(path))!==a.sha256)throw new Error('Planned material changed: '+a.id);
    return {...a,src:path};});
}
export {directorContextPrompt} from './director-context.mjs';

export function validatePlannedRealization(plan,timing,fps,visual,libraries) {
  const layout=layoutFromVisual(visual);validateVisualLayout(plan,timing,fps,layout,libraries);
  const tasks=layoutTasks(layout,plan);
  const source=visual.scenes.flatMap(s=>s.beats.map(b=>b.source??'')).join('\n')+'\n'+Object.values(visual.sharedSources??{}).join('\n');
  for(const material of plan.preproduction.customMaterials)if(!source.includes(material.exportName))throw new Error('Prepared custom material is unused in actual code: '+material.id);
  for(const scene of visual.scenes) {
    const claims=[...new Set(scene.beats.flatMap(b=>tasks.find(t=>t.id===b.id).claimIndexes))].sort((a,b)=>a-b);
    if(JSON.stringify(scene.claimIndexes)!==JSON.stringify(claims))throw new Error('Scene claims differ from referenced planned purposes.');
    for(const beat of scene.beats)if(JSON.stringify(beat.claimIndexes)!==JSON.stringify(tasks.find(t=>t.id===beat.id).claimIndexes))throw new Error('Beat claims differ from referenced planned purposes.');
  }
  return visual;
}
