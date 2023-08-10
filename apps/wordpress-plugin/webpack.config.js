const DependencyExtractionWebpackPlugin = require( '@wordpress/dependency-extraction-webpack-plugin' );
const { camelCaseDash }                 = require( '@wordpress/dependency-extraction-webpack-plugin/lib/util' );
const defaultConfig                     = require( '@wordpress/scripts/config/webpack.config' );

const SCOPE            = '@yith/'; // Scope for packages to export.
const WP_HANDLE_PREFIX = 'yith-'; // Prefix for WordPress handles of JS scripts enqueued.
const JS_GLOBAL        = 'yith'; // Global variable to be exposed in the window.
const NAMESPACE        = 'yith'; // Namespace, used in devTools.

const packageOptions = require( './package.json' );
const packages       = Object.keys( packageOptions.dependencies ).filter( dep => !!dep.startsWith( SCOPE ) ).map( dep => dep.replace( SCOPE, '' ) );

const depMap    = packages.reduce( ( acc, _ ) => ( { ...acc, ...{ [ SCOPE + _ ]: [JS_GLOBAL, camelCaseDash( _ )] } } ), {} );
const handleMap = packages.reduce( ( acc, _ ) => ( { ...acc, ...{ [ SCOPE + _ ]: WP_HANDLE_PREFIX + _ } } ), {} );

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
			import : `../../packages/${name}/build-module/index.js`,
			library: {
				name: [JS_GLOBAL, camelCaseDash( name )],
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
		devtoolNamespace: NAMESPACE,
		filename        : "[name]/index.js"
	},
	plugins     : [
		...defaultConfig.plugins.filter(
			( plugin ) =>
				plugin.constructor.name !== 'DependencyExtractionWebpackPlugin'
		),
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
