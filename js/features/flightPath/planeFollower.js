/**
 * js/features/flightPath/planeFollower.js — Moves inline aircraft SVG along the drawn path
 * Purpose: On each scroll tick, read the path's draw progress and move the plane icon
 *          to the corresponding point on the path using getPointAtLength.
 * Dependencies: drawOnScroll.js (pathEl, pathLength, getDrawProgress), window.gsap
 * Touches: #fp-plane (SVG group)
 */

import { prefersReducedMotion } from '../../core/device.js';

let planeEl   = null;
let pathEl    = null;
let pathLen   = 0;
let animFrame = null;

/**
 * @param {SVGGElement} planeGroup - the SVG aircraft icon element
 * @param {SVGPathElement} path
 * @param {number} totalLength
 */
export function initPlaneFollower(planeGroup, path, totalLength) {
  if (prefersReducedMotion || !planeGroup || !path) return;

  planeEl = planeGroup;
  pathEl  = path;
  pathLen = totalLength;

  tick();
}

function tick() {
  if (!planeEl || !pathEl) return;

  // Read current drawn length from dashoffset
  const offset   = parseFloat(pathEl.style.strokeDashoffset) || 0;
  const drawn    = pathLen - offset;
  const clamped  = Math.max(0, Math.min(drawn, pathLen));

  if (clamped > 0) {
    const pt   = pathEl.getPointAtLength(clamped);
    // Get a slightly ahead point to compute heading angle
    const ptAhead = pathEl.getPointAtLength(Math.min(clamped + 4, pathLen));
    const angle   = Math.atan2(ptAhead.y - pt.y, ptAhead.x - pt.x) * (180 / Math.PI);

    // Use transform attribute — no style reads during tick, only writes
    planeEl.setAttribute('transform', `translate(${pt.x - 8}, ${pt.y - 8}) rotate(${angle}, 8, 8)`);
    planeEl.style.opacity = '1';
  } else {
    planeEl.style.opacity = '0';
  }

  animFrame = requestAnimationFrame(tick);
}

export function stopPlaneFollower() {
  if (animFrame) {
    cancelAnimationFrame(animFrame);
    animFrame = null;
  }
}
