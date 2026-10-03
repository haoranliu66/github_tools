import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,mkdirSync,copyFileSync,writeFileSync,rmSync} from 'node:fs';
import {dirname,join} from 'node:path';
import {tmpdir} from 'node:os';
import {produceMain,validAudio} from '../apps/video-factory/src/produce-cli.mjs';
import {writeCurrentProductionFixture,repositoryRoot} from './helpers/current-production-fixture.mjs';
function fixture(t){const root=mkdtempSync(join(tmpdir(),'produce-handoff-'));t.after(()=>rmSync(root,{recursive:true,force:true}));const f=writeCurrentProductionFixture(root,{visual:false});for(const file of ['config/style-library.json','.agents/skills/video-editorial-agent/SKILL.md']){mkdirSync(dirname(join(root,file)),{recursive:true});copyFileSync(join(repositoryRoot,file),join(root,file));}writeFileSync(join(root,'config/motion-library.json'),JSON.stringify({schemaVersion:3,motions:[]}));const selection=join(root,'selection.json');writeFileSync(selection,JSON.stringify({schemaVersion:1,weekId:'2026-W38',snapshotDate:'2026-09-14',status:'approved',sourceReport:'output/2026-09-14.json',selectedRepositories:['fixture/approved',...Array.from({length:6},(_,i)=>'fixture/repo'+i)],videoProjects:['fixture/approved']}));return {...f,root,selection};}
async function invoke(f,options={},extra=[]){const old=process.argv;process.argv=[old[0],'produce','--selection',f.selection,'--repo','fixture/approved',...extra];try{return await produceMain({root:f.root,...options});}finally{process.argv=old;}}
test('producer queues audio for its authorized child and does not proceed to direction or rendering',async t=>{
  const f=fixture(t);rmSync(join(f.layout.productionDirectory,'narration.wav'));
  await assert.rejects(invoke(f,{directStage:()=>{throw Error('Direction must wait.');},runHost:()=>{throw Error('Render must wait.');}}),e=>e.agentTaskStatus==='pending'&&e.task.owner==='audio-subagent'&&e.task.kind==='narration');
});
test('producer reuses valid measured audio and respects a pending main director boundary',async t=>{
  const f=fixture(t);assert.equal(validAudio(f.layout,f.plan,f.contract),true);let directs=0;
  await assert.rejects(invoke(f,{planStage:()=>{throw Error('Valid plan must be reused.');},requestTask:()=>{throw Error('Valid audio must be reused.');},directStage:()=>{directs++;const e=Error('await director');e.agentTaskStatus='pending';throw e;},runHost:()=>{throw Error('Render must wait.');}}),/await director/);assert.equal(directs,1);
  await assert.rejects(invoke(f,{},['--style','dark-cinematic']),/differs from the prepared plan/);
});
