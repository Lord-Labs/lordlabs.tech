import { writeFile } from "node:fs/promises";
// An original isometric illustration; the supplied identity assets stay unmodified.
const p = (x, y, z = 0) => [360 + (x - y) * 1.07, 190 + (x + y) * 0.55 - z];
const coords = (points) =>
  points.map((v) => v.map((n) => n.toFixed(1)).join(",")).join(" ");
const poly = (points, fill, stroke = "none") =>
  `<polygon points="${coords(points)}" fill="${fill}" stroke="${stroke}" stroke-width=".8" stroke-linejoin="round"/>`;
function cube(x, y, s, h, orange, index) {
  const a = p(x, y, h),
    b = p(x + s, y, h),
    c = p(x + s, y + s, h),
    d = p(x, y + s, h);
  const sides =
    poly(
      [d, c, p(x + s, y + s), p(x, y + s)],
      orange ? "url(#orangeFront)" : "url(#front)",
    ) +
    poly(
      [b, c, p(x + s, y + s), p(x + s, y)],
      orange ? "url(#orangeSide)" : "url(#side)",
    );
  const top = poly(
    [a, b, c, d],
    orange ? "url(#orangeTop)" : "url(#top)",
    orange ? "#ffac83" : "#fff9ec",
  );
  const edge = `<path d="M${a}L${b}L${c}L${d}Z" stroke="${orange ? "#ffbc9b" : "#fffdf4"}" stroke-opacity=".6" stroke-width=".8"/>`;
  const dx = (x - 95) * 0.32,
    dy = (y - 95) * 0.18 - (orange ? 55 : 12);
  return `<g class="art-piece ${orange ? "contribution-piece" : ""}" style="--piece-x:${dx}px;--piece-y:${dy}px;--piece-delay:${index * 35}ms">${sides}${top}${edge}</g>`;
}
const defs = `<defs>
<linearGradient id="top" x2=".7" y2="1"><stop stop-color="#fffdf6"/><stop offset="1" stop-color="#d7d4c9"/></linearGradient>
<linearGradient id="front" x2="0" y2="1"><stop stop-color="#c7c3b6"/><stop offset="1" stop-color="#85877e"/></linearGradient>
<linearGradient id="side" x2="1" y2=".8"><stop stop-color="#9b9e92"/><stop offset="1" stop-color="#656e65"/></linearGradient>
<linearGradient id="orangeTop" x2="1" y2="1"><stop stop-color="#ff986a"/><stop offset="1" stop-color="#ed6035"/></linearGradient>
<linearGradient id="orangeFront" x2="0" y2="1"><stop stop-color="#e65e31"/><stop offset="1" stop-color="#b53418"/></linearGradient>
<linearGradient id="orangeSide" x2="1" y2="1"><stop stop-color="#ce4421"/><stop offset="1" stop-color="#8e2d19"/></linearGradient>
<linearGradient id="baseTop" x2="0" y2="1"><stop stop-color="#3a443e"/><stop offset="1" stop-color="#232e29"/></linearGradient>
<filter id="softShadow" x="-50%" y="-100%" width="200%" height="300%"><feGaussianBlur stdDeviation="18"/></filter>
<radialGradient id="warm"><stop stop-color="#d94e26" stop-opacity=".22"/><stop offset="1" stop-color="#d94e26" stop-opacity="0"/></radialGradient>
</defs>`;
const grid = [];
for (let i = -1; i <= 5; i++) {
  const n = i * 70;
  grid.push(
    `<path d="M${p(n, -100)}L${p(n, 420)}M${p(-100, n)}L${p(420, n)}"/>`,
  );
}
const floor = `<ellipse cx="378" cy="342" rx="270" ry="175" fill="url(#warm)"/><g stroke="#bfc9b9" stroke-opacity=".1" stroke-width=".7">${grid.join("")}</g><ellipse cx="360" cy="408" rx="238" ry="38" fill="#050c08" opacity=".65" filter="url(#softShadow)"/>`;
const plate =
  poly(
    [p(-16, -16, -8), p(281, -16, -8), p(281, 281, -8), p(-16, 281, -8)],
    "url(#baseTop)",
    "#6b7869",
  ) +
  poly(
    [p(-16, 281, -8), p(281, 281, -8), p(281, 281, -20), p(-16, 281, -20)],
    "#141e19",
  ) +
  poly(
    [p(281, -16, -8), p(281, 281, -8), p(281, 281, -20), p(281, -16, -20)],
    "#111b15",
  );
const pieces = [];
let index = 0;
for (let y = 0; y < 3; y++)
  for (let x = 0; x <= y; x++)
    pieces.push(cube(x * 91, y * 91, 84, 70, false, index++));
pieces.splice(2, 0, cube(182, 0, 84, 123, true, 6));
const markings = `<g fill="none" stroke="#b3c0aa" stroke-opacity=".5" stroke-width=".8"><path d="M90 442h14m-7-7v14M593 183h14m-7-7v14M602 454h14m-7-7v14"/><circle cx="360" cy="485" r="3"/></g><path d="M565 172h46v-37" stroke="#f39b76" stroke-opacity=".6" stroke-dasharray="3 5"/><circle cx="565" cy="172" r="3" fill="#f39b76"/>`;
export const artwork = `<svg id="sculpture" class="sculpture" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 570" role="img" aria-label="Sculptural Patchwork blocks with an orange contribution piece.">${defs}${floor}${plate}${pieces.join("")}${markings}</svg>`;
await writeFile(
  new URL("../public/assets/patchwork-studio.svg", import.meta.url),
  artwork,
);
