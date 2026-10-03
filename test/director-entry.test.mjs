import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,mkdirSync,readFileSync,writeFileSync,rmSync,copyFileSync} from 'node:fs';
import {dirname,join,resolve} from 'node:path';
import {tmpdir} from 'node:os';
import {directMain} from '../apps/video-factory/src/director-cli.mjs';
import {writeCurrentProductionFixture,repositoryRoot} from './helpers/current-production-fixture.mjs';
import {visualContext} from '../apps/video-factory/remotion/visual-context.mjs';
import {compileTimeline,loadLibraries,makeAudioDraft,hash} from '../apps/video-factory/src/creative-plan.mjs';
import {stageAuthoringRequest,prepareSegmentAssignments,collectImplementations} from '../apps/video-factory/src/director-modes.mjs';
import {visualFromLayout} from '../apps/video-factory/src/director-layout.mjs';
import {validateProductionPackage} from '../apps/video-factory/src/production-package.mjs';
import {runVisualPreflight,visualStoryboardDigest,visualTimeline} from '../apps/video-factory/src/visual-preflight.mjs';
const libraries=loadLibraries(repositoryRoot);
function fixture(t,seconds=4){
  const root=mkdtempSync(join(tmpdir(),'director-entry-test-'));t.after(()=>rmSync(root,{recursive:true,force:true}));
  mkdirSync(join(root,'config'));copyFileSync(join(repositoryRoot,'config/style-library.json'),join(root,'config/style-library.json'));copyFileSync(join(repositoryRoot,'config/video-editorial.json'),join(root,'config/video-editorial.json'));writeFileSync(join(root,'config/motion-library.json'),JSON.stringify({schemaVersion:3,motions:[]}));
  const skill='.agents/skills/video-editorial-agent/SKILL.md';mkdirSync(dirname(join(root,skill)),{recursive:true});copyFileSync(join(repositoryRoot,skill),join(root,skill));
  const f=writeCurrentProductionFixture(root,{fullName:'fixture/approved',snapshotDate:'2026-09-14',visual:false});
  const frames=seconds*30,bytes=Buffer.alloc(seconds*48000+44);bytes.write('RIFF');bytes.writeUInt32LE(bytes.length-8,4);bytes.write('WAVE',8);bytes.write('fmt ',12);bytes.writeUInt32LE(16,16);bytes.writeUInt16LE(1,20);bytes.writeUInt16LE(1,22);bytes.writeUInt32LE(24000,24);bytes.writeUInt32LE(48000,28);bytes.writeUInt16LE(2,32);bytes.writeUInt16LE(16,34);bytes.write('data',36);bytes.writeUInt32LE(seconds*48000,40);
  writeFileSync(join(f.layout.productionDirectory,'narration.wav'),bytes);const timing={totalFrames:frames,clips:[{text:f.plan.content.fullNarration,startFrame:0,endFrame:frames}]};writeFileSync(join(f.layout.productionDirectory,'timing.json'),JSON.stringify(timing));
  const selection=join(root,'selection.json');writeFileSync(selection,JSON.stringify({schemaVersion:1,weekId:'2026-W38',snapshotDate:'2026-09-14',status:'approved',sourceReport:'output/2026-09-14.json',selectedRepositories:['fixture/approved',...Array.from({length:6},(_,i)=>'fixture/repo'+i)],videoProjects:['fixture/approved']}));
  const layout={styleId:f.plan.content.styleId,designSummary:'同一标签与容器',scenes:[{id:'story',title:'偏好保存',purpose:'保存偏好',startFrame:0,endFrame:frames,beats:['save','recall'].map((id,i)=>({id,startFrame:i*frames/2,endFrame:(i+1)*frames/2,planShotIds:['shot1'],narrationCue:'记住偏好',purpose:'展示偏好',visualDesign:'标签进入容器',continuity:'同一标签',libraryIds:[],assetIds:[]}))}]};
  const joins=[{id:'save',incoming:'label-left',outgoing:'label-right'},{id:'recall',incoming:'label-right',outgoing:'label-left'}];
  return {...f,root,selection,timing,wholeLayout:layout,joins};
}
function author(f,outputPath,mode){const run=dirname(outputPath),sharedSourceFile=join(run,'shared.jsx');writeFileSync(sharedSourceFile,'export const marker="same";');return {layout:f.wholeLayout,sharedSourceFile,joins:f.joins,...(mode==='short'?{shots:f.wholeLayout.scenes[0].beats.map(b=>{const sourceFile=join(run,b.id,'shot.jsx');mkdirSync(dirname(sourceFile),{recursive:true});writeFileSync(sourceFile,'export default ()=> <div>偏好</div>;');return {id:b.id,sourceFile,libraryIds:[],summary:'同一偏好'};})}:{})};}
async function invoke(f,options={},extra=[]){const previous=process.argv;process.argv=[process.execPath,'director-cli.mjs','--selection',f.selection,'--repo','fixture/approved',...extra];try{return await directMain({root:f.root,compile:()=>({status:'passed'}),review:async()=>({status:'passed',reportPath:join(f.layout.productionDirectory,'review.json')}),...options});}finally{process.argv=previous;}}
test('default short director hands the whole-film task to the current main Agent and resumes its response',async t=>{
  const f=fixture(t);let pending;
  await assert.rejects(invoke(f,{runAgent:()=>{throw new Error('Short director must not spawn a model.');}}),error=>{pending=error;return error.agentTaskStatus==='pending';});
  assert.equal(pending.task.kind,'initial-authoring');assert.equal(pending.task.owner,'main-agent');
  const request=author(f,join(pending.task.context.runDirectory,'response.json'),'short'),response=join(f.root,'main-response.json');
  writeFileSync(response,JSON.stringify({taskId:pending.task.taskId,value:request}));
  await invoke(f,{runAgent:()=>{throw new Error('Short director must not spawn a model.');}},['--task-response',response]);
  const state=JSON.parse(readFileSync(join(f.layout.resourcesDirectory,'director-state.json'),'utf8'));assert.equal(state.phase,'visual-ready');assert.equal(state.shots.length,2);
});

