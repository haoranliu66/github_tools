import {createHash} from 'node:crypto';
import {existsSync, readFileSync} from 'node:fs';
import {join, dirname, resolve} from 'node:path';
import {loadCreativePlan, loadLibraries} from './creative-plan.mjs';
import {assertEditorialContractMetadata} from '../../repo-researcher/src/editorial-contract.mjs';

export const EDITORIAL_PLAN_FILE = 'editorial-plan.json';
export const EDITORIAL_FEEDBACK_FILE = 'editorial-feedback.md';
const EDITING_SKILL = join('.agents', 'skills', 'video-editorial-agent', 'SKILL.md');
export const sha256 = value => createHash('sha256').update(value).digest('hex');

export function loadVideoEditingSkill(projectRoot) {
  const path = join(projectRoot, EDITING_SKILL);
  const content = readFileSync(path, 'utf8');
  if (!content.replaceAll('\r\n', '\n').startsWith('---\nname: video-editorial-agent\n')) {
    throw new Error('Video editorial agent Skill has invalid frontmatter: ' + path);
  }
  return {path, content, digest: sha256(content)};
}

export function loadEditorialFeedback(resourcesDirectory) {
  const path = join(resourcesDirectory, EDITORIAL_FEEDBACK_FILE);
  const text = existsSync(path) ? readFileSync(path, 'utf8').trim() : '';
  return {path, text, digest: sha256(text)};
}

export function loadEditorialPlan({resourcesDirectory, fullName, researchText, contract, editingSkill}) {
  const path = join(resourcesDirectory, EDITORIAL_PLAN_FILE);
  let plan, research;
  try {
    plan = JSON.parse(readFileSync(path, 'utf8'));
    research = JSON.parse(researchText);
  } catch (error) {
    throw new Error('Production plan or research is missing or unreadable: ' + path + '. Run pnpm video:plan. ' + error.message);
  }
  if (plan.schemaVersion !== 3 || plan.workflow !== 'scoped-production-package' ||
      research.schemaVersion !== 3 || research.workflow !== 'scoped-production-package') {
    throw new Error('Only the current scoped-production-package is supported; regenerate with pnpm video:plan.');
  }
  assertEditorialContractMetadata(research.editorialContract, contract);
  if (plan.fullName !== fullName || research.project?.url !== 'https://github.com/' + fullName ||
      plan.researchDigest !== sha256(researchText) || plan.editorialContractDigest !== contract.digest ||
      plan.editingSkillDigest !== editingSkill.digest ||
      plan.feedbackDigest !== loadEditorialFeedback(resourcesDirectory).digest) {
    throw new Error('Production plan is stale for ' + fullName + '; run pnpm video:plan again.');
  }
  if (!plan.preproduction?.designContext?.trim() || !Array.isArray(plan.preproduction.shots) ||
      !plan.preproduction.shots.length || !Array.isArray(plan.preproduction.assets)) {
    throw new Error('Current production plan requires complete preproduction design and materials.');
  }
  const projectRoot = resolve(dirname(editingSkill.path), '../../..');
  return {path, ...loadCreativePlan(plan, researchText, loadLibraries(projectRoot, {fullName}))};
}
