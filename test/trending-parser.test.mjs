import assert from 'node:assert/strict';
import test from 'node:test';
import {parseTrendingHtml} from '../apps/trend-scout/src/github.mjs';

test('parses a GitHub Trending repository and period gain', () => {
  const html = `
    <article class="Box-row">
      <h2><a href="/acme/rocket">acme / rocket</a></h2>
      <p class="col-9 color-fg-muted my-1 pr-4">Fast developer tool</p>
      <span>1,234 stars this week</span>
    </article>`;
  const [result] = parseTrendingHtml(html, {since: 'weekly', language: 'typescript'});
  assert.equal(result.fullName, 'acme/rocket');
  assert.equal(result.starsGained, 1234);
  assert.equal(result.window, 'weekly');
});

test('ignores a sponsor link that appears before the repository heading', () => {
  const html = `
    <article class="Box-row">
      <a href="/sponsors/acme">Sponsor</a>
      <h2 class="h3"><a href="/acme/rocket">acme / rocket</a></h2>
      <span>99 stars today</span>
    </article>`;
  const [result] = parseTrendingHtml(html, {since: 'daily'});
  assert.equal(result.fullName, 'acme/rocket');
});
