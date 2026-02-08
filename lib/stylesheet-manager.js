'use strict';

/**
 * type: Namespace
 * name: StyleSheetManager
 * groupName: StyleSheetManager
 * desc: |
 *   `import { StyleSheetManager } from 'mythix-ui-core@1.0';`
 *
 *   Utility for managing Constructable Stylesheets across components.
 *   Provides efficient style sharing through the `adoptedStyleSheets` API,
 *   with automatic fallback for older browsers.
 *
 *   Browser Support (Baseline since March 2023):
 *   - Chrome 73+, Firefox 101+, Safari 16.4+, Edge 79+
 *
 * examples:
 *   - |
 *     ```javascript
 *     import { StyleSheetManager } from 'mythix-ui-core';
 *
 *     // Register a shared stylesheet
 *     StyleSheetManager.register('theme', `
 *       :host {
 *         --primary-color: blue;
 *         --secondary-color: green;
 *       }
 *     `);
 *
 *     // Adopt in a shadow root
 *     StyleSheetManager.adopt(this.shadowRoot, ['theme']);
 *     ```
 *   - |
 *     ```javascript
 *     // In a component
 *     class MyComponent extends MythixUIComponent {
 *       static sharedStyles = ['theme', 'typography'];
 *
 *       createShadowDOM() {
 *         let shadow = super.createShadowDOM();
 *         // sharedStyles are automatically adopted
 *         return shadow;
 *       }
 *     }
 *     ```
 */

// Cache for constructed stylesheets by name
const STYLESHEET_CACHE = new Map();

// Cache for stylesheets by content hash (for deduplication)
const CONTENT_HASH_CACHE = new Map();

// Check if Constructable Stylesheets are supported
const supportsConstructableStylesheets = (() => {
  try {
    new CSSStyleSheet();
    return true;
  } catch (error) {
    return false;
  }
})();

/**
 * Simple hash function for stylesheet content deduplication.
 */
