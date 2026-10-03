#!/usr/bin/env node
import {spawnSync} from 'node:child_process';
import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import {join,resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {validateCliOptions} from '../../shared/cli-options.mjs';
import {loadSelection} from '../../trend-scout/src/selection.mjs';
import {projectLayoutFromSelection} from '../../shared/pipeline-paths.mjs';
import {loadEditorialPlan,loadVideoEditingSkill} from './editorial-agent.mjs';
import {loadEditorialContract,trustedContractPrompt} from '../../repo-researcher/src/editorial-contract.mjs';
import {freshResearchMain} from '../../repo-researcher/src/fact-cli.mjs';
import {directMain} from './director-cli.mjs';
import {requestAgentTask,reportAgentTask,activeAgentTask,completeDelegatedTask} from './main-agent-task.mjs';
import {wavDuration} from './narration.mjs';
import {hash,normalizeTiming} from './creative-plan.mjs';
const ROOT=resolve(import.meta.dirname,'../../..');
const option=name=>{const i=process.argv.indexOf(name);return i<0?null:process.argv[i+1];};
function run(root,path,args){const r=spawnSync(process.execPath,['--use-env-proxy','--env-file-if-exists=.env.local',join(root,path),...args],{cwd:root,stdio:'inherit',windowsHide:true});if(r.error||r.status!==0)throw new Error('Production stage failed: '+path+'. '+(r.error?.message??'See retained diagnostics.'));}
async function withArgs(args,fn){const old=process.argv;process.argv=[old[0],old[1],...args];try{return await fn();}finally{process.argv=old;}}
export function validAudio(layout,plan,contract){
  try{
    const directory=layout.productionDirectory,storyboard=JSON.parse(readFileSync(layout.storyboardPath,'utf8')),timing=normalizeTiming(JSON.parse(readFileSync(join(directory,'timing.json'),'utf8')),storyboard.meta.fps);
    const research=JSON.parse(readFileSync(join(layout.resourcesDirectory,'research.json'),'utf8'));
    const audioTask=activeAgentTask(join(layout.resourcesDirectory,'_runs/main-agent/audio'));
    if(audioTask?.status==='completed'&&audioTask.binding.contentDigest===plan.contentDigest&&audioTask.verifiedOutputs?.some(item=>hash(readFileSync(item.file))!==item.sha256))return false;
    if(storyboard.meta.contentDigest!==plan.contentDigest||storyboard.meta.editorialContractDigest!==contract.digest||storyboard.meta.researchCommit!==research.project.versionOrCommit||Math.abs(wavDuration(readFileSync(join(directory,'narration.wav')))-timing.totalFrames/timing.fps)>1/timing.fps)return false;
    return true;
  }catch{return false;}
}
export async function produceMain({root=ROOT,planStage=freshResearchMain,directStage=directMain,requestTask=requestAgentTask,runHost=run}={}){
  validateCliOptions(process.argv.slice(2),{values:['--repo','--selection','--style','--content-skill','--form'],booleans:['--reuse-audio']});
  const selection=option('--selection'),repo=option('--repo');if(!selection||!repo)throw new Error('Usage: video:produce --selection PATH --repo owner/name [--style STYLE_ID] [--content-skill NAME] [--form NAME]');
  const {selection:approved}=loadSelection(selection,{requireApproved:true});if(!approved.videoProjects.includes(repo))throw new Error('Video project must be human-approved.');
  const layout=projectLayoutFromSelection(root,approved,repo),contract=loadEditorialContract(root),stageArgs=['--selection',selection,'--repo',repo];
  let plan;
  try{plan=loadEditorialPlan({resourcesDirectory:layout.resourcesDirectory,fullName:repo,researchText:readFileSync(join(layout.resourcesDirectory,'research.json'),'utf8'),contract,editingSkill:loadVideoEditingSkill(root)}).plan;}catch{
    const extras=['--style','--content-skill','--form'].flatMap(flag=>option(flag)?[flag,option(flag)]:[]);
    await withArgs([...stageArgs,...extras],()=>planStage({root}));
    plan=loadEditorialPlan({resourcesDirectory:layout.resourcesDirectory,fullName:repo,researchText:readFileSync(join(layout.resourcesDirectory,'research.json'),'utf8'),contract,editingSkill:loadVideoEditingSkill(root)}).plan;
  }
  for(const [flag,current] of [['--style',plan.content.styleId],['--content-skill',plan.preproduction.contentRoute.skill],['--form',plan.preproduction.contentRoute.form]])if(option(flag)&&option(flag)!==current)throw new Error('Requested '+flag+' differs from the prepared plan; start video:plan --fresh with the selected style and content route.');
  if(!validAudio(layout,plan,contract)){
    if(process.argv.includes('--reuse-audio'))throw new Error('Requested audio reuse lacks valid measured audio for the current plan.');
    const directory=join(layout.resourcesDirectory,'_runs/main-agent/audio');mkdirSync(directory,{recursive:true});
    const command={executable:process.execPath,args:[join(root,'apps/video-factory/src/prepare-cli.mjs'),...stageArgs],workingDirectory:root};
    const inputPath=join(directory,'input.json');writeFileSync(inputPath,JSON.stringify(command,null,2)+'\n');
    const prompt=trustedContractPrompt(contract,{stage:'audio'}).body+'\nAudio subagent: read '+join(root,'.agents/skills/audio-narration-preflight/SKILL.md')+' and its qwen-tts.md, then execute the exact host command at '+inputPath+'. Read the prepared plan '+join(layout.resourcesDirectory,'editorial-plan.json')+'. Keep narration, voice and weighted timing algorithms; return {status:"audio-ready",reportPath:"absolute production/qa-report.json"}. The main Agent checks actual outputs after this task. Do not implement visuals.';
    await requestTask(prompt,{directory,owner:'audio-subagent',kind:'narration',binding:{planDigest:hash(JSON.stringify(plan)),contentDigest:plan.contentDigest,contractDigest:contract.digest},context:{inputPath,planPath:join(layout.resourcesDirectory,'editorial-plan.json')}});
    if(!validAudio(layout,plan,contract))throw new Error('Audio subagent response has no valid measured output.');
  }
  completeDelegatedTask(join(layout.resourcesDirectory,'_runs/main-agent/audio'),{planDigest:hash(JSON.stringify(plan)),contentDigest:plan.contentDigest,contractDigest:contract.digest},[join(layout.productionDirectory,'narration.wav'),join(layout.productionDirectory,'timing.json')]);
  await withArgs(stageArgs,()=>directStage({root}));
  runHost(root,'apps/trend-scout/src/cli.mjs',['finalize',...stageArgs.slice(0,2)]);
  runHost(root,'apps/video-factory/src/cli.mjs',['render','--final-ranking','apps/repo-researcher/final_rank/'+approved.weekId+'/final-ranking.json','--repo',repo]);
  console.log('ready-for-human-review');
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url))produceMain().catch(error=>{if(!reportAgentTask(error)){console.error(error.message);process.exitCode=1;}});
