import { withThemeFromJSXProvider } from "@storybook/addon-styling";
import { ThemeProvider }            from '@yith/styles';
import { themes }                   from './utils/themes';
import GlobalStyles                 from './utils/GlobalStyles';

export const decorators = [
	withThemeFromJSXProvider(
		{
			themes      : themes,
			defaultTheme: 'Light',
			Provider    : ThemeProvider,
			GlobalStyles: GlobalStyles
		}
	)
];

export const parameters = {
	actions : { argTypesRegex: "^on[A-Z].*" },
	controls: {
		expanded: true,
		matchers: {
			color: /(background|color)$/i,
			date : /Date$/
		}
	}
}