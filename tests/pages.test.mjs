import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';

const routes = ['projects', 'journal', 'about', 'contribute'];
test('each main section has a complete bilingual page and the correct active navigation', async () => {
  const sitemap = await readFile(new URL('../public/sitemap.xml', import.meta.url), 'utf8');
  for (const route of routes) {
    const html = await readFile(new URL(`../public/${route}/index.html`, import.meta.url), 'utf8');
    assert.equal([...html.matchAll(/<h1\b/g)].length, 1, `${route}: one main heading`);
    assert.ok(html.includes(`rel="canonical" href="https://lordlabs.tech/${route}/"`));
    assert.ok(html.includes('<meta property="og:type" content="website">'));
    assert.equal([...html.matchAll(new RegExp(`href="/${route}/" aria-current="page"`, 'g'))].length, 2);
    assert.ok(html.includes('data-locale="ar"'));
    assert.ok(sitemap.includes(`<loc>https://lordlabs.tech/${route}/</loc>`));
    for (const target of routes) assert.ok(html.includes(`href="/${target}/"`));
    for (const [, asset] of html.matchAll(/(?:src|href)="(\/[^"?#]*)"/g)) await access(new URL(`../public${asset}`, import.meta.url));
    const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
    assert.equal(new Set(ids).size, ids.length, `${route}: unique element IDs`);
    for (const [, hash] of html.matchAll(/href="#([^"]+)"/g)) assert.ok(ids.includes(hash), `${route}: missing #${hash}`);
  }
});
test('homepage navigation opens section pages while chapter links remain local', async () => {
  const html = await readFile(new URL('../public/index.html', import.meta.url), 'utf8');
  const nav = html.match(/<nav class="desktop-nav"[\s\S]*?<\/nav>/)[0];
  for (const route of routes) assert.ok(nav.includes(`href="/${route}/" data-local-language`));
  for (const route of ['projects','about','contribute']) {
    assert.equal([...html.matchAll(new RegExp(`data-section-page="${route}"`, 'g'))].length, 1);
    assert.ok(html.includes(`href="#${route}" data-chapter="${route}"`));
  }
});
test('the projects route includes the full gallery interactions and excludes other homepage sections', async () => {
  const html = await readFile(new URL('../public/projects/index.html', import.meta.url), 'utf8');
  assert.ok(html.includes('src="/app.js"'));
  assert.ok(html.includes('id="language"'));
  for (const id of ['project-search','project-sort','language-filter','preview-dialog','project-dialog','command-dialog']) assert.ok(html.includes(`id="${id}"`));
  for (const id of ['hero-title','about-title','contribute-title','journal-title']) assert.ok(!html.includes(`id="${id}"`));
});
