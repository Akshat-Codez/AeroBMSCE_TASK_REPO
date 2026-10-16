/**
 * js/render/renderStats.js — Dynamic renderer for metrics grid
 * Depends on: js/data/stats.js, js/core/dom.js
 * Touches: #stats, .stats-grid, .stat-item, .counter
 */

import { STATS } from '../data/stats.js';
import { qs } from '../core/dom.js';

export function initRenderStats() {
  const container = qs('.stats-grid');
  if (!container) return;

  // Render only if container is empty or has a render placeholder
  if (container.children.length === 0) {
    const html = STATS.map(item => `
      <div class="stat-item">
        <div class="stat-num"><span class="counter" data-target="${item.value}">0</span><span>${item.suffix}</span></div>
        <div class="stat-label">${item.label}</div>
      </div>
    `).join('');
    container.innerHTML = html;
  }
}

export default initRenderStats;