const hashContent = (content) => {
  let hash = 0;
  for (let i = 0; i < content.length; i++) {
    let char = content.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return hash.toString(16);
};

/**
 * type: Function
 * name: isSupported
 * groupName: StyleSheetManager
 * parent: StyleSheetManager
 * desc: |
 *   Check if Constructable Stylesheets are supported in the current browser.
 * return: |
 *   @types boolean; True if supported.
 */

/**
 * Check if Constructable Stylesheets are supported in the current browser.
 * @returns {boolean} True if Constructable Stylesheets are supported.
 */
export const isSupported = () => supportsConstructableStylesheets;

/**
 * type: Function
 * name: register
 * groupName: StyleSheetManager
 * parent: StyleSheetManager
 * desc: |
 *   Register a stylesheet by name for later adoption.
 *   If the same content has already been registered under a different name,
 *   the same CSSStyleSheet instance will be reused.
 * arguments:
 *   - name: name
 *     dataType: string
 *     desc: The unique name for this stylesheet.
 *   - name: cssText
 *     dataType: string
 *     desc: The CSS content of the stylesheet.
 *   - name: options
 *     dataType: object
 *     optional: true
 *     desc: |
 *       Options for registration.
 *       - `replace`: If true, replaces existing registration (default: false).
 * return: |
 *   @types CSSStyleSheet | null; The constructed stylesheet, or null if not supported.
 *
 * examples:
 *   - |
 *     ```javascript
 *     StyleSheetManager.register('theme', `
 *       :host {
 *         --primary-color: #007bff;
 *       }
 *     `);
 *     ```
 */

/**
 * Register a stylesheet by name for later adoption.
 * @param {string} name - The unique name for this stylesheet.
 * @param {string} cssText - The CSS content of the stylesheet.
 * @param {Object} [options={}] - Options for registration.
 * @param {boolean} [options.replace=false] - If true, replaces existing registration.
 * @returns {CSSStyleSheet|null} The constructed stylesheet, or null if not supported.
 */
export const register = (name, cssText, options = {}) => {
  if (!supportsConstructableStylesheets)
    return null;

  // Check if already registered (and not replacing)
  if (STYLESHEET_CACHE.has(name) && !options.replace)
    return STYLESHEET_CACHE.get(name);

  // Check for content deduplication
  let contentHash = hashContent(cssText);
  let existingSheet = CONTENT_HASH_CACHE.get(contentHash);

  if (existingSheet) {
    STYLESHEET_CACHE.set(name, existingSheet);
    return existingSheet;
  }

  // Create new stylesheet
  let sheet = new CSSStyleSheet();
  sheet.replaceSync(cssText);

  STYLESHEET_CACHE.set(name, sheet);
  CONTENT_HASH_CACHE.set(contentHash, sheet);

  return sheet;
};

/**
 * type: Function
 * name: get
 * groupName: StyleSheetManager
 * parent: StyleSheetManager
 * desc: |
 *   Get a registered stylesheet by name.
 * arguments:
 *   - name: name
 *     dataType: string
 *     desc: The name of the stylesheet.
 * return: |
 *   @types CSSStyleSheet | undefined; The stylesheet, or undefined if not found.
 */

/**
 * Get a registered stylesheet by name.
 * @param {string} name - The name of the stylesheet.
 * @returns {CSSStyleSheet|undefined} The stylesheet, or undefined if not found.
 */
export const get = (name) => {
  return STYLESHEET_CACHE.get(name);
};

/**
 * type: Function
 * name: has
 * groupName: StyleSheetManager
 * parent: StyleSheetManager
 * desc: |
 *   Check if a stylesheet is registered.
 * arguments:
 *   - name: name
 *     dataType: string
 *     desc: The name of the stylesheet.
 * return: |
 *   @types boolean; True if the stylesheet is registered.
 */

/**
 * Check if a stylesheet is registered.
 * @param {string} name - The name of the stylesheet.
 * @returns {boolean} True if the stylesheet is registered.
 */
export const has = (name) => {
  return STYLESHEET_CACHE.has(name);
};

/**
 * type: Function
 * name: unregister
 * groupName: StyleSheetManager
 * parent: StyleSheetManager
 * desc: |
 *   Unregister a stylesheet by name.
 *   Note: This does not remove the stylesheet from shadow roots that have already adopted it.
 * arguments:
 *   - name: name
 *     dataType: string
 *     desc: The name of the stylesheet.
 * return: |
 *   @types boolean; True if the stylesheet was unregistered.
 */

/**
 * Unregister a stylesheet by name.
 * Note: This does not remove the stylesheet from shadow roots that have already adopted it.
 * @param {string} name - The name of the stylesheet.
 * @returns {boolean} True if the stylesheet was unregistered.
 */
export const unregister = (name) => {
  return STYLESHEET_CACHE.delete(name);
};

/**
 * type: Function
 * name: adopt
 * groupName: StyleSheetManager
 * parent: StyleSheetManager
 * desc: |
 *   Adopt one or more registered stylesheets into a shadow root or document.
 *   Uses the `adoptedStyleSheets` API when available, with fallback to `<style>` injection.
 * arguments:
 *   - name: target
 *     dataType: ShadowRoot | Document
 *     desc: The target to adopt stylesheets into.
 *   - name: names
 *     dataType: Array<string>
 *     desc: Array of stylesheet names to adopt.
 *   - name: options
 *     dataType: object
 *     optional: true
 *     desc: |
 *       Options for adoption.
 *       - `prepend`: If true, stylesheets are added before existing ones (default: false).
 *       - `fallbackStyles`: Object mapping names to CSS text for fallback injection.
 * return: |
 *   @types boolean; True if stylesheets were adopted via adoptedStyleSheets, false if fallback was used.
 *
 * examples:
 *   - |
 *     ```javascript
 *     // Adopt registered stylesheets
 *     StyleSheetManager.adopt(this.shadowRoot, ['theme', 'typography']);
 *
 *     // With fallback for older browsers
 *     StyleSheetManager.adopt(this.shadowRoot, ['theme'], {
 *       fallbackStyles: {
 *         'theme': ':host { --primary-color: blue; }'
 *       }
 *     });
 *     ```
 */

/**
 * Adopt one or more registered stylesheets into a shadow root or document.
 * @param {ShadowRoot|Document} target - The target to adopt stylesheets into.
 * @param {string[]} names - Array of stylesheet names to adopt.
 * @param {Object} [options={}] - Options for adoption.
 * @param {boolean} [options.prepend=false] - If true, stylesheets are added before existing ones.
 * @param {Object<string, string>} [options.fallbackStyles] - Object mapping names to CSS text for fallback injection.
 * @returns {boolean} True if stylesheets were adopted via adoptedStyleSheets, false if fallback was used.
 */
export const adopt = (target, names, options = {}) => {
  if (!target)
    return false;

  let sheets = names.map((name) => STYLESHEET_CACHE.get(name)).filter(Boolean);

  // Use adoptedStyleSheets if available and all sheets exist
  if (supportsConstructableStylesheets && target.adoptedStyleSheets !== undefined && sheets.length === names.length) {
    let existingSheets = Array.from(target.adoptedStyleSheets);

    // Filter out sheets that are already adopted
    let newSheets = sheets.filter((sheet) => !existingSheets.includes(sheet));

    if (newSheets.length > 0) {
      if (options.prepend)
        target.adoptedStyleSheets = [ ...newSheets, ...existingSheets ];
      else
        target.adoptedStyleSheets = [ ...existingSheets, ...newSheets ];
    }

    return true;
  }

  // Fallback: inject <style> elements
  if (options.fallbackStyles) {
    for (let name of names) {
      let cssText = options.fallbackStyles[name];

      if (!cssText)
        continue;

      // Check if already injected
      let existingStyle = target.querySelector(`style[data-stylesheet-name="${name}"]`);
      if (existingStyle)
        continue;

      let styleElement = (target.ownerDocument || document).createElement('style');
      styleElement.setAttribute('data-stylesheet-name', name);
      styleElement.textContent = cssText;

      if (options.prepend && target.firstChild)
        target.insertBefore(styleElement, target.firstChild);
      else if (target.appendChild)
        target.appendChild(styleElement);
      else if (target.head)
        target.head.appendChild(styleElement);
    }
  }

  return false;
};

/**
 * type: Function
 * name: createFromText
 * groupName: StyleSheetManager
 * parent: StyleSheetManager
 * desc: |
 *   Create a CSSStyleSheet from CSS text without registering it.
 *   Useful for component-specific styles that don't need to be shared.
 * arguments:
 *   - name: cssText
 *     dataType: string
 *     desc: The CSS content.
 * return: |
 *   @types CSSStyleSheet | null; The constructed stylesheet, or null if not supported.
 */

/**
 * Create a CSSStyleSheet from CSS text without registering it.
 * @param {string} cssText - The CSS content.
 * @returns {CSSStyleSheet|null} The constructed stylesheet, or null if not supported.
 */
export const createFromText = (cssText) => {
  if (!supportsConstructableStylesheets)
    return null;

  let sheet = new CSSStyleSheet();
  sheet.replaceSync(cssText);
  return sheet;
};

/**
 * type: Function
 * name: adoptFromText
 * groupName: StyleSheetManager
 * parent: StyleSheetManager
 * desc: |
 *   Create and immediately adopt a stylesheet from CSS text.
 *   Useful for one-off component styles.
 * arguments:
 *   - name: target
 *     dataType: ShadowRoot | Document
 *     desc: The target to adopt into.
 *   - name: cssText
 *     dataType: string
 *     desc: The CSS content.
 *   - name: options
 *     dataType: object
 *     optional: true
 *     desc: Options for adoption (see `adopt`).
 * return: |
 *   @types CSSStyleSheet | HTMLStyleElement | null; The stylesheet or style element, or null on failure.
 */

/**
 * Create and immediately adopt a stylesheet from CSS text.
 * @param {ShadowRoot|Document} target - The target to adopt into.
 * @param {string} cssText - The CSS content.
 * @param {Object} [options={}] - Options for adoption (see adopt).
 * @param {boolean} [options.prepend=false] - If true, stylesheets are added before existing ones.
 * @returns {CSSStyleSheet|HTMLStyleElement|null} The stylesheet or style element, or null on failure.
 */
export const adoptFromText = (target, cssText, options = {}) => {
  if (!target)
    return null;

  if (supportsConstructableStylesheets && target.adoptedStyleSheets !== undefined) {
    let sheet = createFromText(cssText);

    if (sheet) {
      let existingSheets = Array.from(target.adoptedStyleSheets);

      if (options.prepend)
        target.adoptedStyleSheets = [ sheet, ...existingSheets ];
      else
        target.adoptedStyleSheets = [ ...existingSheets, sheet ];

      return sheet;
    }
  }

  // Fallback to <style> element
  let styleElement = (target.ownerDocument || document).createElement('style');
  styleElement.textContent = cssText;

  if (options.prepend && target.firstChild)
    target.insertBefore(styleElement, target.firstChild);
  else if (target.appendChild)
    target.appendChild(styleElement);
  else if (target.head)
    target.head.appendChild(styleElement);

  return styleElement;
};

/**
 * type: Function
 * name: clear
 * groupName: StyleSheetManager
 * parent: StyleSheetManager
 * desc: |
 *   Clear all registered stylesheets.
 *   Primarily useful for testing.
 */

/**
 * Clear all registered stylesheets. Primarily useful for testing.
 * @returns {void}
 */
export const clear = () => {
  STYLESHEET_CACHE.clear();
  CONTENT_HASH_CACHE.clear();
};

/**
 * type: Function
 * name: getRegisteredNames
 * groupName: StyleSheetManager
 * parent: StyleSheetManager
 * desc: |
 *   Get the names of all registered stylesheets.
 * return: |
 *   @types Array<string>; Array of registered stylesheet names.
 */

/**
 * Get the names of all registered stylesheets.
 * @returns {string[]} Array of registered stylesheet names.
 */
export const getRegisteredNames = () => {
  return Array.from(STYLESHEET_CACHE.keys());
};

// Export as namespace-like object as well
export const StyleSheetManager = {
  isSupported,
  register,
  get,
  has,
  unregister,
  adopt,
  createFromText,
  adoptFromText,
  clear,
  getRegisteredNames,
};
