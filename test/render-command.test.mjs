import assert from 'node:assert/strict';
import test from 'node:test';
import * as command from '../apps/video-factory/src/render-command.mjs';

test('Remotion serves the same public directory used to stage local audio and images', () => {
  assert.equal(typeof command.buildRenderArgs, 'function');
  const args = command.buildRenderArgs({entry: 'entry.jsx', output: 'movie.mp4', props: 'props.json', publicRoot: 'D:/project/apps/video-factory/public'});
  assert.ok(args.includes('--public-dir=D:/project/apps/video-factory/public'));
  assert.ok(args.includes('--props=props.json'));
  assert.deepEqual(args.slice(0, 4), ['render', 'entry.jsx', 'KnowledgeShare', 'movie.mp4']);
});
