import type { Preview } from "@storybook/react";
import { themes } from './utils/themes';
import ThemeDecorator from "./utils/ThemeDecorator";

export const decorators = [ ThemeDecorator ];

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
	parameters: {
		actions: { argTypesRegex: "^on[A-Z].*" },
		controls: {
			expanded: true,
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/
			}
		},
		options: {
			storySort: {
				order: [ 'Introduction', 'Components', [ 'Introduction' ], 'Styles', [ 'Introduction' ], 'Date', [ 'Introduction' ], 'BlockEditor', [ 'Introduction' ] ],
			},
		}
	}
};

export default preview;