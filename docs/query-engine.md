# QueryEngine

The `QueryEngine` is a jQuery-inspired DOM manipulation API that uses JavaScript Proxies to provide a fluent, chainable interface for working with collections of elements.

```javascript
import { QueryEngine } from 'mythix-ui-core';
```

## Overview

QueryEngine wraps a collection of DOM elements and provides methods for manipulation, traversal, and event handling. It uses a Proxy to delegate Array methods and support method chaining.

```javascript
// Within a MythixUIComponent
this.select('.items')
  .addClass('highlighted')
  .removeClass('hidden')
  .on('click', this.handleClick);
```

## Creating QueryEngine Instances

### From Component

```javascript
// Using component's select method
const items = this.select('.item');
const buttons = this.select('button');
```

### Direct Construction

```javascript
const qe = new QueryEngine(document, elements, scope);
```

**Parameters:**
- `document` - The owner document
- `elements` - Array, NodeList, or single element to wrap
- `scope` - Optional scope object for template expressions

## Properties

### `length`

Returns the number of elements in the collection.

```javascript
const count = this.select('.item').length;
```

### `[index]`

Access elements by index (via Proxy).

```javascript
const first = this.select('.item')[0];
const last = this.select('.item')[-1]; // Negative indexing supported
```

## DOM Manipulation Methods

### `appendTo(target, options?)`

Append all elements in this collection to the target.

```javascript
this.$build(({ DIV }) => DIV.class('new')('Content'))
  .appendTo(this.shadow);

// With options
elements.appendTo(container, { processMarkup: true });
```

### `prependTo(target, options?)`

Prepend all elements to the target.

```javascript
this.select('.header').prependTo(this.shadow);
```

### `insertInto(target, options?)`

Insert elements into the target (clears target first).

```javascript
elements.insertInto(container);
```

### `insertBefore(referenceNode, options?)`

Insert elements before the reference node.

```javascript
this.select('.new-item').insertBefore(existingItem);
```

### `insertAfter(referenceNode, options?)`

Insert elements after the reference node.

```javascript
this.select('.notification').insertAfter(header);
```

### `replace(target, options?)`

Replace the target with these elements.

```javascript
newContent.replace(oldContent);
```

### `remove()`

Remove all elements from their parent.

```javascript
this.select('.obsolete').remove();
```

### `empty()`

Remove all children from each element.

```javascript
this.select('.container').empty();
```

## Class Manipulation

### `addClass(...classes)`

Add one or more classes to all elements.

```javascript
this.select('.item').addClass('active', 'highlighted');
```

### `removeClass(...classes)`

Remove one or more classes from all elements.

```javascript
this.select('.item').removeClass('hidden', 'disabled');
```

### `toggleClass(...classes)`

Toggle one or more classes on all elements.

```javascript
this.select('.panel').toggleClass('expanded');
```

## Attribute Manipulation

### `attr(name, value?)`

Get or set an attribute on the first element, or set on all elements.

```javascript
// Get attribute from first element
const href = this.select('a').attr('href');

// Set attribute on all elements
this.select('input').attr('disabled', 'true');
```

### `removeAttr(name)`

Remove an attribute from all elements.

```javascript
this.select('button').removeAttr('disabled');
```

### `data(key, value?)`

Get or set data attributes.

```javascript
// Get data-id
const id = this.select('.item').data('id');

// Set data-status on all elements
this.select('.item').data('status', 'active');
```

## Content Manipulation

### `text(value?)`

Get or set text content.

```javascript
// Get text from first element
const label = this.select('.label').text();

// Set text on all elements
this.select('.status').text('Loading...');
```

### `html(value?)`

Get or set innerHTML.

```javascript
// Get HTML from first element
const content = this.select('.content').html();

// Set HTML on all elements
this.select('.preview').html('<strong>Bold</strong> text');
```

## Event Handling

### `on(eventName, callback, options?)`

Attach an event listener to all elements.

```javascript
this.select('button').on('click', (event) => {
  console.log('Button clicked:', event.target);
});

// With options
this.select('.link').on('click', this.handleClick, { capture: true });
```

### `off(eventName, callback, options?)`

Remove an event listener from all elements.

```javascript
this.select('button').off('click', this.handleClick);
```

### `trigger(eventName, detail?)`

Dispatch a custom event on all elements.

```javascript
this.select('.component').trigger('custom-event', { data: 'value' });
```

## Traversal

### `filter(predicate)`

Filter elements based on a predicate function.

```javascript
const active = this.select('.item').filter(el => el.classList.contains('active'));
```

### `find(selector)`

Find descendants matching a selector.

```javascript
const links = this.select('.nav').find('a');
```

