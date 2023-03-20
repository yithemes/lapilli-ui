module.exports = {
	stories   : [
		'./stories/*.@(js|jsx|ts|tsx|mdx)',
		'../../../packages/components/src/**/stories/*.@(js|jsx|ts|tsx|mdx)'
	],
	addons    : [
		"@storybook/addon-links",
		{
			name   : "@storybook/addon-essentials",
			options: { backgrounds: false }
		},
		'@storybook/addon-a11y',
		"@storybook/addon-interactions",
		'storybook-addon-themes',
		{
			name   : '@storybook/addon-docs',
			options: { configureJSX: true }
		}
	],
	framework : "@storybook/react",
	core      : {
		builder: "@storybook/builder-webpack5"
	},
	typescript: {
		check                       : false,
		reactDocgen                 : 'react-docgen-typescript',
	},
	staticDirs: ['./static']
}