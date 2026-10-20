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
// An original vector composition, using the supplied Patchwork proportions and palette.
const project = (x, y, z = 0) => [
  320 + (x - y) * 0.93,
  100 + (x + y) * 0.49 - z,
];
const points = (list) => list.map((p) => p.join(",")).join(" ");
const polygon = (vertices, fill) =>
  `<polygon points="${points(vertices)}" fill="${fill}" stroke="${fill}" stroke-linejoin="round"/>`;
function block(x, y, size, height, colors) {
  const a = project(x, y, height),
    b = project(x + size, y, height),
    c = project(x + size, y + size, height),
    d = project(x, y + size, height);
  return (
    polygon(
      [d, c, project(x + size, y + size), project(x, y + size)],
      colors[1],
    ) +
    polygon(
      [b, c, project(x + size, y + size), project(x + size, y)],
      colors[2],
    ) +
    polygon([a, b, c, d], colors[0])
  );
}
const pieces = [];
pieces.push(block(-10, -10, 276, 8, ["#e5e0d5", "#d6d0c4", "#c4beaf"]));
for (let y = 0; y < 3; y++)
  for (let x = 0; x <= y; x++)
    pieces.push(
      block(x * 87, y * 87, 80, 52, ["#343941", "#171b22", "#252a32"]),
    );
pieces.splice(2, 0, block(174, 0, 80, 91, ["#e4673c", "#bd3918", "#d94e26"]));
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" fill="none"><defs><filter id="shadow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="17"/></filter></defs><ellipse cx="323" cy="360" rx="205" ry="40" fill="#4e4638" opacity=".14" filter="url(#shadow)"/>${pieces.join("")}<path d="M531 182h18m-9-9v18M113 317h14m-7-7v14" stroke="#b6b0a5" stroke-width="1"/><circle cx="320" cy="421" r="2" fill="#d94e26"/></svg>`;
await writeFile(new URL("patchwork.svg", assetRoot), svg);
console.log(
  "Prepared self-hosted fonts, authentic GitHub/Lucide icons, and original Patchwork artwork.",
);
