import {createHash} from 'node:crypto';
import {readFileSync} from 'node:fs';
import {join} from 'node:path';

export const EDITORIAL_CONTRACT_FILES = [
  '.agents/skills/video-production-quality/SKILL.md',
  '.agents/skills/video-production-quality/references/market-patterns.md',
  '.agents/skills/video-production-quality/references/visual-evidence-and-beats.md',
  '.agents/skills/video-production-quality/references/acceptance-checklist.md',
];

const TRUTH_MODES = new Set(['executed-demo', 'repository-media', 'source-derived-animation']);
const BEAT_ROLES = new Set(['show', 'prove', 'change']);
const VISUAL_MODES = new Set([
  'media-crop', 'readme-crop', 'progressive-flow', 'code-highlight', 'compare',
  'screen-recording', 'stat-overlay', 'statement', 'illustration', 'object-action',
]);
const BEAT_ENTRANCES = new Set(['fade', 'slide-left', 'slide-right', 'push-in']);

function sha256(value) {
  return createHash('sha256').update(value).digest('hex');
}

function normalized(value) {
  return String(value).replace(/\r\n/g, '\n');
}

export function contractMetadata(contract) {
  return {
    schemaVersion: 1,
    name: 'video-production-quality',
    digest: contract.digest,
    files: contract.sources.map(({path, digest}) => ({path, digest})),
  };
}

export function loadEditorialContract(projectRoot) {
  const sources = EDITORIAL_CONTRACT_FILES.map((relativePath) => {
    const content = normalized(readFileSync(join(projectRoot, relativePath), 'utf8'));
    if (!content.trim()) throw new Error(`Trusted editorial contract file is empty: ${relativePath}`);
    return {path: relativePath, content, digest: sha256(content)};
  });
  const digest = sha256(sources.map(({path, content}) => `${path}\0${content}`).join('\0'));
  return {digest, sources};
}

function assertContractMetadata(actual, expected = null) {
  if (actual?.schemaVersion !== 1 || actual?.name !== 'video-production-quality' ||
      !/^[a-f0-9]{64}$/u.test(actual?.digest ?? '') || !Array.isArray(actual?.files) ||
      actual.files.length !== EDITORIAL_CONTRACT_FILES.length) {
    throw new Error('Research must record the trusted video-production-quality editorial contract.');
  }
  if (!expected) return;
  const trusted = contractMetadata(expected);
  if (actual.digest !== trusted.digest || JSON.stringify(actual.files) !== JSON.stringify(trusted.files)) {
    throw new Error('Research editorial contract is stale; refresh research with the current production skill.');
  }
}

function assertEditorialText(value, label) {
  const text = String(value ?? '').trim();
  if (!text) throw new Error(`Editorial brief requires ${label}.`);
}

function assertClaimIndexes(indexes, claimCount, label) {
  if (!Array.isArray(indexes) || indexes.length === 0 ||
      new Set(indexes).size !== indexes.length ||
      indexes.some((index) => !Number.isInteger(index) || index < 0 || index >= claimCount)) {
    throw new Error(`${label} must reference at least one valid zero-based claim index.`);
  }
}

function assertAssetIds(ids, knownIds, label, {required = false} = {}) {
  if (!Array.isArray(ids) || (required && ids.length === 0) ||
      new Set(ids).size !== ids.length ||
      ids.some((id) => typeof id !== 'string' || !knownIds.has(id))) {
    throw new Error(`${label} must reference known evidence asset ids.`);
  }
}

function assertTruthMode(value, label, hasPassedDemo) {
  if (!TRUTH_MODES.has(value)) throw new Error(`${label} has an unsupported truth mode.`);
  if (value === 'executed-demo' && !hasPassedDemo) {
    throw new Error(`${label} cannot claim executed-demo without a passed demo step.`);
  }
}

