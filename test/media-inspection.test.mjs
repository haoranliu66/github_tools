import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {join, resolve} from 'node:path';
import test from 'node:test';
import {
  assertProductionMaterials,
  buildMediaInspectionPrompt,
  mediaInspectionOutputSchema,
  mergeMediaInspection,
  readmeMediaCandidates,
  selectedResearchFunctions,
} from '../apps/repo-researcher/src/media-inspection.mjs';

const root = resolve(import.meta.dirname, '..');

function fixture() {
  return {
    claims: [{claim: '改动文件进入审查', evidence: [{source: 'official-readme', detail: 'README describes changed files.'}]}],
    editorialBrief: {concreteExamples: [{claimIndexes: [0]}]},
    visualEvidencePackage: {
      hookMoment: {claimIndexes: [0]},
      visualBeats: [{claimIndexes: [0]}],
      evidenceAssets: [],
    },
  };
}

const animation = {
  objects: [
    {id: 'file-one', kind: 'file', label: '改动文件', detail: '个人网页的按钮'},
    {id: 'review', kind: 'review', label: 'AI 审查', detail: null},
  ],
  actions: [
    {type: 'reveal', targets: ['file-one']},
    {type: 'gather', targets: ['file-one', 'review']},
  ],
  readmeBasis: 'README says changed files enter the review.',
};

function material({inspected = [], status = 'no-suitable-media', ids = [], plan = animation} = {}) {
  return {
    id: 'function-1', functionName: '改动文件进入审查', claimIndexes: [0],
    mediaInspection: {status, inspected, selectedAssetIds: ids},
    animationPlan: plan,
  };
}

test('README inventory finds linked image and video candidates without treating remote media as local', () => {
  const candidates = readmeMediaCandidates([
    '![demo](docs/demo.png)', '<video src="media/flow.mp4"></video>',
    '[remote](https://example.com/demo.webp)', '![repeat](docs/demo.png)',
  ].join('\n'));
  assert.deepEqual(candidates.map((item) => [item.link, item.path, item.materializable]), [
    ['docs/demo.png', 'docs/demo.png', true],
    ['media/flow.mp4', 'media/flow.mp4', true],
    ['https://example.com/demo.webp', null, false],
  ]);
});

test('media-inspection subagent receives every README candidate and selected claim without run permission', () => {
  const research = fixture();
  const candidates = readmeMediaCandidates('![demo](docs/demo.png)');
  const prompt = buildMediaInspectionPrompt({fullName: 'acme/review', result: research, candidates});
  assert.match(prompt, /separate, read-only media-inspection subagent/);
  assert.match(prompt, /inspect EVERY one/);
  assert.match(prompt, /docs\/demo\.png/);
  assert.match(prompt, /改动文件进入审查/);
  assert.match(prompt, /Never execute repository code/);
  assert.match(prompt, /Do not inspect source code/);
  assert.deepEqual(selectedResearchFunctions(research).map((item) => item.id), ['function-1']);
  const schema = mediaInspectionOutputSchema(JSON.parse(readFileSync(
    join(root, 'apps/repo-researcher/schemas/research.schema.json'), 'utf8')));
  assert.deepEqual(schema.required, ['productionMaterials', 'evidenceAssets']);
  assert.ok(schema.properties.productionMaterials.items.properties.mediaInspection);
});

test('research and media output schemas require every declared object property', () => {
  const researchSchema = JSON.parse(readFileSync(
    join(root, 'apps/repo-researcher/schemas/research.schema.json'), 'utf8'));
  const schemas = [researchSchema, mediaInspectionOutputSchema(researchSchema)];
  const visit = (value) => {
    if (!value || typeof value !== 'object') return;
    if (value.type === 'object' && value.properties) {
      assert.deepEqual(new Set(value.required), new Set(Object.keys(value.properties)));
    }
    for (const nested of Object.values(value)) visit(nested);
  };
  for (const schema of schemas) visit(schema);
});

test('no linked media still requires specific objects and actions for every selected function', () => {
  const research = fixture();
  mergeMediaInspection(research, {productionMaterials: [material()], evidenceAssets: []});
  assert.doesNotThrow(() => assertProductionMaterials(research, []));
  research.visualEvidencePackage.productionMaterials[0].animationPlan = null;
  assert.throws(() => assertProductionMaterials(research, []), /concrete animation/);
});

test('research cannot publish an uninspected README image as a completed handoff', () => {
  const research = fixture();
  const candidates = readmeMediaCandidates('![demo](docs/demo.png)');
  mergeMediaInspection(research, {productionMaterials: [material()], evidenceAssets: []});
  assert.throws(() => assertProductionMaterials(research, candidates), /did not inspect every/);
  research.visualEvidencePackage.productionMaterials[0].mediaInspection.inspected = [{
    path: 'docs/demo.png', mediaType: 'image', verdict: 'irrelevant',
    reason: 'This only shows installation settings, not file review.',
    licenseBasis: '', crop: null, clip: null,
  }];
  assert.doesNotThrow(() => assertProductionMaterials(research, candidates));
});

test('usable media must be inspected, cropped, selected, and README-linked', () => {
  const research = fixture();
  const candidates = readmeMediaCandidates('![demo](docs/demo.png)');
  const inspected = [{path: 'docs/demo.png', mediaType: 'image', verdict: 'usable',
    reason: 'The screenshot shows the review result.', licenseBasis: 'README explicitly grants reuse',
    crop: {x: 0.1, y: 0.1, width: 0.8, height: 0.8}, clip: null}];
  const asset = {id: 'demo-image', path: 'docs/demo.png', purpose: 'Review result', mediaType: 'image',
    licenseBasis: 'README explicitly grants reuse', truthMode: 'repository-media', claimIndexes: [0]};
  mergeMediaInspection(research, {
    productionMaterials: [material({status: 'usable', inspected, ids: ['demo-image'], plan: null})],
    evidenceAssets: [asset],
  });
  assert.doesNotThrow(() => assertProductionMaterials(research, candidates));
  research.visualEvidencePackage.productionMaterials[0].animationPlan = animation;
  assert.doesNotThrow(() => assertProductionMaterials(research, candidates));
  research.visualEvidencePackage.productionMaterials[0].animationPlan.objects[0].detail = 'x'.repeat(91);
  assert.throws(() => assertProductionMaterials(research, candidates), /invalid example detail/);
  research.visualEvidencePackage.productionMaterials[0].animationPlan = null;
  research.visualEvidencePackage.evidenceAssets[0].licenseBasis =
    'README reuse grant applies to this screenshot; preserve attribution.';
  assert.doesNotThrow(() => assertProductionMaterials(research, candidates));
  research.visualEvidencePackage.productionMaterials[0].mediaInspection.inspected[0].crop = null;
  assert.throws(() => assertProductionMaterials(research, candidates), /uncropped/);
});
