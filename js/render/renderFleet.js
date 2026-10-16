/**
 * js/render/renderFleet.js — Renderer for aircraft fleet specifications
 * Depends on: js/data/fleet.js, js/core/dom.js
 * Touches: #fleet, #fleetFilter, .fleet-grid, .blueprint-slot, data-span-mm, data-chord-mm, data-mass-g
 */

import { FLEET } from '../data/fleet.js';
import { qs } from '../core/dom.js';

function isValidSpec(val) {
  if (val === undefined || val === null) return false;
  const str = String(val).trim();
  if (!str || str === 'undefined' || str === 'null' || str === 'NaN') return false;
  if (typeof val === 'number' && Number.isNaN(val)) return false;
  return true;
}

function renderSpecRow(label, val) {
  if (!isValidSpec(val)) return '';
  return `
    <div class="spec-row">
      <span class="spec-k">${label}:</span>
      <span class="spec-v">${val}</span>
    </div>
  `;
}

export function initRenderFleet() {
  const fleetSection = qs('#fleet');
  const fleetNavLink = qs('.nav-link[data-nav="fleet"]');

  // Empty state handling
  if (!FLEET || FLEET.length === 0) {
    if (fleetSection) fleetSection.style.display = 'none';
    if (fleetNavLink) fleetNavLink.style.display = 'none';
    return;
  }

  // Filter tabs: dynamically build from categories that actually have aircraft
  const filterContainer = qs('#fleetFilter');
  if (filterContainer) {
    const rawCategories = Array.from(new Set(FLEET.map(p => p.category).filter(Boolean)));

    if (rawCategories.length <= 1) {
      filterContainer.style.display = 'none';
    } else {
      filterContainer.style.display = 'flex';
      const tabs = [
        { id: 'all', label: 'ALL PLATFORMS' },
        ...rawCategories.map(cat => ({
          id: cat,
          label: cat.toUpperCase(),
        })),
      ];

      filterContainer.innerHTML = tabs.map((tab, idx) => `
        <button class="fleet-filter-btn ${idx === 0 ? 'active' : ''}" data-filter="${tab.id}" type="button">
          ${tab.label}
        </button>
      `).join('');
    }
  }

  const container = qs('.fleet-grid');
  if (!container) return;

  const html = FLEET.map(plane => {
    const specsHtml = [
      renderSpecRow('WINGSPAN', plane.wingspan || (isValidSpec(plane.spanMm) ? `${plane.spanMm} mm` : '')),
      renderSpecRow('MOTOR', plane.motor || plane.propulsion),
      renderSpecRow('WEIGHT', plane.weight || (isValidSpec(plane.massG) ? `${plane.massG} g` : '')),
      renderSpecRow('ROLE', plane.role || plane.designation),
    ].filter(Boolean).join('');

    const imageHtml = plane.image ? `
      <div class="fleet-image-wrap">
        <picture>
          ${plane.webp ? `<source type="image/webp" srcset="${plane.webp}">` : ''}
          <img src="${plane.image}" alt="${plane.imageAlt || plane.name}" class="fleet-img" width="400" height="240" loading="lazy" decoding="async">
        </picture>
        ${plane.secondaryImage ? `
          <picture class="fleet-image-secondary">
            ${plane.secondaryWebp ? `<source type="image/webp" srcset="${plane.secondaryWebp}">` : ''}
            <img src="${plane.secondaryImage}" alt="${plane.secondaryAlt || `${plane.name} alternate view`}" width="160" height="96" loading="lazy" decoding="async">
          </picture>
        ` : ''}
      </div>
    ` : '';

    return `
      <div class="fleet-card blueprint-slot body-block"
           id="${plane.id}"
           data-category="${plane.category}"
           data-span-mm="${plane.spanMm ?? ''}"
           data-chord-mm="${plane.chordMm ?? ''}"
           data-mass-g="${plane.massG ?? ''}"
           data-phase="${plane.phase || 'Cruise'}">
        ${imageHtml}
        <div class="fleet-header">
          <span class="fleet-cat">${plane.category}</span>
          ${plane.phase ? `<span class="fleet-phase badge-mono">${plane.phase}</span>` : ''}
        </div>
        <h3 class="fleet-name">${plane.name}</h3>
        ${isValidSpec(plane.role || plane.designation) ? `<p class="fleet-desig">${plane.role || plane.designation}</p>` : ''}
        ${specsHtml ? `<div class="fleet-specs-table">${specsHtml}</div>` : ''}
        ${isValidSpec(plane.competition) ? `
          <div class="fleet-footer">
            <span class="fleet-comp">${plane.competition}</span>
          </div>
        ` : ''}
      </div>
    `;
  }).join('');

  container.innerHTML = html;

  // Reveal: cards are visible by default in CSS; animation adds subtle polish without hiding content
  const cards = container.querySelectorAll('.fleet-card');
  if (window.gsap && cards.length) {
    window.gsap.from(cards, {
      y: 16,
      opacity: 0.85,
      duration: 0.4,
      stagger: 0.08,
      ease: 'power2.out',
      immediateRender: false,
    });
  }

  // Refresh ScrollTrigger so layout calculations account for rendered fleet cards
  if (window.ScrollTrigger) {
    window.ScrollTrigger.refresh();
  }
}

export default initRenderFleet;
