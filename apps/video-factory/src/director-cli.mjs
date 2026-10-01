#!/usr/bin/env node
import {mkdirSync,readFileSync,writeFileSync,existsSync,renameSync} from 'node:fs';
import {dirname,join,resolve,sep} from 'node:path';
import {fileURLToPath} from 'node:url';
import {validateCliOptions} from '../../shared/cli-options.mjs';
import {loadSelection} from '../../trend-scout/src/selection.mjs';
import {projectLayoutFromSelection} from '../../shared/pipeline-paths.mjs';
import {latestResearch} from '../../trend-scout/src/final-report.mjs';
import {loadEditorialContract,trustedContractPrompt} from '../../repo-researcher/src/editorial-contract.mjs';
import {loadEditorialPlan,loadVideoEditingSkill} from './editorial-agent.mjs';
import {runToolAgent} from './codex-runner.mjs';
import {compileVisualProgram} from './runtime-preflight.mjs';
import {loadLibraries,normalizeTiming,compileTimeline,hash,validateCreativeSource} from './creative-plan.mjs';
import {bindProductionShots,directorContextPrompt,validatePlannedAssets,validatePlannedRealization} from './production-package.mjs';
import {buildCreativeProgram} from './creative-program.mjs';
import {runVisualPreflight} from './visual-preflight.mjs';
import {loadDirectorRun} from './director-state.mjs';
import {wavDuration} from './narration.mjs';
import {writeShotPreviewHarness} from './shot-preview.mjs';
const ROOT=resolve(import.meta.dirname,'../../..');
const arg=name=>{const i=process.argv.indexOf(name);return i<0?null:process.argv[i+1];};
const json=path=>JSON.parse(readFileSync(path,'utf8'));
const atomic=(path,value)=>{const temp=path+'.tmp';writeFileSync(temp,JSON.stringify(value,null,2)+'\n');renameSync(temp,path);};
export function readablePlan(plan) {
  return [`# 统一制作策划案：${plan.fullName}`,'',`状态：${plan.phase}；风格：${plan.content.styleId}`,'',plan.content.fullNarration,'',
    plan.preproduction.designContext,'',...plan.preproduction.shots.map(s=>`- ${s.id}：${s.visualDesign}；衔接：${s.continuity}`),'',
    ...((plan.visual?.scenes??[]).map(s=>`- ${s.id}：${s.startFrame}–${s.endFrame} 帧`)),'','人工最终评审：待评审。',''].join('\n');
}
export const visualPrompt=directorContextPrompt;
export async function directMain() {
  validateCliOptions(process.argv.slice(2),{values:['--repo','--selection','--request','--resume-run'],booleans:['--dry-run']});
  const selectionPath=arg('--selection'),fullName=arg('--repo');
  if(!selectionPath||!fullName)throw new Error('Usage: video:direct --selection PATH --repo owner/name [--request FILE] [--dry-run]');
  const {selection}=loadSelection(selectionPath,{requireApproved:true});
  if(!selection.videoProjects.includes(fullName)||!selection.selectedRepositories.includes(fullName))throw new Error('Project must be approved for research and video.');
  const layout=projectLayoutFromSelection(ROOT,selection,fullName),resources=layout.resourcesDirectory,production=dirname(layout.storyboardPath);
  const contract=loadEditorialContract(ROOT),latest=latestResearch(ROOT,fullName,selection,{editorialContract:contract});
  if(latest?.status!=='completed'||latest.research.workflow!=='scoped-production-package')throw new Error('Current complete scoped research plan required; run video:plan.');
  const research=latest.research,researchText=readFileSync(join(resources,'research.json'),'utf8'),libraries=loadLibraries(ROOT,{fullName});
  const plan=loadEditorialPlan({resourcesDirectory:resources,fullName,researchText,contract,editingSkill:loadVideoEditingSkill(ROOT)}).plan;
  validatePlannedAssets(plan,resources);
  const audioPath=join(production,'narration.wav'),timingPath=join(production,'timing.json'),audioBytes=readFileSync(audioPath),timing=json(timingPath),audioStoryboard=json(layout.storyboardPath);
  const audio=normalizeTiming(timing,audioStoryboard.meta.fps);
  if(Math.abs(wavDuration(audioBytes)-audio.totalFrames/audio.fps)>1/audio.fps)throw new Error('Measured timing differs from the narration WAV.');
  if(audioStoryboard.meta.researchCommit!==research.project.versionOrCommit||audioStoryboard.meta.editorialContractDigest!==contract.digest||audioStoryboard.meta.contentDigest!==plan.contentDigest)throw new Error('Audio provenance is stale. Generate audio from the current research plan.');
  const shots=bindProductionShots(plan,timing,audio.fps),materials=audioStoryboard.meta.materials??[];
  const style=libraries.styles.find(s=>s.id===plan.content.styleId);
  const referenceIndex=join(ROOT,'docs/production-reference-index.json');
  const prompt=directorContextPrompt({contractBody:trustedContractPrompt(contract).body,plan,style,references:referenceIndex});
  writeFileSync(join(resources,'director-agent-prompt.txt'),prompt);
  if(process.argv.includes('--dry-run'))return console.log(JSON.stringify({promptCharacters:prompt.length,shots:shots.map(s=>({id:s.id,startFrame:s.startFrame,endFrame:s.endFrame})),references:'on-demand'}));
  const runInputs={contentDigest:plan.contentDigest,preproductionDigest:plan.preproductionDigest,audioSha256:hash(audioBytes),timingSha256:hash(readFileSync(timingPath)),libraryDigest:libraries.digest};
  const resumed=arg('--resume-run')?loadDirectorRun(resources,resolve(arg('--resume-run')),runInputs):null;
  const runDirectory=resumed?.directory??join(resources,'shots/runs',new Date().toISOString().replace(/[:.]/gu,'-'));mkdirSync(runDirectory,{recursive:true});atomic(join(runDirectory,'inputs.json'),runInputs);
  let sessionId=resumed?.sessionId,visual;
  if(arg('--request'))visual=json(resolve(arg('--request')));
  else {
    const scenes=[];
    for(const [i,shot] of shots.entries()) {
      const directory=join(runDirectory,shot.id);mkdirSync(directory,{recursive:true});
      const sourceFile=join(directory,'shot.jsx'),assignmentFile=join(directory,'assignment.json');
      const captions=audio.clips.filter(c=>c.startFrame<shot.endFrame&&c.endFrame>shot.startFrame).map(c=>({...c,startFrame:Math.max(c.startFrame,shot.startFrame)-shot.startFrame,endFrame:Math.min(c.endFrame,shot.endFrame)-shot.startFrame}));
      const assignment={sourceFile,durationInFrames:shot.durationInFrames,fps:audio.fps,style,assets:materials,captions,publicDirectory:production,scene:shot,beat:{id:shot.id}};
      if(!resumed?.completed.includes(shot.id)){atomic(assignmentFile,assignment);}writeShotPreviewHarness(join(directory,'preview'),assignment);
      const task=`${i===0?prompt+'\n':''}Implement planned shot ${shot.id} only. Assignment: ${JSON.stringify(shot)}\nCaption timing for this shot (measured blocks with weighted cue estimates): ${JSON.stringify(captions)}\nPrevious and next design: ${JSON.stringify({previous:shots[i-1]??null,next:shots[i+1]??null})}\nWrite the full default-export React component to ${sourceFile}. Props: {frame,durationInFrames,fps,style,accent,assets,scene,beat}. frame/useCurrentFrame are shot-relative. Use durationInFrames prop rather than whole-video duration. Implement style geometry, typography, spatial continuity and planned content. Assets are staged src values in assignment.json and used with staticFile.\nRead only selected library code/demos and needed Remotion references from the index. Local motion imports use './motion-library.jsx' or './shot-runtime.jsx'. Installed browser packages are available. Deterministic offline frames, no timers or CSS animation. There are no object/action/layout enums or motion quotas.\nTry the shot by running node ${join(ROOT,'apps/video-factory/src/shot-preview.mjs')} ${assignmentFile}, inspect the generated middle.png and preview frames, and repair visible problems. Caption region is the selected style's bottom safe area.\nReturn JSON only: {sourceFile:"${sourceFile.replaceAll('\\','/')}",summary:"implementation and continuity",libraryIds:[actual used IDs]}. Do not rewrite narration, timing or other shots.`;
      const result=resumed?.completed.includes(shot.id)?{value:json(join(directory,'result.json')),sessionId}:await runToolAgent(task,{workingDirectory:ROOT,outputPath:join(directory,'result.json'),sessionId,sandbox:'workspace-write'});sessionId=result.sessionId;
      if(resolve(result.value.sourceFile)!==resolve(sourceFile)||!existsSync(sourceFile))throw new Error('Director did not produce the assigned local shot.');
      const source=readFileSync(sourceFile,'utf8');validateCreativeSource(source);
      const actualIds=result.value.libraryIds;
      if(!Array.isArray(actualIds)||actualIds.some(id=>!shot.libraryIds.includes(id)))throw new Error('Director changed the planned component selection. Repair realization or explicitly replan.');
      scenes.push({id:shot.id,title:shot.title,startFrame:shot.startFrame,endFrame:shot.endFrame,purpose:shot.purpose,claimIndexes:shot.claimIndexes,
        beats:[{id:shot.id,startFrame:0,endFrame:shot.durationInFrames,narrationCue:shot.narrationCue,purpose:shot.purpose,claimIndexes:shot.claimIndexes,
          route:shot.route,libraryIds:actualIds,candidates:[],reason:result.value.summary,sourceFile,source}]});
      atomic(join(runDirectory,'director-session.json'),{sessionId,contentDigest:plan.contentDigest,preproductionDigest:plan.preproductionDigest,completed:scenes.map(s=>s.id)});
    }
    visual={styleId:plan.content.styleId,designSummary:plan.preproduction.designContext,scenes};
  }
  let built,compilation,preflight,finalPlan;
  for(let attempt=0;attempt<4;attempt++) {
    try {
      validatePlannedRealization(plan,shots,visual);
      const compiled=compileTimeline({audioStoryboard,timing,visual,research,libraries,contentDigest:plan.contentDigest});
      // Carry the design context through to the reviewer, including joins between neighboring shots.
      compiled.storyboard.meta.designContext=plan.preproduction.designContext;
      for(const s of compiled.storyboard.scenes) {const p=shots.find(x=>x.id===s.id);s.continuity=p?.continuity??null;s.visualDesign=p?.visualDesign??null;s.assetIds=p?.assetIds??[];}
      finalPlan={...plan,phase:'visual-ready',visual,audio:{sha256:hash(audioBytes),timingSha256:hash(readFileSync(timingPath)),totalFrames:audio.totalFrames,fps:audio.fps,precision:audio.precision},libraryDigest:libraries.digest};
      compiled.storyboard.meta.editorialPlanDigest=hash(JSON.stringify(finalPlan));
      built=buildCreativeProgram(compiled,{resourcesDirectory:resources,remotionGuidance:{provider:'installed-codex-remotion-plugin',loading:'on-demand',referenceIndex}});
      compilation=compileVisualProgram(built.storyboard,resources);
      const preflightConfig=json(join(ROOT,'config/video-editorial.json')).qa?.visualPreflight??{};
      preflight=await runVisualPreflight({storyboard:built.storyboard,resourcesDirectory:resources,evidenceFps:preflightConfig.evidenceFps??3,pagesPerReview:preflightConfig.pagesPerReview??8,reviewConcurrency:preflightConfig.reviewConcurrency??2});
      atomic(join(runDirectory,`visual-${attempt}.json`),visual);
      if(preflight.status==='passed')break;
      if(attempt===3||arg('--request'))throw new Error('Visual preflight needs repair: '+preflight.reportPath);
      const manifest=json(preflight.manifestPath),images=manifest.pages.filter(p=>preflight.issues.some(issue=>issue.evidence.includes(p.id))).map(p=>p.file);
      const repair=`Actual visual preflight found these issues: ${JSON.stringify(preflight.issues)}. Read images at full size. Repair ONLY affected shot.jsx files in ${runDirectory}, preserving the unified plan, audio, cue timing and style. Resolve continuity at joins. Return JSON {repairedShots:[shot IDs]}.`;
      const result=await runToolAgent(repair,{workingDirectory:ROOT,outputPath:join(runDirectory,`repair-${attempt}.json`),sessionId,images,sandbox:'workspace-write'});sessionId=result.sessionId;
      for(const id of result.value.repairedShots??[]){const scene=visual.scenes.find(s=>s.id===id);if(!scene)throw new Error('Repair refers to an unknown shot.');scene.beats[0].source=readFileSync(join(runDirectory,id,'shot.jsx'),'utf8');}
    }catch(e) {
      writeFileSync(join(runDirectory,`error-${attempt}.txt`),e.message);
      if(attempt===3||arg('--request')||e.visualPreflightStatus==='error'||e.toolAgentStatus==='error')throw e;
      const result=await runToolAgent(`Technical compile repair: ${e.message}. Repair only shot.jsx files within ${runDirectory}. Keep the complete plan and audio unchanged. Return JSON {repairedShots:[IDs]}.`,{workingDirectory:ROOT,outputPath:join(runDirectory,`technical-repair-${attempt}.json`),sessionId,sandbox:'workspace-write'});sessionId=result.sessionId;
      for(const id of result.value.repairedShots??[]){const scene=visual.scenes.find(s=>s.id===id);if(scene)scene.beats[0].source=readFileSync(join(runDirectory,id,'shot.jsx'),'utf8');}
    }
  }
  if(preflight?.status!=='passed')throw new Error('Visual preflight did not pass. Retained diagnostics: '+runDirectory);
  if(hash(readFileSync(audioPath))!==hash(audioBytes))throw new Error('Audio changed during visual direction.');
  built.storyboard.meta.visualPreflight={status:'passed',reportPath:preflight.reportPath};
  atomic(join(resources,'editorial-plan.json'),finalPlan);atomic(layout.storyboardPath,built.storyboard);writeFileSync(join(resources,'editorial-plan.md'),readablePlan(finalPlan));
  const report={schemaVersion:3,fullName,workflow:'scoped-plan-audio-visual-director',status:'ready-for-render',sessionId,
    audioSha256:hash(audioBytes),promptCharacters:prompt.length,referenceLoading:'on-demand',compilation,visualPreflight:{status:preflight.status,reportPath:preflight.reportPath},humanReview:'pending'};
  atomic(join(resources,'visual-program-report.json'),report);atomic(join(production,'qa-report.json'),report);console.log(JSON.stringify(report));
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url))directMain().catch(e=>{console.error(e.message);process.exitCode=1;});
