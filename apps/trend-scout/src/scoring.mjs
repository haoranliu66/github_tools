const DAY_MS = 86_400_000;

const SCORE_LIMITS = Object.freeze({
  absoluteGrowth: 30,
  relativeGrowth: 15,
  acceleration: 10,
  maintenanceActivity: 8,
  totalStars: 30,
  trendTotal: 93,
  demoability: 7,
  finalTotal: 100,
});

function finiteSetting(config, key, fallback, {minimum = 0, strictlyPositive = false} = {}) {
  const value = config?.[key] ?? fallback;
  const validBoundary = strictlyPositive ? value > minimum : value >= minimum;
  if (!Number.isFinite(value) || !validBoundary) {
    const requirement = strictlyPositive ? 'positive' : 'non-negative';
    throw new Error(`Scoring setting ${key} must be a finite ${requirement} number.`);
  }
  return value;
}

function scoringSettings(config) {
  return {
    candidateWindowDays: finiteSetting(config, 'candidateWindowDays', 7, {strictlyPositive: true}),
    absoluteGrowthThreshold: finiteSetting(config, 'absoluteGrowthThreshold', 5000),
    absoluteGrowthStep: finiteSetting(config, 'absoluteGrowthStep', 5000, {strictlyPositive: true}),
    relativeGrowthBaselineFloor: finiteSetting(config, 'relativeGrowthBaselineFloor', 5000,
      {strictlyPositive: true}),
  };
}

function round(value, digits = 2) {
  return Number(value.toFixed(digits));
}

function nonNegativeNumber(value) {
  return Number.isFinite(value) ? Math.max(0, value) : 0;
}

function daysBetween(a, b) {
  const difference = new Date(a).getTime() - new Date(b).getTime();
  return Number.isFinite(difference) ? Math.max(0, difference / DAY_MS) : 365;
}

function closestSnapshotAtOrBefore(snapshots, targetTime, maxStalenessMs = Infinity) {
  return [...snapshots]
    .filter((snapshot) => {
      const capturedAt = new Date(snapshot.captured_on).getTime();
      return Number.isFinite(capturedAt) && capturedAt <= targetTime &&
        targetTime - capturedAt <= maxStalenessMs;
    })
    .sort((a, b) => b.captured_on.localeCompare(a.captured_on))[0] ?? null;
}

function fallbackTrendSignal(signals) {
  const usable = (window) => signals
    .filter((signal) => signal.window === window && Number.isFinite(signal.stars_gained))
    .map((signal) => Math.max(0, signal.stars_gained));
  const weekly = usable('weekly');
  if (weekly.length) return Math.max(...weekly);
  const daily = usable('daily');
  if (daily.length) return Math.max(...daily) * 4;
  return 0;
}

function absoluteGrowthPoints(growth, settings) {
  if (growth <= settings.absoluteGrowthThreshold) return 0;
  return Math.min(
    SCORE_LIMITS.absoluteGrowth,
    3 * (growth - settings.absoluteGrowthThreshold) / settings.absoluteGrowthStep,
  );
}

function totalStarsPoints(stars) {
  return Math.min(SCORE_LIMITS.totalStars, 5 * Math.log10(Math.max(1, stars)));
}

