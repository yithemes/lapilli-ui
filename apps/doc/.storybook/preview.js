import ThemeDecorator   from './utils/ThemeDecorator';
import { withThemes }   from 'storybook-addon-themes/react';

export const decorators = [ withThemes];

export const parameters = {
	actions : { argTypesRegex: "^on[A-Z].*" },
	controls: {
		expanded: true,
		matchers: {
			color: /(background|color)$/i,
			date : /Date$/
		}
	},
	themes  : {
		icon     : 'user',
		default  : 'Light',
		list     : [
			{ name: 'Light', color: '#ffffff' },
			{ name: 'Purple', color: '#8864b9' },
			{ name: 'Squared', color: '#000' },
			{ name: 'Dark', color: '#131c24' }
		],
		Decorator: ThemeDecorator,
		clearable: false
	}
}