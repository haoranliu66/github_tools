import {createHash} from 'node:crypto';
import {existsSync, mkdirSync, readFileSync, renameSync, writeFileSync} from 'node:fs';
import {dirname, join, relative, resolve, sep} from 'node:path';
import {objectPose} from '../remotion/motion-math.mjs';

export const digest = value => createHash('sha256').update(value).digest('hex');
const safeId = value => String(value).replace(/[^a-zA-Z0-9_-]/g, '_');
const ROOT = resolve(import.meta.dirname, '../../..');
const json = path => JSON.parse(readFileSync(path, 'utf8'));
export const catalogPath = join(ROOT, 'config/shot-catalog.json');
export function loadShotCatalog() { return json(catalogPath); }

export function productionIdentity(storyboard) {
  const copy = structuredClone(storyboard);
  delete copy.meta.visualProgram;
  for(const scene of copy.scenes) for(const beat of scene.visualBeats ?? []) delete beat.implementation;
  return digest(JSON.stringify(copy));
}

export function inferRequirement(beat, scene) {
  if(beat.src || (scene.src && beat.id === 'github-repository')) return ['media-focus'];
  if(scene.type === 'outro') return ['takeaway'];
  if(beat.stage) {
    const kinds = new Set(beat.stage.objects.map(o => o.kind));
    if(kinds.has('folder') && (kinds.has('comment') || kinds.has('window'))) {
      const cue = `${beat.narrationCue} ${beat.purpose}`;
      if(/更新|新增|摘要/.test(cue)) return ['update', 'persist'];
      if(/找出|找回|参考|检索/.test(cue)) return ['retrieve', 'transfer'];
      return ['extract', 'persist'];
    }
    return [beat.stage.action.type];
  }
  if(beat.canvas) return ['flow', 'transfer'];
  if(beat.shot) return ['context', 'reveal'];
  return ['context', 'reveal'];
}

function eligibleTemplate(template, request, beat, scene) {
  if(!request.requiredActions.every(action => template.supports.includes(action))) return false;
  if(template.id === 'repository-media') return Boolean(beat.src || scene.src);
  if(template.id === 'directed-flow') return Boolean(beat.canvas?.nodes?.length >= 2 &&
    beat.canvas.nodes.length <= 5 && beat.canvas.edges?.length);
  if(template.id === 'code-review-workbench') return Boolean(beat.stage?.objects?.length &&
    beat.stage.objects.every(o => ['file','code','review','search','comment'].includes(o.kind)));
  return template.id === 'kinetic-takeaway' && scene.type === 'outro';
}

export function chooseShot({beat, scene, request = {}, catalog = loadShotCatalog()}) {
  const requirement = {requiredActions: inferRequirement(beat, scene), ...request};
  if(!Array.isArray(requirement.requiredActions) || !requirement.requiredActions.length ||
    requirement.requiredActions.some(a => typeof a !== 'string' || !a)) throw new Error('Shot requires explicit actions.');
  const candidates = catalog.templates.map(t => ({id:t.id, eligible:eligibleTemplate(t, requirement, beat, scene),
    missingActions:requirement.requiredActions.filter(a => !t.supports.includes(a))}));
  const fitting = catalog.templates.find(t => candidates.find(c => c.id === t.id).eligible);
  if(fitting) return {route:'template', templateId:fitting.id, templateVersion:fitting.version,
    requiredActions:requirement.requiredActions, candidates, reason:`${fitting.id} satisfies all required actions and material constraints.`};
  const canCompose = requirement.requiredActions.every(a => catalog.primitives.includes(a) || ['context','retrieve','flow'].includes(a));
  if(!canCompose && !requirement.source) throw new Error(`No implementation for actions ${requirement.requiredActions.join(', ')}. Generate a custom JSX shot; static fallback is forbidden.`);
  return {route:requirement.source ? 'custom' : 'composition', requiredActions:requirement.requiredActions,
    candidates, reason:requirement.source ? 'No eligible template; project-local custom JSX implements the missing expression.' :
      'No eligible template; compose timed objects, state changes, connections and camera from primitives.'};
}

const keys = (start, end, from, to) => [{at:start,value:from},{at:Math.max(start+1,end),value:to}];
const track = (target, property, start, end, from, to) => ({target,property,keys:keys(start,end,from,to)});
const nodeKind = kind => ({window:'chat',folder:'memory',file:'document',review:'document',search:'document',
  input:'chat',action:'document',result:'document',note:'comment'}[kind] ?? kind);