export function scoreRepository(repo, snapshots, signals, config, now = new Date()) {
  const settings = scoringSettings(config);
  const sorted = [...snapshots].sort((a, b) => a.captured_on.localeCompare(b.captured_on));
  const latest = sorted.at(-1) ?? null;
  const sevenDaysAgo = now.getTime() - 7 * DAY_MS;
  const fourteenDaysAgo = now.getTime() - 14 * DAY_MS;
  const weekStart = closestSnapshotAtOrBefore(sorted, sevenDaysAgo, DAY_MS);
  const previousWeekStart = closestSnapshotAtOrBefore(sorted, fourteenDaysAgo, DAY_MS);
  const latestIsCurrent = latest?.captured_on === now.toISOString().slice(0, 10);

  const measuredGrowth = latestIsCurrent && weekStart
    ? Math.max(0, nonNegativeNumber(latest.stars) - nonNegativeNumber(weekStart.stars))
    : null;
  const fallbackGrowth = fallbackTrendSignal(signals);
  const growth = measuredGrowth ?? fallbackGrowth;
  const canClaimSevenDayGrowth = measuredGrowth !== null;

  const currentStars = nonNegativeNumber(repo.stars);
  const totalStarsBasis = canClaimSevenDayGrowth
    ? nonNegativeNumber(weekStart.stars)
    : fallbackGrowth > 0
      ? Math.max(0, currentStars - fallbackGrowth)
      : currentStars;
  const totalStarsBasisSource = canClaimSevenDayGrowth
    ? 'local-week-start'
    : fallbackGrowth > 0
      ? 'estimated-week-start'
      : 'current-stars-fallback';

  const denominator = Math.max(totalStarsBasis, settings.relativeGrowthBaselineFloor);
  const relativeGrowthRateDecimal = growth > 0 ? growth / denominator : null;
  const relativeGrowthScore = relativeGrowthRateDecimal === null
    ? null
    : Math.min(SCORE_LIMITS.relativeGrowth, relativeGrowthRateDecimal * 10);

  const previousGrowth = canClaimSevenDayGrowth && previousWeekStart
    ? Math.max(0, nonNegativeNumber(weekStart.stars) - nonNegativeNumber(previousWeekStart.stars))
    : null;
  const previousRelativeGrowthRateDecimal = previousGrowth === null
    ? null
    : previousGrowth / Math.max(
      nonNegativeNumber(previousWeekStart.stars),
      settings.relativeGrowthBaselineFloor,
    );
  const accelerationRateDecimal = canClaimSevenDayGrowth && relativeGrowthRateDecimal !== null &&
    previousRelativeGrowthRateDecimal !== null
    ? Math.max(0, relativeGrowthRateDecimal - previousRelativeGrowthRateDecimal)
    : null;
  const accelerationScore = accelerationRateDecimal === null
    ? null
    : Math.min(SCORE_LIMITS.acceleration, accelerationRateDecimal * 10);

  const freshnessDays = repo.pushed_at ? daysBetween(now, repo.pushed_at) : 365;
  const maintenanceActivityScore = Math.max(
    0,
    SCORE_LIMITS.maintenanceActivity * (1 - freshnessDays / 7),
  );
  const totalStarsScore = totalStarsPoints(totalStarsBasis);
  const absoluteGrowthScore = absoluteGrowthPoints(growth, settings);
  const scoreCompleteness = SCORE_LIMITS.absoluteGrowth +
    (relativeGrowthScore === null ? 0 : SCORE_LIMITS.relativeGrowth) +
    (accelerationScore === null ? 0 : SCORE_LIMITS.acceleration) +
    SCORE_LIMITS.maintenanceActivity + SCORE_LIMITS.totalStars;
  const trendScore = absoluteGrowthScore + (relativeGrowthScore ?? 0) +
    (accelerationScore ?? 0) + maintenanceActivityScore + totalStarsScore;

  return {
    score: round(trendScore),
    trendScore: round(trendScore),
    trendScoreMax: SCORE_LIMITS.trendTotal,
    absoluteGrowthScore: round(absoluteGrowthScore),
    relativeGrowthRate: relativeGrowthRateDecimal === null ? null : round(relativeGrowthRateDecimal * 100),
    relativeGrowthScore: relativeGrowthScore === null ? null : round(relativeGrowthScore),
    relativeGrowthStatus: canClaimSevenDayGrowth
      ? 'measured'
      : relativeGrowthRateDecimal === null ? 'unavailable' : 'provisional',
    previousRelativeGrowthRate: previousRelativeGrowthRateDecimal === null
      ? null
      : round(previousRelativeGrowthRateDecimal * 100),
    accelerationRate: accelerationRateDecimal === null ? null : round(accelerationRateDecimal * 100),
    accelerationScore: accelerationScore === null ? null : round(accelerationScore),
    maintenanceActivityScore: round(maintenanceActivityScore),
    totalStarsBasis,
    totalStarsBasisSource,
    totalStarsScore: round(totalStarsScore),
    demoabilityScore: null,
    demoabilityScoreMax: SCORE_LIMITS.demoability,
    finalScore: null,
    finalScoreMax: SCORE_LIMITS.finalTotal,
    scoreStatus: scoreCompleteness === SCORE_LIMITS.trendTotal ? 'complete' : 'provisional',
    scoreCompleteness,
    growth,
    growthSource: canClaimSevenDayGrowth ? 'local-net-snapshots' : 'github-trending-cold-start',
    growthMeasurementStatus: canClaimSevenDayGrowth ? 'ready' : 'cold-start',
    canClaimSevenDayGrowth,
    growthLabel: canClaimSevenDayGrowth
      ? '本地七日净增长'
      : 'GitHub Trending 冷启动信号（非本地七日实测）',
    freshnessDays: round(freshnessDays, 1),
    missingLicense: !repo.license,
  };
}

