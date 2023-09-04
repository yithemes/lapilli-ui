import { defaultThemeOptions, ThemeProvider } from '@maya-ui/styles';
import React                                  from "react";
import { themes }                             from './themes';

export default function ThemeDecorator( Story, context ) {
	const theTheme = themes[ context.globals.theme ] ?? themes.Default;
	return <ThemeProvider theme={theTheme}>
		<style>
			{`html, .docs-story, .themed-story-wrapper{
				background: ${theTheme?.palette?.background?.default ?? themes.Default.palette.background.default};
				color: ${theTheme?.palette?.text?.default ?? themes.Default.palette.text.default};
			}`}
		</style>
		<Story />
	</ThemeProvider>
}