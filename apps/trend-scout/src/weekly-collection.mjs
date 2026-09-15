import {discoverCandidates} from './github.mjs';
import {localDateString, weekIdForDate} from './week.mjs';

const SUCCESS_STATUSES = new Set(['completed', 'completed_with_warnings']);

function warningFor(error, fullName) {
  return {
    type: 'watchlist-observation-failed',
    fullName,
    code: error?.code ?? error?.cause?.code ?? 'UNKNOWN',
    status: error?.status ?? null,
    attempts: error?.attempts ?? null,
    url: error?.url ?? null,
    message: error?.message ?? String(error),
  };
}

export function isSuccessfulWeeklyRun(run) {
  return Boolean(run && SUCCESS_STATUSES.has(run.status));
}

export function seedWatchlistFromReportRows(database, rows, {
  weekId,
  observedAt,
  source = 'legacy-report',
} = {}) {
  if (database.hasAnyWeeklyDiscovery()) return 0;
  const usable = rows.filter((row) =>
    typeof row?.fullName === 'string' && /^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(row.fullName));
  let seeded = 0;
  database.transaction(() => {
    usable.forEach((row, index) => {
      const repo = database.getRepositoryByFullName(row.fullName);
      if (!repo) return;
      database.recordWeeklyDiscovery(repo.repo_id, weekId, source, row.rank ?? index + 1, observedAt);
      database.markWatchlistDiscovered(repo.repo_id, weekId, observedAt);
      seeded += 1;
    });
  });
  return seeded;
}

export async function collectWeekly({
  database,
  config,
  client,
  now = new Date(),
  discover = discoverCandidates,
  onWarning = (warning) => console.warn(JSON.stringify(warning)),
} = {}) {
  const timeZone = config.timeZone ?? 'Asia/Shanghai';
  const snapshotDate = localDateString(now, timeZone);
  const weekId = weekIdForDate(now, timeZone);
  const existing = database.getWeeklyRun(weekId);
  if (isSuccessfulWeeklyRun(existing)) {
    return {
      status: 'skipped',
      weekId,
      snapshotDate: existing.snapshot_date,
      discoveredCount: existing.discovered_count,
      observedCount: existing.observed_count,
      warnings: JSON.parse(existing.warnings_json || '[]'),
    };
  }

  const startedAt = now.toISOString();
  database.startWeeklyRun(weekId, snapshotDate, startedAt);
  try {
    const candidates = await discover(client, config);
    if (!Array.isArray(candidates) || candidates.length === 0) {
      throw new Error('Weekly discovery returned no candidates; refusing to mark the week successful.');
    }

    const currentNames = new Set(candidates.map((candidate) => candidate.repo.full_name));
    const observationTargets = database.listActiveWatchlist()
      .filter((repo) => !currentNames.has(repo.full_name));
    const observations = [];
    const warnings = [];
    for (const target of observationTargets) {
      try {
        const repo = await client.getRepository(target.full_name);
        observations.push(repo);
      } catch (error) {
        const warning = warningFor(error, target.full_name);
        warnings.push(warning);
        onWarning(warning);
      }
    }

    const completedAt = new Date().toISOString();
    database.transaction(() => {
      const discoveredIds = [];
      candidates.forEach((candidate, index) => {
        database.upsertRepository(candidate.repo, candidate.source, startedAt);
        database.recordSnapshot(candidate.repo, snapshotDate);
        for (const signal of candidate.signals) {
          database.recordTrendSignal(candidate.repo.id, signal, snapshotDate);
        }
        database.recordWeeklyDiscovery(
          candidate.repo.id,
          weekId,
          candidate.discoveryPool
            ? `${candidate.discoveryPool}:${candidate.source}`
            : candidate.source,
          index + 1,
          startedAt,
        );
        database.markWatchlistDiscovered(candidate.repo.id, weekId, startedAt);
        discoveredIds.push(candidate.repo.id);
      });
      observations.forEach((repo) => {
        database.upsertRepository(repo, 'watchlist-observation', startedAt);
        database.recordSnapshot(repo, snapshotDate);
      });
      database.advanceWatchlist(
        weekId,
        discoveredIds,
        config.watchlistRetentionWeeks ?? 4,
        completedAt,
      );
      database.completeWeeklyRun(weekId, completedAt, {
        discoveredCount: candidates.length,
        observedCount: observations.length,
        warnings,
      });
    });

    return {
      status: warnings.length ? 'completed_with_warnings' : 'completed',
      weekId,
      snapshotDate,
      discoveredCount: candidates.length,
      growthDiscoveredCount: candidates.filter((candidate) =>
        candidate.discoveryPool === 'growth').length,
      activeStarsDiscoveredCount: candidates.filter((candidate) =>
        candidate.discoveryPool === 'active-stars').length,
      observedCount: observations.length,
      warnings,
    };
  } catch (error) {
    database.failWeeklyRun(weekId, new Date().toISOString(), error.message);
    throw error;
  }
}
