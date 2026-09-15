import assert from 'node:assert/strict';
import {mkdtempSync, rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import test from 'node:test';
import {ScoutDatabase} from '../apps/trend-scout/src/db.mjs';
import {rankWeeklyRepositories} from '../apps/trend-scout/src/scoring.mjs';
import {collectWeekly} from '../apps/trend-scout/src/weekly-collection.mjs';
import {isoWeekIdFromDateString, localDateString, weekIdForDate} from '../apps/trend-scout/src/week.mjs';

const config = {
  maxCandidates: 42,
  timeZone: 'Asia/Shanghai',
  watchlistRetentionWeeks: 4,
  candidateWindowDays: 7,
  absoluteGrowthThreshold: 5000,
  absoluteGrowthStep: 5000,
  relativeGrowthBaselineFloor: 5000,
};

function repository(id, fullName, stars) {
  return {
    id,
    full_name: fullName,
    description: `${fullName} fixture`,
    language: 'JavaScript',
    stargazers_count: stars,
    forks_count: 1,
    open_issues_count: 0,
    created_at: '2026-01-01T00:00:00Z',
    pushed_at: '2026-09-21T00:00:00Z',
    homepage: null,
    license: {spdx_id: 'MIT'},
    topics: [],
    html_url: `https://github.com/${fullName}`,
  };
}

function candidate(repo, discoveryPool = null) {
  return {repo, source: 'fixture-search', signals: [], discoveryPool};
}

function temporaryDatabase(t) {
  const directory = mkdtempSync(join(tmpdir(), 'zimeiti-weekly-'));
  const database = new ScoutDatabase(join(directory, 'scout.sqlite'));
  t.after(() => {
    database.close();
    rmSync(directory, {recursive: true, force: true});
  });
  return database;
}

test('week identifiers use the configured Asia/Shanghai calendar date', () => {
  const instant = new Date('2026-09-13T16:30:00.000Z');
  assert.equal(localDateString(instant, 'Asia/Shanghai'), '2026-09-14');
  assert.equal(weekIdForDate(instant, 'Asia/Shanghai'), '2026-W38');
  assert.equal(isoWeekIdFromDateString('2026-09-14'), '2026-W38');
});

test('a successful weekly collection is idempotent and makes no second discovery request', async (t) => {
  const database = temporaryDatabase(t);
  let calls = 0;
  const discover = async () => {
    calls += 1;
    return [candidate(repository(1, 'fixture/alpha', 10000), 'growth')];
  };
  const client = {getRepository: async () => { throw new Error('unexpected watchlist request'); }};
  const now = new Date('2026-09-14T01:00:00.000Z');

  const first = await collectWeekly({database, config, client, now, discover});
  const second = await collectWeekly({database, config, client, now, discover});

  assert.equal(first.status, 'completed');
  assert.equal(first.growthDiscoveredCount, 1);
  assert.equal(first.activeStarsDiscoveredCount, 0);
  assert.equal(second.status, 'skipped');
  assert.equal(calls, 1);
  assert.equal(database.getWeeklyRun('2026-W38').attempt_count, 1);
  assert.equal(database.listSnapshots(1).length, 1);
  assert.match(database.listWeeklyDiscoveries('2026-W38')[0].discovery_source, /^growth:/);
});

test('a failed week is retried and receives a durable success marker after recovery', async (t) => {
  const database = temporaryDatabase(t);
  const now = new Date('2026-09-14T01:00:00.000Z');
  await assert.rejects(
    collectWeekly({
      database,
      config,
      client: {},
      now,
      discover: async () => { throw new Error('temporary network failure'); },
    }),
    /temporary network failure/,
  );
  assert.equal(database.getWeeklyRun('2026-W38').status, 'failed');

  const recovered = await collectWeekly({
    database,
    config,
    client: {getRepository: async () => { throw new Error('unexpected'); }},
    now,
    discover: async () => [candidate(repository(1, 'fixture/alpha', 10000))],
  });
  assert.equal(recovered.status, 'completed');
  assert.equal(database.getWeeklyRun('2026-W38').attempt_count, 2);
});

test('short-term watchlist projects are observed but receive business score zero when absent', async (t) => {
  const database = temporaryDatabase(t);
  const alphaWeekOne = repository(1, 'fixture/alpha', 10000);
  await collectWeekly({
    database,
    config,
    client: {},
    now: new Date('2026-09-14T01:00:00.000Z'),
    discover: async () => [candidate(alphaWeekOne)],
  });

  const alphaWeekTwo = repository(1, 'fixture/alpha', 18000);
  const betaWeekTwo = repository(2, 'fixture/beta', 20000);
  await collectWeekly({
    database,
    config,
    client: {getRepository: async (name) => {
      assert.equal(name, 'fixture/alpha');
      return alphaWeekTwo;
    }},
    now: new Date('2026-09-21T01:00:00.000Z'),
    discover: async () => [candidate(betaWeekTwo)],
  });

  const ranking = rankWeeklyRepositories(
    database, config, new Date('2026-09-21T12:00:00.000Z'), '2026-W39',
  );
  const alpha = ranking.find((item) => item.repo.full_name === 'fixture/alpha');
  const beta = ranking.find((item) => item.repo.full_name === 'fixture/beta');
  assert.equal(beta.metrics.eligibleForResearch, true);
  assert.equal(alpha.metrics.rankingStatus, 'not-rediscovered');
  assert.equal(alpha.metrics.eligibleForResearch, false);
  assert.equal(alpha.metrics.trendScore, 0);
  assert.ok(alpha.metrics.rawTrendScore > 0);
  assert.equal(alpha.metrics.growth, 8000);
});
