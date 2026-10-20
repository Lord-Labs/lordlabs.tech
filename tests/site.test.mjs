import test from "node:test";
import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";
import { resolve } from "node:path";
import { ar } from "../public/ar.js";
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
  const style = await readFile(resolve(root, "style.css"), "utf8");
  for (const [, path] of style.matchAll(/url\(["'](\/[^"']+)["']\)/g))
    await access(resolve(root, "." + path));
});
test("normal accent and muted text meet WCAG AA on Canvas", () => {
  const luminance = (hex) => {
    const rgb = hex
      .match(/\w\w/g)
      .map((v) => parseInt(v, 16) / 255)
      .map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
    return rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722;
  };
  for (const text of ["171B22", "B83D1B", "64635F"]) {
    const ratio = (luminance("F5F2EA") + 0.05) / (luminance(text) + 0.05);
    assert.ok(ratio >= 4.5, `${text} contrast: ${ratio}`);
  }
});

test("every visible translation key has an Arabic counterpart", async () => {
  const html = await readFile(resolve(root, "index.html"), "utf8");
  for (const [, key] of html.matchAll(/data-i18n="([^"]+)"/g)) {
    assert.ok(ar[key], `Missing Arabic translation: ${key}`);
  }
});
