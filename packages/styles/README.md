# Styles

A styling solution for React components, by using `@emotion/styled` and one or more themes.
This allows you to customize the style of your components in different contexts.

## Installation

Install the module

```sh
npm install @yith/styles --save
```

## Key concepts

### Styled

Use the styled function to create styled versions of your components.
This will use the `@emotion/styled` library under the wood.

In this way, you have access to the global `theme` object, to retrieve params from that (e.g. colors, spacing, and so on...)

In addition, this will allow your styled components to use the `sx` prop to receive CSS customization.

### Theme Provider

You can easily customize the style of your components or only for a specific "section", by using the `ThemeProvider` to configure the theme options.

```jsx
const theme = {
	palette:
		{
			primary: {
				main        : '#2470ff',
				light       : '#70aaff',
				contrastText: '#ffffff'
			}
		}
};

<ThemeProvider theme={theme}>
	<Button>Click me</Button>
</ThemeProvider>
```

### CSS classes utils

You can use our functions to easily create CSS classes for your components:
- generateComponentClasses
- mergeComponentClasses
- generateComponentSlotClasses