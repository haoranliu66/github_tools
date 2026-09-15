import assert from 'node:assert/strict';
import {mkdirSync, mkdtempSync, rmSync, writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import test from 'node:test';
import {resolveApprovedStoryboard} from '../apps/video-factory/src/approval.mjs';

test('video factory resolves only a researched and explicitly approved final-ranking project', (t) => {
  const root = mkdtempSync(join(tmpdir(), 'zimeiti-video-approval-'));
  t.after(() => rmSync(root, {recursive: true, force: true}));
  const storyboardPath = join(root, 'output', 'research', 'storyboard.json');
  mkdirSync(join(root, 'output', 'research'), {recursive: true});
  writeFileSync(storyboardPath, '{}');
  const rankingPath = join(root, 'final.json');
  writeFileSync(rankingPath, JSON.stringify({rows: [
    {
      fullName: 'fixture/approved', researchStatus: 'completed', finalScore: 88,
      videoApproved: true, storyboardPath: 'output/research/storyboard.json',
    },
    {
      fullName: 'fixture/not-approved', researchStatus: 'completed', finalScore: 90,
      videoApproved: false, storyboardPath: 'output/research/storyboard.json',
    },
  ]}));

  const approved = resolveApprovedStoryboard({
    projectRoot: root, finalRankingPath: rankingPath, fullName: 'fixture/approved',
  });
  assert.equal(approved.storyboardPath, storyboardPath);
  assert.throws(() => resolveApprovedStoryboard({
    projectRoot: root, finalRankingPath: rankingPath, fullName: 'fixture/not-approved',
  }), /not approved/);
  assert.throws(() => resolveApprovedStoryboard({
    projectRoot: root, finalRankingPath: rankingPath, fullName: 'fixture/missing',
  }), /absent/);
});

