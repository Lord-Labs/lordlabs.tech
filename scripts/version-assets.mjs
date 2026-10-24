import { createHash } from 'node:crypto';
import { readdir, readFile, writeFile } from 'node:fs/promises';

export async function versionAssets(root) {
  const paths = (await readdir(root, { recursive: true }))
    .filter(path => /\.(?:html|js|css|json)$/.test(path)).sort();
  const files = await Promise.all(paths.map(async path => [path, await readFile(new URL(path.replaceAll('\\', '/'), root), 'utf8')]));
  const hash = createHash('sha256');
  for (const [path, source] of files) hash.update(path.replaceAll('\\', '/') + '\0' + source + '\0');
  const version = hash.digest('hex').slice(0, 12);
  // Version the whole module graph so an older cached import cannot replace fresh HTML.
  for (const [path, source] of files) {
    if (!/\.(?:html|js)$/.test(path)) continue;
    const updated = source.replace(/(["'])((?:\/(?!\/)|\.\.?\/)[^"'\s<>]*\.(?:js|css|json))\1/g,
      (_, quote, url) => `${quote}${url}?v=${version}${quote}`);
    await writeFile(new URL(path.replaceAll('\\', '/'), root), updated);
  }
  return version;
}