test('director resumes its real main-Agent preflight without repeating whole-film authoring',async t=>{
  const f=fixture(t),directory=join(f.layout.resourcesDirectory,'production/visual-preflight/protocol');mkdirSync(directory,{recursive:true});
  writeFileSync(join(directory,'.visual-preflight-workspace.json'),JSON.stringify({owner:'visual-preflight',resourcesDirectory:f.layout.resourcesDirectory}));
  let manifest,task,initialTask,firstStoryboard;
  const review=options=>{
    if(firstStoryboard)assert.deepEqual(options.storyboard,firstStoryboard);else firstStoryboard=structuredClone(options.storyboard);
    if(!manifest){const file=join(directory,'sample.png');writeFileSync(file,'protocol frame');const pages=[{id:'sample',file,kind:'sequence',startSeconds:0,endSeconds:4,sha256:hash(readFileSync(file))}];manifest={directory,pages,pagesPerReview:8,renderOrigin:'compiled-storyboard',timeline:visualTimeline(options.storyboard),storyboardDigest:visualStoryboardDigest(options.storyboard),evidenceDigest:hash(JSON.stringify(pages))};writeFileSync(join(directory,'manifest.json'),JSON.stringify(manifest));}
    return runVisualPreflight({...options,manifest});
  };
  const noChild=()=>{throw Error('Main Agent preflight and short direction cannot spawn models.');};
  await assert.rejects(invoke(f,{runAgent:noChild,review}),e=>{initialTask=e.task;return e.agentTaskStatus==='pending'&&e.task.kind==='initial-authoring';});
  writeFileSync(initialTask.responsePath,JSON.stringify({taskId:initialTask.taskId,value:author(f,join(initialTask.context.runDirectory,'response.json'),'short')}));
  await assert.rejects(invoke(f,{runAgent:noChild,review},['--task-response',initialTask.responsePath]),e=>{task=e.task;return e.agentTaskStatus==='pending'&&task.kind==='visual-preflight';});
  assert.equal(task.owner,'main-agent');writeFileSync(task.responsePath,JSON.stringify({taskId:task.taskId,value:{schemaVersion:1,status:'passed',storyboardDigest:manifest.storyboardDigest,evidenceDigest:manifest.evidenceDigest,inspectedEvidence:['sample'],issues:[]}}));
  await invoke(f,{runAgent:noChild,review},['--task-response',task.responsePath]);assert.equal(JSON.parse(readFileSync(join(f.layout.resourcesDirectory,'_runs/main-agent/director/active.json'))).taskId,initialTask.taskId);assert.equal(JSON.parse(readFileSync(join(f.layout.resourcesDirectory,'director-state.json'))).phase,'visual-ready');assert.ok(!JSON.parse(readFileSync(join(f.layout.productionDirectory,'visual-preflight-state.json'))).observations);
});

