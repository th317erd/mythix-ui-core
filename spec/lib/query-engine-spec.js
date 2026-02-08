import * as _TestHelpers from '../support/test-helpers.js';

import { QueryEngine }  from '../../lib/index.js';
import { JSDOM }      from 'jsdom';

describe('QueryEngine', () => {
  let dom;

  beforeEach(() => {
    dom = new JSDOM(`
<!DOCTYPE html>
<html>
  <head></head>
  <body>
    <p>Hello there!</p>
    <div id="container" class="wrapper">
      <span class="item">Howdy!</span>
      <span class="item active">Well hello!</span>
      <span class="item">Sweet!</span>
    </div>
    <ul>
      <li data-id="1">First</li>
      <li data-id="2">Second</li>
      <li data-id="3">Third</li>
    </ul>
  </body>
</html>
`.trim());

    // Not great for parallel testing... I know...
    globalThis.window = dom.window;
    globalThis.document = window.document;
    globalThis.Node = window.Node;
    globalThis.HTMLElement = window.HTMLElement;
  });

  describe('QueryEngine.from', () => {
    it('creates QueryEngine from selector', () => {
      let query = QueryEngine.from({ root: document }, 'span');
      expect(query.length).toEqual(3);
    });

    it('creates QueryEngine from element array', () => {
      let elements = Array.from(document.querySelectorAll('span'));
      let query = QueryEngine.from({ root: document }, elements);
      expect(query.length).toEqual(3);
    });

    it('creates QueryEngine from single element array', () => {
      let element = document.querySelector('p');
      let query = QueryEngine.from({ root: document }, [element]);
      expect(query.length).toEqual(1);
      expect(query[0]).toBe(element);
    });
  });

  describe('Array methods work', () => {
    it('[index]', () => {
      let query = QueryEngine.from({ root: document }, 'span');

      expect(document.querySelectorAll('span')[0]).toBeTruthy();
      expect(document.querySelectorAll('span')[1]).toBeTruthy();
      expect(document.querySelectorAll('span')[2]).toBeTruthy();

      expect(query.length).toEqual(3);
      expect(query[0]).toBe(document.querySelectorAll('span')[0]);
      expect(query[1]).toBe(document.querySelectorAll('span')[1]);
      expect(query[2]).toBe(document.querySelectorAll('span')[2]);
    });

    it('forEach', () => {
      let callCount = 0;

      let query = QueryEngine.from({ root: document }, 'span', (element) => {
        callCount++;
        return element.textContent;
      });

      expect(callCount).toEqual(3);
      expect(Array.from(query)).toEqual([ 'Howdy!', 'Well hello!', 'Sweet!' ]);
    });

    it('map', () => {
      let query = QueryEngine.from({ root: document }, 'span');
      let result = query.map((el) => el.textContent);
      expect(Array.from(result)).toEqual(['Howdy!', 'Well hello!', 'Sweet!']);
    });

    it('filter', () => {
      let query = QueryEngine.from({ root: document }, 'span');
      let result = query.filter((el) => el.classList.contains('active'));
      expect(result.length).toEqual(1);
      expect(result[0].textContent).toEqual('Well hello!');
    });

    it('find', () => {
      let query = QueryEngine.from({ root: document }, 'span');
      let result = query.find((el) => el.classList.contains('active'));
      expect(result.textContent).toEqual('Well hello!');
    });

    it('some', () => {
      let query = QueryEngine.from({ root: document }, 'span');
      expect(query.some((el) => el.classList.contains('active'))).toBe(true);
      expect(query.some((el) => el.classList.contains('nonexistent'))).toBe(false);
    });

    it('every', () => {
      let query = QueryEngine.from({ root: document }, 'span');
      expect(query.every((el) => el.classList.contains('item'))).toBe(true);
      expect(query.every((el) => el.classList.contains('active'))).toBe(false);
    });

    it('reduce', () => {
      let query = QueryEngine.from({ root: document }, 'span');
      let result = query.reduce((acc, el) => acc + el.textContent + ' ', '');
      expect(result.trim()).toEqual('Howdy! Well hello! Sweet!');
    });
  });

  describe('DOM manipulation methods', () => {
    it('addClass', () => {
      let query = QueryEngine.from({ root: document }, 'span');
      query.addClass('new-class');

      document.querySelectorAll('span').forEach((el) => {
        expect(el.classList.contains('new-class')).toBe(true);
      });
    });

    it('removeClass', () => {
      let query = QueryEngine.from({ root: document }, 'span');
      query.removeClass('item');

      document.querySelectorAll('span').forEach((el) => {
        expect(el.classList.contains('item')).toBe(false);
      });
    });

    it('toggleClass', () => {
      let query = QueryEngine.from({ root: document }, 'span');
      query.toggleClass('toggled');

      document.querySelectorAll('span').forEach((el) => {
        expect(el.classList.contains('toggled')).toBe(true);
      });

      query.toggleClass('toggled');

      document.querySelectorAll('span').forEach((el) => {
        expect(el.classList.contains('toggled')).toBe(false);
      });
    });
  });

  describe('traversal methods', () => {
    it('first', () => {
      let query = QueryEngine.from({ root: document }, 'span');
      let first = query.first();
      expect(first.length).toEqual(1);
      expect(first[0].textContent).toEqual('Howdy!');
    });

    it('last', () => {
      let query = QueryEngine.from({ root: document }, 'span');
      let last = query.last();
      expect(last.length).toEqual(1);
      expect(last[0].textContent).toEqual('Sweet!');
    });

    it('slice', () => {
      let query = QueryEngine.from({ root: document }, 'span');
      let sliced = query.slice(1, 2);
      expect(sliced.length).toEqual(1);
      expect(sliced[0].textContent).toEqual('Well hello!');
    });

    it('select (sub-query)', () => {
      let query = QueryEngine.from({ root: document }, '#container');
      let spans = query.select('.item');
      expect(spans.length).toEqual(3);
    });
  });

  describe('chaining', () => {
    it('methods can be chained', () => {
      let query = QueryEngine.from({ root: document }, 'span')
        .addClass('chained')
        .addClass('another');

      document.querySelectorAll('span').forEach((el) => {
        expect(el.classList.contains('chained')).toBe(true);
        expect(el.classList.contains('another')).toBe(true);
      });
    });

    it('filter then map', () => {
      let query = QueryEngine.from({ root: document }, 'span');
      let result = query
        .filter((el) => el.classList.contains('active'))
        .map((el) => el.textContent);

      expect(Array.from(result)).toEqual(['Well hello!']);
    });
  });

  describe('iteration', () => {
    it('is iterable with for...of', () => {
      let query = QueryEngine.from({ root: document }, 'span');
      let texts = [];

      for (let el of query) {
        texts.push(el.textContent);
      }

      expect(texts).toEqual(['Howdy!', 'Well hello!', 'Sweet!']);
    });

    it('spread operator works', () => {
      let query = QueryEngine.from({ root: document }, 'span');
      let elements = [...query];
      expect(elements.length).toEqual(3);
    });
  });
});
