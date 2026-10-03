import assert from 'node:assert/strict';
import test from 'node:test';
import {existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync} from 'node:fs';
import {dirname, join, resolve} from 'node:path';
import {findInstalledRemotionSkills, loadRemotionGuidance, REMOTION_REFERENCE_FILES, REMOTION_TARGET_VERSION, syncRemotionSkills} from '../apps/video-factory/src/remotion-integration.mjs';

function fixture(t, version = REMOTION_TARGET_VERSION) {
  const base = resolve(import.meta.dirname, '../.cache/remotion-tests');
  mkdirSync(base, {recursive: true});
  const directory = mkdtempSync(join(base, 'fixture-'));
  t.after(() => rmSync(directory, {recursive: true, force: true}));
  const skillsRoot = join(directory, 'installed', 'skills');
  for (const file of REMOTION_REFERENCE_FILES) {
    const target = join(skillsRoot, file);
    mkdirSync(dirname(target), {recursive: true});
    writeFileSync(target, file.endsWith('/SKILL.md') ? `---\nversion: ${version}\n---\nReference\n` : file.endsWith('embedding-videos.md') ? 'Use trimBefore and trimAfter. Values are in seconds.\n' : `Reference ${file}\n`);
  }
  const runtime = join(directory, 'node_modules/remotion/package.json');
  mkdirSync(dirname(runtime), {recursive: true});
  writeFileSync(runtime, JSON.stringify({version: REMOTION_TARGET_VERSION}));
  writeFileSync(join(directory, 'package.json'), JSON.stringify({dependencies: {remotion: REMOTION_TARGET_VERSION}}));
  return {directory, skillsRoot, runtime};
}

test('Matching references retain correction provenance, verify content, and reject a different runtime', t => {
  const {directory, skillsRoot, runtime} = fixture(t);
  const manifest = syncRemotionSkills({projectRoot: directory, skillsRoot});
  assert.equal(manifest.pluginVersion, REMOTION_TARGET_VERSION);
  assert.equal(manifest.skillVersion, REMOTION_TARGET_VERSION);
  const video = manifest.files.find(file => file.path.endsWith('embedding-videos.md'));
  assert.ok(video.sourceDigest && video.sourceDigest !== video.digest);
  const file = join(directory, 'integrations/remotion/skills', video.path);
  assert.match(readFileSync(file, 'utf8'), /Values are in frames/);
  assert.equal(loadRemotionGuidance({projectRoot: directory}).metadata.remotionVersion, REMOTION_TARGET_VERSION);
  writeFileSync(runtime, JSON.stringify({version: '0.0.0'}));
  assert.throws(() => loadRemotionGuidance({projectRoot: directory}), /Installed Remotion must be/);
  writeFileSync(runtime, JSON.stringify({version: REMOTION_TARGET_VERSION}));
  writeFileSync(join(directory, 'package.json'), JSON.stringify({dependencies: {remotion: `^${REMOTION_TARGET_VERSION}`}}));
  assert.throws(() => loadRemotionGuidance({projectRoot: directory}), /must be pinned exactly/);
  writeFileSync(join(directory, 'package.json'), JSON.stringify({dependencies: {remotion: REMOTION_TARGET_VERSION}}));
  writeFileSync(file, 'tampered');
  assert.throws(() => loadRemotionGuidance({projectRoot: directory}), /Remotion reference changed/);
});

test('Wrong-version plugin is rejected before a partial snapshot is written', t => {
  const {directory, skillsRoot} = fixture(t, '0.0.0');
  assert.throws(() => syncRemotionSkills({projectRoot: directory, skillsRoot}), /must be version/);
  assert.equal(existsSync(join(directory, 'integrations/remotion')), false);
});

test('Discovery chooses the pinned plugin and never falls back to a different installation', t => {
  const {directory} = fixture(t);
  const cache = join(directory, 'plugins/cache/openai-curated-remote/remotion');
  const alternate = join(cache, '99.0.0/skills/remotion-best-practices/SKILL.md');
  mkdirSync(dirname(alternate), {recursive: true}); writeFileSync(alternate, 'Reference');
  assert.throws(() => findInstalledRemotionSkills({codexHome: directory, explicitRoot: null}), /skills were not found/);
  const pinned = join(cache, REMOTION_TARGET_VERSION, 'skills');
  mkdirSync(join(pinned, 'remotion-best-practices'), {recursive: true});
  writeFileSync(join(pinned, 'remotion-best-practices/SKILL.md'), 'Reference');
  assert.equal(findInstalledRemotionSkills({codexHome: directory, explicitRoot: null}), pinned);
});
