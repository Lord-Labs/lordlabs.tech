import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { initHero } from '../public/hero.js';

test('the opening contains no product previews and keeps projects in the work chapter', async () => {
  const html = await readFile(new URL('../public/index.html', import.meta.url), 'utf8');
  const hero = html.match(/<section class="studio-hero"[\s\S]*?<\/section>/)[0];
  assert.doesNotMatch(hero, /hero-panel|hero-tab|project-satellite|project-screenshot|signal-field|possibility-art|assets\/projects/);
  assert.match(hero, /href="#projects"/);
  assert.match(hero, /id="remix-art" aria-pressed="false"/);
  const sections = [...html.matchAll(/<section[^>]* id="(projects|about|journal|contribute)"/g)].map(match => match[1]);
  assert.deepEqual(sections, ['projects','about','journal','contribute']);
});

test('the cloud scene idles offscreen and resumes when visible', () => {
  let visible;
  const attributes = {};
  const hero = {toggleAttribute:(key,value)=>{attributes[key]=value;}};
  const previousDocument=globalThis.document, previousObserver=globalThis.IntersectionObserver;
  globalThis.document={querySelector:()=>hero,documentElement:{lang:'en',dataset:{}}};
  globalThis.IntersectionObserver=class{constructor(callback){visible=callback;}observe(){}};
  try {
    initHero();
    visible([{isIntersecting:false}]);assert.equal(attributes['data-idle'],true);assert.equal(document.documentElement.dataset.entered,'');
    visible([{isIntersecting:true}]);assert.equal(attributes['data-idle'],false);
  } finally {globalThis.document=previousDocument;globalThis.IntersectionObserver=previousObserver;}
});

