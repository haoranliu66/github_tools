import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {cpSync, mkdirSync, mkdtempSync, rmSync, writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {fileURLToPath} from 'node:url';
import test from 'node:test';
import {loadEditorialContract} from '../apps/repo-researcher/src/editorial-contract.mjs';
import {resolveApprovedStoryboard} from '../apps/video-factory/src/approval.mjs';
import {completedResearchFixture} from './helpers/completed-research.mjs';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));

test('video factory resolves only a researched and explicitly approved final-ranking project', (t) => {
  const root = mkdtempSync(join(tmpdir(), 'zimeiti-video-approval-'));
  t.after(() => rmSync(root, {recursive: true, force: true}));
  const skillTarget = join(root, '.agents', 'skills', 'video-production-quality');
  mkdirSync(join(root, '.agents', 'skills'), {recursive: true});
  cpSync(join(projectRoot, '.agents', 'skills', 'video-production-quality'), skillTarget, {recursive: true});
  const editorialContract = loadEditorialContract(root);
  const projectPath = join(root, 'output', 'videos', '2026年09月第3周-fixture--approved');
  const storyboardPath = join(projectPath, 'resources', 'production', 'storyboard.json');
  mkdirSync(join(projectPath, 'resources', 'production'), {recursive: true});
  const research = completedResearchFixture({contract: editorialContract});
  const researchPath = join(projectPath, 'resources', 'research.json');
  writeFileSync(researchPath, JSON.stringify(research));
  const serializedStoryboard = JSON.stringify({meta: {
    editorialContractDigest: research.editorialContract.digest,
    researchCommit: research.project.versionOrCommit,
  }});
  writeFileSync(storyboardPath, serializedStoryboard);
  const storyboardDigest = createHash('sha256').update(serializedStoryboard).digest('hex');
  const rankingPath = join(root, 'final.json');
  writeFileSync(rankingPath, JSON.stringify({rows: [
    {
      fullName: 'fixture/approved', researchStatus: 'completed', finalScore: 88,
      videoApproved: true,
      projectPath: 'output/videos/2026年09月第3周-fixture--approved',
      researchPath: 'output/videos/2026年09月第3周-fixture--approved/resources',
      storyboardPath: 'output/videos/2026年09月第3周-fixture--approved/resources/production/storyboard.json',
      videoPath: 'output/videos/2026年09月第3周-fixture--approved/final.mp4',
      editorialContractDigest: research.editorialContract.digest,
      researchCommit: research.project.versionOrCommit,
      storyboardDigest,
    },
    {
      fullName: 'fixture/not-approved', researchStatus: 'completed', finalScore: 90,
      videoApproved: false,
      projectPath: 'output/videos/2026年09月第3周-fixture--approved',
      researchPath: 'output/videos/2026年09月第3周-fixture--approved/resources',
      storyboardPath: 'output/videos/2026年09月第3周-fixture--approved/resources/production/storyboard.json',
      videoPath: 'output/videos/2026年09月第3周-fixture--approved/final.mp4',
      editorialContractDigest: research.editorialContract.digest,
      researchCommit: research.project.versionOrCommit,
      storyboardDigest,
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

  writeFileSync(storyboardPath, `${serializedStoryboard}\n`);
  assert.throws(() => resolveApprovedStoryboard({
    projectRoot: root, finalRankingPath: rankingPath, fullName: 'fixture/approved',
  }), /changed after final ranking/i);
});
