import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,mkdtempSync,mkdirSync,writeFileSync,rmSync} from 'node:fs';
import {join,resolve} from 'node:path';
import {tmpdir} from 'node:os';
import {loadEditorialContract,trustedContractPrompt} from '../apps/repo-researcher/src/editorial-contract.mjs';
import {loadLibraries,compileTimeline,makeAudioDraft} from '../apps/video-factory/src/creative-plan.mjs';
import {searchMaterials,searchTokens} from '../apps/video-factory/src/material-search.mjs';
import {directorContextPrompt,shotTaskPrompt,realizeShot,realizationState} from '../apps/video-factory/src/director-context.mjs';
import {createProductionPackage,bindProductionShots,validatePlannedRealization} from '../apps/video-factory/src/production-package.mjs';
import {loadVideoEditingSkill} from '../apps/video-factory/src/editorial-agent.mjs';
import {writeShotPreviewHarness} from '../apps/video-factory/src/shot-preview.mjs';
import {buildCreativeProgram,verifyCreativeProgram} from '../apps/video-factory/src/creative-program.mjs';
const root=resolve(import.meta.dirname,'..'),libraries=loadLibraries(root),contract=loadEditorialContract(root);
function fixture(){
  const value={claims:[{claim:'存入记忆',quote:'Stores memory.'}],content:{title:'存入记忆',fullNarration:'信息进入记忆。之后再次找回。',styleId:'editorial-paper',visualIntent:'同一信息跨场景传递',units:[{id:'input',heading:'保存',narration:'信息进入记忆。',visualIntent:'信息存入',claimIndexes:[0]},{id:'output',heading:'找回',narration:'之后再次找回。',visualIntent:'同一信息返回',claimIndexes:[0]}]},designContext:'紫色标记保持身份，右侧容器保持位置。',shots:[{id:'s1',unitId:'input',narrationCue:'信息进入',purpose:'说明保存',visualDesign:'标签进入容器，可采用弧线传递',continuity:'右侧容器留在原位置',route:'library',libraryIds:['flow-packet'],assetIds:[]},{id:'s2',unitId:'output',narrationCue:'之后再次',purpose:'说明找回',visualDesign:'标记返回问题所在位置',continuity:'保留标记身份',route:'custom',libraryIds:[],assetIds:[]}],assets:[]};
  const result=createProductionPackage(value,{fullName:'fixture/memory',preview:{readmeText:'Stores memory.',readmeName:'README.md',sha:'a'.repeat(40)},contract,editingSkill:loadVideoEditingSkill(root),libraries});
  const timing={totalFrames:120,clips:[{text:'信息进入记忆。',startFrame:0,endFrame:60},{text:'之后再次找回。',startFrame:60,endFrame:120}]};
  return {...result,timing,shots:bindProductionShots(result.plan,timing,30)};
}

test('stage context excludes other responsibilities while keeping one full contract identity',()=>{
  const director=trustedContractPrompt(contract,{stage:'director'}),research=trustedContractPrompt(contract,{stage:'research'});
  assert.deepEqual(director.metadata,research.metadata);
  assert.ok(director.body.includes('## 导演实现画面'));
  assert.ok(!director.body.includes('## 配音后落实时间')&&!director.body.includes('## 研究与策划交付'));
  assert.ok(!research.body.includes('## 导演实现画面'));
  assert.throws(()=>trustedContractPrompt(contract,{stage:'missing'}),/Unknown production stage/);
});

test('focused director inputs retain current timing and joins without repeating the complete narration or neighbors',()=>{
  const {plan,shots}=fixture(),style=libraries.styles.find(s=>s.id===plan.content.styleId);
  const baseline=directorContextPrompt({contractBody:trustedContractPrompt(contract,{stage:'director'}).body,plan,style,references:'index.json',planPath:'full-plan.json'});
  assert.ok(!baseline.includes(plan.content.fullNarration));assert.ok(baseline.includes('full-plan.json'));
  const task=shotTaskPrompt({shot:shots[0],next:shots[1],captions:[{text:'信息进入记忆。',startFrame:0,endFrame:60}],sourceFile:'shot.jsx',assignmentFile:'assignment.json',previewCommand:'preview',statePath:'state.json'});
  assert.ok(task.includes('信息进入记忆。'));assert.ok(task.includes('endFrame":60'));
  assert.ok(task.includes(shots[0].continuity));assert.ok(!task.includes(shots[1].visualDesign));
});

test('retrieval tokenizes Chinese and fuses expression routes without reading executable code or media',()=>{
  assert.ok(searchTokens('信息传递').includes('传递'));
  const results=searchMaterials(libraries.motions,{query:'信息进入存储，并行汇集结果',limit:5});
  assert.ok(results.some(m=>m.id==='flow-packet'));assert.ok(results.some(m=>m.id==='cascade-grid'));
  assert.ok(results[0].routes.includes('expression-query'));
  assert.ok(results.every(m=>!('codePath' in m)&&!('demo' in m)&&!('review' in m)));
  assert.equal(searchMaterials(libraries.motions,{query:'qzxunmatched987'}).length,0);
  assert.throws(()=>searchMaterials(libraries.motions,{query:'信息',limit:0}),/limit/);
});

