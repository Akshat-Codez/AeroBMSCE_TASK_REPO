/**
 * js/core/logger.js — Debug logger and resilient module bootstrap wrapper
 * Depends on: js/config.js (DEBUG)
 * Touches: console
 */

import { DEBUG } from '../config.js';

/**
 * Log informational messages only when DEBUG is enabled
 * @param {string} prefix
 * @param {...any} args
 */
export function log(prefix, ...args) {
  if (DEBUG && typeof console !== 'undefined' && console.log) {
    console.log(`[AeroBMSCE:${prefix}]`, ...args);
  }
}

/**
 * Log warning messages
 * @param {string} prefix
 * @param {...any} args
 */
export function warn(prefix, ...args) {
  if (typeof console !== 'undefined' && console.warn) {
    console.warn(`[AeroBMSCE:${prefix}]`, ...args);
  }
}

/**
 * Safely initialize a module without throwing or halting other scripts
 * @param {string} name
 * @param {() => any} fn
 * @returns {any}
 */
export function safeInit(name, fn) {
  try {
    const result = fn();
    log(name, 'Initialized successfully');
    return result;
  } catch (err) {
    warn(name, 'Init failed gracefully:', err);
    return null;
  }
}
