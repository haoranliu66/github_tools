import assert from 'node:assert/strict';
import {mkdirSync, mkdtempSync, rmSync, writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import test from 'node:test';
import {resolveApprovedStoryboard} from '../apps/video-factory/src/approval.mjs';

test('video factory resolves only a researched and explicitly approved final-ranking project', (t) => {
  const root = mkdtempSync(join(tmpdir(), 'zimeiti-video-approval-'));
  t.after(() => rmSync(root, {recursive: true, force: true}));
  const projectPath = join(root, 'output', 'videos', '2026年09月第3周-fixture--approved');
  const storyboardPath = join(projectPath, 'resources', 'production', 'storyboard.json');
  mkdirSync(join(projectPath, 'resources', 'production'), {recursive: true});
  writeFileSync(storyboardPath, '{}');
  const rankingPath = join(root, 'final.json');
  writeFileSync(rankingPath, JSON.stringify({rows: [
    {
      fullName: 'fixture/approved', researchStatus: 'completed', finalScore: 88,
      videoApproved: true,
      projectPath: 'output/videos/2026年09月第3周-fixture--approved',
      storyboardPath: 'output/videos/2026年09月第3周-fixture--approved/resources/production/storyboard.json',
      videoPath: 'output/videos/2026年09月第3周-fixture--approved/final.mp4',
    },
    {
      fullName: 'fixture/not-approved', researchStatus: 'completed', finalScore: 90,
      videoApproved: false,
      projectPath: 'output/videos/2026年09月第3周-fixture--approved',
      storyboardPath: 'output/videos/2026年09月第3周-fixture--approved/resources/production/storyboard.json',
      videoPath: 'output/videos/2026年09月第3周-fixture--approved/final.mp4',
    },
  ]}));

  const approved = resolveApprovedStoryboard({
    projectRoot: root, finalRankingPath: rankingPath, fullName: 'fixture/approved',
  });
  assert.equal(approved.storyboardPath, storyboardPath);
  assert.equal(approved.videoPath, join(projectPath, 'final.mp4'));
  assert.throws(() => resolveApprovedStoryboard({
    projectRoot: root, finalRankingPath: rankingPath, fullName: 'fixture/not-approved',
  }), /not approved/);
  assert.throws(() => resolveApprovedStoryboard({
    projectRoot: root, finalRankingPath: rankingPath, fullName: 'fixture/missing',
  }), /absent/);
});
