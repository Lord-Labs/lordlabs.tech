import { getPublicRepositories } from "./repositories.js";

const ar = {
  skip: "تخطَّ إلى المحتوى",
  navProjects: "المشاريع",
  navAbout: "عن المعمل",
  navContribute: "ساهم معنا",
  eyebrow: "فكر مستقل. ومصدر مفتوح.",
  hero1: "نبني أفكارًا",
  hero2: "تستحق المشاركة.",
  heroDescription:
    "معمل برمجيات صغير، بفضول كبير. نصنع أدوات مفيدة، ونستكشف أفكارًا جديدة، ونشارك معكم رحلة البناء.",
  explore: "استكشف المشاريع",
  viewGithub: "تابعنا على GitHub",
  heroNote: "نصنع بفضول. ونشارك مع الجميع.",
  artCaption: "أجزاء صغيرة. احتمالات أكبر.",
  strip1: "مساحة تتطور، بطبيعتها.",
  strip2: "فضول ← كود ← مساهمة",
  projectKicker: "01 / ما نبنيه",
  snapshot: "لقطة من المستودعات",
  live: "مباشر من GitHub",
  projectsTitle: "أفكارنا، على المكشوف.",
  projectsIntro:
    "من أول سطر كود، إلى ما سيأتي بعده.\nاستكشف ما يتشكل داخل المعمل.",
  website: "موقع الويب",
  openSource: "مفتوح المصدر",
  siteDescription:
    "مساحة المعمل على الويب. موقع خفيف باللغتين العربية والإنجليزية، مستوحى من هوية Patchwork.",
  nextKicker: "دعوة مفتوحة",
  nextTitle: "مساحة للفكرة القادمة.",
  nextDescription:
    "رحلة المعمل في بدايتها. تظهر المشاريع العامة الجديدة هنا فور نشرها.",
  followLab: "استكشف الأورجانيزيشن",
  publicOnly: "مستودعات عامة. عمل حقيقي. وتطور مستمر.",
  allRepositories: "جميع المستودعات",
  aboutKicker: "02 / طريقة تفكيرنا",
  about1: "معمل صغير.",
  about2: "احتمالات مفتوحة.",
  aboutDescription:
    "LORD Labs معمل برمجيات مستقل أسسه أحمد شعبان. مساحة للمشاريع المفيدة، والتجارب المدروسة، والتعلم من خلال البناء.",
  founder: "المؤسس والمطور",
  principle1: "الفائدة أولًا.",
  principle1Description:
    "نبدأ بمشكلة حقيقية. ونصنع شيئًا يجعل جزءًا صغيرًا من يوم شخص ما أفضل.",
  principle2: "المشاركة هي الأساس.",
  principle2Description:
    "نشارك الكود وطريقة التفكير وراءه. لتتمكن من فهمه، واستخدامه، والبناء عليه.",
  principle3: "معًا، نصنع الأفضل.",
  principle3Description:
    "الأفكار الجيدة تأتي من كل مكان. سؤال، أو إصلاح، أو وجهة نظر جديدة؛ كلها تدفع العمل للأمام.",
  contributeKicker: "03 / قطعتك تكمل الصورة",
  contribute1: "الأشياء الكبيرة تبدأ",
  contribute2: "بمساهمة صغيرة.",
  contributeIntro:
    "مش محتاج فكرة كبيرة عشان تشارك.\nقليل من الفضول بداية كافية.",
  exploreCode: "استكشف الكود",
  exploreCodeDescription:
    "اقرأ الكود، وانسخه، وطوّره بطريقتك. ابحث عن مشروع يثير فضولك.",
  browseRepos: "تصفح المستودعات",
  shareIdea: "ابدأ حوارًا",
  shareIdeaDescription:
    "وجدت مشكلة أو عندك فكرة للموقع؟ افتح Issue. كل تفصيلة بتفرق.",
  openIssue: "افتح Issue",
  makeContribution: "ابدأ أول مساهمة",
  makeContributionDescription:
    "كود، أو توثيق، أو ترجمة أفضل. توجد أكثر من طريقة للمشاركة.",
  readGuide: "اقرأ دليل المساهمة",
  closingKicker: "المساهمة القادمة قد تكون مساهمتك.",
  closingTitle: "لنبنِ معًا، على المكشوف.",
  footerNote: "برمجيات مستقلة. أفكار مفتوحة.",
  repository: "مستودع",
  noDescription: "استكشف هذا المشروع والكود الخاص به على GitHub.",
};
const originals = new Map(
  [...document.querySelectorAll("[data-i18n]")].map((element) => [
    element,
    element.innerHTML,
  ]),
);
let language = "en";
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
    .querySelector("#reassemble")
    .setAttribute(
      "aria-label",
      next === "ar" ? "أعد تركيب الوحدات" : "Reassemble the blocks",
    );
  document.querySelector("#sculpture").alt =
    next === "ar"
      ? "وحدات مجسمة تشكل شعار LORD Labs ومربع برتقالي يمثل المساهمة."
      : "Isometric blocks forming the LORD Labs symbol, with an orange contribution block.";
  document.title =
    next === "ar"
      ? "LORD Labs — نبني أفكارًا تستحق المشاركة."
      : "LORD Labs — Build something worth sharing.";
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
document.querySelector("#reassemble").addEventListener("click", () => {
  const stage = document.querySelector("#art-stage");
  stage.classList.remove("rebuilding");
  requestAnimationFrame(() => {
    stage.classList.add("rebuilding");
    setTimeout(() => stage.classList.remove("rebuilding"), 700);
  });
});
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
