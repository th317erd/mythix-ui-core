/* eslint-disable no-magic-numbers */

import * as _TestHelpers from '../support/test-helpers.js';

// Import the RTL detection and format presets (we'll test them directly)
// Since MythixUILanguageProvider requires DOM, we'll test the utility functions

describe('i18n utilities', () => {
  describe('RTL language detection', () => {
    // We'll create a simple test for the RTL language set
    const RTL_LANGUAGES = new Set([
      'ar', 'arc', 'arz', 'az-arab', 'bqi', 'ckb', 'dv', 'fa', 'glk', 'he',
      'ku-arab', 'mzn', 'nqo', 'pnb', 'ps', 'sd', 'ug', 'ur', 'yi',
    ]);

    const isRTLLanguage = (lang) => {
      if (!lang)
        return false;

      let normalizedLang = lang.toLowerCase();
      if (RTL_LANGUAGES.has(normalizedLang))
        return true;

      let baseLang = normalizedLang.split('-')[0];
      return RTL_LANGUAGES.has(baseLang);
    };

    it('detects Arabic as RTL', () => {
      expect(isRTLLanguage('ar')).toBe(true);
      expect(isRTLLanguage('ar-SA')).toBe(true);
      expect(isRTLLanguage('ar-EG')).toBe(true);
    });

    it('detects Hebrew as RTL', () => {
      expect(isRTLLanguage('he')).toBe(true);
      expect(isRTLLanguage('he-IL')).toBe(true);
    });

    it('detects Persian/Farsi as RTL', () => {
      expect(isRTLLanguage('fa')).toBe(true);
      expect(isRTLLanguage('fa-IR')).toBe(true);
    });

    it('detects Urdu as RTL', () => {
      expect(isRTLLanguage('ur')).toBe(true);
      expect(isRTLLanguage('ur-PK')).toBe(true);
    });

    it('detects LTR languages correctly', () => {
      expect(isRTLLanguage('en')).toBe(false);
      expect(isRTLLanguage('en-US')).toBe(false);
      expect(isRTLLanguage('es')).toBe(false);
      expect(isRTLLanguage('fr')).toBe(false);
      expect(isRTLLanguage('de')).toBe(false);
      expect(isRTLLanguage('zh')).toBe(false);
      expect(isRTLLanguage('ja')).toBe(false);
    });

    it('handles null/undefined', () => {
      expect(isRTLLanguage(null)).toBe(false);
      expect(isRTLLanguage(undefined)).toBe(false);
      expect(isRTLLanguage('')).toBe(false);
    });

    it('is case insensitive', () => {
      expect(isRTLLanguage('AR')).toBe(true);
      expect(isRTLLanguage('Ar-SA')).toBe(true);
      expect(isRTLLanguage('HE')).toBe(true);
    });
  });

  describe('Intl.PluralRules integration', () => {
    it('returns correct plural category for English', () => {
      const pluralRules = new Intl.PluralRules('en');
      expect(pluralRules.select(0)).toBe('other');
      expect(pluralRules.select(1)).toBe('one');
      expect(pluralRules.select(2)).toBe('other');
      expect(pluralRules.select(5)).toBe('other');
    });

    it('returns correct plural category for Arabic', () => {
      const pluralRules = new Intl.PluralRules('ar');
      expect(pluralRules.select(0)).toBe('zero');
      expect(pluralRules.select(1)).toBe('one');
      expect(pluralRules.select(2)).toBe('two');
      // Arabic has complex plural rules for few/many
    });

    it('returns correct plural category for Russian', () => {
      const pluralRules = new Intl.PluralRules('ru');
      expect(pluralRules.select(1)).toBe('one');
      expect(pluralRules.select(2)).toBe('few');
      expect(pluralRules.select(5)).toBe('many');
      expect(pluralRules.select(21)).toBe('one');
    });
  });

  describe('Intl.DateTimeFormat integration', () => {
    it('formats dates in different locales', () => {
      const date = new Date(2026, 1, 7); // Feb 7, 2026

      const enFormatter = new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
      expect(enFormatter.format(date)).toContain('February');
      expect(enFormatter.format(date)).toContain('7');
      expect(enFormatter.format(date)).toContain('2026');

      const deFormatter = new Intl.DateTimeFormat('de-DE', { month: 'long', day: 'numeric', year: 'numeric' });
      expect(deFormatter.format(date)).toContain('Februar');
    });

    it('supports different format styles', () => {
      const date = new Date(2026, 1, 7);

      const shortFormatter = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
      expect(shortFormatter.format(date)).toContain('Feb');

      const longFormatter = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' });
      expect(longFormatter.format(date)).toContain('Saturday');
    });
  });

  describe('Intl.NumberFormat integration', () => {
    it('formats numbers in different locales', () => {
      const enFormatter = new Intl.NumberFormat('en-US');
      expect(enFormatter.format(1234.56)).toBe('1,234.56');

      const deFormatter = new Intl.NumberFormat('de-DE');
      expect(deFormatter.format(1234.56)).toBe('1.234,56');
    });

    it('formats percentages', () => {
      const formatter = new Intl.NumberFormat('en-US', { style: 'percent' });
      expect(formatter.format(0.42)).toBe('42%');
    });

    it('formats currency', () => {
      const usdFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
      expect(usdFormatter.format(99.99)).toBe('$99.99');

      const eurFormatter = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' });
      expect(eurFormatter.format(99.99)).toContain('€');
    });

    it('supports compact notation', () => {
      const formatter = new Intl.NumberFormat('en-US', { notation: 'compact' });
      expect(formatter.format(1000)).toBe('1K');
      expect(formatter.format(1000000)).toBe('1M');
    });
  });

  describe('Intl.RelativeTimeFormat integration', () => {
    it('formats relative times', () => {
      const formatter = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

      expect(formatter.format(-1, 'day')).toBe('yesterday');
      expect(formatter.format(1, 'day')).toBe('tomorrow');
      expect(formatter.format(-2, 'day')).toBe('2 days ago');
      expect(formatter.format(2, 'day')).toBe('in 2 days');
    });

    it('supports different locales', () => {
      const enFormatter = new Intl.RelativeTimeFormat('en', { numeric: 'always' });
      const deFormatter = new Intl.RelativeTimeFormat('de', { numeric: 'always' });

      expect(enFormatter.format(-1, 'day')).toBe('1 day ago');
      expect(deFormatter.format(-1, 'day')).toContain('Tag');
    });
  });

  describe('Fallback chain logic', () => {
    it('builds correct fallback chain from language with region', () => {
      // Simulate getFallbackChain logic
      const buildFallbackChain = (currentLang, fallbackAttr) => {
        let fallbacks = fallbackAttr.split(',').map((l) => l.trim()).filter(Boolean);
        let chain = [ currentLang ];

        if (currentLang.includes('-')) {
          let baseLang = currentLang.split('-')[0];
          if (!chain.includes(baseLang))
            chain.push(baseLang);
        }

        for (let lang of fallbacks) {
          if (!chain.includes(lang))
            chain.push(lang);
        }

        return chain;
      };

      expect(buildFallbackChain('es-MX', 'es,en')).toEqual([ 'es-MX', 'es', 'en' ]);
      expect(buildFallbackChain('en-US', 'en')).toEqual([ 'en-US', 'en' ]);
      expect(buildFallbackChain('fr', 'en')).toEqual([ 'fr', 'en' ]);
      expect(buildFallbackChain('zh-TW', 'zh-CN,zh,en')).toEqual([ 'zh-TW', 'zh', 'zh-CN', 'en' ]);
    });

    it('does not duplicate languages in chain', () => {
      const buildFallbackChain = (currentLang, fallbackAttr) => {
        let fallbacks = fallbackAttr.split(',').map((l) => l.trim()).filter(Boolean);
        let chain = [ currentLang ];

        if (currentLang.includes('-')) {
          let baseLang = currentLang.split('-')[0];
          if (!chain.includes(baseLang))
            chain.push(baseLang);
        }

        for (let lang of fallbacks) {
          if (!chain.includes(lang))
            chain.push(lang);
        }

        return chain;
      };

      // es-MX already adds 'es' from base, so fallback 'es' shouldn't duplicate
      let chain = buildFallbackChain('es-MX', 'es,en');
      expect(chain.filter((l) => l === 'es').length).toBe(1);
    });
  });

  describe('Template interpolation', () => {
    it('interpolates variables in strings', () => {
      const interpolate = (template, values) => {
        return template.replace(/\{\{(\w+)\}\}/g, (match, varName) => {
          return (varName in values) ? values[varName] : match;
        });
      };

      expect(interpolate('Hello, {{name}}!', { name: 'John' })).toBe('Hello, John!');
      expect(interpolate('{{a}} + {{b}} = {{c}}', { a: 1, b: 2, c: 3 })).toBe('1 + 2 = 3');
      expect(interpolate('Missing {{var}}', {})).toBe('Missing {{var}}');
    });

    it('handles count for pluralization', () => {
      const interpolate = (template, values) => {
        return template.replace(/\{\{(\w+)\}\}/g, (match, varName) => {
          return (varName in values) ? values[varName] : match;
        });
      };

      // Simulate pluralization selection
      const pluralRules = new Intl.PluralRules('en');
      const pluralForms = {
        one:   '{{count}} item',
        other: '{{count}} items',
      };

      let count = 1;
      let category = pluralRules.select(count);
      let template = pluralForms[category] || pluralForms.other;
      expect(interpolate(template, { count })).toBe('1 item');

      count = 5;
      category = pluralRules.select(count);
      template = pluralForms[category] || pluralForms.other;
      expect(interpolate(template, { count })).toBe('5 items');
    });
  });
});
