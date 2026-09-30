import assert from 'node:assert/strict';
import {mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join, resolve} from 'node:path';
import test from 'node:test';
import {assertEditorialResearch, loadEditorialContract} from '../apps/repo-researcher/src/editorial-contract.mjs';
import {completedResearchFixture} from './helpers/completed-research.mjs';
import {validateStoryboard} from '../apps/video-factory/src/storyboard.mjs';
import {buildEditorialEpisode} from '../apps/video-factory/src/editorial-planner.mjs';
import {loadEditorialConfig, evaluateEditorialQuality} from '../apps/video-factory/src/editorial-quality.mjs';
import {buildShotAgentPrompt} from '../apps/video-factory/src/shot-agent.mjs';
import {findInstalledRemotionSkills, loadRemotionGuidance, REMOTION_REFERENCE_FILES, syncRemotionSkills}
  from '../apps/video-factory/src/remotion-integration.mjs';

const root = resolve(import.meta.dirname, '..');
function withoutCategories(value) {
  if (!value || typeof value !== 'object') return;
  delete value.truthMode;
  for (const child of Object.values(value)) withoutCategories(child);
}

test('animations and recordings pass the same material checks without truth categories or a local run', () => {
  const contract = loadEditorialContract(root);
  const research = completedResearchFixture({contract});
  withoutCategories(research);
  const visual = research.visualEvidencePackage;
  visual.evidenceAssets.push({id: 'recorded-result', path: 'result.mp4', purpose: '展示输入与结果',
    mediaType: 'video', licenseBasis: 'Own recorded material', claimIndexes: [0]});
  const beat = visual.visualBeats[0];
  beat.visualMode = 'screen-recording';
  beat.assetIds = ['recorded-result'];
  beat.canvas = beat.shot = beat.stage = null;
  assert.doesNotThrow(() => assertEditorialResearch(research, contract));
  // Historical categories are ignored even when mismatched; actual media type still matters.
  beat.truthMode = 'source-derived-animation';
  visual.evidenceAssets.at(-1).truthMode = 'executed-demo';
  assert.doesNotThrow(() => assertEditorialResearch(research, contract));
  visual.evidenceAssets.at(-1).mediaType = 'image';
  assert.throws(() => assertEditorialResearch(research, contract), /video evidence assets/);
  visual.evidenceAssets.at(-1).mediaType = 'video';
  beat.claimIndexes = [999];
  assert.throws(() => assertEditorialResearch(research, contract), /claim index/);
});

test('prepared and planning storyboards do not need source-based visual categories', () => {
  const contract = loadEditorialContract(root);
  const research = completedResearchFixture({contract});
  withoutCategories(research);
  research.visualEvidencePackage.hookMoment.visualMode = 'object-action';
  research.visualEvidencePackage.hookMoment.stage = {objects: [{id: 'input', kind: 'window', label: '零散文字',
    detail: '多余空格', x: 0.3, y: 0.5, state: 'idle'}], links: [], action: {type: 'reveal', targets: ['input']}};
  const config = loadEditorialConfig(join(root, 'config/video-editorial.json'));
  const {episode} = buildEditorialEpisode({research, repositoryRoot: root, config, trendRow: {stars: 1000}});
  episode.scenes.forEach(scene => {delete scene.evidenceMode;});
  assert.deepEqual(evaluateEditorialQuality(episode, config).errors, []);
  const storyboard = {meta: {title: '素材统一', width: 1920, height: 1080, fps: 30, visualBeatContractVersion: 1},
    scenes: [{type: 'text', duration: 2, visualBeats: [{role: 'show', claimIndexes: [0], startFrame: 0, endFrame: 60}]}]};
  assert.deepEqual(validateStoryboard(storyboard), []);
});

test('new research schemas no longer ask agents to emit truthMode', () => {
  const schema = readFileSync(join(root, 'apps/repo-researcher/schemas/research.schema.json'), 'utf8');
  assert.doesNotMatch(schema, /truthMode/);
});

function integrationFixture(t) {
  const directory = mkdtempSync(join(tmpdir(), 'zimeiti-remotion-integration-'));
  t.after(() => rmSync(directory, {recursive: true, force: true}));
  const skillsRoot = join(directory, 'plugin/1.2.3/skills');
  for (const file of REMOTION_REFERENCE_FILES) {
    const target = join(skillsRoot, file);
    mkdirSync(resolve(target, '..'), {recursive: true});
    writeFileSync(target, `---\nversion: 4.0.520\n---\nComplete reference for ${file}.\n`);
  }
  mkdirSync(join(directory, 'node_modules/remotion'), {recursive: true});
  writeFileSync(join(directory, 'node_modules/remotion/package.json'), '{"version":"4.0.520"}');
  return {directory, skillsRoot};
}

test('Remotion plugin references reach the real shot prompt and detect snapshot changes', t => {
  const {directory, skillsRoot} = integrationFixture(t);
  const snapshot = syncRemotionSkills({projectRoot: directory, skillsRoot});
  const storyboard = {scenes: [{src: 'approved.mp4', visualBeats: []}]};
  const guidance = loadRemotionGuidance({projectRoot: directory, storyboard});
  assert.equal(guidance.metadata.digest, snapshot.digest);
  assert.equal(guidance.metadata.pluginVersion, '1.2.3');
  assert.ok(guidance.metadata.files.some(file => file.path.endsWith('embedding-videos.md')));
  assert.ok(guidance.metadata.coreApis.includes('spring'));
  const prompt = buildShotAgentPrompt(storyboard, '', '', guidance);
  assert.match(prompt, /Complete reference for remotion-markup\/sequencing.md/);
  assert.match(prompt, /FrameAnnotation/);
  assert.match(prompt, /equally eligible video materials/);
  assert.match(prompt, /not automatically installed or permitted/);
  writeFileSync(join(directory, 'integrations/remotion/skills/remotion-markup/timing.md'), 'changed');
  assert.throws(() => loadRemotionGuidance({projectRoot: directory}), /reference changed/);
});

test('plugin sync fails before changing a valid snapshot when an installed reference is missing', t => {
  const {directory, skillsRoot} = integrationFixture(t);
  syncRemotionSkills({projectRoot: directory, skillsRoot});
  const before = readFileSync(join(directory, 'integrations/remotion/manifest.json'), 'utf8');
  rmSync(join(skillsRoot, 'remotion-markup/timing.md'));
  assert.throws(() => syncRemotionSkills({projectRoot: directory, skillsRoot}), /ENOENT/);
  assert.equal(readFileSync(join(directory, 'integrations/remotion/manifest.json'), 'utf8'), before);
});

test('plugin discovery selects the newest valid numeric version without a user-specific path', t => {
  const {directory} = integrationFixture(t);
  const cache = join(directory, 'plugins/cache/openai-curated-remote/remotion');
  for (const version of ['1.0.9', '1.0.10', '2.0.0']) {
    const file = join(cache, version, 'skills/remotion-best-practices/SKILL.md');
    mkdirSync(resolve(file, '..'), {recursive: true});
    writeFileSync(file, 'plugin');
  }
  assert.equal(findInstalledRemotionSkills({codexHome: directory, explicitRoot: null}), join(cache, '2.0.0/skills'));
});
