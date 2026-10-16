/**
 * js/render/renderFaq.js — Renderer for FAQ accordion items
 * Depends on: js/data/faq.js, js/core/dom.js
 * Touches: #faq, .faq-accordion, .faq-item
 */

import { FAQ } from '../data/faq.js';
import { qs } from '../core/dom.js';

export function initRenderFaq() {
  const container = qs('.faq-accordion');
  if (!container) return;

  if (container.children.length === 0) {
    const html = FAQ.map((item, idx) => `
      <div class="faq-item body-block" data-faq-index="${idx}">
        <button class="faq-question" type="button" aria-expanded="false" id="faqBtn-${idx}" aria-controls="faqAns-${idx}">
          <span>${item.question}</span>
          <span class="faq-icon" aria-hidden="true">+</span>
        </button>
        <div class="faq-answer" id="faqAns-${idx}" role="region" aria-labelledby="faqBtn-${idx}" hidden>
          <p>${item.answer}</p>
        </div>
      </div>
    `).join('');
    container.innerHTML = html;
  }
}

export default initRenderFaq;
