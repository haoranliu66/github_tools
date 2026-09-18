import assert from 'node:assert/strict';
import test from 'node:test';
import * as timing from '../apps/video-factory/src/narration.mjs';

const draft = {meta: {title: 'Demo', fps: 30}, scenes: [
  {type: 'title', sentences: [{text: '第一句'}, {text: '第二句'}]},
  {type: 'outro', sentences: [{text: '再见'}]},
]};

test('narration timing rounds up to frames and prevents scene/caption drift', () => {
  assert.equal(typeof timing.buildNarratedStoryboard, 'function');
  const result = timing.buildNarratedStoryboard(draft, [1, 1.01, 2], {gapSeconds: 0.2});
  assert.deepEqual(result.clips.map(c => c.frames), [36, 37, 66]);
  assert.deepEqual(result.clips.map(c => c.startFrame), [0, 36, 73]);
  assert.equal(result.storyboard.scenes[0].duration, 73 / 30);
  assert.deepEqual(result.storyboard.scenes[0].captions, [
    {startFrame: 0, endFrame: 30, text: '第一句'},
    {startFrame: 36, endFrame: 67, text: '第二句'},
  ]);
  assert.equal(result.totalFrames, 139);
  assert.equal(result.storyboard.scenes[1].captions[0].startFrame, 0);
  assert.equal(draft.scenes[0].captions, undefined);
});

test('invalid or missing narration duration fails instead of generating a silent video', () => {
  assert.equal(typeof timing.buildNarratedStoryboard, 'function');
  for (const durations of [[1], [1, 0, 2], [1, NaN, 2], [1, -1, 2]]) {
    assert.throws(() => timing.buildNarratedStoryboard(draft, durations));
  }
});

test('SRT timestamps use absolute clip positions across scene boundaries', () => {
  assert.equal(typeof timing.toSrt, 'function');
  assert.equal(timing.toSrt([{startFrame: 73, spokenFrames: 60, text: '再见'}], 30),
    '1\n00:00:02,433 --> 00:00:04,433\n再见\n');
});

test('editorial timing can pad a short scene without stretching its caption', () => {
  const draft = {meta: {fps: 30}, scenes: [{sentences: [{text: 'Short'}]}]};
  const result = timing.buildNarratedStoryboard(draft, [1], {gapSeconds: 0.2, minSceneSeconds: 4});
  assert.equal(result.storyboard.scenes[0].duration, 4);
  assert.equal(result.storyboard.scenes[0].captions[0].endFrame, 30);
  assert.equal(result.clips[0].frames, 120);
  assert.equal(result.totalFrames, 120);
});

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
