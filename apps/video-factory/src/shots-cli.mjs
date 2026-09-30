#!/usr/bin/env node
import {spawnSync} from 'node:child_process';
import {existsSync,mkdirSync,mkdtempSync,readFileSync,rmSync,writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {dirname,join,resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {loadSelection} from '../../trend-scout/src/selection.mjs';
import {projectLayoutFromSelection} from '../../shared/pipeline-paths.mjs';
import {resolveApprovedStoryboard} from './approval.mjs';
import {runAgent} from './plan-cli.mjs';
import {buildVisualProgram,digest,productionIdentity,writeRenderEntry} from './visual-program.mjs';
import {buildShotAgentPrompt,shotAgentSchema,shotRequestsFromAgent} from './shot-agent.mjs';
const ROOT=resolve(import.meta.dirname,'../../..');
const option=name=>{const i=process.argv.indexOf(name);return i<0?null:process.argv[i+1];};
const load=path=>JSON.parse(readFileSync(path,'utf8'));

export function compileVisualProgram(storyboard,resourcesDirectory) {
  const folder=mkdtempSync(join(ROOT,'apps/video-factory/remotion/.shot-check-'));
  try {
    const entry=writeRenderEntry(storyboard,resourcesDirectory,join(folder,'index.jsx'));
    const props=join(folder,'props.json');writeFileSync(props,JSON.stringify(storyboard));
    const result=spawnSync(process.execPath,[join(ROOT,'node_modules/@remotion/cli/remotion-cli.js'),'compositions',entry,`--props=${props}`,'--log=error'],
      {cwd:ROOT,encoding:'utf8',windowsHide:true,timeout:120_000,maxBuffer:4*1024*1024});
    if(result.error||result.status!==0) throw new Error(`Shot bundle failed: ${result.error?.message??(result.stderr+result.stdout).slice(-4000)}`);
    return {status:'passed',output:result.stdout.trim()};
  } finally {rmSync(folder,{recursive:true,force:true});}
}

export async function main() {
  const selectionPath=option('--selection'), fullName=option('--repo');
  if(!selectionPath||!fullName) throw new Error('Usage: video:shots --selection PATH --repo owner/name [--auto|--requests PATH]');
  const {selection}=loadSelection(selectionPath,{requireApproved:true});
  if(!selection.videoProjects.includes(fullName)) throw new Error('Project is not approved for video production.');
  const layout=projectLayoutFromSelection(ROOT,selection,fullName); const resources=layout.resourcesDirectory;
  resolveApprovedStoryboard({projectRoot:ROOT,finalRankingPath:join(ROOT,'apps/repo-researcher/final_rank',selection.weekId,'final-ranking.json'),fullName});
  const storyboard=load(layout.storyboardPath);
  const sourcePath=join(dirname(layout.storyboardPath),'episode.source.json');
  const source=load(sourcePath); const audioPath=join(dirname(layout.storyboardPath),'narration.wav');
  const audioDigest=digest(readFileSync(audioPath));
  const work=mkdtempSync(join(tmpdir(),'zimeiti-shot-agent-'));
  const logs=join(resources,'shots','runs',new Date().toISOString().replace(/[:.]/g,'-'));mkdirSync(logs,{recursive:true});
  try {
    const schemaPath=join(work,'schema.json');writeFileSync(schemaPath,JSON.stringify(shotAgentSchema()));
    const startedAt=Date.now();
    let built,requests={},compilation,repair='',attemptCount=0;
    const feedbackPath=join(resources,'visual-feedback.md');
    const feedback=existsSync(feedbackPath)?readFileSync(feedbackPath,'utf8'):'';
    for(let attempt=0;attempt<3;attempt++) {
      attemptCount=attempt+1;
      try {
        if(option('--requests')) requests=load(resolve(option('--requests')));
        else if(!process.argv.includes('--auto')) {
          const prompt=buildShotAgentPrompt(storyboard,feedback,repair);
          writeFileSync(join(logs,`prompt-${attempt}.txt`),prompt);
          const output=runAgent(prompt,schemaPath,work);
          writeFileSync(join(logs,`response-${attempt}.json`),JSON.stringify(output,null,2));
          requests=shotRequestsFromAgent(output,storyboard);
        }
        built=buildVisualProgram(storyboard,{resourcesDirectory:resources,requests});
        compilation=compileVisualProgram(built.storyboard,resources); break;
      } catch(error) {
        repair=error.message;writeFileSync(join(logs,`error-${attempt}.txt`),repair);
        if(Object.keys(requests).length) repair+='\nPrevious failed shot requests (data): '+JSON.stringify(requests);
        if(process.argv.includes('--auto')||option('--requests')||attempt===2) throw error;
      }
    }
    if(productionIdentity(built.storyboard)!==productionIdentity(storyboard)||digest(readFileSync(audioPath))!==audioDigest) throw new Error('Visual revision changed the approved episode or audio.');
    // episode.source retains the exact approved content; only prepared shots carry frame-bound implementation refs.
    delete source.meta.visualProgram;
    const report={schemaVersion:1,fullName,programDigest:built.program.programDigest,compilation,audioSha256:audioDigest,
      designMode:process.argv.includes('--auto')?'deterministic':option('--requests')?'supplied-requests':'visual-agent',
      elapsedSeconds:Number(((Date.now()-startedAt)/1000).toFixed(2)),
      attemptCount,
      audioReused:true,counts:Object.fromEntries(['template','composition','custom'].map(r=>[r,built.program.decisions.filter(d=>d.route===r).length])),
      routes:built.program.decisions,status:'ready-for-render',humanReview:'pending',durationFrames:storyboard.scenes.reduce((n,s)=>n+Math.round(s.duration*storyboard.meta.fps),0)};
    writeFileSync(join(resources,'visual-program-report.json'),JSON.stringify(report,null,2)+'\n');
    writeFileSync(layout.storyboardPath,JSON.stringify(built.storyboard,null,2)+'\n');
    writeFileSync(join(resources,'shot-requests.json'),JSON.stringify(requests,null,2)+'\n');
    const qaPath=join(dirname(layout.storyboardPath),'qa-report.json');
    if(existsSync(qaPath)) {
      const qa=load(qaPath);qa.editorialPlanDigest=storyboard.meta.editorialPlanDigest;
      qa.visualProgram={programDigest:report.programDigest,compilation:report.compilation.status,
        reportPath:join(resources,'visual-program-report.json'),humanReview:'pending'};
      writeFileSync(qaPath,JSON.stringify(qa,null,2)+'\n');
    }
    console.log(JSON.stringify({fullName,status:report.status,counts:report.counts,audioReused:true,report:join(resources,'visual-program-report.json')}));
  } finally {rmSync(work,{recursive:true,force:true});}
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url)) main().catch(e=>{console.error(e.message);process.exitCode=1;});
