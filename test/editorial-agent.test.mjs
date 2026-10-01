import assert from 'node:assert/strict';
import {mkdirSync, mkdtempSync, rmSync, writeFileSync} from 'node:fs';
import {join, resolve} from 'node:path';
import {tmpdir} from 'node:os';
import test from 'node:test';
import {loadEditorialContract} from '../apps/repo-researcher/src/editorial-contract.mjs';
import {loadEditorialFeedback, loadEditorialPlan, loadVideoEditingSkill, sha256} from '../apps/video-factory/src/editorial-agent.mjs';
import {loadLibraries} from '../apps/video-factory/src/creative-plan.mjs';
import {createProductionPackage} from '../apps/video-factory/src/production-package.mjs';
const projectRoot = resolve(import.meta.dirname, '..');

function fixture(t) {
  const directory = mkdtempSync(join(tmpdir(), 'zimeiti-current-plan-'));
  t.after(() => rmSync(directory, {recursive: true, force: true}));
  const contract = loadEditorialContract(projectRoot), editingSkill = loadVideoEditingSkill(projectRoot);
  const libraries = loadLibraries(projectRoot, {fullName: 'fixture/current'});
  const value = {claims: [{claim: '工具整理文字', quote: 'Formats text.'}],
    content: {title: '整理文字', fullNarration: '工具整理文字。', styleId: libraries.styles[0].id,
      visualIntent: '呈现输入变为整理结果', units: [{id: 'input', heading: '整理', narration: '工具整理文字。', visualIntent: '输入整理为结果', claimIndexes: [0]}]},
    designContext: '文字输入在连续画面中变为整齐输出',
    shots: [{id: 'shot', unitId: 'input', narrationCue: '工具整理文字', purpose: '说明整理过程',
      visualDesign: '文字在同一画面里重新排列', continuity: '保留原输入对象，落在整理结果', route: 'custom', libraryIds: [], assetIds: []}], assets: []};
  const {plan, researchText} = createProductionPackage(value, {fullName: 'fixture/current',
    preview: {readmeText: 'Formats text.', readmeName: 'README.md', sha: 'a'.repeat(40)}, contract, editingSkill, libraries});
  const path = join(directory, 'editorial-plan.json');
  const save = () => writeFileSync(path, JSON.stringify(plan)); save();
  return {plan, path, save, directory, args: {resourcesDirectory: directory, fullName: 'fixture/current', researchText, contract, editingSkill}};
}

test('current scoped production plans load without constructing an alternate editorial draft', (t) => {
  const f = fixture(t), loaded = loadEditorialPlan(f.args);
  assert.equal(loaded.plan.workflow, 'scoped-production-package');
  assert.equal(loaded.content.fullNarration, '工具整理文字。');
  assert.equal(loaded.digest, sha256(JSON.stringify(f.plan)));
  assert.equal(loadEditorialFeedback(f.directory).text, '');
});

test('research, identity, contract, editing skill and real feedback changes invalidate the plan', (t) => {
  const f = fixture(t);
  assert.throws(() => loadEditorialPlan({...f.args, researchText: f.args.researchText + ' '}), /stale/u);
  assert.throws(() => loadEditorialPlan({...f.args, fullName: 'other/project'}), /stale/u);
  assert.throws(() => loadEditorialPlan({...f.args, contract: {...f.args.contract, digest: 'f'.repeat(64)}}), /stale/u);
  assert.throws(() => loadEditorialPlan({...f.args, editingSkill: {...f.args.editingSkill, digest: 'f'.repeat(64)}}), /stale/u);
  writeFileSync(join(f.directory, 'editorial-feedback.md'), '增加清楚的输出状态。');
  assert.throws(() => loadEditorialPlan(f.args), /stale/u);
});

test('altered content and preproduction cannot retain stale hashes', (t) => {
  const f = fixture(t);
  f.plan.preproduction.shots[0].visualDesign = '另一个过程'; f.save();
  assert.throws(() => loadEditorialPlan(f.args), /Preproduction design changed/u);
  f.plan.preproductionDigest = sha256(JSON.stringify(f.plan.preproduction));
  f.plan.content.title = '修改后的标题'; f.save();
  assert.throws(() => loadEditorialPlan(f.args), /Content plan digest mismatch/u);
});

test('only the complete current production package is accepted', (t) => {
  const f = fixture(t);
  f.plan.workflow = 'other-workflow'; f.save();
  assert.throws(() => loadEditorialPlan(f.args), /Only the current scoped-production-package/u);
  f.plan.workflow = 'scoped-production-package'; f.plan.preproduction.shots = []; f.save();
  assert.throws(() => loadEditorialPlan(f.args), /complete preproduction/u);
});

test('missing plans and malformed editing skills report actionable errors', (t) => {
  const f = fixture(t); rmSync(f.path);
  assert.throws(() => loadEditorialPlan(f.args), /missing or unreadable/u);
  const root = join(f.directory, 'invalid-skill');
  mkdirSync(join(root, '.agents/skills/video-editorial-agent'), {recursive: true});
  writeFileSync(join(root, '.agents/skills/video-editorial-agent/SKILL.md'), '# wrong skill');
  assert.throws(() => loadVideoEditingSkill(root), /invalid frontmatter/u);
});