test('main preflight major finding routes to director repair and a new main preflight after the transient response is removed',async t=>{
  const f=fixture(t);let manifest,task,initialTask;
  const review=options=>{
    const digest=visualStoryboardDigest(options.storyboard);
    if(!manifest||manifest.storyboardDigest!==digest){
      const directory=join(f.layout.resourcesDirectory,'production/visual-preflight',digest);mkdirSync(directory,{recursive:true});writeFileSync(join(directory,'.visual-preflight-workspace.json'),JSON.stringify({owner:'visual-preflight',resourcesDirectory:f.layout.resourcesDirectory}));
      const file=join(directory,'sample.png');writeFileSync(file,'protocol frame');const pages=[{id:'sample',file,kind:'sequence',startSeconds:0,endSeconds:4,sha256:hash(readFileSync(file))}];
      manifest={directory,pages,pagesPerReview:8,renderOrigin:'compiled-storyboard',timeline:visualTimeline(options.storyboard),storyboardDigest:digest,evidenceDigest:hash(JSON.stringify(pages))};writeFileSync(join(directory,'manifest.json'),JSON.stringify(manifest));
    }
    return runVisualPreflight({...options,manifest});
  };
  const noChild=()=>{throw Error('Main tasks cannot spawn models.');};
  await assert.rejects(invoke(f,{runAgent:noChild,review}),e=>{initialTask=e.task;return e.agentTaskStatus==='pending';});
  writeFileSync(initialTask.responsePath,JSON.stringify({taskId:initialTask.taskId,value:author(f,join(initialTask.context.runDirectory,'response.json'),'short')}));
  await assert.rejects(invoke(f,{runAgent:noChild,review},['--task-response',initialTask.responsePath]),e=>{task=e.task;return e.agentTaskStatus==='pending'&&task.kind==='visual-preflight';});
  const consumed=task.responsePath;writeFileSync(consumed,JSON.stringify({taskId:task.taskId,value:{schemaVersion:1,status:'needs-repair',storyboardDigest:manifest.storyboardDigest,evidenceDigest:manifest.evidenceDigest,inspectedEvidence:['sample'],issues:[{severity:'major',startSeconds:0,endSeconds:2,evidence:['sample'],description:'protocol issue',repair:'fix label'}]}}));
  await assert.rejects(invoke(f,{runAgent:noChild,review},['--task-response',consumed]),e=>{task=e.task;return e.agentTaskStatus==='pending'&&task.kind==='visual-repair';});
  assert.equal(task.owner,'main-agent');assert.ok(!readFileSync(task.promptPath,'utf8').includes('minor finding'));
  writeFileSync(join(task.context.runDirectory,'save/shot.jsx'),'export default ()=> <div>修复后的偏好</div>;');writeFileSync(task.responsePath,JSON.stringify({taskId:task.taskId,value:{shots:[{id:'save',libraryIds:[],summary:'修复后的同一偏好'}]}}));
  await assert.rejects(invoke(f,{runAgent:noChild,review},['--task-response',task.responsePath]),e=>{task=e.task;return e.agentTaskStatus==='pending'&&task.kind==='visual-preflight';});
  writeFileSync(task.responsePath,JSON.stringify({taskId:task.taskId,value:{schemaVersion:1,status:'passed',storyboardDigest:manifest.storyboardDigest,evidenceDigest:manifest.evidenceDigest,inspectedEvidence:['sample'],issues:[]}}));
  await invoke(f,{runAgent:noChild,review},['--task-response',task.responsePath]);assert.equal(JSON.parse(readFileSync(join(f.layout.resourcesDirectory,'director-state.json'))).phase,'visual-ready');
});
test('default short technical repair resumes the same run without spawning another director',async t=>{
  const f=fixture(t);let task;
  const noChild=()=>{throw new Error('Short mode cannot spawn a director.');};
  await assert.rejects(invoke(f,{runAgent:noChild}),e=>{task=e.task;return e.agentTaskStatus==='pending';});
  const run=task.context.runDirectory,response=join(f.root,'response.json');writeFileSync(response,JSON.stringify({taskId:task.taskId,value:author(f,join(run,'initial.json'),'short')}));
  await assert.rejects(invoke(f,{runAgent:noChild,compile:()=>{throw Error('Test compile failure.');}},['--task-response',response]),e=>{task=e.task;return e.agentTaskStatus==='pending'&&task.kind==='technical-repair';});
  assert.equal(task.context.runDirectory,run);writeFileSync(join(run,'save/shot.jsx'),'export default ()=> <div>修复后的偏好</div>;');
  writeFileSync(response,JSON.stringify({taskId:task.taskId,value:{shots:[{id:'save',libraryIds:[],summary:'修复后的同一偏好'}]}}));
  const firstRepairId=task.taskId;
  await assert.rejects(invoke(f,{runAgent:noChild,compile:()=>{throw Error('Test compile failure.');}},['--task-response',response]),e=>{task=e.task;return e.agentTaskStatus==='pending'&&task.kind==='technical-repair';});
  assert.notEqual(task.taskId,firstRepairId);assert.equal(task.context.taskSequence,2);
  writeFileSync(response,JSON.stringify({taskId:task.taskId,value:{shots:[{id:'save',libraryIds:[],summary:'再次修复后的同一偏好'}]}}));
  await invoke(f,{runAgent:noChild},['--task-response',response]);
  const retained=JSON.parse(readFileSync(join(run,'director-session.json'),'utf8'));assert.equal(retained.pendingRepairKind,null);assert.ok(retained.implementations.save.source.includes('修复后的偏好'));
});
test('default long mode hands layout to the main Agent and delegates only the actual shot tasks',async t=>{
  const f=fixture(t,120);let task,calls=0;
  await assert.rejects(invoke(f),e=>{task=e.task;return e.agentTaskStatus==='pending';});
  const run=task.context.runDirectory,response=join(f.root,'response.json');writeFileSync(response,JSON.stringify({taskId:task.taskId,value:author(f,join(run,'initial.json'),'long')}));
  await invoke(f,{runAgent:async(_prompt,options)=>{calls++;assert.ok(options.outputPath.endsWith('result.json'));const sourceFile=join(dirname(options.outputPath),'shot.jsx');writeFileSync(sourceFile,'export default ()=> <div>偏好</div>;');return {value:{sourceFile,libraryIds:[],summary:'同一偏好'},sessionId:'shot-'+calls};}},['--task-response',response]);assert.equal(calls,2);
  assert.equal(JSON.parse(readFileSync(join(f.layout.resourcesDirectory,'director-state.json'),'utf8')).mode,'long');
});
test('short director entry makes one whole-film initial model task without per-shot calls',async t=>{
  const f=fixture(t);let calls=0;await invoke(f,{runMain:async(prompt,options)=>{calls++;assert.ok(!prompt.includes('CustomMarker'));return {sessionId:'director',value:author(f,options.outputPath,'short')};}});assert.equal(calls,1);
  const state=JSON.parse(readFileSync(join(f.layout.resourcesDirectory,'director-state.json'),'utf8'));assert.equal(state.mode,'short');assert.equal(state.phase,'visual-ready');assert.equal(state.shots.length,2);
});
test('selected deep form reaches whole-film director and compiled review independently of duration',async t=>{
  const f=fixture(t,4);f.plan.preproduction.contentRoute.form='single-deep';f.plan.preproductionDigest=hash(JSON.stringify(f.plan.preproduction));writeFileSync(join(f.layout.resourcesDirectory,'editorial-plan.json'),JSON.stringify(f.plan));
  let calls=0,reviews=0;await invoke(f,{runMain:async(prompt,options)=>{calls++;assert.ok(prompt.includes('single-deep'));assert.ok(prompt.includes('SKILL.md'));assert.ok(!prompt.includes('## 形式：'));return {sessionId:'director',value:author(f,options.outputPath,'short')};},review:async({storyboard})=>{reviews++;assert.deepEqual(storyboard.meta.sharing,f.plan.preproduction.sharing);assert.ok(storyboard.scenes.flatMap(s=>s.visualBeats).every(b=>b.planShotIds.includes('shot1')));return {status:'passed',reportPath:join(f.layout.productionDirectory,'review.json')};}});
  assert.equal(calls,1);assert.equal(reviews,1);assert.equal(JSON.parse(readFileSync(join(f.layout.resourcesDirectory,'director-state.json'),'utf8')).mode,'short');
});
test('generic and other content routes reach the real director without GitHub fields or requirements',async t=>{
  for(const skill of [null,'task-walkthrough']){
    const f=fixture(t,4);f.plan.preproduction.contentRoute={skill,form:null};delete f.plan.preproduction.sharing;
    f.plan.preproductionDigest=hash(JSON.stringify(f.plan.preproduction));writeFileSync(join(f.layout.resourcesDirectory,'editorial-plan.json'),JSON.stringify(f.plan));
    if(skill){const path=join(f.root,'.agents/skills/content-choose',skill,'SKILL.md');mkdirSync(dirname(path),{recursive:true});writeFileSync(path,'---\nname: task-walkthrough\ndescription: Separate content for integration testing.\n---\n## 内容路由\nUse the selected task content.\n## 故事\nPLAN_TASK\n## 画面\nDIRECT_TASK\n## 自检\nREVIEW_TASK\n');}
    let calls=0,reviews=0;await invoke(f,{runMain:async(prompt,options)=>{calls++;assert.ok(!prompt.includes('# Content Skill: github-project-sharing'));assert.ok(!prompt.includes('single-short：'));if(skill){assert.ok(prompt.includes('task-walkthrough'));assert.ok(!prompt.includes('DIRECT_TASK'));}return {sessionId:'director',value:author(f,options.outputPath,'short')};},review:async({storyboard})=>{reviews++;assert.deepEqual(storyboard.meta.contentRoute,{skill,form:null});assert.ok(!Object.hasOwn(storyboard.meta,'sharing'));return {status:'passed',reportPath:join(f.layout.productionDirectory,'review.json')};}});
    assert.equal(calls,1);assert.equal(reviews,1);assert.ok(!Object.hasOwn(JSON.parse(readFileSync(join(f.layout.resourcesDirectory,'editorial-plan.json'),'utf8')).preproduction,'sharing'));
  }
});

