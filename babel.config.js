module.exports = ( api ) => {
	let callerName = '';

	api.caller( ( caller ) => {
		if ( caller && caller?.name) {
			callerName = caller.name;
			return caller.name;
		}
		return undefined;
	} );

	const useESModules = 'LAPILLI_UI_BUILD_MODULE' === callerName;

	return {
		presets: [
			[
				'@babel/preset-env',
				{
					bugfixes        : true,
					modules         : useESModules ? false : 'commonjs',
					shippedProposals: 'LAPILLI_UI_BUILD_MODULE' === callerName
				}
			],
			[
				'@babel/preset-react',
				{
					runtime: 'automatic'
				}
			],
			'@babel/preset-typescript'
		],
		plugins: [
			'babel-plugin-optimize-clsx',
			'@babel/plugin-transform-react-jsx',
			'@emotion/babel-plugin',
			[
				'@babel/plugin-transform-runtime',
				{ useESModules }
			]
		]
	};
};
