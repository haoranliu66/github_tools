const MEDIA_EXTENSION = /\.(?:png|jpe?g|webp|gif|mp4|webm|mov|m4v)(?:[?#].*)?$/iu;
const COPYABLE_EXTENSION = /\.(?:png|jpe?g|webp|mp4|webm|mov|m4v)$/iu;

function localMediaPath(link) {
  if (/^(?:https?:|data:|\/|\\)/iu.test(link)) return null;
  let decoded;
  try { decoded = decodeURIComponent(link.split(/[?#]/u)[0]); } catch { return null; }
  const path = decoded.replace(/^\.\//u, '').replaceAll('\\', '/');
  if (!path || path.startsWith('../') || path.includes('/../') || /^[A-Za-z]:/u.test(path)) return null;
  return path;
}

export function readmeMediaCandidates(readmeText) {
  const links = [];
  const markdown = /!?\[[^\]]*\]\(\s*(?:<([^>]+)>|([^\s)]+))(?:\s+[^)]*)?\)/gu;
  const html = /<(?:img|video|source|a)\b[^>]*?\b(?:src|href)\s*=\s*["']([^"']+)["'][^>]*>/giu;
  for (const match of readmeText.matchAll(markdown)) {
    const link = match[1] ?? match[2];
    if (match[0].startsWith('!') || MEDIA_EXTENSION.test(link)) links.push({link, index: match.index});
  }
  for (const match of readmeText.matchAll(html)) {
    const link = match[1];
    if (/^<(?:img|video|source)\b/iu.test(match[0]) || MEDIA_EXTENSION.test(link)) {
      links.push({link, index: match.index});
    }
  }
  links.sort((a, b) => a.index - b.index);
  return [...new Set(links.map((item) => item.link))].map((link) => ({
    link,
    path: localMediaPath(link),
    materializable: Boolean(localMediaPath(link) && COPYABLE_EXTENSION.test(localMediaPath(link))),
  }));
}

