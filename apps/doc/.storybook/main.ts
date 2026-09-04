import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import type { StorybookConfig } from '@storybook/react-webpack5';

const require = createRequire( import.meta.url );
const __dirname = path.dirname( fileURLToPath( import.meta.url ) );

const sortedPackages = [ 'components', 'styles', 'date', 'block-editor' ];

const config: StorybookConfig = {
	stories: [
		'./stories/*.@(js|jsx|ts|tsx|mdx)',
		...sortedPackages.map( ( packageName ) => [
			`../../../packages/${ packageName }/src/**/stories/*.stories.@(js|jsx|ts|tsx)`,
			`../../../packages/${ packageName }/src/**/stories/*.mdx`,
		] ).flat(),
	],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-a11y',
		{
			name: '@storybook/addon-docs',
			options: {
				configureJSX: true,
			},
		},
		'@storybook/addon-mcp',
	],
	framework: {
		name: '@storybook/react-webpack5',
		options: {},
	},
	typescript: {
		check: false,
		reactDocgen: 'react-docgen-typescript',
	},
	staticDirs: [ './static' ],
	features: {
		backgrounds: false,
	},
	webpackFinal: async ( config ) => {
		const packagesPath = path.resolve( __dirname, '../../../packages' );
		const packageNames = [ 'components', 'styles', 'date', 'block-editor' ];
		const docRoot = path.resolve( __dirname, '..' );

		config.resolve = config.resolve || {};
		config.resolve.alias = {
			...config.resolve.alias,
			react: path.resolve( docRoot, 'node_modules/react' ),
			'react-dom': path.resolve( docRoot, 'node_modules/react-dom' ),
			...Object.fromEntries(
				packageNames.map( ( name ) => [
					`@lapilli-ui/${ name }`,
					path.resolve( packagesPath, name, 'src' ),
				] )
			),
		};

		config.module = config.module || {};
		config.module.rules = config.module.rules || [];
		config.module.rules.push( {
			test: /\.(mjs|tsx?|jsx?)$/,
			include: [
				packagesPath,
				path.resolve( __dirname ),
				path.resolve( __dirname, '../' ),
			],
			use: [
				{
					loader: require.resolve( 'babel-loader' ),
					options: {
						rootMode: 'upward',
					},
				},
			],
		} );

		return config;
	},
};

export default config;
