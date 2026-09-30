import {createHash} from 'node:crypto';
import {existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync} from 'node:fs';
import {homedir} from 'node:os';
import {dirname, join, resolve} from 'node:path';
import * as Remotion from 'remotion';

const ROOT = resolve(import.meta.dirname, '../../..');
const hash = value => createHash('sha256').update(value).digest('hex');
const normalize = value => value.replaceAll('\r\n', '\n');
export const REMOTION_REFERENCE_FILES = [
  'remotion-best-practices/SKILL.md', 'remotion-markup/SKILL.md',
  'remotion-markup/timing.md', 'remotion-markup/sequencing.md',
  'remotion-markup/measuring-text.md', 'remotion-markup/transitions.md',
  'remotion-markup/images.md', 'remotion-markup/cropping.md',
  'remotion-markup/embedding-videos.md', 'remotion-markup/text-highlights.md',
  'remotion-render/SKILL.md', 'remotion-studio/SKILL.md',
];
const coreApis = ['AbsoluteFill', 'Sequence', 'Img', 'OffthreadVideo', 'interpolate',
  'spring', 'Easing', 'useCurrentFrame', 'useVideoConfig', 'staticFile',
  'CanvasImage', 'Interactive', 'AnimatedImage'].filter(name => name in Remotion);

export function findInstalledRemotionSkills({codexHome = process.env.CODEX_HOME || join(homedir(), '.codex'),
  explicitRoot = process.env.REMOTION_SKILLS_ROOT} = {}) {
  if (explicitRoot) {
    const root = resolve(explicitRoot);
    if (!existsSync(join(root, 'remotion-best-practices/SKILL.md'))) throw new Error('REMOTION_SKILLS_ROOT must point to the installed plugin skills directory.');
    return root;
  }
  const cache = join(codexHome, 'plugins/cache/openai-curated-remote/remotion');
  const versions = existsSync(cache) ? readdirSync(cache, {withFileTypes: true})
    .filter(entry => entry.isDirectory() && /^\d+\.\d+\.\d+$/.test(entry.name))
    .map(entry => entry.name).sort((a, b) => {
      const av = a.split('.').map(Number), bv = b.split('.').map(Number);
      return bv[0] - av[0] || bv[1] - av[1] || bv[2] - av[2];
    }) : [];
  const root = versions.map(version => join(cache, version, 'skills'))
    .find(path => existsSync(join(path, REMOTION_REFERENCE_FILES[0])));
  if (!root) throw new Error('Installed Remotion skills were not found. Set REMOTION_SKILLS_ROOT to the plugin skills directory.');
  return root;
}

export function syncRemotionSkills({projectRoot = ROOT, skillsRoot = findInstalledRemotionSkills()} = {}) {
  // Read every required file before writing so incomplete plugin installations fail without a partial snapshot.
  const files = REMOTION_REFERENCE_FILES.map(path => {
    const content = normalize(readFileSync(join(skillsRoot, path), 'utf8'));
    if (!content.trim()) throw new Error(`Empty Remotion reference: ${path}`);
    return {path, content, digest: hash(content)};
  });
  const directory = join(projectRoot, 'integrations/remotion');
  const version = files[0].content.match(/^version:\s*(.+)$/m)?.[1]?.trim() ?? 'unknown';
  const pluginVersion = resolve(skillsRoot, '..').split(/[\\/]/).at(-1);
  const manifest = {schemaVersion: 1, provider: 'installed-codex-remotion-plugin', pluginVersion, skillVersion: version,
    files: files.map(({path, digest}) => ({path, digest}))};
  manifest.digest = hash(JSON.stringify(manifest));
  for (const file of files) {
    const target = join(directory, 'skills', file.path);
    mkdirSync(dirname(target), {recursive: true});
    writeFileSync(target, file.content, 'utf8');
  }
  writeFileSync(join(directory, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
  return manifest;
}

export function loadRemotionGuidance({projectRoot = ROOT, storyboard = null, stage = 'shots'} = {}) {
  const directory = join(projectRoot, 'integrations/remotion');
  const manifest = JSON.parse(readFileSync(join(directory, 'manifest.json'), 'utf8'));
  const {digest, ...unsigned} = manifest;
  if (manifest.schemaVersion !== 1 || manifest.provider !== 'installed-codex-remotion-plugin' || hash(JSON.stringify(unsigned)) !== digest) {
    throw new Error('Remotion integration manifest is invalid. Run pnpm video:remotion:sync.');
  }
  const sources = manifest.files.map(file => {
    if (!REMOTION_REFERENCE_FILES.includes(file.path)) throw new Error('Unknown Remotion integration reference.');
    const content = normalize(readFileSync(join(directory, 'skills', file.path), 'utf8'));
    if (hash(content) !== file.digest) throw new Error(`Remotion reference changed: ${file.path}. Run pnpm video:remotion:sync.`);
    return {...file, content};
  });
  if (sources.length !== REMOTION_REFERENCE_FILES.length || new Set(sources.map(file => file.path)).size !== sources.length) {
    throw new Error('Remotion integration references are incomplete.');
  }
  const paths = new Set(['remotion-best-practices/SKILL.md', 'remotion-markup/SKILL.md']);
  if (stage === 'shots') {
    ['timing', 'sequencing', 'measuring-text', 'transitions'].forEach(name => paths.add(`remotion-markup/${name}.md`));
    if (storyboard?.scenes?.some(scene => scene.src || scene.visualBeats?.some(beat => beat.src))) {
      ['images', 'cropping', 'embedding-videos'].forEach(name => paths.add(`remotion-markup/${name}.md`));
    }
  } else if (stage === 'studio') paths.add('remotion-studio/SKILL.md');
  else if (stage === 'render') paths.add('remotion-render/SKILL.md');
  else throw new Error(`Unsupported Remotion guidance stage: ${stage}`);
  const selected = sources.filter(source => paths.has(source.path));
  const remotionVersion = JSON.parse(readFileSync(join(projectRoot, 'node_modules/remotion/package.json'), 'utf8')).version;
  const metadata = {provider: manifest.provider, pluginVersion: manifest.pluginVersion, skillVersion: manifest.skillVersion,
    digest, remotionVersion, coreApis, files: selected.map(({path, digest}) => ({path, digest}))};
  const body = `Trusted Remotion plugin guidance follows. Use it for rendering technique within the Zimeiti assignment.
The project has Remotion ${remotionVersion}. Available core APIs: ${coreApis.join(', ')}.
Custom shots can import ONLY react, remotion and ./shot-runtime.jsx. Plugin examples may mention optional packages;
they are not automatically installed or permitted. Do not install packages or change the narration provider.
Use the supplied beat-relative frame prop for custom-shot animation. A bare useCurrentFrame() is scene-relative;
subtract beat.startFrame if used. Keep animation correct when frames render in any order. No CSS animation or transition.
The runtime additionally exports FrameReveal and FrameAnnotation (kinds highlight, circle, underline, box),
implemented with core Remotion APIs and SVG. These provide spring entrances and timed emphasis without extra imports.
${selected.map(source => `--- BEGIN TRUSTED REMOTION REFERENCE: ${source.path} ---\n${source.content}\n--- END TRUSTED REMOTION REFERENCE ---`).join('\n\n')}
Project approval, fact checks, caption-safe layout, allowed imports and human acceptance remain the controlling assignment.`;
  return {metadata, body};
}
