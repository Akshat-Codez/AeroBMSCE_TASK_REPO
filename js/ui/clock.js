/**
 * js/ui/clock.js — Live military UTC telemetry clock for flight HUD
 * Depends on: js/core/dom.js
 * Touches: #utcClock, .flight-clock
 */

import { qs } from '../core/dom.js';

export function initClock() {
  const clockEl = qs('#utcClock') || qs('.flight-clock');
  if (!clockEl) return;

  function updateClock() {
    const now = new Date();
    const hours = String(now.getUTCHours()).padStart(2, '0');
    const minutes = String(now.getUTCMinutes()).padStart(2, '0');
    const seconds = String(now.getUTCSeconds()).padStart(2, '0');
    clockEl.textContent = `${hours}:${minutes}:${seconds} UTC`;
  }

  updateClock();
  setInterval(updateClock, 1000);
}

export default initClock;
