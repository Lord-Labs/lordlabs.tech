/* Run in the head so a saved night sky is applied before the first paint. */
(() => {
  const root = document.documentElement;
  const system = matchMedia('(prefers-color-scheme: dark)');
  let preference;
  try { preference = localStorage.getItem('lordlabs-theme'); } catch { /* Storage is optional. */ }
  if (!['light', 'dark'].includes(preference)) preference = null;
  try { if (localStorage.getItem('lordlabs-motion') === 'paused') root.dataset.motion = 'off'; } catch { /* Storage is optional. */ }
  root.dataset.theme = preference || (system.matches ? 'dark' : 'light');
  if (root.dataset.motion === 'off' || matchMedia('(prefers-reduced-motion: reduce)').matches) root.dataset.entered = '';
  const visibility = () => {
    root.toggleAttribute('data-page-hidden', document.hidden);
    if (document.hidden) root.dataset.entered = '';
  };
  document.addEventListener('visibilitychange', visibility); visibility();
  let transitionTimer;

  function updateControls() {
    const dark = root.dataset.theme === 'dark', ar = root.lang === 'ar';
    const label = ar ? (dark ? 'إلى ضوء النهار' : 'إلى سماء الليل') : (dark ? 'Switch to daylight' : 'Switch to night sky');
    for (const button of document.querySelectorAll('[data-theme-toggle]')) {
      button.setAttribute('aria-pressed', String(dark));
      button.setAttribute('aria-label', label);
      button.title = label;
      const text = button.querySelector('[data-theme-label]');
      if (text) text.textContent = ar ? (dark ? 'ضوء النهار' : 'سماء الليل') : (dark ? 'Daylight' : 'Night sky');
    }
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', dark ? '#111b2c' : '#f7f8fb');
  }

  function applyTheme(next, animate = true) {
    clearTimeout(transitionTimer);
    if (animate && root.dataset.motion !== 'off' && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
      root.setAttribute('data-theme-changing', '');
      transitionTimer = setTimeout(() => root.removeAttribute('data-theme-changing'), 1100);
    } else root.removeAttribute('data-theme-changing');
    root.dataset.theme = next;
    updateControls();
  }

  system.addEventListener('change', () => { if (!preference) applyTheme(system.matches ? 'dark' : 'light'); });
  window.addEventListener('storage', event => {
    if (event.key !== 'lordlabs-theme') return;
    preference = ['light', 'dark'].includes(event.newValue) ? event.newValue : null;
    applyTheme(preference || (system.matches ? 'dark' : 'light'));
  });
  document.addEventListener('DOMContentLoaded', () => {
    updateControls();
    document.addEventListener('animationend', event => {
      if (event.animationName === 'sky-arrive') root.dataset.entered = '';
    });
    document.addEventListener('click', event => {
      if (!event.target.closest('[data-theme-toggle]')) return;
      preference = root.dataset.theme === 'dark' ? 'light' : 'dark';
      applyTheme(preference);
      try { localStorage.setItem('lordlabs-theme', preference); } catch { /* Storage is optional. */ }
    });
    new MutationObserver(() => {
      updateControls();
      if (root.dataset.motion === 'off') root.dataset.entered = '';
    }).observe(root, { attributes: true, attributeFilter: ['lang', 'data-motion'] });
    if ('IntersectionObserver' in window) {
      // Reveal long chapters in smaller pieces, rather than animating the whole chapter.
      for (const group of document.querySelectorAll('.projects[data-reveal],.journal[data-reveal],.contribute[data-reveal],.closing[data-reveal]')) {
        group.removeAttribute('data-reveal'); group.dataset.revealGroup = '';
      }
      const observer = new IntersectionObserver(entries => {
        for (const entry of entries) if (entry.isIntersecting) {
          entry.target.classList.add('is-visible'); observer.unobserve(entry.target);
        }
      }, { threshold: .06 });
      root.dataset.revealReady = '';
      const registered = new WeakSet();
      const register = () => {
        for (const section of document.querySelectorAll('[data-reveal],.section-heading,.section-kicker,.repo-card,.journal-card,.contribution-invitation,.closing-copy,.article-header,.article-body section,.next-note')) {
          if (registered.has(section)) continue;
          registered.add(section); section.dataset.reveal = ''; observer.observe(section);
        }
      };
      register();
      const projects = document.querySelector('#repository-list');
      if (projects) new MutationObserver(register).observe(projects, { childList: true });
    }
  }, { once: true });
})();
