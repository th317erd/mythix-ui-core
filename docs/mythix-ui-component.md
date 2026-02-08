# MythixUIComponent

The `MythixUIComponent` class is the foundation of the mythix-ui-core framework. It extends `HTMLElement` and provides a comprehensive set of features for building Web Components with reactive data, template rendering, and DOM manipulation.

```javascript
import { MythixUIComponent } from 'mythix-ui-core';
```

## Class Definition

```javascript
class MythixUIComponent extends HTMLElement {
  static tagName = 'mythix-ui-component'; // Must be overridden
}
```

## Static Properties

### `tagName`

**Type:** `string`

The custom element tag name. Must be a valid custom element name (lowercase, contains a hyphen).

```javascript
class MyWidget extends MythixUIComponent {
  static tagName = 'my-widget';
}
```

### `sensitiveTagName`

**Type:** `string` (readonly getter)

Returns the tag name exactly as registered. By default, returns `tagName`. Override to provide case-sensitive naming if needed.

## Instance Properties

### `shadow`

**Type:** `ShadowRoot | null`

The Shadow DOM root attached to this component. Created by `createShadowDOM()`.

### `template`

**Type:** `HTMLTemplateElement | null`

The template element associated with this component.

### `documentInitialized`

**Type:** `boolean`

Returns `true` if the component's template has been appended to the document body. Used to prevent duplicate template registration.

### `$$`

**Type:** `Proxy`

A scope object (created by `Utils.createScope`) that provides access to the component's properties, methods, and DOM context. Used for template expression evaluation.

### `ownerDocument`

**Type:** `Document`

The document that owns this element (inherited from HTMLElement).

## Lifecycle Methods

### `constructor()`

Called when the element is created. Always call `super()` first.

```javascript
constructor() {
  super();
  // Initialize properties, but DOM is not yet available
  this.defineDynamicProp('items', []);
}
```

### `mounted()`

Called when the component is connected to the DOM and the template has been processed. Override this for initialization logic.

```javascript
mounted() {
  super.mounted(); // Call parent if extending another component

  console.log('Component is ready');
  this.loadData();
}
```

### `unmounted()`

Called when the component is disconnected from the DOM. Override for cleanup.

```javascript
unmounted() {
  super.unmounted();

  this.removeEventListeners();
  this.cancelPendingRequests();
}
```

### `adopted(newDocument)`

Called when the component is adopted into a new document via `document.adoptNode()`.

```javascript
adopted(newDocument) {
  console.log('Moved to new document:', newDocument);
}
```

### `attributeChanged(name, oldValue, newValue)`

Called when any observed attribute changes. Prefer using `attr$PropertyName` setters instead.

```javascript
attributeChanged(name, oldValue, newValue) {
  console.log(`Attribute "${name}" changed from "${oldValue}" to "${newValue}"`);
}
```

## Template Methods

### `createShadowDOM()`

Creates the Shadow DOM for this component. Override to customize Shadow DOM options or prevent creation.

```javascript
// Default behavior
createShadowDOM() {
  return this.attachShadow({ mode: 'open' });
}

// Prevent Shadow DOM creation
createShadowDOM() {
  // NOOP - component uses light DOM
}
```

### `getComponentTemplate()`

Finds and returns the `<template>` element for this component.

```javascript
getComponentTemplate() {
  // Default: finds <template data-for="tag-name">
  return super.getComponentTemplate();
}

// Custom template source
getComponentTemplate() {
  return document.getElementById('my-custom-template');
}
```

### `appendTemplateToShadowDOM(template)`

Appends the template content to the Shadow DOM after processing.

```javascript
appendTemplateToShadowDOM(template) {
  // Default behavior - processes and appends template
  super.appendTemplateToShadowDOM(template);
}
```

### `appendExternalToShadowDOM(elements)`

Appends external elements (like `<style>` tags with `slot` attributes) to the Shadow DOM. Called after `mounted()`.

## Mutation Callbacks

These methods are called in response to DOM mutations observed via MutationObserver.

### `onMutationAdded(mutation)`

Called when this component is added to the DOM.

```javascript
onMutationAdded(mutation) {
  console.log('Added to:', mutation.target);
}
```

### `onMutationRemoved(mutation)`

Called when this component is removed from the DOM.

```javascript
onMutationRemoved(mutation) {
  console.log('Removed from:', mutation.target);
}
```

### `onMutationChildAdded(node, mutation)`

Called when a child node is added to this component.

```javascript
onMutationChildAdded(node, mutation) {
  if (node.localName === 'my-special-child') {
    this.handleSpecialChildAdded(node);
  }
}
```

### `onMutationChildRemoved(node, mutation)`

Called when a child node is removed from this component.

```javascript
onMutationChildRemoved(node, mutation) {
  console.log('Child removed:', node);
}
```

## Attribute Handling

### Automatic Attribute Observation

Define setters with the `attr$PropertyName` pattern to automatically observe attributes:

```javascript
class MyComponent extends MythixUIComponent {
  static tagName = 'my-component';

  // Observes the "disabled" attribute
  set attr$disabled([ newValue, oldValue ]) {
    console.log(`disabled: ${oldValue} → ${newValue}`);
    if (newValue !== null) {
      this.classList.add('is-disabled');
    } else {
      this.classList.remove('is-disabled');
    }
  }

  // Observes "data-count" attribute (kebab-case → camelCase)
  set attr$dataCount([ newValue, oldValue ]) {
    const count = parseInt(newValue, 10) || 0;
    this.updateCount(count);
  }

  // Observes "data-mythix-src" for partial loading
  set attr$dataMythixSrc([ value ]) {
    this.loadPartialFromSrc(value);
  }
}
```

### `attr(name, value?)`

