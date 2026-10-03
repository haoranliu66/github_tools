import test from 'node:test';
import assert from 'node:assert/strict';
import {captionAtFrame} from '../apps/video-factory/remotion/caption-display.mjs';

test('an isolated closing quote holds the preceding sentence without changing measured cues',()=>{
  const cues=[{startFrame:800,endFrame:838,text:'“这周午休只有二十分钟。'},
    {startFrame:838,endFrame:845,text:'”'},{startFrame:845,endFrame:880,text:'第一步，保存。'}];
  const original=structuredClone(cues);
  assert.equal(captionAtFrame(cues,837).text,cues[0].text);
  assert.deepEqual(captionAtFrame(cues,838),{...cues[1],text:'“这周午休只有二十分钟。”'});
  assert.equal(captionAtFrame(cues,844).text,'“这周午休只有二十分钟。”');
  assert.equal(captionAtFrame(cues,845),cues[2]);
  assert.equal(captionAtFrame(cues,880),null);
  assert.deepEqual(cues,original);
  assert.equal(captionAtFrame([{startFrame:0,endFrame:3,text:'”'}],1).text,'”');
  assert.equal(captionAtFrame([{startFrame:0,endFrame:2,text:'先前的句子'},
    {startFrame:4,endFrame:5,text:'”'}],4).text,'”');
});
