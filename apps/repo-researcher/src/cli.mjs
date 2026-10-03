#!/usr/bin/env node
import {resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {reportAgentTask} from '../../video-factory/src/main-agent-task.mjs';
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const {freshResearchMain}=await import('./fact-cli.mjs');
    await freshResearchMain();
  } catch (error) {
    if(!reportAgentTask(error)){console.error(error.message);process.exitCode=1;}
  }
}
