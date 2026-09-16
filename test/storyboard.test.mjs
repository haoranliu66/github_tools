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

test('dynamic editorial scenes validate their required visual data', () => {
  const valid = structuredClone(storyboard);
  valid.scenes.push(
    {type: 'hero', duration: 2, src: 'hero.png'},
    {type: 'flow', duration: 2, steps: ['Input', 'Check', 'Output']},
    {type: 'contrast', duration: 2, left: {title: 'Format'}, right: {title: 'Truth'}},
    {type: 'audience', duration: 2, items: [{title: 'New hire'}, {title: 'Reviewer'}]},
  );
  assert.deepEqual(validateStoryboard(valid), []);

  for (const scene of [
    {type: 'hero', duration: 2},
    {type: 'flow', duration: 2, steps: ['Only one']},
    {type: 'contrast', duration: 2, left: {title: 'Only left'}},
    {type: 'audience', duration: 2, items: [{title: 'Only one'}]},
  ]) {
    const invalid = structuredClone(storyboard);
    invalid.scenes.push(scene);
    assert.ok(validateStoryboard(invalid).length > 0);
  }
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
