#!/usr/bin/env node
import {spawnSync} from 'node:child_process';
import {readFileSync} from 'node:fs';
import {join,resolve} from 'node:path';
import {validateCliOptions} from '../../shared/cli-options.mjs';
import {loadSelection} from '../../trend-scout/src/selection.mjs';
import {projectLayoutFromSelection} from '../../shared/pipeline-paths.mjs';
import {loadEditorialPlan,loadVideoEditingSkill} from './editorial-agent.mjs';
import {loadEditorialContract} from '../../repo-researcher/src/editorial-contract.mjs';
import {loadRemotionGuidance} from './remotion-integration.mjs';
const ROOT=resolve(import.meta.dirname,'../../..');
const option=name=>{const i=process.argv.indexOf(name);return i<0?null:process.argv[i+1];};
validateCliOptions(process.argv.slice(2),{values:['--repo','--selection'],booleans:['--reuse-audio']});
const selection=option('--selection'),repo=option('--repo');
if(!selection||!repo) throw new Error('Usage: video:produce --selection PATH --repo owner/name [--reuse-audio]');
const {selection:approved}=loadSelection(selection,{requireApproved:true});
if(!approved.videoProjects.includes(repo)) throw new Error('Video project must be human-approved.');
const run=(path,args=[])=>{const r=spawnSync(process.execPath,['--use-env-proxy','--env-file-if-exists=.env.local',join(ROOT,path),...args],{cwd:ROOT,stdio:'inherit',windowsHide:true});if(r.error||r.status!==0) throw new Error('Production stage failed: '+path+'. '+(r.error?.message??'See retained diagnostics.'));};
try {
  loadRemotionGuidance({stage:'render'});
  if(!process.argv.includes('--reuse-audio')) {
    const layout=projectLayoutFromSelection(ROOT,approved,repo);let needsPlan=false;
    try {const p=loadEditorialPlan({resourcesDirectory:layout.resourcesDirectory,fullName:repo,researchText:readFileSync(join(layout.resourcesDirectory,'research.json'),'utf8'),contract:loadEditorialContract(ROOT),editingSkill:loadVideoEditingSkill(ROOT)});needsPlan=p.plan.workflow!=='scoped-production-package';}catch{needsPlan=true;}
    if(needsPlan) run('apps/video-factory/src/plan-cli.mjs',['--selection',selection,'--repo',repo]);
    run('apps/video-factory/src/prepare-cli.mjs',['--selection',selection,'--repo',repo]);
  }
  run('apps/video-factory/src/director-cli.mjs',['--selection',selection,'--repo',repo]);
  run('apps/trend-scout/src/cli.mjs',['finalize','--selection',selection]);
  run('apps/video-factory/src/cli.mjs',['render','--final-ranking','apps/repo-researcher/final_rank/'+approved.weekId+'/final-ranking.json','--repo',repo]);
  console.log('ready-for-human-review');
}catch(e){console.error(e.message);process.exitCode=1;}
