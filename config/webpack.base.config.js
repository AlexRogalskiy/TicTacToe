"use strict";

/**
 * Module dependencies
 */
const glob = require('glob-all');
const path = require('path');
const webpack = require('webpack');
const { Config } = require('webpack-config');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const PurifyCSSPlugin = require('purifycss-webpack');

const paths = {
	BUILD_DIR: path.resolve(__dirname, '../public/build'),
	SOURCE_DIR: path.resolve(__dirname, '../src'),
	JS_SOURCE_DIR: path.resolve(__dirname, '../src', 'js'),
	HTML_SOURCE_DIR: path.resolve(__dirname, '../src', 'views')
};

const BASE_CONFIG = {
	mode: 'none',
    entry: path.resolve(paths.JS_SOURCE_DIR, "index.js"),
	devtool: 'none',
    output: {
		path: paths.BUILD_DIR,
        filename: "bundle.js",
		sourceMapFilename: 'bundle.map',
		libraryTarget: 'umd',
		library: 'bundle'
    },
    module: {
		rules: [
			{ test: /\.(gif|png|jpe?g|svg)$/i, use: [{ loader: 'url-loader', options: { limit: 8192, name: 'images/[name].[hash].[ext]' } }, { loader: 'file-loader', options: { name: 'images/[name].[hash].[ext]' }}, { loader: 'image-webpack-loader' }]},
			{ test: /\.(eot|ttf|otf|woff2?)$/i, use: [{ loader: 'file-loader', options: { name: 'fonts/[name]/[name].[hash].[ext]' } }]},
			{ test: /\.html$/i, include: paths.HTML_SOURCE_DIR, use: [{ loader: 'html-loader', options: { name: '[path]/[name].[ext]', minimize: false } }]}
		]
    },
	plugins: [
		new CopyWebpackPlugin(
			[
				//{ from: path.join(paths.SOURCE_DIR, 'fonts'), to: 'fonts', cache: true },
				{ from: path.join(paths.SOURCE_DIR, 'images'), to: 'images', cache: true },
				{ from: path.join(paths.SOURCE_DIR, 'robots.txt'), to: paths.BUILD_DIR, cache: true },
				{ from: path.join(paths.SOURCE_DIR, 'manifest.json'), to: paths.BUILD_DIR, cache: true },
				{ from: path.join(paths.SOURCE_DIR, 'favicon.ico'), to: paths.BUILD_DIR, cache: true }
			],
			{ ignore: [ '*.js', '*.css', '*.scss', '*.sass' ], copyUnmodified: true, debug: true }
		),
		 new HtmlWebpackPlugin({
			template: path.join(paths.SOURCE_DIR, 'index.html'),
			filename: 'index.html',
			inject: 'body'
		}),
		/*new PurifyCSSPlugin({
			minimize: true,
			paths: glob.sync([
				paths.JS_SOURCE_DIR,
				path.join(paths.SOURCE_DIR, '*.html')
			])
		})*/
	],
	resolve: {
		modules: [
			'src',
			'node_modules'
		],
		extensions: ['.js', '.json', '.jsx', '.scss', '.sass'],
		alias: {
			'appRoot': paths.JS_SOURCE_DIR
		}
	}
};

module.exports = new Config().merge(BASE_CONFIG);
