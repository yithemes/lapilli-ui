import { withThemeFromJSXProvider } from "@storybook/addon-styling";
import type { Preview } from "@storybook/react";
import { themes } from './utils/themes';
import ThemeDecorator from "./utils/ThemeDecorator";

export const decorators = [ ThemeDecorator ];

export const parameters = {
	actions: { argTypesRegex: "^on[A-Z].*" },
	controls: {
		expanded: true,
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/
		}
	}
}

const preview: Preview = {
	globalTypes: {
		theme: {
			defaultValue: 'Default',
			toolbar: {
				title: 'Theme',
				icon: 'paintbrush',
				items: Object.keys( themes ).map( ( theme ) => ( { value: theme, title: theme === 'Default' ? 'Default theme' : theme } ) ),
				dynamicTitle: true,
			},
		},
	},
};

export default preview;