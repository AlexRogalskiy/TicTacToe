"use strict";
/**
 * Module dependencies
 */
const path = require('path');
const webpack = require('webpack');
const Config = require('webpack-config');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const BUILD_DIR = path.resolve(__dirname, '../public/build');
const JS_DIR = path.resolve(__dirname, '../src/js');

const BASE_CONFIG = {
    entry: path.resolve(JS_DIR, "index.js"),
	devtool:'source-map',
	devtool: 'none',
    output: {
		path: BUILD_DIR,
        filename: "bundle.js",
		sourceMapFilename: 'bundle.map',
		libraryTarget: 'umd',
		library: 'bundle'
    },
    module: {
		rules: [
			{ test: /\.(png|jpg|svg|ttf|eot|woff|woff2)$/i, loader: 'file?name=[path][name].[ext]' },
			{ test: /\.(png|jpg)$/i, loader: 'url-loader?limit=8192&name=images/[hash].[ext]' },
			//{ test: /\.ts$/, loader: 'ts-loader' }
			{ test: /\.css$/i, loader: [ 'style-loader', 'css-loader' ] },
			//{ test: /\.json$/i, exclude: /(node_modules|bower_components)/, loader: 'json-loader' },
			{ test: /\.(sass|scss)$/i, use: ['style-loader', 'css-loader', 'sass-loader'] },
			//{test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192&name=images/[hash].[ext]'},
			//{ test: /\.scss$/i, loader: ExtractTextPlugin.extract(['css', 'sass'])},
			{ test: /\.(js|jsx|es6)$/i, include: JS_DIR, exclude: /(node_modules|bower_components)/, loader: 'babel-loader' }
		]
    },
	plugins: [
		new CopyWebpackPlugin(
			[
				{ from: './src/images', to: 'images', cache: true },
				{ from: './src/fonts', to: 'fonts', cache: true }
			],
			{ ignore: [ '*.js', '*.css' ], copyUnmodified: true, debug: true }
		),
		new HtmlWebpackPlugin({
			template: '../src/index.html',
			inject: 'body'
		})
	],
	resolve: {
		modules: [
			'node_modules',
			'bower_modules'
		],
		extensions: ['.js', '.json', '.jsx', '.scss', '.sass'],
		alias: {
			'appRoot': JS_DIR
		}
	}
};

/*module.exports = (env, argv) => {
	if (argv.mode === 'development') {
		BASE_CONFIG.devtool = 'source-map';
	}
	if (argv.mode === 'production') {
		
	}
	BASE_CONFIG.mode = argv.mode || 'none';
	return BASE_CONFIG;
};*/

//module.exports = BASE_CONFIG;
module.exports = new Config().merge(BASE_CONFIG);
