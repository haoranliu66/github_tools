import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,mkdirSync,readFileSync,writeFileSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {dirname,join,resolve} from 'node:path';
import {directorMode,authoringSchema,validateJoins,prepareSegmentAssignments,collectImplementations,implementLongSegments} from '../apps/video-factory/src/director-modes.mjs';
import {directorSkillBody} from '../apps/video-factory/src/director-skill.mjs';
import {createProductionPackage,validatePlannedRealization} from '../apps/video-factory/src/production-package.mjs';
import {prepareProductionMaterials,validateProductionMaterials,stageCustomMaterials,localCodeDependencies} from '../apps/video-factory/src/production-materials.mjs';
import {hash,loadLibraries,makeAudioDraft,compileTimeline} from '../apps/video-factory/src/creative-plan.mjs';
import {loadEditorialContract} from '../apps/repo-researcher/src/editorial-contract.mjs';
import {loadVideoEditingSkill} from '../apps/video-factory/src/editorial-agent.mjs';
import {visualFromLayout} from '../apps/video-factory/src/director-layout.mjs';
import {buildCreativeProgram,verifyCreativeProgram} from '../apps/video-factory/src/creative-program.mjs';
import {compileVisualProgram} from '../apps/video-factory/src/runtime-preflight.mjs';
const root=resolve(import.meta.dirname,'..'),libraries=loadLibraries(root);
function fixture(t,{component=false,custom=false}={}){
  const resources=mkdtempSync(join(tmpdir(),'director-mode-test-'));t.after(()=>rmSync(resources,{recursive:true,force:true}));
  const narration='信息进入记忆。之后再次找回。';
  const value={claims:[{claim:'保存和找回',quote:'Stores memory.'}],content:{title:'记忆',fullNarration:narration,styleId:'editorial-paper',visualIntent:'同一标签保存和找回',units:[{id:'one',heading:'保存和找回',narration,visualIntent:'连续例子',claimIndexes:[0]}]},designContext:'紫色标记保持身份，右侧容器保持位置。',shots:[{id:'planned',unitId:'one',narrationCue:'信息进入',purpose:'保存和找回',visualDesign:'同一标记进出容器',continuity:'同一标记和容器',route:component?'library':'custom',libraryIds:component?['flow-packet']:[],assetIds:[]}],assets:[],customMaterials:custom?[{id:'custom-marker',exportName:'CustomMarker',source:'import React from "react";export default function Marker(){return <div>同一标记</div>;}',usage:'CustomMarker() renders the shared marker.',demoSource:'import React from "react";import Marker from "./component.jsx";export default ()=> <Marker/>;',shotIds:['planned']}]:[]};
  value.contentRoute={skill:'github-project-sharing',form:'single-short'};
  value.sharing={viewerPromise:'理解这个任务怎样得到可用结果',story:'同一输入经关键处理形成结果，结尾说明用途',example:'偏好输入、保存、再次找回',resultShotIds:['planned']};
  const result=createProductionPackage(value,{fullName:'fixture/memory',preview:{readmeName:'README.md',readmeText:'Stores memory.',sha:'a'.repeat(40)},contract:loadEditorialContract(root),editingSkill:loadVideoEditingSkill(root),libraries});
  const layout={styleId:'editorial-paper',designSummary:value.designContext,scenes:[{id:'story',title:'保存和找回',purpose:'连续说明',startFrame:0,endFrame:120,beats:[{id:'save',startFrame:0,endFrame:60,planShotIds:['planned'],narrationCue:'信息进入',purpose:'保存',visualDesign:'标签存入',continuity:'标签在容器',libraryIds:[],assetIds:[]},{id:'recall',startFrame:60,endFrame:120,planShotIds:['planned'],narrationCue:'之后再次',purpose:'找回',visualDesign:'同一标签返回',continuity:'结果停留',libraryIds:[],assetIds:[]}]}]};
  const joins=[{id:'save',incoming:'紫色标签在左边',outgoing:'紫色标签在右侧容器'},{id:'recall',incoming:'紫色标签在右侧容器',outgoing:'同一标签回到左边'}];
  const audio={totalFrames:120,fps:30,clips:[{text:'信息进入记忆。',startFrame:0,endFrame:60},{text:'之后再次找回。',startFrame:60,endFrame:120}]};
  return {resources,value,...result,layout,joins,audio,style:libraries.styles.find(s=>s.id==='editorial-paper'),runDirectory:join(resources,'shots/runs/test'),production:join(resources,'production'),sharedSource:'export const marker="same-object";'};
}
function assignments(f){return prepareSegmentAssignments({...f,materials:[]});}
test('measured duration selects one whole-film authoring below 120 seconds, including future longer content',()=>{
  assert.equal(directorMode(3599,30),'short');assert.equal(directorMode(3600,30),'long');assert.equal(directorMode(30*600,30),'long');assert.equal(directorMode(30*102,30),'short');
  assert.ok(authoringSchema('short').required.includes('shots'));assert.ok(!authoringSchema('long').required.includes('shots'));
  assert.throws(()=>directorMode(0,30),/measured/);
});
test('prepared selected components include runnable dependency links and stale resources stop handoff',t=>{
  const f=fixture(t,{component:true});prepareProductionMaterials(f.plan,{root,resourcesDirectory:f.resources});
  const materials=validateProductionMaterials(f.plan,{root,resourcesDirectory:f.resources});assert.equal(materials.length,1);assert.equal(materials[0].id,'flow-packet');assert.ok(materials[0].dependencies.files.length>=1);
  assert.ok(materials[0].usage.path.endsWith('usage.md'));assert.ok(materials[0].demo.path.endsWith('demo.mp4'));assert.ok(!('source' in materials[0]));
  writeFileSync(f.plan.preproduction.style.path,'changed');assert.throws(()=>validateProductionMaterials(f.plan,{root,resourcesDirectory:f.resources}),/style/);
});
test('read-only research custom source is staged by host and only local links enter final plan',t=>{
  const f=fixture(t,{custom:true});let calls=0;
  const render=assignment=>{calls++;const output=join(dirname(assignment),'actual.mp4');writeFileSync(output,'rendered-demo');return {output};};
  stageCustomMaterials(f.value,{resourcesDirectory:f.resources,style:f.style,fullName:f.plan.fullName,render});
  stageCustomMaterials(f.value,{resourcesDirectory:f.resources,style:f.style,fullName:f.plan.fullName,render});assert.equal(calls,1);
  prepareProductionMaterials(f.plan,{root,resourcesDirectory:f.resources});const m=f.plan.preproduction.customMaterials[0];
  assert.ok(m.code.path.endsWith('component.jsx'));assert.equal(readFileSync(m.demo.path,'utf8'),'rendered-demo');assert.ok(!('source' in m)&&!('demoSource' in m));
  writeFileSync(m.code.path,'changed');assert.throws(()=>validateProductionMaterials(f.plan,{root,resourcesDirectory:f.resources}),/changed/);
});
test('missing transitive local dependencies are rejected without executing code',t=>{
  const f=fixture(t),file=join(f.resources,'component.jsx');writeFileSync(file,'import Missing from "./missing.jsx";export default ()=>null;');
  assert.throws(()=>localCodeDependencies(file,f.resources),/Missing prepared code dependency/);
});
test('one short-film response collects all generated source files and rejects partial delivery',t=>{
  const f=fixture(t),entries=assignments(f);const records=entries.map(e=>{writeFileSync(e.sourceFile,'import React from "react";import {marker} from "./shared.jsx";export default ()=> <div>{marker}</div>;');return {id:e.shot.id,sourceFile:e.sourceFile,libraryIds:[],summary:'连续标记'};});
  const actual=collectImplementations({entries,records,runInputs:{mode:'short'},libraries,sharedSource:f.sharedSource});assert.equal(Object.keys(actual).length,2);
  assert.throws(()=>collectImplementations({entries,records:records.slice(0,1),runInputs:{},libraries,sharedSource:f.sharedSource}),/every assigned segment/);
  assert.throws(()=>validateJoins(f.layout,f.joins.slice(0,1)),/every actual segment/);
});
test('long-film children get fresh scoped sessions and share continuity; unchanged children are reused',async t=>{
  const f=fixture(t),entries=assignments(f),inputs={mode:'long'},calls=[];let active=0,maxActive=0;
  const runAgent=async(prompt,options)=>{calls.push({prompt,options});active++;maxActive=Math.max(maxActive,active);await new Promise(r=>setTimeout(r,15));const entry=entries.find(e=>dirname(e.sourceFile)===options.workingDirectory);writeFileSync(entry.sourceFile,'export default ()=> <div>同一标记</div>;');active--;return {sessionId:'child-'+entry.shot.id,value:{sourceFile:entry.sourceFile,libraryIds:[],summary:'连续对象'}};};
  const args={entries,joins:f.joins,sharedSource:f.sharedSource,runInputs:inputs,libraries,runAgent,childContract:'common',childSkill:directorSkillBody(root,'child'),previewScript:'preview.mjs'};
  const actual=await implementLongSegments(args);assert.equal(calls.length,2);assert.equal(maxActive,2);assert.ok(calls.every(c=>!c.options.sessionId&&!c.prompt.includes('fullNarration')));
  assert.ok(calls[0].prompt.includes(f.joins[0].incoming));assert.notEqual(actual.save.childSessionId,actual.recall.childSessionId);
  await implementLongSegments({...args,retained:actual});assert.equal(calls.length,2);
  const changed=structuredClone(f.joins);changed[1].incoming='标签从顶部进入';
  const newEntries=prepareSegmentAssignments({...f,joins:changed,materials:[]});await implementLongSegments({...args,entries:newEntries,joins:changed,retained:actual});assert.equal(calls.length,3);
});
test('shared JSX compiles in actual Remotion runtime and source changes invalidate inspected identity',t=>{
  const f=fixture(t,{custom:true});
  stageCustomMaterials(f.value,{resourcesDirectory:f.resources,style:f.style,fullName:f.plan.fullName,render:assignment=>{const output=join(dirname(assignment),'actual.mp4');writeFileSync(output,'demo');return {output};}});prepareProductionMaterials(f.plan,{root,resourcesDirectory:f.resources});
  const entries=assignments(f);mkdirSync(f.production,{recursive:true});writeFileSync(join(f.production,'narration.wav'),'fixture-audio');writeFileSync(join(f.production,'timing.json'),JSON.stringify(f.audio));
  const records=entries.map(e=>{writeFileSync(e.sourceFile,'import React from "react";import {marker} from "./shared.jsx";import {CustomMarker} from "./prepared-materials.jsx";export default ()=> <div>{marker}<CustomMarker/></div>;');return {id:e.shot.id,sourceFile:e.sourceFile,libraryIds:[],summary:'共享身份'};});
  const actual=collectImplementations({entries,records,runInputs:{mode:'short'},libraries,sharedSource:f.sharedSource});
  const visual={...visualFromLayout(f.layout,f.plan,actual),sharedSources:{'shared.jsx':f.sharedSource}};
  const compiled=compileTimeline({audioStoryboard:makeAudioDraft(f.plan,f.research),timing:f.audio,visual,research:f.research,libraries,contentDigest:f.plan.contentDigest});
  validatePlannedRealization(f.plan,f.audio,30,visual,libraries);compiled.preparedMaterials=f.plan.preproduction.customMaterials;
  const built=buildCreativeProgram(compiled,{resourcesDirectory:f.resources});assert.ok(built.program.sourceHashes['shared.jsx']);
  assert.equal(compileVisualProgram(built.storyboard,f.resources).status,'passed');verifyCreativeProgram(built.storyboard,f.resources);
  writeFileSync(join(built.directory,'shared.jsx'),'export const marker="changed";');assert.throws(()=>verifyCreativeProgram(built.storyboard,f.resources),/Generated source changed/);
});
test('mode-specific Skill loading excludes unrelated synthesis and director modes',()=>{
  const short=directorSkillBody(root,'short'),child=directorSkillBody(root,'child');assert.ok(short.includes('短片采用整体生成'));assert.ok(!short.includes('## 长片采用统筹镜头子代理实现'));assert.ok(child.includes('镜头子代理'));assert.ok(!child.includes('## 短片采用整体生成'));assert.ok(!child.includes('Qwen'));
});
