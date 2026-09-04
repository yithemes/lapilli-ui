// @ts-ignore
module.exports = ( api ) => {
	api.cache( true );

	return {
		presets: [
			'@babel/preset-env',
			[ '@babel/preset-react', { runtime: 'automatic' } ],
			'@babel/preset-typescript',
		],
		plugins: [ '@emotion/babel-plugin' ],
	};
};
