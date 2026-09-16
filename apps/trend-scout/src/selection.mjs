import {existsSync, mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {dirname, isAbsolute, relative, resolve, sep} from 'node:path';
import {isoWeekIdFromDateString} from './week.mjs';

const REPOSITORY_PATTERN = /^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/;

function insideRoot(root, target) {
  const normalizedRoot = `${resolve(root)}${sep}`.toLowerCase();
  return resolve(target).toLowerCase().startsWith(normalizedRoot);
}

export function validateSelection(selection, {requireApproved = false} = {}) {
  const errors = [];
  if (selection?.schemaVersion !== 1) errors.push('schemaVersion must be 1.');
  if (!/^\d{4}-W\d{2}$/.test(selection?.weekId ?? '')) errors.push('weekId must use YYYY-Www.');
  if (!['draft', 'approved'].includes(selection?.status)) errors.push('status must be draft or approved.');
  if (requireApproved && selection?.status !== 'approved') errors.push('selection must be approved.');
  if (typeof selection?.sourceReport !== 'string' || !selection.sourceReport.trim()) {
    errors.push('sourceReport is required.');
  }
  if (!Array.isArray(selection?.selectedRepositories) ||
      selection.selectedRepositories.length < 7 || selection.selectedRepositories.length > 8) {
    errors.push('selectedRepositories must contain 7 or 8 repositories.');
  } else {
    const unique = new Set(selection.selectedRepositories);
    if (unique.size !== selection.selectedRepositories.length) errors.push('selectedRepositories must be unique.');
    if (selection.selectedRepositories.some((name) => !REPOSITORY_PATTERN.test(name))) {
      errors.push('selectedRepositories must use owner/name format.');
    }
  }
  if (!Array.isArray(selection?.videoProjects)) {
    errors.push('videoProjects must be an array.');
  } else {
    const selected = new Set(selection?.selectedRepositories ?? []);
    if (new Set(selection.videoProjects).size !== selection.videoProjects.length) {
      errors.push('videoProjects must be unique.');
    }
    if (selection.videoProjects.some((name) => !selected.has(name))) {
      errors.push('videoProjects must be a subset of selectedRepositories.');
    }
  }
  if (selection?.videoStoryboards !== undefined) {
    if (!selection.videoStoryboards || Array.isArray(selection.videoStoryboards) ||
        typeof selection.videoStoryboards !== 'object') {
      errors.push('videoStoryboards must be an object.');
    } else {
      const approved = new Set(selection?.videoProjects ?? []);
      for (const [fullName, storyboardPath] of Object.entries(selection.videoStoryboards)) {
        if (!approved.has(fullName)) {
          errors.push('videoStoryboards keys must be approved in videoProjects.');
        }
        if (typeof storyboardPath !== 'string' || !storyboardPath.trim()) {
          errors.push('videoStoryboards values must be non-empty paths.');
        }
      }
    }
  }
  if (Array.isArray(selection?.videoProjects) && selection.videoProjects.length) {
    const mapped = new Set(Object.keys(selection?.videoStoryboards ?? {}));
    if (selection.videoProjects.some((name) => !mapped.has(name))) {
      errors.push('every videoProjects entry must have a videoStoryboards production mapping.');
    }
  }
  return errors;
}

export function loadSelection(filePath, {requireApproved = false} = {}) {
  const absolutePath = resolve(filePath);
  const selection = JSON.parse(readFileSync(absolutePath, 'utf8'));
  const errors = validateSelection(selection, {requireApproved});
  if (errors.length) throw new Error(`Invalid weekly selection:\n- ${errors.join('\n- ')}`);
  return {selection, absolutePath};
}

export function resolveSelectionProjectPath(projectRoot, pathValue) {
  const target = isAbsolute(pathValue) ? resolve(pathValue) : resolve(projectRoot, pathValue);
  if (!insideRoot(projectRoot, target)) throw new Error(`Selection path escapes project root: ${pathValue}`);
  return target;
}

export function createSelectionTemplate({projectRoot, reportPath, outputPath, count = 8}) {
  if (![7, 8].includes(count)) throw new Error('Research selection count must be 7 or 8.');
  const absoluteReport = resolveSelectionProjectPath(projectRoot, reportPath);
  if (!existsSync(absoluteReport)) throw new Error(`Trend report does not exist: ${absoluteReport}`);
  const rows = JSON.parse(readFileSync(absoluteReport, 'utf8'));
  if (!Array.isArray(rows)) throw new Error('Base trend report must be a JSON array.');
  const eligible = rows.filter((row) => row?.eligibleForResearch !== false &&
    row?.rankingStatus !== 'not-rediscovered');
  if (eligible.length < count) throw new Error(`Base trend report has only ${eligible.length} eligible projects.`);
  const reportDate = absoluteReport.match(/(\d{4}-\d{2}-\d{2})\.json$/)?.[1];
  const weekId = eligible[0]?.weekId ?? (reportDate ? isoWeekIdFromDateString(reportDate) : null);
  if (!weekId) throw new Error('Cannot determine the ISO week for the selection.');
  const absoluteOutput = resolveSelectionProjectPath(projectRoot, outputPath);
  if (existsSync(absoluteOutput)) {
    throw new Error(`Selection file already exists; refusing to overwrite human input: ${absoluteOutput}`);
  }
  const selection = {
    schemaVersion: 1,
    weekId,
    status: 'draft',
    sourceReport: relative(projectRoot, absoluteReport).replaceAll('\\', '/'),
    selectedRepositories: eligible.slice(0, count).map((row) => row.fullName),
    videoProjects: [],
    videoStoryboards: {},
    notes: '请人工调整为 7～8 个项目并把 status 改为 approved。研究完成后，再把获准制作视频的项目加入 videoProjects。',
  };
  mkdirSync(dirname(absoluteOutput), {recursive: true});
  writeFileSync(absoluteOutput, `${JSON.stringify(selection, null, 2)}\n`, 'utf8');
  return {selection, outputPath: absoluteOutput};
}
