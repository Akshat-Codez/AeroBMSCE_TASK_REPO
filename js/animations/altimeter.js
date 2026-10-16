/**
 * js/animations/altimeter.js — Flight telemetry gauge and scroll progress synchronization
 * Depends on: js/core/dom.js, window.ScrollTrigger
 * Touches: #altimeter, #altReading, #altPhase, #altFill
 */

import { qs } from '../core/dom.js';

export function initAltimeter() {
  if (!window.ScrollTrigger) return;

  const altReading = qs('#altReading');
  const altPhase = qs('#altPhase');
  const altFill = qs('#altFill');

  const phaseLabels = [
    { threshold: 0.15, label: 'PRE-FLIGHT' },
    { threshold: 0.40, label: 'TAKEOFF' },
    { threshold: 0.70, label: 'CRUISE' },
    { threshold: 1.00, label: 'LANDING' },
  ];

  function padAlt(n) {
    return String(Math.round(n)).padStart(5, '0');
  }

  let lastAltText = '';
  let lastPhaseLabel = '';

  window.ScrollTrigger.create({
    start: 0,
    end: 'max',
    onUpdate: (self) => {
      const progress = self.progress;

      // Single GPU transform write for desktop altimeter fill
      if (altFill) {
        altFill.style.transform = `scaleY(${progress})`;
      }

      // Math-driven altitude readout (0 -> 10,000 ft) without DOM layout reads
      if (altReading) {
        const altVal = padAlt(progress * 10000);
        if (altVal !== lastAltText) {
          altReading.textContent = altVal;
          lastAltText = altVal;
        }
      }

      // Phase update
      if (altPhase) {
        let label = 'PRE-FLIGHT';
        for (let i = 0; i < phaseLabels.length; i++) {
          if (progress <= phaseLabels[i].threshold) {
            label = phaseLabels[i].label;
            break;
          }
        }
        if (label !== lastPhaseLabel) {
          altPhase.textContent = label;
          lastPhaseLabel = label;
        }
      }
    },
  });
}

export default initAltimeter;
