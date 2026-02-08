# MythixUISpinner (`<mythix-spinner>`)

The `<mythix-spinner>` element provides animated loading indicators with multiple visual styles. It's a simple, customizable component for showing loading states.

```javascript
import { MythixElements } from 'mythix-ui-core';
const { MythixUISpinner } = MythixElements;
```

## Basic Usage

```html
<mythix-spinner></mythix-spinner>
<mythix-spinner kind="circle"></mythix-spinner>
<mythix-spinner kind="wave" class="large"></mythix-spinner>
```

## Attributes

### `kind`

**Type:** `string`
**Default:** `"pipe"`

The style of spinner animation.

| Kind | Description |
|------|-------------|
| `pipe` | Vertical bars that scale (default) |
| `audio` | Audio equalizer-style bars |
| `circle` | Concentric rotating circles |
| `puzzle` | Moving puzzle pieces |
| `wave` | Bouncing dots in a wave |
| `dot` | Pulsing/fading concentric dots |

```html
<mythix-spinner kind="audio"></mythix-spinner>
<mythix-spinner kind="circle"></mythix-spinner>
<mythix-spinner kind="puzzle"></mythix-spinner>
<mythix-spinner kind="wave"></mythix-spinner>
<mythix-spinner kind="dot"></mythix-spinner>
<mythix-spinner kind="pipe"></mythix-spinner>
```

## Size Classes

Use CSS classes to control size:

```html
<mythix-spinner class="small"></mythix-spinner>  <!-- 0.75em -->
<mythix-spinner></mythix-spinner>                <!-- 1em (default) -->
<mythix-spinner class="medium"></mythix-spinner> <!-- 1.5em -->
<mythix-spinner class="large"></mythix-spinner>  <!-- 3em -->
```

## Styling

### CSS Custom Properties

| Property | Description | Default |
|----------|-------------|---------|
| `--mythix-spinner-size` | Overall size | `1em` |
| `--theme-animation-duration` | Animation speed | `1000ms` |
| `--theme-primary-color` | Fallback color | `#333` |
| `--theme-mythix-spinner-color1` | First segment color | Primary color |
| `--theme-mythix-spinner-color2` | Second segment color | Primary color |
| `--theme-mythix-spinner-color3` | Third segment color | Primary color |
| `--theme-mythix-spinner-color4` | Fourth segment color | Primary color |
| `--theme-mythix-spinner-color5` | Fifth segment color | Primary color |

### Custom Colors

```css
mythix-spinner {
  --theme-mythix-spinner-color1: #ff6b6b;
  --theme-mythix-spinner-color2: #feca57;
  --theme-mythix-spinner-color3: #48dbfb;
  --theme-mythix-spinner-color4: #ff9ff3;
  --theme-mythix-spinner-color5: #54a0ff;
}
```

### Custom Size

```css
mythix-spinner.custom {
  --mythix-spinner-size: 2rem;
}
```

### Animation Speed

```css
mythix-spinner.slow {
  --theme-animation-duration: 2000ms;
}

mythix-spinner.fast {
  --theme-animation-duration: 500ms;
}
```

## Example: Loading Button

```html
<template data-for="loading-button">
  <style>
    :host {
      display: inline-block;
    }
    button {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      cursor: pointer;
    }
    button:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
    mythix-spinner {
      --mythix-spinner-size: 1em;
      --theme-mythix-spinner-color1: currentColor;
      --theme-mythix-spinner-color2: currentColor;
      --theme-mythix-spinner-color3: currentColor;
    }
  </style>
  <button disabled="@@isLoading@@">
    <mythix-spinner kind="wave" style="display: @@isLoading ? 'flex' : 'none'@@"></mythix-spinner>
    <slot></slot>
  </button>
</template>
```

```javascript
class LoadingButton extends MythixUIComponent {
  static tagName = 'loading-button';

  constructor() {
    super();
    this.defineDynamicProp('isLoading', false);
  }

  startLoading() {
    this.isLoading = true;
  }

  stopLoading() {
    this.isLoading = false;
  }
}

LoadingButton.register();
```

Usage:

```html
<loading-button data-event-onclick="handleSubmit">Submit</loading-button>

<script>
async function handleSubmit(event) {
  const button = event.target.closest('loading-button');
  button.startLoading();

  try {
    await submitForm();
  } finally {
    button.stopLoading();
  }
}
</script>
```

## Example: Page Loading Overlay

```html
<style>
  .loading-overlay {
    position: fixed;
    inset: 0;
    background: rgba(255, 255, 255, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 1rem;
    z-index: 9999;
  }
  .loading-overlay mythix-spinner {
    --mythix-spinner-size: 4rem;
    --theme-mythix-spinner-color1: #007bff;
    --theme-mythix-spinner-color2: #28a745;
    --theme-mythix-spinner-color3: #dc3545;
  }
  .loading-overlay.hidden {
    display: none;
  }
</style>

<div class="loading-overlay" id="page-loader">
  <mythix-spinner kind="circle"></mythix-spinner>
  <p>Loading...</p>
</div>

<script>
  // Hide when page is ready
  window.addEventListener('load', () => {
    document.getElementById('page-loader').classList.add('hidden');
  });
</script>
```

## Example: Skeleton Loading

```html
<template data-for="content-loader">
  <style>
    :host {
      display: block;
    }
    .skeleton {
      background: #f0f0f0;
      border-radius: 4px;
      animation: pulse 1.5s infinite;
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
    .content-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 200px;
    }
    mythix-spinner {
      --mythix-spinner-size: 3rem;
    }
  </style>

  <div style="display: @@isLoading ? 'block' : 'none'@@">
    <div class="content-wrapper">
      <mythix-spinner kind="@@spinnerKind@@"></mythix-spinner>
    </div>
  </div>

  <div style="display: @@isLoading ? 'none' : 'block'@@">
    <slot></slot>
  </div>
</template>
```

```javascript
class ContentLoader extends MythixUIComponent {
  static tagName = 'content-loader';

  set attr$loading([ value ]) {
    this.isLoading = value !== null && value !== 'false';
  }

  set attr$spinnerKind([ value ]) {
    this.spinnerKind = value || 'circle';
  }

  constructor() {
    super();
    this.defineDynamicProp('isLoading', true);
    this.defineDynamicProp('spinnerKind', 'circle');
  }
}

ContentLoader.register();
```

Usage:

```html
<content-loader loading="true" spinner-kind="wave">
  <p>This content appears when loading is complete.</p>
</content-loader>

<script>
  // Simulate loading
  setTimeout(() => {
    document.querySelector('content-loader').setAttribute('loading', 'false');
  }, 2000);
</script>
```

## Spinner Kind Previews

### `pipe` (default)
Vertical bars that pulse in height.

### `audio`
Audio equalizer-style vertical bars with random-looking height animation.

### `circle`
Three concentric circles rotating at different speeds.

### `puzzle`
Three squares that rotate around a 2x2 grid pattern.

### `wave`
Three dots that bounce up and down in a wave pattern.

### `dot`
Two concentric dots that pulse and fade.

## See Also

- [MythixUIComponent](../mythix-ui-component.md) - Base component class
- [Template Engine](../template-engine.md) - Conditional rendering
