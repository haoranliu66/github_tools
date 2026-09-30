import assert from 'node:assert/strict';
import test from 'node:test';
import {applyVisualOnlyBeatChanges} from '../apps/video-factory/src/revisualize-cli.mjs';

test('visual-only changes preserve narration, captions, and measured scene duration', () => {
  const original = {
    meta: {editorialPlanDigest: 'old', fps: 30},
    voiceover: 'narration.wav',
    scenes: [{duration: 4, captions: [{startFrame: 0, endFrame: 120, text: '原旁白'}],
      visualBeats: [{id: 'hook-moment', visualMode: 'progressive-flow', startFrame: 0}]}],
  };
  const visual = {hookMoment: {canvas: {
    nodes: [{id: 'file', label: '文件', kind: 'input'}], edges: [], focusId: 'file',
  }}, visualBeats: []};
  const changed = applyVisualOnlyBeatChanges(original, visual, 'new');
  assert.equal(changed.scenes[0].visualBeats[0].canvas.focusId, 'file');
  assert.equal(changed.meta.editorialPlanDigest, 'new');
  assert.equal(changed.voiceover, original.voiceover);
  assert.deepEqual(changed.scenes[0].captions, original.scenes[0].captions);
  assert.equal(changed.scenes[0].duration, original.scenes[0].duration);
  assert.equal(original.meta.editorialPlanDigest, 'old');
  assert.equal(original.scenes[0].visualBeats[0].canvas, undefined);
});

test('visual-only revision can replace a generic diagram with an illustrative shot', () => {
  const original = {meta: {editorialPlanDigest: 'old'}, voiceover: 'narration.wav', scenes: [{
    duration: 5, captions: [{startFrame: 0, endFrame: 150, text: '原旁白'}], visualBeats: [{
      id: 'hook-moment', visualMode: 'progressive-flow', canvas: {nodes: [], edges: [], focusId: null},
    }],
  }]};
  const shot = {kind: 'question', title: '哪里变了？', before: '逐个找', action: '集中检查',
    result: '定位变化', focus: 'action', negateBefore: true};
  const visual = {hookMoment: {visualMode: 'illustration', entrance: 'slide-left', shot}, visualBeats: []};
  const changed = applyVisualOnlyBeatChanges(original, visual, 'new');
  assert.equal(changed.scenes[0].visualBeats[0].visualMode, 'illustration');
  assert.deepEqual(changed.scenes[0].visualBeats[0].shot, shot);
  assert.equal(changed.scenes[0].visualBeats[0].canvas, undefined);
  assert.deepEqual(changed.scenes[0].captions, original.scenes[0].captions);
});

test('visual-only revision can replace a card with a persistent object-action stage', () => {
  const original = {meta: {editorialPlanDigest: 'old'}, voiceover: 'narration.wav', scenes: [{
    duration: 5, captions: [{startFrame: 0, endFrame: 150, text: '原旁白'}], visualBeats: [{
      id: 'hook-moment', visualMode: 'illustration', shot: {kind: 'question'}, startFrame: 0,
    }],
  }]};
  const stage = {objects: [{id: 'file', kind: 'file', label: '文件', x: 0.3, y: 0.5, state: 'active'}],
    links: [], action: {type: 'move', targets: ['file']}};
  const changed = applyVisualOnlyBeatChanges(original, {
    hookMoment: {visualMode: 'object-action', stage}, visualBeats: [],
  }, 'new');
  assert.equal(changed.scenes[0].visualBeats[0].visualMode, 'object-action');
  assert.deepEqual(changed.scenes[0].visualBeats[0].stage, stage);
  assert.equal(changed.scenes[0].visualBeats[0].shot, undefined);
  assert.equal(changed.voiceover, original.voiceover);
  assert.deepEqual(changed.scenes[0].captions, original.scenes[0].captions);
});
