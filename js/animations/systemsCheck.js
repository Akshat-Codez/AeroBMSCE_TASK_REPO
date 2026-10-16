/**
 * js/animations/systemsCheck.js — Terminal-style pre-flight systems check sequence
 * Depends on: js/core/device.js, window.gsap
 * Touches: #systemsCheck, .sc-line
 */

import { prefersReducedMotion } from '../core/device.js';
import { qsa, qs } from '../core/dom.js';

export function initSystemsCheck() {
  const container = qs('#systemsCheck');
  const lines = qsa('.sc-line');

  if (!container || !lines.length) return;

  if (prefersReducedMotion || !window.gsap) {
    container.style.display = 'none';
    return;
  }

  const tl = window.gsap.timeline({ delay: 0.1 });
  lines.forEach((line, i) => {
    tl.to(line, {
      opacity: 1,
      x: 0,
      duration: 0.16,
      ease: 'power2.out',
    }, i * 0.16);
  });

  tl.to(container, {
    opacity: 0,
    duration: 0.35,
    delay: 0.25,
    ease: 'power1.in',
    pointerEvents: 'none',
  });
}

export default initSystemsCheck;
