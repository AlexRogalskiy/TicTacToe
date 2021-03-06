'use strict';

module.exports = function(api) {
	api.cache(true);
	
	const presets = [ '@babel/preset-env', '@babel/preset-react' ];
	const env = { 'production': { 'presets': ['react-optimize'] }};

	const plugins = [
		['@babel/plugin-proposal-object-rest-spread'],
		['@babel/plugin-proposal-decorators', { 'legacy': true }],
		['@babel/plugin-proposal-class-properties', { 'loose': true }],
		['@babel/plugin-proposal-optional-chaining'],
		['@babel/plugin-proposal-nullish-coalescing-operator'],
		['@babel/plugin-syntax-dynamic-import'],
		['@babel/plugin-transform-async-to-generator'],
		['@babel/plugin-transform-flow-strip-types'],
		['@babel/plugin-transform-modules-commonjs'],
		['@babel/plugin-transform-react-display-name'],
		['@babel/plugin-transform-react-jsx'],
		['module-resolver', {
			'root': ['./src'],
				'alias': {
					'tests': './tests',
					'routes': './routes'
				}
			}
		],
		['react-flow-props-to-prop-types'],
		['import-inspector',
			{
				'serverSideRequirePath': true,
				'webpackRequireWeakId': true,
			}
		]
	];
	const comments = false;
	
	return {
		presets,
		env,
		plugins,
		comments
	};
};