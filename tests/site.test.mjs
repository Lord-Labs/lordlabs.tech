import test from "node:test";
import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";
import { resolve } from "node:path";
import { ar } from "../public/ar.js";
import { posts } from "../public/journal.js";
import { projects } from "../public/projects.js";
const root = resolve("public");
test("all local page assets and section links resolve", async () => {
  const page = await readFile(resolve(root, "index.html"), "utf8");
  for (const [, path] of page.matchAll(/(?:src|href)="(\/[^"?#]+)"/g))
    await access(resolve(root, "." + path));
  const ids = new Set(
    [...page.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]),
  );
  for (const [, anchor] of page.matchAll(/href="#([^"]+)"/g))
    assert.ok(ids.has(anchor), `Missing anchor ${anchor}`);
  const style = await readFile(resolve(root, "style.css"), "utf8") + await readFile(resolve(root, "journey.css"), "utf8") + await readFile(resolve(root, "sky.css"), "utf8");
  for (const [, path] of style.matchAll(/url\(["'](\/[^"']+)["']\)/g))
    await access(resolve(root, "." + path));
});
test("the rendered design tokens meet text contrast requirements", async () => {
  const style = await readFile(resolve(root, "style.css"), "utf8") + await readFile(resolve(root, "journey.css"), "utf8");
  const token = (name) => {
    const value = [...style.matchAll(new RegExp(`--${name}:\\s*#([0-9a-f]{6})`, "gi"))].at(-1);
    assert.ok(value, `Missing color token ${name}`);
    return value[1];
  };
  const luminance = (hex) => {
    const rgb = hex
      .match(/\w\w/g)
      .map((v) => parseInt(v, 16) / 255)
      .map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
    return rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722;
  };
  for (const [foreground, background, minimum] of [
    [token('carbon'), token('canvas'), 7],
    [token('muted'), token('canvas'), 4.5],
    [token('muted'), 'E8EEF8', 4.5],
    [token('muted'), 'EAF0F9', 4.5],
    [token('accent-text'), token('canvas'), 4.5],
    [token('on-accent'), token('accent'), 4.5],
    [token('hero-ink'), token('night'), 7],
    [token('hero-muted'), token('night'), 7],
    [token('hero-accent'), token('night'), 4.5],
    [token('ink-on-orange'), token('orange'), 4.5],
    [token('ink'), token('hero-accent'), 4.5],
    [token('dawn-ink'),token('dawn-floor'),7],
    [token('dawn-muted'),token('dawn-floor'),4.5],
    [token('dawn-accent'),token('dawn-floor'),4.5],
    ['FFFFFF',token('dawn-ink'),7],
    [token('ink'),'EDE8E4',7],
    [token('muted'),'EDE8E4',4.5],
    ['435571','E8EEF8',4.5],
    ['285E57','E0F0ED',4.5],
    ['415174','E7EAF2',4.5],
    [token('control-border'),token('canvas'),3],
    [token('dark-border'),token('night'),3],
  ]) {
    const values = [luminance(foreground), luminance(background)];
    const ratio = (Math.max(...values) + 0.05) / (Math.min(...values) + 0.05);
    assert.ok(ratio >= minimum, `${foreground} on ${background}: ${ratio}`);
  }
});

test("every visible translation key has an Arabic counterpart", async () => {
  const html = await readFile(resolve(root, "index.html"), "utf8");
  for (const [, key] of html.matchAll(/data-(?:i18n|placeholder)="([^"]+)"/g)) {
    assert.ok(ar[key], `Missing Arabic translation: ${key}`);
  }
  const app=await readFile(resolve(root,"app.js"),"utf8");
  const dynamic=app.match(/Object.assign\(english,\s*\{([\s\S]*?)\n\}\);/)[1];
  const englishKeys=new Set([...html.matchAll(/data-i18n="([^"]+)"/g)].map(match=>match[1]));
  for(const [,key]of dynamic.matchAll(/\b(\w+)\s*:/g))englishKeys.add(key);
  for(const [,key]of app.matchAll(/\bt\("(\w+)"\)/g)){
    assert.ok(englishKeys.has(key),`Missing dynamic English translation: ${key}`);
    assert.ok(ar[key],`Missing dynamic Arabic translation: ${key}`);
  }
});

test("the saved repository snapshot is valid, dated, and scoped to this organization", async () => {
  const snapshot = JSON.parse(await readFile(resolve(root, "data/repositories.json"), "utf8"));
  assert.ok(Number.isFinite(Date.parse(snapshot.fetchedAt)));
  assert.deepEqual(snapshot.repositories.map(repo=>repo.name),projects.map(project=>project.repository));
  for(const repo of snapshot.repositories){
    assert.equal(repo.owner.login,"Lord-Labs");
    assert.equal(repo.private,false);
    assert.ok(projects.some(project=>project.repository===repo.name));
  }
});

test("journal routes have complete bilingual content, valid local assets and unique anchors", async()=>{
  assert.equal(new Set(posts.map(post=>post.slug)).size,posts.length);
  for(const post of posts){
    await access(resolve(root, '.' + post.cover));
    assert.match(post.slug,/^[a-z0-9-]+$/);
    assert.ok(Number.isFinite(Date.parse(post.date)));
    const html=await readFile(resolve(root,`journal/${post.slug}/index.html`),"utf8");
    for(const lang of ["en","ar"]){
      assert.ok(post[lang].sections.length>=3);
      assert.ok(html.includes(`data-lang-block="${lang}"`));
      assert.ok(html.includes(post[lang].title));
      for(const source of post[lang].sources)assert.equal(new URL(source.url).protocol,"https:");
    }
    const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(match=>match[1]);
    assert.equal(new Set(ids).size,ids.length);
    for(const [,anchor]of html.matchAll(/href="#([^"]+)"/g))assert.ok(ids.includes(anchor),anchor);
    for(const [,path]of html.matchAll(/(?:src|href)="(\/[^"?#]+)"/g))await access(resolve(root,"."+path));
  }
});

test("selected projects define independent identity assets and bilingual context", async()=>{
  assert.equal(new Set(projects.map(project=>project.repository.toLowerCase())).size,projects.length);
  for(const project of projects){
    assert.match(project.identity,/^[a-z0-9-]+$/);assert.match(project.slug,/^[a-z0-9-]+$/);
    for(const key of ["logo","cover"])await access(resolve(root,"."+project[key]));
    for(const lang of ["en","ar"])for(const key of ["title","description","category","tagline","coverAlt"])assert.ok(project[key][lang]);
    assert.equal(new URL(project.website).protocol,"https:");
  }
});
