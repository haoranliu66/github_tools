import {basename, dirname, join, resolve} from 'node:path';

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

function parsedDate(dateString) {
  if (!DATE_PATTERN.test(dateString ?? '')) {
    throw new Error(`Invalid snapshot date: ${dateString}`);
  }
  const [year, month, day] = dateString.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  if (date.toISOString().slice(0, 10) !== dateString) {
    throw new Error(`Invalid snapshot date: ${dateString}`);
  }
  return {date, year, month, day};
}

export function safeRepositoryName(fullName) {
  if (!/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(fullName ?? '')) {
    throw new Error(`Invalid repository name: ${fullName}`);
  }
  return fullName.replace('/', '--').replace(/[^A-Za-z0-9_.-]/g, '-');
}

export function reportDateFromPath(reportPath) {
  const match = basename(reportPath ?? '').match(/^(\d{4}-\d{2}-\d{2})\.json$/);
  if (!match) throw new Error('The trend report filename must use YYYY-MM-DD.json.');
  parsedDate(match[1]);
  return match[1];
}

export function monthWeekNumber(dateString) {
  const {year, month, day} = parsedDate(dateString);
  const firstWeekday = (new Date(Date.UTC(year, month - 1, 1)).getUTCDay() + 6) % 7;
  return Math.floor((firstWeekday + day - 1) / 7) + 1;
}

export function projectDirectoryName(snapshotDate, fullName) {
  const {year, month} = parsedDate(snapshotDate);
  const week = monthWeekNumber(snapshotDate);
  return `${year}年${String(month).padStart(2, '0')}月第${week}周-${safeRepositoryName(fullName)}`;
}

export function trendReportWeekDirectory(projectRoot, weekId) {
  if (!/^\d{4}-W\d{2}$/.test(weekId ?? '')) throw new Error(`Invalid ISO week: ${weekId}`);
  return join(projectRoot, 'apps', 'trend-scout', 'trend_reports', weekId);
}

export function selectionPathForReport(reportPath) {
  return join(dirname(resolve(reportPath)), 'selection.json');
}

export function finalRankingWeekDirectory(projectRoot, weekId) {
  if (!/^\d{4}-W\d{2}$/.test(weekId ?? '')) throw new Error(`Invalid ISO week: ${weekId}`);
  return join(projectRoot, 'apps', 'repo-researcher', 'final_rank', weekId);
}

export function projectLayout(projectRoot, {snapshotDate, fullName}) {
  const projectDirectory = join(
    projectRoot,
    'output',
    'videos',
    projectDirectoryName(snapshotDate, fullName),
  );
  const resourcesDirectory = join(projectDirectory, 'resources');
  const productionDirectory = join(resourcesDirectory, 'production');
  return {
    projectDirectory,
    resourcesDirectory,
    productionDirectory,
    storyboardPath: join(productionDirectory, 'storyboard.json'),
    videoPath: join(projectDirectory, 'final.mp4'),
  };
}

export function projectLayoutFromSelection(projectRoot, selection, fullName) {
  return projectLayout(projectRoot, {
    snapshotDate: reportDateFromPath(selection?.sourceReport),
    fullName,
  });
}