function assertFocalRegion(region, label) {
  if (region == null) return;
  const {x, y, width, height} = region ?? {};
  if (![x, y, width, height].every(Number.isFinite) || x < 0 || y < 0 || width <= 0 || height <= 0 ||
      x + width > 1 || y + height > 1) {
    throw new Error(`${label}.focalRegion must stay within normalized image bounds.`);
  }
}

function assertVisualMode(value, label) {
  if (!VISUAL_MODES.has(value)) throw new Error(`${label} has an unsupported visual mode.`);
}

function assertIllustrationShot(beat, label) {
  if (beat.entrance != null && !BEAT_ENTRANCES.has(beat.entrance)) {
    throw new Error(`${label}.entrance has an unsupported motion.`);
  }
  if (beat.visualMode !== 'illustration') {
    if (beat.shot != null) throw new Error(`${label}.shot requires illustration visual mode.`);
    return;
  }
  const shot = beat.shot;
  if (!shot || beat.canvas != null || beat.truthMode !== 'source-derived-animation' ||
      beat.assetIds?.length || !['browser', 'comparison', 'question'].includes(shot.kind) ||
      !['before', 'action', 'result'].includes(shot.focus) || typeof shot.negateBefore !== 'boolean' ||
      ['title', 'before', 'action', 'result'].some((field) =>
        !String(shot[field] ?? '').trim() || String(shot[field]).length > (field === 'title' ? 48 : 80))) {
    throw new Error(`${label}.shot must be a short README-derived illustration, not media or a demo.`);
  }
}

function assertVisualCanvas(canvas, beat, label) {
  if (canvas == null) return;
  if (!['progressive-flow', 'compare', 'statement'].includes(beat.visualMode) ||
      beat.truthMode !== 'source-derived-animation' || beat.assetIds?.length) {
    throw new Error(`${label}.canvas requires a diagram visual mode.`);
  }
  const nodes = canvas.nodes;
  const edges = canvas.edges;
  if (!Array.isArray(nodes) || nodes.length < 1 || nodes.length > 5 ||
      !Array.isArray(edges) || edges.length > 4) {
    throw new Error(`${label}.canvas requires 1-5 nodes and at most 4 edges.`);
  }
  const ids = new Set();
  for (const node of nodes) {
    if (!/^[a-z0-9][a-z0-9-]{0,31}$/u.test(node?.id ?? '') || ids.has(node.id) ||
        !String(node.label ?? '').trim() || String(node.label).length > 18 ||
        !['input', 'action', 'result', 'note'].includes(node.kind)) {
      throw new Error(`${label}.canvas has an invalid or repeated node.`);
    }
    ids.add(node.id);
  }
  if (!Object.hasOwn(canvas, 'focusId') || (canvas.focusId != null && !ids.has(canvas.focusId))) {
    throw new Error(`${label}.canvas.focusId must name a visible node.`);
  }
  if (edges.some((edge) => !ids.has(edge?.from) || !ids.has(edge?.to) || edge.from === edge.to)) {
    throw new Error(`${label}.canvas edges must connect distinct visible nodes.`);
  }
}

