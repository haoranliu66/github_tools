import assert from 'node:assert/strict';
import {join} from 'node:path';
import test from 'node:test';
import {
  finalRankingWeekDirectory,
  monthWeekNumber,
  projectDirectoryName,
  projectLayout,
  selectionPathForReport,
  trendReportWeekDirectory,
} from '../apps/shared/pipeline-paths.mjs';

test('monthly project names use Monday-based calendar weeks and retain the year', () => {
  assert.equal(monthWeekNumber('2026-09-01'), 1);
  assert.equal(monthWeekNumber('2026-09-07'), 2);
  assert.equal(monthWeekNumber('2026-09-14'), 3);
  assert.equal(
    projectDirectoryName('2026-09-14', 'ayghri/i-have-adhd'),
    '2026年09月第3周-ayghri--i-have-adhd',
  );
});

test('all durable artifacts resolve to the unified weekly and project directories', () => {
  const root = join('D:', 'fixture');
  const reportDirectory = trendReportWeekDirectory(root, '2026-W38');
  const reportPath = join(reportDirectory, '2026-09-14.json');
  assert.equal(selectionPathForReport(reportPath), join(reportDirectory, 'selection.json'));
  assert.equal(
    finalRankingWeekDirectory(root, '2026-W38'),
    join(root, 'apps', 'repo-researcher', 'final_rank', '2026-W38'),
  );
  const layout = projectLayout(root, {
    snapshotDate: '2026-09-14',
    fullName: 'ayghri/i-have-adhd',
  });
  assert.equal(layout.resourcesDirectory, join(
    root,
    'output',
    'videos',
    '2026年09月第3周-ayghri--i-have-adhd',
    'resources',
  ));
  assert.equal(layout.videoPath, join(layout.projectDirectory, 'final.mp4'));
});
