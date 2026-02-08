import * as _TestHelpers from '../support/test-helpers.js';

import { MythixUIComponent } from '../../lib/index.js';
import { JSDOM }      from 'jsdom';

describe('MythixUIComponent', () => {
  let dom;
  let testInstance;

  beforeEach(() => {
    dom = new JSDOM(`
<!DOCTYPE html><html><head><style>
:host([stuff="true"]), :host .sub, :host(.test) {
  color: red;
}

:host-context(body.dark) span, span {
  background-color: black;
}
</style></head><body></body></html>
`.trim());

    // Not great for parallel testing... I know...
    globalThis.window = dom.window;
    globalThis.document = window.document;
    globalThis.Node = window.Node;
    globalThis.HTMLElement = window.HTMLElement;

    // Create a mock instance with the classes method bound
    testInstance = {
      classes: MythixUIComponent.prototype.classes,
    };
  });

  describe('classes method', () => {
    it('combines class names from strings', () => {
      expect(testInstance.classes('test', 'derp', 'wow')).toBe('test derp wow');
    });

    it('handles conditional objects', () => {
      expect(testInstance.classes('test', { stuff: true, otherStuff: false })).toBe('test stuff');
    });

    it('handles arrays and mixed input', () => {
      expect(testInstance.classes('test', { stuff: true, otherStuff: false }, [ '   cool', '  bean ' ])).toBe('test stuff cool bean');
    });

    it('handles empty input', () => {
      expect(testInstance.classes()).toBe('');
    });

    it('filters falsy values from objects', () => {
      expect(testInstance.classes('a', { b: true, c: false, d: true })).toBe('a b d');
    });
  });
});
