import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import test from 'node:test';
import {buildNarrationBlocks,fitNarrationBlocks,joinNarrationSegments} from '../apps/video-factory/src/narration-blocks.mjs';
const config=JSON.parse(readFileSync(new URL('../config/video-editorial.json',import.meta.url),'utf8'));
const segment=(sceneIndex,text)=>({sceneIndex,sentenceIndex:0,text,sentenceEnd:true,topic:'same'});
function block(id,segments){return {id,semanticBlockId:id,segments,text:joinNarrationSegments(segments),sceneIndexes:[...new Set(segments.map(s=>s.sceneIndex))]};}

test('each planned semantic unit stays independent even when topics match',()=>{
  const draft={scenes:['解释问题。','说明机制。','展示结果。'].map((text,index)=>({id:'unit-'+index,narrationTopic:'same',sentences:[{text}]}))};
  const blocks=buildNarrationBlocks(draft,config);
  assert.equal(blocks.length,3);
  assert.deepEqual(blocks.map(b=>b.semanticBlockId),['unit-0','unit-1','unit-2']);
  assert.equal(blocks.map(b=>b.text).join(''),draft.scenes.flatMap(s=>s.sentences).map(s=>s.text).join(''));
  assert.ok(blocks.every(b=>!('profile' in b)));
  assert.equal(config.durationSeconds,undefined);
  assert.equal(config.narrationBlocks.profiles,undefined);
  assert.equal(config.narrationBlocks.maxAudioSeconds,undefined);
});

test('both very short and long audio preserve semantic boundaries without retries or merges',async()=>{
  const planned=[block('short',[segment(0,'短句。')]),block('long',[segment(1,'完整长段落。')])];
  const calls=[];
  const result=await fitNarrationBlocks(planned,async b=>{calls.push(b.text);return {wave:Buffer.from('wave'),duration:b.id==='short'?0.1:180};});
  assert.equal(calls.length,2);
  assert.equal(result.stats.splitCount,0);
  assert.deepEqual(result.blocks.map(b=>b.duration),[0.1,180]);
  assert.deepEqual(result.blocks.map(b=>b.semanticBlockId),['short','long']);
});

test('service character splits preserve complete text and the same semantic identity',async()=>{
  const original=block('mechanism',[segment(0,'甲'.repeat(599)+'。'),segment(0,'乙'.repeat(599)+'。')]);
  const requests=[];
  const result=await fitNarrationBlocks([original],async b=>{requests.push(b.text);return {wave:Buffer.from('wave'),duration:90};});
  assert.equal(result.stats.splitCount,1);
  assert.ok(requests.every(text=>text.length<=1000));
  assert.equal(result.blocks.map(b=>b.text).join(''),original.text);
  assert.ok(result.blocks.every(b=>b.semanticBlockId==='mechanism'&&b.splitReason==='request-character-limit'));
});

test('request timeout splits at complete sentences while keeping semantic identity',async()=>{
  const original=block('operation',[segment(0,'先执行操作。'),segment(0,'再查看结果。')]);
  let calls=0;
  const result=await fitNarrationBlocks([original],async()=>{
    if(calls++===0){const error=new Error('timeout');error.name='TimeoutError';throw error;}
    return {wave:Buffer.from('wave'),duration:70};
  });
  assert.equal(result.stats.timeoutSplitCount,1);
  assert.equal(result.blocks.map(b=>b.text).join(''),original.text);
  assert.ok(result.blocks.every(b=>b.semanticBlockId==='operation'));
});

test('oversized text without a complete sentence boundary fails without dropping text',async()=>{
  const original=block('unbroken',[segment(0,'甲'.repeat(1001))]);
  await assert.rejects(fitNarrationBlocks([original],async()=>assert.fail('must not send an oversized request')),/without a complete-sentence split point/);
});

test('duplicate semantic units are rejected before synthesis',()=>{
  assert.throws(()=>buildNarrationBlocks({scenes:[0,1].map(()=>({id:'same',sentences:[{text:'完整句子。'}]}))},config),/IDs must be unique/);
});
