import * as _TestHelpers from '../support/test-helpers.js';

import { QueryEngine, Elements }  from '../../lib/index.js';
import { JSDOM }      from 'jsdom';

describe('Elements', () => {
  let dom;

  beforeEach(() => {
    dom = new JSDOM(`
<!DOCTYPE html>
<html>
  <head></head>
  <body>
    <p>Hello there!</p>
    <div>
      <span>Howdy!</span>
      <span>Well hello!</span>
      <span>Sweet!</span>
    </div>
  </body>
</html>
`.trim());

    // Not great for parallel testing... I know...
    globalThis.window = dom.window;
    globalThis.document = window.document;
    globalThis.Node = window.Node;
    globalThis.HTMLElement = window.HTMLElement;
  });

  describe('ElementDefinition', () => {
    it('can stringify to html', () => {
      const $ = Elements.build;

      let elementBuilder = $('div').id('test').class('one two')(
        $('span').class('three').dataForFun('stuff')('Test'),
        $('div').id('test2').class('hello world')(
          $('input').class('four').prop$value('stuff')(),
        ),
      );

      // Check that the HTML contains expected structure
      let html = elementBuilder.toString();
      expect(html).toContain('<div id="test"');
      expect(html).toContain('class="one two"');
      expect(html).toContain('<span class="three"');
      expect(html).toContain('data-for-fun="stuff"');
      expect(html).toContain('>Test</span>');
      expect(html).toContain('<input class="four"');
    });

    it('creates nested elements correctly', () => {
      const $ = Elements.build;

      let elementBuilder = $('ul')(
        $('li')('Item 1'),
        $('li')('Item 2'),
        $('li')('Item 3'),
      );

      let html = elementBuilder.toString();
      expect(html).toContain('<ul>');
      expect(html).toContain('<li>Item 1</li>');
      expect(html).toContain('<li>Item 2</li>');
      expect(html).toContain('<li>Item 3</li>');
      expect(html).toContain('</ul>');
    });

    it('handles self-closing tags', () => {
      const $ = Elements.build;

      let elementBuilder = $('div')(
        $('input').type('text')(),
        $('br')(),
      );

      let html = elementBuilder.toString();
      expect(html).toContain('<input');
    });
  });
});
