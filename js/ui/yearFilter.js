/**
 * js/ui/yearFilter.js — Season and milestone timeline filter
 * Depends on: js/core/dom.js, js/core/scroll.js (refreshScroll)
 * Touches: #yearFilter, .year-filter-btn, .ms, [data-year]
 */

import { qs, qsa, on } from '../core/dom.js';
import { refreshScroll } from '../core/scroll.js';

export function initYearFilter() {
  const filterContainer = qs('#yearFilter');
  if (!filterContainer) return;

  const buttons = qsa('.year-filter-btn', filterContainer);
  const milestoneBlocks = qsa('.ms');

  buttons.forEach(btn => {
    on(btn, 'click', () => {
      const year = btn.dataset.year || 'all';

      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      milestoneBlocks.forEach(ms => {
        const matches = year === 'all' || ms.dataset.year === year;
        ms.style.display = matches ? '' : 'none';
      });

      refreshScroll();
    });
  });
}

export default initYearFilter;