export function composeShot(beat, scene, {fps = 30, previousBeat = null, previousSpec = null} = {}) {
  const duration = Math.max(12, (beat.endFrame ?? Math.round((scene.duration ?? 4)*fps)) - (beat.startFrame ?? 0));
  const phase = fraction => Math.min(duration - 1, Math.round(duration*fraction));
  let objects = [], links = [];
  if(beat.stage) {
    objects = beat.stage.objects.map(o => ({...o,kind:nodeKind(o.kind),x:Math.max(240,Math.min(1360,o.x*1600)),
      y:Math.max(190,Math.min(490,o.y*680)),w:o.kind === 'folder' ? 230 : 320,h:o.kind === 'folder' ? 255 : 230,
      detail:o.detail ?? (o.kind === 'code' ? '// 本次改动\n// 相关上下文' : o.label)}));
    links = beat.stage.links;
  } else if(beat.canvas) {
    const count = beat.canvas.nodes.length;
    objects = beat.canvas.nodes.map((o,i) => ({...o,kind:nodeKind(o.kind),x:210+i*1180/Math.max(1,count-1),
      y:340+(count>3?(i%2 ? 72 : -72):0),w:count>4?245:300,h:205,detail:o.label}));
    links = beat.canvas.edges;
  } else if(beat.shot) {
    objects = [
      {id:'context',kind:'chat',label:beat.shot.title,x:370,y:345,w:480,h:330,lines:[beat.shot.before,beat.shot.action]},
      {id:'result',kind:'document',label:'下一步',x:1190,y:345,w:390,h:265,detail:beat.shot.result},
    ]; links = [{from:'context',to:'result'}];
  } else {
    const labels = scene.type === 'outro' ? [scene.heading ?? scene.title, '留给下一次需要时'] :
      [scene.heading ?? scene.title ?? beat.narrationCue, ...(scene.steps ?? []).map(s=>typeof s === 'string'?s:s.label??s.title).filter(Boolean)];
    objects = [{id:'keyword',kind:'text',label:labels[0],x:800,y:210,w:1180,h:200,detail:''},
      ...labels.slice(1,4).map((l,i)=>({id:`step-${i}`,kind:'document',label:l,x:360+i*440,y:460,w:340,h:175,detail:l}))];
    if(objects.length===1) objects.push({id:'result',kind:'document',label:'继续完成你的任务',x:800,y:465,w:450,h:175,detail:beat.narrationCue});
    links = objects.slice(2).map((o,i)=>({from:objects[i+1].id,to:o.id}));
  }
  const previousEnd=Math.max(0,...(previousSpec?.tracks??[]).flatMap(t=>t.keys.map(k=>k.at)));
  const prior = new Map(previousSpec?.objects?.map(o => [o.id,{...o,...objectPose(o,previousSpec.tracks,previousEnd)}]) ?? []);
  const tracks = [];
  objects.forEach((o,i) => {
    const p = prior.get(o.id); const start = Math.min(phase(.1),i*3); const end = Math.min(duration-1,start+Math.max(8,Math.min(fps,phase(.2))));
    tracks.push(track(o.id,'opacity',start,end,p?.opacity ?? (beat.id==='hook-moment' && i===0 ? 1 : 0),1));
    tracks.push(track(o.id,'x',0,end,p?.x ?? o.x-50,o.x));
    tracks.push(track(o.id,'y',0,end,p?.y ?? o.y+45,o.y));
    const changed = !p || JSON.stringify(p.lines ?? p.detail) !== JSON.stringify(o.lines ?? o.detail);
    if(changed) tracks.push(track(o.id,'reveal',start,phase(.52),beat.id==='hook-moment' && i===0 ? 1 : 0,1));
  });
  const action = beat.stage?.action;
  const targets = action?.targets ?? [beat.canvas?.focusId ?? objects.at(-1).id];
  for(const id of targets) if(objects.some(o=>o.id===id)) {
    tracks.push(track(id,'highlight',phase(.15),phase(.7),0,1));
    if(action?.type === 'expand') tracks.push(track(id,'scale',phase(.1),phase(.65),.84,1.06));
  }
  // Gathers transfer the actual example object, then persist it beside the destination.
  if(action?.type === 'gather' || action?.type === 'move') {
    const destination = objects.find(o => ['memory','document'].includes(o.kind) && targets.includes(o.id) &&
      (o.kind==='memory' || beat.stage.objects.find(s=>s.id===o.id)?.kind==='review')) ?? objects.at(-1);
    objects.filter(o => targets.includes(o.id) && o.id!==destination.id).forEach((o,i)=> {
      tracks.push(track(o.id,'x',phase(.22),phase(.65),o.x,destination.x-160));
      tracks.push(track(o.id,'y',phase(.22),phase(.65),o.y,destination.y-80+i*65));
      tracks.push(track(o.id,'scale',phase(.3),phase(.68),1,.66));
      tracks.push(track(o.id,'opacity',phase(.62),phase(.85),1,.25));
    });
  }
  const connections = links.map((l,i)=>({...l,start:Math.min(phase(.2)+i*4,phase(.4)),end:Math.min(phase(.8),phase(.6)+i*4),packet:true,
    label:inferRequirement(beat,scene).includes('retrieve')?'找回':'信息'}));
  let focus = objects.find(o => targets.includes(o.id)) ?? objects.at(-1);
  const dx = Math.max(-60,Math.min(60,(800-focus.x)*.1)); const dy = Math.max(-20,Math.min(20,(340-focus.y)*.08));
  const finalTracks = [...new Map(tracks.map(t=>[`${t.target}:${t.property}`,t])).values()];
  const spec = {objects,tracks:finalTracks,connections,camera:[{at:0,x:0,y:0,scale:1},{at:phase(.65),x:dx,y:dy,scale:1.035},
    {at:duration-1,x:0,y:0,scale:1}],overlays:targets.map(target=>({target,start:phase(.52),end:phase(.83)}))};
  validateChoreography(spec,duration);
  return spec;
}

