import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,rmSync,readFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {contentSkillBody,contentSkillReference,selectContentRoute,validateSharing,sharingReviewContext} from '../apps/video-factory/src/content-skill.mjs';
import {productionPackageSchema} from '../apps/video-factory/src/production-package.mjs';
import {loadCreativePlan,loadLibraries,hash} from '../apps/video-factory/src/creative-plan.mjs';
import {directorMode} from '../apps/video-factory/src/director-modes.mjs';
import {visualTimeline,visualReviewPrompt,visualIssueDecision,validateVisualReview} from '../apps/video-factory/src/visual-preflight.mjs';
import {writeCurrentProductionFixture,repositoryRoot as root} from './helpers/current-production-fixture.mjs';

test('one unified content Skill covers narration, visuals and self-check; form is independent of measured mode',()=>{
  for(const form of ['single-short','single-deep']){
    const route=selectContentRoute({skill:'github-project-sharing',form}),body=contentSkillBody(root,route),reference=contentSkillReference(root,route);
    assert.ok(body.includes('viewerPromise'));assert.ok(body.includes('## 内容与叙述'));assert.ok(body.includes('## 画面表达'));assert.ok(body.includes('## 内容与画面自检'));
    assert.ok(body.includes('## 形式：'+form));assert.ok(!body.includes('## 形式：'+(form==='single-short'?'single-deep':'single-short')));
    assert.ok(reference.includes(form));assert.ok(reference.includes('SKILL.md'));assert.ok(!reference.includes('viewerPromise'));
    assert.equal(directorMode(3599,30),'short');assert.equal(directorMode(3600,30),'long');
  }
  assert.throws(()=>contentSkillBody(root,{stage:'audio',...selectContentRoute({skill:'github-project-sharing'})}),/explicit content Skill route/);
  assert.throws(()=>selectContentRoute({skill:'github-project-sharing',form:'../outside'}),/Unsupported/);
});

test('the only plan retains complete story intent and linked material handoff; missing intent cannot reach audio',t=>{
  const directory=mkdtempSync(join(tmpdir(),'sharing-plan-'));t.after(()=>rmSync(directory,{recursive:true,force:true}));
  const f=writeCurrentProductionFixture(directory,{visual:false}),researchText=readFileSync(join(f.layout.resourcesDirectory,'research.json'),'utf8');
  assert.deepEqual(loadCreativePlan(f.plan,researchText,loadLibraries(root)).plan.preproduction.sharing,f.plan.preproduction.sharing);
  assert.ok(productionPackageSchema(f.plan.preproduction.contentRoute).required.includes('sharing'));
  const missing=structuredClone(f.plan);delete missing.preproduction.sharing;missing.preproductionDigest=hash(JSON.stringify(missing.preproduction));
  assert.throws(()=>loadCreativePlan(missing,researchText,loadLibraries(root)),/promise/);
  const bad=structuredClone(f.plan.preproduction.sharing);bad.viewerPromise=' ';assert.throws(()=>validateSharing(bad,f.plan.preproduction.shots),/promise/);
  bad.viewerPromise='看懂任务';bad.resultShotIds=['unplanned'];assert.throws(()=>validateSharing(bad,f.plan.preproduction.shots),/actual planned/);
  assert.ok(f.plan.preproduction.style.path);assert.ok(!JSON.stringify(f.plan.preproduction).includes('export default'));
});

test('split or merged visual segments locate the payoff through planShotIds and pass intent to evidence review',()=>{
  const route=selectContentRoute({skill:'github-project-sharing',form:'single-deep'}),sharing={viewerPromise:'理解一次查询怎样找回偏好',story:'保存后查询，偏好返回回答',example:'保存语言偏好后再次提问',resultShotIds:['payoff']};
  const storyboard={meta:{fps:30,contentRoute:route,sharing},scenes:[{duration:3,visualBeats:[{id:'setup',startFrame:0,endFrame:30,planShotIds:['input'],purpose:'保存'},
    {id:'retrieval',startFrame:30,endFrame:60,planShotIds:['payoff'],purpose:'找回'},
    {id:'hold',startFrame:60,endFrame:90,planShotIds:['payoff','closing'],purpose:'阅读结果'}]}]};
  const timeline=visualTimeline(storyboard),context=sharingReviewContext(route,sharing,timeline.beats);
  assert.deepEqual(context.resultWindows.map(w=>[w.id,w.startSeconds,w.endSeconds]),[['retrieval',1,2],['hold',2,3]]);
  const evidence=[{id:'sequence',file:'sample.png',kind:'sequence',startSeconds:1,endSeconds:2}],manifest={timeline,contentRoute:route,sharing:context,pages:evidence,preview:'preview.mp4',storyboardDigest:'story',evidenceDigest:'images',captions:[{startFrame:30,endFrame:60,text:'找回语言偏好'}]};
  const prompt=visualReviewPrompt(manifest,evidence);
  assert.ok(prompt.includes(sharing.viewerPromise));assert.ok(prompt.includes('single-deep'));assert.ok(prompt.includes('SKILL.md'));assert.ok(!prompt.includes('## 画面表达'));assert.ok(prompt.includes('visible process and result'));assert.ok(prompt.includes('context, not unseen evidence'));
  const issue={severity:'major',startSeconds:1,endSeconds:2,evidence:['sequence'],description:'偏好结果出现后即离开，主要结果无法阅读',repair:'保留结果的稳定观察时间'};
  const review={schemaVersion:1,status:'needs-repair',storyboardDigest:'story',evidenceDigest:'images',inspectedEvidence:['sequence'],observations:[{evidence:'sequence',description:'结果刚出现即切走'}],issues:[issue]};
  assert.deepEqual(validateVisualReview(review,manifest,evidence),[]);assert.equal(visualIssueDecision(review.issues).status,'needs-repair');
  issue.severity='minor';issue.description='结果边缘装饰略偏移但主要信息清晰';assert.equal(visualIssueDecision(review.issues).status,'passed');
});
