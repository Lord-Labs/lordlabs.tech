import { initHero } from "./hero.js";
import { initHeader } from "./experience.js";
import { getSelectedRepositories, normalizeRepositories, curateRepositories, selectRepositories } from "./repositories.js";
import { projectCopy } from "./projects.js";
import { posts } from "./journal.js";
import { ar } from "./ar.js";
const $ = (selector) => document.querySelector(selector);
const english = Object.fromEntries([...document.querySelectorAll('[data-i18n]')].map(el => [el.dataset.i18n, el.dataset.i18nEn || el.textContent]));
Object.assign(english, {
  navProjects:"Projects", navAbout:"The lab", navContribute:"Contribute",
  navigationMenu:"Navigation menu", pauseMotion:"Pause motion", resumeMotion:"Resume motion", motionReduced:"Motion reduced", navJournal:"Journal", sortCurated:"Our selection", productPreview:"PRODUCT PREVIEW", expandPreview:"Expand preview", previewTitle:"Inside the product", readArticle:"Read the article", minutes:"min read", articlesGroup:"JOURNAL", selectedProjects:"Projects, with purpose",
  viewSource:"Explore the source",
  searchPlaceholder:"Search by name, topic, or idea…", commandPlaceholder:"Where would you like to go?",
  loading:"Updating from GitHub", live:"Live from GitHub", snapshot:"Saved copy", unavailable:"GitHub unavailable · showing saved projects", noData:"Could not load · explore GitHub directly",
  details:"Project details", results:"projects shown", of:"of", updated:"Updated", noDescription:"Explore this project and its source code on GitHub.", repository:"Repository", stars:"Stars", forks:"Forks", openItems:"Open issues & PRs", license:"License", noLicense:"No license specified on GitHub", noRepositories:"No projects are selected for display.", noUpdates:"Updates will appear when GitHub provides a push date.",
  pages:"GO SOMEWHERE", projectsGroup:"PROJECTS", commandEmpty:"No matches. Try a project or a section name.", close:"Close", quickNavigation:"Search this site", refresh:"Refresh projects", clone:"Make it yours locally", copyCommand:"Copy clone command", copied:"Clone command copied.", copyFailed:"Could not copy. Copy the command from the field:", readme:"Read the README", website:"Visit website", home:"Home", detailName:"Project notes",
});
let language = "en", repositories = [], loading = false, live = false, snapshotDate = null, loaded = false, attempted = false;
const t = (key) => language === "ar" ? ar[key] || english[key] || key : english[key] || key;
const date = (value) => value ? new Intl.DateTimeFormat(language === "ar" ? "ar-EG" : "en-GB", {dateStyle:"medium"}).format(new Date(value)) : "";
function node(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
}
function icon(name) { const image = node("img", "icon"); image.src = `/assets/icons/${name}.svg`; image.alt = ""; image.width = 20; image.height = 20; return image; }
function link(url, text, className = "text-link") { const a = node("a", className); a.href = url; a.append(node("span", "", text), icon("arrow-up-right")); return a; }
function tags(repo) {
  const container=node("div","repo-tags"), seen=new Set();
  for(const tag of [repo.language,...repo.topics].filter(Boolean)){
    if(seen.has(tag.toLocaleLowerCase()))continue;seen.add(tag.toLocaleLowerCase());
    container.append(node("span","",tag));if(container.children.length===5)break;
  }
  return container;
}
function setLanguage(next) {
  language = next;
  document.documentElement.lang = next;
  document.documentElement.dir = next === "ar" ? "rtl" : "ltr";
  const languageUrl=new URL(location.href);languageUrl.searchParams.set("lang",next);history.replaceState(null,"",languageUrl);
  for (const element of document.querySelectorAll("[data-i18n]")) element.textContent = t(element.dataset.i18n);
  for (const element of document.querySelectorAll("[data-copy-en]")) element.textContent=element.dataset[next==="ar"?"copyAr":"copyEn"];
  for (const image of document.querySelectorAll("[data-alt-en]")) image.alt=image.dataset[next==="ar"?"altAr":"altEn"];

  document.querySelector(".mobile-nav summary").setAttribute("aria-label",t("navigationMenu"));
  document.querySelector(".mobile-nav nav").setAttribute("aria-label",t("navigationMenu"));
  document.querySelector('.journey-rail')?.setAttribute('aria-label', next === 'ar' ? 'فصول الرحلة' : 'Page chapters');
  document.querySelector('.project-filters').setAttribute('aria-label', next === 'ar' ? 'نوع المشروع' : 'Project type');
  document.querySelector('.toolbelt')?.setAttribute('aria-label', next === 'ar' ? 'تقنيات نستخدمها في مشاريعنا' : 'Technologies used in our projects');
  for (const element of document.querySelectorAll("[data-placeholder]")) element.placeholder = t(element.dataset.placeholder);
  for (const anchor of document.querySelectorAll("[data-journal-link]")) anchor.href=`/journal/?lang=${next}`;
  for (const anchor of document.querySelectorAll("[data-local-language]")) {
    const url = new URL(anchor.href);
    url.searchParams.set("lang", next);
    anchor.href = url.href;
  }
  const languageButton = $("#language");
  languageButton.textContent = next === "ar" ? "English" : "العربية";
  languageButton.lang = next === "ar" ? "en" : "ar";
  languageButton.setAttribute("aria-label", next === "ar" ? "Switch to English" : "التبديل إلى العربية");
  for (const el of document.querySelectorAll("[data-close-dialog]")) el.setAttribute("aria-label", t("close"));
  for (const el of document.querySelectorAll("[data-open-search]")) el.setAttribute("aria-label", t("quickNavigation"));
  $("#refresh").setAttribute("aria-label", t("refresh"));
  $(".desktop-nav").setAttribute("aria-label", next === "ar" ? "التنقل الرئيسي" : "Main navigation");
  document.querySelector("[data-footer-routes]")?.setAttribute("aria-label", next === "ar" ? "أكمل الاستكشاف" : "Continue exploring");
  $(".hero-live")?.setAttribute("aria-label", next === "ar" ? "نظرة على المنظمة" : "Organization overview");
  document.title = document.body.classList.contains('projects-page') ? `${t('navProjects')} — LORD Labs` : next === "ar" ? "LORD Labs — المشاريع والأفكار." : "LORD Labs — Projects & possibilities.";
  updateStatus();
  if (loaded) { updateLanguageOptions(); renderRepositories(); renderOverview(); }
  renderCommands();
  renderJournal();
  updateMotionControl();
  updateFilterIndicator();
  for(const el of document.querySelectorAll("[data-aria-en]"))el.setAttribute("aria-label",el.dataset[next === "ar" ? "ariaAr" : "ariaEn"]);
  document.dispatchEvent(new Event("languagechange"));
  try { localStorage.setItem("lordlabs-language", next); } catch { /* Storage is optional. */ }
}
$("#language").addEventListener("click", () => setLanguage(language === "en" ? "ar" : "en"));
function updateStatus() {
  $("#repo-status").textContent = loading || (!attempted && !loaded) ? t("loading") : live ? t("live") : loaded ? `${t("unavailable")}${snapshotDate ? " · " + date(snapshotDate) : ""}` : t("noData");
  $(".data-state").classList.toggle("is-loading", loading);
  $("#refresh").disabled = loading;
  $("#repository-list").setAttribute("aria-busy", String(loading));
}
function updateLanguageOptions() {
  const select = $("#language-filter"), selected = select.value;
  select.replaceChildren(new Option(t("allLanguages"), ""));
  for (const value of [...new Set(repositories.map(repo => repo.language).filter(Boolean))].sort()) select.add(new Option(value, value));
  select.closest(".select-field").hidden = select.options.length <= 2;
  $("#project-sort").closest(".select-field").hidden = repositories.length < 2;
  select.value = select.options.length > 2 && [...select.options].some(option => option.value === selected) ? selected : "";
  if (repositories.length < 2) $("#project-sort").value = "curated";
}
let projectFilter = 'all';
const filters = [...document.querySelectorAll('[data-project-filter]')];
function updateFilterIndicator() {
  const button = filters.find(item => item.getAttribute('aria-pressed') === 'true');
  const indicator = document.querySelector('.filter-selection');
  indicator.style.width = button.offsetWidth + 'px';
  indicator.style.transform = `translateX(${button.offsetLeft}px)`;
}
function setProjectFilter(button) {
  projectFilter = button.dataset.projectFilter;
  filters.forEach(item => { item.setAttribute('aria-pressed', String(item === button)); item.tabIndex = item === button ? 0 : -1; });
  updateFilterIndicator();
  if (loaded) renderRepositories(true);
}
filters.forEach((button, index) => {
  button.addEventListener('click', () => setProjectFilter(button));
  button.addEventListener('keydown', event => {
    if (!['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) return;
    event.preventDefault();
    const step = (event.key === 'ArrowRight' ? 1 : -1) * (document.documentElement.dir === 'rtl' ? -1 : 1);
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? filters.length - 1 : (index + step + filters.length) % filters.length;
    setProjectFilter(filters[next]); filters[next].focus();
  });
});
new ResizeObserver(updateFilterIndicator).observe(document.querySelector('.project-filters'));
let galleryAnimation;
function renderRepositories(animate = false) {
  if (!loaded) return;
  const focusedCard = document.activeElement.closest('.repo-card');
  const focusedIndex = focusedCard ? [...focusedCard.querySelectorAll('a,button')].indexOf(document.activeElement) : -1;
  const options = {query:$("#project-search").value, language:$("#language-filter").value, sort:$("#project-sort").value};
  const matches = selectRepositories(repositories, options).filter(repo => projectFilter === "all" || repo.project.platform === projectFilter);
  const list = $("#repository-list");
  const renderKey=JSON.stringify([language,projectFilter,options,matches]);
  if(list.dataset.renderKey===renderKey)return;
  list.dataset.renderKey=renderKey;list.replaceChildren();
  for (const repo of matches) {
    const project=repo.project;
    const card = node("article", `repo-card identity-${project.identity}`);card.id=`project-${project.slug}`;
    const poster=node('figure','project-poster');
    const topline=node('div','poster-topline');
    const mark=node('img','project-logo');mark.src=project.logo;mark.alt='';mark.width=40;mark.height=40;
    topline.append(node('span','mono',`0${repositories.indexOf(repo)+1} / ${projectCopy(project,'category',language)}`),mark);
    const title=node('span','poster-title',project.title.en);title.dir='ltr';title.setAttribute('aria-hidden','true');
    const tagline=node('p','poster-tagline',projectCopy(project,'posterLine',language)||projectCopy(project,'tagline',language));
    const preview=node('button','preview-trigger');preview.type='button';preview.setAttribute('aria-label',`${t('expandPreview')} · ${project.title.en}`);
    const shot=node('img','project-screenshot');shot.src=project.cover;shot.alt=projectCopy(project,'coverAlt',language);shot.width=project.slug==='lor'?1440:1202;shot.height=project.slug==='lor'?900:831;shot.loading='lazy';shot.decoding='async';
    preview.append(shot);preview.addEventListener('click',()=>openPreview(project));
    const posterFoot=node('figcaption','poster-foot');posterFoot.append(node('span','',t('productPreview')),icon('scan'));
    poster.append(topline,title,tagline,preview,posterFoot);
    const body=node('div','repo-content');
    const heading=node('h3');heading.append(link(project.website,project.title.en,'repo-title'));
    const description=node('p','project-description',projectCopy(project,'description',language));description.dir='auto';
    const features=node('ul','poster-benefits');
    for(const feature of project.features)features.append(node('li','',feature.title[language]));
    const actions=node('div','repo-actions');
    const source=link(repo.url,t('viewSource'),'text-link');source.prepend(icon('github'));
    const details=node('button','detail-button');details.append(node('span','',t('details')),icon('arrow-right'));details.addEventListener('click',()=>openDetails(repo));
    actions.append(source,details);
    body.append(node('span','repo-category mono',projectCopy(project,'category',language)),heading,description,features,actions);
    card.append(poster,body);list.append(card);
  }
  if(animate === true && document.documentElement.dataset.motion !== "off" && !matchMedia('(prefers-reduced-motion: reduce)').matches){
    galleryAnimation?.cancel();
    galleryAnimation=list.animate([{opacity:.4,transform:'translateY(10px)'},{opacity:1,transform:'translateY(0)'}],{duration:280,easing:'cubic-bezier(.22,1,.36,1)'});
  }
  if (focusedIndex >= 0) document.getElementById(focusedCard.id)?.querySelectorAll('a,button')[focusedIndex]?.focus({preventScroll:true});
  $("#result-count").textContent = language === "en"
    ? `${matches.length} of ${repositories.length} ${repositories.length === 1 ? "project" : "projects"}`
    : `${matches.length} من ${repositories.length} مشروع`;
  $("#empty-state").hidden = matches.length > 0;
  $("#empty-state h3").textContent = t(repositories.length ? "noResults" : "noRepositories");
  $("#empty-state p").hidden = !repositories.length;
  $("#reset-search").hidden = !repositories.length;
  $("#clear-filters").hidden = !options.query && !options.language && options.sort === "curated" && projectFilter === "all";
}
function resetFilters(focus=true) { projectFilter="all"; filters.forEach((button,i)=>{button.setAttribute("aria-pressed",String(i===0));button.tabIndex=i===0?0:-1;});updateFilterIndicator(); $("#project-search").value=""; $("#language-filter").value=""; $("#project-sort").value="curated"; renderRepositories(); if(focus)$("#project-search").focus(); }
document.addEventListener('click',event=>{
  const anchor=event.target.closest('a[data-project-jump]');
  if(anchor && new URL(anchor.href).pathname===location.pathname && !document.getElementById(anchor.hash.slice(1)) && loaded)resetFilters(false);
});
function openPreview(project){
  const image=node('img');image.src=project.cover;image.alt=projectCopy(project,'coverAlt',language);image.width=project.slug === "lor" ? 1440 : 1202;image.height=project.slug === "lor" ? 900 : 831;
  $('#preview-title').textContent=`${projectCopy(project,'title',language)} · ${t('previewTitle')}`;
  const caption=node('p','',projectCopy(project,'coverAlt',language));
  $('#preview-content').replaceChildren(image,caption);
  $('#preview-dialog').showModal();
}
$("#project-search").addEventListener("input", () => renderRepositories(true));
$("#language-filter").addEventListener("change", () => renderRepositories(true));
$("#project-sort").addEventListener("change", () => renderRepositories(true));
$("#clear-filters").addEventListener("click", resetFilters);
$("#reset-search").addEventListener("click", resetFilters);
function renderOverview() {
  if ($("#project-total")) $("#project-total").textContent = String(repositories.length);
  filters[0].lastElementChild.textContent = String(repositories.length).padStart(2, '0');
  if ($("#note-total")) $("#note-total").textContent = String(posts.length);
  const list = $("#update-list"); if (!list) return; list.replaceChildren();
  const updates = selectRepositories(repositories,{sort:"updated"}).filter(repo => repo.updatedAt).slice(0,4);
  for (const repo of updates) {
    const row = node("a", "update-row"); row.href=repo.url;
    const body = node("div"); const time=node("time","",date(repo.updatedAt));time.dateTime=repo.updatedAt;
    body.append(node("small","",t("repositoryUpdate")), node("h3","",repo.name), time);
    row.append(node("span","update-marker"), body, icon("arrow-up-right")); list.append(row);
  }
  if (!updates.length) list.append(node("p","feed-note",t("noUpdates")));
}
async function copyCommand(command, button) {
  const feedback = $("#clone-feedback");
  try { await navigator.clipboard.writeText(command); feedback.textContent = t("copied"); button.replaceChildren(icon("check")); button.classList.add("is-copied"); button.setAttribute("aria-label", t("copied")); setTimeout(()=>{button.replaceChildren(icon("copy"));button.classList.remove("is-copied");button.setAttribute("aria-label",t("copyCommand"));},2000); }
  catch { feedback.textContent = `${t("copyFailed")} ${command}`; }
}
let detailedProjectSlug="";
function openDetails(repo) {
  const project=repo.project;
  detailedProjectSlug=project.slug;
  const body=node("div",`project-detail identity-${project.identity}`); const heading=node("h2","",projectCopy(project,"title",language)); heading.id="detail-title";
  const description=node("p","",projectCopy(project,"description",language)); description.dir="auto";
  const image=node("img","detail-preview");image.src=project.cover;image.alt=projectCopy(project,"coverAlt",language);image.width=project.slug === "lor" ? 1440 : 1202;image.height=project.slug === "lor" ? 900 : 831;
  const stats=node("div","detail-stats");
  for (const [key,value] of [["stars",repo.stars],["forks",repo.forks],["openItems",repo.openItems]]) {const stat=node("div","detail-stat");stat.append(node("strong","",String(value)),node("span","",key === "openItems" ? (language === "ar" ? "قضايا وطلبات" : "Open items") : t(key)));stat.setAttribute("aria-label",`${t(key)}: ${value}`);stats.append(stat);}
  const metadata=node("p","detail-updated",`${t("license")}: ${repo.license || t("noLicense")}${repo.updatedAt ? " · "+t("updated")+" "+date(repo.updatedAt) : ""}`);
  const benefits=node('ul','detail-features');
  for(const feature of project.features){const item=node('li');item.append(node('strong','',feature.title[language]),node('p','',feature.description[language]));benefits.append(item);}
  const command=`git clone ${repo.url}.git`;
  const clone=node("div","clone-field"); const code=node("code","",command); const copy=node("button");copy.setAttribute("aria-label",t("copyCommand"));copy.append(icon("copy"));copy.addEventListener("click",()=>copyCommand(command,copy));clone.append(code,copy);
  const feedback=node("p","clone-feedback");feedback.id="clone-feedback";feedback.setAttribute("role","status");feedback.setAttribute("aria-live","polite");
  const links=node("div","detail-links");links.append(link(repo.url,t("viewSource"),"button secondary"),link(repo.url+"#readme",t("readme")));
  links.append(link(project.website,t("website")));
  body.append(heading,description,image,benefits,tags(repo),node("p","",projectCopy(project,"note",language)),stats,metadata,node("span","clone-label",t("clone")),clone,feedback,links);
  $("#project-detail").replaceChildren(body); $("#project-dialog").showModal();
}
const commandDialog=$("#command-dialog");
function renderCommands() {
  const query=$("#command-search").value.trim().toLocaleLowerCase();
  const results=$("#command-results");results.replaceChildren();
  const pages=[["home","home","blocks"],["navProjects","projects","layers"],["navAbout","about","scan"],["navJournal","journal","book-open"],["navContribute","contribute","git-pull-request"]];
  const matches=pages.filter(([key])=>[english[key],ar[key]].join(" ").toLocaleLowerCase().includes(query));
  if(matches.length) results.append(node("p","command-group",t("pages")));
  for(const [key,id,symbol] of matches){const row=node("a","command-result");row.href=id==='home'?`/?lang=${language}`:`/${id}/?lang=${language}`;row.append(icon(symbol),node("span","",t(key)));row.addEventListener("click",()=>commandDialog.close());results.append(row);}
  const repos=selectRepositories(repositories,{query,sort:"name"});
  if(repos.length)results.append(node("p","command-group",t("projectsGroup")));
  for(const repo of repos){const row=node("a","command-result");row.href=location.pathname==='/projects/'?`#project-${repo.project.slug}`:`/projects/?lang=${language}#project-${repo.project.slug}`;row.dataset.projectJump="";row.append(icon("github"),node("span","",projectCopy(repo.project,"title",language)),node("small","",repo.language),icon("arrow-right"));row.addEventListener("click",()=>commandDialog.close());results.append(row);}
  const notes=posts.filter(post=>[post.en.title,post.ar.title,post.en.category,post.ar.category].join(" ").toLocaleLowerCase().includes(query));
  if(notes.length)results.append(node("p","command-group",t("articlesGroup")));
  for(const post of notes){const row=node("a","command-result");row.href=`/journal/${post.slug}/?lang=${language}`;row.append(icon("book-open"),node("span","",post[language].title),icon("arrow-up-right"));results.append(row);}
  if(!matches.length&&!repos.length&&!notes.length)results.append(node("p","command-empty",t("commandEmpty")));
}
function renderJournal(){
  const list=$("#journal-list");if(!list)return;list.replaceChildren();
  for(const [index,post] of posts.entries()){
    const copy=post[language],card=node("article",`journal-card journal-${post.art}`);
    const a=node("a","journal-card-link");a.href=`/journal/${post.slug}/?lang=${language}`;
    const art=node("div","journal-art");art.setAttribute("aria-hidden","true");art.append(node("span","art-index mono",`FIELD NOTE / 0${index+1}`));
    const image=node("img","journal-image");image.src=post.cover;image.alt="";image.width=736;image.height=414;image.loading="lazy";art.prepend(image);
    const body=node("div","journal-card-body");body.append(node("span","journal-category mono",copy.category),node("h3","",copy.title),node("p","",copy.summary));
    const foot=node("div","journal-card-foot");foot.append(node("span","",language==="ar"&&post.minutes===2?"دقيقتان للقراءة":`${post.minutes} ${t("minutes")}`),icon("arrow-up-right"));const time = node('time','journal-date',date(post.date));time.dateTime=post.date;
    foot.prepend(time);body.append(foot);a.append(art,body);card.append(a);list.append(card);
  }
}
function openSearch(){if($("#project-dialog").open)$("#project-dialog").close();$("#command-search").value="";renderCommands();if(!commandDialog.open)commandDialog.showModal();$("#command-search").focus();}
for(const control of document.querySelectorAll("[data-open-search]"))control.addEventListener("click",openSearch);
$("#command-search").addEventListener("input",renderCommands);
commandDialog.addEventListener("keydown",event=>{
  if(!["ArrowDown","ArrowUp"].includes(event.key))return;
  const rows=[...commandDialog.querySelectorAll(".command-result")];if(!rows.length)return;
  event.preventDefault();const current=rows.indexOf(document.activeElement);
  const next=current<0?(event.key==="ArrowDown"?0:rows.length-1):(current+(event.key==="ArrowDown"?1:-1)+rows.length)%rows.length;
  rows[next].focus();
});
for(const button of document.querySelectorAll("[data-close-dialog]"))button.addEventListener("click",()=>button.closest("dialog").close());
for(const dialog of document.querySelectorAll("dialog"))dialog.addEventListener("click",event=>{if(event.target===dialog)dialog.close();});
$("#project-dialog").addEventListener("close",()=>{if(!document.querySelector("dialog[open]"))document.getElementById(`project-${detailedProjectSlug}`)?.querySelector(".detail-button")?.focus();});
document.addEventListener("keydown",event=>{
  const typing=event.target.closest("input,select,textarea,[contenteditable=true]");
  if((event.ctrlKey||event.metaKey)&&event.key.toLowerCase()==="k"){event.preventDefault();commandDialog.open?commandDialog.close():openSearch();}
  else if(event.key==="/"&&!typing&&!event.ctrlKey&&!event.metaKey&&!event.altKey&&!document.querySelector("dialog[open]")){
    event.preventDefault();if(loaded){$("#project-search").scrollIntoView({block:"center"});$("#project-search").focus({preventScroll:true});}else openSearch();
  }
});
function renderData(){loaded=true;$("#explorer-tools").hidden=false;updateLanguageOptions();renderRepositories();renderOverview();renderCommands();}
async function refresh(){
  if(loading)return;attempted=true;loading=true;updateStatus();
  try{repositories=await getSelectedRepositories();live=true;renderData();}
  catch{live=false;}
  finally{loading=false;updateStatus();}
}
$("#refresh").addEventListener("click",refresh);
if($("#year"))$("#year").textContent=new Date().getFullYear();
const motionQuery=matchMedia("(prefers-reduced-motion: reduce)");
let motionPaused=false;try{motionPaused=localStorage.getItem("lordlabs-motion")==="paused";}catch{/* Preferences are optional. */}
function updateMotionControl(){
  const paused=motionPaused||motionQuery.matches;
  if(paused)galleryAnimation?.cancel();
  const button=$("#motion-toggle");
  document.documentElement.dataset.motion=paused?"off":"on";
  if(!button)return;
  button.disabled=motionQuery.matches;button.setAttribute("aria-pressed",String(paused));
  button.querySelector("span").textContent=t(motionQuery.matches?"motionReduced":paused?"resumeMotion":"pauseMotion");
  button.querySelector("img").src=`/assets/icons/${paused?"play":"pause"}.svg`;
}
$("#motion-toggle")?.addEventListener("click",()=>{motionPaused=!motionPaused;updateMotionControl();try{localStorage.setItem("lordlabs-motion",motionPaused?"paused":"on");}catch{/* Storage is optional. */}});
motionQuery.addEventListener("change",updateMotionControl);
initHeader();
setLanguage(document.documentElement.lang);
initHero();
async function init(){
  try{const response=await fetch("/data/repositories.json");if(!response.ok)throw new Error("No snapshot");const snapshot=await response.json();repositories=curateRepositories(normalizeRepositories(snapshot.repositories));snapshotDate=Number.isFinite(Date.parse(snapshot.fetchedAt))?snapshot.fetchedAt:null;renderData();}
  catch{/* The static project remains usable if the snapshot cannot load. */}
  await refresh();
}
init();
