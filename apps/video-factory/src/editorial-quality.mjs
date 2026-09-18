import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';

export function loadEditorialConfig(filePath) {
  const config = JSON.parse(readFileSync(filePath instanceof URL ? filePath : resolve(filePath), 'utf8'));
  if (config?.schemaVersion !== 1) throw new Error('Editorial video config schemaVersion must be 1.');
  return config;
}

function narrationText(scene) {
  if (Array.isArray(scene.sentences)) return scene.sentences.map((item) => item?.text ?? '').join('');
  if (Array.isArray(scene.captions)) return scene.captions.map((item) => item?.text ?? '').join('');
  return '';
}

function latinTerms(value) {
  return String(value ?? '').match(/[A-Za-z][A-Za-z0-9]*(?:[.+-][A-Za-z0-9]+)*/gu) ?? [];
}

function runLimit(scenes, start, config) {
  const type = scenes[start].type;
  if (['media', 'contrast'].includes(type)) return config.rhythm.maxEvidenceSeriesRun;
  if (type === 'flow') {
    const signature = JSON.stringify(scenes[start].steps ?? []);
    let progressive = true;
    for (let index = start + 1; index < scenes.length && scenes[index].type === type; index += 1) {
      if (JSON.stringify(scenes[index].steps ?? []) !== signature) progressive = false;
    }
    if (progressive) return config.rhythm.maxProgressiveFlowRun;
  }
  if (type === 'code') {
    const signature = String(scenes[start].code ?? '');
    let progressive = true;
    for (let index = start + 1; index < scenes.length && scenes[index].type === type; index += 1) {
      if (String(scenes[index].code ?? '') !== signature) progressive = false;
    }
    if (progressive) return config.rhythm.maxProgressiveCodeRun;
  }
  return config.rhythm.maxSameTypeRun;
}

