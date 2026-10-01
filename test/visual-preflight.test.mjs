import assert from 'node:assert/strict';
import test from 'node:test';
import {createHash} from 'node:crypto';
import {createRequire} from 'node:module';
import {spawnSync} from 'node:child_process';
import {mkdtempSync,mkdirSync,writeFileSync,readFileSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {visualTimeline,visualStoryboardDigest,prepareVisualPreflight,validateVisualReview,runVisualPreflight,requireVisualPreflight} from '../apps/video-factory/src/visual-preflight.mjs';
import {evaluateEditorialQuality,loadEditorialConfig} from '../apps/video-factory/src/editorial-quality.mjs';
const hash=v=>createHash('sha256').update(v).digest('hex');
const story=()=>({meta:{fps:30,width:1920,height:1080},scenes:[
  {heading:'输入',duration:2,visualBeats:[{id:'input',startFrame:0,endFrame:60,purpose:'显示输入'}]},
  {heading:'结果',duration:2,visualBeats:[{id:'result',startFrame:0,endFrame:60,purpose:'显示输出'}]},
]});
function fixture(t,count=2) {
  const directory=mkdtempSync(join(tmpdir(),'visual-review-'));t.after(()=>rmSync(directory,{recursive:true,force:true}));
  const storyboard=story();const preview=join(directory,'preview.mp4');writeFileSync(preview,'test-video-bytes');
  const pages=Array.from({length:count},(_,i)=>{
    const file=join(directory,`sequence-${i}.png`);writeFileSync(file,`image-${i}`);
    return {id:`sequence-${i}.png`,file,kind:'sequence',startSeconds:i*4/count,endSeconds:(i+1)*4/count,sha256:hash(readFileSync(file))};
  });
  const manifest={schemaVersion:1,directory,preview,previewSha256:hash(readFileSync(preview)),pages,pagesPerReview:1,
    storyboardDigest:visualStoryboardDigest(storyboard),timeline:visualTimeline(storyboard),
    evidenceDigest:hash(JSON.stringify(pages.map(({file,...v})=>v))),scope:'test contract only'};
  writeFileSync(join(directory,'manifest.json'),JSON.stringify(manifest));
  return {storyboard,manifest,reportPath:join(directory,'report.json')};
}
// The injected reviewer tests protocol enforcement only; it is never a production visual judgment.
function mockReview(manifest,evidence,{issues=[]}={}) {
  return {schemaVersion:1,storyboardDigest:manifest.storyboardDigest,evidenceDigest:manifest.evidenceDigest,
    status:issues.length?'needs-repair':'passed',inspectedEvidence:evidence.map(p=>p.id),
    observations:evidence.map(p=>({evidence:p.id,description:'Protocol fixture observation, not a real visual approval.'})),issues};
}
test('timeline records global beat time and seams without motion/type quotas',()=>{
  const timeline=visualTimeline(story());assert.deepEqual(timeline.seams,[60]);assert.equal(timeline.beats[1].startSeconds,2);
  assert.throws(()=>visualTimeline({meta:{fps:30},scenes:[{duration:0}]}),/positive scene durations/);
});
test('current director technical checks do not impose shot counts or composition diversity',()=>{
  const config=loadEditorialConfig(new URL('../config/video-editorial.json',import.meta.url));
  const style=JSON.parse(readFileSync(new URL('../config/style-library.json',import.meta.url),'utf8')).styles[0];
  const scenes=Array.from({length:30},(_,index)=>({
    id:'shot-'+index,title:'同一对象的下一状态',duration:2,
    visualDesign:'同一个对象位于相同位置，以状态变化推进说明。',
    captions:[{startFrame:0,endFrame:60,text:'同一对象继续变化'}],
    visualBeats:[{id:'beat-'+index,startFrame:0,endFrame:60,
      purpose:'展示同一对象的下一状态',claimIndexes:[0],
      implementation:{key:'s'+index+'_b0',route:'custom'}}],
  }));
  const globalCaptions=scenes.map((scene,index)=>({...scene.captions[0],startFrame:index*60,endFrame:(index+1)*60}));
  const storyboard={meta:{title:'连续状态说明',fps:30,width:1920,height:1080,
    productionStage:'visual-ready',directorVersion:1,totalFrames:1800,style,globalCaptions},
    voiceover:'narration.wav',scenes};
  const report=evaluateEditorialQuality(storyboard,config);
  assert.deepEqual(report.errors,[]);assert.equal(report.visualPreflight,'pending');
  assert.equal(report.metrics.totalFrames,1800);
  for(const key of ['rhythm','bRoll','requiredSceneTypes','openingTypes','sceneCount'])assert.equal(config[key],undefined);
});

test('review cannot pass without all image inspections and actual observations',(t)=>{
  const {manifest}=fixture(t);const review=mockReview(manifest,manifest.pages);
  review.inspectedEvidence.pop();review.observations=[];
  assert.match(validateVisualReview(review,manifest).join(' '),/every attached.*actual observations/);
});
test('review binds issues to a valid time and actual evidence',(t)=>{
  const {manifest}=fixture(t);const issue={severity:'major',startSeconds:3,endSeconds:4,evidence:[manifest.pages[0].id],description:'文字重叠',repair:'移动目标标签'};
  assert.match(validateVisualReview(mockReview(manifest,manifest.pages,{issues:[issue]}),manifest).join(' '),/does not intersect/);
  issue.startSeconds=0;issue.endSeconds=1;
  assert.deepEqual(validateVisualReview(mockReview(manifest,manifest.pages,{issues:[issue]}),manifest),[]);
});
test('visual repair issues remain needs-repair and block final acceptance',async(t)=>{
  const prepared=fixture(t);const runner=async(prompt,options)=>{
    const evidence=prepared.manifest.pages.filter(p=>options.images.includes(p.file));
    assert.match(prompt,/Do not count or impose quotas/);assert.equal(options.sandbox,'read-only');
    return {value:mockReview(prepared.manifest,evidence,{issues:[{severity:'major',startSeconds:evidence[0].startSeconds,endSeconds:evidence[0].endSeconds,evidence:[evidence[0].id],description:'布局遮挡主体',repair:'调整主体位置'}]})};
  };
  const report=await runVisualPreflight(prepared,{agentRunner:runner});
  assert.equal(report.status,'needs-repair');assert.equal(report.issues.length,2);
  assert.throws(()=>requireVisualPreflight(report,prepared.storyboard),/needs-repair/);
});
test('pending and reviewer failures never become a pass',async(t)=>{
  const prepared=fixture(t);assert.throws(()=>requireVisualPreflight(null,prepared.storyboard),/pending/);
  await assert.rejects(()=>runVisualPreflight(prepared,{agentRunner:async()=>{throw new Error('model cannot inspect image');}}),/cannot inspect/);
  assert.equal(JSON.parse(readFileSync(prepared.reportPath)).status,'error');
});
test('bounded parallel reviews retain temporal order and inspect every evidence image',async(t)=>{
  const prepared=fixture(t,4);let active=0,maximum=0;const completion=[];
  const runner=async(prompt,options)=>{
    active++;maximum=Math.max(maximum,active);
    const evidence=prepared.manifest.pages.filter(p=>options.images.includes(p.file));
    const index=prepared.manifest.pages.indexOf(evidence[0]);
    await new Promise(resolve=>setTimeout(resolve,index===0?30:5));
    active--;completion.push(index);
    return {value:mockReview(prepared.manifest,evidence)};
  };
  const report=await runVisualPreflight(prepared,{agentRunner:runner,reviewConcurrency:2});
  assert.equal(maximum,2);assert.equal(active,0);assert.notEqual(completion[0],0);
  assert.deepEqual(report.reviews.map(r=>r.batchIndex),[0,1,2,3]);
  assert.deepEqual(report.reviews.flatMap(r=>r.inspectedEvidence),prepared.manifest.pages.map(p=>p.id));
  assert.equal(requireVisualPreflight(report,prepared.storyboard).status,'passed');
});
test('parallel failure drains in-flight reviews, stops scheduling and cannot become passed',async(t)=>{
  const prepared=fixture(t,4);const started=[];let lateFinished=false;
  const runner=async(prompt,options)=>{
    const evidence=prepared.manifest.pages.filter(p=>options.images.includes(p.file));
    const index=prepared.manifest.pages.indexOf(evidence[0]);started.push(index);
    if(index===0){await new Promise(resolve=>setTimeout(resolve,5));throw new Error('batch zero cannot inspect images');}
    await new Promise(resolve=>setTimeout(resolve,25));lateFinished=true;
    assert.equal(JSON.parse(readFileSync(prepared.reportPath)).status,'error');
    return {value:mockReview(prepared.manifest,evidence)};
  };
  await assert.rejects(()=>runVisualPreflight(prepared,{agentRunner:runner,reviewConcurrency:2}),/batch zero cannot inspect/);
  assert.equal(lateFinished,true);assert.deepEqual(started,[0,1]);
  const report=JSON.parse(readFileSync(prepared.reportPath));
  assert.equal(report.status,'error');assert.deepEqual(report.reviews.map(r=>r.batchIndex),[1]);
  assert.deepEqual(report.failedBatches.map(r=>r.batchIndex),[0]);
  assert.throws(()=>requireVisualPreflight(report,prepared.storyboard),/error/);
});
test('parallel malformed review blocks acceptance even if another batch passes',async(t)=>{
  const prepared=fixture(t,4);
  const runner=async(prompt,options)=>{
    const evidence=prepared.manifest.pages.filter(p=>options.images.includes(p.file));
    const review=mockReview(prepared.manifest,evidence);
    if(evidence[0]===prepared.manifest.pages[0])review.inspectedEvidence=[];
    else await new Promise(resolve=>setTimeout(resolve,10));
    return {value:review};
  };
  await assert.rejects(()=>runVisualPreflight(prepared,{agentRunner:runner,reviewConcurrency:2}),/every attached/);
  assert.equal(JSON.parse(readFileSync(prepared.reportPath)).status,'error');
});
test('passed protocol is invalidated by storyboard or evidence changes',async(t)=>{
  const prepared=fixture(t);const runner=async(prompt,options)=>({value:mockReview(prepared.manifest,prepared.manifest.pages.filter(p=>options.images.includes(p.file)))});
  const report=await runVisualPreflight(prepared,{agentRunner:runner});
  assert.equal(requireVisualPreflight(report,prepared.storyboard).status,'passed');
  const changed=structuredClone(prepared.storyboard);changed.scenes[0].heading='新的输入';
  assert.throws(()=>requireVisualPreflight(report,changed),/stale/);
  writeFileSync(prepared.manifest.pages[0].file,'changed image');
  assert.throws(()=>requireVisualPreflight(report,prepared.storyboard),/image evidence changed/);
});
test('externally supplied video diagnostics cannot approve production JSX',async(t)=>{
  const prepared=fixture(t);prepared.storyboard.meta.directorVersion=1;
  prepared.manifest.storyboardDigest=visualStoryboardDigest(prepared.storyboard);
  prepared.manifest.renderOrigin='external-video-diagnostic';
  writeFileSync(join(prepared.manifest.directory,'manifest.json'),JSON.stringify(prepared.manifest));
  const runner=async(prompt,options)=>({value:mockReview(prepared.manifest,prepared.manifest.pages.filter(p=>options.images.includes(p.file)))});
  const report=await runVisualPreflight(prepared,{agentRunner:runner});
  assert.throws(()=>requireVisualPreflight(report,prepared.storyboard),/external video diagnostics cannot approve/);
});
test('preflight actually retains FFmpeg preview, sequence frames and exact join frames',t=>{
  const resourcesDirectory=mkdtempSync(join(tmpdir(),'visual-ffmpeg-'));t.after(()=>rmSync(resourcesDirectory,{recursive:true,force:true}));
  const ffmpeg=createRequire(import.meta.url)('@ffmpeg-installer/ffmpeg').path;
  const source=join(resourcesDirectory,'source.mp4');
  const result=spawnSync(ffmpeg,['-y','-v','error','-f','lavfi','-i','color=c=white:s=960x540:r=30:d=4','-c:v','libx264',source],{encoding:'utf8',windowsHide:true});
  assert.equal(result.status,0,result.stderr);
  const prepared=prepareVisualPreflight({storyboard:story(),resourcesDirectory,videoPath:source});
  assert.equal(prepared.pagesPerReview,8);assert.equal(prepared.reviewConcurrency,2);
  assert.ok(readFileSync(prepared.preview).length>1000);
  assert.ok(prepared.pages.some(p=>p.kind==='sequence'));
  assert.ok(prepared.pages.some(p=>p.kind==='seam'));
  assert.equal(JSON.parse(readFileSync(prepared.reportPath)).status,'pending');
});
