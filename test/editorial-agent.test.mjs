import assert from 'node:assert/strict';
import {mkdtempSync, rmSync, writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join, resolve} from 'node:path';
import test from 'node:test';
import {loadEditorialContract} from '../apps/repo-researcher/src/editorial-contract.mjs';
import {completedResearchFixture, editorialDraftFixture} from './helpers/completed-research.mjs';
import {
  applyEditorialDraft, buildEditorialAgentPrompt, editorialPlanSchema,
  loadEditorialPlan, loadVideoEditingSkill, makeEditorialPlan,
} from '../apps/video-factory/src/editorial-agent.mjs';
import {readFileSync} from 'node:fs';

const projectRoot = resolve(import.meta.dirname, '..');
const contract = loadEditorialContract(projectRoot);
const editingSkill = loadVideoEditingSkill(projectRoot);
const researchSchema = JSON.parse(readFileSync(join(projectRoot,
  'apps/repo-researcher/schemas/research.schema.json'), 'utf8'));

function fixture() {
  const research = completedResearchFixture({contract});
  return {research, draft: editorialDraftFixture(research)};
}

test('editorial agent output schema excludes immutable research evidence', () => {
  const schema = editorialPlanSchema(researchSchema);
  assert.deepEqual(schema.required, ['editorialBrief', 'video', 'visualEvidencePackage']);
  assert.ok(!schema.properties.video.properties.visualAssets);
  assert.ok(!schema.properties.visualEvidencePackage.properties.evidenceAssets);
  assert.ok(!schema.properties.visualEvidencePackage.properties.demoMoments);
  assert.equal(schema.properties.visualEvidencePackage.properties.visualBeats.items.properties.narrationCue.type, 'string');
  assert.ok(schema.properties.visualEvidencePackage.properties.hookMoment.required.includes('canvas'));
  assert.ok(schema.properties.visualEvidencePackage.properties.visualBeats.items.required.includes('canvas'));
  assert.ok(schema.$defs.visualMode.enum.includes('object-action'));
  assert.ok(schema.properties.visualEvidencePackage.properties.visualBeats.items.properties.stage);
  assert.ok(!schema.properties.visualEvidencePackage.properties.productionMaterials);
});

test('editorial draft preserves claims, demo status and evidence assets', () => {
  const {research, draft} = fixture();
  const revised = applyEditorialDraft(research, draft, contract);
  assert.deepEqual(revised.claims, research.claims);
  assert.deepEqual(revised.demoPlan, research.demoPlan);
  assert.deepEqual(revised.visualEvidencePackage.evidenceAssets, research.visualEvidencePackage.evidenceAssets);
  assert.deepEqual(revised.video.visualAssets, research.video.visualAssets);
  assert.match(buildEditorialAgentPrompt(research, contract, editingSkill), /read-only|read.only/iu);
});

test('editorial plan becomes stale when research or the production skill changes', (t) => {
  const directory = mkdtempSync(join(tmpdir(), 'zimeiti-editorial-plan-test-'));
  t.after(() => rmSync(directory, {recursive: true, force: true}));
  const {research, draft} = fixture();
  const researchText = `${JSON.stringify(research, null, 2)}\n`;
  const fullName = 'fixture/approved';
  const plan = makeEditorialPlan({fullName, researchText, contract, editingSkill, draft});
  writeFileSync(join(directory, 'editorial-plan.json'), JSON.stringify(plan), 'utf8');
  const loaded = loadEditorialPlan({resourcesDirectory: directory, fullName, researchText, contract, editingSkill});
  assert.equal(loaded.research.video.fullNarration, draft.video.fullNarration);
  assert.equal(loaded.plan.researchDigest, plan.researchDigest);
  assert.throws(() => loadEditorialPlan({
    resourcesDirectory: directory, fullName, researchText: `${researchText} `, contract, editingSkill,
  }), /stale/u);
  assert.throws(() => loadEditorialPlan({
    resourcesDirectory: directory, fullName, researchText,
    contract: {...contract, digest: '0'.repeat(64)}, editingSkill,
  }), /stale/u);
  assert.throws(() => loadEditorialPlan({
    resourcesDirectory: directory, fullName, researchText, contract,
    editingSkill: {...editingSkill, digest: '0'.repeat(64)},
  }), /stale/u);
  writeFileSync(join(directory, 'editorial-feedback.md'), '请改成更简单的个人网站例子。', 'utf8');
  assert.throws(() => loadEditorialPlan({
    resourcesDirectory: directory, fullName, researchText, contract, editingSkill,
  }), /stale/u);
});

test('editorial agent rejects broken narration joins and invented visual evidence', () => {
  const {research, draft} = fixture();
  draft.video.fullNarration = '不是各段旁白的连接';
  assert.throws(() => applyEditorialDraft(research, draft, contract), /exactly join/u);
  draft.video.fullNarration = [draft.video.hook, ...draft.video.sections.map((section) => section.narration),
    draft.video.closing].join('');
  draft.visualEvidencePackage.visualBeats[0].assetIds = ['fabricated-image'];
  assert.throws(() => applyEditorialDraft(research, draft, contract), /known evidence asset ids/u);
});
