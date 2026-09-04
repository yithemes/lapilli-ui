import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming';

const lightTheme = create(
	{
		base      : 'light',
		brandTitle: 'Lapilli UI',
		brandUrl  : 'https://github.com/yithemes/lapilli-ui',
		brandImage: './images/logo.svg'
	}
);

addons.setConfig(
	{
		theme    : lightTheme,
		showPanel: true
	}
);
