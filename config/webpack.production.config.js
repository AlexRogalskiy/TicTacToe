"use strict";

/**
 * Module dependencies
 */
const path = require('path');
const webpack = require('webpack');
const { Config } = require('webpack-config');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
//const BundleBuddyWebpackPlugin = require("bundle-buddy-webpack-plugin");

const paths = {
	BUILD_DIR: path.resolve(__dirname, '../public/build'),
	SOURCE_DIR: path.resolve(__dirname, '../src'),
	JS_SOURCE_DIR: path.resolve(__dirname, '../src', 'js'),
	SASS_SOURCE_DIR: path.resolve(__dirname, '../src', 'sass')
};

const PRODUCTION_CONFIG = {
	mode: 'production',
    entry: path.resolve(paths.JS_SOURCE_DIR, "index.js"),
	cache: true,
    output: {
		path: paths.BUILD_DIR,
        filename: "bundle.min.js",
		sourceMapFilename: 'bundle.map',
		libraryTarget: 'umd',
		library: 'bundle'
    },
    module: {
		rules: [
			{ test: /\.css$/i, loader: [ 'style-loader', 'css-loader' ] },
			{ test: /\.html$/i, use: [{ loader: 'html-loader', options: { minimize: true } }]},
			{ test: /\.(sass|scss)$/i, exclude: /(node_modules|bower_components)/, use: [{ loader: MiniCssExtractPlugin.loader }, { loader: 'css-loader', options: { sourceMap: true }}, { loader: 'postcss-loader', options: { plugins: [ require('cssnano'), require('autoprefixer')({ browsers: ['last 2 versions'] }) ]}}, { loader: 'sass-loader', options: { includePaths: [CSS_DIR] }}] },
			{ test: /\.(js|jsx|es6)$/i, include: paths.JS_SOURCE_DIR, exclude: /(node_modules|bower_components)/, loader: 'babel-loader' }
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
		new webpack.DefinePlugin({
	      	"process.env": {
	        	NODE_ENV: JSON.stringify("production")
	      	}
	    }),
		new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
		/*new webpack.optimize.UglifyJsPlugin({
			minimize: true,
			mangle: true,
			output {
				comments: false  
			},
			compress: {
				sourceMap: true,
				warnings: false,
				drop_console: true,
				unsafe: true
			}
		})*/
		// new BundleBuddyWebpackPlugin()
	],
	optimization: {
		minimizer: [
			new UglifyJsPlugin({
				minimize: true,
				uglifyOptions: {
					compress: {
						sourceMap: true,
						inline: false,
						drop_console: true,
						warnings: true,
						unsafe: true,
						mangle: false
					},
					output {
						comments: false  
					}
				}
			})
		]
	}
};

module.exports = new Config().extend('config/webpack.base.config.js').merge(PRODUCTION_CONFIG);