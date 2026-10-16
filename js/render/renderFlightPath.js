/**
 * js/render/renderFlightPath.js - Entry point for the scroll-driven flight path animation
 * Purpose: Injects the SVG canvas into #timeline, builds path geometry from HISTORY data,
 *          then wires up drawOnScroll (strokeDashoffset scrub) and planeFollower (RAF tick).
 * Dependencies: js/data/history.js, js/features/flightPath/pathGeometry.js,
 *               js/features/flightPath/drawOnScroll.js, js/features/flightPath/planeFollower.js,
 *               js/core/device.js
 * Touches: #timeline, #flight-path-svg, .fp-path, #fp-plane
 *
 * Prompt 5B: Mobile path variant removed. Desktop path always used.
 */

import { HISTORY } from '../data/history.js';
import { buildPathGeometry } from '../features/flightPath/pathGeometry.js';
import { initDraw } from '../features/flightPath/drawOnScroll.js';
import { initPlaneFollower } from '../features/flightPath/planeFollower.js';
import { prefersReducedMotion } from '../core/device.js';

/** Plane SVG icon markup (16x16 viewBox, centered on 8,8) */
const PLANE_SVG = `
  <g id="fp-plane" style="opacity:0" aria-hidden="true">
    <polygon points="8,0 14,14 8,10 2,14" fill="#5FA8D3" opacity="0.9"/>
  </g>
`;

/**
 * Creates and injects the SVG overlay into the timeline container.
 */
function createSVG(wrapper, w, h) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('id', 'flight-path-svg');
  svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
  svg.setAttribute('width', w);
  svg.setAttribute('height', h);
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('focusable', 'false');
  svg.innerHTML = `
    <path class="fp-path" id="fp-path-el" fill="none"
      stroke="#5FA8D3" stroke-width="1.5" stroke-linecap="round"
      stroke-dasharray="0" stroke-dashoffset="0"
      opacity="0.45"/>
    ${PLANE_SVG}
  `;
  wrapper.prepend(svg);
  return svg;
}

/**
 * Renders waypoint dot overlays + year labels onto the SVG.
 */
function renderWaypointDots(svg, waypoints) {
  waypoints.forEach(wp => {
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.setAttribute('class', 'fp-waypoint');

    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', wp.x);
    circle.setAttribute('cy', wp.y);
    circle.setAttribute('r', '4');
    circle.setAttribute('fill', '#5FA8D3');
    circle.setAttribute('opacity', '0.6');

    const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    const anchor = wp.x > 110 ? 'start' : 'end';
    label.setAttribute('x', wp.x + (anchor === 'start' ? 10 : -10));
    label.setAttribute('y', wp.y + 4);
    label.setAttribute('text-anchor', anchor);
    label.setAttribute('fill', '#5FA8D3');
    label.setAttribute('font-size', '9');
    label.setAttribute('font-family', 'IBM Plex Mono, monospace');
    label.setAttribute('opacity', '0.55');
    label.textContent = wp.year;

    g.appendChild(circle);
    g.appendChild(label);
    svg.appendChild(g);
  });
}

export function initRenderFlightPath() {
  const wrapper = document.getElementById('timeline');
  const section = document.getElementById('achievements');
  if (!wrapper || !section) return;

  const W = 220;
  const H = wrapper.offsetHeight || 600;

  const milestones = [...HISTORY].reverse(); // oldest first -> newest last

  const { pathD, waypoints } = buildPathGeometry(milestones, W, H);

  if (!pathD) return;

  const svg    = createSVG(wrapper, W, H);
  const pathEl = svg.querySelector('#fp-path-el');
  const planeEl = svg.getElementById('fp-plane');

  pathEl.setAttribute('d', pathD);

  if (prefersReducedMotion) {
    // Static: show full path, hide plane
    pathEl.setAttribute('stroke-dasharray', '');
    pathEl.setAttribute('stroke-dashoffset', '');
    if (planeEl) planeEl.style.opacity = '0';
    return;
  }

  renderWaypointDots(svg, waypoints);

  // Wire scroll-scrub draw
  initDraw(pathEl, section);
  // Wire plane follower
  initPlaneFollower(planeEl, pathEl, pathEl.getTotalLength());
}

export default initRenderFlightPath;
