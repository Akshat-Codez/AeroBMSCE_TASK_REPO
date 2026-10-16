/**
 * js/ui/mobileMenu.js — Mobile navigation drawer toggle and interaction handling
 * Depends on: js/core/dom.js
 * Touches: #mobileMenuBtn, #mobileNav, .nav-link, .nav
 */

import { qs, qsa, on } from '../core/dom.js';

export function initMobileMenu() {
  const toggleBtn = qs('#mobileMenuBtn');
  const navDrawer = qs('#mobileNav') || qs('.nav');

  if (!toggleBtn || !navDrawer) return;

  function closeMenu() {
    toggleBtn.setAttribute('aria-expanded', 'false');
    navDrawer.classList.remove('nav-open');
    document.body.classList.remove('menu-locked');
  }

  function openMenu() {
    toggleBtn.setAttribute('aria-expanded', 'true');
    navDrawer.classList.add('nav-open');
    document.body.classList.add('menu-locked');
  }

  on(toggleBtn, 'click', () => {
    const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
    if (isExpanded) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close when tapping any navigation link inside drawer
  qsa('.nav-link', navDrawer).forEach(link => {
    on(link, 'click', () => {
      closeMenu();
    });
  });

  // Close on Escape key
  on(document, 'keydown', (e) => {
    if (e.key === 'Escape') {
      closeMenu();
    }
  });
}

export default initMobileMenu;
