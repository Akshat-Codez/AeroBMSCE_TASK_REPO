/**
 * js/ui/fleetFilter.js — Category filtering for aircraft fleet cards
 * Depends on: js/core/dom.js, js/core/scroll.js (refreshScroll)
 * Touches: #fleetFilter, .fleet-filter-btn, .fleet-card, [data-category]
 */

import { qs, qsa, on } from '../core/dom.js';
import { refreshScroll } from '../core/scroll.js';

export function initFleetFilter() {
  const filterContainer = qs('#fleetFilter');
  if (!filterContainer) return;

  const buttons = qsa('.fleet-filter-btn', filterContainer);

  buttons.forEach(btn => {
    on(btn, 'click', () => {
      const selectedFilter = (btn.dataset.filter || 'all').toLowerCase();
      const cards = qsa('.fleet-card');

      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      cards.forEach(card => {
        const cardCat = (card.dataset.category || '').toLowerCase();
        const matches = selectedFilter === 'all' || cardCat === selectedFilter;
        card.style.display = matches ? '' : 'none';
      });

      refreshScroll();
    });
  });
}

export default initFleetFilter;
