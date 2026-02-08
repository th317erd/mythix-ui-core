# MythixUIRequire (`<mythix-require>`)

The `<mythix-require>` element dynamically loads external resources (HTML components, JavaScript modules) at runtime. It's inspired by Node.js's `require()` function and enables lazy-loading of components.

```javascript
import { MythixElements } from 'mythix-ui-core';
const { MythixUIRequire } = MythixElements;
```

## Basic Usage

### Loading HTML Components

```html
<!-- Load a component's HTML file -->
<mythix-require src="./components/modal/modal.html"></mythix-require>

<!-- Load from CDN -->
<mythix-require src="@cdn/mythix-ui-modal@1/dist/mythix-ui-modal.html"></mythix-require>
```

### Loading JavaScript Modules

```html
<mythix-require src="./utils/helpers.js"></mythix-require>
```

## Attributes

### `src`

**Type:** `string`

The URL of the resource to load. Can be:
- Relative path: `./components/widget.html`
- Absolute path: `/assets/components/widget.html`
- CDN path: `@cdn/package-name@version/path/to/file`
- External URL: `https://example.com/component.html`

## How It Works

### HTML Files

When loading an `.html` file:

1. The HTML is fetched and parsed
2. Elements are distributed based on their type:

| Element Type | Destination |
|--------------|-------------|
| `<script>` | Appended to `<head>` with resolved `src` |
| `<style>` | Appended to `<head>` |
| `<link>` | Appended to `<head>` |
| `<meta>` | Ignored |
| `<template>` | Appended to `<body>` bottom |
| `<base>`, `<noscript>`, `<title>` | Ignored |
| All others | Appended to `<body>` |

3. Duplicate elements are prevented via ID checks
4. URLs in nested elements are resolved relative to the loaded file

### JavaScript Files

When loading a `.js` file:
1. A `<script>` element is created with `type="module"`
2. The script is appended to `<head>`
3. Duplicate scripts are prevented via ID checks

## URL Resolution

### The URL Resolver

A global URL resolver can intercept and modify URLs:

```javascript
globalThis.mythixUI.urlResolver = function({ src, url, path, fileName }) {
  // Return modified URL, or false to cancel the load
  if (src.startsWith('@cdn/')) {
    return `https://cdn.example.com/${src.slice(5)}`;
  }
  return url;
};
```

**Parameters:**
- `src` - Original source string
- `url` - Parsed URL object
- `path` - Directory path portion
- `fileName` - File name portion

**Return:**
- `string | URL` - Modified URL
- `false` - Cancel the load

### CDN Pattern

The `@cdn/` prefix is commonly used for CDN resolution:

```html
<!-- Before URL resolution -->
<mythix-require src="@cdn/mythix-ui-modal@1/dist/mythix-ui-modal.html">

<!-- After resolution (example) -->
<!-- https://unpkg.com/mythix-ui-modal@1/dist/mythix-ui-modal.html -->
```

## Template Star Pattern

For multi-component files, use the star template pattern to share common content:

```html
<!-- my-components.html -->

<!-- Star template - content shared by all other templates -->
<template data-for="*">
  <style>
    /* Shared styles */
    :host { display: block; }
  </style>
</template>

<!-- Component 1 - receives star template content appended -->
<template data-for="my-button">
  <button><slot></slot></button>
</template>

<!-- Component 2 - receives star template content appended -->
<template data-for="my-input">
  <input type="text">
</template>
```

Star template variants:
- `data-for="*"` - Append to other templates
- `data-for="|*"` - Prepend to other templates
- `data-for="*|"` - Append to other templates (same as `*`)

## Caching

Resources are cached by default. To control caching:

```html
<!-- Disable caching -->
<mythix-require src="./component.html?cache=no-store"></mythix-require>
<mythix-require src="./component.html?cache=reload"></mythix-require>
<mythix-require src="./component.html?cache=no-cache"></mythix-require>
<mythix-require src="./component.html?cache=false"></mythix-require>

