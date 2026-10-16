/**
 * js/ui/activeSection.js — Zero-layout-read active section indicator via IntersectionObserver
 * Depends on: js/core/dom.js
 * Touches: .nav-link[data-nav], [data-phase], section[id]
 */

import { qsa } from '../core/dom.js';

export function initActiveSection() {
  const navLinks = qsa('.nav-link[data-nav]');
  const sections = qsa('section[id], [data-phase], #contact');

  if (!('IntersectionObserver' in window) || !sections.length || !navLinks.length) {
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach((link) => {
          link.classList.toggle('active', link.dataset.nav === id);
        });
      }
    });
  }, {
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0,
  });

  sections.forEach((sec) => {
    observer.observe(sec);
  });
}

export default initActiveSection;
