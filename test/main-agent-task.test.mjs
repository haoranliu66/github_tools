import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,writeFileSync,readFileSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {requestAgentTask,activeAgentTask,rejectAgentTask,completeDelegatedTask} from '../apps/video-factory/src/main-agent-task.mjs';
function fixture(t){const directory=mkdtempSync(join(tmpdir(),'main-handoff-'));t.after(()=>rmSync(directory,{recursive:true,force:true}));return directory;}
async function pending(prompt,options){let task;await assert.rejects(requestAgentTask(prompt,options),error=>{task=error.task;return error.agentTaskStatus==='pending';});return task;}
test('main task is explicit, bound to files and replayable without a model call',async t=>{
  const directory=fixture(t),image=join(directory,'image.png');writeFileSync(image,'actual evidence');
  const options={directory,kind:'research-material-view',binding:{style:'paper',plan:'one'},images:[image]};
  const task=await pending('View the linked image.',options),response=join(directory,'answer.json');
  assert.equal(task.owner,'main-agent');assert.equal(task.evidence.length,1);
  writeFileSync(response,JSON.stringify({taskId:task.taskId,value:{observed:true}}));
  const result=await requestAgentTask('View the linked image.',{...options,responsePath:response});assert.equal(result.value.observed,true);
  assert.equal((await requestAgentTask('View the linked image.',options)).taskId,task.taskId);
  await assert.rejects(requestAgentTask('View the linked image.',{...options,binding:{style:'other'},responsePath:response}),/another or stale/);
  writeFileSync(image,'changed evidence');const changed=await pending('View the linked image.',options);assert.notEqual(changed.taskId,task.taskId);
});
test('invalid deliveries reopen the same task with concrete validation feedback',async t=>{
  const directory=fixture(t),options={directory,kind:'initial-authoring',binding:{audio:'measured'}};
  const task=await pending('Generate all short-film sources.',options),response=join(directory,'answer.json');writeFileSync(response,JSON.stringify({taskId:task.taskId,value:{}}));
  const result=await requestAgentTask('Generate all short-film sources.',{...options,responsePath:response});
  assert.throws(()=>rejectAgentTask(result,'Source is missing.'),error=>error.agentTaskStatus==='pending');
  assert.equal(activeAgentTask(directory).validationError,'Source is missing.');
  await pending('Generate all short-film sources.',options);
  writeFileSync(response,JSON.stringify({taskId:task.taskId,value:{source:'corrected'}}));
  assert.equal((await requestAgentTask('Generate all short-film sources.',{...options,responsePath:response})).value.source,'corrected');
});
test('an audio task names the delegated owner and cannot silently run synthesis',async t=>{
  const directory=fixture(t),task=await pending('Read audio Skill and execute prepared command.',{directory,kind:'narration',binding:{plan:'same'},owner:'audio-subagent'});
  assert.equal(task.owner,'audio-subagent');assert.equal(task.status,'pending');assert.ok(readFileSync(task.promptPath,'utf8').includes('audio Skill'));
});
test('delegated audio completion records actual file identity and reopens if output changes',async t=>{
  const directory=fixture(t),binding={plan:'same'},options={directory,kind:'narration',binding,owner:'audio-subagent'};
  const task=await pending('Synthesize this prepared narration.',options),wave=join(directory,'narration.wav');writeFileSync(wave,'measured test wave');
  completeDelegatedTask(directory,{plan:'other'},[wave]);assert.equal(activeAgentTask(directory).status,'pending');
  completeDelegatedTask(directory,binding,[wave]);assert.equal(activeAgentTask(directory).status,'completed');assert.equal(activeAgentTask(directory).verifiedOutputs.length,1);
  assert.equal((await requestAgentTask('Synthesize this prepared narration.',options)).value.status,'audio-ready');
  writeFileSync(wave,'changed output');const reopened=await pending('Synthesize this prepared narration.',options);assert.equal(reopened.taskId,task.taskId);
});
