#!/usr/bin/env node
import {createHash} from 'node:crypto';
import {copyFileSync, existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync} from 'node:fs';
import {dirname, join, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {loadSelection} from '../../trend-scout/src/selection.mjs';
import {projectLayoutFromSelection} from '../../shared/pipeline-paths.mjs';
import {assertEditorialResearch, loadEditorialContract} from '../../repo-researcher/src/editorial-contract.mjs';
import {assertEditorialQuality, loadEditorialConfig} from './editorial-quality.mjs';
import {applyEditorialDraft, loadEditorialFeedback, loadVideoEditingSkill, makeEditorialPlan, sha256} from './editorial-agent.mjs';
import {markdownPlan} from './plan-cli.mjs';
import {wavDuration} from './narration.mjs';
import {validateStoryboard} from './storyboard.mjs';

const PROJECT_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../../..');

function option(name) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : null;
}

function digest(value) {
  return createHash('sha256').update(value).digest('hex');
}

function applyTreatment(beat, value) {
  if (value?.nodes && value?.edges) {
    beat.canvas = value;
    beat.shot = null;
    beat.stage = null;
    return;
  }
  if (value?.visualMode) {
    beat.visualMode = value.visualMode;
    beat.canvas = value.canvas ?? null;
    beat.shot = value.shot ?? null;
    beat.stage = value.stage ?? null;
    beat.entrance = value.entrance ?? beat.entrance ?? 'fade';
    return;
  }
  beat.canvas = null;
  beat.shot = null;
  beat.stage = null;
}

function applyCanvases(draft, overrides) {
  const beats = draft.visualEvidencePackage.visualBeats;
  const knownIds = new Set(beats.map((beat) => beat.id));
  for (const id of Object.keys(overrides.visualBeats ?? {})) {
    if (!knownIds.has(id)) throw new Error(`Unknown visual beat override: ${id}`);
  }
  applyTreatment(draft.visualEvidencePackage.hookMoment, overrides.hookMoment);
  for (const beat of beats) {
    const value = overrides.visualBeats?.[beat.id];
    const mode = value?.visualMode ?? beat.visualMode;
    if (['progressive-flow', 'compare', 'statement', 'object-action'].includes(mode) &&
        !Object.hasOwn(overrides.visualBeats ?? {}, beat.id)) {
      throw new Error(`Visual-only revision requires a canvas or stage for structured beat ${beat.id}.`);
    }
    applyTreatment(beat, value);
  }
  return draft;
}

export function applyVisualOnlyBeatChanges(episode, visualPackage, planDigest) {
  const updated = structuredClone(episode);
  const treatments = new Map([
    ['hook-moment', visualPackage.hookMoment],
    ...visualPackage.visualBeats.map((beat) => [beat.id, beat]),
  ]);
  for (const scene of updated.scenes) {
    for (const beat of scene.visualBeats ?? []) {
      if (!treatments.has(beat.id)) continue;
      const treatment = treatments.get(beat.id);
      if (treatment.visualMode) beat.visualMode = treatment.visualMode;
      if (treatment.entrance) beat.entrance = treatment.entrance;
      if (treatment.shot) beat.shot = treatment.shot;
      else delete beat.shot;
      if (treatment.canvas) beat.canvas = treatment.canvas;
      else delete beat.canvas;
      if (treatment.stage) beat.stage = treatment.stage;
      else delete beat.stage;
    }
  }
  updated.meta.editorialPlanDigest = planDigest;
  return updated;
}

