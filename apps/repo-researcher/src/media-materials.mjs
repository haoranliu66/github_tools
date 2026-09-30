import {copyFileSync, mkdirSync, realpathSync, statSync} from 'node:fs';
import {extname, isAbsolute, join, relative, resolve, sep} from 'node:path';

const IMAGE_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg', '.webp']);
const VIDEO_EXTENSIONS = new Set(['.mp4', '.webm', '.mov', '.m4v']);
const MAX_IMAGE_BYTES = 12 * 1024 * 1024;
const MAX_VIDEO_BYTES = 50 * 1024 * 1024;

function inside(root, target) {
  const path = relative(root, target);
  return path && path !== '..' && !path.startsWith(`..${sep}`) && !isAbsolute(path);
}

export function materializeResearchMedia(assets, repositoryRoot, resourcesDirectory) {
  if (!repositoryRoot) return new Map();
  const root = realpathSync(repositoryRoot);
  const output = join(resourcesDirectory, 'visual-assets');
  const copied = new Map();
  for (const asset of assets) {
    if (!/^[a-z0-9][a-z0-9-]{1,39}$/u.test(asset.id) ||
        !asset.path || /^(?:[A-Za-z]:|[\\/])|(?:^|[\\/])\.\.(?:[\\/]|$)/u.test(asset.path)) {
      throw new Error(`Unsafe research media identity or path: ${asset.id ?? '(missing)'}`);
    }
    const candidate = realpathSync(resolve(root, asset.path));
    if (!inside(root, candidate)) throw new Error(`Research media resolves outside clone: ${asset.path}`);
    const extension = extname(candidate).toLowerCase();
    const supported = asset.mediaType === 'image' ? IMAGE_EXTENSIONS : VIDEO_EXTENSIONS;
    const maximum = asset.mediaType === 'image' ? MAX_IMAGE_BYTES : MAX_VIDEO_BYTES;
    const stat = statSync(candidate);
    if (!supported.has(extension) || !stat.isFile() || stat.size > maximum) {
      throw new Error(`Unsupported or oversized research media: ${asset.path}`);
    }
    mkdirSync(output, {recursive: true});
    const resourceFile = `visual-assets/${asset.id}${extension}`;
    copyFileSync(candidate, join(resourcesDirectory, resourceFile));
    copied.set(asset.id, resourceFile);
  }
  return copied;
}
