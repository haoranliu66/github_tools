import assert from 'node:assert/strict';
import test from 'node:test';
import {createHash} from 'node:crypto';
import {createRequire} from 'node:module';
import {spawnSync} from 'node:child_process';
import {mkdtempSync,mkdirSync,writeFileSync,readFileSync,rmSync,existsSync,readdirSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {visualTimeline,visualStoryboardDigest,prepareVisualPreflight,validateVisualReview,runVisualPreflight,requireVisualPreflight,reuseCompletedVisualPreflight} from '../apps/video-factory/src/visual-preflight.mjs';
import {evaluateEditorialQuality,loadEditorialConfig} from '../apps/video-factory/src/editorial-quality.mjs';
const hash=v=>createHash('sha256').update(v).digest('hex');
const story=()=>({meta:{fps:30,width:1920,height:1080,directorVersion:1},scenes:[
  {heading:'输入',duration:2,visualBeats:[{id:'input',startFrame:0,endFrame:60,purpose:'显示输入'}]},
  {heading:'结果',duration:2,visualBeats:[{id:'result',startFrame:0,endFrame:60,purpose:'显示输出'}]},
]});
function fixture(t,count=2) {
  const resourcesDirectory=mkdtempSync(join(tmpdir(),'visual-review-'));t.after(()=>rmSync(resourcesDirectory,{recursive:true,force:true}));
  const directory=join(resourcesDirectory,'production/visual-preflight/run');mkdirSync(directory,{recursive:true});writeFileSync(join(directory,'.visual-preflight-workspace.json'),JSON.stringify({owner:'visual-preflight',resourcesDirectory}));
  const storyboard=story(),preview=join(directory,'preview.mp4');writeFileSync(preview,'test-video-bytes');
  const pages=Array.from({length:count},(_,i)=>{
    const file=join(directory,`sequence-${i}.png`);writeFileSync(file,`image-${i}`);
    return {id:`sequence-${i}.png`,file,kind:'sequence',startSeconds:i*4/count,endSeconds:(i+1)*4/count,sha256:hash(readFileSync(file))};
  });
  const manifest={schemaVersion:1,directory,preview,previewSha256:hash(readFileSync(preview)),pages,pagesPerReview:1,renderOrigin:'compiled-storyboard',storyboardDigest:visualStoryboardDigest(storyboard),timeline:visualTimeline(storyboard),evidenceDigest:hash(JSON.stringify(pages.map(({file,...v})=>v)))};
  writeFileSync(join(directory,'manifest.json'),JSON.stringify(manifest));return {storyboard,resourcesDirectory,manifest,reportPath:join(directory,'report.json')};
}
// Injected responses test the host protocol only, never actual video quality.
const mockReview=(manifest,evidence,issues=[])=>({schemaVersion:1,storyboardDigest:manifest.storyboardDigest,evidenceDigest:manifest.evidenceDigest,status:issues.length?'needs-repair':'passed',inspectedEvidence:evidence.map(p=>p.id),issues});
const batch=(f,o)=>f.manifest.pages.filter(p=>o.images.includes(p.file));
const issueFor=(page,severity='major')=>({severity,startSeconds:page.startSeconds,endSeconds:page.endSeconds,evidence:[page.id],description:severity==='minor'?'轻微装饰偏移':'布局遮挡主体',repair:severity==='minor'?'可选调整':'调整主体位置'});
async function pendingTask(options){let pending;await assert.rejects(runVisualPreflight(options),e=>{pending=e;return e.agentTaskStatus==='pending';});return pending;}
const answer=(task,value)=>writeFileSync(task.responsePath,JSON.stringify({taskId:task.taskId,value}));

test('timeline records global beat time and seams without quotas',()=>{
  const timeline=visualTimeline(story());assert.deepEqual(timeline.seams,[60]);assert.equal(timeline.beats[1].startSeconds,2);
  assert.throws(()=>visualTimeline({meta:{fps:30},scenes:[{duration:0}]}),/positive scene durations/);
});
test('director technical checks do not impose scene counts or composition diversity',()=>{
  const config=loadEditorialConfig(new URL('../config/video-editorial.json',import.meta.url)),style=JSON.parse(readFileSync(new URL('../config/style-library.json',import.meta.url),'utf8')).styles[0];
  const scenes=Array.from({length:30},(_,i)=>({id:'shot-'+i,title:'同一对象的下一状态',duration:2,visualDesign:'同一个对象位于相同位置，以状态变化推进说明。',captions:[{startFrame:0,endFrame:60,text:'同一对象继续变化'}],visualBeats:[{id:'beat-'+i,startFrame:0,endFrame:60,purpose:'展示同一对象的下一状态',claimIndexes:[0],implementation:{key:'s'+i+'_b0',route:'custom'}}]}));
  const globalCaptions=scenes.map((s,i)=>({...s.captions[0],startFrame:i*60,endFrame:(i+1)*60}));
  const report=evaluateEditorialQuality({meta:{title:'连续状态说明',fps:30,width:1920,height:1080,productionStage:'visual-ready',directorVersion:1,totalFrames:1800,style,globalCaptions},voiceover:'narration.wav',scenes},config);
  assert.deepEqual(report.errors,[]);assert.equal(report.visualPreflight,'pending');assert.equal(report.metrics.totalFrames,1800);
  for(const key of ['rhythm','bRoll','requiredSceneTypes','openingTypes','sceneCount'])assert.equal(config[key],undefined);
});
test('inspection covers every image without requiring saved observations',t=>{
  const {manifest}=fixture(t),review=mockReview(manifest,manifest.pages);assert.deepEqual(validateVisualReview(review,manifest),[]);
  review.inspectedEvidence.pop();assert.match(validateVisualReview(review,manifest).join(' '),/every attached/);
});
test('material issues require valid times, evidence and concrete repairs',t=>{
  const {manifest}=fixture(t),issue={...issueFor(manifest.pages[0]),startSeconds:3,endSeconds:4};
  assert.match(validateVisualReview(mockReview(manifest,manifest.pages,[issue]),manifest).join(' '),/does not intersect/);
  issue.startSeconds=0;issue.endSeconds=1;assert.deepEqual(validateVisualReview(mockReview(manifest,manifest.pages,[issue]),manifest),[]);
});
test('default preflight hands batches to the main Agent, resumes the same preview and removes transient responses',async t=>{
  const f=fixture(t),first=await pendingTask(f);assert.equal(first.task.kind,'visual-preflight');assert.equal(first.task.owner,'main-agent');
  assert.deepEqual(first.task.evidence.map(p=>p.file),[f.manifest.pages[0].file]);assert.match(readFileSync(first.task.promptPath,'utf8'),/do not delegate/);
  answer(first.task,mockReview(f.manifest,[f.manifest.pages[0]]));
  const second=await pendingTask({storyboard:f.storyboard,resourcesDirectory:f.resourcesDirectory,responsePath:first.task.responsePath});
  assert.equal(second.task.context.previewDirectory,f.manifest.directory);assert.equal(second.task.context.batchOffset,1);
  for(const path of [first.taskPath,first.task.promptPath,first.task.responsePath,f.manifest.pages[0].file])assert.ok(!existsSync(path));
  answer(second.task,mockReview(f.manifest,[f.manifest.pages[1]]));
  const report=await runVisualPreflight({storyboard:f.storyboard,resourcesDirectory:f.resourcesDirectory,responsePath:second.task.responsePath});
  assert.equal(requireVisualPreflight(report,f.storyboard).status,'passed');assert.ok(!existsSync(f.manifest.directory));assert.ok(!existsSync(second.taskPath));assert.ok(!existsSync(join(f.resourcesDirectory,'_runs/main-agent/visual-preflight')));
});
test('minor-only review removes findings, suggestions, viewing files, scope, observations and per-inspection pass records',async t=>{
  const f=fixture(t),report=await runVisualPreflight(f,{runMain:async(prompt,o)=>{
    const evidence=batch(f,o);assert.match(prompt,/minor-only findings mean passed/);
    return {value:{...mockReview(f.manifest,evidence,[issueFor(evidence[0],'minor')]),observations:[{description:'discard this observation'}]}};
  }});
  assert.equal(report.status,'passed');assert.ok(!existsSync(f.manifest.directory));
  const saved=JSON.parse(readFileSync(report.reportPath));assert.deepEqual(Object.keys(saved).sort(),['renderOrigin','reviewOwner','schemaVersion','status','storyboardDigest']);assert.ok(!JSON.stringify(saved).includes('轻微'));assert.equal(requireVisualPreflight(report,f.storyboard).status,'passed');
});
test('only blocking/major issues and their referenced evidence survive',async t=>{
  const f=fixture(t,3),report=await runVisualPreflight(f,{runMain:async(_p,o)=>{
    const evidence=batch(f,o);return {value:mockReview(f.manifest,evidence,[issueFor(evidence[0],evidence[0]===f.manifest.pages[0]?'major':'minor')])};
  }});
  assert.equal(report.status,'needs-repair');assert.equal(report.issues.length,1);assert.equal(report.issues[0].severity,'major');
  assert.deepEqual(readdirSync(f.manifest.directory).sort(),['manifest.json','report.json','sequence-0.png']);assert.deepEqual(JSON.parse(readFileSync(report.manifestPath)).pages.map(p=>p.id),[f.manifest.pages[0].id]);
  assert.ok(!JSON.stringify(report).includes('轻微'));assert.throws(()=>requireVisualPreflight(report,f.storyboard),/needs-repair/);
});
test('unviewed tasks and inspection errors cannot pass',async t=>{
  const f=fixture(t);assert.throws(()=>requireVisualPreflight(null,f.storyboard),/pending/);await pendingTask(f);assert.ok(!existsSync(join(f.resourcesDirectory,'production/visual-preflight-state.json')));
  await assert.rejects(runVisualPreflight(f,{runMain:async()=>{throw Error('cannot inspect image');}}),/cannot inspect/);assert.equal(JSON.parse(readFileSync(f.reportPath)).status,'error');
});
test('malformed main-Agent responses reopen the same task with correction feedback',async t=>{
  const f=fixture(t,1),first=await pendingTask(f);answer(first.task,{...mockReview(f.manifest,f.manifest.pages),inspectedEvidence:[]});
  const retry=await pendingTask({...f,responsePath:first.task.responsePath});assert.equal(retry.task.taskId,first.task.taskId);assert.match(retry.task.validationError,/every attached/);
  assert.ok(existsSync(f.manifest.pages[0].file));answer(retry.task,mockReview(f.manifest,f.manifest.pages));assert.equal((await runVisualPreflight({...f,responsePath:retry.task.responsePath})).status,'passed');
});
test('changing pending evidence prevents acceptance and retains failure diagnostics',async t=>{
  const f=fixture(t,1),first=await pendingTask(f);answer(first.task,mockReview(f.manifest,f.manifest.pages));writeFileSync(f.manifest.pages[0].file,'changed');
  await assert.rejects(runVisualPreflight({...f,responsePath:first.task.responsePath}),/image changed/);assert.equal(JSON.parse(readFileSync(f.reportPath)).status,'error');
});
test('minimum execution state is reusable only for the unchanged compiled storyboard',async t=>{
  const f=fixture(t),report=await runVisualPreflight(f,{runMain:async(_p,o)=>({value:mockReview(f.manifest,batch(f,o))})});
  assert.equal(reuseCompletedVisualPreflight(f.storyboard,f.resourcesDirectory).status,'passed');assert.equal((await runVisualPreflight({storyboard:f.storyboard,resourcesDirectory:f.resourcesDirectory})).reportPath,report.reportPath);
  const changed=structuredClone(f.storyboard);changed.scenes[0].heading='新的表达';assert.equal(reuseCompletedVisualPreflight(changed,f.resourcesDirectory),null);assert.throws(()=>requireVisualPreflight(report,changed),/stale/);assert.throws(()=>requireVisualPreflight({...report,reviewOwner:'independent-agent'},f.storyboard),/main Agent/);
});
test('external video diagnostics cannot approve compiled production JSX',async t=>{
  const f=fixture(t);f.manifest.renderOrigin='external-video-diagnostic';writeFileSync(join(f.manifest.directory,'manifest.json'),JSON.stringify(f.manifest));
  const report=await runVisualPreflight(f,{runMain:async(_p,o)=>({value:mockReview(f.manifest,batch(f,o))})});assert.throws(()=>requireVisualPreflight(report,f.storyboard),/external video diagnostics cannot approve/);
});
test('cleanup never takes over an unrelated nonempty output folder',t=>{
  const f=fixture(t),directory=join(f.resourcesDirectory,'production/assets');mkdirSync(directory);const asset=join(directory,'keep.svg');writeFileSync(asset,'keep original asset');
  assert.throws(()=>prepareVisualPreflight({storyboard:f.storyboard,resourcesDirectory:f.resourcesDirectory,directory}),/dedicated empty/);assert.equal(readFileSync(asset,'utf8'),'keep original asset');
});
test('preparation generates real FFmpeg sequences and exact join frames but leaves judgment pending',t=>{
  const resourcesDirectory=mkdtempSync(join(tmpdir(),'visual-ffmpeg-'));t.after(()=>rmSync(resourcesDirectory,{recursive:true,force:true}));
  const ffmpeg=createRequire(import.meta.url)('@ffmpeg-installer/ffmpeg').path,source=join(resourcesDirectory,'source.mp4');
  const result=spawnSync(ffmpeg,['-y','-v','error','-f','lavfi','-i','color=c=white:s=960x540:r=30:d=4','-c:v','libx264',source],{encoding:'utf8',windowsHide:true});assert.equal(result.status,0,result.stderr);
  const prepared=prepareVisualPreflight({storyboard:story(),resourcesDirectory,videoPath:source});assert.equal(prepared.pagesPerReview,8);assert.ok(!Object.hasOwn(prepared,'reviewConcurrency'));assert.ok(readFileSync(prepared.preview).length>1000);assert.ok(prepared.pages.some(p=>p.kind==='sequence'));assert.ok(prepared.pages.some(p=>p.kind==='seam'));assert.equal(JSON.parse(readFileSync(prepared.reportPath)).status,'pending');
});
