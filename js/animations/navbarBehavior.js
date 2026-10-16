/**
 * js/animations/navbarBehavior.js — Smart hide/show navbar on scroll via passive RAF
 * Depends on: js/config.js (NAVBAR_HEIGHT), js/core/dom.js
 * Touches: #siteHeader, .site-header, .header-hidden
 */

import { NAVBAR_HEIGHT } from '../config.js';
import { qs } from '../core/dom.js';

export function initNavbarBehavior() {
  const header = qs('#siteHeader');
  if (!header) return;

  let lastY = 0;
  let navTicking = false;

  window.addEventListener('scroll', () => {
    if (!navTicking) {
      requestAnimationFrame(() => {
        const currentY = window.scrollY || window.pageYOffset;
        if (currentY > lastY && currentY > NAVBAR_HEIGHT * 2) {
          header.classList.add('header-hidden');
        } else {
          header.classList.remove('header-hidden');
        }
        lastY = currentY;
        navTicking = false;
      });
      navTicking = true;
    }
  }, { passive: true });
}

export default initNavbarBehavior;
