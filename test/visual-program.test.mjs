import assert from 'node:assert/strict';
import test from 'node:test';
import {mkdirSync,mkdtempSync,readFileSync,rmSync,writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {chooseShot,buildVisualProgram,composeShot,productionIdentity,verifyVisualProgram,validateChoreography,validateCustomSource} from '../apps/video-factory/src/visual-program.mjs';
import {cameraTranslation,sampleKeys,objectPose} from '../apps/video-factory/remotion/motion-math.mjs';
import {shotRequestsFromAgent} from '../apps/video-factory/src/shot-agent.mjs';
const beat={id:'memory',role:'change',truthMode:'source-derived-animation',claimIndexes:[0],narrationCue:'保存信息',
  startFrame:0,endFrame:100,stage:{objects:[{id:'chat',kind:'window',label:'聊天',detail:'喜欢徒步',x:.2,y:.4},
    {id:'bank',kind:'folder',label:'记忆',x:.75,y:.4}],links:[{from:'chat',to:'bank'}],action:{type:'gather',targets:['chat','bank']}}};
const scene={type:'flow',duration:100/30,visualBeats:[beat]};
const episode={meta:{fps:30,repo:'fixture/example'},scenes:[scene]};

test('semantic eligibility reuses a flow but composes persistence beyond the template capabilities',()=>{
  assert.equal(chooseShot({beat,scene}).route,'composition');
  const flow={...beat,stage:null,canvas:{nodes:[{id:'a',kind:'input',label:'输入'},{id:'b',kind:'result',label:'结果'}],edges:[{from:'a',to:'b'}],focusId:'b'}};
  assert.equal(chooseShot({beat:flow,scene}).templateId,'directed-flow');
  assert.throws(()=>chooseShot({beat,scene,request:{requiredActions:['deform-3d-mesh']}}),/No implementation/);
  assert.equal(chooseShot({beat,scene,request:{requiredActions:['deform-3d-mesh'],source:'export default ()=>null'}}).route,'custom');
});

test('gather visibly moves the object and transfers information instead of only changing a label',()=>{
  const spec=composeShot(beat,scene); const chat=spec.objects.find(o=>o.id==='chat');
  const early=objectPose(chat,spec.tracks,20); const late=objectPose(chat,spec.tracks,90);
  assert.ok(late.x>early.x+100);assert.ok(late.scale<early.scale);assert.ok(spec.connections.some(c=>c.packet));
  assert.equal(sampleKeys([{at:0,value:0},{at:30,value:1}],15),.5);
  assert.deepEqual(objectPose(chat,spec.tracks,20),early);
});

test('sources and beat mappings are bound to the approved episode and checked before render',t=>{
  const dir=mkdtempSync(join(tmpdir(),'visual-program-'));t.after(()=>rmSync(dir,{recursive:true,force:true}));
  const built=buildVisualProgram(episode,{resourcesDirectory:dir});
  assert.equal(productionIdentity(built.storyboard),productionIdentity(episode));
  assert.equal(verifyVisualProgram(built.storyboard,dir).program.decisions[0].route,'composition');
  const altered=structuredClone(built.storyboard);altered.scenes[0].duration=7;
  assert.throws(()=>verifyVisualProgram(altered,dir),/stale/);
  const file=join(built.directory,Object.keys(built.program.sourceHashes)[0]);writeFileSync(file,readFileSync(file,'utf8')+'\n// changed');
  assert.throws(()=>verifyVisualProgram(built.storyboard,dir),/source changed/);
});

test('custom code uses allowed frame primitives and rejects side effects or unknown dependencies',()=>{
  assert.doesNotThrow(()=>validateCustomSource("import React from 'react'; export default function Shot({frame}) {return <svg><circle cx={frame}/></svg>}"));
  for(const source of ["import fs from 'node:fs'; export default ()=>null",'export default ()=>fetch("x")','export default ()=>Math.random()'])
    assert.throws(()=>validateCustomSource(source));
});

test('invalid keyframes, references and layout fail; agent must cover every approved beat',()=>{
  const spec=composeShot(beat,scene);spec.tracks[0].keys[1].at=100;
  assert.throws(()=>validateChoreography(spec,100),/keyframes/);
  assert.throws(()=>shotRequestsFromAgent({shots:[]},episode),/every beat/);
  const requests=shotRequestsFromAgent({shots:[{beatId:'memory',requiredActions:['extract'],source:null,choreographyJson:null,reason:'save'}]},episode);
  assert.deepEqual(requests.memory.requiredActions,['extract']);
});

test('narration mutation after planning fails even when captions and paths are unchanged',t=>{
  const dir=mkdtempSync(join(tmpdir(),'visual-audio-'));t.after(()=>rmSync(dir,{recursive:true,force:true}));
  mkdirSync(join(dir,'production'));writeFileSync(join(dir,'production/narration.wav'),'approved audio');
  const input={...episode,voiceover:'narration.wav'};
  const built=buildVisualProgram(input,{resourcesDirectory:dir});verifyVisualProgram(built.storyboard,dir);
  writeFileSync(join(dir,'production/narration.wav'),'changed audio');
  assert.throws(()=>verifyVisualProgram(built.storyboard,dir),/narration changed/);
});

test('camera target centers preserve the scene instead of moving it outside the viewport',()=>{
  assert.deepEqual(cameraTranslation({x:800,y:340,scale:1,at:0}),{x:0,y:0,scale:1});
  assert.deepEqual(cameraTranslation({x:10,y:-4,scale:1.03,at:0}),{x:10,y:-4,scale:1.03,at:0});
  assert.equal(cameraTranslation({x:400,y:340,scale:1.1,mode:'target'}).x.toFixed(1),'40.0');
});
