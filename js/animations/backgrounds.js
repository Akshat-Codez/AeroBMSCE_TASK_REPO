/**
 * js/animations/backgrounds.js — Off-screen animation pause and tab visibility synchronization
 * Depends on: js/core/dom.js, window.gsap
 * Touches: .radar-sweep, .hero-topo, #stats, #hero
 */

import { qs } from '../core/dom.js';

export function initBackgrounds() {
  const radarSweep = qs('.radar-sweep');
  const heroTopo = qs('.hero-topo');

  if ('IntersectionObserver' in window) {
    if (radarSweep) {
      const statsSection = qs('#stats') || qs('.stats-section');
      if (statsSection) {
        const radarObserver = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            radarSweep.style.animationPlayState = entry.isIntersecting ? 'running' : 'paused';
          });
        }, { threshold: 0.05 });
        radarObserver.observe(statsSection);
      }
    }

    if (heroTopo) {
      const heroSection = qs('#hero') || qs('#home') || qs('.hero-section');
      if (heroSection) {
        const topoObserver = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            heroTopo.style.animationPlayState = entry.isIntersecting ? 'running' : 'paused';
          });
        }, { threshold: 0.05 });
        topoObserver.observe(heroSection);
      }
    }
  }

  // Synchronize with browser tab visibility
  document.addEventListener('visibilitychange', () => {
    const state = document.hidden ? 'paused' : 'running';
    if (radarSweep) radarSweep.style.animationPlayState = state;
    if (heroTopo) heroTopo.style.animationPlayState = state;

    if (window.gsap && window.gsap.ticker) {
      if (document.hidden) {
        window.gsap.ticker.sleep();
      } else {
        window.gsap.ticker.wake();
      }
    }
  });
}

export default initBackgrounds;
