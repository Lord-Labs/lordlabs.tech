/* Resolve language before styles paint; both translations are already in the HTML. */
(() => {
  const root = document.documentElement;
  let saved;
  try { saved = localStorage.getItem('lordlabs-language'); } catch { /* Storage is optional. */ }
  const requested = new URLSearchParams(location.search).get('lang');
  root.lang = ['en', 'ar'].includes(requested) ? requested : saved === 'ar' ? 'ar' : 'en';
  root.dir = root.lang === 'ar' ? 'rtl' : 'ltr';
  const preload = document.createElement('link');
  preload.rel = 'preload'; preload.as = 'font'; preload.type = 'font/woff2'; preload.crossOrigin = '';
  preload.href = `/assets/fonts/${root.lang === 'ar' ? 'alexandria-arabic' : 'jakarta-latin'}.woff2`;
  document.head.append(preload);
  // Native option labels and placeholders cannot contain the bilingual text spans.
  const attributes = 'option[data-i18n-ar],[data-placeholder-ar],[data-aria-ar]';
  const localize = element => {
    if (element.matches('option[data-i18n-ar]')) {
      const text = element.dataset[root.lang === 'ar' ? 'i18nAr' : 'i18nEn'];
      if (element.textContent !== text) element.textContent = text;
    }
    if (element.hasAttribute('data-placeholder-ar')) element.placeholder = element.dataset[root.lang === 'ar' ? 'placeholderAr' : 'placeholderEn'];
    if (element.hasAttribute('data-aria-ar')) element.setAttribute('aria-label', element.dataset[root.lang === 'ar' ? 'ariaAr' : 'ariaEn']);
  };
  const observer = new MutationObserver(records => {
    for (const record of records) for (const element of record.addedNodes) {
      if (element.nodeType !== 1) continue;
      if (element.matches(attributes)) localize(element);
      element.querySelectorAll(attributes).forEach(localize);
    }
  });
  observer.observe(root, {childList: true, subtree: true});
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll(attributes).forEach(localize);
    observer.disconnect();
  }, {once: true});
})();
