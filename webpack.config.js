const DependencyExtractionWebpackPlugin = require( '@wordpress/dependency-extraction-webpack-plugin' );
const { camelCaseDash }                 = require( '@wordpress/dependency-extraction-webpack-plugin/lib/util' );
const defaultConfig                     = require( '@wordpress/scripts/config/webpack.config' );

const packages = ['block-editor', 'components', 'date', 'styles'];

const depMap    = packages.reduce( ( acc, _ ) => ( { ...acc, ...{ [ `@yith/${_}` ]: ['yith', camelCaseDash( _ )] } } ), {} );
const handleMap = packages.reduce( ( acc, _ ) => ( { ...acc, ...{ [ `@yith/${_}` ]: `yith-${_}` } } ), {} );

const requestToExternal = ( request ) => {
	if ( depMap[ request ] ) {
		return depMap[ request ];
	}
};

const requestToHandle = ( request ) => {
	if ( handleMap[ request ] ) {
		return handleMap[ request ];
	}
};

const getEntryPoints = () => {
	const entryPoints = {};
	packages.forEach( ( name ) => {
		entryPoints[ name ] = {
			import : `./packages/${name}/build-module/index.js`,
			library: {
				name: ['yith', camelCaseDash( name )],
				type: 'window'
			}
		};
	} );
	return entryPoints;
};

module.exports = {
	...defaultConfig,
	entry       : getEntryPoints(),
	output      : {
		devtoolNamespace: 'yith',
		filename        : "[name]/index.js"
	},
	plugins     : [
		//...defaultConfig.plugins,
		new DependencyExtractionWebpackPlugin( { injectPolyfill: true, requestToExternal, requestToHandle } )
	],
	watchOptions: {
		ignored         : [
			'./node_modules',
			'**/node_modules',
			'**/packages/*/src/**/*.{js,ts,tsx,scss}'
		],
		aggregateTimeout: 500
	},
	performance : {
		maxEntrypointSize: 2000000,
		maxAssetSize     : 2000000
	}
};
