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

const BUILD_DIR = path.resolve(__dirname, '../public/build');
const SOURCE_DIR = path.resolve(__dirname, '../src');
const JS_SOURCE_DIR = path.resolve(SOURCE_DIR, 'js');
const SASS_SOURCE_DIR = path.resolve(SOURCE_DIR, 'sass');

const PRODUCTION_CONFIG = {
	mode: 'production',
    entry: path.resolve(JS_DIR, "index.js"),
	cache: true,
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
			{ test: /\.html$/i, use: [{ loader: 'html-loader', options: { minimize: true } }]},
			//{ test: /\.json$/i, exclude: /(node_modules|bower_components)/, loader: 'json-loader' },
			{ test: /\.(sass|scss)$/i, exclude: /(node_modules|bower_components)/, use: [{ loader: MiniCssExtractPlugin.loader }, { loader: 'css-loader', options: { sourceMap: true }}, { loader: 'postcss-loader', options: { plugins: [ require('cssnano'), require('autoprefixer')({ browsers: ['last 2 versions'] }) ]}}, { loader: 'sass-loader', options: { includePaths: [CSS_DIR] }}] },
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
		new webpack.DefinePlugin({
	      	"process.env": {
	        	NODE_ENV: JSON.stringify("production")
	      	}
	    }),
		new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
		new webpack.optimize.UglifyJsPlugin({
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
		})
	],
	optimization: {
		minimizer: [
			new UglifyJsPlugin({
				sourceMap: true,
				uglifyOptions: {
					compress: {
						inline: false,
						drop_console: true,
						warnings: true,
						unsafe: true,
						mangle: false
					}
				}
			})
		]
	}
};

module.exports = new Config().extend('config/webpack.base.config.js').merge(PRODUCTION_CONFIG);