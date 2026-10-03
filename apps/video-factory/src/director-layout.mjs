import {validateSemanticScenes} from './semantic-scenes.mjs';
import {hash,normalizeTiming} from './creative-plan.mjs';

const text={type:'string',minLength:1};
const strings={type:'array',items:text};
const object=properties=>({type:'object',additionalProperties:false,required:Object.keys(properties),properties});
export function visualLayoutSchema() {
  const frames={startFrame:{type:'integer',minimum:0},endFrame:{type:'integer',minimum:1}};
  const beat=object({id:text,...frames,planShotIds:{...strings,minItems:1},narrationCue:text,purpose:text,
    visualDesign:text,continuity:text,libraryIds:strings,assetIds:strings});
  return object({styleId:text,designSummary:text,scenes:{type:'array',minItems:1,items:object({
    id:text,title:text,...frames,purpose:text,beats:{type:'array',minItems:1,items:beat}})}});
}
export const layoutDigest=layout=>hash(JSON.stringify(layout));
const unique=(values,label)=>{
  if(!Array.isArray(values)||new Set(values).size!==values.length)throw new Error(label+' must be a unique array.');
};
const validId=id=>typeof id==='string'&&/^[A-Za-z][A-Za-z0-9_-]*$/u.test(id);

// Estimated positions are context for the director, never compulsory visual boundaries.
export function planningCueWindows(plan,timing,fps) {
  const audio=normalizeTiming(timing,fps),narration=audio.clips.map(c=>c.text).join('');
  if(narration!==plan.content.fullNarration)throw new Error('Measured audio transcript differs from the unified plan.');
  let offset=0;const clips=audio.clips.map(c=>{const at=offset;offset+=c.text.length;return {...c,charStart:at,charEnd:offset};});
  let cursor=0;
  return plan.preproduction.shots.map(s=>{
    const at=narration.indexOf(s.narrationCue,cursor);
    if(at<0)throw new Error('Unordered or missing planned narration cue.');
    cursor=at+s.narrationCue.length;
    const clip=clips.find(c=>at>=c.charStart&&at<c.charEnd);
    return {id:s.id,unitId:s.unitId,purpose:s.purpose,narrationCue:s.narrationCue,
      estimatedFrame:Math.round(clip.startFrame+(at-clip.charStart)/(clip.charEnd-clip.charStart)*(clip.endFrame-clip.startFrame))};
  });
}

export function validateVisualLayout(plan,timing,fps,layout,libraries) {
  const audio=normalizeTiming(timing,fps);
  planningCueWindows(plan,timing,fps);
  if(layout?.styleId!==plan.content.styleId||!layout.designSummary?.trim()||!layout.scenes?.length)throw new Error('Layout must preserve the selected style and describe the whole visual story.');
  const planned=new Map(plan.preproduction.shots.map(s=>[s.id,s]));
  const assets=new Set(plan.preproduction.assets.map(a=>a.id));
  const covered=new Set(),usedAssets=new Set(),sceneIds=new Set(),beatIds=new Set();
  let end=0;
  for(const scene of layout.scenes) {
    if(!validId(scene.id)||sceneIds.has(scene.id)||!scene.title?.trim()||!scene.purpose?.trim())throw new Error('Layout scenes require unique safe IDs, titles and purposes.');
    sceneIds.add(scene.id);
    if(!Number.isInteger(scene.startFrame)||!Number.isInteger(scene.endFrame)||scene.startFrame!==end||scene.endFrame<=end||scene.endFrame>audio.totalFrames)throw new Error('Layout scenes must cover the full audio contiguously.');
    end=scene.endFrame;
    if(!scene.beats?.length)throw new Error('A layout scene needs actual visual segments.');
    let beatEnd=0;const duration=scene.endFrame-scene.startFrame;
    for(const beat of scene.beats) {
      if(!validId(beat.id)||beatIds.has(beat.id))throw new Error('Visual segment IDs must be unique and safe.');
      beatIds.add(beat.id);
      if(!Number.isInteger(beat.startFrame)||!Number.isInteger(beat.endFrame)||beat.startFrame!==beatEnd||beat.endFrame<=beatEnd||beat.endFrame>duration)throw new Error('Visual segments must cover their scene using scene-relative frames.');
      beatEnd=beat.endFrame;
      for(const key of ['narrationCue','purpose','visualDesign','continuity'])if(!beat[key]?.trim())throw new Error('Visual segment needs '+key+'.');
      unique(beat.planShotIds,'Plan references');unique(beat.libraryIds,'Component IDs');unique(beat.assetIds,'Asset IDs');
      if(!beat.planShotIds.length||beat.planShotIds.some(id=>!planned.has(id)))throw new Error('Visual segment references an unknown planned expression.');
      const allowedNarration=beat.planShotIds.map(id=>plan.content.units.find(u=>u.id===planned.get(id).unitId).narration).join('');
      if(!allowedNarration.includes(beat.narrationCue))throw new Error('Narration cue must come from the referenced planned expressions.');
      const cueText=audio.clips.filter(c=>c.startFrame<scene.startFrame+beat.endFrame&&c.endFrame>scene.startFrame+beat.startFrame).map(c=>c.text).join('');
      if(!cueText.includes(beat.narrationCue))throw new Error('Visual cue is outside its retained audio interval; use a relevant cue without retiming audio.');
      beat.planShotIds.forEach(id=>covered.add(id));
      for(const id of beat.libraryIds)if(!libraries.motions.some(m=>m.id===id))throw new Error('Unavailable layout component: '+id);
      for(const id of beat.assetIds){if(!assets.has(id))throw new Error('Unavailable layout material: '+id);usedAssets.add(id);}
    }
    if(beatEnd!==duration)throw new Error('Visual segments must cover the complete scene.');
  }
  if(end!==audio.totalFrames)throw new Error('Layout does not cover every measured audio frame.');
  validateSemanticScenes(layout.scenes,audio.semanticBlocks);
  for(const id of planned.keys())if(!covered.has(id))throw new Error('Layout omitted planned expression: '+id);
  for(const id of assets)if(!usedAssets.has(id))throw new Error('Layout omitted a prepared production material: '+id);
  return layout;
}

