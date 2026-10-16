/**
 * js/ui/faqAccordion.js — Accessible FAQ accordion toggle and keyboard control
 * Depends on: js/core/dom.js, js/core/scroll.js (refreshScroll)
 * Touches: .faq-question, .faq-answer, .faq-item, aria-expanded
 */

import { qsa, on } from '../core/dom.js';
import { refreshScroll } from '../core/scroll.js';

export function initFaqAccordion() {
  const buttons = qsa('.faq-question');

  buttons.forEach(btn => {
    on(btn, 'click', () => {
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';
      const answer = btn.nextElementSibling;
      const icon = btn.querySelector('.faq-icon');

      btn.setAttribute('aria-expanded', String(!isExpanded));

      if (answer) {
        answer.hidden = isExpanded;
      }

      if (icon) {
        icon.textContent = isExpanded ? '+' : '−';
      }

      refreshScroll();
    });
  });
}

export default initFaqAccordion;
