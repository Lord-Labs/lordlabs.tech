import { initHeader } from "./experience.js";
initHeader();
try { if (localStorage.getItem('lordlabs-motion') === 'paused') document.documentElement.dataset.motion = 'off'; } catch { /* Preferences are optional. */ }
let language='en';
try{if(localStorage.getItem('lordlabs-language')==='ar')language='ar';}catch{/* Storage is optional. */}
const requested=new URLSearchParams(location.search).get('lang');if(requested==='ar'||requested==='en')language=requested;
function setLanguage(next){
  language=next;document.documentElement.lang=next;document.documentElement.dir=next==='ar'?'rtl':'ltr';
  const languageUrl=new URL(location.href);languageUrl.searchParams.set('lang',next);languageUrl.hash=languageUrl.hash.replace(/^#section-(en|ar)-/,`#section-${next}-`);history.replaceState(null,'',languageUrl);
  for(const element of document.querySelectorAll('[data-copy-en]'))element.textContent=element.dataset[next==='ar'?'copyAr':'copyEn'];
  const button=document.querySelector('#reading-language');button.textContent=next==='ar'?'English':'العربية';button.lang=next==='ar'?'en':'ar';button.setAttribute('aria-label',next==='ar'?'Switch to English':'التبديل إلى العربية');
  document.querySelector('.desktop-nav').setAttribute('aria-label',next==='ar'?'التنقل الرئيسي':'Main navigation');
  for(const link of document.querySelectorAll('[data-local-language]')){const url=new URL(link.href,location.href);url.searchParams.set('lang',next);link.href=url.href;}
  document.querySelector('.mobile-nav summary').setAttribute('aria-label',next==='ar'?'قائمة التنقل':'Navigation menu');
  document.querySelector('.mobile-nav nav').setAttribute('aria-label',next==='ar'?'قائمة التنقل':'Navigation menu');
  const title=document.querySelector('h1');if(title)document.title=`${title.textContent} — LORD Labs`;
  try{localStorage.setItem('lordlabs-language',next);}catch{/* Storage is optional. */}
}
document.querySelector('#reading-language').addEventListener('click',()=>setLanguage(language==='en'?'ar':'en'));
setLanguage(language);

const articleSections = [...document.querySelectorAll('.article-body section[id]')];
if (articleSections.length) {
  const observer = new IntersectionObserver(entries => {
    const active = entries.find(entry => entry.isIntersecting);
    if (!active) return;
    for (const link of document.querySelectorAll('.article-aside a')) {
      if (link.hash === '#' + active.target.id) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    }
  }, {rootMargin: `-${Math.round(innerHeight * .15)}px 0px -${Math.round(innerHeight * .65)}px 0px`});
  articleSections.forEach(section => observer.observe(section));
}
