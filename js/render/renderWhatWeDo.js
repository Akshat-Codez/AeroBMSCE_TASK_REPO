/**
 * js/render/renderWhatWeDo.js — Renderer for technical domains and club impact
 * Depends on: js/data/whatWeDo.js, js/core/dom.js
 * Touches: #what-we-do, .two-col
 */

import { WHAT_WE_DO } from '../data/whatWeDo.js';
import { qs } from '../core/dom.js';

export function initRenderWhatWeDo() {
  const container = qs('.two-col');
  if (!container) return;

  if (container.children.length === 0) {
    container.innerHTML = `
      <div class="body-block">
        <h3 class="sub-heading">WHAT WE DO</h3>
        <ul>
          ${WHAT_WE_DO.domains.map(d => `<li>${d}</li>`).join('')}
        </ul>
      </div>
      <div class="body-block">
        <h3 class="sub-heading">WHY IT MATTERS</h3>
        <ul>
          ${WHAT_WE_DO.whyItMatters.map(w => `<li>${w}</li>`).join('')}
        </ul>
      </div>
    `;
  }
}

export default initRenderWhatWeDo;
