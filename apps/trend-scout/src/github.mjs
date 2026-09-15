const GITHUB_API = 'https://api.github.com';
const GITHUB_WEB = 'https://github.com';

const RETRYABLE_HTTP_STATUSES = new Set([408, 429, 500, 502, 503, 504]);

function defaultSleep(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

export class GitHubRequestError extends Error {
  constructor(message, {code, status = null, attempts, url, cause} = {}) {
    super(message, {cause});
    this.name = 'GitHubRequestError';
    this.code = code;
    this.status = status;
    this.attempts = attempts;
    this.url = String(url);
  }
}

function decodeHtml(value = '') {
  return value
    .replaceAll('&amp;', '&')
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'")
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replace(/\s+/g, ' ')
    .trim();
}

function stripTags(value = '') {
  return decodeHtml(value.replace(/<[^>]+>/g, ' '));
}

export async function request(url, {
  token,
  accept = 'application/vnd.github+json',
  fetchImpl = globalThis.fetch,
  maxAttempts = 3,
  baseDelayMs = 400,
  sleep = defaultSleep,
} = {}) {
  const headers = {
    Accept: accept,
    'User-Agent': 'zimeiti-trend-scout/0.1',
    'X-GitHub-Api-Version': '2022-11-28',
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    let response;
    try {
      response = await fetchImpl(url, {
        headers,
        signal: AbortSignal.timeout(30_000),
      });
    } catch (cause) {
      if (attempt < maxAttempts) {
        await sleep(baseDelayMs * (2 ** (attempt - 1)));
        continue;
      }
      throw new GitHubRequestError(
        `GitHub network request failed after ${attempt} attempts: ${url}`,
        {code: 'GITHUB_NETWORK_ERROR', attempts: attempt, url, cause},
      );
    }

    if (response.ok) return response;
    if (RETRYABLE_HTTP_STATUSES.has(response.status) && attempt < maxAttempts) {
      await sleep(baseDelayMs * (2 ** (attempt - 1)));
      continue;
    }

    const rate = response.headers.get('x-ratelimit-remaining');
    throw new GitHubRequestError(
      `GitHub request failed: ${response.status} ${response.statusText}; ` +
        `remaining=${rate ?? 'unknown'}; attempts=${attempt}; ${url}`,
      {code: 'GITHUB_HTTP_ERROR', status: response.status, attempts: attempt, url},
    );
  }

  throw new GitHubRequestError(`GitHub request failed without an attempt: ${url}`, {
    code: 'GITHUB_NETWORK_ERROR', attempts: 0, url,
  });
}

export class GitHubClient {
  constructor({token = '', delayMs = 120} = {}) {
    this.token = token;
    this.delayMs = delayMs;
  }

  async searchRepositories(query, {page = 1, perPage = 100} = {}) {
    const url = new URL('/search/repositories', GITHUB_API);
    url.searchParams.set('q', query);
    url.searchParams.set('sort', 'stars');
    url.searchParams.set('order', 'desc');
    url.searchParams.set('page', String(page));
    url.searchParams.set('per_page', String(perPage));
    const response = await request(url, {token: this.token});
    return response.json();
  }

  async getRepository(fullName) {
    const response = await request(`${GITHUB_API}/repos/${fullName}`, {token: this.token});
    return response.json();
  }

  async getTrending({since, language = ''}) {
    const languagePath = language ? `/${encodeURIComponent(language)}` : '';
    const url = `${GITHUB_WEB}/trending${languagePath}?since=${since}`;
    const response = await request(url, {token: this.token, accept: 'text/html'});
    return parseTrendingHtml(await response.text(), {since, language, sourceUrl: url});
  }
}

export function parseTrendingHtml(html, {since, language = '', sourceUrl = GITHUB_WEB} = {}) {
  const articles = html.match(/<article[\s\S]*?<\/article>/gi) ?? [];
  const periodLabel = since === 'weekly' ? 'this week' : since === 'monthly' ? 'this month' : 'today';

  return articles.flatMap((article, index) => {
    const heading = article.match(/<h2[\s\S]*?<\/h2>/i)?.[0] ?? '';
    const slugMatch = heading.match(/href=["']\/([^"'?#\s]+\/[^"'?#\s]+)["']/i);
    if (!slugMatch) return [];
    const fullName = slugMatch[1].replace(/\s+/g, '');
    if (!/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(fullName)) return [];

    const gainPattern = new RegExp(`([\\d,]+)\\s+stars?\\s+${periodLabel}`, 'i');
    const gainMatch = stripTags(article).match(gainPattern);
    const descriptionMatch = article.match(/<p[^>]*class=["'][^"']*col-9[^"']*["'][^>]*>([\s\S]*?)<\/p>/i);

    return [{
      fullName,
      rank: index + 1,
      window: since,
      starsGained: gainMatch ? Number(gainMatch[1].replaceAll(',', '')) : 0,
      language,
      description: descriptionMatch ? stripTags(descriptionMatch[1]) : '',
      source: sourceUrl,
    }];
  });
}

function isoDateDaysAgo(days, now = new Date()) {
  const date = new Date(now);
  date.setUTCDate(date.getUTCDate() - days);
  return date.toISOString().slice(0, 10);
}

function positiveInteger(value, name) {
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed <= 0) {
    throw new Error(`${name} must be a positive integer.`);
  }
  return parsed;
}

export async function discoverCandidates(client, config, {
  growthQuota = config.growthCandidateQuota ?? 30,
  activeStarsQuota = config.activeStarsCandidateQuota ?? 12,
} = {}) {
  const resolvedGrowthQuota = positiveInteger(growthQuota, 'growthCandidateQuota');
  const resolvedActiveStarsQuota = positiveInteger(activeStarsQuota, 'activeStarsCandidateQuota');
  const configuredMaximum = Number(config.maxCandidates ??
    resolvedGrowthQuota + resolvedActiveStarsQuota);
  if (configuredMaximum !== resolvedGrowthQuota + resolvedActiveStarsQuota) {
    throw new Error('maxCandidates must equal growthCandidateQuota + activeStarsCandidateQuota.');
  }
  const candidateSources = new Map();
  const activeStarsCandidates = new Map();
  const signalsByRepo = new Map();
  const queryDate = isoDateDaysAgo(config.newRepoDays);
  const pushedDate = isoDateDaysAgo(config.activeRepoDays);

  const queryPlans = [
    {
      query: `created:>=${queryDate} stars:>=${config.minStars} archived:false fork:false`,
      activeStars: false,
    },
    {
      query: `pushed:>=${pushedDate} stars:>=${Math.max(config.minStars * 4, 200)} archived:false fork:false`,
      activeStars: true,
    },
    ...config.languages.map((language) =>
      ({
        query: `created:>=${queryDate} language:${language} stars:>=${config.minStars} archived:false fork:false`,
        activeStars: false,
      }),
    ),
  ];

  for (const plan of queryPlans) {
    for (let page = 1; page <= config.searchPages; page += 1) {
      const result = await client.searchRepositories(plan.query, {page});
      for (const repo of result.items ?? []) {
        const candidate = {repo, source: `search:${plan.query}`};
        candidateSources.set(repo.full_name, candidate);
        if (plan.activeStars) activeStarsCandidates.set(repo.full_name, candidate);
      }
      if ((result.items ?? []).length < 100) break;
    }
  }

  for (const since of ['daily', 'weekly']) {
    for (const language of config.trendingLanguages) {
      const signals = await client.getTrending({since, language});
      for (const signal of signals) {
        const list = signalsByRepo.get(signal.fullName) ?? [];
        list.push(signal);
        signalsByRepo.set(signal.fullName, list);
        if (!candidateSources.has(signal.fullName)) {
          candidateSources.set(signal.fullName, {repo: null, source: `trending:${since}:${language || 'all'}`});
        }
      }
    }
  }

  const growthCandidates = [...candidateSources.entries()]
    .filter(([fullName]) => Math.max(
      0,
      ...(signalsByRepo.get(fullName) ?? []).map((item) => item.starsGained),
    ) > 0)
    .sort((a, b) => {
      const aSignal = Math.max(0, ...(signalsByRepo.get(a[0]) ?? []).map((item) => item.starsGained));
      const bSignal = Math.max(0, ...(signalsByRepo.get(b[0]) ?? []).map((item) => item.starsGained));
      const aStars = a[1].repo?.stargazers_count ?? 0;
      const bStars = b[1].repo?.stargazers_count ?? 0;
      return bSignal - aSignal || bStars - aStars || a[0].localeCompare(b[0]);
    })
    .slice(0, resolvedGrowthQuota)
    .map(([fullName, candidate]) => ({fullName, candidate, discoveryPool: 'growth'}));

  const growthNames = new Set(growthCandidates.map((item) => item.fullName));
  const activeStarsCandidatesOrdered = [...activeStarsCandidates.entries()]
    .filter(([fullName]) => !growthNames.has(fullName))
    .sort((a, b) =>
      (b[1].repo?.stargazers_count ?? 0) - (a[1].repo?.stargazers_count ?? 0) ||
      a[0].localeCompare(b[0]))
    .slice(0, resolvedActiveStarsQuota)
    .map(([fullName, candidate]) => ({
      fullName,
      candidate,
      discoveryPool: 'active-stars',
    }));

  const ordered = [...growthCandidates, ...activeStarsCandidatesOrdered];

  const enriched = [];
  for (const {fullName, candidate, discoveryPool} of ordered) {
    let repo = candidate.repo;
    if (!repo || !Array.isArray(repo.topics) || !repo.license) {
      repo = await client.getRepository(fullName);
      await new Promise((resolve) => setTimeout(resolve, client.delayMs));
    }
    enriched.push({
      repo,
      source: candidate.source,
      signals: signalsByRepo.get(fullName) ?? [],
      discoveryPool,
    });
  }
  return enriched;
}
