import {readFileSync,existsSync} from 'node:fs';
import {resolve,sep,join} from 'node:path';
export function loadDirectorRun(resourcesDirectory,directory,inputs) {
  const base=resolve(resourcesDirectory,'shots/runs'),run=resolve(directory);
  if(!run.startsWith(base+sep))throw new Error('Director resume must use this project\'s retained run.');
  if(!existsSync(join(run,'inputs.json')))throw new Error('Director run lacks retained input identity.');
  const original=JSON.parse(readFileSync(join(run,'inputs.json'),'utf8'));
  if(JSON.stringify(original)!==JSON.stringify(inputs))throw new Error('Director resume inputs changed; start a fresh realization.');
  const state=JSON.parse(readFileSync(join(run,'director-session.json'),'utf8'));
  if(!state.sessionId||!Array.isArray(state.completed))throw new Error('Incomplete persistent director state.');
  return {directory:run,...state};
}
