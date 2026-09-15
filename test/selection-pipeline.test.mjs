import assert from 'node:assert/strict';
import {mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import test from 'node:test';
import {runResearchBatch} from '../apps/repo-researcher/src/batch.mjs';
import {writeFinalRanking} from '../apps/trend-scout/src/final-report.mjs';
import {createSelectionTemplate, validateSelection} from '../apps/trend-scout/src/selection.mjs';

function projectFixture(t) {
  const root = mkdtempSync(join(tmpdir(), 'zimeiti-selection-'));
  t.after(() => rmSync(root, {recursive: true, force: true}));
  mkdirSync(join(root, 'output', 'trend-reports'), {recursive: true});
  const rows = Array.from({length: 8}, (_, index) => ({
    rank: index + 1,
    weekId: '2026-W38',
    fullName: `fixture/repo-${index + 1}`,
    trendScore: 20 - index,
    eligibleForResearch: true,
    rankingStatus: 'current-discovery',
  }));
  const reportPath = join(root, 'output', 'trend-reports', '2026-09-14.json');
  writeFileSync(reportPath, JSON.stringify(rows));
  return {root, rows, reportPath};
}

function writeResearch(root, fullName, score) {
  const directory = join(root, 'output', 'research', '2026-09-14', fullName.replace('/', '--'));
  mkdirSync(directory, {recursive: true});
  writeFileSync(join(directory, 'research.json'), JSON.stringify({
    status: 'completed',
    demoability: {score, confidence: 'high', reason: `fixture score ${score}`},
  }));
  writeFileSync(join(directory, 'storyboard.json'), JSON.stringify({fixture: true}));
}

test('selection requires exactly seven or eight unique repositories', () => {
  const base = {
    schemaVersion: 1,
    weekId: '2026-W38',
    status: 'draft',
    sourceReport: 'output/trend-reports/2026-09-14.json',
    selectedRepositories: Array.from({length: 7}, (_, index) => `fixture/repo-${index}`),
    videoProjects: [],
  };
  assert.deepEqual(validateSelection(base), []);
  assert.match(validateSelection({...base, selectedRepositories: base.selectedRepositories.slice(0, 6)})[0], /7 or 8/);
  assert.ok(validateSelection({...base, selectedRepositories: [...base.selectedRepositories.slice(0, 6), base.selectedRepositories[0]]})
    .some((error) => /unique/.test(error)));
});

test('draft selection, batch research, and research-backed final ranking preserve human gates', (t) => {
  const {root, reportPath} = projectFixture(t);
  const selectionPath = join(root, 'selections', '2026-W38.json');
  const draft = createSelectionTemplate({projectRoot: root, reportPath, outputPath: selectionPath, count: 7});
  assert.equal(draft.selection.status, 'draft');
  assert.throws(() => runResearchBatch({selectionPath, projectRoot: root, runner: () => ({status: 0})}), /approved/);

  const approved = {...draft.selection, status: 'approved', videoProjects: ['fixture/repo-1']};
  writeFileSync(selectionPath, JSON.stringify(approved));
  let calls = 0;
  const batch = runResearchBatch({
    selectionPath,
    projectRoot: root,
    runner: () => ({status: calls++ === 1 ? 1 : 0}),
  });
  assert.equal(calls, 7);
  assert.equal(batch.failed, 1);
  assert.equal(JSON.parse(readFileSync(batch.outputPath, 'utf8')).results.length, 7);

  writeResearch(root, 'fixture/repo-1', 2);
  writeResearch(root, 'fixture/repo-2', 7);
  const final = writeFinalRanking({projectRoot: root, selectionPath, generatedAt: new Date('2026-09-14T12:00:00Z')});
  assert.equal(final.result.rows[0].fullName, 'fixture/repo-2');
  assert.equal(final.result.rows[0].finalScore, 26);
  assert.equal(final.result.rows[0].videoApproved, false);
  assert.equal(final.result.rows[1].fullName, 'fixture/repo-1');
  assert.equal(final.result.rows[1].finalScore, 22);
  assert.equal(final.result.rows[1].videoApproved, true);
  assert.equal(final.result.rows.filter((row) => row.finalScore === null).length, 5);
});
