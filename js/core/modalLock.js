/**
 * js/core/modalLock.js — Stop and resume Lenis while a modal is open
 * Purpose: Any modal (lightbox, command palette) must pause smooth scrolling
 *          so the page doesn't scroll behind the overlay.
 * Dependencies: js/core/scroll.js (getLenis)
 * Used by: js/features/lightbox.js, js/features/commandPalette/paletteUI.js
 */

import { getLenis } from './scroll.js';

/**
 * Stops Lenis smooth scroll and freezes body scroll.
 * Safe to call even when Lenis is not active (touch devices).
 */
export function lockScroll() {
  const lenis = getLenis();
  if (lenis) lenis.stop();
  // Prevent native scroll on mobile behind modal
  document.body.style.overflow = 'hidden';
}

/**
 * Resumes Lenis smooth scroll and restores body scroll.
 */
export function unlockScroll() {
  const lenis = getLenis();
  if (lenis) lenis.start();
  document.body.style.overflow = '';
}
