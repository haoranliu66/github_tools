import assert from 'node:assert/strict';
import test from 'node:test';
import {rankRepositories, scoreRepository} from '../apps/trend-scout/src/scoring.mjs';

const config = {
  candidateWindowDays: 7,
  absoluteGrowthThreshold: 5000,
  absoluteGrowthStep: 5000,
  relativeGrowthBaselineFloor: 5000,
};

const now = new Date('2026-09-03T12:00:00Z');
const repo = {
  stars: 15000,
  forks: 120,
  pushed_at: now.toISOString(),
  license: 'MIT',
  language: 'TypeScript',
  topics: ['ai-agent'],
};

function snapshots({twoWeeksAgo = 2000, weekAgo = 5000, today = 15000} = {}) {
  return [
    {captured_on: '2026-08-20', stars: twoWeeksAgo},
    {captured_on: '2026-08-27', stars: weekAgo},
    {captured_on: '2026-09-03', stars: today},
  ];
}

test('the complete score follows the agreed 30/15/10/8/30 trend formula', () => {
  const result = scoreRepository(repo, snapshots(), [], config, now);

  assert.equal(result.growth, 10000);
  assert.equal(result.absoluteGrowthScore, 3);
  assert.equal(result.relativeGrowthRate, 200);
  assert.equal(result.relativeGrowthScore, 15);
  assert.equal(result.previousRelativeGrowthRate, 60);
  assert.equal(result.accelerationRate, 140);
  assert.equal(result.accelerationScore, 10);
  assert.equal(result.maintenanceActivityScore, 8);
  assert.equal(result.totalStarsBasis, 5000);
  assert.equal(result.totalStarsScore, 18.49);
  assert.equal(result.trendScore, 54.49);
  assert.equal(result.score, 54.49);
  assert.equal(result.trendScoreMax, 93);
  assert.equal(result.demoabilityScore, null);
  assert.equal(result.demoabilityScoreMax, 7);
  assert.equal(result.finalScore, null);
  assert.equal(result.scoreStatus, 'complete');
  assert.equal(result.scoreCompleteness, 93);
});

for (const [growth, expected] of [[5000, 0], [10000, 3], [30000, 15], [55000, 30], [100000, 30]]) {
  test(`absolute seven-day growth ${growth} earns ${expected} points`, () => {
    const result = scoreRepository({...repo, stars: 5000 + growth},
      snapshots({today: 5000 + growth}), [], config, now);
    assert.equal(result.absoluteGrowthScore, expected);
  });
}

test('relative growth uses the agreed 5000-star denominator floor', () => {
  const result = scoreRepository({...repo, stars: 5100},
    snapshots({twoWeeksAgo: 50, weekAgo: 100, today: 5100}), [], config, now);
  assert.equal(result.relativeGrowthRate, 100);
  assert.equal(result.relativeGrowthScore, 10);
});

for (const [starsAtWeekStart, points] of [[1, 0], [10, 5], [100, 10], [1000, 15], [10000, 20], [100000, 25], [1000000, 30]]) {
  test(`week-start total stars ${starsAtWeekStart} contribute ${points} points`, () => {
    const result = scoreRepository({...repo, stars: starsAtWeekStart + 100},
      snapshots({twoWeeksAgo: starsAtWeekStart, weekAgo: starsAtWeekStart, today: starsAtWeekStart + 100}),
      [], config, now);
    assert.equal(result.totalStarsBasis, starsAtWeekStart);
    assert.equal(result.totalStarsScore, points);
  });
}

test('cold-start scoring estimates the week-start base but leaves acceleration unavailable', () => {
  const result = scoreRepository(repo, [{captured_on: '2026-09-03', stars: 15000}],
    [{window: 'weekly', stars_gained: 10000}], config, now);

  assert.equal(result.growthMeasurementStatus, 'cold-start');
  assert.equal(result.totalStarsBasis, 5000);
  assert.equal(result.totalStarsBasisSource, 'estimated-week-start');
  assert.equal(result.relativeGrowthStatus, 'provisional');
  assert.equal(result.relativeGrowthScore, 15);
  assert.equal(result.accelerationScore, null);
  assert.equal(result.scoreStatus, 'provisional');
  assert.equal(result.scoreCompleteness, 83);
});

test('seven days of data cannot fabricate acceleration without the prior week', () => {
  const result = scoreRepository(repo, snapshots().slice(1), [], config, now);
  assert.equal(result.canClaimSevenDayGrowth, true);
  assert.equal(result.relativeGrowthStatus, 'measured');
  assert.equal(result.accelerationScore, null);
  assert.equal(result.scoreStatus, 'provisional');
});

test('stale baselines remain cold-start instead of becoming seven-day measurements', () => {
  const result = scoreRepository(repo, [
    {captured_on: '2026-07-01', stars: 1000},
    {captured_on: '2026-09-03', stars: 15000},
  ], [{window: 'weekly', stars_gained: 6000}], config, now);
  assert.equal(result.growth, 6000);
  assert.equal(result.canClaimSevenDayGrowth, false);
  assert.equal(result.growthMeasurementStatus, 'cold-start');
});

test('maintenance activity is an eight-point seven-day freshness score', () => {
  const today = scoreRepository(repo, snapshots(), [], config, now);
  const halfway = scoreRepository({...repo, pushed_at: '2026-08-31T00:00:00Z'}, snapshots(), [], config, now);
  const stale = scoreRepository({...repo, pushed_at: '2026-08-27T00:00:00Z'}, snapshots(), [], config, now);
  assert.equal(today.maintenanceActivityScore, 8);
  assert.equal(halfway.maintenanceActivityScore, 4);
  assert.equal(stale.maintenanceActivityScore, 0);
});

test('language and topics remain metadata and cannot change the score', () => {
  const matched = scoreRepository(repo, snapshots(), [], config, now);
  const unrelated = scoreRepository({...repo, language: 'Fortran', topics: ['cooking']},
    snapshots(), [], config, now);
  assert.equal(matched.score, unrelated.score);
  assert.equal('audienceScore' in matched, false);
  assert.equal('topicHits' in matched, false);
});

test('all recently observed growing projects are ranked without report-size truncation', () => {
  const repositories = Array.from({length: 25}, (_, index) => ({
    ...repo,
    repo_id: index + 1,
    stars: 20000 + index,
    last_seen_at: '2026-09-03T01:00:00Z',
  }));
  repositories.push({...repo, repo_id: 90, last_seen_at: '2026-08-20T00:00:00Z'});
  repositories.push({...repo, repo_id: 91, last_seen_at: '2026-09-03T01:00:00Z'});
  const database = {
    listRepositories: () => repositories,
    listSnapshots: () => [],
    listSignals: (id) => id === 91 ? [] : [{window: 'weekly', stars_gained: 6000 + id}],
  };

  const ranking = rankRepositories(database, {...config, reportSize: 1}, now);
  assert.equal(ranking.length, 25);
  assert.equal(ranking.some(({repo: item}) => item.repo_id === 90), false);
  assert.equal(ranking.some(({repo: item}) => item.repo_id === 91), false);
});

test('invalid scoring boundaries fail explicitly', () => {
  for (const settings of [
    {...config, absoluteGrowthThreshold: -1},
    {...config, absoluteGrowthStep: 0},
    {...config, relativeGrowthBaselineFloor: 0},
    {...config, candidateWindowDays: 0},
  ]) {
    assert.throws(() => scoreRepository(repo, snapshots(), [], settings, now), /scoring|positive|non-negative/i);
  }
});
