import { cp, mkdir, readFile, rm } from "node:fs/promises";
await import("./content.mjs");
// Only the generated output next to this script's project is replaced.
await rm(new URL("../dist/", import.meta.url), { recursive: true, force: true });
await mkdir("dist", { recursive: true });
await cp("public", "dist", { recursive: true, filter: source => !source.endsWith('__qa.html') });
await cp("licenses", "dist/licenses", { recursive: true });
await cp("LICENSE", "dist/LICENSE");
await cp("THIRD_PARTY.md", "dist/THIRD_PARTY.md");
const html = await readFile("dist/index.html", "utf8");
if (!html.includes("lordlabs.tech") || !html.includes("<h1"))
  throw new Error("Missing site metadata or main heading");
console.log("Built LORD Labs → dist/ (static assets, no runtime dependencies)");
