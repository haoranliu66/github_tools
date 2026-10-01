import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,mkdirSync,readFileSync,writeFileSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join,resolve} from 'node:path';
import {loadLibraries,hash,loadCreativePlan} from '../apps/video-factory/src/creative-plan.mjs';
import {productionPackageSchema,validateProductionPackage,createProductionPackage,stagePlannedAssets,validatePlannedAssets,bindProductionShots,directorContextPrompt,validatePlannedRealization} from '../apps/video-factory/src/production-package.mjs';
import {loadDirectorRun} from '../apps/video-factory/src/director-state.mjs';
import {toolAgentArguments} from '../apps/video-factory/src/codex-runner.mjs';
import {loadEditorialContract,trustedContractPrompt} from '../apps/repo-researcher/src/editorial-contract.mjs';
import {loadVideoEditingSkill} from '../apps/video-factory/src/editorial-agent.mjs';
import {validateFactResearch} from '../apps/repo-researcher/src/fact-research.mjs';
const root=resolve(import.meta.dirname,'..'),libraries=loadLibraries(root),contract=loadEditorialContract(root);
const preview={sha:'a'.repeat(40),readmeName:'README.md',readmeText:'Memory retains user preferences. Retrieval selects relevant memories.'};
const value={claims:[{claim:'记住偏好',quote:'Memory retains user preferences.'},{claim:'检索相关记忆',quote:'Retrieval selects relevant memories.'}],
  content:{title:'让助手记住偏好',styleId:'editorial-paper',fullNarration:'保存你的偏好。再次提问时找回相关记忆。',visualIntent:'同一偏好进入存储再被检索',
    units:[{id:'save',heading:'保存',narration:'保存你的偏好。',visualIntent:'偏好进入记忆',claimIndexes:[0]},
      {id:'retrieve',heading:'检索',narration:'再次提问时找回相关记忆。',visualIntent:'偏好被找回',claimIndexes:[1]}]},designContext:'保持同一个橙色偏好标签。',
  shots:[{id:'save',unitId:'save',narrationCue:'保存你的偏好',purpose:'记录',visualDesign:'偏好标签沿路径进入容器',continuity:'容器留在右侧',route:'custom',libraryIds:[],assetIds:['memory']},
    {id:'retrieve',unitId:'retrieve',narrationCue:'再次提问',purpose:'找回',visualDesign:'检索线拉回同一偏好',continuity:'沿用右侧容器和标签',route:'custom',libraryIds:[],assetIds:['memory']}],
  assets:[{id:'memory',kind:'svg',source:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"><rect x="4" y="4" width="72" height="72" fill="#ff6c42"/></svg>',purpose:'贯穿两镜头的记忆标记'}]};
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
  const shots=bindProductionShots(result.plan,timing,30);assert.deepEqual(shots.map(s=>[s.startFrame,s.endFrame]),[[0,72],[72,180]]);
  timing.clips[0].text='改写口播';assert.throws(()=>bindProductionShots(result.plan,timing,30),/differs/);
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

test('external realizations must preserve original shot identity, timing and semantic decisions',()=> {
  const result=make(),timing={totalFrames:180,clips:[{text:value.content.units[0].narration,startFrame:0,endFrame:65},{text:value.content.units[1].narration,startFrame:72,endFrame:180}]};
  const shots=bindProductionShots(result.plan,timing,30),visual={styleId:result.plan.content.styleId,scenes:shots.map(s=>({...s,beats:[{id:s.id,purpose:s.purpose,narrationCue:s.narrationCue,claimIndexes:s.claimIndexes,route:s.route,libraryIds:s.libraryIds}]}))};
  assert.doesNotThrow(()=>validatePlannedRealization(result.plan,shots,visual));visual.scenes[0].beats[0].purpose='unrelated explanation';assert.throws(()=>validatePlannedRealization(result.plan,shots,visual),/changed/);
});

test('director recovery reuses only the same fixed plan/audio and the retained local session',t=> {
  const directory=mkdtempSync(join(tmpdir(),'director-state-'));t.after(()=>rmSync(directory,{recursive:true,force:true}));
  const run=join(directory,'shots/runs/run1');mkdirSync(run,{recursive:true});const inputs={contentDigest:'content',preproductionDigest:'design',audioSha256:'audio',timingSha256:'timing',libraryDigest:'library'};
  writeFileSync(join(run,'inputs.json'),JSON.stringify(inputs));writeFileSync(join(run,'director-session.json'),JSON.stringify({sessionId:'same-director',completed:['s1']}));
  assert.equal(loadDirectorRun(directory,run,inputs).sessionId,'same-director');assert.throws(()=>loadDirectorRun(directory,run,{...inputs,audioSha256:'different'}),/changed/);assert.throws(()=>loadDirectorRun(directory,join(directory,'another-project'),inputs),/retained/);
});
test('existing local recordings are eligible without a source-category quality preference',t=> {
  const directory=mkdtempSync(join(tmpdir(),'local-observation-'));t.after(()=>rmSync(directory,{recursive:true,force:true}));mkdirSync(join(directory,'observations'));
  writeFileSync(join(directory,'observations/demo.mp4'),'retained-movie');const packageValue=structuredClone(value);packageValue.assets=[{id:'memory',kind:'file',source:'observations/demo.mp4',purpose:'actual observed media'}];
  assert.doesNotThrow(()=>validateProductionPackage(packageValue,{readmeText:preview.readmeText,libraries}));stagePlannedAssets(packageValue,{resourcesDirectory:directory,sourceDirectory:'unused',candidates:[]});assert.equal(readFileSync(join(directory,'visual-assets/memory.mp4'),'utf8'),'retained-movie');
});