export function layoutTasks(layout,plan) {
  const planned=new Map(plan.preproduction.shots.map(s=>[s.id,s]));
  return layout.scenes.flatMap(scene=>scene.beats.map(beat=>{
    const expressions=beat.planShotIds.map(id=>planned.get(id));
    const claimIndexes=[...new Set(expressions.flatMap(s=>plan.content.units.find(u=>u.id===s.unitId).claimIndexes))].sort((a,b)=>a-b);
    return {...beat,title:scene.title,sceneId:scene.id,sceneStartFrame:scene.startFrame,
      startFrame:scene.startFrame+beat.startFrame,endFrame:scene.startFrame+beat.endFrame,
      durationInFrames:beat.endFrame-beat.startFrame,claimIndexes,
      plannedPurposes:expressions.map(s=>({id:s.id,purpose:s.purpose,continuity:s.continuity}))};
  }));
}
export const taskDigest=(task,inputs)=>hash(JSON.stringify({task,inputs}));

export function layoutFromVisual(visual) {
  return {styleId:visual.styleId,designSummary:visual.designSummary,scenes:visual.scenes.map(s=>({
    id:s.id,title:s.title,startFrame:s.startFrame,endFrame:s.endFrame,purpose:s.purpose,
    beats:s.beats.map(b=>({id:b.id,startFrame:b.startFrame,endFrame:b.endFrame,planShotIds:b.planShotIds,
      narrationCue:b.narrationCue,purpose:b.purpose,visualDesign:b.visualDesign,continuity:b.continuity,
      libraryIds:b.libraryIds,assetIds:b.assetIds}))}))};
}
export function visualFromLayout(layout,plan,realizations) {
  const tasks=new Map(layoutTasks(layout,plan).map(t=>[t.id,t]));
  return {styleId:layout.styleId,designSummary:layout.designSummary,scenes:layout.scenes.map(scene=>{
    const beats=scene.beats.map(beat=>{
      const actual=realizations[beat.id];if(!actual)throw new Error('Missing implemented visual segment: '+beat.id);
      return {...beat,claimIndexes:tasks.get(beat.id).claimIndexes,route:actual.libraryIds.length?(actual.libraryIds.length>1?'compose':'library'):'custom',
        libraryIds:actual.libraryIds,candidates:[],reason:actual.summary,sourceFile:actual.sourceFile,source:actual.source};
    });
    return {...scene,claimIndexes:[...new Set(beats.flatMap(b=>b.claimIndexes))].sort((a,b)=>a-b),beats};
  })};
}

