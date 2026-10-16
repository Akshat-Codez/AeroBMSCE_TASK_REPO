/**
 * js/render/renderAbout.js — Renderer for club background and vision
 * Depends on: js/data/about.js, js/core/dom.js
 * Touches: #about, .about-body
 */

import { ABOUT } from '../data/about.js';
import { qs } from '../core/dom.js';

export function initRenderAbout() {
  const container = qs('.about-body');
  if (!container) return;

  if (container.children.length === 0) {
    container.innerHTML = `
      <div class="body-block">
        <p>${ABOUT.overview}</p>
      </div>
      <div class="body-block vision-block">
        <h3 class="sub-heading">OUR VISION</h3>
        <p>${ABOUT.vision}</p>
      </div>
    `;
  }
}

export default initRenderAbout;