export function evaluateEditorialQuality(story, config) {
  const errors = [];
  const warnings = [];
  const scenes = Array.isArray(story?.scenes) ? story.scenes : [];
  const typeCounts = {};
  for (const scene of scenes) typeCounts[scene.type] = (typeCounts[scene.type] ?? 0) + 1;

  if (story?.meta?.template !== 'editorial') errors.push('meta.template must be editorial.');
  if (scenes.length < config.sceneCount.min || scenes.length > config.sceneCount.max) {
    errors.push(`scene count must be ${config.sceneCount.min}-${config.sceneCount.max}; received ${scenes.length}.`);
  }
  if (!config.openingTypes.includes(scenes[0]?.type)) {
    errors.push(`opening scene must be one of: ${config.openingTypes.join(', ')}.`);
  }
  if (scenes.at(-1)?.type !== 'outro') errors.push('last scene must be outro.');
  for (const [type, minimum] of Object.entries(config.requiredSceneTypes)) {
    if ((typeCounts[type] ?? 0) < minimum) errors.push(`requires at least ${minimum} ${type} scene(s).`);
  }
  if (Object.keys(typeCounts).length < config.rhythm.minDistinctTypes) {
    errors.push(`requires at least ${config.rhythm.minDistinctTypes} distinct scene types.`);
  }

  for (let start = 0; start < scenes.length;) {
    let end = start + 1;
    while (end < scenes.length && scenes[end].type === scenes[start].type) end += 1;
    const length = end - start;
    const limit = runLimit(scenes, start, config);
    if (length > limit) errors.push(`scene type ${scenes[start].type} repeats ${length} times; maximum is ${limit}.`);
    start = end;
  }

  const sourced = scenes.filter((scene) => typeof scene.source === 'string' && scene.source.trim() && scene.evidenceMode).length;
  const evidenceCoverage = scenes.length ? sourced / scenes.length : 0;
  if (evidenceCoverage < config.evidence.minimumCoverage) {
    errors.push(`evidence coverage must be ${config.evidence.minimumCoverage * 100}%; received ${(evidenceCoverage * 100).toFixed(1)}%.`);
  }
  for (const [index, scene] of scenes.entries()) {
    if (story?.meta?.researchMode === 'static-source-review' && scene.evidenceMode === 'demo') {
      errors.push(`scenes[${index}] cannot claim demo evidence in static research mode.`);
    }
    const narration = narrationText(scene);
    if (!narration.trim()) errors.push(`scenes[${index}] must contain narration or captions.`);
    const cues = Array.isArray(scene.sentences) ? scene.sentences : (scene.captions ?? []);
    const longCues = cues.filter((item) => String(item?.text ?? '').length > config.text.softSubtitleCharacters);
    if (longCues.length) {
      warnings.push(`scenes[${index}] has ${longCues.length} subtitle cue(s) above the ` +
        `${config.text.softSubtitleCharacters}-character soft target; semantic text was preserved.`);
    }
    const allowedLatin = new Set([
      ...(config.text.spokenLatinAllowlist ?? []),
      ...(story?.meta?.spokenLatinAllowlist ?? []),
    ].flatMap(latinTerms).map((term) => term.toLowerCase()));
    const spoken = Array.isArray(scene.sentences)
      ? scene.sentences.map((item) => item?.spoken ?? item?.text ?? '').join('')
      : narration;
    const unexpectedLatin = [...new Set(latinTerms(spoken)
      .filter((term) => !allowedLatin.has(term.toLowerCase())))];
    if (unexpectedLatin.length) {
      errors.push(`scenes[${index}] spoken narration contains untranslated Latin terms: ${unexpectedLatin.join(', ')}.`);
    }
  }

  const narrationBlocks = Array.isArray(story?.narrationBlocks) ? story.narrationBlocks : [];
  for (const [index, block] of narrationBlocks.entries()) {
    if (!Number.isFinite(block.duration) || block.duration <= 0 ||
        block.duration > config.narrationBlocks.maxAudioSeconds) {
      errors.push(`narrationBlocks[${index}] must be no longer than ` +
        `${config.narrationBlocks.maxAudioSeconds}s.`);
    }
    if (!Array.isArray(block.sceneIndexes) || block.sceneIndexes.length === 0 ||
        block.sceneIndexes.length > 6) {
      errors.push(`narrationBlocks[${index}] must cover 1-6 scenes.`);
    } else if (block.sceneIndexes.length < 2) {
      warnings.push(`narrationBlocks[${index}] covers one scene because a technical split was required.`);
    }
    if (!Number.isInteger(block.characters) || block.characters < 1 ||
        block.characters > config.narrationBlocks.maxRequestCharacters) {
      errors.push(`narrationBlocks[${index}] exceeds the ` +
        `${config.narrationBlocks.maxRequestCharacters}-character request limit.`);
    }
  }

  const visualScenes = scenes.filter((scene) => ['hero', 'media'].includes(scene.type));
  if (visualScenes.length && (scenes[0]?.type !== 'hero' || !scenes[0]?.src)) {
    errors.push('when repository visuals are available, the opening scene must show one immediately.');
  }
  if (!visualScenes.length) warnings.push('No approved repository visual asset was available; the plan uses diagrams and evidence cards only.');

  const hasDurations = scenes.length > 0 && scenes.every((scene) => Number.isFinite(scene.duration));
  let totalDurationSeconds = null;
  let averageSceneDuration = null;
  if (hasDurations) {
    totalDurationSeconds = scenes.reduce((sum, scene) => sum + scene.duration, 0);
    averageSceneDuration = totalDurationSeconds / scenes.length;
    if (totalDurationSeconds < config.durationSeconds.min || totalDurationSeconds > config.durationSeconds.max) {
      errors.push(`duration must be ${config.durationSeconds.min}-${config.durationSeconds.max}s; received ${totalDurationSeconds.toFixed(2)}s.`);
    }
    if (averageSceneDuration > config.durationSeconds.maxAverage) {
      errors.push(`average scene duration exceeds ${config.durationSeconds.maxAverage}s.`);
    }
    scenes.forEach((scene, index) => {
      if (scene.duration > config.durationSeconds.maxScene) {
        errors.push(`scenes[${index}] exceeds ${config.durationSeconds.maxScene}s.`);
      }
    });
  }

  return {
    errors,
    warnings,
    metrics: {
      sceneCount: scenes.length,
      typeCounts,
      distinctSceneTypes: Object.keys(typeCounts).length,
      evidenceCoverage: Number(evidenceCoverage.toFixed(3)),
      narrationBlockCount: narrationBlocks.length || null,
      totalDurationSeconds: totalDurationSeconds === null ? null : Number(totalDurationSeconds.toFixed(3)),
      averageSceneDuration: averageSceneDuration === null ? null : Number(averageSceneDuration.toFixed(3)),
    },
  };
}

export function assertEditorialQuality(story, config) {
  const report = evaluateEditorialQuality(story, config);
  if (report.errors.length) throw new Error(`Editorial quality gate failed:\n- ${report.errors.join('\n- ')}`);
  return report;
}