### `closest(selector)`

Find closest ancestor matching a selector.

```javascript
const container = this.select('.button').closest('.container');
```

### `parent()`

Get the parent of each element.

```javascript
const parents = this.select('.item').parent();
```

### `children(selector?)`

Get children of each element, optionally filtered.

```javascript
const allChildren = this.select('.list').children();
const items = this.select('.list').children('.item');
```

### `first()`

Get the first element as a new QueryEngine.

```javascript
const firstItem = this.select('.item').first();
```

### `last()`

Get the last element as a new QueryEngine.

```javascript
const lastItem = this.select('.item').last();
```

### `eq(index)`

Get element at index as a new QueryEngine.

```javascript
const third = this.select('.item').eq(2);
```

## Slot Handling

### `slot(slotName?)`

Find slot elements or elements with slot assignments.

```javascript
// Find all <slot> elements
const slots = this.select('*').slot();

// Find elements assigned to a named slot
const headerContent = this.select('*').slot('header');
```

## Array Method Delegation

QueryEngine delegates to Array methods through Proxy:

```javascript
// forEach
this.select('.item').forEach((el, i) => {
  console.log(`Item ${i}:`, el);
});

// map
const ids = this.select('.item').map(el => el.id);

// filter (returns QueryEngine)
const active = this.select('.item').filter(el => el.classList.contains('active'));

// some
const hasActive = this.select('.item').some(el => el.classList.contains('active'));

// every
const allVisible = this.select('.item').every(el => !el.hidden);

// reduce
const totalHeight = this.select('.item').reduce(
  (sum, el) => sum + el.offsetHeight, 0
);

// find (returns element)
const first = this.select('.item').find(el => el.id === 'target');

// includes
const containsElement = this.select('.item').includes(specificElement);

// indexOf
const index = this.select('.item').indexOf(specificElement);
```

## Type Checking

### Checking if a value is a QueryEngine

```javascript
import { QueryEngine } from 'mythix-ui-core';

if (value instanceof QueryEngine) {
  // It's a QueryEngine
}

// Alternative using Symbol
import { QUERY_ENGINE_TYPE, MYTHIX_TYPE } from 'mythix-ui-core';
if (value[MYTHIX_TYPE] === QUERY_ENGINE_TYPE) {
  // It's a QueryEngine
}
```

## Method Chaining

Most methods return the QueryEngine instance for chaining:

```javascript
this.select('.card')
  .addClass('highlighted')
  .removeClass('hidden')
  .attr('data-selected', 'true')
  .on('click', this.handleCardClick)
  .find('.title')
  .text('Updated Title');
```

## Iteration

### Using for...of

```javascript
for (const element of this.select('.item')) {
  console.log(element.textContent);
}
```

### Using forEach

```javascript
this.select('.item').forEach((element, index) => {
  element.style.order = index;
});
```

### Spread operator

```javascript
const elementsArray = [...this.select('.item')];
```

## Example: Dynamic List Component

```javascript
import { MythixUIComponent } from 'mythix-ui-core';

class DynamicList extends MythixUIComponent {
  static tagName = 'dynamic-list';

  mounted() {
    this.select('.add-btn').on('click', () => this.addItem());
    this.select('.clear-btn').on('click', () => this.clearItems());
  }

  addItem() {
    const item = this.$build(({ LI, BUTTON }) =>
      LI.class('list-item')(
        'New Item',
        BUTTON.class('remove-btn').onClick((e) => {
          e.target.closest('li').remove();
        })('X'),
      )
    );

    item.appendTo(this.select('.item-list'));
  }

  clearItems() {
    this.select('.item-list').empty();
  }

  getItemCount() {
    return this.select('.list-item').length;
  }

  highlightItem(index) {
    this.select('.list-item')
      .removeClass('highlighted')
      .eq(index)
      .addClass('highlighted');
  }
}

DynamicList.register();
```

## Performance Considerations

1. **Cache selections** - Store QueryEngine results when reusing:
   ```javascript
   this.itemsQE = this.select('.item'); // Cache in mounted()
   ```

2. **Use specific selectors** - Narrow down the search scope:
   ```javascript
   this.select('.container .item'); // More specific
   ```

3. **Batch operations** - Chain operations instead of multiple selections:
   ```javascript
   // Good
   this.select('.item').addClass('active').removeClass('hidden');

   // Less efficient
   this.select('.item').addClass('active');
   this.select('.item').removeClass('hidden');
   ```

## See Also

- [MythixUIComponent](./mythix-ui-component.md) - Base component class
- [Elements](./elements.md) - Programmatic element creation
- [DynamicProperty](./dynamic-property.md) - Reactive state
