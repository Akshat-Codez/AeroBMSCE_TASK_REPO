/**
 * js/render/renderFooter.js — Renderer and validator for footer metadata
 * Depends on: js/config.js (CLUB_NAME), js/core/dom.js
 * Touches: #footer, .footer-copy
 */

import { CLUB_NAME } from '../config.js';
import { qs } from '../core/dom.js';

export function initRenderFooter() {
  const copyEl = qs('.footer-copy');
  if (copyEl && !copyEl.textContent.trim()) {
    const currentYear = new Date().getFullYear();
    copyEl.textContent = `© ${currentYear} ${CLUB_NAME} — BMS College of Engineering, Bangalore.`;
  }
}

export default initRenderFooter;
