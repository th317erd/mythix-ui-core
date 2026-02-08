import deepMerge from 'deepmerge';
import * as BaseUtils from './base-utils.js';
import * as Utils from './utils.js';
import * as ComponentUtils from './component-utils.js';

import {
  DynamicProperty,
} from './dynamic-property.js';

import {
  MythixUIComponent,
} from './mythix-ui-component.js';

/**
 * RTL (Right-to-Left) language codes.
 * Includes Arabic, Hebrew, Persian/Farsi, Urdu, and related languages.
 */
const RTL_LANGUAGES = new Set([
  'ar', 'arc', 'arz', 'az-arab', 'bqi', 'ckb', 'dv', 'fa', 'glk', 'he',
  'ku-arab', 'mzn', 'nqo', 'pnb', 'ps', 'sd', 'ug', 'ur', 'yi',
]);

/**
 * Check if a language code represents an RTL language.
 */
const isRTLLanguage = (lang) => {
  if (!lang)
    return false;

  let normalizedLang = lang.toLowerCase();

  // Check exact match
  if (RTL_LANGUAGES.has(normalizedLang))
    return true;

  // Check base language (e.g., 'ar-SA' -> 'ar')
  let baseLang = normalizedLang.split('-')[0];
  return RTL_LANGUAGES.has(baseLang);
};

/**
 * Default date format presets.
 */
