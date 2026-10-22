export function initHero() {
  const hero = document.querySelector('.studio-hero');
  if (!hero) return;
  new IntersectionObserver(([entry]) => {
    hero.toggleAttribute('data-idle', !entry.isIntersecting);
    if (!entry.isIntersecting) document.documentElement.dataset.entered = '';
  }).observe(hero);
}
