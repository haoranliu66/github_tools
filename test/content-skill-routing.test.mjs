import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,mkdirSync,rmSync,readFileSync,writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join,dirname} from 'node:path';
import {contentSkillBody,contentSkillReference,selectContentRoute,contentPlanningPrompt,sharingHandoffInstruction,sharingReviewContext,validateContentProfile} from '../apps/video-factory/src/content-skill.mjs';
import {productionPackageSchema,validateProductionPackage,validateMaterialNarrativeIdentity,createProductionPackage} from '../apps/video-factory/src/production-package.mjs';
import {stageCustomMaterials,customMaterialVisualIdentity,syncCustomMaterialUsage} from '../apps/video-factory/src/production-materials.mjs';
import {loadCreativePlan,loadLibraries,hash} from '../apps/video-factory/src/creative-plan.mjs';
import {visualReviewPrompt,visualTimeline} from '../apps/video-factory/src/visual-preflight.mjs';
import {writeCurrentProductionFixture,repositoryRoot as root} from './helpers/current-production-fixture.mjs';
const libraries=loadLibraries(root);
function fixture(t){const directory=mkdtempSync(join(tmpdir(),'content-routing-'));t.after(()=>rmSync(directory,{recursive:true,force:true}));return {...writeCurrentProductionFixture(directory,{visual:false}),directory};}
const valueFrom=f=>({contentRoute:selectContentRoute(),claims:[{claim:'保存偏好',quote:'Stores memory.'}],content:f.plan.content,designContext:f.plan.preproduction.designContext,shots:f.plan.preproduction.shots,assets:[],customMaterials:[]});

test('generic planning schema and package omit every GitHub-specific field',t=>{
  const f=fixture(t),value=valueFrom(f),schema=productionPackageSchema();
  assert.ok(!Object.hasOwn(schema.properties,'sharing'));assert.ok(!schema.required.includes('sharing'));
  validateProductionPackage(value,{readmeText:'Stores memory.',libraries,route:selectContentRoute()});
  const result=createProductionPackage(value,{fullName:f.plan.fullName,preview:{sha:f.research.project.versionOrCommit,readmeName:'README.md',readmeText:'Stores memory.'},contract:f.contract,editingSkill:f.editingSkill,libraries});
  assert.ok(!Object.hasOwn(result.plan.preproduction,'sharing'));assert.deepEqual(result.plan.preproduction.contentRoute,{skill:null,form:null});
  const plan=structuredClone(f.plan);plan.preproduction.contentRoute=selectContentRoute();delete plan.preproduction.sharing;plan.preproductionDigest=hash(JSON.stringify(plan.preproduction));
  const researchText=readFileSync(join(f.layout.resourcesDirectory,'research.json'),'utf8');assert.doesNotThrow(()=>loadCreativePlan(plan,researchText,libraries));
  for(const sharing of [{},null,f.plan.preproduction.sharing])assert.throws(()=>validateProductionPackage({...value,sharing},{readmeText:'Stores memory.',libraries}),/omit them/);
});

test('GitHub profile is required only after that Skill is explicitly selected',t=>{
  const f=fixture(t),route=selectContentRoute({skill:'github-project-sharing'}),value={...valueFrom(f),contentRoute:route};
  assert.equal(route.form,'single-short');assert.ok(productionPackageSchema(route).required.includes('sharing'));
  assert.throws(()=>validateProductionPackage(value,{readmeText:'Stores memory.',libraries}),/promise/);
  value.sharing=f.plan.preproduction.sharing;assert.doesNotThrow(()=>validateProductionPackage(value,{readmeText:'Stores memory.',libraries,route}));
  assert.throws(()=>validateProductionPackage(value,{readmeText:'Stores memory.',libraries,route:selectContentRoute()}),/differs/);
  assert.throws(()=>selectContentRoute({form:'single-short'}),/requires a selected/);
  assert.throws(()=>selectContentRoute({skill:'../github-project-sharing'}),/Invalid/);
});

