import assert from 'node:assert/strict';
import {mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {fileURLToPath} from 'node:url';
import test from 'node:test';
import {runResearchBatch} from '../apps/repo-researcher/src/batch.mjs';
import {loadEditorialContract} from '../apps/repo-researcher/src/editorial-contract.mjs';
import {writeFinalRanking} from '../apps/trend-scout/src/final-report.mjs';
import {createSelectionTemplate, validateSelection} from '../apps/trend-scout/src/selection.mjs';
import {projectLayout} from '../apps/shared/pipeline-paths.mjs';
import {completedResearchFixture} from './helpers/completed-research.mjs';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));

function projectFixture(t) {
  const root = mkdtempSync(join(tmpdir(), 'zimeiti-selection-'));
  t.after(() => rmSync(root, {recursive: true, force: true}));
  const reportDirectory = join(root, 'apps', 'trend-scout', 'trend_reports', '2026-W38');
  mkdirSync(reportDirectory, {recursive: true});
  const rows = Array.from({length: 8}, (_, index) => ({
    rank: index + 1,
    weekId: '2026-W38',
    fullName: `fixture/repo-${index + 1}`,
    trendScore: 20 - index,
    eligibleForResearch: true,
    rankingStatus: 'current-discovery',
  }));
  const reportPath = join(reportDirectory, '2026-09-14.json');
  writeFileSync(reportPath, JSON.stringify(rows));
  return {root, rows, reportPath};
}

function writeResearch(root, fullName, score, editorialContract) {
  const directory = projectLayout(root, {snapshotDate: '2026-09-14', fullName}).resourcesDirectory;
  mkdirSync(directory, {recursive: true});
  const research = completedResearchFixture({contract: editorialContract, fullName, score});
  writeFileSync(join(directory, 'research.json'), JSON.stringify(research));
  writeFileSync(join(directory, 'storyboard.json'), JSON.stringify({fixture: true}));
  return research;
}

test('selection requires exactly seven or eight unique repositories', () => {
  const base = {
    schemaVersion: 1,
    weekId: '2026-W38',
    status: 'draft',
    sourceReport: 'apps/trend-scout/trend_reports/2026-W38/2026-09-14.json',
    selectedRepositories: Array.from({length: 7}, (_, index) => `fixture/repo-${index}`),
    videoProjects: [],
  };
  assert.deepEqual(validateSelection(base), []);
  assert.match(validateSelection({...base, selectedRepositories: base.selectedRepositories.slice(0, 6)})[0], /7 or 8/);
  assert.ok(validateSelection({...base, selectedRepositories: [...base.selectedRepositories.slice(0, 6), base.selectedRepositories[0]]})
    .some((error) => /unique/.test(error)));
  assert.ok(validateSelection({...base, videoStoryboards: {'fixture/repo-1': 'storyboard.json'}})
    .some((error) => /obsolete/.test(error)));
  assert.deepEqual(validateSelection({...base, videoProjects: ['fixture/repo-1']}), []);
});

test('draft selection, batch research, and research-backed final ranking preserve human gates', (t) => {
  const {root, reportPath} = projectFixture(t);
  const editorialContract = loadEditorialContract(projectRoot);
  const selectionPath = join(root, 'apps', 'trend-scout', 'trend_reports', '2026-W38', 'selection.json');
  const draft = createSelectionTemplate({projectRoot: root, reportPath, outputPath: selectionPath, count: 7});
  assert.equal(draft.selection.status, 'draft');
  assert.throws(() => runResearchBatch({selectionPath, projectRoot: root, runner: () => ({status: 0})}), /approved/);

  const productionDirectory = projectLayout(root, {
    snapshotDate: '2026-09-14',
    fullName: 'fixture/repo-1',
  }).productionDirectory;
  mkdirSync(productionDirectory, {recursive: true});
  const approved = {
    ...draft.selection,
    status: 'approved',
    videoProjects: ['fixture/repo-1'],
  };
  writeFileSync(selectionPath, JSON.stringify(approved));
  let calls = 0;
  const batch = runResearchBatch({
    selectionPath,
    projectRoot: root,
    runner: () => ({status: calls++ === 1 ? 1 : 0}),
  });
  assert.equal(calls, 7);
  assert.equal(batch.failed, 1);
  const batchResult = projectLayout(root, {
    snapshotDate: '2026-09-14',
    fullName: 'fixture/repo-1',
  }).resourcesDirectory;
  assert.equal(JSON.parse(readFileSync(join(batchResult, 'research-batch-result.json'), 'utf8')).weekId, '2026-W38');

  const approvedResearch = writeResearch(root, 'fixture/repo-1', 2, editorialContract);
  writeResearch(root, 'fixture/repo-2', 7, editorialContract);
  const productionStoryboard = {
    meta: {
      editorialContractDigest: approvedResearch.editorialContract.digest,
      researchCommit: approvedResearch.project.versionOrCommit,
    },
    production: true,
  };
  const productionStoryboardPath = join(productionDirectory, 'storyboard.json');
  writeFileSync(productionStoryboardPath, JSON.stringify(productionStoryboard));
  const final = writeFinalRanking({
    projectRoot: root,
    selectionPath,
    generatedAt: new Date('2026-09-14T12:00:00Z'),
    editorialContract,
  });
  assert.equal(final.result.rows[0].fullName, 'fixture/repo-2');
  assert.equal(final.result.rows[0].finalScore, 26);
  assert.equal(final.result.rows[0].videoApproved, false);
  assert.equal(final.result.rows[1].fullName, 'fixture/repo-1');
  assert.equal(final.result.rows[1].finalScore, 22);
  assert.equal(final.result.rows[1].videoApproved, true);
  assert.equal(final.result.rows[1].storyboardPath,
    'output/videos/2026年09月第3周-fixture--repo-1/resources/production/storyboard.json');
  assert.equal(final.result.rows[1].videoPath,
    'output/videos/2026年09月第3周-fixture--repo-1/final.mp4');
  assert.equal(final.result.rows[1].editorialContractDigest, editorialContract.digest);
  assert.match(final.result.rows[1].storyboardDigest, /^[a-f0-9]{64}$/u);
  assert.equal(final.jsonPath,
    join(root, 'apps', 'repo-researcher', 'final_rank', '2026-W38', 'final-ranking.json'));
  assert.equal(final.result.rows.filter((row) => row.finalScore === null).length, 5);

  writeFileSync(productionStoryboardPath, JSON.stringify({
    ...productionStoryboard,
    meta: {...productionStoryboard.meta, researchCommit: 'f'.repeat(40)},
  }));
  assert.throws(() => writeFinalRanking({projectRoot: root, selectionPath, editorialContract}), /stale/i);
  writeFileSync(productionStoryboardPath, JSON.stringify(productionStoryboard));

  const staleResearchPath = join(batchResult, 'research.json');
  const staleResearch = JSON.parse(readFileSync(staleResearchPath, 'utf8'));
  staleResearch.editorialContract.digest = 'f'.repeat(64);
  writeFileSync(staleResearchPath, JSON.stringify(staleResearch));
  const refreshed = writeFinalRanking({projectRoot: root, selectionPath, editorialContract});
  const staleRow = refreshed.result.rows.find((row) => row.fullName === 'fixture/repo-1');
  assert.equal(staleRow.researchStatus, 'incomplete');
  assert.equal(staleRow.videoApproved, false);
  assert.match(staleRow.researchIssue, /stale/i);
});
