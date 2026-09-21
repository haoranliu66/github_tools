import {createHash} from 'node:crypto';
import {existsSync, readFileSync} from 'node:fs';
import {dirname, isAbsolute, join, resolve, sep} from 'node:path';
import {validateResearchResult} from '../../repo-researcher/src/artifacts.mjs';
import {loadEditorialContract} from '../../repo-researcher/src/editorial-contract.mjs';

function resolveInside(root, value) {
  const target = isAbsolute(value) ? resolve(value) : resolve(root, value);
  const prefix = `${resolve(root)}${sep}`.toLowerCase();
  if (!target.toLowerCase().startsWith(prefix)) throw new Error('Storyboard path escapes the project root.');
  return target;
}

function isInside(root, target) {
  const normalizedRoot = `${resolve(root)}${sep}`.toLowerCase();
  return resolve(target).toLowerCase().startsWith(normalizedRoot);
}

export function resolveApprovedStoryboard({projectRoot, finalRankingPath, fullName}) {
  if (!finalRankingPath || !fullName) {
    throw new Error('Rendering requires --final-ranking PATH and --repo owner/name.');
  }
  const rankingPath = resolveInside(projectRoot, finalRankingPath);
  const ranking = JSON.parse(readFileSync(rankingPath, 'utf8'));
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
  if (typeof row.projectPath !== 'string' || !row.projectPath.trim()) {
    throw new Error(`Final ranking does not provide a project directory for ${fullName}.`);
  }
  if (typeof row.videoPath !== 'string' || !row.videoPath.trim()) {
    throw new Error(`Final ranking does not provide a video path for ${fullName}.`);
  }
  if (typeof row.researchPath !== 'string' || !row.researchPath.trim()) {
    throw new Error(`Final ranking does not provide a research package for ${fullName}.`);
  }
  const projectDirectory = resolveInside(projectRoot, row.projectPath);
  const storyboardPath = resolveInside(projectRoot, row.storyboardPath);
  const videoPath = resolveInside(projectRoot, row.videoPath);
  const researchDirectory = resolveInside(projectRoot, row.researchPath);
  const researchPath = join(researchDirectory, 'research.json');
  if (!isInside(join(projectDirectory, 'resources'), storyboardPath)) {
    throw new Error(`Approved storyboard must stay inside the project resources directory: ${storyboardPath}`);
  }
  if (!isInside(join(projectDirectory, 'resources'), researchPath)) {
    throw new Error(`Research package must stay inside the approved project resources directory: ${researchPath}`);
  }
  if (dirname(videoPath).toLowerCase() !== projectDirectory.toLowerCase()) {
    throw new Error(`Final video must be written directly inside the project directory: ${videoPath}`);
  }
  if (!existsSync(storyboardPath)) throw new Error(`Approved storyboard does not exist: ${storyboardPath}`);
  if (!existsSync(researchPath)) throw new Error(`Approved research package does not exist: ${researchPath}`);

  const editorialContract = loadEditorialContract(projectRoot);
  const research = JSON.parse(readFileSync(researchPath, 'utf8'));
  validateResearchResult(research, {expectedEditorialContract: editorialContract});
  if (row.editorialContractDigest !== research.editorialContract.digest ||
      row.researchCommit !== research.project.versionOrCommit) {
    throw new Error(`Final ranking is stale for ${fullName}; regenerate it from the current research package.`);
  }

  const serializedStoryboard = readFileSync(storyboardPath, 'utf8');
  const storyboard = JSON.parse(serializedStoryboard);
  if (storyboard.meta?.editorialContractDigest !== research.editorialContract.digest ||
      storyboard.meta?.researchCommit !== research.project.versionOrCommit) {
    throw new Error(`Production storyboard is stale for ${fullName}; run video:prepare again.`);
  }
  const storyboardDigest = createHash('sha256').update(serializedStoryboard).digest('hex');
  if (row.storyboardDigest !== storyboardDigest) {
    throw new Error(`Production storyboard changed after final ranking for ${fullName}; regenerate the final ranking.`);
  }
  return {row, storyboardPath, researchPath, projectDirectory, videoPath};
}
