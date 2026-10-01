import {copyFileSync,existsSync,mkdirSync,readFileSync,writeFileSync} from 'node:fs';
import {dirname,join,resolve,sep} from 'node:path';
import {contentSchema,validateContent,hash,makeCreativePlan,normalizeTiming} from './creative-plan.mjs';
import {contractMetadata} from '../../repo-researcher/src/editorial-contract.mjs';
const text={type:'string',minLength:1},strings={type:'array',items:text};
const object=properties=>({type:'object',additionalProperties:false,required:Object.keys(properties),properties});
export function productionPackageSchema() {
  return object({claims:{type:'array',minItems:1,items:object({claim:text,quote:text})},content:contentSchema(),
    designContext:text,shots:{type:'array',minItems:1,items:object({id:text,unitId:text,narrationCue:text,
      purpose:text,visualDesign:text,continuity:text,route:{type:'string',enum:['library','compose','custom']},
      libraryIds:strings,assetIds:strings})},assets:{type:'array',items:object({id:text,
      kind:{type:'string',enum:['svg','readme-media','file']},source:text,purpose:text})}});
}
export function validateProductionPackage(value,{readmeText,libraries}) {
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
  return value;
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
  plan.preproduction={designContext:value.designContext,shots:value.shots,assets:value.assets.map(a=>({id:a.id,
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
    return {id:a.id,purpose:a.purpose,src:path};});
}
// Convert the pre-audio design to frames only after duration measurement. Cues remain estimated.
export function bindProductionShots(plan,timing,fps) {
  const audio=normalizeTiming(timing,fps),narration=audio.clips.map(c=>c.text).join('');
  if(narration!==plan.content.fullNarration)throw new Error('Measured audio transcript differs from the unified plan.');
  let offset=0;const clips=audio.clips.map(c=>{const start=offset;offset+=c.text.length;return {...c,charStart:start,charEnd:offset};});
  let cursor=0;
  const starts=plan.preproduction.shots.map((s,i)=>{const at=narration.indexOf(s.narrationCue,cursor);if(at<0)throw new Error('Unordered or missing planned cue.');cursor=at+s.narrationCue.length;
    const clip=clips.find(c=>at>=c.charStart&&at<c.charEnd);return i===0?0:Math.round(clip.startFrame+(at-clip.charStart)/(clip.charEnd-clip.charStart)*(clip.endFrame-clip.startFrame));});
  return plan.preproduction.shots.map((s,i)=>{const startFrame=starts[i],endFrame=starts[i+1]??audio.totalFrames;
    if(endFrame<=startFrame)throw new Error('Planned shots are too close for the measured audio; resolve cue positions without rewriting narration.');
    const unit=plan.content.units.find(u=>u.id===s.unitId);
    return {...s,title:unit.heading,claimIndexes:unit.claimIndexes,startFrame,endFrame,durationInFrames:endFrame-startFrame};});
}
export function directorContextPrompt({contractBody,plan,style,references}) {
  return `${contractBody}\nYou are the visual director of this ONE fixed unified plan. Narration is already measured; implement its visuals only. Maintain this same plan across tool-enabled turns. You may inspect, try, render and repair shots.\nChosen style: ${JSON.stringify(style)}\nUnified plan: ${JSON.stringify({content:plan.content,preproduction:plan.preproduction})}\nReferences are loaded only when needed. Index file: ${references}\nDo not browse unrelated repositories, rewrite narration, or manufacture product execution. Use free JSX to make the planned meaning visible. Preserve design continuity, content hierarchy, subtitle-safe space and deterministic frame animation.`;
}

export function validatePlannedRealization(plan,shots,visual) {
  if(visual.styleId!==plan.content.styleId||visual.scenes?.length!==shots.length)throw new Error('Realization differs from the unified shot plan.');
  for(const [i,scene] of visual.scenes.entries()) {
    const shot=shots[i],beat=scene.beats?.[0];
    if(scene.id!==shot.id||scene.startFrame!==shot.startFrame||scene.endFrame!==shot.endFrame||scene.purpose!==shot.purpose||scene.beats?.length!==1||beat?.id!==shot.id||beat.narrationCue!==shot.narrationCue||beat.purpose!==shot.purpose||beat.route!==shot.route||JSON.stringify(scene.claimIndexes)!==JSON.stringify(shot.claimIndexes)||JSON.stringify(beat.claimIndexes)!==JSON.stringify(shot.claimIndexes)||JSON.stringify([...beat.libraryIds].sort())!==JSON.stringify([...shot.libraryIds].sort()))throw new Error('Realization changed planned shot '+shot.id+'. Return to planning for semantic changes.');
  }
  return visual;
}
