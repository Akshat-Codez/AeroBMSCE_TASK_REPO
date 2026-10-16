/**
 * js/render/renderPastEvents.js — Renderer for previous events and competition flight trials
 * Depends on: js/data/pastEvents.js, js/core/dom.js
 * Touches: #previous-events, .gallery, .gallery-item
 */

import { PAST_EVENTS } from '../data/pastEvents.js';
import { qs } from '../core/dom.js';

export function initRenderPastEvents() {
  const container = qs('.gallery');
  if (!container) return;

  if (container.children.length === 0) {
    const html = PAST_EVENTS.map(item => `
      <div class="gallery-item" id="${item.id}">
        <picture>
          <source type="image/webp" srcset="${item.srcsetWebp}" sizes="(max-width: 600px) 100vw, 25vw">
          <img src="${item.image}"
               alt="${item.alt}"
               width="${item.width}"
               height="${item.height}"
               loading="lazy"
               decoding="async">
        </picture>
      </div>
    `).join('');
    container.innerHTML = html;
  }
}

export default initRenderPastEvents;
