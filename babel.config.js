module.exports = function(api) {
	api.cache(true);
	
	const presets = [ '@babel/preset-env', '@babel/preset-react' ];
	const plugins = [
		['@babel/plugin-proposal-class-properties'],
		['@babel/plugin-proposal-optional-chaining'],
		['@babel/plugin-proposal-nullish-coalescing-operator'],
		['@babel/plugin-transform-react-display-name'],
		["@babel/plugin-proposal-decorators", { "legacy": true }]
	];
	const comments = false;
	
	return {
		presets,
		plugins,
		comments
	};
};