<!-- Include query params in cache key -->
<mythix-require src="./component.html?v=2&cacheParams=true"></mythix-require>
```

## Custom Handlers

Register custom handlers for different file types:

```javascript
MythixUIRequire.registerHandler(/\.json$/i, async function({ url, ownerDocument }) {
  const response = await fetch(url);
  const data = await response.json();

  // Process JSON data
  globalThis.mythixUI.globalScope.configData = data;

  return true; // Indicate handling complete
});
```

**Handler Signature:**
```javascript
async function handler({ src, url, index, ownerDocument }) {
  // Return true to stop processing further handlers
  return true;
}
```

Handlers are checked in reverse registration order (last registered = first checked).

## Error Handling

Errors are caught and logged:

```html
<mythix-require src="./nonexistent.html"></mythix-require>
<!-- Console: "mythix-require": Failed to load specified resource: ./nonexistent.html -->
```

## Component File Structure

A typical Mythix component file:

```html
<!-- my-widget.html -->

<!-- Template for the component -->
<template data-for="my-widget">
  <style>
    :host {
      display: block;
      padding: 1rem;
    }
  </style>
  <div class="widget">
    <slot></slot>
  </div>
</template>

<!-- JavaScript for the component -->
<script type="module">
  import { MythixUIComponent } from '@cdn/mythix-ui-core@1';

  class MyWidget extends MythixUIComponent {
    static tagName = 'my-widget';

    mounted() {
      console.log('Widget mounted');
    }
  }

  MyWidget.register();
</script>

<!-- Optional: Language pack for i18n -->
<mythix-language-pack lang="en" src="./my-widget.en.json"></mythix-language-pack>
```

## Example: Lazy Loading

```html
<!DOCTYPE html>
<html>
<head>
  <script type="module" src="@cdn/mythix-ui-core@1"></script>
</head>
<body>
  <!-- Load modal component only when needed -->
  <button id="open-modal">Open Modal</button>

  <script type="module">
    document.getElementById('open-modal').addEventListener('click', async () => {
      // Dynamically inject the require element
      const req = document.createElement('mythix-require');
      req.setAttribute('src', '@cdn/mythix-ui-modal@1/dist/mythix-ui-modal.html');
      document.body.appendChild(req);

      // Wait for component to be defined
      await customElements.whenDefined('mythix-modal');

      // Now use the component
      const modal = document.createElement('mythix-modal');
      modal.innerHTML = '<p>Modal Content</p>';
      document.body.appendChild(modal);
      modal.open();
    });
  </script>
</body>
</html>
```

## Example: Multi-Component Package

```html
<!-- ui-kit.html - A package of related components -->

<!-- Shared styles -->
<template data-for="*">
  <style>
    :host {
      font-family: system-ui, sans-serif;
      box-sizing: border-box;
    }
  </style>
</template>

<!-- Button component -->
<template data-for="ui-button">
  <style>
    button {
      padding: 0.5em 1em;
      border-radius: 4px;
      border: none;
      cursor: pointer;
    }
  </style>
  <button><slot></slot></button>
</template>

<!-- Input component -->
<template data-for="ui-input">
  <style>
    input {
      padding: 0.5em;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
  </style>
  <input type="text">
</template>

<!-- Card component -->
<template data-for="ui-card">
  <style>
    .card {
      padding: 1rem;
      border: 1px solid #ddd;
      border-radius: 8px;
    }
  </style>
  <div class="card">
    <slot></slot>
  </div>
</template>

<script type="module">
  import { MythixUIComponent } from '@cdn/mythix-ui-core@1';

  class UIButton extends MythixUIComponent {
    static tagName = 'ui-button';
  }

  class UIInput extends MythixUIComponent {
    static tagName = 'ui-input';
  }

  class UICard extends MythixUIComponent {
    static tagName = 'ui-card';
  }

  UIButton.register();
  UIInput.register();
  UICard.register();
</script>
```

Usage:

```html
<mythix-require src="./ui-kit.html"></mythix-require>

<ui-card>
  <ui-input></ui-input>
  <ui-button>Submit</ui-button>
</ui-card>
```

## See Also

- [ComponentUtils](../component-utils.md) - `require()` and `importIntoDocumentFromSource()`
- [MythixUILanguageProvider](./mythix-language-provider.md) - i18n integration
