# Icons

This Vite Plugin is inspired by Astro and other tools that generate SVG sprites.

## Installation

To get started, install the required dependency to optimize your SVGs:

```bash
npm install -D svgo
```

Next, place the [./icons.mjs](./icons.mjs) file in your project (e.g., `plugins/icons.mjs`) and import it in your `vite.config.js` file:

```js
import { sveltekit } from '@sveltejs/kit/vite';
import { iconPackPlugin } from "./plugins/icons.mjs";
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit(), iconPackPlugin()]
});
```

## Options

Configure the plugin with the following options:

```js
iconPackPlugin({
	inputDir: '../static/icons',
	outputFile: '../src/icon-pack.svg',
	outputTypesFile: '../src/lib/icons.ts'
})
```

## Usage

Place your SVGs in the `static/icons` folder. The plugin will generate a sprite file whenever you run any `vite` command.

Since SvelteKit does not support `transformIndexHtml`, you need to manually import the SVG sprite file.

Instead of importing and rendering the icon pack in the `+layout.svelte` file, which can cause issues, use a Handle to inject the SVG sprite into your HTML in the `src/hooks.server.ts` file:

```ts
import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import iconPack from "./icon-pack.svg?raw";

const handleAuth: Handle = async ({ event, resolve }) => {
	// ...existing code...
};

const handleIconPack: Handle = async ({ event, resolve }) => {
	return resolve(event, {
		transformPageChunk: ({ html }) => {
			return html.replace('%icon.pack%', iconPack);
		},
	});
}

export const handle: Handle = sequence(handleIconPack, handleAuth);
```

Add the injection point in your `src/app.html` file:

```html
<!doctype html>
<html lang="en">

<head>
	<meta charset="utf-8" />
	<link rel="icon" href="%sveltekit.assets%/favicon.png" />
	<meta name="viewport" content="width=device-width" />
</head>

<body data-sveltekit-preload-data="hover">
	<div style="display: contents">%sveltekit.body%</div>
	%icon.pack%
</body>

</html>
```

Use the following `src/lib/components/Icon.svelte` component to render your SVGs:

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

Finally, ensure you have a `sr-only` class in your global CSS for accessibility:

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