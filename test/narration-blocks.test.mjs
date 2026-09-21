import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import test from 'node:test';
import {
  buildNarrationBlocks,
  fitNarrationBlocks,
  joinNarrationSegments,
} from '../apps/video-factory/src/narration-blocks.mjs';

const config = {
  narrationBlocks: {
    defaultProfile: 'code-analysis',
    maxRequestCharacters: 1000,
    maxAudioSeconds: 64,
    profiles: {
      'code-analysis': {
        minScenes: 2, targetScenes: 3, maxScenes: 5, shortBlockSeconds: 8, topicChange: 'hard',
      },
    },
  },
};

const editorialConfig = JSON.parse(readFileSync(
  new URL('../config/video-editorial.json', import.meta.url), 'utf8'));

function segment(sceneIndex, text, topic = 'same') {
  return {sceneIndex, sentenceIndex: 0, text, sentenceEnd: true, topic};
}

test('block planning groups scenes by project cadence without losing text', () => {
  const draft = {
    meta: {narrationProfile: 'code-analysis'},
    scenes: Array.from({length: 8}, (_, index) => ({
      narrationTopic: index < 4 ? 'mechanism' : 'boundary',
      sentences: [{text: `第${index + 1}个完整句子。`, sentenceEnd: true}],
    })),
  };
  const blocks = buildNarrationBlocks(draft, config);
  assert.deepEqual(blocks.map((block) => block.sceneCount), [4, 4]);
  assert.ok(blocks.every((block) => block.sceneCount >= 2 && block.sceneCount <= 6));
  assert.equal(blocks.map((block) => block.text).join(''),
    draft.scenes.flatMap((scene) => scene.sentences).map((item) => item.text).join(''));
});

test('concept explainers keep ordinary narration blocks to two or three scenes', () => {
  const draft = {
    meta: {narrationProfile: 'concept-explainer'},
    scenes: Array.from({length: 6}, (_, index) => ({
      narrationTopic: `topic-${Math.floor(index / 2)}`,
      sentences: [{text: `第${index + 1}个连续句子。`, sentenceEnd: true}],
    })),
  };
  const blocks = buildNarrationBlocks(draft, editorialConfig);
  assert.deepEqual(blocks.map((block) => block.sceneCount), [3, 3]);
  assert.ok(blocks.every((block) => block.sceneCount >= 2 && block.sceneCount <= 3));
});

test('concept explainer rebalances a seven-scene tail instead of leaving one scene alone', () => {
  const draft = {
    meta: {narrationProfile: 'concept-explainer'},
    scenes: Array.from({length: 7}, (_, index) => ({
      narrationTopic: `topic-${index}`,
      sentences: [{text: `第${index + 1}个连续句子。`, sentenceEnd: true}],
    })),
  };
  const blocks = buildNarrationBlocks(draft, editorialConfig);
  assert.deepEqual(blocks.map((block) => block.sceneCount), [3, 2, 2]);
  assert.equal(blocks.map((block) => block.text).join(''),
    draft.scenes.flatMap((scene) => scene.sentences).map((item) => item.text).join(''));
});

test('measured overlong audio is split at a complete sentence without truncation', async () => {
  const original = {
    id: 'block-000', profile: 'code-analysis', primaryTopic: 'same', topics: ['same'],
    segments: [
      segment(0, '第一句保持完整。'), segment(1, '第二句保持完整。'),
      segment(2, '第三句保持完整。'), segment(3, '第四句保持完整。'),
    ],
  };
  original.text = joinNarrationSegments(original.segments);
  original.sceneIndexes = [0, 1, 2, 3];
  original.sceneCount = 4;
  const fitted = await fitNarrationBlocks([original], async (block) => ({
    wave: Buffer.from('wave'),
    duration: block.sceneCount > 2 ? 70 : 24,
  }), {maxSeconds: 64, shortBlockSeconds: 0});
  assert.equal(fitted.blocks.length, 2);
  assert.equal(fitted.stats.splitCount, 1);
  assert.equal(fitted.blocks.map((block) => block.text).join(''), original.text);
  assert.ok(fitted.blocks.every((block) => block.duration <= 64));
});

test('request timeout splits complete sentences and a short same-topic pair can merge', async () => {
  const makeBlock = (id, sceneIndex, text) => ({
    id, profile: 'code-analysis', primaryTopic: 'same', topics: ['same'],
    segments: [segment(sceneIndex, text)], text, sceneIndexes: [sceneIndex], sceneCount: 1,
  });
  const left = makeBlock('left', 0, '第一句。');
  const right = makeBlock('right', 1, '第二句。');
  const merged = await fitNarrationBlocks([left, right], async (block) => ({
    wave: Buffer.from('wave'), duration: block.sceneCount === 1 ? 3 : 7,
  }), {shortBlockSeconds: 8});
  assert.equal(merged.blocks.length, 1);
  assert.equal(merged.stats.mergeCount, 1);
  assert.equal(merged.blocks[0].text, '第一句。第二句。');

  let timedOut = false;
  const timeoutBlock = {
    ...merged.blocks[0],
    segments: [segment(0, '第一句。'), segment(1, '第二句。')],
    text: '第一句。第二句。', sceneIndexes: [0, 1], sceneCount: 2,
  };
  const split = await fitNarrationBlocks([timeoutBlock], async (block) => {
    if (!timedOut && block.sceneCount === 2) {
      timedOut = true;
      const error = new Error('request timed out');
      error.name = 'TimeoutError';
      throw error;
    }
    return {wave: Buffer.from('wave'), duration: 5};
  }, {shortBlockSeconds: 0});
  assert.equal(split.stats.timeoutSplitCount, 1);
  assert.equal(split.blocks.map((block) => block.text).join(''), timeoutBlock.text);
});

test('the 1000-character service limit splits requests instead of dropping text', async () => {
  const segments = Array.from({length: 4}, (_, index) => segment(index, `${'甲'.repeat(299)}。`));
  const original = {
    id: 'long', profile: 'code-analysis', primaryTopic: 'same', topics: ['same'], segments,
    text: joinNarrationSegments(segments), sceneIndexes: [0, 1, 2, 3], sceneCount: 4,
  };
  const requests = [];
  const fitted = await fitNarrationBlocks([original], async (block) => {
    requests.push(block.text.length);
    return {wave: Buffer.from('wave'), duration: 30};
  }, {maxCharacters: 1000, shortBlockSeconds: 0});
  assert.ok(requests.every((length) => length <= 1000));
  assert.equal(fitted.blocks.map((block) => block.text).join(''), original.text);
});