test('retrieval selects complementary components for multiple needs and isolates project materials',()=>{
  const matches=searchMaterials(libraries.motions,{queries:['代码新增删除的前后差异','浏览器界面中的逐字输入'],limit:8});
  assert.ok(matches.some(m=>m.id==='code-diff'));assert.ok(matches.some(m=>m.id==='accent-typewriter'));
  const materials=[{id:'owned',description:'特殊记忆',reuseScope:'project',sourceProject:'a/b'},{id:'public',description:'特殊记忆',reuseScope:'universal'}];
  assert.deepEqual(searchMaterials(materials,{query:'特殊记忆',fullName:'c/d'}).map(m=>m.id),['public']);
  assert.equal(searchMaterials(materials,{query:'特殊记忆',fullName:'a/b'}).length,2);
});

test('director may replace or combine preferred components but cannot change semantic identity or audio coverage',()=>{
  const {plan,shots}=fixture();
  const source="import {CameraMove,CardFlip} from './motion-library.jsx';export default function Shot(){return <CameraMove keys={[]}><CardFlip before={<div/>} after={<div/>}/></CameraMove>}";
  const scene=realizeShot(shots[0],{sourceFile:'shot.jsx',libraryIds:['camera-move','card-flip'],summary:'视角变化与状态翻转组合'},source,libraries);
  const next=realizeShot(shots[1],{sourceFile:'next.jsx',libraryIds:[],summary:'直接绘制'},'export default ()=> <svg/>',libraries);
  const visual={styleId:plan.content.styleId,scenes:[scene,next]};
  assert.doesNotThrow(()=>validatePlannedRealization(plan,shots,visual));assert.equal(scene.beats[0].route,'compose');
  assert.ok(realizationState(visual.scenes).shots[0].sourceDigest);
  assert.throws(()=>realizeShot(shots[0],{libraryIds:['missing'],summary:'x'},source,libraries),/exist/);
  visual.scenes[0].endFrame=59;assert.throws(()=>validatePlannedRealization(plan,shots,visual),/changed/);
});

test('free implementation can compile without using the preferred component; undeclared code use remains checked',()=>{
  const f=fixture(),scenes=f.shots.map(s=>realizeShot(s,{sourceFile:s.id+'.jsx',libraryIds:[],summary:'自由 SVG 表达'},'export default ()=> <svg><circle r={20}/></svg>',libraries));
  const visual={styleId:f.plan.content.styleId,scenes};validatePlannedRealization(f.plan,f.shots,visual);
  const compiled=compileTimeline({audioStoryboard:makeAudioDraft(f.plan,f.research),timing:f.timing,visual,research:f.research,libraries,contentDigest:f.plan.contentDigest});
  assert.equal(compiled.storyboard.meta.totalFrames,120);assert.equal(compiled.decisions[0].route,'custom');
  scenes[0].beats[0].libraryIds=['camera-move'];scenes[0].beats[0].route='library';
  assert.throws(()=>compileTimeline({audioStoryboard:makeAudioDraft(f.plan,f.research),timing:f.timing,visual,research:f.research,libraries}),/not used/);
});

test('expanded components are accessible in previews and compiled output, with current audio and source hashes',t=>{
  const resources=mkdtempSync(join(tmpdir(),'description-retrieval-'));t.after(()=>rmSync(resources,{recursive:true,force:true}));
  mkdirSync(join(resources,'production'));writeFileSync(join(resources,'production/narration.wav'),'same-audio');
  const f=fixture();writeFileSync(join(resources,'production/timing.json'),JSON.stringify(f.timing));
  const sourceFile=join(resources,'s1','shot.jsx');mkdirSync(join(resources,'s1'));writeFileSync(sourceFile,'export default ()=>null');
  writeShotPreviewHarness(join(resources,'s1','preview'),{sourceFile,durationInFrames:60,fps:30,style:libraries.styles[0],fullName:'fixture/memory'});
  assert.ok(readFileSync(join(resources,'s1','motion-library.jsx'),'utf8').includes('MotionLibrary.jsx'));
  const scenes=f.shots.map(s=>realizeShot(s,{sourceFile,libraryIds:[],summary:'自由绘制'},'export default ()=> <svg/>',libraries));
  const compiled=compileTimeline({audioStoryboard:makeAudioDraft(f.plan,f.research),timing:f.timing,visual:{styleId:f.plan.content.styleId,scenes},research:f.research,libraries});
  const built=buildCreativeProgram(compiled,{resourcesDirectory:resources});
  assert.ok(readFileSync(join(built.directory,'motion-library.jsx'),'utf8').includes('MotionLibrary.jsx'));
  assert.equal(verifyCreativeProgram(built.storyboard,resources).program.audioSha256,built.program.audioSha256);
});