test('long director entry dispatches independent shot agents and retains repaired shared state before failures',async t=>{
  const f=fixture(t,120);let reviews=0,failChildren=false,calls=[];
  const runAgent=async(prompt,options)=>{
    calls.push(options);
    if(options.outputPath.includes('initial-authoring'))return {sessionId:'director',value:author(f,options.outputPath,'long')};
    if(options.outputPath.includes('repair-')){const shared=join(dirname(options.outputPath),'shared.jsx');writeFileSync(shared,'export const marker="repaired";');failChildren=true;return {sessionId:'director',value:{shots:[]}};}
    if(failChildren){const e=new Error('simulated child failure');e.toolAgentStatus='error';throw e;}
    const sourceFile=join(dirname(options.outputPath),'shot.jsx');writeFileSync(sourceFile,'export default ()=> <div>偏好</div>;');return {sessionId:'child-'+dirname(sourceFile),value:{sourceFile,libraryIds:[],summary:'同一偏好'}};
  };
  const review=async()=>{reviews++;const manifestPath=join(f.layout.productionDirectory,'manifest.json');writeFileSync(manifestPath,JSON.stringify({pages:[{id:'frame',file:'image.png'}]}));return {status:'needs-repair',manifestPath,reportPath:'review.json',issues:[{severity:'major',evidence:['frame'],description:'label missing'}]};};
  await assert.rejects(invoke(f,{runMain:runAgent,runAgent,review}),/simulated child failure/);
  const state=JSON.parse(readFileSync(join(f.layout.resourcesDirectory,'director-state.json'),'utf8'));assert.equal(state.mode,'long');
  const first=calls.find(c=>c.outputPath.includes('initial-authoring')),run=dirname(first.outputPath),session=JSON.parse(readFileSync(join(run,'director-session.json'),'utf8'));
  assert.equal(session.sharedSource,'export const marker="repaired";');assert.ok(calls.filter(c=>c.outputPath.endsWith('result.json')).every(c=>!c.sessionId));
  failChildren=false;await invoke(f,{runMain:runAgent,runAgent},['--resume-run',run]);assert.equal(JSON.parse(readFileSync(join(f.layout.resourcesDirectory,'director-state.json'),'utf8')).phase,'visual-ready');
});
test('local preview and final film expose identical scene and beat props',t=>{
  const f=fixture(t),audio={...f.timing,fps:30},style=libraries.styles.find(s=>s.id===f.plan.content.styleId),runDirectory=join(f.layout.resourcesDirectory,'shots/runs/preview'),sharedSource='export const marker=1;';
  const entries=prepareSegmentAssignments({layout:f.wholeLayout,plan:f.plan,runDirectory,audio,style,materials:[],production:f.layout.productionDirectory,sharedSource,joins:f.joins});
  const records=entries.map(e=>{writeFileSync(e.sourceFile,'export default ()=>null;');return {id:e.shot.id,sourceFile:e.sourceFile,libraryIds:[],summary:'连续'};});const actual=collectImplementations({entries,records,runInputs:{},libraries,sharedSource});
  const visual=visualFromLayout(f.wholeLayout,f.plan,actual),compiled=compileTimeline({audioStoryboard:makeAudioDraft(f.plan,f.research),timing:f.timing,visual,research:f.research,libraries,contentDigest:f.plan.contentDigest});
  entries.forEach(e=>{const a=JSON.parse(readFileSync(e.assignmentFile,'utf8')),s=compiled.storyboard.scenes[0],b=s.visualBeats.find(b=>b.id===e.shot.id);assert.deepEqual(visualContext(a.scene,a.beat,30),visualContext(s,b,30));});
});
test('external request stages existing project-local sources into an unpredictable fresh run',async t=>{
  const f=fixture(t),existing=join(f.layout.resourcesDirectory,'prepared-request');mkdirSync(existing);const sharedSourceFile=join(existing,'shared.jsx');writeFileSync(sharedSourceFile,'export const marker=1;');
  const shots=f.wholeLayout.scenes[0].beats.map(b=>{const sourceFile=join(existing,b.id+'.jsx');writeFileSync(sourceFile,'export default ()=> <div>偏好</div>;');return {id:b.id,sourceFile,libraryIds:[],summary:'预先准备'};});
  const request={layout:f.wholeLayout,joins:f.joins,sharedSourceFile,shots},path=join(existing,'request.json');writeFileSync(path,JSON.stringify(request));
  await invoke(f,{runAgent:()=>{throw new Error('Request should not invoke models.');}},['--request',path]);assert.equal(JSON.parse(readFileSync(join(f.layout.resourcesDirectory,'director-state.json'),'utf8')).phase,'visual-ready');
  assert.throws(()=>stageAuthoringRequest({...request,sharedSourceFile:join(f.root,'config/style-library.json')},{resourcesDirectory:f.layout.resourcesDirectory,runDirectory:join(existing,'fresh')}),/escapes/);
});
test('duplicate custom exports fail planning before writing or rendering material files',t=>{
  const f=fixture(t),value={contentRoute:f.plan.preproduction.contentRoute,sharing:f.plan.preproduction.sharing,claims:[{claim:'保存',quote:'Stores memory.'}],content:f.plan.content,designContext:f.plan.preproduction.designContext,shots:f.plan.preproduction.shots,assets:[],customMaterials:['a','b'].map(id=>({id,exportName:'Marker',source:'export default ()=>null;',usage:'Marker()',demoSource:'export default ()=>null;',shotIds:['shot1']}))};
  assert.throws(()=>validateProductionPackage(value,{readmeText:'Stores memory.',libraries}),/Duplicate custom material export/);
});
