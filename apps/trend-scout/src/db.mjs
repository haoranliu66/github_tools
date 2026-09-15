import {mkdirSync} from 'node:fs';
import {dirname} from 'node:path';
import {DatabaseSync} from 'node:sqlite';

const SCHEMA = `
PRAGMA journal_mode = WAL;
PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS repositories (
  repo_id INTEGER PRIMARY KEY,
  full_name TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL DEFAULT '',
  language TEXT,
  stars INTEGER NOT NULL DEFAULT 0,
  forks INTEGER NOT NULL DEFAULT 0,
  open_issues INTEGER NOT NULL DEFAULT 0,
  created_at TEXT,
  pushed_at TEXT,
  homepage TEXT,
  license TEXT,
  topics_json TEXT NOT NULL DEFAULT '[]',
  html_url TEXT NOT NULL,
  source TEXT NOT NULL,
  last_seen_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS snapshots (
  repo_id INTEGER NOT NULL,
  captured_on TEXT NOT NULL,
  stars INTEGER NOT NULL,
  forks INTEGER NOT NULL,
  open_issues INTEGER NOT NULL,
  pushed_at TEXT,
  PRIMARY KEY (repo_id, captured_on),
  FOREIGN KEY (repo_id) REFERENCES repositories(repo_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS trend_signals (
  repo_id INTEGER NOT NULL,
  observed_on TEXT NOT NULL,
  window TEXT NOT NULL,
  stars_gained INTEGER NOT NULL,
  rank INTEGER NOT NULL,
  language TEXT,
  source TEXT NOT NULL,
  PRIMARY KEY (repo_id, observed_on, window, source),
  FOREIGN KEY (repo_id) REFERENCES repositories(repo_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS weekly_runs (
  week_id TEXT PRIMARY KEY,
  snapshot_date TEXT,
  status TEXT NOT NULL,
  attempt_count INTEGER NOT NULL DEFAULT 0,
  started_at TEXT NOT NULL,
  completed_at TEXT,
  discovered_count INTEGER NOT NULL DEFAULT 0,
  observed_count INTEGER NOT NULL DEFAULT 0,
  warnings_json TEXT NOT NULL DEFAULT '[]',
  error_message TEXT,
  report_date TEXT,
  report_markdown_path TEXT,
  report_json_path TEXT
);

CREATE TABLE IF NOT EXISTS weekly_discoveries (
  week_id TEXT NOT NULL,
  repo_id INTEGER NOT NULL,
  source TEXT NOT NULL,
  discovery_rank INTEGER NOT NULL,
  discovered_at TEXT NOT NULL,
  PRIMARY KEY (week_id, repo_id),
  FOREIGN KEY (repo_id) REFERENCES repositories(repo_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS watchlist (
  repo_id INTEGER PRIMARY KEY,
  first_discovered_week TEXT NOT NULL,
  last_discovered_week TEXT NOT NULL,
  last_evaluated_week TEXT NOT NULL,
  missed_weeks INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'active',
  updated_at TEXT NOT NULL,
  FOREIGN KEY (repo_id) REFERENCES repositories(repo_id) ON DELETE CASCADE
);
`;

export class ScoutDatabase {
  constructor(filePath) {
    mkdirSync(dirname(filePath), {recursive: true});
    this.db = new DatabaseSync(filePath);
    this.db.exec(SCHEMA);
  }

  upsertRepository(repo, source, observedAt) {
    this.db.prepare(`
      INSERT INTO repositories (
        repo_id, full_name, description, language, stars, forks, open_issues,
        created_at, pushed_at, homepage, license, topics_json, html_url, source,
        last_seen_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(repo_id) DO UPDATE SET
        full_name = excluded.full_name,
        description = excluded.description,
        language = excluded.language,
        stars = excluded.stars,
        forks = excluded.forks,
        open_issues = excluded.open_issues,
        created_at = excluded.created_at,
        pushed_at = excluded.pushed_at,
        homepage = excluded.homepage,
        license = excluded.license,
        topics_json = excluded.topics_json,
        html_url = excluded.html_url,
        source = excluded.source,
        last_seen_at = excluded.last_seen_at
    `).run(
      repo.id,
      repo.full_name,
      repo.description ?? '',
      repo.language ?? null,
      repo.stargazers_count ?? 0,
      repo.forks_count ?? 0,
      repo.open_issues_count ?? 0,
      repo.created_at ?? null,
      repo.pushed_at ?? null,
      repo.homepage ?? null,
      repo.license?.spdx_id ?? null,
      JSON.stringify(repo.topics ?? []),
      repo.html_url,
      source,
      observedAt,
    );
  }

