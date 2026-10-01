import assert from 'node:assert/strict';
import test from 'node:test';
import * as timing from '../apps/video-factory/src/narration.mjs';

test('WAV duration is measured from PCM bytes rather than estimated narration length', () => {
  assert.equal(typeof timing.wavDuration, 'function');
  const wave = Buffer.alloc(44 + 32000);
  wave.write('RIFF', 0); wave.writeUInt32LE(wave.length - 8, 4); wave.write('WAVE', 8);
  wave.write('fmt ', 12); wave.writeUInt32LE(16, 16); wave.writeUInt16LE(1, 20);
  wave.writeUInt16LE(1, 22); wave.writeUInt32LE(16000, 24); wave.writeUInt32LE(32000, 28);
  wave.writeUInt16LE(2, 32); wave.writeUInt16LE(16, 34);
  wave.write('data', 36); wave.writeUInt32LE(32000, 40);
  assert.equal(timing.wavDuration(wave), 1);
  assert.throws(() => timing.wavDuration(Buffer.from('not audio')));
  assert.throws(() => timing.wavDuration(wave.subarray(0, 50)));
});

test('one measured narration block can drive several visual scenes', () => {
  assert.equal(typeof timing.buildNarratedStoryboardFromBlocks, 'function');
  const blockDraft = {
    meta: {fps: 10},
    scenes: [
      {type: 'text', sentences: [{text: '第一句。'}]},
      {type: 'text', sentences: [{text: '第二句。'}]},
      {type: 'outro', sentences: [{text: '第三句。'}]},
    ],
  };
  const segments = blockDraft.scenes.map((scene, sceneIndex) => ({
    sceneIndex, sentenceIndex: 0, text: scene.sentences[0].text,
  }));
  const result = timing.buildNarratedStoryboardFromBlocks(blockDraft, [{
    id: 'block-000', profile: 'concept-explainer', segments, duration: 9,
    text: '第一句。第二句。第三句。', sceneIndexes: [0, 1, 2], topics: ['overview'],
  }], {gapSeconds: 0.2});
  assert.equal(result.audioClips.length, 1);
  assert.equal(result.clips.length, 3);
  assert.equal(result.storyboard.narrationBlocks[0].sceneIndexes.length, 3);
  assert.equal(result.storyboard.meta.narrationAlignment, 'measured-block-weighted-cues');
  assert.equal(result.totalFrames, 92);
  assert.equal(result.storyboard.scenes.reduce((sum, scene) => sum + scene.duration, 0), 9.2);
  assert.ok(result.storyboard.scenes.every((scene) => scene.captions.length === 1));
});


test('measured timing rejects missing durations and invalid scene order',()=>{
 const draft={meta:{fps:30},scenes:[{},{}]};
 for(const blocks of [[],[{segments:[{sceneIndex:0,text:'句子'}],duration:0}], [{duration:2,text:'句子',segments:[{sceneIndex:1,text:'第二句'},{sceneIndex:0,text:'第一句'}]}]])assert.throws(()=>timing.buildNarratedStoryboardFromBlocks(draft,blocks));
});
test('SRT timestamps use absolute cue positions',()=>{
 assert.equal(timing.toSrt([{startFrame:73,spokenFrames:60,text:'再见'}],30),'1\n00:00:02,433 --> 00:00:04,433\n再见\n');
});