export function validateChoreography(spec, duration) {
  if(!spec || !Array.isArray(spec.objects) || !spec.objects.length || spec.objects.length > 12) throw new Error('Shot must contain 1-12 objects.');
  const ids = new Set(); const kinds = new Set(['chat','document','code','memory','comment','diagram','text','image']);
  for(const o of spec.objects) {
    if(!o.id || ids.has(o.id)) throw new Error('Shot object IDs must be unique.'); ids.add(o.id);
    if(!kinds.has(o.kind) || ![o.x,o.y,o.w,o.h].every(Number.isFinite) || o.w<40 || o.h<40 ||
      o.x-o.w/2<0 || o.x+o.w/2>1600 || o.y-o.h/2<0 || o.y+o.h/2>680) throw new Error(`Object ${o.id} violates the content safe area.`);
  }
  const properties = new Set(['x','y','scale','opacity','reveal','highlight']);
  const seenTracks = new Set();
  for(const t of spec.tracks ?? []) {
    const key=`${t.target}:${t.property}`;
    if(!ids.has(t.target)||!properties.has(t.property)||seenTracks.has(key)) throw new Error(`Invalid or conflicting track ${key}.`);
    seenTracks.add(key); let prev=-1;
    for(const k of t.keys ?? []) {
      if(!Number.isFinite(k.value)||!Number.isInteger(k.at)||k.at<0||k.at>=duration||k.at<=prev) throw new Error('Invalid animation keyframes.'); prev=k.at;
    }
    if(!t.keys?.length) throw new Error('Empty animation track.');
  }
  for(const c of spec.connections ?? []) if(!ids.has(c.from)||!ids.has(c.to)||c.start<0||c.end<=c.start||c.end>=duration) throw new Error('Invalid information path.');
  for(const k of spec.camera??[]) {
    if(![k.x,k.y,k.scale,k.at].every(Number.isFinite)||k.at<0||k.at>=duration||k.scale<.9||k.scale>1.15||
      Math.abs(k.x)>1600||Math.abs(k.y)>680) throw new Error('Invalid camera focus or translation.');
  }
  if(!(spec.tracks ?? []).some(t=>['x','y','reveal','highlight'].includes(t.property)&&t.keys[0].value!==t.keys.at(-1).value)&&
    !(spec.connections??[]).some(c=>c.packet&&c.from!==c.to)) throw new Error('Shot has no explanatory animation.');
}

