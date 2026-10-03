import {mkdirSync, mkdtempSync, writeFileSync} from 'node:fs';
import {dirname, join, resolve, sep} from 'node:path';
import {request} from '../../trend-scout/src/github.mjs';
import {readmeMediaCandidates} from './readme-media.mjs';

const API = 'https://api.github.com';
const SHA = /^[a-f0-9]{40}$/iu;
const README = /^README(?:\.[A-Za-z0-9]+)?$/iu;
const LICENSE = /^(?:LICENSE|LICENCE|COPYING)(?:\.[A-Za-z0-9]+)?$/iu;
const MAX_IMAGE = 12 * 1024 * 1024;
const MAX_VIDEO = 50 * 1024 * 1024;
const MAX_TOTAL = 80 * 1024 * 1024;

function apiPath(fullName, suffix) {
  return `${API}/repos/${fullName}${suffix ? `/${suffix}` : ''}`;
}

async function json(url, options) {
  return (await request(url, options)).json();
}

function safeStagePath(root, path) {
  if (!path || path.includes('\\') || path.split('/').some((part) =>
    !part || part === '.' || part === '..' || part === '.git')) {
    throw new Error(`Unsafe online source path: ${path}`);
  }
  const absolute = resolve(root, path);
  if (!absolute.startsWith(`${resolve(root)}${sep}`)) throw new Error(`Online source path escapes snapshot: ${path}`);
  return absolute;
}

function decodeContent(file, label) {
  if (file?.type !== 'file' || file.encoding !== 'base64' || typeof file.content !== 'string') {
    throw new Error(`${label} is not a small GitHub file with base64 content.`);
  }
  return Buffer.from(file.content.replace(/\s+/gu, ''), 'base64');
}

export async function getOnlineSourcePreview(fullName, {token = '', requestOptions = {}, includeLicense = false, includePopularity = false} = {}) {
  const options = {token, ...requestOptions};
  const repo = await json(apiPath(fullName, ''), options);
  if (!repo?.default_branch) throw new Error('GitHub repository has no default branch.');
  const commit = await json(apiPath(fullName,
    `commits/${encodeURIComponent(repo.default_branch)}`), options);
  if (!SHA.test(commit?.sha ?? '')) throw new Error('GitHub did not return a full commit SHA.');
  const sha = commit.sha;
  const readme = await json(apiPath(fullName, `readme?ref=${sha}`), options);
  if (!README.test(readme?.path ?? '')) throw new Error('Online research requires a root official README.');
  const readmeText = decodeContent(readme, 'Official README').toString('utf8');
  const candidates = readmeMediaCandidates(readmeText);
  let licenseName = null;
  let licenseText = null;
  if(includeLicense) try {
    const root = await json(apiPath(fullName, `contents?ref=${sha}`), options);
    const license = Array.isArray(root) ? root.find((item) =>
      item.type === 'file' && LICENSE.test(item.name) && item.size <= 1024 * 1024) : null;
    if (license) {
      const file = await json(apiPath(fullName,
        `contents/${encodeURIComponent(license.name)}?ref=${sha}`), options);
      licenseName = license.name;
      licenseText = decodeContent(file, 'Repository license').toString('utf8');
    }
  } catch {
    // Selected-source notices remain separate from the director package.
  }
  return {
    fullName, sha, readmeName: readme.path, readmeText, candidates,
    licenseName, licenseText,
    repositoryLicense: repo.license?.spdx_id ?? null,
    primaryLanguage: repo.language ?? null,
    ...(includePopularity && Number.isSafeInteger(repo.stargazers_count) && repo.stargazers_count >= 0 ? {popularity:{stars:repo.stargazers_count,source:apiPath(fullName,''),observedAt:new Date().toISOString()}} : {}),
  };
}

export function stageOnlinePreview(preview, runRoot) {
  mkdirSync(runRoot, {recursive: true});
  const directory = mkdtempSync(join(runRoot, 'online-source-'));
  writeFileSync(join(directory, preview.readmeName), preview.readmeText, 'utf8');
  if (preview.licenseName && preview.licenseText) {
    writeFileSync(safeStagePath(directory, preview.licenseName), preview.licenseText, 'utf8');
  }
  writeFileSync(join(directory, 'SOURCE_METADATA.json'), `${JSON.stringify({
    repository: `https://github.com/${preview.fullName}`,
    commit: preview.sha,
    readme: preview.readmeName,
    repositoryLicense: preview.repositoryLicense,
    primaryLanguage: preview.primaryLanguage,
    ...(preview.popularity?{popularity:preview.popularity}:{}),
    note: 'API metadata is version identity only; README is the sole static feature evidence.',
  }, null, 2)}\n`, 'utf8');
  return directory;
}

export async function downloadOnlineMedia(preview, directory, {
  token = '', requestOptions = {},
} = {}) {
  const local = preview.candidates.filter((item) => item.materializable);
  if (local.length > 8) {
    throw new Error('README media inventory exceeds the bounded online snapshot.');
  }
  const options = {token, ...requestOptions};
  let total = 0;
  for (const candidate of local) {
    const path = candidate.path;
    const extension = path.split('.').at(-1).toLowerCase();
    const maximum = ['mp4', 'webm', 'mov', 'm4v'].includes(extension) ? MAX_VIDEO : MAX_IMAGE;
    const encodedPath = path.split('/').map(encodeURIComponent).join('/');
    const url = apiPath(preview.fullName, `contents/${encodedPath}?ref=${preview.sha}`);
    const metadata = await json(url, options);
    if (metadata?.type !== 'file' || !Number.isInteger(metadata.size) || metadata.size > maximum ||
        total + metadata.size > MAX_TOTAL) {
      throw new Error(`Online media is missing, unsupported, or too large: ${path}`);
    }
    const response = await request(url, {token, accept: 'application/vnd.github.raw+json',
      ...requestOptions});
    const bytes = Buffer.from(await response.arrayBuffer());
    if (bytes.length !== metadata.size || bytes.length > maximum || total + bytes.length > MAX_TOTAL) {
      throw new Error(`Online media size changed or exceeded the snapshot limit: ${path}`);
    }
    const target = safeStagePath(directory, path);
    mkdirSync(dirname(target), {recursive: true});
    writeFileSync(target, bytes);
    total += bytes.length;
  }
  return {files: local.length, bytes: total};
}
