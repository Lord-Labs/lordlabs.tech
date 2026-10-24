import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, readFile, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { versionAssets } from '../scripts/version-assets.mjs';

test('a project update changes entry, nested imports, styles and snapshot URLs together', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'lordlabs-cache-'));
  const root = pathToFileURL(directory + '/');
  try {
    await mkdir(new URL('projects/', root));
    const originals = {
      'index.html': '<script type="module" src="/app.js"></script><link href="/style.css"><img src="/logo.svg">',
      'projects/index.html': '<script src="/app.js"></script>',
      'app.js': 'import { projects } from "./projects.js"; fetch("/data/repositories.json");',
      'projects.js': 'export const projects = ["ZipZap"];',
      'style.css': 'body{color:black}'
    };
    const writeSources = async () => {
      for (const [path, source] of Object.entries(originals)) await writeFile(new URL(path, root), source);
    };
    await writeSources();
    const first = await versionAssets(root);
    for (const path of ['index.html', 'projects/index.html']) assert.ok((await readFile(new URL(path, root), 'utf8')).includes(`/app.js?v=${first}`));
    const app = await readFile(new URL('app.js', root), 'utf8');
    assert.ok(app.includes(`./projects.js?v=${first}`));
    assert.ok(app.includes(`/data/repositories.json?v=${first}`));
    const home = await readFile(new URL('index.html', root), 'utf8');
    assert.ok(home.includes(`/style.css?v=${first}`));
    assert.ok(home.includes('src="/logo.svg"'));
    await writeSources();
    assert.equal(await versionAssets(root), first);
    originals['projects.js'] = 'export const projects = ["ZipZap", "OpenDownload"];';
    await writeSources();
    const second = await versionAssets(root);
    assert.notEqual(second, first);
    assert.ok((await readFile(new URL('app.js', root), 'utf8')).includes(`./projects.js?v=${second}`));
  } finally {
    assert.ok(directory.startsWith(join(tmpdir(), 'lordlabs-cache-')));
    await rm(directory, { recursive: true, force: true });
  }
});