function assertObjectStage(beat, label) {
  if (beat.visualMode !== 'object-action') {
    if (beat.stage != null) throw new Error(`${label}.stage requires object-action visual mode.`);
    return;
  }
  const stage = beat.stage;
  if (!stage || beat.canvas != null || beat.shot != null || beat.assetIds?.length ||
      beat.truthMode !== 'source-derived-animation' ||
      !Array.isArray(stage.objects) || stage.objects.length < 1 || stage.objects.length > 12 ||
      !Array.isArray(stage.links) || stage.links.length > 12) {
    throw new Error(`${label}.stage must be a README-derived object-action snapshot, not media or a demo.`);
  }
  const ids = new Set();
  for (const object of stage.objects) {
    if (!/^[a-z0-9][a-z0-9-]{0,31}$/u.test(object?.id ?? '') || ids.has(object.id) ||
        !['file', 'folder', 'window', 'review', 'search', 'code', 'comment', 'result'].includes(object.kind) ||
        !String(object.label ?? '').trim() || String(object.label).length > 24 ||
        (object.detail != null && (!String(object.detail).trim() || String(object.detail).length > 90)) ||
        !Number.isFinite(object.x) || object.x < 0.08 || object.x > 0.92 ||
        !Number.isFinite(object.y) || object.y < 0.12 || object.y > 0.88 ||
        !['idle', 'active', 'done'].includes(object.state)) {
      throw new Error(`${label}.stage has an invalid or repeated object.`);
    }
    ids.add(object.id);
  }
  if (stage.links.some((link) => !ids.has(link?.from) || !ids.has(link?.to) || link.from === link.to)) {
    throw new Error(`${label}.stage links must connect distinct visible objects.`);
  }
  const action = stage.action;
  if (!['reveal', 'move', 'gather', 'expand', 'scan', 'anchor', 'morph', 'focus'].includes(action?.type) ||
      !Array.isArray(action.targets) || action.targets.length < 1 ||
      new Set(action.targets).size !== action.targets.length ||
      action.targets.some((id) => !ids.has(id))) {
    throw new Error(`${label}.stage action must target visible objects.`);
  }
}

