import { cp, mkdir, readFile } from "node:fs/promises";
await mkdir("dist", { recursive: true });
await cp("public", "dist", { recursive: true });
const html = await readFile("dist/index.html", "utf8");
if (!html.includes("lordlabs.tech") || !html.includes("<h1"))
  throw new Error("Missing site metadata or main heading");
console.log("Built LORD Labs → dist/ (static assets, no runtime dependencies)");