Get or set an attribute value with optional coercion.

```javascript
// Get attribute
const id = this.attr('id');
const count = this.attr('data-count'); // Returns coerced value

// Set attribute
this.attr('data-status', 'active');
```

### `getIdentifier()`

Returns a unique identifier for this component instance.

```javascript
const id = this.getIdentifier();
// Returns: id attribute, name attribute, data-name attribute,
// or falls back to camelCase of tag name
```

## DOM Manipulation

### `select(selector)`

Returns a QueryEngine instance for selecting and manipulating elements.

```javascript
// Select by CSS selector
const items = this.select('.item');
items.addClass('selected');

// Select from an array of elements
const elements = [el1, el2, el3];
const qe = this.select(elements);

// Select from NodeList
const nodes = this.shadow.querySelectorAll('button');
const buttons = this.select(nodes);
```

### `$build(callback)`

Build elements using the ElementGenerator API. Returns a QueryEngine that can be appended to the DOM.

```javascript
this.$build(({ DIV, SPAN, BUTTON }) => {
  return DIV.class('container')(
    SPAN.class('label')('Hello'),
    BUTTON.onClick(this.handleClick)('Click Me'),
  );
}).appendTo(this.shadow);
```

### `build(callback, options?)`

Similar to `$build` but returns an ElementDefinition for manual building.

```javascript
const definition = this.build(({ UL, LI }) => {
  return UL.class('list')(
    LI('Item 1'),
    LI('Item 2'),
  );
});

// Build with custom options
const element = definition.build(this.ownerDocument, { scope: this.$$ });
this.shadow.appendChild(element);
```

## Utility Methods

### `debounce(callback, delay, id?)`

Debounce a function call. Useful for rate-limiting events.

```javascript
// Basic debounce (uses function reference as ID)
this.debounce(() => {
  this.performSearch(this.searchQuery);
}, 300);

// Named debounce (allows explicit control)
this.debounce(() => {
  this.saveData();
}, 1000, 'autoSave');

// Cancel by passing null callback
this.debounce(null, 0, 'autoSave');
```

### `defineDynamicProp(name, defaultValue, setter?)`

Define a reactive property on this component.

```javascript
constructor() {
  super();

  // Simple dynamic property
  this.defineDynamicProp('count', 0);

  // With custom setter
  this.defineDynamicProp('items', [], (newValue) => {
    // Transform value before setting
    return Array.isArray(newValue) ? newValue : [newValue];
  });
}

// Usage
this.count = 5; // Triggers template updates
console.log(this.count.valueOf()); // 5
```

### `globalStore(...args)`

Store a value in the global Mythix UI scope.

```javascript
// Store with explicit name
this.globalStore('myComponent', this);

// Store using component identifier
this.globalStore(this);
```

### `globalStoreDynamic(...args)`

Store a value as a dynamic property in the global scope.

```javascript
this.globalStoreDynamic('currentUser', { name: 'John' });
```

## Protected Methods

### `fetchSrc()`

Called when `data-mythix-src` attribute changes. Override to customize partial loading.

```javascript
async fetchSrc() {
  const src = this.getAttribute('data-mythix-src');
  if (src) {
    await ComponentUtils.loadPartialIntoElement.call(this, src);
  }
}
```

## Registration

### `static register()`

Register the component as a custom element.

```javascript
class MyWidget extends MythixUIComponent {
  static tagName = 'my-widget';
  // ...
}

MyWidget.register();
// Equivalent to: customElements.define('my-widget', MyWidget)
```

### Manual Registration

```javascript
customElements.define('my-widget', MyWidget);
```

## Example: Complete Component

```javascript
import { MythixUIComponent } from 'mythix-ui-core';

export class TodoList extends MythixUIComponent {
  static tagName = 'todo-list';

  set attr$title([ newValue ]) {
    this.listTitle = newValue;
  }

  constructor() {
    super();
    this.defineDynamicProp('items', []);
    this.defineDynamicProp('listTitle', 'My Todos');
  }

  mounted() {
    super.mounted();
    this.loadSavedItems();
  }

  unmounted() {
    super.unmounted();
    this.saveItems();
  }

  async loadSavedItems() {
    const saved = localStorage.getItem('todos');
    if (saved) {
      this.items = JSON.parse(saved);
    }
  }

  saveItems() {
    localStorage.setItem('todos', JSON.stringify(this.items.valueOf()));
  }

  addItem(text) {
    const items = this.items.valueOf();
    items.push({ id: Date.now(), text, done: false });
    this.items = [...items]; // Trigger update
  }

  removeItem(id) {
    const items = this.items.valueOf().filter(item => item.id !== id);
    this.items = items;
  }

  toggleItem(id) {
    const items = this.items.valueOf().map(item =>
      item.id === id ? { ...item, done: !item.done } : item
    );
    this.items = items;
  }
}

TodoList.register();
```

```html
<template data-for="todo-list">
  <style>
    :host {
      display: block;
      padding: 1rem;
      border: 1px solid #ddd;
    }
    .done {
      text-decoration: line-through;
      opacity: 0.6;
    }
  </style>
  <h2>@@listTitle@@</h2>
  <mythix-for-each items="@@items@@">
    <div class="@@item.done ? 'done' : ''@@">
      <input type="checkbox"
             onchange="toggleItem(item.id)"
             checked="@@item.done@@">
      @@item.text@@
      <button onclick="removeItem(item.id)">Remove</button>
    </div>
  </mythix-for-each>
</template>
```

## See Also

- [QueryEngine](./query-engine.md) - DOM manipulation
- [DynamicProperty](./dynamic-property.md) - Reactive state
- [Elements](./elements.md) - Programmatic element creation
- [Template Engine](./template-engine.md) - Expression syntax