function assertVisualEvidencePackage(result, claimCount) {
  const visual = result?.visualEvidencePackage;
  if (!visual || typeof visual !== 'object') throw new Error('Research requires a visual evidence package.');
  const hasPassedDemo = (result.demoPlan ?? []).some((item) => item?.status === 'passed');
  const assets = Array.isArray(visual.evidenceAssets) ? visual.evidenceAssets : [];
  const assetIds = new Set();
  const assetsById = new Map();
  assets.forEach((asset, index) => {
    if (!/^[a-z0-9][a-z0-9-]{1,39}$/u.test(asset?.id ?? '') || assetIds.has(asset.id)) {
      throw new Error(`evidenceAssets[${index}] requires a unique id.`);
    }
    assetIds.add(asset.id);
    assetsById.set(asset.id, asset);
    if (!asset.path || /^(?:[A-Za-z]:|[\\/])|(?:^|[\\/])\.\.(?:[\\/]|$)/u.test(asset.path)) {
      throw new Error(`evidenceAssets[${index}] requires a safe repository-relative path.`);
    }
    assertEditorialText(asset.purpose, `evidenceAssets[${index}].purpose`);
    assertClaimIndexes(asset.claimIndexes, claimCount, `evidenceAssets[${index}]`);
    assertTruthMode(asset.truthMode, `evidenceAssets[${index}]`, hasPassedDemo);
    if (asset.truthMode === 'executed-demo' && asset.mediaType !== 'video') {
      throw new Error(`evidenceAssets[${index}] executed-demo evidence must be a video capture.`);
    }
  });

  const sections = result.video?.sections ?? [];
  const beats = visual.visualBeats;
  if (!Array.isArray(beats) || beats.length < 6 || beats.length > 30) {
    throw new Error('Visual evidence package requires 6-30 ordered visual beats.');
  }
  const beatIds = new Set();
  beats.forEach((beat, index) => {
    const label = `visualBeats[${index}]`;
    if (!beat?.id || beatIds.has(beat.id)) throw new Error(`${label} requires a unique id.`);
    beatIds.add(beat.id);
    if (!BEAT_ROLES.has(beat.role)) throw new Error(`${label} has an unsupported role.`);
    assertVisualMode(beat.visualMode, label);
    assertVisualCanvas(beat.canvas, beat, label);
    assertIllustrationShot(beat, label);
    assertObjectStage(beat, label);
    if (!Number.isInteger(beat.sectionIndex) || beat.sectionIndex < 0 || beat.sectionIndex >= sections.length) {
      throw new Error(`${label} must reference a valid video section.`);
    }
    assertEditorialText(beat.purpose, `${label}.purpose`);
    const cue = String(beat.narrationCue ?? '').trim();
    if (!cue || !String(sections[beat.sectionIndex]?.narration ?? '').includes(cue)) {
      throw new Error(`${label}.narrationCue must be an exact substring of its video section narration.`);
    }
    assertClaimIndexes(beat.claimIndexes, claimCount, label);
    assertTruthMode(beat.truthMode, label, hasPassedDemo);
    if (!Number.isFinite(beat.durationHint) || beat.durationHint < 0.5 || beat.durationHint > 8 ||
        !Number.isFinite(beat.leadSeconds) || beat.leadSeconds < 0 || beat.leadSeconds > 1) {
      throw new Error(`${label} has invalid timing guidance.`);
    }
    assertFocalRegion(beat.focalRegion, label);
    if (beat.lineNumbers != null && (!Array.isArray(beat.lineNumbers) ||
        new Set(beat.lineNumbers).size !== beat.lineNumbers.length ||
        beat.lineNumbers.some((line) => !Number.isInteger(line) || line < 1))) {
      throw new Error(`${label}.lineNumbers must contain unique positive integers.`);
    }
    const needsAsset = ['media-crop', 'readme-crop', 'screen-recording'].includes(beat.visualMode);
    assertAssetIds(beat.assetIds, assetIds, label, {required: needsAsset});
    if (needsAsset && beat.assetIds.some((id) => assetsById.get(id)?.truthMode !== beat.truthMode)) {
      throw new Error(`${label} truth mode must match each displayed evidence asset.`);
    }
    if (beat.visualMode === 'screen-recording' && beat.truthMode !== 'executed-demo') {
      throw new Error(`${label} screen recordings must use executed-demo truth mode.`);
    }
    if (beat.visualMode === 'screen-recording' &&
        beat.assetIds.some((id) => assetsById.get(id)?.mediaType !== 'video')) {
      throw new Error(`${label} screen recordings must reference video evidence assets.`);
    }
  });
  const labelsBySection = new Map();
  const objectsBySection = new Map();
  beats.forEach((beat, index) => {
    const labels = labelsBySection.get(beat.sectionIndex) ?? new Map();
    for (const node of beat.canvas?.nodes ?? []) {
      if (labels.has(node.id) && labels.get(node.id) !== node.label) {
        throw new Error(`visualBeats[${index}].canvas must keep the same label for node ${node.id}.`);
      }
      labels.set(node.id, node.label);
    }
    if (labels.size > 5) {
      throw new Error(`visualBeats[${index}].canvas exceeds five unique nodes in one section.`);
    }
    labelsBySection.set(beat.sectionIndex, labels);
    const objects = objectsBySection.get(beat.sectionIndex) ?? new Map();
    for (const object of beat.stage?.objects ?? []) {
      const identity = `${object.kind}\0${object.label}`;
      if (objects.has(object.id) && objects.get(object.id) !== identity) {
        throw new Error(`visualBeats[${index}].stage must keep the same kind and label for object ${object.id}.`);
      }
      objects.set(object.id, identity);
    }
    objectsBySection.set(beat.sectionIndex, objects);
  });

  const hook = visual.hookMoment;
  assertEditorialText(hook?.purpose, 'hookMoment.purpose');
  const hookCue = String(hook?.narrationCue ?? '').trim();
  if (!hookCue || !String(result.video?.hook ?? '').includes(hookCue)) {
    throw new Error('hookMoment.narrationCue must be an exact substring of video.hook.');
  }
  assertClaimIndexes(hook?.claimIndexes, claimCount, 'hookMoment');
  assertTruthMode(hook?.truthMode, 'hookMoment', hasPassedDemo);
  assertVisualMode(hook?.visualMode, 'hookMoment');
  assertVisualCanvas(hook?.canvas, hook, 'hookMoment');
  assertIllustrationShot(hook, 'hookMoment');
  assertObjectStage(hook, 'hookMoment');
  if (!Number.isFinite(hook?.leadSeconds) || hook.leadSeconds < 0 || hook.leadSeconds > 1) {
    throw new Error('hookMoment has invalid timing guidance.');
  }
  assertFocalRegion(hook?.focalRegion, 'hookMoment');
  assertAssetIds(hook?.assetIds, assetIds, 'hookMoment', {
    required: ['media-crop', 'readme-crop', 'screen-recording'].includes(hook?.visualMode),
  });
  if (['media-crop', 'readme-crop', 'screen-recording'].includes(hook?.visualMode) &&
      hook.assetIds.some((id) => assetsById.get(id)?.truthMode !== hook.truthMode)) {
    throw new Error('hookMoment truth mode must match each displayed evidence asset.');
  }

  for (const [collection, label] of [
    [visual.mechanismSteps, 'mechanismSteps'],
    [visual.contrastMoments, 'contrastMoments'],
  ]) {
    if (!Array.isArray(collection)) throw new Error(`${label} must be an array.`);
    collection.forEach((item, index) => assertClaimIndexes(item?.claimIndexes, claimCount, `${label}[${index}]`));
  }
  if (!Array.isArray(visual.demoMoments)) throw new Error('demoMoments must be an array.');
  visual.demoMoments.forEach((moment, index) => {
    assertClaimIndexes(moment?.claimIndexes, claimCount, `demoMoments[${index}]`);
    const steps = moment?.demoStepIndexes;
    if (!Array.isArray(steps) || steps.length === 0 || new Set(steps).size !== steps.length || steps.some((stepIndex) =>
      !Number.isInteger(stepIndex) || result.demoPlan?.[stepIndex]?.status !== 'passed')) {
      throw new Error(`demoMoments[${index}] must reference passed demo steps.`);
    }
    assertAssetIds(moment?.assetIds, assetIds, `demoMoments[${index}]`, {required: true});
  });
}

