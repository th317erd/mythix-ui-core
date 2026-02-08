# Getting Started with mythix-ui-core

This guide walks you through creating your first Mythix UI component and understanding the core concepts of the framework.

## Prerequisites

- Modern browser with Web Components support
- Basic understanding of JavaScript ES6+ and HTML Custom Elements
- Node.js (for npm installation) or a CDN setup

## Installation

### Via npm

```bash
npm install mythix-ui-core
```

### Via CDN

Use an import map in your HTML to set up CDN imports:

```html
<script type="importmap">
{
  "imports": {
    "@cdn/mythix-ui-core@1": "https://your-cdn.com/mythix-ui-core@1.0.11/lib/index.js"
  }
}
</script>
```

## Your First Component

Let's create a simple greeting component that demonstrates the key features of mythix-ui-core.

### Step 1: Create the Component Class

```javascript
// greeting-component.js
import { MythixUIComponent } from 'mythix-ui-core';

export class GreetingComponent extends MythixUIComponent {
  static tagName = 'greeting-component';

  // Automatically observe the 'name' attribute
  set attr$name([ newValue, oldValue ]) {
    console.log(`Name changed from "${oldValue}" to "${newValue}"`);
  }

  mounted() {
    // Called when the component is added to the DOM
    console.log('Greeting component mounted!');
  }

  unmounted() {
    // Called when the component is removed from the DOM
    console.log('Greeting component unmounted!');
  }
}

// Register the custom element
GreetingComponent.register();
```

### Step 2: Create the Template

Templates are standard HTML `<template>` elements linked to components via the `data-for` attribute:

```html
<template data-for="greeting-component">
  <style>
    :host {
      display: block;
      padding: 1rem;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    .greeting {
      font-size: 1.25rem;
      color: #333;
    }
  </style>
  <p class="greeting">Hello, @@name@@!</p>
</template>
```

### Step 3: Use the Component

```html
<!DOCTYPE html>
<html>
<head>
  <script type="module" src="./greeting-component.js"></script>
</head>
<body>
  <!-- Define the template -->
  <template data-for="greeting-component">
    <style>
      :host { display: block; padding: 1rem; }
      .greeting { font-size: 1.25rem; }
    </style>
    <p class="greeting">Hello, @@name@@!</p>
  </template>

  <!-- Use the component -->
  <greeting-component name="World"></greeting-component>
</body>
</html>
```

## Understanding the Template Engine

The template engine uses `@@expression@@` syntax for dynamic content:

### Simple Property Access

```html
<p>@@propertyName@@</p>
```

### JavaScript Expressions

```html
<span>@@count * 2@@</span>
<div class="@@isActive ? 'active' : 'inactive'@@"></div>
```

### Accessing Component Methods

```html
<button onclick="handleClick">Click Me</button>
<button onclick="this.handleClick(event)">Click Me</button>
```

### i18n Lookups

```html
<p>@@i18n('buttons.submit', 'Submit')@@</p>
```

## Adding Interactivity with DynamicProperty

DynamicProperty provides reactive state that automatically updates the UI:

```javascript
import { MythixUIComponent } from 'mythix-ui-core';

export class CounterComponent extends MythixUIComponent {
  static tagName = 'counter-component';

  constructor() {
    super();
    // Define a dynamic property with initial value 0
    this.defineDynamicProp('count', 0);
  }

  increment() {
    // Update the value - UI updates automatically
    this.count = this.count.valueOf() + 1;
  }

  decrement() {
    this.count = this.count.valueOf() - 1;
  }
}

CounterComponent.register();
```

```html
<template data-for="counter-component">
  <style>
    :host { display: flex; align-items: center; gap: 1rem; }
    button { padding: 0.5rem 1rem; }
    .count { font-size: 1.5rem; min-width: 3rem; text-align: center; }
  </style>
  <button onclick="decrement">-</button>
  <span class="count">@@count@@</span>
  <button onclick="increment">+</button>
</template>

<counter-component></counter-component>
```

## Building Elements Programmatically

Use the `build()` method for dynamic element creation:

```javascript
import { MythixUIComponent } from 'mythix-ui-core';

export class DynamicListComponent extends MythixUIComponent {
  static tagName = 'dynamic-list';

  mounted() {
    const items = ['Apple', 'Banana', 'Cherry'];

    const listElement = this.build(({ UL, LI }) => {
      return UL.class('fruit-list')(
        ...items.map((item, index) =>
          LI.class('fruit-item').dataIndex(index)(item)
        )
      );
    });

    // Build and append to shadow DOM
    this.shadow.appendChild(
      listElement.build(this.ownerDocument, { scope: this.$$ })
    );
  }
}

DynamicListComponent.register();
```

## Using QueryEngine for DOM Manipulation

The QueryEngine provides jQuery-like syntax:

```javascript
// Select and manipulate elements
this.select('.items')
  .addClass('highlighted')
  .removeClass('hidden')
  .on('click', this.handleClick);

// Build and insert elements
this.$build(({ DIV }) => DIV.class('new-element')('Content'))
  .appendTo(this.shadow);

// Remove elements
this.select('.obsolete').remove();
```

## Loading External Resources

Use `<mythix-require>` for dynamic component loading:

```html
<!-- Load another component's HTML file -->
<mythix-require src="./components/modal/modal.html"></mythix-require>

<!-- Load a JavaScript module -->
<mythix-require src="./utils/helpers.js"></mythix-require>
```

## Internationalization (i18n)

Set up language support with the language provider:

```html
<mythix-language-provider lang="en">
  <mythix-language-pack lang="en" src="./lang/en.json"></mythix-language-pack>
  <mythix-language-pack lang="es" src="./lang/es.json"></mythix-language-pack>

  <!-- Your app content -->
  <p>@@i18n('greeting.hello', 'Hello')@@</p>
</mythix-language-provider>
```

Language JSON format:

```json
{
  "greeting": {
    "hello": "Hello",
    "goodbye": "Goodbye"
  },
  "buttons": {
    "submit": "Submit",
    "cancel": "Cancel"
  }
}
```

Change language dynamically:

```javascript
document.querySelector('mythix-language-provider').setAttribute('lang', 'es');
```

## Component Lifecycle

```
constructor()
    │
    ▼
createShadowDOM() → attachShadow()
    │
    ▼
getComponentTemplate() → finds <template data-for="...">
    │
    ▼
connectedCallback() [Web Components standard]
    │
    ├─► appendTemplateToShadowDOM()
    ├─► processElements(this)
    ├─► mounted() ◄── Override this for initialization
    └─► appendExternalToShadowDOM()
    │
    ▼
[Component is live and reactive]
    │
    ▼
disconnectedCallback() [Web Components standard]
    │
    └─► unmounted() ◄── Override this for cleanup
```

## Next Steps

- Read the [MythixUIComponent](./mythix-ui-component.md) documentation for all available methods
- Explore the [QueryEngine](./query-engine.md) for DOM manipulation
- Understand [DynamicProperty](./dynamic-property.md) for reactive state
- Check out the [Template Engine](./template-engine.md) for expression syntax
- Review [Built-in Components](./README.md#built-in-components) for ready-to-use elements
