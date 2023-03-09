import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import React, { useMemo } from 'react';

import { createTheme, defaultThemeOptions } from '../theme';

type ThemeProviderProps = {
	theme?: object;
	children?: React.ReactNode;
};

export default function ThemeProvider( { theme = defaultThemeOptions, children, ...props }: ThemeProviderProps ) {
	const theTheme = useMemo( () => createTheme( theme ), [ theme ] );

	return (
		<EmotionThemeProvider theme={ theTheme } { ...props }>
			{ children }
		</EmotionThemeProvider>
	);
}
