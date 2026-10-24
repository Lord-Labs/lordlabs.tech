import test from 'node:test';
import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import { projects } from '../public/projects.js';

test('every selected project provides three bilingual benefits with available icons', async () => {
  for (const project of projects) {
    assert.equal(project.features.length, 3);
    for (const lang of ['en', 'ar']) {
      for (const feature of project.features) {
        assert.ok(feature.title[lang]);
        assert.ok(feature.description[lang]);
      }
    }
    for (const feature of project.features) await access(new URL(`../public/assets/icons/${feature.icon}.svg`, import.meta.url));
  }
});
test('the static poster gallery keeps selected projects discoverable, with real previews and bilingual benefits', async () => {
  const html = await readFile(new URL('../public/index.html', import.meta.url), 'utf8');
  for (const project of projects) {
    assert.ok(html.includes(`id="project-${project.slug}"`));
    assert.ok(html.includes(`class="preview-trigger" href="${project.cover}"`));
    for (const feature of project.features) {
      assert.ok(html.includes(feature.title.en));
      assert.ok(html.includes(feature.title.ar));
    }
  }
  assert.match(html, /id="preview-dialog"[^>]*aria-labelledby="preview-title"/);
  assert.doesNotMatch(html, /class="project-index"|class="exhibit-controls"/);
  assert.doesNotMatch(html, /id="explorer-tools" hidden/);
});

test('OpenDownload keeps the landing page and application links distinct on both gallery pages', async () => {
  const project = projects.find(project => project.repository === 'OpenDownload');
  assert.equal(project.website, 'https://opendownload-website.vercel.app/en');
  assert.equal(project.app, 'https://opendownload.lord.blitz.cloud/');
  for (const route of ['index.html', 'projects/index.html']) {
    const html = await readFile(new URL(`../public/${route}`, import.meta.url), 'utf8');
    const card = html.match(/<article[^>]*id="project-opendownload"[\s\S]*?<\/article>/)?.[0];
    assert.ok(card);
    for (const href of [project.website, project.app, 'https://github.com/Lord-Labs/OpenDownload']) assert.ok(card.includes(`href="${href}"`));
    assert.ok(card.includes('افتح التطبيق'));
    assert.match(card, /width="1065" height="927"/);
  }
});
