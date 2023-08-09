module.exports = ( api ) => {
	api.cache( true );

	return {
		presets: ['@babel/preset-env','@babel/preset-typescript'],
		plugins: ['@babel/plugin-transform-runtime', '@babel/plugin-transform-react-jsx','@emotion/babel-plugin']
	};
};
