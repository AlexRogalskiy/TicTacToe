const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const BUILD_DIR = path.resolve(__dirname, 'public/build');
const APP_DIR = path.resolve(__dirname, 'src/js');

const CONFIG = {
	mode: 'development',
    entry: path.resolve(APP_DIR, "index.js"),
    output: {
		path: BUILD_DIR,
        filename: "bundle.js"
    },
    module: {
		rules: [
			//{ test: /\.ts$/, loader: 'ts-loader' }
			{ test: /\.css$/i, loader: [ 'style-loader', 'css-loader' ] },
			{ test: /\.json$/i, loader: 'json-loader' },
			{ test: /\.sass|scss$/i, loader: 'sass-loader' },
			//{ test: /\.scss$/i, loader: ExtractTextPlugin.extract(['css', 'sass'])},
			{ test: /\.(js|jsx|es6)$/, include: APP_DIR, exclude: /(node_modules|bower_components)/, loader: 'babel-loader', query: { presets: ['es2016', 'react'], plugins: ['transform-runtime'] }}
		]
    },
	plugins: [
		new CopyWebpackPlugin([
		  { from: './src/images', to: 'images', cache: true },
		  { from: './src/fonts', to: 'fonts', cache: true }
		], { ignore: [ '*.js', '*.css' ], copyUnmodified: true, debug: true })
	],
	devServer: {
		stats: 'errors-only',
	}
};

module.exports = (env, argv) => {
	if (argv.mode === 'development') {
		CONFIG.devtool = 'sourcemap';
	}
	if (argv.mode === 'production') {
		
	}
	CONFIG.mode = argv.mode || 'none';
	return CONFIG;
};