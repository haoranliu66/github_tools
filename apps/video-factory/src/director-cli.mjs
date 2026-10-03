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
import {requestAgentTask,activeAgentTask,rejectAgentTask,reportAgentTask} from './main-agent-task.mjs';
import {compileVisualProgram} from './runtime-preflight.mjs';
import {loadLibraries,normalizeTiming,compileTimeline,hash,safeResourcePath} from './creative-plan.mjs';
import {directorContextPrompt,validatePlannedAssets,validatePlannedRealization} from './production-package.mjs';
import {buildCreativeProgram} from './creative-program.mjs';
import {runVisualPreflight} from './visual-preflight.mjs';
import {loadDirectorRun} from './director-state.mjs';
import {wavDuration} from './narration.mjs';
import {validateProductionMaterials,preparedMaterialBridge,readableMaterialLinks,prepareDirectorMaterialChanges} from './production-materials.mjs';
import {directorMode,authoringSchema,validateJoins,readSharedModule,prepareSegmentAssignments,collectImplementations,implementLongSegments,stageAuthoringRequest} from './director-modes.mjs';
import {SHARING_TYPE,contentSkillReference,sharingSummary} from './content-skill.mjs';
import {directorSkillBody} from './director-skill.mjs';
import {realizeVisualBeat,realizationState} from './director-context.mjs';
import {visualLayoutSchema,planningCueWindows,validateVisualLayout,layoutDigest,visualFromLayout,taskDigest} from './director-layout.mjs';
const ROOT=resolve(import.meta.dirname,'../../..');
const arg=name=>{const i=process.argv.indexOf(name);return i<0?null:process.argv[i+1];};
const json=path=>JSON.parse(readFileSync(path,'utf8'));
const atomic=(path,value)=>{const temp=path+'.tmp';writeFileSync(temp,JSON.stringify(value,null,2)+'\n');renameSync(temp,path);};
export function readablePlan(plan) {
  return [`# 统一制作策划案：${plan.fullName}`,'',`状态：${plan.phase}；风格：${plan.content.styleId}`,'',plan.content.fullNarration,'',
    ...sharingSummary(plan.preproduction),plan.preproduction.designContext,'',...plan.preproduction.shots.map(s=>`- ${s.id}：${s.visualDesign}；衔接：${s.continuity}`),'',
    ...readableMaterialLinks(plan),'',...((plan.visual?.scenes??[]).map(s=>`- ${s.id}：${s.startFrame}–${s.endFrame} 帧`)),'','人工最终评审：待评审。',''].join('\n');
}
export const visualPrompt=directorContextPrompt;
export async function directMain({root=ROOT,runAgent=runToolAgent,runMain=null,compile=compileVisualProgram,review=runVisualPreflight}={}) {
  const ROOT=root;
  validateCliOptions(process.argv.slice(2),{values:['--repo','--selection','--request','--resume-run','--task-response'],booleans:['--dry-run']});
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
  validateProductionMaterials(plan,{root:ROOT,resourcesDirectory:resources});
  const audioPath=join(production,'narration.wav'),timingPath=join(production,'timing.json'),audioBytes=readFileSync(audioPath),timing=json(timingPath),audioStoryboard=json(layout.storyboardPath);
  const audio=normalizeTiming(timing,audioStoryboard.meta.fps);
  if(Math.abs(wavDuration(audioBytes)-audio.totalFrames/audio.fps)>1/audio.fps)throw new Error('Measured timing differs from the narration WAV.');
  if(audioStoryboard.meta.researchCommit!==research.project.versionOrCommit||audioStoryboard.meta.editorialContractDigest!==contract.digest||audioStoryboard.meta.contentDigest!==plan.contentDigest)throw new Error('Audio provenance is stale. Generate audio from the current research plan.');
  const mode=directorMode(audio.totalFrames,audio.fps);
  const windows=planningCueWindows(plan,timing,audio.fps),materials=audioStoryboard.meta.materials??[];
  if(materials.length!==plan.preproduction.assets.length||materials.some(a=>!plan.preproduction.assets.some(p=>p.id===a.id&&p.sha256===hash(readFileSync(safeResourcePath(production,a.src))))))throw new Error('Staged audio materials differ from the inspected research handoff.');
  const style=libraries.styles.find(s=>s.id===plan.content.styleId);
  const referenceIndex=join(ROOT,'docs/production-reference-index.json');
  const prompt=directorContextPrompt({contractBody:trustedContractPrompt(contract,{stage:'director'}).body+'\n'+directorSkillBody(ROOT,mode)+'\n'+contentSkillReference(ROOT,plan.preproduction.contentRoute),plan,style,references:referenceIndex,planPath:join(resources,'editorial-plan.json'),statePath:join(resources,'director-state.json'),searchCommand:`node ${join(ROOT,'apps/video-factory/src/library-cli.mjs')} search --repo ${fullName} --query "画面需要"`,fullName});
  writeFileSync(join(resources,'director-agent-prompt.txt'),prompt);
  if(process.argv.includes('--dry-run'))return console.log(JSON.stringify({promptCharacters:prompt.length,plannedExpressions:windows,mode,initialImplementation:mode==='short'?'whole-film':'director-and-shot-agents',materialInput:'local-plan-links',references:'on-demand'}));
  const runInputs={mode,editorialContractDigest:contract.digest,contentDigest:plan.contentDigest,preproductionDigest:plan.preproductionDigest,audioSha256:hash(audioBytes),timingSha256:hash(readFileSync(timingPath)),libraryDigest:libraries.digest};
  const mainDirectory=join(resources,'_runs/main-agent/director'),active=activeAgentTask(mainDirectory);
  const preflightDirectory=join(resources,'_runs/main-agent/visual-preflight'),suppliedResponse=arg('--task-response');
  const suppliedTaskId=suppliedResponse?json(suppliedResponse).taskId:null;
  const pendingPreflightTask=activeAgentTask(preflightDirectory);
  let mainResponsePath=pendingPreflightTask&&pendingPreflightTask.taskId===suppliedTaskId?null:suppliedResponse;
  let visualResponsePath=suppliedResponse;
  const retainedRun=arg('--resume-run')??(active&&JSON.stringify(active.binding)===JSON.stringify(runInputs)?active.context.runDirectory:null);
  const resumed=retainedRun?loadDirectorRun(resources,resolve(retainedRun),runInputs):null;
  const runDirectory=resumed?.directory??join(resources,'shots/runs',new Date().toISOString().replace(/[:.]/gu,'-'));mkdirSync(runDirectory,{recursive:true});atomic(join(runDirectory,'inputs.json'),runInputs);
  let sessionId=resumed?.sessionId,visual,wholeLayout=resumed?.layout,implementations=resumed?.implementations??{},joins=resumed?.joins??[],sharedSource=resumed?.sharedSource??'',pendingRepairKind=resumed?.pendingRepairKind??null,repairSequence=resumed?.repairSequence??0;
  const statePath=join(resources,'director-state.json'),planPath=join(resources,'editorial-plan.json');
  const persist=()=>{
    const digest=wholeLayout?layoutDigest(wholeLayout):null;
    atomic(statePath,{...realizationState(wholeLayout,implementations),mode,joins,sharedDigest:hash(sharedSource)});
    if(wholeLayout){plan.layout=wholeLayout;plan.layoutDigest=digest;plan.visual=null;plan.phase='visual-layout';atomic(planPath,plan);}
    atomic(join(runDirectory,'director-session.json'),{mode,sessionId,layout:wholeLayout,layoutDigest:digest,implementations,joins,sharedSource,sharedDigest:hash(sharedSource),pendingRepairKind,repairSequence});
  };
  const agent=(task,options)=>runAgent(task,{workingDirectory:ROOT,...options});
  const main=(task,options)=>runMain?runMain(task,{workingDirectory:ROOT,...options}):requestAgentTask(task,{directory:mainDirectory,kind:options.kind,binding:runInputs,context:{runDirectory,...(options.taskSequence!==undefined?{taskSequence:options.taskSequence}:{})},schemaPath:options.schemaPath,images:options.images,responsePath:mainResponsePath});
  persist(); // A pending initial task also has resumable host state.
  const pendingRepair=active&&active.context.runDirectory===runDirectory&&active.kind===pendingRepairKind?active:null;
  const repairResponse=pendingRepair?await main(readFileSync(pendingRepair.promptPath,'utf8'),{kind:pendingRepair.kind,taskSequence:pendingRepair.context.taskSequence,images:pendingRepair.evidence.map(e=>e.file)}):null;
  const assign=()=>prepareSegmentAssignments({layout:wholeLayout,plan,runDirectory,audio,style,materials,production,sharedSource,joins});
  const makeVisual=()=>{visual={...visualFromLayout(wholeLayout,plan,implementations),sharedSources:{'shared.jsx':sharedSource}};};
  const implementLong=async()=>{
    implementations=await implementLongSegments({entries:assign(),joins,sharedSource,runInputs,libraries,retained:implementations,runAgent:agent,
      childContract:trustedContractPrompt(contract,{stage:'shot'}).body,childSkill:directorSkillBody(ROOT,'child')+'\n'+contentSkillReference(ROOT,plan.preproduction.contentRoute),previewScript:join(ROOT,'apps/video-factory/src/shot-preview.mjs'),
      onComplete:(id,r)=>{implementations[id]=r;persist();}});
    persist();makeVisual();
  };
  const schemaPath=join(runDirectory,'authoring.schema.json');atomic(schemaPath,authoringSchema(mode));
  atomic(join(runDirectory,'layout.schema.json'),visualLayoutSchema());
  const inputPath=join(runDirectory,'authoring-input.json');
  atomic(inputPath,{mode,planPath,timingPath,audioPath,styleLink:plan.preproduction.style,
    totalFrames:audio.totalFrames,fps:audio.fps,semanticBlocks:audio.semanticBlocks,windows,clips:audio.clips,runDirectory,
    runtime:{props:['frame','durationInFrames','fps','style','accent','assets','scene','beat'],localImports:['./motion-library.jsx','./shot-runtime.jsx','./shared.jsx','./prepared-materials.jsx']}});
  writeFileSync(join(runDirectory,'prepared-materials.jsx'),preparedMaterialBridge(plan));
  if(arg('--request')) {
    const supplied=json(resolve(arg('--request')));validateVisualLayout(plan,timing,audio.fps,supplied.layout,libraries);validateJoins(supplied.layout,supplied.joins);
    const request=stageAuthoringRequest(supplied,{resourcesDirectory:resources,runDirectory});wholeLayout=request.layout;joins=request.joins;
    validateVisualLayout(plan,timing,audio.fps,wholeLayout,libraries);sharedSource=readSharedModule(runDirectory,request.sharedSourceFile);
    implementations=collectImplementations({entries:assign(),records:request.shots,runInputs,libraries,sharedSource});persist();makeVisual();
  } else if(!wholeLayout) {
    const task=prompt+'\nRead authoring inputs at '+inputPath+'. Write shared.jsx in '+runDirectory+' for common object identities, reusable visuals and continuity. Frame-driven browser JSX only. '+
      'Select actual cuts freely; scenes use global frames and beats use scene-relative frames, both contiguously cover their parent. Keep every planShotIds purpose, exact retained narrationCue, prepared material and the selected style. Define joins for every segment with concrete incoming and outgoing states. '+
      (mode==='short'?'In this ONE task write ALL initial shot source files at '+runDirectory+'/BEAT_ID/shot.jsx and the whole layout. Each source has a default React export and segment-relative frame props. Import shared.jsx and prepared-materials.jsx locally; the host stages these modules and library bridges beside every shot before compilation. Return {layout,sharedSourceFile,joins,shots:[{id,sourceFile,libraryIds,summary}]}. Do not request separate per-shot implementation turns.':'Write the whole layout and shared module only; independent shot agents will implement the segments. Return {layout,sharedSourceFile,joins}.');
    let authoringTask=task,authored=false;
    for(let attempt=0;attempt<3;attempt++) {
      const answer=await main(authoringTask,{kind:'initial-authoring',outputPath:join(runDirectory,'initial-authoring-'+attempt+'.json'),schemaPath,sessionId,sandbox:'workspace-write'});sessionId=answer.sessionId;
      atomic(join(runDirectory,'initial-response.json'),answer.value);
      try {
        wholeLayout=answer.value.layout;validateVisualLayout(plan,timing,audio.fps,wholeLayout,libraries);joins=validateJoins(wholeLayout,answer.value.joins);
        sharedSource=readSharedModule(runDirectory,answer.value.sharedSourceFile);
        if(mode==='short')implementations=collectImplementations({entries:assign(),records:answer.value.shots,runInputs,libraries,sharedSource});
        persist();authored=true;break;
      }catch(e){writeFileSync(join(runDirectory,'authoring-error-'+attempt+'.txt'),e.message);if(answer.taskPath)rejectAgentTask(answer,e.message);if(attempt===2)throw e;
        authoringTask='Repair the retained whole-film authoring response at '+join(runDirectory,'initial-response.json')+': '+e.message+'. Inputs: '+inputPath+'. Return the same complete authoring schema and preserve narration, style and materials; short mode must include ALL code records, not a per-shot task. Correct only necessary files.';
      }
    }
    if(!authored)throw new Error('Whole-film authoring did not complete.');
    if(mode==='short')makeVisual();else await implementLong();
  } else {
    validateVisualLayout(plan,timing,audio.fps,wholeLayout,libraries);validateJoins(wholeLayout,joins);
    if(readSharedModule(runDirectory,join(runDirectory,'shared.jsx'))!==sharedSource)throw new Error('Retained shared module changed; request an explicit repair.');
    if(repairResponse){ /* Apply below before checking changed source hashes. */ }
    else if(mode==='long')await implementLong();
    else {
      const entries=assign();
      for(const e of entries){const r=implementations[e.shot.id];
        if(!r||r.sourceDigest!==hash(readFileSync(e.sourceFile))||r.taskDigest!==taskDigest({shot:e.shot,previous:e.previous,next:e.next,join:e.join,sharedDigest:hash(sharedSource)},runInputs))throw new Error('Retained short-film source or context changed; start a fresh realization.');
      }persist();makeVisual();
    }
  }
  const applyRepairs=async value=>{
    if(value.layout){validateVisualLayout(plan,timing,audio.fps,value.layout,libraries);wholeLayout=value.layout;}
    joins=validateJoins(wholeLayout,value.joins??joins);
    sharedSource=readSharedModule(runDirectory,join(runDirectory,'shared.jsx'));
    persist(); // Preserve validated new layout/joins/shared code before any child retry can fail.
    const entries=assign();
    for(const r of value.shots??[]) {
      const e=entries.find(e=>e.shot.id===r.id);if(!e)throw new Error('Repair refers to unknown segment.');
      implementations[r.id]={...realizeVisualBeat(e.shot,{...r,sourceFile:e.sourceFile},readFileSync(e.sourceFile,'utf8'),libraries),
        taskDigest:taskDigest({shot:e.shot,previous:e.previous,next:e.next,join:e.join,sharedDigest:hash(sharedSource)},runInputs)};
    }
    if(mode==='long')await implementLong();
    else {
      for(const e of entries){const r=implementations[e.shot.id];
        if(!r||r.taskDigest!==taskDigest({shot:e.shot,previous:e.previous,next:e.next,join:e.join,sharedDigest:hash(sharedSource)},runInputs)||r.sourceDigest!==hash(readFileSync(e.sourceFile)))throw new Error('Short-film repair must include every changed or newly arranged segment: '+e.shot.id);
      }
      implementations=Object.fromEntries(entries.map(e=>[e.shot.id,implementations[e.shot.id]]));persist();makeVisual();
    }
    pendingRepairKind=null;persist();
  };
  if(repairResponse){try{await applyRepairs(repairResponse.value);}catch(error){if(repairResponse.taskPath)rejectAgentTask(repairResponse,error.message);throw error;}}
  let built,compilation,preflight,finalPlan;
  for(let attempt=0;attempt<4;attempt++) {
    try {
      if(prepareDirectorMaterialChanges(plan,visual,{root:ROOT,resourcesDirectory:resources})) {
        runInputs.preproductionDigest=plan.preproductionDigest;atomic(join(runDirectory,'inputs.json'),runInputs);
        for(const e of assign()){const r=implementations[e.shot.id];if(r)r.taskDigest=taskDigest({shot:e.shot,previous:e.previous,next:e.next,join:e.join,sharedDigest:hash(sharedSource)},runInputs);}
        persist();makeVisual();
      }
      validatePlannedRealization(plan,timing,audio.fps,visual,libraries);
      validateProductionMaterials(plan,{root:ROOT,resourcesDirectory:resources});
      const compiled=compileTimeline({audioStoryboard,timing,visual,research,libraries,contentDigest:plan.contentDigest});
      // Carry the design context through to the reviewer, including joins between neighboring shots.
      compiled.preparedMaterials=plan.preproduction.customMaterials;
      compiled.materialSources=[...plan.preproduction.components,...plan.preproduction.customMaterials];
      compiled.storyboard.meta.directorJoins=joins;
      compiled.storyboard.meta.designContext=plan.preproduction.designContext;
      compiled.storyboard.meta.contentRoute=structuredClone(plan.preproduction.contentRoute);
      if(plan.preproduction.contentRoute.skill===SHARING_TYPE)compiled.storyboard.meta.sharing=structuredClone(plan.preproduction.sharing);
      else delete compiled.storyboard.meta.sharing;
      compiled.storyboard.meta.directorLayoutDigest=layoutDigest(wholeLayout);
      finalPlan={...plan,phase:'visual-ready',visual,audio:{sha256:hash(audioBytes),timingSha256:hash(readFileSync(timingPath)),totalFrames:audio.totalFrames,fps:audio.fps,precision:audio.precision},libraryDigest:libraries.digest};
      compiled.storyboard.meta.editorialPlanDigest=hash(JSON.stringify(finalPlan));
      built=buildCreativeProgram(compiled,{resourcesDirectory:resources,remotionGuidance:{provider:'installed-codex-remotion-plugin',loading:'on-demand',referenceIndex}});
      compilation=compile(built.storyboard,resources);
      const preflightConfig=json(join(ROOT,'config/video-editorial.json')).qa?.visualPreflight??{};
      const completedDirectorTask=activeAgentTask(mainDirectory);
      // The completed authoring/repair response is consumed by direction, not by the next preflight task.
      const preflightResponse=visualResponsePath&&completedDirectorTask?.status==='completed'&&suppliedTaskId===completedDirectorTask.taskId?null:visualResponsePath;
      preflight=await review({storyboard:built.storyboard,resourcesDirectory:resources,evidenceFps:preflightConfig.evidenceFps??3,pagesPerReview:preflightConfig.pagesPerReview??8,responsePath:preflightResponse,mainTaskDirectory:preflightDirectory});
      mainResponsePath=null;visualResponsePath=null; // A consumed visual response is transient and cannot feed a repair or later review.
      atomic(join(runDirectory,`visual-${attempt}.json`),visual);
      if(preflight.status==='passed')break;
      if(attempt===3||arg('--request'))throw new Error('Visual preflight needs repair: '+preflight.reportPath);
      const manifest=json(preflight.manifestPath),images=manifest.pages.filter(p=>preflight.issues.some(issue=>issue.severity!=='minor'&&issue.evidence.includes(p.id))).map(p=>p.file);
      const repair=`Actual visual preflight found these blocking/major issues: ${JSON.stringify(preflight.issues.filter(i=>i.severity!=='minor'))}. Read images at full size. Repair affected shot.jsx files in ${runDirectory}, preserving narration, claims, audio, cue timing and style. Resolve continuity at joins. If segment arrangement causes the issue, optionally return a complete revised layout using the schema at ${join(runDirectory,'layout.schema.json')}; unchanged implementations are reused only if their task and source hashes match. If you change layout IDs, return updated joins for every segment. Short-film repair must provide all changed/new segments in this one repair task; there are no automatic per-shot turns. Shared code is at ${join(runDirectory,'shared.jsx')}. Return JSON {layout?: complete layout, joins?:[{id,incoming,outgoing}], shots:[{id,libraryIds:[actual used IDs],summary:"actual implementation"}]}.`;
      pendingRepairKind='visual-repair';repairSequence++;persist();
      const result=await main(repair,{kind:'visual-repair',taskSequence:repairSequence,outputPath:join(runDirectory,`repair-${attempt}.json`),sessionId,images,sandbox:'workspace-write'});sessionId=result.sessionId;
      await applyRepairs(result.value);
    }catch(e) {
      if(e.agentTaskStatus==='pending')throw e;
      writeFileSync(join(runDirectory,`error-${attempt}.txt`),e.message);
      if(attempt===3||arg('--request')||e.visualPreflightStatus==='error'||e.toolAgentStatus==='error')throw e;
      pendingRepairKind='technical-repair';repairSequence++;persist();
      const result=await main(`Technical compile repair: ${e.message}. Repair shot.jsx files within ${runDirectory}, or optionally provide a complete revised layout using ${join(runDirectory,'layout.schema.json')}. Keep narration, claims, style and audio unchanged. If layout IDs change return updated joins. Shared code is at ${join(runDirectory,'shared.jsx')}; short-film repair includes all changed/new segments in one task. Return JSON {layout?: complete layout, joins?:[{id,incoming,outgoing}], shots:[{id,libraryIds:[actual used IDs],summary:"actual implementation"}]}.`,{kind:'technical-repair',taskSequence:repairSequence,outputPath:join(runDirectory,`technical-repair-${attempt}.json`),sessionId,sandbox:'workspace-write'});sessionId=result.sessionId;
      await applyRepairs(result.value);
    }
  }
  if(preflight?.status!=='passed')throw new Error('Visual preflight did not pass. Retained diagnostics: '+runDirectory);
  if(hash(readFileSync(audioPath))!==runInputs.audioSha256||hash(readFileSync(timingPath))!==runInputs.timingSha256)throw new Error('Audio or timing changed during visual direction.');
  built.storyboard.meta.visualPreflight={status:'passed',reportPath:preflight.reportPath};
  atomic(join(resources,'editorial-plan.json'),finalPlan);atomic(layout.storyboardPath,built.storyboard);writeFileSync(join(resources,'editorial-plan.md'),readablePlan(finalPlan));
  const report={schemaVersion:3,fullName,workflow:'scoped-plan-audio-visual-director',status:'ready-for-render',mode,sessionId,executor:'main-agent',
    audioSha256:hash(audioBytes),promptCharacters:prompt.length,referenceLoading:'on-demand',compilation,visualPreflight:{status:preflight.status,reportPath:preflight.reportPath},humanReview:'pending'};
  atomic(statePath,{...realizationState(wholeLayout,implementations),mode,joins,sharedDigest:hash(sharedSource),phase:'visual-ready',visualPreflight:{status:preflight.status,reportPath:preflight.reportPath}});
  atomic(join(resources,'visual-program-report.json'),report);atomic(join(production,'qa-report.json'),report);console.log(JSON.stringify(report));
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url))directMain().catch(e=>{if(!reportAgentTask(e)){console.error(e.message);process.exitCode=1;}});
