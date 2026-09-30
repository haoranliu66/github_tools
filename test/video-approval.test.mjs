import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {cpSync, mkdirSync, mkdtempSync, rmSync, writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {fileURLToPath} from 'node:url';
import test from 'node:test';
import {loadEditorialContract} from '../apps/repo-researcher/src/editorial-contract.mjs';
import {resolveApprovedStoryboard} from '../apps/video-factory/src/approval.mjs';
import {loadVideoEditingSkill, makeEditorialPlan, sha256} from '../apps/video-factory/src/editorial-agent.mjs';
import {completedResearchFixture, editorialDraftFixture} from './helpers/completed-research.mjs';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));

test('video factory resolves only a researched and explicitly approved final-ranking project', (t) => {
  const root = mkdtempSync(join(tmpdir(), 'zimeiti-video-approval-'));
  t.after(() => rmSync(root, {recursive: true, force: true}));
  const skillTarget = join(root, '.agents', 'skills', 'video-production-quality');
  mkdirSync(join(root, '.agents', 'skills'), {recursive: true});
  cpSync(join(projectRoot, '.agents', 'skills', 'video-production-quality'), skillTarget, {recursive: true});
  const editorialContract = loadEditorialContract(root);
  const editingSkill = loadVideoEditingSkill(projectRoot);
  const projectPath = join(root, 'output', 'videos', '2026年09月第3周-fixture--approved');
  const storyboardPath = join(projectPath, 'resources', 'production', 'storyboard.json');
  mkdirSync(join(projectPath, 'resources', 'production'), {recursive: true});
  const research = completedResearchFixture({contract: editorialContract});
  const researchPath = join(projectPath, 'resources', 'research.json');
  const researchText = JSON.stringify(research);
  writeFileSync(researchPath, researchText);
  const plan = makeEditorialPlan({
    fullName: 'fixture/approved', researchText, contract: editorialContract,
    editingSkill, draft: editorialDraftFixture(research),
  });
  writeFileSync(join(projectPath, 'resources', 'editorial-plan.json'), JSON.stringify(plan));
  const editorialPlanDigest = sha256(JSON.stringify(plan));
  const serializedStoryboard = JSON.stringify({meta: {
    editorialContractDigest: research.editorialContract.digest,
    researchCommit: research.project.versionOrCommit,
    editorialPlanDigest,
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
      editorialPlanDigest,
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
      editorialPlanDigest,
      storyboardDigest,
    },
  ]}));

  const approved = resolveApprovedStoryboard({
    projectRoot: root, finalRankingPath: rankingPath, fullName: 'fixture/approved', editingSkill,
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
    projectRoot: root, finalRankingPath: rankingPath, fullName: 'fixture/approved', editingSkill,
  }), /changed after final ranking/i);
});
