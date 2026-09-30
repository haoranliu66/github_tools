#!/usr/bin/env node
import {spawnSync} from 'node:child_process';
import {readFileSync} from 'node:fs';
import {join,resolve} from 'node:path';
import {loadSelection} from '../../trend-scout/src/selection.mjs';
import {projectLayoutFromSelection} from '../../shared/pipeline-paths.mjs';
import {loadEditorialPlan,loadVideoEditingSkill} from './editorial-agent.mjs';
import {loadEditorialContract} from '../../repo-researcher/src/editorial-contract.mjs';
import {loadRemotionGuidance} from './remotion-integration.mjs';
const ROOT=resolve(import.meta.dirname,'../../..');
const option=name=>{const i=process.argv.indexOf(name);return i<0?null:process.argv[i+1];};
const selection=option('--selection'), repo=option('--repo');
if(!selection||!repo) throw new Error('Usage: video:produce --selection PATH --repo owner/name [--reuse-audio] [--auto-shots]');
const {selection:approved}=loadSelection(selection,{requireApproved:true});
if(!approved.videoProjects.includes(repo)) throw new Error('Video project must be human-approved.');
const run=(path,args=[])=>{const r=spawnSync(process.execPath,['--use-env-proxy','--env-file-if-exists=.env.local',join(ROOT,path),...args],
  {cwd:ROOT,stdio:'inherit',windowsHide:true});if(r.error||r.status!==0) throw new Error(`Production stage failed: ${path}. ${r.error?.message??'See retained diagnostics; resume this stage.'}`);};
try {
  // Fail before narration preparation if the required plugin snapshot is missing or modified.
  loadRemotionGuidance({stage:'render'});
  if(!process.argv.includes('--reuse-audio')) {
    const layout=projectLayoutFromSelection(ROOT,approved,repo);
    const researchText=readFileSync(join(layout.resourcesDirectory,'research.json'),'utf8');
    let needsPlan=false;
    try {loadEditorialPlan({resourcesDirectory:layout.resourcesDirectory,fullName:repo,researchText,
      contract:loadEditorialContract(ROOT),editingSkill:loadVideoEditingSkill(ROOT)});}catch{needsPlan=true;}
    if(needsPlan) run('apps/video-factory/src/plan-cli.mjs',['--selection',selection,'--repo',repo]);
    run('apps/video-factory/src/prepare-cli.mjs',['--selection',selection,'--repo',repo]);
  }
  run('apps/trend-scout/src/cli.mjs',['finalize','--selection',selection]);
  run('apps/video-factory/src/shots-cli.mjs',['--selection',selection,'--repo',repo,...(process.argv.includes('--auto-shots')?['--auto']:[])]);
  run('apps/trend-scout/src/cli.mjs',['finalize','--selection',selection]);
  run('apps/video-factory/src/cli.mjs',['render','--final-ranking',`apps/repo-researcher/final_rank/${approved.weekId}/final-ranking.json`,'--repo',repo]);
  console.log('ready-for-human-review');
}catch(e){console.error(e.message);process.exitCode=1;}
