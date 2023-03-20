const DependencyExtractionWebpackPlugin = require( '@wordpress/dependency-extraction-webpack-plugin' );
const defaultConfig                     = require( '@wordpress/scripts/config/webpack.config' );
const path                              = require( 'path' );

const packages = ['components', 'date', 'styles'];

const depMap    = packages.reduce( ( acc, _ ) => ( { ...acc, ...{ [ `@yith/${_}` ]: ['yith', _] } } ), {} );
const handleMap = packages.reduce( ( acc, _ ) => ( { ...acc, ...{ [ `@yith/${_}` ]: `@yith-${_}` } } ), {} );

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
		entryPoints[ name ] = `./packages/${name}/build-module/index.js`;
	} );
	return entryPoints;
};

module.exports = {
	...defaultConfig,
	entry      : getEntryPoints(),
	output     : {
		filename: "[name]/index.js",
		library : {
			name: ['yith', '[modulename]'],
			type: 'window'
		}
	},
	plugins    : [
		...defaultConfig.plugins,
		new DependencyExtractionWebpackPlugin( { injectPolyfill: true, requestToExternal, requestToHandle } )
	],
	performance: {
		maxEntrypointSize: 2000000,
		maxAssetSize     : 2000000
	}
};
