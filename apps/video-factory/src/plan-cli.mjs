#!/usr/bin/env node
// Planning belongs to scoped research. The director does not rewrite a completed story.
import {freshResearchMain} from '../../repo-researcher/src/fact-cli.mjs';
import {reportAgentTask} from './main-agent-task.mjs';
freshResearchMain().catch(e=>{if(!reportAgentTask(e)){console.error(e.message);process.exitCode=1;}});
