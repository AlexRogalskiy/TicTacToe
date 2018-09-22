"use strict";
/**
 * Module dependencies
 */
const path = require('path');
const webpack = require('webpack');
//const Config = require('webpack-config');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const BUILD_DIR = path.resolve(__dirname, '../public/build');
const APP_DIR = path.resolve(__dirname, '../src/js');

const PRODUCTION_CONFIG = {
	mode: 'production',
    entry: path.resolve(APP_DIR, "index.js"),
	devtool: null,
    output: {
		path: BUILD_DIR,
        filename: "bundle.min.js",
		sourceMapFilename: 'bundle.map',
		libraryTarget: 'umd',
		library: 'bundle'
    },
    module: {
		rules: [
			//{ test: /\.ts$/, loader: 'ts-loader' }
			{ test: /\.css$/i, loader: [ 'style-loader', 'css-loader' ] },
			//{ test: /\.json$/i, exclude: /(node_modules|bower_components)/, loader: 'json-loader' },
			{ test: /\.sass|scss$/i, loader: 'sass-loader' },
			//{test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192&name=images/[hash].[ext]'},
			//{ test: /\.scss$/i, loader: ExtractTextPlugin.extract(['css', 'sass'])},
			{ test: /\.(js|jsx|es6)$/, include: APP_DIR, exclude: /(node_modules|bower_components)/, loader: 'babel-loader', query: { presets: ['es2016', 'react'], plugins: ['transform-runtime'] }}
		]
    },
	plugins: [
		new CopyWebpackPlugin([
		  { from: './src/images', to: 'images', cache: true },
		  { from: './src/fonts', to: 'fonts', cache: true }
		], { ignore: [ '*.js', '*.css' ], copyUnmodified: true, debug: true }),
		new webpack.DefinePlugin({
	      	"process.env": {
	        	NODE_ENV: JSON.stringify("production")
	      	}
	    }),
		new webpack.optimize.UglifyJsPlugin({
		  minimize: true,
		  compress: {
				sourceMap: true,
				warnings: true,
				drop_console: true,
				unsafe: true,
				mangle: false
		  }
		})
	]
};

module.exports = PRODUCTION_CONFIG;
//module.exports = new Config().extend('./webpack.base.config.js').merge(PRODUCTION_CONFIG);