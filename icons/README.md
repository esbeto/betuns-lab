# Icons

This Vite Plugin is inspired by Astro and other tools that generate SVG sprites.

## Installation

The only required dependency is used to optimize your SVGs. Install `svgo`:

```bash
npm install -D svgo
```

Place the [./icons.mjs](./icons.mjs) file in your project (e.g. `plugins/icons.mjs`) and import it in your `vite.config.js` file.

```js
import { sveltekit } from '@sveltejs/kit/vite';
import { iconPackPlugin } from "./plugins/icons.mjs";
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit(), iconPackPlugin()]
});
```

## Options

```js
iconPackPlugin({
  inputDir: '../static/icons',
  outputFile: '../static/icon-pack.svg',
  outputTypesFile: '../src/lib/icons.ts'
})
```

## Usage

Place your SVGs in your `static/icons` folder. With any `vite` command, the plugin will create a sprite file in your static folder.

Add the `outputFile` to your `+layout.svelte` file.

```svelte
<script lang="ts">
  import iconPack from "/icon-pack.svg?raw";

  interface Props {
    children: import("svelte").Snippet;
  }

  let { children }: Props = $props();
</script>

{@render children()}

{@html iconPack}
```

Use the following `src/lib/components/Icon.svelte` component to render your SVGs.

```svelte
<script lang="ts">
  import type { iconNames } from "../icons";

  interface Props {
    /** @property An accessible title for the icon's name or purpose */
    alt?: string;
    /** @property The `<symbol id="icon-{name}" />` of the icon. Becomes `href="#icon-{name}"` */
    name: (typeof iconNames)[number];
    /** @property Desired size of the icon. Default 24px */
    size?: number | string;
    /** @property Size of the source .svg icon file, used to scale the icon. Default 24 */
    sourceSize?: number;
  }

  let { alt = "", name, size = 24, sourceSize = 24 }: Props = $props();
</script>

<svg
  height={size}
  preserveAspectRatio="xMidYMid meet"
  role="img"
  style="fill: currentColor; vertical-align: middle;"
  viewBox={`0 0 ${sourceSize} ${sourceSize}`}
  width={size}
>
  <title class="sr-only">{alt}</title>
  <use href={`#icon-${name}`} />
</svg>
```

Final note: Just make sure to have a sr-only class in your global CSS. Here's an example:

```css
.sr-only:not(:focus):not(:active) {
  clip-path: inset(50%);
  clip: rect(0 0 0 0);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
}
```