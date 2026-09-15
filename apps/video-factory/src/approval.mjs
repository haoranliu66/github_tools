import {existsSync, readFileSync} from 'node:fs';
import {isAbsolute, resolve, sep} from 'node:path';

function resolveInside(root, value) {
  const target = isAbsolute(value) ? resolve(value) : resolve(root, value);
  const prefix = `${resolve(root)}${sep}`.toLowerCase();
  if (!target.toLowerCase().startsWith(prefix)) throw new Error('Storyboard path escapes the project root.');
  return target;
}

export function resolveApprovedStoryboard({projectRoot, finalRankingPath, fullName}) {
  if (!finalRankingPath || !fullName) {
    throw new Error('Rendering requires --final-ranking PATH and --repo owner/name.');
  }
  const ranking = JSON.parse(readFileSync(resolve(finalRankingPath), 'utf8'));
  const rows = Array.isArray(ranking) ? ranking : ranking.rows;
  if (!Array.isArray(rows)) throw new Error('Final ranking must contain a rows array.');
  const row = rows.find((item) => item.fullName === fullName);
  if (!row) throw new Error(`Repository is absent from the final ranking: ${fullName}`);
  if (!row.videoApproved) throw new Error(`Repository is not approved for video production: ${fullName}`);
  if (row.researchStatus !== 'completed' || !Number.isFinite(row.finalScore)) {
    throw new Error(`Repository does not have a complete researched final score: ${fullName}`);
  }
  if (typeof row.storyboardPath !== 'string' || !row.storyboardPath.trim()) {
    throw new Error(`Final ranking does not provide a storyboard for ${fullName}.`);
  }
  const storyboardPath = resolveInside(projectRoot, row.storyboardPath);
  if (!existsSync(storyboardPath)) throw new Error(`Approved storyboard does not exist: ${storyboardPath}`);
  return {row, storyboardPath};
}

