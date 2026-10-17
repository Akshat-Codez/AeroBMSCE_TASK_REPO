/**
 * js/ui/backToTop.js — Back-to-top button and internal anchor smooth scrolling
 * Depends on: js/core/dom.js, js/core/scroll.js (smoothScrollTo)
 * Touches: #backToTop, a[href^="#"]
 */

import { qs, qsa, on } from '../core/dom.js';
import { smoothScrollTo } from '../core/scroll.js';

export function initBackToTop() {
  const backToTopBtn = qs('#backToTop');
  if (backToTopBtn) {
    on(backToTopBtn, 'click', () => {
      smoothScrollTo(0);
    });
  }

  // Intercept all anchor hash links
  qsa('a[href^="#"]').forEach((link) => {
    // Flight buttons handle their own destination after the plane animation.
    if (link.classList.contains('fly-btn')) return;

    on(link, 'click', (e) => {
      const href = link.getAttribute('href');
      if (!href || href === '#') return;

      const target = qs(href);
      if (target) {
        e.preventDefault();
        smoothScrollTo(target);
      }
    });
  });

  // Handle URL hash on initial page load
  if (typeof window !== 'undefined' && window.location.hash) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const target = qs(window.location.hash);
        if (target) {
          smoothScrollTo(target);
        }
      }, 120);
    });
  }
}

export default initBackToTop;