const DATE_FORMAT_PRESETS = {
  short:  { year: 'numeric', month: 'short', day: 'numeric' },
  long:   { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' },
  medium: { year: 'numeric', month: 'short', day: 'numeric', weekday: 'short' },
  time:   { hour: 'numeric', minute: 'numeric' },
  full:   { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long', hour: 'numeric', minute: 'numeric' },
};

/**
 * Default number format presets.
 */
const NUMBER_FORMAT_PRESETS = {
  decimal:    { style: 'decimal' },
  percent:    { style: 'percent' },
  compact:    { notation: 'compact' },
  scientific: { notation: 'scientific' },
};

export class MythixUILanguagePack extends MythixUIComponent {
  static tagName = 'mythix-language-pack';

  createShadowDOM() {
    // NOOP
  }

  getComponentTemplate() {
    // NOOP
  }

  set attr$dataMythixSrc([ value ]) {
    // NOOP... Trap this because we
    // don't want to load a partial here
  }

  onMutationAdded(mutation) {
    // When added to the DOM, ensure that we were
    // added to the root of a language provider...
    // If not, then move ourselves to the root
    // of the language provider.
    let parentLanguageProvider = this.closest('mythix-language-provider');
    if (parentLanguageProvider && parentLanguageProvider !== mutation.target)
      BaseUtils.nextTick(() => parentLanguageProvider.insertBefore(this, parentLanguageProvider.firstChild));
  }
}

const IS_JSON_ENCTYPE                 = /^application\/json/i;
const LANGUAGE_PACK_INSERT_GRACE_TIME = 50;

export class MythixUILanguageProvider extends MythixUIComponent {
  static tagName = 'mythix-language-provider';

  /**
   * Observed attributes for reactive updates.
   */
  static observedAttributes = [ 'lang', 'fallback', 'auto-dir' ];

  set attr$lang([ newValue, oldValue ]) {
    this.loadAllLanguagePacksForLanguage(newValue, oldValue);
    this.updateTextDirection();
  }

  set attr$fallback([ _newValue, _oldValue ]) {
    // Fallback chain changed, reload language packs
    this.loadAllLanguagePacksForLanguage(this.getCurrentLocale());
  }

  set attr$autoDir([ newValue ]) {
    if (newValue !== null)
      this.updateTextDirection();
  }

  onMutationChildAdded(node) {
    if (node.localName === 'mythix-language-pack') {
      this.debounce(() => {
        // Reload language packs after additions
        this.loadAllLanguagePacksForLanguage(this.getCurrentLocale());
      }, LANGUAGE_PACK_INSERT_GRACE_TIME, 'reloadLanguagePacks');
    }
  }

  constructor() {
    super();

    Object.defineProperties(this, {
      'terms': {
        writable:     true,
        enumerable:   false,
        configurable: true,
        value:        Object.create(null),
      },
      '_pluralRules': {
        writable:     true,
        enumerable:   false,
        configurable: true,
        value:        null,
      },
      '_dateFormatters': {
        writable:     true,
        enumerable:   false,
        configurable: true,
        value:        new Map(),
      },
      '_numberFormatters': {
        writable:     true,
        enumerable:   false,
        configurable: true,
        value:        new Map(),
      },
    });
  }

  /**
   * Get the fallback language chain as an array.
   * Returns [currentLang, ...fallbacks] in order of preference.
   */
  getFallbackChain() {
    let currentLang = this.getCurrentLocale();
    let fallback = this.getAttribute('fallback') || '';
    let fallbacks = fallback.split(',').map((l) => l.trim()).filter(Boolean);

    // Build chain: current -> base of current -> explicit fallbacks
    let chain = [ currentLang ];

    // Add base language if current has a region (e.g., 'es-MX' -> 'es')
    if (currentLang.includes('-')) {
      let baseLang = currentLang.split('-')[0];
      if (!chain.includes(baseLang))
        chain.push(baseLang);
    }

    // Add explicit fallbacks
    for (let lang of fallbacks) {
      if (!chain.includes(lang))
        chain.push(lang);
    }

    return chain;
  }

  /**
   * Translate a key with optional interpolation and pluralization support.
   *
   * @param {string} key - The translation key path.
   * @param {object} options - Options including `count` for pluralization and interpolation values.
   * @param {any} defaultValue - Default value if key not found.
   * @returns {string} The translated and interpolated string.
   *
   * @example
   * // Simple translation
   * lang.t('greeting.hello')
   *
   * @example
   * // With pluralization (requires ICU-style plural keys in language pack)
   * lang.t('items', { count: 5 })
   * // Language pack: { "items": { "one": "{{count}} item", "other": "{{count}} items" } }
   *
   * @example
   * // With interpolation
   * lang.t('welcome', { name: 'John' })
   * // Language pack: { "welcome": "Hello, {{name}}!" }
   */
  t(key, options = {}, defaultValue) {
    let path = `global.i18n.${key}`;
    let result = Utils.fetchPath(this.terms, path);

    // Handle pluralization
    if (result && typeof result === 'object' && 'count' in options) {
      let pluralCategory = this.getPluralCategory(options.count);
      result = result[pluralCategory] || result.other || result;
    }

    // Get the raw value if it's a DynamicProperty
    if (result instanceof DynamicProperty)
      result = result.valueOf();

    // Use default if no result
    if (result == null)
      result = (defaultValue != null) ? defaultValue : key;

    // Interpolate values
    if (typeof result === 'string' && options) {
      result = result.replace(/\{\{(\w+)\}\}/g, (match, varName) => {
        return (varName in options) ? options[varName] : match;
      });
    }

    return result;
  }

  /**
   * Get the ICU plural category for a count.
   *
   * @param {number} count - The count to get the plural category for.
   * @returns {string} One of: 'zero', 'one', 'two', 'few', 'many', 'other'.
   */
  getPluralCategory(count) {
    let lang = this.getCurrentLocale();

    // Cache PluralRules per language
    if (!this._pluralRules || this._pluralRules.locale !== lang) {
      this._pluralRules = new Intl.PluralRules(lang);
      this._pluralRules.locale = lang;
    }

    return this._pluralRules.select(count);
  }

  /**
   * Format a date according to the current locale.
   *
   * @param {Date|number|string} date - The date to format.
   * @param {string|object} style - A preset name ('short', 'long', 'medium', 'time', 'full') or Intl.DateTimeFormat options.
   * @returns {string} The formatted date string.
   *
   * @example
   * lang.formatDate(new Date(), 'long')
   * // "February 7, 2026"
   *
   * @example
   * lang.formatDate(date, { year: 'numeric', month: '2-digit', day: '2-digit' })
   */
  formatDate(date, style = 'medium') {
    let lang = this.getCurrentLocale();
    let options = (typeof style === 'string') ? (DATE_FORMAT_PRESETS[style] || DATE_FORMAT_PRESETS.medium) : style;
    let cacheKey = `${lang}-${JSON.stringify(options)}`;

    if (!this._dateFormatters.has(cacheKey))
      this._dateFormatters.set(cacheKey, new Intl.DateTimeFormat(lang, options));

    let dateValue = (date instanceof Date) ? date : new Date(date);
    return this._dateFormatters.get(cacheKey).format(dateValue);
  }

  /**
   * Format a date relative to now (e.g., "2 days ago", "in 3 hours").
   *
   * @param {Date|number|string} date - The date to format.
   * @param {object} options - Intl.RelativeTimeFormat options.
   * @returns {string} The relative time string.
   *
   * @example
   * lang.formatRelativeTime(new Date(Date.now() - 86400000))
   * // "1 day ago"
   */
  formatRelativeTime(date, options = {}) {
    let lang = this.getCurrentLocale();
    let dateValue = (date instanceof Date) ? date : new Date(date);
    let now = Date.now();
    let diffMs = dateValue.getTime() - now;
    let diffSeconds = Math.round(diffMs / 1000);

    // Determine the best unit
    let value;
    let unit;

    const MINUTE = 60;
    const HOUR = 3600;
    const DAY = 86400;
    const WEEK = 604800;
    const MONTH = 2629800; // ~30.44 days
    const YEAR = 31557600; // ~365.25 days

    let absDiff = Math.abs(diffSeconds);

    if (absDiff < MINUTE) {
      value = diffSeconds;
      unit = 'second';
    } else if (absDiff < HOUR) {
      value = Math.round(diffSeconds / MINUTE);
      unit = 'minute';
    } else if (absDiff < DAY) {
      value = Math.round(diffSeconds / HOUR);
      unit = 'hour';
    } else if (absDiff < WEEK) {
      value = Math.round(diffSeconds / DAY);
      unit = 'day';
    } else if (absDiff < MONTH) {
      value = Math.round(diffSeconds / WEEK);
      unit = 'week';
    } else if (absDiff < YEAR) {
      value = Math.round(diffSeconds / MONTH);
      unit = 'month';
    } else {
      value = Math.round(diffSeconds / YEAR);
      unit = 'year';
    }

    let formatter = new Intl.RelativeTimeFormat(lang, { numeric: 'auto', ...options });
    return formatter.format(value, unit);
  }

  /**
   * Format a number according to the current locale.
   *
   * @param {number} number - The number to format.
   * @param {string|object} style - A preset name ('decimal', 'percent', 'compact', 'scientific') or Intl.NumberFormat options.
   * @returns {string} The formatted number string.
   *
   * @example
   * lang.formatNumber(1234.56)
   * // "1,234.56" (in en-US)
   *
   * @example
   * lang.formatNumber(0.42, 'percent')
   * // "42%"
   */
  formatNumber(number, style = 'decimal') {
    let lang = this.getCurrentLocale();
    let options = (typeof style === 'string') ? (NUMBER_FORMAT_PRESETS[style] || NUMBER_FORMAT_PRESETS.decimal) : style;
    let cacheKey = `${lang}-${JSON.stringify(options)}`;

    if (!this._numberFormatters.has(cacheKey))
      this._numberFormatters.set(cacheKey, new Intl.NumberFormat(lang, options));

    return this._numberFormatters.get(cacheKey).format(number);
  }

  /**
   * Format a currency amount according to the current locale.
   *
   * @param {number} amount - The amount to format.
   * @param {string} currency - The ISO 4217 currency code (e.g., 'USD', 'EUR').
   * @param {object} options - Additional Intl.NumberFormat options.
   * @returns {string} The formatted currency string.
   *
   * @example
   * lang.formatCurrency(99.99, 'USD')
   * // "$99.99" (in en-US)
   *
   * @example
   * lang.formatCurrency(1234.56, 'EUR')
   * // "€1,234.56" (in en-US) or "1.234,56 €" (in de-DE)
   */
  formatCurrency(amount, currency, options = {}) {
    return this.formatNumber(amount, {
      style:    'currency',
      currency: currency,
      ...options,
    });
  }

  /**
   * Check if the current language is RTL.
   *
   * @returns {boolean} True if the current language is RTL.
   */
  isRTL() {
    return isRTLLanguage(this.getCurrentLocale());
  }

  /**
   * Update the text direction based on the current language.
   * Only applies when auto-dir attribute is present.
   */
  updateTextDirection() {
    if (!this.hasAttribute('auto-dir'))
      return;

    let direction = this.isRTL() ? 'rtl' : 'ltr';
    let previousDirection = this.getAttribute('dir');

    if (previousDirection === direction)
      return;

    this.setAttribute('dir', direction);

    // Also set on document if this is the root provider
    if (!this.closest('mythix-language-provider:not(:scope)')) {
      let doc = this.ownerDocument || document;
      doc.documentElement.setAttribute('dir', direction);
    }

    // Dispatch direction change event
    let event = new CustomEvent('directionchange', {
      bubbles: true,
      detail:  { direction, language: this.getCurrentLocale() },
    });
    this.dispatchEvent(event);
  }

  i18n(_path, defaultValue) {
    let path    = `global.i18n.${_path}`;
    let result  = Utils.fetchPath(this.terms, path);

    if (result == null)
      return Utils.getDynamicPropertyForPath.call(this, path, (defaultValue == null) ? '' : defaultValue);

    return result;
  }

  getCurrentLocale() {
    // (this.ownerDocument || document).childNodes[1] is the `<html`> tag of the document
    return this.getAttribute('lang') || (this.ownerDocument || document).childNodes[1].getAttribute('lang') || 'en';
  }

  mounted() {
    super.mounted();

    if (!this.getAttribute('lang'))
      this.setAttribute('lang', (this.ownerDocument || document).childNodes[1].getAttribute('lang') || 'en');

    // Apply initial text direction if auto-dir is enabled
    this.updateTextDirection();
  }

  createShadowDOM() {
    // NOOP
  }

  getComponentTemplate() {
    // NOOP
  }

  getSourcesForLang(lang) {
    return this.select(`mythix-language-pack[lang^="${lang.replace(/"/g, '\\"')}"]`);
  }

  loadAllLanguagePacksForLanguage(_lang) {
    let lang = _lang || 'en';
    let fallbackChain = this.getFallbackChain();
    let allSourceElements = [];

    // Collect language packs from all languages in the fallback chain
    for (let fallbackLang of fallbackChain) {
      let sourceElements = this.getSourcesForLang(fallbackLang)
        .filter((sourceElement) => BaseUtils.isNotNOE(sourceElement.getAttribute('src')));

      for (let sourceElement of sourceElements) {
        if (!allSourceElements.includes(sourceElement))
          allSourceElements.push(sourceElement);
      }
    }

    if (!allSourceElements.length) {
      console.warn(`"mythix-language-provider": No "mythix-language-pack" tag found for languages: ${fallbackChain.join(', ')}`);
      return;
    }

    this.loadAllLanguagePacks(lang, allSourceElements, fallbackChain);
  }

  async loadAllLanguagePacks(lang, sourceElements, fallbackChain = []) {
    try {
      // Load all language packs
      let promises = sourceElements.map((sourceElement) => {
        let packLang = sourceElement.getAttribute('lang') || lang;
        return this.loadLanguagePack(packLang, sourceElement).then((terms) => ({
          lang:  packLang,
          terms: terms,
        }));
      });

      let results = await Promise.allSettled(promises);

      // Group terms by language
      let termsByLang = new Map();
      for (let result of results) {
        if (result.status !== 'fulfilled' || !result.value || !result.value.terms)
          continue;

        let { lang: packLang, terms } = result.value;
        let baseLang = packLang.split('-')[0];

        // Store under both full lang and base lang for fallback matching
        if (!termsByLang.has(packLang))
          termsByLang.set(packLang, []);

        termsByLang.get(packLang).push(terms);
      }

      // Merge terms in fallback order (last in chain gets lowest priority)
      // Reverse the chain so more specific languages override fallbacks
      let mergedTerms = {};
      let reversedChain = [ ...fallbackChain ].reverse();

      for (let fallbackLang of reversedChain) {
        let langTerms = termsByLang.get(fallbackLang) || [];

        // Also check base language
        if (fallbackLang.includes('-')) {
          let baseLang = fallbackLang.split('-')[0];
          let baseTerms = termsByLang.get(baseLang) || [];
          langTerms = [ ...baseTerms, ...langTerms ];
        }

        for (let terms of langTerms) {
          mergedTerms = deepMerge(mergedTerms, terms);
        }
      }

      let compiledTerms = this.compileLanguageTerms(lang, mergedTerms);
      this.terms = compiledTerms;
    } catch (error) {
      console.error('"mythix-language-provider": Failed to load language packs', error);
    }
  }

  async loadLanguagePack(lang, sourceElement) {
    let src = sourceElement.getAttribute('src');
    if (!src)
      return;

    try {
      let { response }  = await ComponentUtils.require.call(this, src, { ownerDocument: this.ownerDocument || document });
      let type          = this.getAttribute('enctype') || 'application/json';
      if (IS_JSON_ENCTYPE.test(type)) {
        // Handle JSON
        return response.json();
      } else {
        new TypeError(`Don't know how to load a language pack of type "${type}"`);
      }
    } catch (error) {
      console.error(`"mythix-language-provider": Failed to load specified resource: ${src}`, error);
    }
  }

  compileLanguageTerms(lang, terms) {
    const walkTerms = (terms, rawKeyPath) => {
      let keys      = Object.keys(terms);
      let termsCopy = {};

      for (let i = 0, il = keys.length; i < il; i++) {
        let key         = keys[i];
        let value       = terms[key];
        let newKeyPath  = rawKeyPath.concat(key);

        if (BaseUtils.isPlainObject(value) || Array.isArray(value)) {
          termsCopy[key] = walkTerms(value, newKeyPath);
        } else {
          let property = Utils.getDynamicPropertyForPath.call(this, newKeyPath.join('.'), value);
          termsCopy[key] = property;
          property[DynamicProperty.set](value);
        }
      }

      return termsCopy;
    };

    return walkTerms(terms, [ 'global', 'i18n' ]);
  }
}

MythixUILanguagePack.register();
MythixUILanguageProvider.register();

(globalThis.mythixUI = (globalThis.mythixUI || {})).MythixUILanguagePack = MythixUILanguagePack;
globalThis.mythixUI.MythixUILanguageProvider = MythixUILanguageProvider;
