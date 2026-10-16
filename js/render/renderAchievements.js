/**
 * js/render/renderAchievements.js — Renderer for milestones timeline and achievements
 * Depends on: js/data/history.js, js/core/dom.js
 * Touches: #achievements, #timeline, .milestones-grid, .ms
 */

import { HISTORY } from '../data/history.js';
import { qs } from '../core/dom.js';

export function initRenderAchievements() {
  const container = qs('.milestones-grid');
  if (!container) return;

  if (container.children.length === 0) {
    const html = HISTORY.map(season => `
      <div class="ms body-block" data-year="${season.year}">
        <span class="ms-year">${season.season}</span><br>
        ${season.items.map(item => `
          <b>${item.title}</b><br>
          ${item.result}<br><br>
        `).join('')}
      </div>
    `).join('');
    container.innerHTML = html;
  }
}

export default initRenderAchievements;