export function assertEditorialResearch(result, expectedContract = null) {
  assertContractMetadata(result?.editorialContract, expectedContract);
  const brief = result?.editorialBrief;
  assertEditorialText(brief?.intendedViewer, 'intendedViewer');
  assertEditorialText(brief?.familiarProblem, 'familiarProblem');
  assertEditorialText(brief?.oneSentenceAnswer, 'oneSentenceAnswer');
  assertEditorialText(brief?.titlePromise, 'titlePromise');

  const claimCount = Array.isArray(result?.claims) ? result.claims.length : 0;
  if (!Array.isArray(brief?.concreteExamples) || brief.concreteExamples.length < 1 ||
      brief.concreteExamples.length > 2) {
    throw new Error('Editorial brief requires one or two concrete examples.');
  }
  brief.concreteExamples.forEach((example, index) => {
    assertEditorialText(example?.problem, `concreteExamples[${index}].problem`);
    assertEditorialText(example?.projectAction, `concreteExamples[${index}].projectAction`);
    assertEditorialText(example?.usefulResult, `concreteExamples[${index}].usefulResult`);
    assertClaimIndexes(example?.claimIndexes, claimCount, `concreteExamples[${index}]`);
  });

  if (brief?.bRollPlan !== undefined) {
    if (!Array.isArray(brief.bRollPlan) || brief.bRollPlan.length < 1 || brief.bRollPlan.length > 4) {
      throw new Error('Editorial brief B-roll plan must contain one to four beats when provided.');
    }
    brief.bRollPlan.forEach((beat, index) => {
      assertEditorialText(beat?.purpose, `bRollPlan[${index}].purpose`);
      assertEditorialText(beat?.visual, `bRollPlan[${index}].visual`);
      assertClaimIndexes(beat?.claimIndexes, claimCount, `bRollPlan[${index}]`);
    });
  }
  assertVisualEvidencePackage(result, claimCount);

}

export function trustedContractPrompt(contract) {
  const metadata = contractMetadata(contract);
  const body = contract.sources.map(({path, content}) =>
    `--- BEGIN TRUSTED FILE: ${path} ---\n${content}\n--- END TRUSTED FILE: ${path} ---`,
  ).join('\n\n');
  return {metadata, body};
}
