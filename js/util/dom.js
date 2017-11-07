/* eslint-disable import/prefer-default-export */
/*
 * DOM utilities
 */

// Calculates the page offset in order to be used with window.scrollTo and
// scroll the page to a specific location.
export function scrollOffset(element) {
  return element.offsetTop + (element.offsetParent ? scrollOffset(element.offsetParent) : 0);
}
