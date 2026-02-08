# MythixUIDynamicStyle (`<mythix-dynamic-style>`)

The `<mythix-dynamic-style>` element provides conditional stylesheet injection. It allows you to enable or disable CSS based on application state.

```javascript
import { MythixElements } from 'mythix-ui-core';
const { MythixUIDynamicStyle } = MythixElements;
```

## Basic Usage

### Inline Styles

```html
<mythix-dynamic-style data-enabled="true">
  <style>
    body {
      background-color: #1a1a2e;
      color: #eaeaea;
    }
  </style>
</mythix-dynamic-style>
```

### External Stylesheet

```html
<mythix-dynamic-style data-enabled="true" href="./themes/dark.css">
</mythix-dynamic-style>
```

## Attributes

### `data-enabled`

**Type:** `"true" | "false"`
**Default:** (not set, styles disabled)

Controls whether the styles are active.

```html
<!-- Styles active -->
<mythix-dynamic-style data-enabled="true">...</mythix-dynamic-style>

<!-- Styles inactive -->
<mythix-dynamic-style data-enabled="false">...</mythix-dynamic-style>
```

### `href`

**Type:** `string`

URL to an external CSS file. When set, the styles are loaded from this URL instead of the element's text content.

```html
<mythix-dynamic-style href="./themes/dark.css" data-enabled="true"></mythix-dynamic-style>
```

## Toggling Styles

### Programmatically

```javascript
const style = document.querySelector('mythix-dynamic-style');

// Enable
style.setAttribute('data-enabled', 'true');

// Disable
style.setAttribute('data-enabled', 'false');

// Toggle
const current = style.getAttribute('data-enabled') === 'true';
style.setAttribute('data-enabled', !current);
```

### With Template Binding

```html
<mythix-dynamic-style data-enabled="@@isDarkMode@@">
  <style>
    :root {
      --bg-color: #1a1a2e;
      --text-color: #eaeaea;
    }
  </style>
</mythix-dynamic-style>
```

```javascript
class ThemeController extends MythixUIComponent {
  constructor() {
    super();
    this.defineDynamicProp('isDarkMode', false);
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode.valueOf();
  }
}
```

## Example: Theme Switcher

```html
<template data-for="theme-switcher">
  <style>
    :host {
      display: flex;
      gap: 0.5rem;
    }
    button {
      padding: 0.5rem 1rem;
      border: 2px solid currentColor;
      background: transparent;
      cursor: pointer;
      border-radius: 4px;
    }
    button.active {
      background: currentColor;
      color: white;
    }
  </style>
  <button data-event-onclick="setTheme('light')" class="@@theme === 'light' ? 'active' : ''@@">Light</button>
  <button data-event-onclick="setTheme('dark')" class="@@theme === 'dark' ? 'active' : ''@@">Dark</button>
  <button data-event-onclick="setTheme('system')" class="@@theme === 'system' ? 'active' : ''@@">System</button>
</template>
```

```javascript
class ThemeSwitcher extends MythixUIComponent {
  static tagName = 'theme-switcher';

  constructor() {
    super();
    this.defineDynamicProp('theme', 'system');
  }

  mounted() {
    // Load saved preference
    const saved = localStorage.getItem('theme');
    if (saved) {
      this.theme = saved;
    }

    // Apply theme
    this.applyTheme();

    // Listen for system changes
    this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    this.mediaQuery.addEventListener('change', () => {
      if (this.theme.valueOf() === 'system') {
        this.applyTheme();
      }
    });
  }

  setTheme(theme) {
    this.theme = theme;
    localStorage.setItem('theme', theme);
    this.applyTheme();
  }

  applyTheme() {
    const theme = this.theme.valueOf();
    const isDark = theme === 'dark' ||
      (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

    // Enable/disable dark mode styles
    const darkStyles = document.querySelector('[data-theme="dark"]');
    if (darkStyles) {
      darkStyles.setAttribute('data-enabled', isDark ? 'true' : 'false');
    }
  }
}

ThemeSwitcher.register();
```

Usage:

```html
<!-- Dark theme styles (disabled by default) -->
<mythix-dynamic-style data-theme="dark" data-enabled="false">
  <style>
    :root {
      --bg-color: #1a1a2e;
      --text-color: #eaeaea;
      --border-color: #333;
    }
    body {
      background: var(--bg-color);
      color: var(--text-color);
    }
  </style>
</mythix-dynamic-style>

<theme-switcher></theme-switcher>
```

## Example: Feature Flag Styles

```html
<!-- Styles for beta features -->
<mythix-dynamic-style data-enabled="@@featureFlags.newDesign@@" href="./styles/new-design.css">
</mythix-dynamic-style>

<!-- Styles for A/B test variant -->
<mythix-dynamic-style data-enabled="@@abTestVariant === 'B'@@">
  <style>
    .cta-button {
      background: linear-gradient(45deg, #ff6b6b, #feca57);
      font-size: 1.25rem;
    }
  </style>
</mythix-dynamic-style>
```

## Example: Print Styles

```html
<mythix-dynamic-style data-enabled="@@isPrintPreview@@">
  <style>
    @media print {
      .no-print {
        display: none !important;
      }
      body {
        font-size: 12pt;
      }
    }

    /* Preview styles */
    body {
      max-width: 8.5in;
      margin: 0 auto;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
    }
  </style>
</mythix-dynamic-style>
```

```javascript
class PrintPreview extends MythixUIComponent {
  static tagName = 'print-preview';

  constructor() {
    super();
    this.defineDynamicProp('isPrintPreview', false);
  }

  togglePreview() {
    this.isPrintPreview = !this.isPrintPreview.valueOf();
    document.body.classList.toggle('print-preview-mode', this.isPrintPreview.valueOf());
  }
}
```

## Example: Responsive Design Override

```html
<!-- Force mobile layout for testing -->
<mythix-dynamic-style id="mobile-override" data-enabled="false">
  <style>
    :root {
      --container-width: 375px !important;
    }
    .desktop-only {
      display: none !important;
    }
    .mobile-only {
      display: block !important;
    }
  </style>
</mythix-dynamic-style>

<button onclick="toggleMobileView()">Toggle Mobile View</button>

<script>
function toggleMobileView() {
  const style = document.getElementById('mobile-override');
  const isEnabled = style.getAttribute('data-enabled') === 'true';
  style.setAttribute('data-enabled', !isEnabled);
}
</script>
```

## Loading External Stylesheets

When using `href`, the stylesheet is fetched asynchronously:

```html
<mythix-dynamic-style href="./themes/seasonal/winter.css" data-enabled="true">
</mythix-dynamic-style>
```

The styles are applied after the CSS file loads. There may be a brief flash of unstyled content (FOUC) if the page renders before the styles load.

### Error Handling

If the external stylesheet fails to load, an error is logged:

```
mythix-dynamic-style: Error while attempting to load style "./missing.css": [error details]
```

## Notes

- The `<style>` element is created and injected into the light DOM of the component
- When disabled, the style element is removed from the DOM
- When re-enabled, the style element is re-added
- External stylesheets are fetched using the component's `require` system
- The component does not use Shadow DOM

## See Also

- [MythixUIComponent](../mythix-ui-component.md) - Base component class
- [DynamicProperty](../dynamic-property.md) - Reactive state for `data-enabled`
- [Template Engine](../template-engine.md) - Expression binding for attributes
