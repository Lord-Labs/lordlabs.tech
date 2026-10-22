import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { readFile } from 'node:fs/promises';
import { localizeMarkup } from '../scripts/localize.mjs';

const source = await readFile(new URL('../public/locale.js', import.meta.url), 'utf8');
function bootstrap(search, saved, blocked = false) {
  const root = {}, preloads = [];
  vm.runInNewContext(source, {
    document: { documentElement: root, head: { append: link => preloads.push(link) }, createElement: () => ({}), addEventListener: () => {} },
    MutationObserver: class { observe() {} disconnect() {} },
    localStorage: { getItem: () => { if (blocked) throw new Error('Blocked'); return saved; } },
    location: { search }, URLSearchParams,
  });
  return { root, preloads };
}
test('language and direction are resolved before body parsing; explicit links beat storage', () => {
  for (const [query, saved, expected] of [['','ar','ar'],['?lang=en','ar','en'],['?lang=ar','en','ar'],['?lang=invalid','ar','ar'],['','invalid','en']]) {
    const { root, preloads } = bootstrap(query, saved);
    assert.equal(root.lang, expected);
    assert.equal(root.dir, expected === 'ar' ? 'rtl' : 'ltr');
    assert.equal(preloads.length, 1);
    assert.match(preloads[0].href, expected === 'ar' ? /alexandria-arabic/ : /jakarta-latin/);
  }
  assert.equal(bootstrap('?lang=ar', null, true).root.lang, 'ar');
  assert.equal(bootstrap('', null, true).root.lang, 'en');
});
test('static translations survive repeated builds and escape content', () => {
  const original = '<h2 data-i18n="projectsTitle">Ideas at work.</h2><span data-copy-en="A &amp; B" data-copy-ar="أ &amp; ب">A &amp; B</span>';
  const generated = localizeMarkup(original);
  assert.equal(localizeMarkup(generated), generated);
  assert.match(generated, /data-locale="ar" lang="ar" dir="rtl">أفكار تعمل\./);
  assert.match(generated, /data-i18n-en="Ideas at work\."/);
  assert.match(generated, /A &amp; B<\/bdi>/);
  assert.throws(() => localizeMarkup('<p data-i18n="missing">Missing</p>'), /Missing Arabic/);
});
test('every public reading page and homepage ships translated text before application scripts', async () => {
  for (const route of ['index.html','projects/index.html','about/index.html','contribute/index.html','journal/index.html','journal/patchwork-by-design/index.html','journal/a-curated-window/index.html','journal/your-first-small-contribution/index.html']) {
    const html = await readFile(new URL(`../public/${route}`, import.meta.url), 'utf8');
    assert.ok(html.indexOf('/locale.js') < html.indexOf('/style.css'));
    assert.match(html, /data-locale="ar" lang="ar"/);
    assert.match(html, /\/refinements.css/);
    assert.equal(localizeMarkup(html), html);
  }
});
