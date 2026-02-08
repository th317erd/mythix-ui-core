'use strict';

/* global describe, it, expect, beforeEach, afterEach */

import * as StyleSheetManager from '../../lib/stylesheet-manager.js';

describe('StyleSheetManager', () => {
  beforeEach(() => {
    // Clear the cache before each test
    StyleSheetManager.clear();
  });

  describe('isSupported', () => {
    it('should return a boolean indicating Constructable Stylesheets support', () => {
      let result = StyleSheetManager.isSupported();
      expect(typeof result).toBe('boolean');
    });
  });

  describe('register', () => {
    it('should register a stylesheet by name', () => {
      let cssText = ':host { color: red; }';
      let sheet = StyleSheetManager.register('test-theme', cssText);

      if (StyleSheetManager.isSupported()) {
        expect(sheet).toBeInstanceOf(CSSStyleSheet);
        expect(StyleSheetManager.has('test-theme')).toBe(true);
      } else {
        expect(sheet).toBeNull();
      }
    });

    it('should return the same sheet for duplicate registrations', () => {
      let cssText = ':host { color: blue; }';
      let sheet1 = StyleSheetManager.register('dup-test', cssText);
      let sheet2 = StyleSheetManager.register('dup-test', cssText);

      expect(sheet1).toBe(sheet2);
    });

    it('should replace stylesheet when replace option is true', () => {
      if (!StyleSheetManager.isSupported()) {
        pending('Constructable Stylesheets not supported');
        return;
      }

      let cssText1 = ':host { color: green; }';
      let cssText2 = ':host { color: yellow; }';

      let sheet1 = StyleSheetManager.register('replace-test', cssText1);
      let sheet2 = StyleSheetManager.register('replace-test', cssText2, { replace: true });

      expect(sheet1).not.toBe(sheet2);
      expect(StyleSheetManager.get('replace-test')).toBe(sheet2);
    });

    it('should deduplicate stylesheets with identical content', () => {
      if (!StyleSheetManager.isSupported()) {
        pending('Constructable Stylesheets not supported');
        return;
      }

      let cssText = ':host { color: purple; }';
      let sheet1 = StyleSheetManager.register('dedup-1', cssText);
      let sheet2 = StyleSheetManager.register('dedup-2', cssText);

      // Same content should result in same CSSStyleSheet instance
      expect(sheet1).toBe(sheet2);
    });
  });

  describe('get', () => {
    it('should return registered stylesheet', () => {
      let cssText = ':host { color: orange; }';
      StyleSheetManager.register('get-test', cssText);

      let sheet = StyleSheetManager.get('get-test');
      if (StyleSheetManager.isSupported()) {
        expect(sheet).toBeInstanceOf(CSSStyleSheet);
      }
    });

    it('should return undefined for non-existent stylesheet', () => {
      let sheet = StyleSheetManager.get('non-existent');
      expect(sheet).toBeUndefined();
    });
  });

  describe('has', () => {
    it('should return true for registered stylesheets', () => {
      if (!StyleSheetManager.isSupported()) {
        pending('Constructable Stylesheets not supported');
        return;
      }

      StyleSheetManager.register('has-test', ':host { }');
      expect(StyleSheetManager.has('has-test')).toBe(true);
    });

    it('should return false for non-existent stylesheets', () => {
      expect(StyleSheetManager.has('no-such-sheet')).toBe(false);
    });
  });

  describe('unregister', () => {
    it('should remove a registered stylesheet', () => {
      if (!StyleSheetManager.isSupported()) {
        pending('Constructable Stylesheets not supported');
        return;
      }

      StyleSheetManager.register('unregister-test', ':host { }');
      expect(StyleSheetManager.has('unregister-test')).toBe(true);

      let result = StyleSheetManager.unregister('unregister-test');
      expect(result).toBe(true);
      expect(StyleSheetManager.has('unregister-test')).toBe(false);
    });

    it('should return false for non-existent stylesheet', () => {
      let result = StyleSheetManager.unregister('never-existed');
      expect(result).toBe(false);
    });
  });

  describe('getRegisteredNames', () => {
    it('should return array of registered stylesheet names', () => {
      if (!StyleSheetManager.isSupported()) {
        pending('Constructable Stylesheets not supported');
        return;
      }

      StyleSheetManager.register('names-1', ':host { }');
      StyleSheetManager.register('names-2', ':host { }');
      StyleSheetManager.register('names-3', ':host { }');

      let names = StyleSheetManager.getRegisteredNames();
      expect(Array.isArray(names)).toBe(true);
      expect(names).toContain('names-1');
      expect(names).toContain('names-2');
      expect(names).toContain('names-3');
    });

    it('should return empty array when no stylesheets registered', () => {
      let names = StyleSheetManager.getRegisteredNames();
      expect(names).toEqual([]);
    });
  });

  describe('createFromText', () => {
    it('should create a stylesheet without registering it', () => {
      if (!StyleSheetManager.isSupported()) {
        pending('Constructable Stylesheets not supported');
        return;
      }

      let sheet = StyleSheetManager.createFromText(':host { color: cyan; }');
      expect(sheet).toBeInstanceOf(CSSStyleSheet);
      expect(StyleSheetManager.getRegisteredNames().length).toBe(0);
    });

    it('should return null if not supported', () => {
      // This test only makes sense if we're running in an unsupported environment
      // In a supported environment, this will always pass
      let sheet = StyleSheetManager.createFromText(':host { }');
      if (!StyleSheetManager.isSupported()) {
        expect(sheet).toBeNull();
      } else {
        expect(sheet).not.toBeNull();
      }
    });
  });

  describe('adopt', () => {
    it('should return false for null target', () => {
      let result = StyleSheetManager.adopt(null, ['theme']);
      expect(result).toBe(false);
    });

    it('should adopt registered stylesheets into a shadow root', () => {
      if (!StyleSheetManager.isSupported()) {
        pending('Constructable Stylesheets not supported');
        return;
      }

      StyleSheetManager.register('adopt-test', ':host { color: pink; }');

      // Create a test element with shadow DOM
      let element = document.createElement('div');
      let shadow = element.attachShadow({ mode: 'open' });

      let result = StyleSheetManager.adopt(shadow, ['adopt-test']);
      expect(result).toBe(true);
      expect(shadow.adoptedStyleSheets.length).toBe(1);
    });

    it('should not duplicate already adopted stylesheets', () => {
      if (!StyleSheetManager.isSupported()) {
        pending('Constructable Stylesheets not supported');
        return;
      }

      StyleSheetManager.register('no-dup-test', ':host { color: magenta; }');

      let element = document.createElement('div');
      let shadow = element.attachShadow({ mode: 'open' });

      StyleSheetManager.adopt(shadow, ['no-dup-test']);
      StyleSheetManager.adopt(shadow, ['no-dup-test']);

      expect(shadow.adoptedStyleSheets.length).toBe(1);
    });

    it('should prepend stylesheets when prepend option is true', () => {
      if (!StyleSheetManager.isSupported()) {
        pending('Constructable Stylesheets not supported');
        return;
      }

      StyleSheetManager.register('first-sheet', ':host { order: 1; }');
      StyleSheetManager.register('second-sheet', ':host { order: 2; }');

      let element = document.createElement('div');
      let shadow = element.attachShadow({ mode: 'open' });

      StyleSheetManager.adopt(shadow, ['first-sheet']);
      StyleSheetManager.adopt(shadow, ['second-sheet'], { prepend: true });

      let sheets = shadow.adoptedStyleSheets;
      expect(sheets[0]).toBe(StyleSheetManager.get('second-sheet'));
      expect(sheets[1]).toBe(StyleSheetManager.get('first-sheet'));
    });
  });

  describe('adoptFromText', () => {
    it('should create and adopt a stylesheet from text', () => {
      if (!StyleSheetManager.isSupported()) {
        pending('Constructable Stylesheets not supported');
        return;
      }

      let element = document.createElement('div');
      let shadow = element.attachShadow({ mode: 'open' });

      let result = StyleSheetManager.adoptFromText(shadow, ':host { color: teal; }');
      expect(result).toBeInstanceOf(CSSStyleSheet);
      expect(shadow.adoptedStyleSheets.length).toBe(1);
    });

    it('should return null for null target', () => {
      let result = StyleSheetManager.adoptFromText(null, ':host { }');
      expect(result).toBeNull();
    });
  });

  describe('clear', () => {
    it('should remove all registered stylesheets', () => {
      if (!StyleSheetManager.isSupported()) {
        pending('Constructable Stylesheets not supported');
        return;
      }

      StyleSheetManager.register('clear-1', ':host { }');
      StyleSheetManager.register('clear-2', ':host { }');
      expect(StyleSheetManager.getRegisteredNames().length).toBe(2);

      StyleSheetManager.clear();
      expect(StyleSheetManager.getRegisteredNames().length).toBe(0);
    });
  });

  describe('StyleSheetManager namespace export', () => {
    it('should export as namespace object', () => {
      expect(StyleSheetManager.StyleSheetManager).toBeDefined();
      expect(StyleSheetManager.StyleSheetManager.register).toBe(StyleSheetManager.register);
      expect(StyleSheetManager.StyleSheetManager.adopt).toBe(StyleSheetManager.adopt);
    });
  });
});
