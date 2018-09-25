"use strict";

/**
 * Module dependencies
 */
const path = require('path');
const webpack = require('webpack');
const { Config } = require('webpack-config');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const BUILD_DIR = path.resolve(__dirname, '../public/build');
const SOURCE_DIR = path.resolve(__dirname, '../src');
const JS_SOURCE_DIR = path.resolve(SOURCE_DIR, 'js');

const BASE_CONFIG = {
	mode: 'none',
    entry: path.resolve(JS_SOURCE_DIR, "index.js"),
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
			//{ test: /\.ts$/i, loader: 'ts-loader' },
			//{ test: /\.json$/i, exclude: /(node_modules|bower_components)/, loader: 'json-loader' },
			{ test: /\.(gif|png|jpe?g|svg)$/i, use: [{ loader: 'url-loader', options: { limit: 8192, name: 'images/[name].[hash].[ext]' } }, { loader: 'file-loader', options: { name: 'images/[name].[hash].[ext]' }}, { loader: 'image-webpack-loader' }]},
			{ test: /\.(eot|ttf|otf|woff2?)$/i, use: [{ loader: 'file-loader', options: { name: 'fonts/[name]/[name].[hash].[ext]' } }]},
			{ test: /\.html$/i, use: [{ loader: 'html-loader', options: { minimize: false } }]}
			//{ test: /\.css$/i, use: [ 'style-loader', 'css-loader' ] },
			//{ test: /\.(sass|scss)$/i, exclude: /(node_modules|bower_components)/, use: [ 'style-loader', 'css-loader', 'sass-loader' ]},
			//{ test: /\.(js|jsx|es6)$/i, include: JS_SOURCE_DIR, exclude: /(node_modules|bower_components)/, loader: 'babel-loader' }
		]
    },
	plugins: [
		new CopyWebpackPlugin(
			[
				{ from: path.join(SOURCE_DIR, 'images'), to: 'images', cache: true },
				//{ from: path.join(SOURCE_DIR, 'fonts'), to: 'fonts', cache: true },
				{ from: path.join(SOURCE_DIR, 'manifest.json'), to: BUILD_DIR, cache: true },
				{ from: path.join(SOURCE_DIR, 'favicon.ico'), to: BUILD_DIR, cache: true },
			],
			{ ignore: [ '*.js', '*.css', '*.scss', '*.sass' ], copyUnmodified: true, debug: true }
		),
		 new HtmlWebpackPlugin({
			template: path.join(SOURCE_DIR, 'index.html'),
			filename: 'index.html',
			inject: 'body'
		})
	],
	resolve: {
		modules: [
			'src',
			'node_modules'
		],
		extensions: ['.js', '.json', '.jsx', '.scss', '.sass'],
		alias: {
			'appRoot': JS_SOURCE_DIR
		}
	}
};

module.exports = new Config().merge(BASE_CONFIG);