export function validateCustomSource(source) {
  if(typeof source !== 'string'||source.length>80_000||!source.includes('export default')) throw new Error('Custom shot must export a component.');
  const importRe = /(?:import|export)\s+(?:[^;'"\n]+?\s+from\s*)?['"]([^'"]+)['"]/g;
  for(const match of source.matchAll(importRe)) if(!['react','remotion','./shot-runtime.jsx'].includes(match[1])) throw new Error(`Custom shot import is not allowed: ${match[1]}`);
  if(/\b(?:fetch|XMLHttpRequest|WebSocket|eval|Function|require|process|globalThis|window|document|Date|setTimeout|setInterval|importScripts)\b|import\s*\(|Math\.random/.test(source)) throw new Error('Custom shot contains side effects or nondeterministic APIs.');
  if(/(?:https?:|file:|data:)\/\//.test(source)) throw new Error('Custom shot assets must use approved staged media.');
  return source;
}

function writeAtomic(path, text) {
  mkdirSync(dirname(path),{recursive:true}); const temp=`${path}.${process.pid}.tmp`;
  writeFileSync(temp,text,'utf8'); renameSync(temp,path);
}

export function buildVisualProgram(storyboard, {resourcesDirectory, requests = {}, catalog = loadShotCatalog()} = {}) {
  const updated=structuredClone(storyboard); const decisions=[]; const sources={}; let previousSpec=null; let previousBeat=null;
  const known = new Set(updated.scenes.flatMap(s=>(s.visualBeats??[]).map(b=>b.id)));
  for(const id of Object.keys(requests)) if(!known.has(id)) throw new Error(`Unknown requested beat: ${id}`);
  for(const [sceneIndex,scene] of updated.scenes.entries()) for(const [beatIndex,beat] of (scene.visualBeats??[]).entries()) {
    delete beat.implementation;
    const request=requests[beat.id] ?? {};
    const decision=chooseShot({beat,scene,request,catalog});
    const key=`s${sceneIndex}_b${beatIndex}_${safeId(beat.id)}`;
    decisions.push({...decision,designReason:request.reason??null,key,beatId:beat.id,sceneIndex,claimIndexes:beat.claimIndexes,truthMode:beat.truthMode,
      narrationCue:beat.narrationCue,startFrame:beat.startFrame,endFrame:beat.endFrame});
    if(decision.templateId==='repository-media') {previousBeat=beat; continue;}
    let spec;
    let source;
    if(decision.route==='custom') source=validateCustomSource(request.source);
    else {
      spec=request.choreography ?? composeShot(beat,scene,{fps:updated.meta.fps,previousBeat,previousSpec});
      validateChoreography(spec,Math.max(12,(beat.endFrame ?? Math.round(scene.duration*updated.meta.fps))-(beat.startFrame??0)));
      source=`import React from 'react';\nimport {ChoreographyScene} from './shot-runtime.jsx';\nconst spec=${JSON.stringify(spec)};\nexport default function Shot({frame,accent}) { return <ChoreographyScene spec={spec} frame={frame} accent={accent}/>; }\n`;
    }
    sources[`${key}.jsx`]=source;
    beat.implementation={key,route:decision.route,templateId:decision.templateId??null};
    if(spec) previousSpec=spec; previousBeat=beat;
  }
  const inputDigest=productionIdentity(updated);
  const catalogDigest=digest(JSON.stringify(catalog));
  const sourceHashes=Object.fromEntries(Object.entries(sources).map(([name,source])=>[name,digest(source)]));
  const audioPath=join(resourcesDirectory,'production/narration.wav');
  const audioSha256=updated.voiceover==='narration.wav'&&existsSync(audioPath)?digest(readFileSync(audioPath)):null;
  const program={schemaVersion:1,rendererVersion:'1.0.0',inputDigest,catalogDigest,decisions,sourceHashes,audioSha256,
    status:'compiled-pending-render',humanReview:'pending',createdAt:new Date().toISOString()};
  const programDigest=digest(JSON.stringify({...program,createdAt:undefined}));
  const root=join(resourcesDirectory,'shots',programDigest);
  for(const [name,source] of Object.entries(sources)) writeAtomic(join(root,name),source);
  const runtimePath=join(ROOT,'apps/video-factory/remotion/MotionPrimitives.jsx').replaceAll('\\','/');
  writeAtomic(join(root,'shot-runtime.jsx'),`export {ChoreographyScene, CameraStage, VisualObject} from ${JSON.stringify(runtimePath)};\n`);
  program.runtimeDigest=digest(readFileSync(join(root,'shot-runtime.jsx')));
  program.programDigest=programDigest;
  writeAtomic(join(root,'program.json'),`${JSON.stringify(program,null,2)}\n`);
  updated.meta.visualProgram={schemaVersion:1,directory:relative(resourcesDirectory,root).replaceAll('\\','/'),
    digest:digest(readFileSync(join(root,'program.json'))),inputDigest};
  return {storyboard:updated,program,directory:root};
}

export function verifyVisualProgram(storyboard, resourcesDirectory) {
  const ref=storyboard.meta.visualProgram; if(!ref) return null;
  const root=resolve(resourcesDirectory,ref.directory);
  if(!root.startsWith(resolve(resourcesDirectory)+sep)) throw new Error('Visual program escapes project resources.');
  const programText=readFileSync(join(root,'program.json'),'utf8'); const program=JSON.parse(programText);
  if(digest(programText)!==ref.digest||productionIdentity(storyboard)!==program.inputDigest||ref.inputDigest!==program.inputDigest) throw new Error('Visual program is stale or modified. Rebuild shots.');
  if(program.audioSha256&&digest(readFileSync(join(resourcesDirectory,'production/narration.wav')))!==program.audioSha256) throw new Error('Approved narration changed after shot planning.');
  if(digest(readFileSync(join(root,'shot-runtime.jsx')))!==program.runtimeDigest) throw new Error('Shot runtime adapter changed.');
  const expected=new Set(program.decisions.filter(d=>d.templateId!=='repository-media').map(d=>d.key));
  const actual=storyboard.scenes.flatMap(s=>(s.visualBeats??[]).filter(b=>b.implementation).map(b=>b.implementation.key));
  if(actual.length!==expected.size||new Set(actual).size!==actual.length||actual.some(k=>!expected.has(k))) throw new Error('Visual shot mapping is incomplete.');
  for(const d of program.decisions) {
    const beat=storyboard.scenes[d.sceneIndex]?.visualBeats?.find(b=>b.id===d.beatId);
    if(!beat || (d.templateId!=='repository-media' && beat.implementation?.key!==d.key)) throw new Error('Shot is assigned to the wrong beat.');
  }
  for(const [name,hash] of Object.entries(program.sourceHashes)) {
    if(!/^[A-Za-z0-9_-]+\.jsx$/.test(name)||digest(readFileSync(join(root,name)))!==hash) throw new Error(`Shot source changed: ${name}`);
  }
  return {program,directory:root};
}

export function writeRenderEntry(storyboard, resourcesDirectory, entryPath) {
  const verified=verifyVisualProgram(storyboard,resourcesDirectory); if(!verified) return null;
  const modules=Object.keys(verified.program.sourceHashes);
  const remotion=join(ROOT,'apps/video-factory/remotion');
  const absolute=p=>JSON.stringify(p.replaceAll('\\','/'));
  const entry=`import React from 'react';\nimport {Composition,registerRoot} from 'remotion';\n`+
    `import {KnowledgeVideo} from ${absolute(join(remotion,'KnowledgeVideo.jsx'))};\n`+
    `import {ShotRegistryContext} from ${absolute(join(remotion,'ShotRegistry.jsx'))};\n`+
    modules.map((file,i)=>`import Shot${i} from ${absolute(join(verified.directory,file))};`).join('\n')+`\n`+
    `const registry={${modules.map((file,i)=>`${JSON.stringify(file.slice(0,-4))}:Shot${i}`).join(',')}};\n`+
    `const Video=props=><ShotRegistryContext.Provider value={registry}><KnowledgeVideo {...props}/></ShotRegistryContext.Provider>;\n`+
    `const Root=()=> <Composition id="KnowledgeShare" component={Video} width={1920} height={1080} fps={30} durationInFrames={90} `+
    `calculateMetadata={({props})=>({width:props.meta.width,height:props.meta.height,fps:props.meta.fps,durationInFrames:props.scenes.reduce((n,s)=>n+Math.max(1,Math.round(s.duration*props.meta.fps)),0)})}/>;\nregisterRoot(Root);\n`;
  writeAtomic(entryPath,entry); return entryPath;
}
