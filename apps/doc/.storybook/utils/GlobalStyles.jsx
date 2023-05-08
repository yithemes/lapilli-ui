import { useTheme } from '@yith/styles';
import React        from 'react';
import { themes }   from './themes';

export default function GlobalStyles() {
	const theTheme = useTheme();
	return <style>
		{`html, .docs-story, .themed-story-wrapper{
				background: ${theTheme?.palette?.background?.default ?? themes.Light.palette.background.default};
				color: ${theTheme?.palette?.text?.default ?? themes.Light.palette.text.default};
			}`}
	</style>
}