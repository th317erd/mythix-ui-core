# ComponentUtils

The `ComponentUtils` namespace provides utilities for component identification, resource loading, visibility observation, and DOM manipulation at the component level.

```javascript
import { ComponentUtils } from 'mythix-ui-core';
```

## Component Identification

### `getIdentifier(target)`

Get a unique identifier for an element or component.

```javascript
ComponentUtils.getIdentifier(element);
// Returns: id attribute, name attribute, data-name attribute,
// or camelCase of tag name
```

**Resolution order:**
1. Element's `getIdentifier()` method (if exists)
2. `id` attribute
3. `name` attribute
4. `data-name` attribute
5. camelCase conversion of `localName`

## URL Resolution

### `resolveURL(rootLocation, urlish)`

Resolve a URL relative to a root location.

```javascript
const url = ComponentUtils.resolveURL.call(
  this,
  document.location,
  './components/widget.html'
);
// Returns: URL object with resolved path
```

**Features:**
- Handles relative paths
- Handles absolute paths
- Supports URL objects
- Calls `globalThis.mythixUI.urlResolver` if defined

## Resource Loading

### `require(urlOrName, options?)`

Fetch a resource with caching support.

```javascript
const { url, response, ownerDocument, cached } = await ComponentUtils.require.call(
  this,
  './component.html',
  { ownerDocument: document }
);

const html = await response.text();
```

**Options:**
- `ownerDocument` - Document for URL resolution
- `magic` - Enable magic URL resolution
- `fetchOptions` - Options passed to `fetch()`

**Cache control via URL params:**
- `?cache=no-store` - Skip cache
- `?cache=reload` - Skip cache
- `?cache=no-cache` - Skip cache
- `?cache=false` - Skip cache
- `?cacheParams=true` - Include query params in cache key

### `importIntoDocumentFromSource(ownerDocument, location, url, sourceString, options?)`

Import HTML source into a document, distributing elements appropriately.

```javascript
const context = ComponentUtils.importIntoDocumentFromSource.call(
  this,
  document,
  document.location,
  new URL('./component.html', document.location),
  htmlString,
  {
    magic: true,
    nodeHandler: (node, context) => {
      // Handle each node
    },
    preProcess: (context) => {
      // Modify template before processing
      return context.template;
    },
    postProcess: (context) => {
      // Modify template after processing
      return context.template;
    },
  }
);
```

**Element distribution:**
| Element | Destination |
|---------|-------------|
| `<script>` | `<head>` |
| `<style>`, `<link>`, `<meta>` | `<head>` |
| `<template>` | `<body>` (end) |
| `<base>`, `<noscript>`, `<title>` | Ignored |
| Others | Passed to `nodeHandler` |

**Context object:**
```javascript
{
  guessedElementName,  // Derived from filename
  children,            // Parsed elements
  ownerDocument,
  template,            // Template element
  url,                 // Resolved URL
  baseURL,             // Base for relative URLs
  fileName,
  templateCount,       // Number of templates
}
```

### `loadPartialIntoElement(src, options?)`

Load an HTML partial into an element.

```javascript
await ComponentUtils.loadPartialIntoElement.call(
  this,
  './partials/header.html',
  { scope: this.$$ }
);
```

The element's children are replaced with the loaded content.

### `insertScriptIntoHead(url, options?)`

Insert a script element into the document head.

```javascript
const script = ComponentUtils.insertScriptIntoHead.call(
  this,
  './scripts/helpers.js',
  {
    ownerDocument: document,
    attributes: {
      'data-module': 'helpers',
      type: 'module',
    },
  }
);
```

## Visibility Observation

### `visibilityObserver(callback, options?)`

Create an IntersectionObserver for visibility tracking.

```javascript
const observer = ComponentUtils.visibilityObserver(
  ({ entry, element, visibility, wasVisible, disconnect }) => {
    if (visibility && !wasVisible) {
      console.log('Element became visible for the first time');
      // Optionally stop observing
      disconnect();
    }
  },
  {
    elements: [element1, element2],
    threshold: 0.1,
    root: null,
  }
);

// Later, clean up
observer.disconnect();
```

