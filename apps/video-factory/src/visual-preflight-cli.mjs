#!/usr/bin/env node
import {readFileSync} from 'node:fs';
import {dirname,resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {prepareVisualPreflight,runVisualPreflight} from './visual-preflight.mjs';
import {reportAgentTask} from './main-agent-task.mjs';
const option=name=>{const index=process.argv.indexOf(name);return index<0?null:process.argv[index+1];};
export async function main() {
  const path=option('--storyboard');if(!path)throw new Error('Use --storyboard PATH and --resources DIRECTORY.');
  const storyboard=JSON.parse(readFileSync(resolve(path),'utf8'));
  const resourcesDirectory=resolve(option('--resources')??dirname(dirname(resolve(path))));
  const options={storyboard,resourcesDirectory,videoPath:option('--video'),directory:option('--output')?resolve(option('--output')):null,responsePath:option('--task-response')};
  if(process.argv.includes('--prepare-only')){const prepared=prepareVisualPreflight(options);console.log(JSON.stringify({status:'pending',reportPath:prepared.reportPath,preview:prepared.preview}));return prepared;}
  const result=await runVisualPreflight(options);
  console.log(JSON.stringify({status:result.status,reportPath:result.reportPath,issues:result.issues}));
  if(result.status!=='passed')process.exitCode=1;
  return result;
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url))main().catch(error=>{if(reportAgentTask(error)){process.exitCode=0;return;}console.error(error.message);process.exitCode=1;});
