import { writeFile, mkdir } from "node:fs/promises";
const assetRoot = new URL("../public/assets/", import.meta.url);
await mkdir(new URL("fonts/", assetRoot), { recursive: true });
await mkdir(new URL("icons/", assetRoot), { recursive: true });
async function download(url, destination) {
  const response = await fetch(url);
  if (!response.ok)
    throw new Error(`Asset unavailable: ${url} (${response.status})`);
  await writeFile(destination, Buffer.from(await response.arrayBuffer()));
}
for (const icon of [
  "arrow-up-right",
  "arrow-down-right",
  "rotate-cw",
  "menu",
  "x",
  "copy",
  "search", "sun", "moon", "star", "git-fork", "circle-dot",
  "arrow-right", "arrow-down", "command", "book-open", "refresh-cw",
  "check", "chevron-down", "activity", "terminal", "external-link", "pause", "play",
  "layers", "heart", "arrow-left",
  "scan",
  "box",
  "blocks",
  "code-xml",
  "message-square",
  "git-pull-request",
]) {
  await download(
    `https://raw.githubusercontent.com/lucide-icons/lucide/1.60.0/icons/${icon}.svg`,
    new URL(`icons/${icon}.svg`, assetRoot),
  );
}
// GitHub's current Invertocat is copied unmodified from the official brand toolkit ZIP.
for (const [family, file, subset] of [
  ["Space+Grotesk:wght@300..700", "space-grotesk-latin", "latin"],
  ["Manrope:wght@200..800", "manrope-latin", "latin"],
  ["Noto+Sans+Arabic:wght@100..900", "arabic", "arabic"],
]) {
  const response = await fetch(
    `https://fonts.googleapis.com/css2?family=${family}&display=swap`,
    {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
      },
    },
  );
  const css = await response.text();
  const blocks = [
    ...css.matchAll(/\/\* (.*?) \*\/\s*(@font-face\s*\{[\s\S]*?\})/g),
  ];
  const block = blocks.find((match) => match[1] === subset)?.[2] || css;
  const url = block.match(/url\((https:[^)]+)\) format\('woff2'\)/)?.[1];
  if (!url) throw new Error(`Font URL missing: ${family}`);
  await download(url, new URL(`fonts/${file}.woff2`, assetRoot));
}
await import("./patchwork-art.mjs");
console.log(
  "Prepared self-hosted fonts, official icons, and Patchwork studio artwork.",
);
