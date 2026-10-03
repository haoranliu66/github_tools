import {readFileSync,existsSync} from 'node:fs';
import {resolve,sep,join} from 'node:path';
import {hash} from './creative-plan.mjs';
import {validateJoins} from './director-modes.mjs';
import {layoutDigest} from './director-layout.mjs';
export function loadDirectorRun(resourcesDirectory,directory,inputs) {
  const base=resolve(resourcesDirectory,'shots/runs'),run=resolve(directory);
  if(!run.startsWith(base+sep))throw new Error('Director resume must use this project\'s retained run.');
  if(!existsSync(join(run,'inputs.json')))throw new Error('Director run lacks retained input identity.');
  const original=JSON.parse(readFileSync(join(run,'inputs.json'),'utf8'));
  if(JSON.stringify(original)!==JSON.stringify(inputs))throw new Error('Director resume inputs changed; start a fresh realization.');
  const state=JSON.parse(readFileSync(join(run,'director-session.json'),'utf8'));
  if((state.layout&&state.layoutDigest!==layoutDigest(state.layout))||!state.implementations||Array.isArray(state.implementations))throw new Error('Incomplete current director layout and implementation state.');
  if(!['short','long'].includes(state.mode)||state.mode!==inputs.mode||typeof state.sharedSource!=='string'||state.sharedDigest!==hash(state.sharedSource))throw new Error('Current director mode and shared source state required.');
  if(state.layout)validateJoins(state.layout,state.joins);
  return {directory:run,...state};
}