function main() {
  const selectionPath = option('--selection');
  const fullName = option('--repo');
  const overridesPath = option('--canvas-overrides');
  if (!selectionPath || !fullName || !overridesPath) {
    throw new Error('Usage: revisualize-cli.mjs --selection PATH --repo owner/name --canvas-overrides PATH');
  }
  const {selection} = loadSelection(selectionPath, {requireApproved: true});
  if (!selection.videoProjects.includes(fullName)) throw new Error(`Video project is not approved: ${fullName}`);
  const layout = projectLayoutFromSelection(PROJECT_ROOT, selection, fullName);
  const resources = layout.resourcesDirectory;
  const production = dirname(layout.storyboardPath);
  const researchText = readFileSync(join(resources, 'research.json'), 'utf8');
  const research = JSON.parse(researchText);
  const contract = loadEditorialContract(PROJECT_ROOT);
  assertEditorialResearch(research, contract);
  const editingSkill = loadVideoEditingSkill(PROJECT_ROOT);
  const feedback = loadEditorialFeedback(resources);
  const oldPlanPath = join(resources, 'editorial-plan.json');
  const oldPlan = JSON.parse(readFileSync(oldPlanPath, 'utf8'));
  if (oldPlan.schemaVersion !== 2 || oldPlan.fullName !== fullName ||
      oldPlan.researchDigest !== sha256(researchText) ||
      oldPlan.editorialContractDigest !== contract.digest ||
      oldPlan.feedbackDigest !== feedback.digest) {
    throw new Error('Existing editorial plan does not match the approved research or feedback.');
  }
  applyEditorialDraft(structuredClone(research), oldPlan.draft, contract);
  const storyboardPath = layout.storyboardPath;
  const storyboardText = readFileSync(storyboardPath, 'utf8');
  const storyboard = JSON.parse(storyboardText);
  const sourcePath = join(production, 'episode.source.json');
  const source = JSON.parse(readFileSync(sourcePath, 'utf8'));
  const oldDigest = sha256(JSON.stringify(oldPlan));
  const ranking = JSON.parse(readFileSync(join(PROJECT_ROOT,
    'apps/repo-researcher/final_rank', selection.weekId, 'final-ranking.json'), 'utf8'));
  const row = ranking.rows.find((item) => item.fullName === fullName);
  if (!row?.videoApproved || row.researchStatus !== 'completed' ||
      row.editorialPlanDigest !== oldDigest || row.storyboardDigest !== digest(storyboardText) ||
      storyboard.meta?.editorialPlanDigest !== oldDigest || source.meta?.editorialPlanDigest !== oldDigest) {
    throw new Error('Existing production is not the approved version in the current final ranking.');
  }
  const voicePath = join(production, storyboard.voiceover ?? '');
  if (storyboard.voiceover !== 'narration.wav' || !existsSync(voicePath)) {
    throw new Error('Existing narration.wav is required; this command never synthesizes audio.');
  }
  const voiceHash = digest(readFileSync(voicePath));
  const duration = wavDuration(readFileSync(voicePath));
  const frames = storyboard.scenes.reduce((sum, scene) => sum + Math.round(scene.duration * storyboard.meta.fps), 0);
  if (Math.abs(duration - frames / storyboard.meta.fps) > 1 / storyboard.meta.fps) {
    throw new Error('Existing narration duration does not match the approved storyboard.');
  }
  const overrides = JSON.parse(readFileSync(resolve(overridesPath), 'utf8'));
  if (overrides.schemaVersion !== 1 || overrides.fullName !== fullName) {
    throw new Error('Canvas overrides do not match the approved project.');
  }
  const draft = applyCanvases(structuredClone(oldPlan.draft), overrides);
  if (JSON.stringify(draft.video) !== JSON.stringify(oldPlan.draft.video)) {
    throw new Error('Visual-only revision must preserve every word of the existing narration.');
  }
  const plan = makeEditorialPlan({fullName, researchText, contract, editingSkill,
    feedbackText: feedback.text, draft});
  const planDigest = sha256(JSON.stringify(plan));
  const updatedStoryboard = applyVisualOnlyBeatChanges(storyboard, draft.visualEvidencePackage, planDigest);
  const updatedSource = applyVisualOnlyBeatChanges(source, draft.visualEvidencePackage, planDigest);
  const config = loadEditorialConfig(join(PROJECT_ROOT, 'config/video-editorial.json'));
  const preparedReport = assertEditorialQuality(updatedStoryboard, config);
  const planningReport = assertEditorialQuality(updatedSource, config);
  const errors = validateStoryboard(updatedStoryboard);
  if (errors.length) throw new Error(errors.join('\n'));
  if (JSON.stringify(updatedStoryboard.scenes.map((scene) => ({
    duration: scene.duration, captions: scene.captions,
  }))) !== JSON.stringify(storyboard.scenes.map((scene) => ({
    duration: scene.duration, captions: scene.captions,
  })))) {
    throw new Error('Visual-only revision changed approved narration timing.');
  }
  const qaPath = join(production, 'qa-report.json');
  const qa = JSON.parse(readFileSync(qaPath, 'utf8'));
  qa.editorialPlanDigest = planDigest;
  qa.planning = planningReport;
  qa.prepared = preparedReport;
  const changes = new Map([
    [oldPlanPath, `${JSON.stringify(plan, null, 2)}\n`],
    [join(resources, 'editorial-plan.md'), markdownPlan(plan, planningReport)],
    [storyboardPath, `${JSON.stringify(updatedStoryboard, null, 2)}\n`],
    [sourcePath, `${JSON.stringify(updatedSource, null, 2)}\n`],
    [qaPath, `${JSON.stringify(qa, null, 2)}\n`],
  ]);
  const backup = mkdtempSync(join(resources, '.visual-only-backup-'));
  try {
    const entries = [...changes.entries()];
    entries.forEach(([target], index) => copyFileSync(target, join(backup, `old-${index}`)));
    try {
      entries.forEach(([target, value]) => writeFileSync(target, value, 'utf8'));
    } catch (error) {
      entries.forEach(([target], index) => copyFileSync(join(backup, `old-${index}`), target));
      throw error;
    }
  } finally {
    rmSync(backup, {recursive: true, force: true});
  }
  if (digest(readFileSync(voicePath)) !== voiceHash) throw new Error('Narration.wav changed unexpectedly.');
  console.log(`Visual-only plan and storyboard updated: ${storyboardPath}`);
  console.log(`Existing narration reused unchanged: ${voiceHash}`);
  console.log(`Next: regenerate ${selection.weekId} final ranking before render.`);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    main();
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