  recordSnapshot(repo, capturedOn) {
    this.db.prepare(`
      INSERT INTO snapshots (repo_id, captured_on, stars, forks, open_issues, pushed_at)
      VALUES (?, ?, ?, ?, ?, ?)
      ON CONFLICT(repo_id, captured_on) DO UPDATE SET
        stars = excluded.stars,
        forks = excluded.forks,
        open_issues = excluded.open_issues,
        pushed_at = excluded.pushed_at
    `).run(
      repo.id,
      capturedOn,
      repo.stargazers_count ?? 0,
      repo.forks_count ?? 0,
      repo.open_issues_count ?? 0,
      repo.pushed_at ?? null,
    );
  }

  recordTrendSignal(repoId, signal, observedOn) {
    this.db.prepare(`
      INSERT INTO trend_signals (
        repo_id, observed_on, window, stars_gained, rank, language, source
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(repo_id, observed_on, window, source) DO UPDATE SET
        stars_gained = excluded.stars_gained,
        rank = excluded.rank,
        language = excluded.language
    `).run(
      repoId,
      observedOn,
      signal.window,
      signal.starsGained,
      signal.rank,
      signal.language || null,
      signal.source,
    );
  }

  transaction(callback) {
    this.db.exec('BEGIN IMMEDIATE');
    try {
      const result = callback();
      this.db.exec('COMMIT');
      return result;
    } catch (error) {
      this.db.exec('ROLLBACK');
      throw error;
    }
  }

  getWeeklyRun(weekId) {
    return this.db.prepare('SELECT * FROM weekly_runs WHERE week_id = ?').get(weekId) ?? null;
  }

  startWeeklyRun(weekId, snapshotDate, startedAt) {
    this.db.prepare(`
      INSERT INTO weekly_runs (
        week_id, snapshot_date, status, attempt_count, started_at, completed_at,
        discovered_count, observed_count, warnings_json, error_message
      ) VALUES (?, ?, 'running', 1, ?, NULL, 0, 0, '[]', NULL)
      ON CONFLICT(week_id) DO UPDATE SET
        snapshot_date = excluded.snapshot_date,
        status = 'running',
        attempt_count = weekly_runs.attempt_count + 1,
        started_at = excluded.started_at,
        completed_at = NULL,
        discovered_count = 0,
        observed_count = 0,
        warnings_json = '[]',
        error_message = NULL
    `).run(weekId, snapshotDate, startedAt);
  }

  failWeeklyRun(weekId, completedAt, errorMessage) {
    this.db.prepare(`
      UPDATE weekly_runs
      SET status = 'failed', completed_at = ?, error_message = ?
      WHERE week_id = ?
    `).run(completedAt, String(errorMessage ?? 'Unknown collection failure.'), weekId);
  }

  completeWeeklyRun(weekId, completedAt, {discoveredCount, observedCount, warnings = []}) {
    const status = warnings.length ? 'completed_with_warnings' : 'completed';
    this.db.prepare(`
      UPDATE weekly_runs
      SET status = ?, completed_at = ?, discovered_count = ?, observed_count = ?,
          warnings_json = ?, error_message = NULL
      WHERE week_id = ?
    `).run(status, completedAt, discoveredCount, observedCount, JSON.stringify(warnings), weekId);
  }

  markWeeklyReport(weekId, reportDate, markdownPath, jsonPath) {
    this.db.prepare(`
      UPDATE weekly_runs
      SET report_date = ?, report_markdown_path = ?, report_json_path = ?
      WHERE week_id = ?
    `).run(reportDate, markdownPath, jsonPath, weekId);
  }

