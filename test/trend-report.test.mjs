import assert from 'node:assert/strict';
import {mkdtempSync, readFileSync, rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import test from 'node:test';
import {summarizeRankingRows, writeRankingReport} from '../apps/trend-scout/src/report.mjs';
import {scoreRepository} from '../apps/trend-scout/src/scoring.mjs';

const config = {
  candidateWindowDays: 7,
  absoluteGrowthThreshold: 5000,
  absoluteGrowthStep: 5000,
  relativeGrowthBaselineFloor: 5000,
};

test('candidate reports expose the 93-point trend score and pending demo score', (t) => {
  const directory = mkdtempSync(join(tmpdir(), 'zimeiti-report-test-'));
  t.after(() => rmSync(directory, {recursive: true, force: true}));
  const repo = {full_name: 'fixture/example', html_url: 'https://github.com/fixture/example',
    description: 'Synthetic test fixture', stars: 15000, forks: 100, license: 'MIT',
    topics: ['ai-agent'], language: 'TypeScript', pushed_at: '2026-09-03T12:00:00Z',
    discovery_source: 'growth:fixture'};
  const metrics = scoreRepository(repo, [{captured_on: '2026-09-03', stars: 15000}],
    [{window: 'weekly', stars_gained: 10000}], config, new Date('2026-09-03T12:00:00Z'));
  const output = writeRankingReport([
    {repo, metrics},
    {repo: {...repo, full_name: 'fixture/no-description',
      html_url: 'https://github.com/fixture/no-description', description: ''}, metrics},
  ], directory, '2026-09-03');
  const rows = JSON.parse(readFileSync(output.jsonPath, 'utf8'));
  const markdown = readFileSync(output.markdownPath, 'utf8');

  assert.deepEqual(rows, output.rows);
  assert.equal(rows[0].trendScoreMax, 93);
  assert.equal(rows[0].demoabilityScore, null);
  assert.equal(rows[0].finalScore, null);
  assert.equal(rows[0].primaryFunction, 'Synthetic test fixture');
  assert.equal(rows[0].primaryFunctionSource, 'github-description');
  assert.equal(rows[0].discoveryPool, 'growth');
  assert.equal(rows[1].primaryFunction, '待 repo-researcher 补充');
  assert.equal(rows[1].primaryFunctionSource, 'unavailable');
  assert.equal('audienceScore' in rows[0], false);
  assert.match(markdown, /主要功能/);
  assert.match(markdown, /发现配额/);
  assert.match(markdown, /高增长/);
  assert.match(markdown, /Synthetic test fixture/);
  assert.match(markdown, /待 repo-researcher 补充/);
  assert.match(markdown, /趋势分.*93/);
  assert.match(markdown, /可演示性.*待研究/);
  assert.match(markdown, /GitHub 周度候选榜/);
  assert.match(markdown, /5000/);
  assert.match(markdown, /不得表述为“过去七日本地增长”/);
});

test('empty candidate reports remain valid under the new scoring contract', (t) => {
  const directory = mkdtempSync(join(tmpdir(), 'zimeiti-report-test-'));
  t.after(() => rmSync(directory, {recursive: true, force: true}));
  const output = writeRankingReport([], directory, '2026-09-03');
  assert.deepEqual(JSON.parse(readFileSync(output.jsonPath, 'utf8')), []);
  assert.match(readFileSync(output.markdownPath, 'utf8'), /趋势分/);
});

test('report summary excludes not-rediscovered rows from ready and cold-start counts', () => {
  const summary = summarizeRankingRows([
    {eligibleForResearch: true, canClaimSevenDayGrowth: true, growthMeasurementStatus: 'ready'},
    {eligibleForResearch: true, canClaimSevenDayGrowth: false, growthMeasurementStatus: 'cold-start'},
    {eligibleForResearch: false, rankingStatus: 'not-rediscovered', canClaimSevenDayGrowth: true,
      growthMeasurementStatus: 'ready'},
  ]);
  assert.deepEqual(summary, {eligible: 2, ready: 1, coldStart: 1, notRediscovered: 1});
});
