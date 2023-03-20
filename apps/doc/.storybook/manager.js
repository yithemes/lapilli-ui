import { addons } from '@storybook/addons';
import { create } from '@storybook/theming';

const lightTheme = create(
	{
		base      : 'light',
		brandTitle: 'YITH UI',
		brandUrl  : 'https://yithemes.com',
		brandImage: './images/logo.svg'
	}
);

addons.setConfig(
	{
		theme    : lightTheme,
		showPanel: true
	}
);