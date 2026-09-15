#!/usr/bin/env node
import {existsSync, readFileSync, readdirSync} from 'node:fs';
import {dirname, join, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {ScoutDatabase} from './db.mjs';
import {GitHubClient} from './github.mjs';
import {rankWeeklyRepositories} from './scoring.mjs';
import {summarizeRankingRows, writeRankingReport} from './report.mjs';
import {collectWeekly, isSuccessfulWeeklyRun, seedWatchlistFromReportRows} from './weekly-collection.mjs';
import {createSelectionTemplate} from './selection.mjs';
import {writeFinalRanking} from './final-report.mjs';
import {isoWeekIdFromDateString, localDateString, weekIdForDate} from './week.mjs';

const PROJECT_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../../..');

function optionValue(name, fallback = null) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : fallback;
}

function loadConfig() {
  const configPath = resolve(optionValue('--config', join(PROJECT_ROOT, 'config/trend-scout.json')));
  return JSON.parse(readFileSync(configPath, 'utf8'));
}

function seedLegacyWatchlist(database, config, now) {
  if (database.hasAnyWeeklyDiscovery()) return 0;
  const directory = join(PROJECT_ROOT, 'output/trend-reports');
  if (!existsSync(directory)) return 0;
  const currentDate = localDateString(now, config.timeZone);
  const file = readdirSync(directory)
    .filter((name) => /^\d{4}-\d{2}-\d{2}\.json$/.test(name) && name.slice(0, 10) < currentDate)
    .sort().at(-1);
  if (!file) return 0;
  const date = file.slice(0, 10);
  const rows = JSON.parse(readFileSync(join(directory, file), 'utf8'));
  const count = seedWatchlistFromReportRows(database, Array.isArray(rows) ? rows : [], {
    weekId: isoWeekIdFromDateString(date),
    observedAt: `${date}T12:00:00.000Z`,
  });
  if (count) console.log(`Seeded ${count} watchlist entries from ${file}.`);
  return count;
}

async function collect(database, config) {
  const client = new GitHubClient({token: process.env.GITHUB_TOKEN ?? ''});
  const now = new Date();
  seedLegacyWatchlist(database, config, now);
  const output = await collectWeekly({database, config, client, now});
  if (output.status === 'skipped') {
    console.log(`Weekly collection already completed for ${output.weekId}; no network requests were made.`);
  } else {
    console.log(`Weekly collection ${output.status} for ${output.weekId}: ` +
      `${output.discoveredCount} discovered ` +
      `(${output.growthDiscoveredCount} growth, ` +
      `${output.activeStarsDiscoveredCount} active-stars), ` +
      `${output.observedCount} watchlist observations, ` +
      `${output.warnings.length} warnings; snapshot ${output.snapshotDate}.`);
  }
  return output;
}

function report(database, config, {onlyIfMissing = false} = {}) {
  const weekId = weekIdForDate(new Date(), config.timeZone);
  const run = database.getWeeklyRun(weekId);
  if (!isSuccessfulWeeklyRun(run)) {
    throw new Error(`No successful weekly collection exists for ${weekId}.`);
  }
  if (onlyIfMissing && run.report_json_path && run.report_markdown_path &&
      existsSync(run.report_json_path) && existsSync(run.report_markdown_path)) {
    console.log(`Weekly report already exists for ${weekId}; skipping regeneration.`);
    return {status: 'skipped', weekId, markdownPath: run.report_markdown_path, jsonPath: run.report_json_path};
  }
  const date = run.snapshot_date;
  const rankingNow = new Date(`${date}T12:00:00.000Z`);
  const ranking = rankWeeklyRepositories(database, config, rankingNow, weekId);
  const output = writeRankingReport(
    ranking,
    join(PROJECT_ROOT, 'output/trend-reports'),
    date,
    {weekId},
  );
  database.markWeeklyReport(weekId, date, output.markdownPath, output.jsonPath);
  const summary = summarizeRankingRows(output.rows);
  console.log(`Wrote ${summary.eligible} eligible candidates for ${weekId}; ` +
    `${summary.ready} ready, ${summary.coldStart} cold-start, ` +
    `${summary.notRediscovered} not rediscovered.`);
  console.log(output.markdownPath);
  console.log(output.jsonPath);
  return {...output, status: 'completed', weekId};
}

async function main() {
  const command = process.argv[2] ?? 'all';
  if (!['collect', 'report', 'all', 'selection', 'finalize'].includes(command)) {
    throw new Error('Usage: cli.mjs <collect|report|all|selection|finalize> [options]');
  }
  const config = loadConfig();

  if (command === 'selection') {
    const reportPath = optionValue('--report');
    if (!reportPath) throw new Error('selection requires --report PATH.');
    const reportDate = resolve(reportPath).match(/(\d{4}-\d{2}-\d{2})\.json$/)?.[1];
    if (!reportDate) throw new Error('The report filename must use YYYY-MM-DD.json.');
    const weekId = isoWeekIdFromDateString(reportDate);
    const outputPath = optionValue('--output', join(PROJECT_ROOT, 'selections', `${weekId}.json`));
    const output = createSelectionTemplate({
      projectRoot: PROJECT_ROOT,
      reportPath,
      outputPath,
      count: Number(optionValue('--count', config.researchSelectionCount ?? 8)),
    });
    console.log(`Draft human selection written to ${output.outputPath}`);
    return;
  }

  if (command === 'finalize') {
    const selectionPath = optionValue('--selection');
    if (!selectionPath) throw new Error('finalize requires --selection PATH.');
    const output = writeFinalRanking({projectRoot: PROJECT_ROOT, selectionPath});
    console.log(`Final ranking written to ${output.markdownPath}`);
    console.log(output.jsonPath);
    return;
  }

  const database = new ScoutDatabase(join(PROJECT_ROOT, 'data/trend-scout.sqlite'));
  try {
    if (command === 'collect') await collect(database, config);
    if (command === 'report') report(database, config);
    if (command === 'all') {
      await collect(database, config);
      report(database, config, {onlyIfMissing: true});
    }
  } finally {
    database.close();
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
