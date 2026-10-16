/**
 * js/features/flightPath/drawOnScroll.js — SVG path draw animation driven by ScrollTrigger scrub
 * Purpose: Animates stroke-dashoffset so the path "draws" as user scrolls.
 *          The plane follower reads the same SVG path's dash offset directly.
 * Dependencies: window.gsap, window.ScrollTrigger, pathGeometry.js
 * Touches: #flight-path-svg, .fp-path, #timeline
 */

import { prefersReducedMotion } from '../../core/device.js';

/**
 * Initialize the scroll-scrub draw animation on the given path element.
 * @param {SVGPathElement} el
 * @param {HTMLElement} triggerSection
 */
export function initDraw(el, triggerSection) {
  const pathLength = el.getTotalLength();

  // Initial state — fully hidden
  el.style.strokeDasharray  = pathLength;
  el.style.strokeDashoffset = pathLength;

  if (prefersReducedMotion) {
    // Show full path immediately, no animation
    el.style.strokeDashoffset = 0;
    return;
  }

  if (!window.gsap || !window.ScrollTrigger) return;

  window.gsap.to(el, {
    strokeDashoffset: 0,
    ease: 'none',
    scrollTrigger: {
      trigger: triggerSection,
      start: 'top 80%',
      end:   'bottom 20%',
      scrub: 1.2,
    },
  });
}

