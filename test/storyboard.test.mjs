import assert from 'node:assert/strict';
import test from 'node:test';
import {durationInFrames, validateStoryboard} from '../apps/video-factory/src/storyboard.mjs';

const storyboard = {
  meta: {title: 'Test', repo: 'acme/rocket', accent: '#fff', width: 1280, height: 720, fps: 30},
  scenes: [
    {type: 'title', duration: 2, title: 'Hello'},
    {type: 'stat', duration: 3, value: '+100', label: 'Stars'},
  ],
};

test('valid storyboard has a deterministic frame count', () => {
  assert.deepEqual(validateStoryboard(storyboard), []);
  assert.equal(durationInFrames(storyboard), 150);
});

test('media scene requires a source', () => {
  const invalid = structuredClone(storyboard);
  invalid.scenes.push({type: 'media', duration: 2});
  assert.ok(validateStoryboard(invalid).some((error) => error.includes('.src')));
});

test('subtitle cues cannot overlap, exceed a scene, or contain empty text', () => {
  for (const captions of [
    [{startFrame: 0, endFrame: 61, text: 'too long'}],
    [{startFrame: -1, endFrame: 10, text: 'negative'}],
    [{startFrame: 0, endFrame: 10, text: ''}],
    [{startFrame: 0, endFrame: 20, text: 'one'}, {startFrame: 19, endFrame: 40, text: 'two'}],
  ]) {
    const invalid = structuredClone(storyboard);
    invalid.scenes[0].captions = captions;
    assert.ok(validateStoryboard(invalid).some(e => e.includes('captions')));
  }
});
