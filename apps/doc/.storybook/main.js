module.exports = {
	stories   : [
		'./stories/*.@(js|jsx|ts|tsx|mdx)',
		'../../../packages/components/src/**/stories/*.stories.@(js|jsx|ts|tsx|mdx)'
	],
	addons    : [
		"@storybook/addon-links",
		{
			name   : "@storybook/addon-essentials",
			options: {
				backgrounds: false
			}
		},
		'@storybook/addon-a11y',
		"@storybook/addon-interactions",
		{
			name   : '@storybook/addon-docs',
			options: {
				configureJSX: true
			}
		},
		'@storybook/addon-mdx-gfm'
	],
	framework : {
		name   : "@storybook/react-webpack5",
		options: {}
	},
	typescript: {
		check      : false,
		reactDocgen: 'react-docgen-typescript'
	},
	staticDirs: ['./static'],
	docs      : {
		autodocs: true
	}
};