**Callback data:**
- `entry` - IntersectionObserverEntry
- `element` - The observed element
- `visibility` - Currently visible (boolean)
- `wasVisible` - Was ever visible (boolean)
- `ratioVisible` - Maximum intersection ratio seen
- `previousVisibility` - Previous visibility state
- `disconnect` - Function to stop observing this element

### `getVisibilityMeta(element, observer)`

Get visibility metadata for an observed element.

```javascript
const meta = ComponentUtils.getVisibilityMeta(element, observer);
// Returns: { wasVisible, ratioVisible, visibility, previousVisibility }
```

## Tab Index Management

### `getLargestDocumentTabIndex(ownerDocument?)`

Find the largest tabindex value in the document.

```javascript
const maxTabIndex = ComponentUtils.getLargestDocumentTabIndex(document);
// Returns: highest tabindex value, or 0 if none found
```

## Example: Lazy Loading Component

```javascript
import { MythixUIComponent, ComponentUtils, Utils } from 'mythix-ui-core';

class LazyContent extends MythixUIComponent {
  static tagName = 'lazy-content';

  set attr$src([ value ]) {
    this.contentSrc = value;
  }

  constructor() {
    super();
    this.defineDynamicProp('contentSrc', '');
    this.defineDynamicProp('isLoaded', false);
    this.defineDynamicProp('isLoading', false);
  }

  mounted() {
    super.mounted();

    // Observe visibility
    this.observer = ComponentUtils.visibilityObserver(
      ({ visibility, wasVisible, disconnect }) => {
        if (visibility && !wasVisible) {
          this.loadContent();
          disconnect();
        }
      },
      { elements: [this] }
    );
  }

  unmounted() {
    super.unmounted();
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  async loadContent() {
    const src = this.contentSrc.valueOf();
    if (!src || this.isLoaded.valueOf()) return;

    this.isLoading = true;

    try {
      await ComponentUtils.loadPartialIntoElement.call(
        this,
        src,
        { scope: this.$$ }
      );
      this.isLoaded = true;
    } catch (error) {
      console.error('Failed to load content:', error);
    } finally {
      this.isLoading = false;
    }
  }
}

LazyContent.register();
```

## Example: Dynamic Script Loader

```javascript
import { ComponentUtils } from 'mythix-ui-core';

async function loadExternalLibrary(url) {
  return new Promise((resolve, reject) => {
    const script = ComponentUtils.insertScriptIntoHead.call(
      null,
      url,
      {
        ownerDocument: document,
        attributes: {
          async: 'true',
        },
      }
    );

    script.onload = resolve;
    script.onerror = reject;
  });
}

// Usage
await loadExternalLibrary('https://cdn.example.com/library.js');
```

## Example: Resource Prefetching

```javascript
import { ComponentUtils } from 'mythix-ui-core';

class ResourcePrefetcher extends MythixUIComponent {
  static tagName = 'resource-prefetcher';

  mounted() {
    super.mounted();

    // Prefetch resources when this element becomes visible
    ComponentUtils.visibilityObserver(
      ({ visibility, disconnect }) => {
        if (visibility) {
          this.prefetchResources();
          disconnect();
        }
      },
      { elements: [this], threshold: 0 }
    );
  }

  async prefetchResources() {
    const resources = this.getAttribute('resources')?.split(',') || [];

    await Promise.allSettled(
      resources.map(async (src) => {
        try {
          await ComponentUtils.require.call(this, src.trim(), {
            ownerDocument: this.ownerDocument,
          });
        } catch (e) {
          console.warn(`Failed to prefetch: ${src}`, e);
        }
      })
    );
  }
}

ResourcePrefetcher.register();
```

Usage:

```html
<resource-prefetcher
  resources="./components/modal.html, ./components/dropdown.html"
></resource-prefetcher>
```

## See Also

- [MythixUIRequire](./components/mythix-require.md) - Resource loading component
- [Utils](./utils.md) - General utilities
- [MythixUIComponent](./mythix-ui-component.md) - Base component class
