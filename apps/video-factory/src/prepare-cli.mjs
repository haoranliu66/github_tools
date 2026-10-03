#!/usr/bin/env node
import {spawnSync} from 'node:child_process';
import {existsSync,mkdirSync,mkdtempSync,readFileSync,renameSync,rmSync,writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {dirname,join,resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {latestResearch} from '../../trend-scout/src/final-report.mjs';
import {validateCliOptions} from '../../shared/cli-options.mjs';
import {loadSelection} from '../../trend-scout/src/selection.mjs';
import {projectLayoutFromSelection} from '../../shared/pipeline-paths.mjs';
import {validateProductionMaterials} from './production-materials.mjs';
import {validatePlannedAssets} from './production-package.mjs';
import {makeAudioDraft} from './creative-plan.mjs';
import {loadEditorialPlan,loadVideoEditingSkill} from './editorial-agent.mjs';
import {loadEditorialContract} from '../../repo-researcher/src/editorial-contract.mjs';
import {loadStoryboard} from './storyboard.mjs';
const ROOT=resolve(import.meta.dirname,'../../..');
const arg=name=>{const i=process.argv.indexOf(name);return i<0?null:process.argv[i+1];};
export function replaceProductionDirectory(stagingDirectory,productionDirectory){
  const staging=resolve(stagingDirectory),production=resolve(productionDirectory);
  if(staging===production||dirname(staging)!==dirname(production))throw new Error('Production staging and destination must be distinct sibling directories.');
  if(!existsSync(staging))throw new Error('Production staging directory is missing: '+staging);
  const backup=production+'.replace-'+process.pid+'-'+Date.now(),hadPrevious=existsSync(production);
  if(hadPrevious)renameSync(production,backup);
  try{renameSync(staging,production);}catch(error){if(hadPrevious&&!existsSync(production)&&existsSync(backup))renameSync(backup,production);throw error;}
  if(existsSync(backup))rmSync(backup,{recursive:true,force:true});
}
export function prepareMain(){
  validateCliOptions(process.argv.slice(2),{values:['--repo','--selection']});
  const selectionPath=arg('--selection'),fullName=arg('--repo');if(!selectionPath||!fullName)throw new Error('Usage: video:prepare --selection PATH --repo owner/name');
  const {selection}=loadSelection(selectionPath,{requireApproved:true});
  if(!selection.selectedRepositories.includes(fullName)||!selection.videoProjects.includes(fullName))throw new Error('Project must be approved for research and video.');
  const layout=projectLayoutFromSelection(ROOT,selection,fullName),contract=loadEditorialContract(ROOT),research=latestResearch(ROOT,fullName,selection,{editorialContract:contract});
  if(research?.status!=='completed')throw new Error('Complete current research planning is required.');
  const loaded=loadEditorialPlan({resourcesDirectory:layout.resourcesDirectory,fullName,researchText:readFileSync(join(layout.resourcesDirectory,'research.json'),'utf8'),contract,editingSkill:loadVideoEditingSkill(ROOT)});
  validateProductionMaterials(loaded.plan,{root:ROOT,resourcesDirectory:layout.resourcesDirectory});
  const materials=validatePlannedAssets(loaded.plan,layout.resourcesDirectory).map(a=>({...a,src:a.src}));
  const draft=makeAudioDraft(loaded.plan,loaded.research,materials);draft.meta.editorialPlanDigest=loaded.digest;
  const temporary=mkdtempSync(join(tmpdir(),'zimeiti-current-audio-')),staging=join(layout.resourcesDirectory,'.production-staging-'+process.pid+'-'+Date.now());
  const draftPath=join(temporary,'episode.json');writeFileSync(draftPath,JSON.stringify(draft,null,2));
  try{
    const result=spawnSync(process.execPath,[join(ROOT,'scripts/prepare-episode.mjs'),draftPath,staging],{cwd:ROOT,stdio:'inherit',windowsHide:true});
    if(result.error||result.status!==0)throw new Error('Narration preparation failed: '+(result.error?.message??result.status));
    const {storyboard}=loadStoryboard(join(staging,'storyboard.json'));
    const report={schemaVersion:3,status:'audio-ready',repository:fullName,editorialPlanPath:loaded.path,editorialPlanDigest:loaded.digest,storyboardPath:layout.storyboardPath,measuredDurationSeconds:storyboard.scenes.reduce((n,s)=>n+s.duration,0),visualPreflight:'pending'};
    writeFileSync(join(staging,'qa-report.json'),JSON.stringify(report,null,2)+'\n');replaceProductionDirectory(staging,dirname(layout.storyboardPath));
    console.log(JSON.stringify(report));
  }finally{rmSync(temporary,{recursive:true,force:true});if(existsSync(staging))rmSync(staging,{recursive:true,force:true});}
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url))try{prepareMain();}catch(error){console.error(error.message);process.exitCode=1;}
