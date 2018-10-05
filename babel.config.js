'use strict';

module.exports = function(api) {
	api.cache(true);
	
	const presets = [ '@babel/preset-env', '@babel/preset-react' ];
	const env = { "production": { "presets": ["react-optimize"] }};

	const plugins = [
		['@babel/plugin-proposal-decorators', { 'legacy': true }],
		['@babel/plugin-proposal-class-properties'],
		['@babel/plugin-proposal-optional-chaining'],
		['@babel/plugin-proposal-nullish-coalescing-operator'],
		['@babel/plugin-transform-async-to-generator'],
		['@babel/plugin-transform-flow-strip-types'],
		['@babel/plugin-transform-react-display-name']
	];
	const comments = false;
	
	return {
		presets,
		env,
		plugins,
		comments
	};
};