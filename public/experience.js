export function compactHeader(y, compact) {
  return compact ? y > 24 : y > 88;
}

export function initHeader() {
  const shell = document.querySelector('.header-shell');
  if (!shell) return;
  let arrivalTimer, arrivalAnimation;
  const land = () => {
    clearTimeout(arrivalTimer);
    const target = document.getElementById(location.hash.slice(1));
    if (!target || matchMedia('(prefers-reduced-motion: reduce)').matches || document.documentElement.dataset.motion === 'off') return;
    const heading = target.querySelector('h2,h1');
    if (!heading || target.getBoundingClientRect().top > innerHeight || target.getBoundingClientRect().bottom < 0) return;
    arrivalAnimation?.cancel();
    arrivalAnimation = heading.animate([{opacity: .65, transform: 'translateY(10px)'}, {opacity: 1, transform: 'translateY(0)'}], {duration: 580, easing: 'cubic-bezier(.22,1,.36,1)'});
  };
  let arriving = false;
  window.addEventListener('hashchange', () => { arriving = true; arrivalTimer = setTimeout(() => { land(); arriving = false; }, 180); });
  window.addEventListener('scroll', () => {
    if (!arriving) return;
    clearTimeout(arrivalTimer);
    arrivalTimer = setTimeout(() => { land(); arriving = false; }, 120);
  }, {passive: true});
  // An explicit pause or system preference also stops an arrival already in progress.
  new MutationObserver(() => { if (document.documentElement.dataset.motion === 'off') arrivalAnimation?.cancel(); }).observe(document.documentElement, {attributes: true, attributeFilter: ['data-motion']});
  matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', event => { if (event.matches) arrivalAnimation?.cancel(); });
  const menu = shell.querySelector('.mobile-nav');
  if (menu) {
    menu.addEventListener('click', event => { if (event.target.closest('a')) menu.open = false; });
    document.addEventListener('pointerdown', event => { if (!menu.contains(event.target)) menu.open = false; });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && menu.open) { menu.open = false; menu.querySelector('summary').focus(); }
    });
    menu.addEventListener('focusout', event => {
      if (!menu.contains(event.relatedTarget)) menu.open = false;
    });
  }
  let updateCurrentSection = () => {};
  const nav = shell.querySelector('.desktop-nav');
  const chapters = [...document.querySelectorAll('[data-chapter]')];
  const links = nav ? [...nav.querySelectorAll('a')] : [];
  if (nav && links.length) {
    const highlight = document.createElement('span');
    highlight.className = 'nav-highlight';
    highlight.setAttribute('aria-hidden', 'true');
    nav.prepend(highlight);
    let current = links.find(link => link.hasAttribute('aria-current'));
    const show = link => {
      highlight.style.opacity = link ? '1' : '0';
      if (!link) return;
      highlight.style.width = `${link.offsetWidth}px`;
      highlight.style.transform = `translateX(${link.offsetLeft}px)`;
    };
    links.forEach(link => {
      link.addEventListener('pointerenter', () => show(link));
      link.addEventListener('focus', () => show(link));
    });
    nav.addEventListener('pointerleave', () => show(current));
    nav.addEventListener('focusout', event => { if (!nav.contains(event.relatedTarget)) show(current); });
    const sections = links.map(link => {
      const url = new URL(link.href);
      return url.pathname === location.pathname && url.hash ? document.getElementById(url.hash.slice(1)) : null;
    }).filter(Boolean);
    if (sections.length) updateCurrentSection = () => {
      const line = window.innerHeight * .3;
      const active = sections.find(section => { const rect = section.getBoundingClientRect(); return rect.top <= line && rect.bottom > line; });
      current = active ? links.find(link => new URL(link.href).hash === '#' + active.id) : undefined;
      links.forEach(link => link === current ? link.setAttribute('aria-current', 'location') : link.removeAttribute('aria-current'));
      chapters.forEach(link => link.dataset.chapter === active?.id ? link.setAttribute('aria-current', 'location') : link.removeAttribute('aria-current'));
      show(current);
    };
    new ResizeObserver(() => show(current)).observe(nav);
    new MutationObserver(() => show(current)).observe(document.documentElement, {attributes: true, attributeFilter: ['dir']});
    show(current);
  }
  let compact = false, frame = 0;
  const update = () => {
    updateCurrentSection();
    compact = compactHeader(window.scrollY, compact);
    shell.classList.toggle('is-compact', compact);
    const distance = document.documentElement.scrollHeight - window.innerHeight;
    document.documentElement.style.setProperty('--page-progress', distance > 0 ? Math.min(1, window.scrollY / distance) : 0);
    frame = 0;
  };
  window.addEventListener('scroll', () => {
    if (!frame) frame = requestAnimationFrame(update);
  }, { passive: true });
  window.addEventListener('pageshow', update);
  window.addEventListener('resize', update);
  new ResizeObserver(update).observe(document.body);
  update();
}
