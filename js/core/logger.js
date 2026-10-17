/**
 * js/core/logger.js — Error reporting and resilient module bootstrap wrapper
 * Depends on: None
 * Touches: console
 */

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
    return result;
  } catch (err) {
    warn(name, 'Init failed gracefully:', err);
    return null;
  }
}