test('another local content Skill loads its unified guidance once without GitHub data or files',t=>{
  const directory=mkdtempSync(join(tmpdir(),'other-content-skill-'));t.after(()=>rmSync(directory,{recursive:true,force:true}));
  const path=join(directory,'.agents/skills/content-choose/task-walkthrough/SKILL.md');mkdirSync(dirname(path),{recursive:true});
  writeFileSync(path,'---\nname: task-walkthrough\ndescription: Test a separate content type.\n---\n## 内容路由\nUse this task walkthrough.\n## 故事\nPLAN_TASK_SENTINEL\n## 画面\nVISUAL_TASK_SENTINEL\n## 自检\nREVIEW_TASK_SENTINEL\n');
  const route=selectContentRoute({skill:'task-walkthrough'}),profile={contentRoute:route};assert.doesNotThrow(()=>validateContentProfile(profile,[]));
  const research=contentPlanningPrompt(directory,route),director=contentSkillReference(directory,route);
  assert.ok(research.includes('PLAN_TASK_SENTINEL'));assert.ok(!research.includes('viewerPromise'));assert.ok(!research.includes('Return sharing'));
  assert.ok(research.includes('VISUAL_TASK_SENTINEL'));assert.ok(research.includes('REVIEW_TASK_SENTINEL'));assert.ok(director.includes(path));assert.ok(!director.includes('VISUAL_TASK_SENTINEL'));assert.ok(!director.includes('PLAN_TASK_SENTINEL'));assert.equal(sharingHandoffInstruction(route),'');
  assert.ok(!Object.hasOwn(productionPackageSchema(route).properties,'sharing'));assert.throws(()=>validateContentProfile({...profile,sharing:{}},[]),/omit them/);
});

test('no selected Skill means no genre loading, story injection or payoff checks in visual review',()=>{
  const route=selectContentRoute();assert.equal(contentSkillBody('does-not-exist',route),'');
  const planning=contentPlanningPrompt('does-not-exist',route);assert.ok(!planning.includes('viewerPromise'));assert.equal(sharingHandoffInstruction(route),'');
  assert.equal(sharingReviewContext(route,undefined,[]),null);
  const timeline=visualTimeline({meta:{fps:30},scenes:[{duration:1,visualBeats:[{id:'task',startFrame:0,endFrame:30,purpose:'任务推进'}]}]}),pages=[{id:'sample',file:'sample.png',startSeconds:0,endSeconds:1}];
  const prompt=visualReviewPrompt({timeline,pages,contentRoute:route,preview:'preview.mp4',storyboardDigest:'story',evidenceDigest:'images'},pages);
  assert.throws(()=>visualReviewPrompt({timeline,pages,contentRoute:route,sharing:{viewerPromise:'stray'},preview:'preview.mp4'},pages),/requires its selected/);
  assert.ok(!prompt.includes('# Content Skill:'));assert.ok(!prompt.includes('Whole-film story intent and payoff locations'));assert.ok(!prompt.includes('single-short：'));
  assert.ok(prompt.includes('actual rendered sequence'));assert.ok(prompt.includes('blocking/major')); // Common evidence/severity review still runs.
});

test('material viewing can refine visual intent while protecting narration, facts and chosen story',t=>{
  const f=fixture(t),initial={...valueFrom(f),contentRoute:f.plan.preproduction.contentRoute,sharing:f.plan.preproduction.sharing},final=structuredClone(initial);
  final.content.visualIntent='按实际演示调整信息关系';final.content.units[0].visualIntent='输入与结果并列呈现';final.shots[0].visualDesign='实际画面左侧输入右侧结果';
  assert.doesNotThrow(()=>validateMaterialNarrativeIdentity(initial,final));
  for(const mutate of [v=>v.content.fullNarration+='新句子',v=>v.claims[0].quote='changed',v=>v.content.styleId='different',v=>v.sharing.story='不同故事',v=>v.content.units[0].claimIndexes=[1]]){
    const changed=structuredClone(final);mutate(changed);assert.throws(()=>validateMaterialNarrativeIdentity(initial,changed),/changed the agreed/);
  }
});

test('usage changes keep inspected demo identity while code changes require a fresh render',t=>{
  const f=fixture(t),material={id:'memory',exportName:'Memory',source:'export default ()=> <div>记忆</div>;',usage:'Use this memory.',demoSource:'import Memory from "./component.jsx";export default ()=> <Memory/>;',shotIds:['shot1']},value={customMaterials:[material]};
  const movie=join(f.directory,'render-stub.mp4');writeFileSync(movie,'protocol-render');let renders=0;
  const options={resourcesDirectory:f.layout.resourcesDirectory,style:libraries.styles[0],fullName:f.plan.fullName,render:()=>{renders++;return {output:movie};}};
  stageCustomMaterials(value,options);const identity=customMaterialVisualIdentity(value);
  material.usage='Use measured timing; keep result visible.';assert.equal(customMaterialVisualIdentity(value),identity);syncCustomMaterialUsage(value,options);stageCustomMaterials(value,options);assert.equal(renders,1);
  assert.equal(readFileSync(join(f.layout.resourcesDirectory,'prepared-materials/memory/usage.md'),'utf8'),material.usage);
  material.source='export default ()=> <div>新记忆</div>;';assert.notEqual(customMaterialVisualIdentity(value),identity);assert.throws(()=>syncCustomMaterialUsage(value,options),/fresh preview/);stageCustomMaterials(value,options);assert.equal(renders,2);
});