  hasAnyWeeklyDiscovery() {
    return this.db.prepare('SELECT 1 AS found FROM weekly_discoveries LIMIT 1').get() !== undefined;
  }

  getRepositoryByFullName(fullName) {
    const row = this.db.prepare('SELECT * FROM repositories WHERE full_name = ?').get(fullName);
    return row ? {...row, topics: JSON.parse(row.topics_json || '[]')} : null;
  }

  recordWeeklyDiscovery(repoId, weekId, source, discoveryRank, discoveredAt) {
    this.db.prepare(`
      INSERT INTO weekly_discoveries (week_id, repo_id, source, discovery_rank, discovered_at)
      VALUES (?, ?, ?, ?, ?)
      ON CONFLICT(week_id, repo_id) DO UPDATE SET
        source = excluded.source,
        discovery_rank = excluded.discovery_rank,
        discovered_at = excluded.discovered_at
    `).run(weekId, repoId, source, discoveryRank, discoveredAt);
  }

  markWatchlistDiscovered(repoId, weekId, updatedAt) {
    this.db.prepare(`
      INSERT INTO watchlist (
        repo_id, first_discovered_week, last_discovered_week, last_evaluated_week,
        missed_weeks, status, updated_at
      ) VALUES (?, ?, ?, ?, 0, 'active', ?)
      ON CONFLICT(repo_id) DO UPDATE SET
        last_discovered_week = excluded.last_discovered_week,
        last_evaluated_week = excluded.last_evaluated_week,
        missed_weeks = 0,
        status = 'active',
        updated_at = excluded.updated_at
    `).run(repoId, weekId, weekId, weekId, updatedAt);
  }

  advanceWatchlist(weekId, discoveredRepoIds, retentionWeeks, updatedAt) {
    const discovered = new Set(discoveredRepoIds);
    const rows = this.db.prepare(`
      SELECT repo_id, missed_weeks, last_evaluated_week
      FROM watchlist WHERE status = 'active'
    `).all();
    const update = this.db.prepare(`
      UPDATE watchlist
      SET missed_weeks = ?, status = ?, last_evaluated_week = ?, updated_at = ?
      WHERE repo_id = ?
    `);
    for (const row of rows) {
      if (discovered.has(row.repo_id) || row.last_evaluated_week === weekId) continue;
      const missedWeeks = row.missed_weeks + 1;
      update.run(
        missedWeeks,
        missedWeeks >= retentionWeeks ? 'archived' : 'active',
        weekId,
        updatedAt,
        row.repo_id,
      );
    }
  }

  listWeeklyDiscoveries(weekId) {
    return this.db.prepare(`
      SELECT r.*, d.source AS discovery_source, d.discovery_rank, d.discovered_at
      FROM weekly_discoveries d
      JOIN repositories r ON r.repo_id = d.repo_id
      WHERE d.week_id = ?
      ORDER BY d.discovery_rank ASC
    `).all(weekId).map((row) => ({...row, topics: JSON.parse(row.topics_json || '[]')}));
  }

  listActiveWatchlist() {
    return this.db.prepare(`
      SELECT r.*, w.first_discovered_week, w.last_discovered_week,
             w.last_evaluated_week, w.missed_weeks, w.status AS watchlist_status
      FROM watchlist w
      JOIN repositories r ON r.repo_id = w.repo_id
      WHERE w.status = 'active'
      ORDER BY w.last_discovered_week DESC, r.full_name ASC
    `).all().map((row) => ({...row, topics: JSON.parse(row.topics_json || '[]')}));
  }

  listRepositories() {
    return this.db.prepare('SELECT * FROM repositories').all().map((row) => ({
      ...row,
      topics: JSON.parse(row.topics_json || '[]'),
    }));
  }

  listSnapshots(repoId) {
    return this.db.prepare(`
      SELECT * FROM snapshots WHERE repo_id = ? ORDER BY captured_on ASC
    `).all(repoId);
  }

  listSignals(repoId, sinceDate) {
    return this.db.prepare(`
      SELECT * FROM trend_signals
      WHERE repo_id = ? AND observed_on >= ?
      ORDER BY observed_on DESC
    `).all(repoId, sinceDate);
  }

  close() {
    this.db.close();
  }
}
