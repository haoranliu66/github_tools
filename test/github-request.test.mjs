import assert from 'node:assert/strict';
import test from 'node:test';
import {GitHubRequestError, request} from '../apps/trend-scout/src/github.mjs';

function response(status, headers = {}) {
  return {
    ok: status >= 200 && status < 300,
    status,
    statusText: status === 200 ? 'OK' : 'Unavailable',
    headers: new Headers(headers),
  };
}

test('GitHub requests recover from transient network and server failures', async () => {
  const outcomes = [new TypeError('connection reset'), response(503), response(200)];
  const delays = [];
  const result = await request('https://api.github.com/repos/fixture/example', {
    fetchImpl: async () => {
      const outcome = outcomes.shift();
      if (outcome instanceof Error) throw outcome;
      return outcome;
    },
    sleep: async (milliseconds) => delays.push(milliseconds),
    maxAttempts: 3,
    baseDelayMs: 100,
  });

  assert.equal(result.status, 200);
  assert.deepEqual(delays, [100, 200]);
  assert.equal(outcomes.length, 0);
});

test('GitHub requests do not retry authentication failures', async () => {
  let attempts = 0;
  await assert.rejects(
    request('https://api.github.com/repos/fixture/private', {
      fetchImpl: async () => {
        attempts += 1;
        return response(401, {'x-ratelimit-remaining': '58'});
      },
      sleep: async () => {},
    }),
    (error) => {
      assert.ok(error instanceof GitHubRequestError);
      assert.equal(error.code, 'GITHUB_HTTP_ERROR');
      assert.equal(error.status, 401);
      assert.equal(error.attempts, 1);
      return true;
    },
  );
  assert.equal(attempts, 1);
});

test('exhausted GitHub retries expose a stable diagnostic code', async () => {
  await assert.rejects(
    request('https://github.com/trending?since=weekly', {
      fetchImpl: async () => {
        throw new TypeError('fetch failed');
      },
      sleep: async () => {},
      maxAttempts: 2,
    }),
    (error) => {
      assert.ok(error instanceof GitHubRequestError);
      assert.equal(error.code, 'GITHUB_NETWORK_ERROR');
      assert.equal(error.attempts, 2);
      assert.match(error.message, /after 2 attempts/);
      return true;
    },
  );
});
