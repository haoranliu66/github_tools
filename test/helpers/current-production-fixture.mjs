import {mkdirSync,readFileSync,writeFileSync,copyFileSync} from 'node:fs';
import {dirname,join,resolve} from 'node:path';
import {prepareProductionMaterials} from '../../apps/video-factory/src/production-materials.mjs';
import {createProductionPackage} from '../../apps/video-factory/src/production-package.mjs';
import {makeAudioDraft,compileTimeline,loadLibraries,hash} from '../../apps/video-factory/src/creative-plan.mjs';
import {buildCreativeProgram} from '../../apps/video-factory/src/creative-program.mjs';
import {visualStoryboardDigest} from '../../apps/video-factory/src/visual-preflight.mjs';
import {loadEditorialContract} from '../../apps/repo-researcher/src/editorial-contract.mjs';
import {loadVideoEditingSkill} from '../../apps/video-factory/src/editorial-agent.mjs';
import {projectLayout} from '../../apps/shared/pipeline-paths.mjs';
export const repositoryRoot=resolve(import.meta.dirname,'../..');
export function installCurrentSkill(root){for(const name of ['SKILL.md']){const source=join(repositoryRoot,'.agents/skills/content-choose/github-project-sharing',name),destination=join(root,'.agents/skills/content-choose/github-project-sharing',name);mkdirSync(dirname(destination),{recursive:true});copyFileSync(source,destination);}const relative='.agents/skills/video-production-quality/SKILL.md',target=join(root,relative);mkdirSync(dirname(target),{recursive:true});copyFileSync(join(repositoryRoot,relative),target);return loadEditorialContract(root);}
export function writeCurrentProductionFixture(root,{fullName='fixture/approved',snapshotDate='2026-09-14',visual=true,contract=installCurrentSkill(root),editingSkill=loadVideoEditingSkill(repositoryRoot)}={}){
  const libraries=loadLibraries(repositoryRoot),layout=projectLayout(root,{fullName,snapshotDate}),resources=layout.resourcesDirectory;mkdirSync(layout.productionDirectory,{recursive:true});mkdirSync(join(resources,'_provenance'),{recursive:true});
  const preview={sha:'a'.repeat(40),readmeName:'README.md',readmeText:'Stores memory.'};
  const value={claims:[{claim:'保存记忆',quote:preview.readmeText}],content:{title:'记忆示例',fullNarration:'记住偏好。',styleId:libraries.styles[0].id,visualIntent:'偏好被保存',units:[{id:'retain',heading:'保存',narration:'记住偏好。',visualIntent:'偏好被保存',claimIndexes:[0]}]},designContext:'偏好是同一物体',shots:[{id:'shot1',unitId:'retain',narrationCue:'记住偏好',purpose:'展示偏好保存',visualDesign:'标签进入记忆',continuity:'保留标签和记忆容器',route:'custom',libraryIds:[],assetIds:[]}],assets:[]};
  value.contentRoute={skill:'github-project-sharing',form:'single-short'};
  value.sharing={viewerPromise:'理解这个任务怎样得到可用结果',story:'同一输入经关键处理形成结果，结尾说明用途',example:'偏好输入、保存、再次找回',resultShotIds:['shot1']};
  const result=createProductionPackage(value,{fullName,preview,contract,editingSkill,libraries});let plan=result.plan;prepareProductionMaterials(plan,{root:repositoryRoot,resourcesDirectory:resources});
  writeFileSync(join(resources,'research.json'),result.researchText);writeFileSync(join(resources,'_provenance/official-readme.md'),preview.readmeText);writeFileSync(join(resources,'media_manifest.json'),JSON.stringify({schemaVersion:3,workflow:'scoped-production-package',items:[]}));
  const timing={totalFrames:30,measuredTotal:1,clips:[{text:plan.content.fullNarration,startFrame:0,endFrame:30}]};
  const audio=Buffer.alloc(48044);audio.write('RIFF');audio.writeUInt32LE(audio.length-8,4);audio.write('WAVE',8);audio.write('fmt ',12);audio.writeUInt32LE(16,16);audio.writeUInt16LE(1,20);audio.writeUInt16LE(1,22);audio.writeUInt32LE(24000,24);audio.writeUInt32LE(48000,28);audio.writeUInt16LE(2,32);audio.writeUInt16LE(16,34);audio.write('data',36);audio.writeUInt32LE(48000,40);
  writeFileSync(join(layout.productionDirectory,'narration.wav'),audio);writeFileSync(join(layout.productionDirectory,'timing.json'),JSON.stringify(timing));
  let storyboard=makeAudioDraft(plan,result.research);storyboard.voiceover='narration.wav';
  if(visual){
    const s=value.shots[0],realization={styleId:plan.content.styleId,designSummary:value.designContext,scenes:[{id:s.id,title:'保存偏好',startFrame:0,endFrame:30,purpose:s.purpose,claimIndexes:[0],beats:[{id:s.id,startFrame:0,endFrame:30,narrationCue:s.narrationCue,purpose:s.purpose,claimIndexes:[0],route:'custom',libraryIds:[],candidates:[],reason:'偏好进入记忆',source:'export default function Shot(){return <div>偏好进入记忆</div>;}'}]}]};
    plan={...plan,phase:'visual-ready',visual:realization,audio:{sha256:hash(audio),timingSha256:hash(readFileSync(join(layout.productionDirectory,'timing.json'))),totalFrames:30,fps:30,precision:'measured block, estimated cue'},libraryDigest:libraries.digest};
    const compiled=compileTimeline({audioStoryboard:storyboard,timing,visual:realization,research:result.research,libraries,contentDigest:plan.contentDigest});compiled.storyboard.meta.editorialPlanDigest=hash(JSON.stringify(plan));
    storyboard=buildCreativeProgram(compiled,{resourcesDirectory:resources,remotionGuidance:{loading:'on-demand'}}).storyboard;
    // A unit-test execution receipt; this is never a real production visual judgment.
    const reportPath=join(layout.productionDirectory,'visual-preflight-state.json');
    writeFileSync(reportPath,JSON.stringify({schemaVersion:1,status:'passed',reviewOwner:'main-agent',storyboardDigest:visualStoryboardDigest(storyboard),renderOrigin:'compiled-storyboard'}));
    storyboard.meta.visualPreflight={status:'passed',reportPath};
  }
  writeFileSync(join(resources,'editorial-plan.json'),JSON.stringify(plan));writeFileSync(layout.storyboardPath,JSON.stringify(storyboard));
  return {layout,research:result.research,plan,storyboard,contract,editingSkill};
}
