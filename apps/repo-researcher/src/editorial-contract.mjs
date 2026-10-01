import {createHash} from 'node:crypto';
import {readFileSync} from 'node:fs';
import {join} from 'node:path';

export const EDITORIAL_CONTRACT_FILES = ['.agents/skills/video-production-quality/SKILL.md'];
export const EDITORIAL_REFERENCE_FILES = [
  '.agents/skills/video-production-quality/references/market-patterns.md',
  '.agents/skills/video-production-quality/references/acceptance-checklist.md',
  '.agents/skills/video-editorial-agent/SKILL.md',
  '.agents/skills/audio-narration-preflight/SKILL.md',
];
const sha256 = value => createHash('sha256').update(value).digest('hex');

export function contractMetadata(contract) {
  return {schemaVersion: 1, name: 'video-production-quality', digest: contract.digest,
    files: contract.sources.map(({path, digest}) => ({path, digest}))};
}

export function loadEditorialContract(projectRoot) {
  const sources = EDITORIAL_CONTRACT_FILES.map(path => {
    const content = readFileSync(join(projectRoot, path), 'utf8').replace(/\r\n/g, '\n');
    if (!content.trim()) throw new Error('Trusted editorial contract file is empty: ' + path);
    return {path, content, digest: sha256(content)};
  });
  return {digest: sha256(sources.map(({path, content}) => path + '\0' + content).join('\0')), sources};
}

export function assertEditorialContractMetadata(actual, expectedContract = null) {
  if (actual?.schemaVersion !== 1 || actual?.name !== 'video-production-quality' ||
      !/^[a-f0-9]{64}$/u.test(actual?.digest ?? '') || !Array.isArray(actual?.files) ||
      actual.files.length !== EDITORIAL_CONTRACT_FILES.length ||
      actual.files.some((file, index) => file?.path !== EDITORIAL_CONTRACT_FILES[index] ||
        !/^[a-f0-9]{64}$/u.test(file?.digest ?? ''))) {
    throw new Error('Current production package must record the single trusted editorial contract.');
  }
  if (expectedContract) {
    const expected = contractMetadata(expectedContract);
    if (actual.digest !== expected.digest || JSON.stringify(actual.files) !== JSON.stringify(expected.files)) {
      throw new Error('Production editorial contract is stale; regenerate the scoped production plan.');
    }
  }
}

export function trustedContractPrompt(contract) {
  return {metadata: contractMetadata(contract), body: contract.sources.map(({path, content}) =>
    '--- BEGIN TRUSTED FILE: ' + path + ' ---\n' + content + '\n--- END TRUSTED FILE: ' + path + ' ---').join('\n\n')};
}
