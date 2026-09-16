import assert from 'node:assert/strict';
import test from 'node:test';
import {discoverCandidates} from '../apps/trend-scout/src/github.mjs';

function repository(id, fullName, stars) {
  return {
    id,
    full_name: fullName,
    description: `${fullName} fixture`,
    language: 'TypeScript',
    stargazers_count: stars,
    forks_count: 0,
    open_issues_count: 0,
    created_at: '2026-08-01T00:00:00Z',
    pushed_at: '2026-09-14T00:00:00Z',
    homepage: null,
    license: {spdx_id: 'MIT'},
    topics: [],
    html_url: `https://github.com/${fullName}`,
  };
}

test('discovery reserves 30 growth and 12 non-duplicate active-stars slots', async () => {
  const growthRepos = Array.from({length: 35}, (_, index) =>
    repository(index + 1, `fixture/growth-${index}`, 10_000 + index));
  const overlap = growthRepos.slice(0, 5).map((repo, index) => ({
    ...repo,
    stargazers_count: 3_000_000 - index,
  }));
  const scaleRepos = Array.from({length: 20}, (_, index) =>
    repository(100 + index, `fixture/scale-${index}`, 2_000_000 - index));
  const signals = growthRepos.map((repo, index) => ({
    fullName: repo.full_name,
    rank: index + 1,
    window: 'daily',
    starsGained: 10_000 - index,
    language: '',
    source: 'fixture:trending',
  }));
  const client = {
    searchRepositories: async (query) => ({
      items: query.startsWith('pushed:') ? [...overlap, ...scaleRepos] : [...growthRepos, ...scaleRepos],
    }),
    getTrending: async ({since}) => since === 'daily' ? signals : [],
    getRepository: async () => { throw new Error('fixtures already contain complete metadata'); },
    delayMs: 0,
  };
  const config = {
    minStars: 500,
    newRepoDays: 365,
    activeRepoDays: 84,
    searchPages: 1,
    maxCandidates: 42,
    growthCandidateQuota: 30,
    activeStarsCandidateQuota: 12,
    languages: [],
    trendingLanguages: [''],
  };

  const candidates = await discoverCandidates(client, config);
  assert.equal(candidates.length, 42);
  assert.equal(candidates.filter((item) => item.discoveryPool === 'growth').length, 30);
  assert.equal(candidates.filter((item) => item.discoveryPool === 'active-stars').length, 12);
  assert.equal(new Set(candidates.map((item) => item.repo.full_name)).size, 42);
  assert.ok(candidates.some((item) => item.repo.full_name === 'fixture/scale-0'));
  assert.ok(!candidates.some((item) => item.repo.full_name === 'fixture/growth-34'));
  assert.deepEqual(
    candidates.slice(30).map((item) => item.repo.full_name),
    scaleRepos.slice(0, 12).map((repo) => repo.full_name),
  );
});

test('discovery rejects quota totals that do not match maxCandidates', async () => {
  const client = {
    searchRepositories: async () => ({items: []}),
    getTrending: async () => [],
    delayMs: 0,
  };

  await assert.rejects(
    discoverCandidates(client, {
      minStars: 500,
      newRepoDays: 365,
      activeRepoDays: 84,
      searchPages: 1,
      maxCandidates: 43,
      growthCandidateQuota: 30,
      activeStarsCandidateQuota: 12,
      languages: [],
      trendingLanguages: [''],
    }),
    /maxCandidates must equal growthCandidateQuota \+ activeStarsCandidateQuota/,
  );
});