export function rankRepositories(database, config, now = new Date()) {
  const settings = scoringSettings(config);
  const since = new Date(now.getTime() - 14 * DAY_MS).toISOString().slice(0, 10);
  const recentCutoff = now.getTime() - settings.candidateWindowDays * DAY_MS;
  return database.listRepositories()
    .filter((repo) => {
      const lastSeenAt = new Date(repo.last_seen_at).getTime();
      return Number.isFinite(lastSeenAt) && lastSeenAt >= recentCutoff;
    })
    .map((repo) => ({
      repo,
      metrics: scoreRepository(
        repo,
        database.listSnapshots(repo.repo_id),
        database.listSignals(repo.repo_id, since),
        config,
        now,
      ),
    }))
    .filter(({metrics}) => metrics.growth > 0)
    .sort((a, b) => b.metrics.trendScore - a.metrics.trendScore ||
      String(a.repo.full_name ?? '').localeCompare(String(b.repo.full_name ?? '')));
}

export function rankWeeklyRepositories(database, config, now, weekId) {
  const current = database.listWeeklyDiscoveries(weekId);
  if (!current.length) {
    throw new Error(`No discovery pool exists for ${weekId}. Run weekly collection first.`);
  }
  const currentIds = new Set(current.map((repo) => repo.repo_id));
  const scoredCurrent = current.map((repo) => {
    const metrics = scoreRepository(
      repo,
      database.listSnapshots(repo.repo_id),
      database.listSignals(repo.repo_id, new Date(now.getTime() - 14 * DAY_MS).toISOString().slice(0, 10)),
      config,
      now,
    );
    return {
      repo,
      metrics: {
        ...metrics,
        rawTrendScore: metrics.trendScore,
        rankingStatus: 'current-discovery',
        discoveredThisWeek: true,
        eligibleForResearch: true,
        zeroScoreReason: null,
      },
    };
  });

  const notRediscovered = database.listActiveWatchlist()
    .filter((repo) => !currentIds.has(repo.repo_id))
    .map((repo) => {
      const observed = scoreRepository(
        repo,
        database.listSnapshots(repo.repo_id),
        database.listSignals(repo.repo_id, new Date(now.getTime() - 14 * DAY_MS).toISOString().slice(0, 10)),
        config,
        now,
      );
      return {
        repo,
        metrics: {
          ...observed,
          score: 0,
          trendScore: 0,
          rawTrendScore: observed.trendScore,
          rankingStatus: 'not-rediscovered',
          discoveredThisWeek: false,
          eligibleForResearch: false,
          zeroScoreReason: 'not-rediscovered-this-week',
        },
      };
    });

  return [...scoredCurrent, ...notRediscovered].sort((a, b) => {
    if (a.metrics.eligibleForResearch !== b.metrics.eligibleForResearch) {
      return a.metrics.eligibleForResearch ? -1 : 1;
    }
    return b.metrics.trendScore - a.metrics.trendScore ||
      String(a.repo.full_name ?? '').localeCompare(String(b.repo.full_name ?? ''));
  });
}
