import { getPublicRepositories } from "./repositories.js";
import { ar } from "./ar.js";

const originals = new Map(
  [...document.querySelectorAll("[data-i18n]")].map((element) => [
    element,
    element.innerHTML,
  ]),
);
let language = "en";
let exploded = false;
let live = false;
let repositories = [];
function setLanguage(next) {
  language = next;
  document.documentElement.lang = next;
  document.documentElement.dir = next === "ar" ? "rtl" : "ltr";
  for (const [element, original] of originals) {
    if (next === "ar" && ar[element.dataset.i18n]) {
      element.textContent = ar[element.dataset.i18n];
      element.style.whiteSpace = "pre-line";
    } else {
      element.innerHTML = original;
      element.style.whiteSpace = "";
    }
  }
  const control = document.querySelector("#language");
  control.textContent = next === "ar" ? "English" : "العربية";
  control.lang = next === "ar" ? "en" : "ar";
  control.setAttribute(
    "aria-label",
    next === "ar" ? "Switch to English" : "التبديل إلى العربية",
  );
  document
    .querySelector("#menu-toggle")
    .setAttribute(
      "aria-label",
      next === "ar" ? "قائمة التنقل" : "Navigation menu",
    );
  document
    .querySelector(".desktop-nav")
    .setAttribute(
      "aria-label",
      next === "ar" ? "التنقل الرئيسي" : "Main navigation",
    );
  document
    .querySelector("#mobile-nav")
    .setAttribute(
      "aria-label",
      next === "ar" ? "التنقل على الموبايل" : "Mobile navigation",
    );
  document
    .querySelector(".brand")
    .setAttribute(
      "aria-label",
      next === "ar" ? "LORD Labs — الرئيسية" : "LORD Labs home",
    );
  document
    .querySelector(".footer-brand")
    .setAttribute(
      "aria-label",
      next === "ar" ? "العودة لأعلى الصفحة" : "Back to top",
    );
  document
    .querySelector(".project-visual")
    .setAttribute(
      "aria-label",
      next === "ar"
        ? "استكشف موقع lordlabs.tech على GitHub"
        : "Explore lordlabs.tech on GitHub",
    );
  document
    .querySelector("#sculpture")
    .setAttribute(
      "aria-label",
      next === "ar"
        ? "وحدات مجسمة لهوية Patchwork مع وحدة برتقالية تمثل المساهمة."
        : "Sculptural Patchwork blocks with an orange contribution piece.",
    );
  document.title =
    next === "ar"
      ? "LORD Labs — نبني أفكارًا، لتبني عليها."
      : "LORD Labs — Built to be built upon.";
  document.querySelector("#copy-status").textContent = "";
  updateArt();
  updateStatus();
  renderRepositories();
  try {
    localStorage.setItem("lordlabs-language", next);
  } catch {
    /* Language still works when storage is blocked. */
  }
}
function updateStatus() {
  document.querySelector("#repo-status").textContent =
    language === "ar"
      ? ar[live ? "live" : "snapshot"]
      : live
        ? "Live from GitHub"
        : "Repository snapshot";
}
function renderRepositories() {
  document.querySelectorAll(".repo-extra").forEach((card) => card.remove());
  const grid = document.querySelector("#project-grid");
  const invitation = document.querySelector("#next-project");
  for (const repo of repositories.filter(
    (repo) => repo.name !== "lordlabs.tech",
  )) {
    const card = document.createElement("article");
    card.className = "project-card repo-extra";
    const visual = document.createElement("a");
    visual.className = "project-visual";
    visual.href = repo.url;
    const image = document.createElement("img");
    image.src = "/assets/brand/symbol.svg";
    image.alt = "";
    image.width = 80;
    image.height = 80;
    image.loading = "lazy";
    const name = document.createElement("span");
    name.textContent = repo.name;
    name.dir = "auto";
    visual.append(image, name);
    const info = document.createElement("div");
    info.className = "project-info";
    const meta = document.createElement("div");
    meta.className = "project-meta mono";
    meta.textContent = language === "ar" ? ar.repository : "REPOSITORY";
    const heading = document.createElement("h3");
    const link = document.createElement("a");
    link.href = repo.url;
    link.textContent = repo.name;
    link.dir = "auto";
    const arrow = document.createElement("img");
    arrow.className = "icon";
    arrow.src = "/assets/icons/arrow-up-right.svg";
    arrow.alt = "";
    link.append(arrow);
    heading.append(link);
    const description = document.createElement("p");
    description.dir = "auto";
    description.textContent =
      repo.description ||
      (language === "ar"
        ? ar.noDescription
        : "Explore this project and its source code on GitHub.");
    const tags = document.createElement("div");
    tags.className = "project-tags";
    for (const label of [repo.language, repo.license].filter(Boolean)) {
      const tag = document.createElement("span");
      tag.textContent = label;
      tags.append(tag);
    }
    info.append(meta, heading, description, tags);
    card.append(visual, info);
    grid.insertBefore(card, invitation);
  }
}
document
  .querySelector("#language")
  .addEventListener("click", () =>
    setLanguage(language === "en" ? "ar" : "en"),
  );
const menu = document.querySelector("#mobile-nav");
const menuButton = document.querySelector("#menu-toggle");
function closeMenu() {
  menu.hidden = true;
  menuButton.setAttribute("aria-expanded", "false");
}
menuButton.addEventListener("click", () => {
  menu.hidden = !menu.hidden;
  menuButton.setAttribute("aria-expanded", String(!menu.hidden));
});
menu
  .querySelectorAll("a")
  .forEach((link) => link.addEventListener("click", closeMenu));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !menu.hidden) {
    closeMenu();
    menuButton.focus();
  }
});
function updateArt() {
  const button = document.querySelector("#reassemble");
  const label =
    language === "ar"
      ? ar[exploded ? "assembleView" : "explodeView"]
      : exploded
        ? "Assemble view"
        : "Explode view";
  button.setAttribute("aria-pressed", String(exploded));
  button.setAttribute("aria-label", label);
  button.querySelector("[data-i18n]").textContent = label;
  document
    .querySelector("#art-stage")
    .classList.toggle("is-exploded", exploded);
}
document.querySelector("#reassemble").addEventListener("click", () => {
  exploded = !exploded;
  updateArt();
});
document.querySelector("#copy-repo").addEventListener("click", async () => {
  const url = "https://github.com/Lord-Labs/lordlabs.tech";
  const status = document.querySelector("#copy-status");
  try {
    await navigator.clipboard.writeText(url);
    status.textContent =
      language === "ar" ? ar.copied : "Repository link copied.";
  } catch {
    status.textContent =
      (language === "ar" ? ar.copyFailed : "Could not copy. Repository link:") +
      " " +
      url;
  }
});
const navigation = document.querySelectorAll(".desktop-nav a");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries)
        if (entry.isIntersecting) {
          for (const link of navigation) {
            if (link.hash === "#" + entry.target.id)
              link.setAttribute("aria-current", "location");
            else link.removeAttribute("aria-current");
          }
        }
    },
    { rootMargin: "-15% 0px -60% 0px" },
  );
  for (const section of document.querySelectorAll(
    ".hero-shell, #projects, #about, #contribute",
  ))
    observer.observe(section);
}
document.querySelector("#year").textContent = new Date().getFullYear();
try {
  if (localStorage.getItem("lordlabs-language") === "ar") setLanguage("ar");
} catch {
  /* Default to English without storage. */
}
getPublicRepositories()
  .then((result) => {
    repositories = result;
    live = true;
    renderRepositories();
    updateStatus();
  })
  .catch(() => {
    updateStatus();
  });
