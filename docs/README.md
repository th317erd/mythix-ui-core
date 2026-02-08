# mythix-ui-core Documentation

A different take on web development - a lightweight, native Web Components framework designed for building dynamic, real-time applications.

## Table of Contents

- [Getting Started](./getting-started.md)
- [Core Concepts](#core-concepts)
- [API Reference](#api-reference)
- [Built-in Components](#built-in-components)

## Overview

mythix-ui-core is an HTML-native Web Components framework that assists developers in creating Web Components by inheriting from a `MythixUIComponent` base class. The framework is designed with a "stay out of the way" philosophy, providing useful functionality while keeping boilerplate to a minimum.

### Key Features

- **Native Web Components** - Built on the standard Web Components API
- **Reactive Data System** - Proxy-based DynamicProperty system for automatic UI updates
- **jQuery-like QueryEngine** - Familiar DOM manipulation with modern chaining syntax
- **Template Engine** - Simple `@@expression@@` syntax for dynamic content
- **i18n Support** - Built-in internationalization with real-time language switching
- **CDN-First Design** - Versioned imports for dependency management
- **Shadow DOM Management** - Automatic Shadow DOM handling with style injection

## Installation

```bash
npm install mythix-ui-core
```

Or use directly from a CDN:

```html
<script type="module">
  import { MythixUIComponent } from '@cdn/mythix-ui-core@1';
</script>
```

## Quick Start

```javascript
import { MythixUIComponent } from 'mythix-ui-core';

class MyCounter extends MythixUIComponent {
  static tagName = 'my-counter';

  constructor() {
    super();
    this.defineDynamicProp('count', 0);
  }

  mounted() {
    // Called when component is added to the DOM
  }

  increment() {
    this.count = this.count.valueOf() + 1;
  }
}

MyCounter.register();
```

```html
<template data-for="my-counter">
  <style>
    :host { display: block; }
    button { padding: 0.5em 1em; }
  </style>
  <p>Count: @@count@@</p>
  <button onclick="increment">Increment</button>
</template>

<my-counter></my-counter>
```

## Core Concepts

### [MythixUIComponent](./mythix-ui-component.md)

The base class for all Mythix UI components. Extends `HTMLElement` and provides:
- Shadow DOM management
- Template handling
- Attribute observation via `attr$PropertyName` pattern
- Lifecycle hooks (`mounted`, `unmounted`, `attributeChanged`, `adopted`)
- Automatic method binding

### [QueryEngine](./query-engine.md)

A jQuery-inspired DOM manipulation API using Proxies for method chaining:

```javascript
this.select('.items')
  .addClass('active')
  .on('click', this.handleClick)
  .appendTo(this.shadow);
```

### [DynamicProperty](./dynamic-property.md)

Reactive state management through Proxy-wrapped values with event-based updates:

```javascript
import { DynamicProperty } from 'mythix-ui-core';

let counter = new DynamicProperty(0);
counter.addEventListener('update', (event) => {
  console.log(`Changed from ${event.oldValue} to ${event.value}`);
});

counter[DynamicProperty.set](1); // Triggers update event
```

### [Template Engine](./template-engine.md)

The `@@expression@@` syntax allows dynamic content binding:

```html
<p>Hello, @@userName@@!</p>
<span class="@@isActive ? 'active' : 'inactive'@@">Status</span>
```

### [Elements & ElementGenerator](./elements.md)

Programmatic element creation with a fluent builder API:

```javascript
this.build(({ DIV, SPAN, BUTTON }) => {
  return DIV.class('container')(
    SPAN.class('label')('Click me:'),
    BUTTON.onClick(this.handleClick)('Submit'),
  );
});
```

## API Reference

### Namespaces

| Namespace | Description |
|-----------|-------------|
| [BaseUtils](./base-utils.md) | Type checking, ID generation, case conversion utilities |
| [Utils](./utils.md) | Scope creation, template parsing, metadata storage |
| [ComponentUtils](./component-utils.md) | Resource loading, visibility observation, URL resolution |
| [Elements](./elements.md) | Element creation, template processing |

### Classes

| Class | Description |
|-------|-------------|
| [MythixUIComponent](./mythix-ui-component.md) | Base class for all components |
| [QueryEngine](./query-engine.md) | DOM manipulation engine |
| [DynamicProperty](./dynamic-property.md) | Reactive value wrapper |
| [ElementDefinition](./elements.md#elementdefinition) | Element structure definition |

## Built-in Components

| Component | Tag Name | Description |
|-----------|----------|-------------|
| [MythixUIRequire](./components/mythix-require.md) | `<mythix-require>` | Dynamic resource loading |
| [MythixUILanguageProvider](./components/mythix-language-provider.md) | `<mythix-language-provider>` | i18n container |
| [MythixUILanguagePack](./components/mythix-language-provider.md#mythix-language-pack) | `<mythix-language-pack>` | Language data source |
| [MythixUISpinner](./components/mythix-spinner.md) | `<mythix-spinner>` | Loading indicator |
| [MythixUIDynamicStyle](./components/mythix-dynamic-style.md) | `<mythix-dynamic-style>` | Conditional styles |

## Architecture

```
mythix-ui-core/
├── lib/
│   ├── index.js              # Entry point, global setup
│   ├── mythix-ui-component.js # MythixUIComponent base class
│   ├── query-engine.js       # QueryEngine
│   ├── dynamic-property.js   # DynamicProperty
│   ├── elements.js           # ElementDefinition, ElementGenerator
│   ├── utils.js              # Utils namespace
│   ├── base-utils.js         # BaseUtils namespace
│   ├── component-utils.js    # ComponentUtils namespace
│   ├── constants.js          # Symbol constants
│   ├── sha256.js             # SHA256 hashing
│   ├── mythix-ui-require.js  # <mythix-require> component
│   ├── mythix-ui-language-provider.js # i18n components
│   ├── mythix-ui-spinner.js  # <mythix-spinner> component
│   └── mythix-ui-dynamic-style.js # <mythix-dynamic-style> component
└── dist/
    └── index.js              # Bundled distribution
```

## Browser Support

mythix-ui-core requires browser support for:
- Web Components (Custom Elements, Shadow DOM)
- ES6+ features (Proxy, Symbol, Classes, Arrow Functions)
- MutationObserver
- IntersectionObserver (for lazy loading features)

## License

MIT License - see [LICENSE](../LICENSE) for details.
