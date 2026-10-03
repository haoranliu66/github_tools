import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,mkdirSync,readFileSync,writeFileSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join,resolve} from 'node:path';
import {loadLibraries,hash,loadCreativePlan} from '../apps/video-factory/src/creative-plan.mjs';
import {productionPackageSchema,validateProductionPackage,createProductionPackage,stagePlannedAssets,validatePlannedAssets,directorContextPrompt,validatePlannedRealization} from '../apps/video-factory/src/production-package.mjs';
import {loadDirectorRun} from '../apps/video-factory/src/director-state.mjs';
import {toolAgentArguments} from '../apps/video-factory/src/codex-runner.mjs';
import {loadEditorialContract,trustedContractPrompt} from '../apps/repo-researcher/src/editorial-contract.mjs';
import {loadVideoEditingSkill} from '../apps/video-factory/src/editorial-agent.mjs';
import {validateFactResearch} from '../apps/repo-researcher/src/fact-research.mjs';
import {planningCueWindows,validateVisualLayout,layoutDigest,layoutTasks,visualFromLayout,taskDigest} from '../apps/video-factory/src/director-layout.mjs';
import {selectedMaterialIdentity,prepareSelectedMaterialEvidence,validateSelectedMaterialInspection} from '../apps/video-factory/src/selected-materials.mjs';
import {spawnSync} from 'node:child_process';
import ffmpeg from '@ffmpeg-installer/ffmpeg';
const root=resolve(import.meta.dirname,'..'),libraries=loadLibraries(root),contract=loadEditorialContract(root);
const preview={sha:'a'.repeat(40),readmeName:'README.md',readmeText:'Memory retains user preferences. Retrieval selects relevant memories.'};
const value={claims:[{claim:'记住偏好',quote:'Memory retains user preferences.'},{claim:'检索相关记忆',quote:'Retrieval selects relevant memories.'}],
  content:{title:'让助手记住偏好',styleId:'editorial-paper',fullNarration:'保存你的偏好。再次提问时找回相关记忆。',visualIntent:'同一偏好进入存储再被检索',
    units:[{id:'save',heading:'保存',narration:'保存你的偏好。',visualIntent:'偏好进入记忆',claimIndexes:[0]},
      {id:'retrieve',heading:'检索',narration:'再次提问时找回相关记忆。',visualIntent:'偏好被找回',claimIndexes:[1]}]},designContext:'保持同一个橙色偏好标签。',
  shots:[{id:'save',unitId:'save',narrationCue:'保存你的偏好',purpose:'记录',visualDesign:'偏好标签沿路径进入容器',continuity:'容器留在右侧',route:'custom',libraryIds:[],assetIds:['memory']},
    {id:'retrieve',unitId:'retrieve',narrationCue:'再次提问',purpose:'找回',visualDesign:'检索线拉回同一偏好',continuity:'沿用右侧容器和标签',route:'custom',libraryIds:[],assetIds:['memory']}],
  assets:[{id:'memory',kind:'svg',source:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"><rect x="4" y="4" width="72" height="72" fill="#ff6c42"/></svg>',purpose:'贯穿两镜头的记忆标记'}]};
  value.contentRoute={skill:'github-project-sharing',form:'single-short'};
  value.sharing={viewerPromise:'理解这个任务怎样得到可用结果',story:'同一输入经关键处理形成结果，结尾说明用途',example:'偏好输入、保存、再次找回',resultShotIds:['retrieve']};
const make=()=>createProductionPackage(structuredClone(value),{fullName:'example/memory',preview,contract,editingSkill:loadVideoEditingSkill(root),libraries});
test('scoped research delivers complete creative planning without premature frame timing or unrelated reports',()=>{
  const result=make();validateFactResearch(result.research,{contract,readmeText:preview.readmeText});
  assert.equal(result.plan.phase,'production-planned');assert.equal(result.plan.preproduction.shots.length,2);
  assert.ok(!Object.hasOwn(productionPackageSchema().properties,'audience'));assert.ok(!Object.hasOwn(productionPackageSchema().properties.shots.items.properties,'startFrame'));
  assert.ok(!Object.hasOwn(result.research,'demoability'));assert.doesNotThrow(()=>loadCreativePlan(result.plan,result.researchText,libraries));
  const changed=structuredClone(result.plan);changed.preproduction.shots[0].visualDesign='unrecorded change';assert.throws(()=>loadCreativePlan(changed,result.researchText,libraries),/changed/);
});
test('planning rejects irrelevant materials, unused claims and invented feature evidence',()=>{
  const extra=structuredClone(value);extra.assets.push({...extra.assets[0],id:'unused'});assert.throws(()=>validateProductionPackage(extra,{readmeText:preview.readmeText,libraries}),/unused/);
  const invented=structuredClone(value);invented.claims[0].quote='not in README';assert.throws(()=>validateProductionPackage(invented,{readmeText:preview.readmeText,libraries}),/excerpt/);
  const unneeded=structuredClone(value);unneeded.claims.push({claim:'irrelevant',quote:preview.readmeText});assert.throws(()=>validateProductionPackage(unneeded,{readmeText:preview.readmeText,libraries}),/unused/);
});
test('required SVG assets are materialized and provenance hashes detect subsequent replacement',t=>{
  const dir=mkdtempSync(join(tmpdir(),'scoped-assets-'));t.after(()=>rmSync(dir,{recursive:true,force:true}));const result=make();
  stagePlannedAssets(value,{resourcesDirectory:dir,sourceDirectory:dir,candidates:[]});const a=result.plan.preproduction.assets[0];a.sha256=hash(readFileSync(join(dir,a.file)));result.plan.preproductionDigest=hash(JSON.stringify(result.plan.preproduction));
  assert.equal(validatePlannedAssets(result.plan,dir)[0].id,'memory');writeFileSync(join(dir,a.file),'<svg/>');assert.throws(()=>validatePlannedAssets(result.plan,dir),/changed/);
});
test('visual timing is bound to measured audio after planning and detects narration mutation',()=>{
  const result=make(),timing={totalFrames:180,clips:[{text:value.content.units[0].narration,startFrame:0,endFrame:65},{text:value.content.units[1].narration,startFrame:72,endFrame:180}]};
  const windows=planningCueWindows(result.plan,timing,30);assert.deepEqual(windows.map(s=>s.estimatedFrame),[0,72]);assert.ok(windows.every(s=>!('endFrame' in s)));
  timing.clips[0].text='改写口播';assert.throws(()=>planningCueWindows(result.plan,timing,30),/differs/);
});
test('director baseline uses only total skill, selected style and unified plan with on-demand reference index',()=>{
  const result=make(),style=libraries.styles.find(s=>s.id===result.plan.content.styleId);
  const prompt=directorContextPrompt({contractBody:trustedContractPrompt(contract).body,plan:result.plan,style,references:'docs/production-reference-index.json'});
  assert.ok(prompt.length<12000);assert.ok(!prompt.includes('MIT License'));assert.ok(!prompt.includes('source-reviewed'));assert.ok(!prompt.includes(preview.readmeText));
  assert.ok(!prompt.includes('dark-cinematic'));assert.ok(libraries.motions.every(m=>!('source' in m)&&!('quality' in m)&&!('review' in m)));
});
test('tool-enabled turns retain images and same director session while constraining filesystem scope',()=>{
  const args=toolAgentArguments({outputPath:'out.json',images:['actual.png'],sessionId:'session',sandbox:'workspace-write'});
  assert.ok(args.includes('resume'));assert.ok(args.includes('session'));assert.ok(args.includes('actual.png'));assert.ok(args.includes('--json'));assert.ok(!args.includes('--ephemeral'));
  assert.throws(()=>toolAgentArguments({outputPath:'out',sandbox:'unsafe'}),/Unsupported/);
});

const testTiming={totalFrames:180,clips:[{text:value.content.units[0].narration,startFrame:0,endFrame:65},{text:value.content.units[1].narration,startFrame:72,endFrame:180}]};
const testLayout=()=>({styleId:value.content.styleId,designSummary:'贯穿例子',scenes:[{id:'whole',title:'完整叙事',purpose:'记住并找回',startFrame:0,endFrame:180,beats:[
  {id:'input',startFrame:0,endFrame:30,planShotIds:['save'],narrationCue:'保存',purpose:'呈现输入',visualDesign:'输入偏好',continuity:'标签流入容器',libraryIds:[],assetIds:['memory']},
  {id:'process',startFrame:30,endFrame:180,planShotIds:['save','retrieve'],narrationCue:'再次提问',purpose:'存储到检索',visualDesign:'连续镜头',continuity:'同一标记回到问题',libraryIds:[],assetIds:['memory']}
]}]});
test('director can split and combine expressions while preserving facts, material and every audio frame',()=> {
  const {plan}=make(),layout=testLayout();assert.doesNotThrow(()=>validateVisualLayout(plan,testTiming,30,layout,libraries));
  const tasks=layoutTasks(layout,plan);assert.deepEqual(tasks[1].claimIndexes,[0,1]);assert.equal(tasks[1].durationInFrames,150);
  const visual=visualFromLayout(layout,plan,Object.fromEntries(tasks.map(t=>[t.id,{source:'export default ()=>null',sourceFile:t.id+'.jsx',libraryIds:[],summary:'implemented'}])));
  assert.doesNotThrow(()=>validatePlannedRealization(plan,testTiming,30,visual,libraries));
  visual.scenes[0].beats[1].claimIndexes=[0];assert.throws(()=>validatePlannedRealization(plan,testTiming,30,visual,libraries),/claims/);
  const gap=testLayout();gap.scenes[0].beats[1].startFrame++;assert.throws(()=>validateVisualLayout(plan,testTiming,30,gap,libraries),/cover/);
  const invented=testLayout();invented.scenes[0].beats[1].planShotIds=['unknown'];assert.throws(()=>validateVisualLayout(plan,testTiming,30,invented,libraries),/unknown/);
  const missing=testLayout();missing.scenes[0].beats[1].planShotIds=['save'];missing.scenes[0].beats[1].narrationCue='保存';assert.throws(()=>validateVisualLayout(plan,testTiming,30,missing,libraries),/omitted/);
  assert.notEqual(taskDigest(tasks[0],{}),taskDigest({...tasks[0],durationInFrames:31},{}));
  const changed=structuredClone(plan);changed.layout=layout;changed.layoutDigest='stale';assert.throws(()=>loadCreativePlan(changed,make().researchText,libraries),/layout changed/);
});

test('director recovery reuses only the same fixed plan/audio and the retained local session',t=> {
  const directory=mkdtempSync(join(tmpdir(),'director-state-'));t.after(()=>rmSync(directory,{recursive:true,force:true}));
  const run=join(directory,'shots/runs/run1');mkdirSync(run,{recursive:true});const inputs={mode:'short',contentDigest:'content',preproductionDigest:'design',audioSha256:'audio',timingSha256:'timing',libraryDigest:'library'};
  writeFileSync(join(run,'inputs.json'),JSON.stringify(inputs));writeFileSync(join(run,'director-session.json'),JSON.stringify({mode:'short',sharedSource:'export const tag=1;',sharedDigest:hash('export const tag=1;'),joins:[{id:'input',incoming:'empty',outgoing:'tag'},{id:'process',incoming:'tag',outgoing:'result'}],sessionId:'same-director',layout:testLayout(),layoutDigest:layoutDigest(testLayout()),implementations:{input:{sourceDigest:'source',taskDigest:'task'}}}));
  assert.equal(loadDirectorRun(directory,run,inputs).sessionId,'same-director');assert.throws(()=>loadDirectorRun(directory,run,{...inputs,audioSha256:'different'}),/changed/);assert.throws(()=>loadDirectorRun(directory,join(directory,'another-project'),inputs),/retained/);
});
test('existing local recordings are eligible without a source-category quality preference',t=> {
  const directory=mkdtempSync(join(tmpdir(),'local-observation-'));t.after(()=>rmSync(directory,{recursive:true,force:true}));mkdirSync(join(directory,'observations'));
  writeFileSync(join(directory,'observations/demo.mp4'),'retained-movie');const packageValue=structuredClone(value);packageValue.assets=[{id:'memory',kind:'file',source:'observations/demo.mp4',purpose:'actual observed media'}];
  assert.doesNotThrow(()=>validateProductionPackage(packageValue,{readmeText:preview.readmeText,libraries}));stagePlannedAssets(packageValue,{resourcesDirectory:directory,sourceDirectory:'unused',candidates:[]});assert.equal(readFileSync(join(directory,'visual-assets/memory.mp4'),'utf8'),'retained-movie');
});

test('material inspection is limited to selected assets and retains decoded dimensions and image evidence',t=>{
  const directory=mkdtempSync(join(tmpdir(),'material-evidence-'));t.after(()=>rmSync(directory,{recursive:true,force:true}));
  stagePlannedAssets(value,{resourcesDirectory:directory,sourceDirectory:directory,candidates:[]});
  const records=prepareSelectedMaterialEvidence(value.assets,{resourcesDirectory:directory,evidenceDirectory:join(directory,'evidence'),runner:(_command,args)=>{writeFileSync(args[args.indexOf('Material')+1],'actual-png');return {status:0};}});
  assert.equal(records.length,1);assert.equal(records[0].width,80);assert.equal(records[0].evidence.length,1);assert.equal(records[0].sha256,hash(readFileSync(join(directory,records[0].file))));
  assert.notEqual(selectedMaterialIdentity(value.assets),selectedMaterialIdentity([{...value.assets[0],source:'changed'}]));
});

test('real low-frame-rate GIF and video previews sample existing frames including the final decoded image',t=>{
  const directory=mkdtempSync(join(tmpdir(),'selected-animation-'));t.after(()=>rmSync(directory,{recursive:true,force:true}));mkdirSync(join(directory,'visual-assets'));
  const assets=['gif','mp4'].map(extension=>({id:'motion_'+extension,kind:'file',source:'motion.'+extension,purpose:'selected animation'}));
  for(const a of assets){const result=spawnSync(ffmpeg.path,['-y','-v','error','-f','lavfi','-i','testsrc=size=64x48:rate=2:duration=2',...(a.source.endsWith('.mp4')?['-pix_fmt','yuv420p']:[]),join(directory,'visual-assets',a.id+'.'+a.source.split('.').at(-1))],{encoding:'utf8',windowsHide:true});assert.equal(result.status,0,result.stderr);}
  const records=prepareSelectedMaterialEvidence(assets,{resourcesDirectory:directory,evidenceDirectory:join(directory,'evidence')});
  for(const r of records){assert.equal(r.width,64);assert.equal(r.height,48);assert.equal(r.durationSeconds,2);assert.equal(r.evidence.at(-1).timeSeconds,1.5);for(const e of r.evidence)assert.equal(readFileSync(e.file).subarray(0,8).toString('hex'),'89504e470d0a1a0a');}
});

test('selected material handoff rejects missing and stale actual viewing observations without publishing verdicts',()=>{
  const records=[{id:'memory',sha256:'asset-hash',evidence:[{id:'memory-0'},{id:'memory-1'}]}],receipt={package:value,observations:[{assetId:'memory',sha256:'asset-hash',evidenceIds:['memory-0','memory-1'],visualObservation:'同一橙色标记在两个样本中移动到右侧容器，用于存储过程。'}]};
  assert.equal(validateSelectedMaterialInspection(receipt,records),value);
  const missing=structuredClone(receipt);missing.observations[0].evidenceIds.pop();assert.throws(()=>validateSelectedMaterialInspection(missing,records),/unseen/);
  const stale=structuredClone(receipt);stale.observations[0].sha256='old';assert.throws(()=>validateSelectedMaterialInspection(stale,records),/stale/);
  assert.throws(()=>validateSelectedMaterialInspection({package:value,observations:[]},records),/every/);
});
