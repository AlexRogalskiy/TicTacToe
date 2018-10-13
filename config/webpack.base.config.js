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
    entry: ['babel-polyfill', path.resolve(paths.JS_SOURCE_DIR, "index.js")],
	devtool: 'none',
    output: {
		path: paths.BUILD_DIR,
        filename: "bundle.js",
		sourceMapFilename: 'bundle.map',
		chunkFilename: 'bundle.chunk.js',
		libraryTarget: 'umd',
		library: 'bundle',
		pathinfo: true
    },
    module: {
		rules: [
		    //{ test: /\.ts$/i, loader: 'ts-loader' },
			//{test: /\.hbs$/, loader: 'handlebars-loader'},
            //{ test: /\.json$/i, exclude: /(node_modules|bower_components)/, loader: 'json-loader' },
            //{ test: /\.txt$/, use: [{ loader: 'raw-loader', options: { name: '[path]/[name].[ext]' }}] },
			//{ test: /\.sol/, loader: 'truffle-solidity' },
			//{test: /\.less$/, loader: 'style-loader!css-loader!autoprefixer-loader?browsers=last 4 version!less-loader'},
			{ test: /\.(gif|png|jpe?g|svg)$/i, use: [{ loader: 'url-loader', options: { limit: 8192, name: 'images/[name].[hash].[ext]' } }, { loader: 'file-loader', options: { name: 'images/[name].[hash].[ext]' }}, { loader: 'image-webpack-loader' }]},
			{ test: /\.(eot|ttf|otf|woff2?)$/i, use: [{ loader: 'file-loader', options: { name: 'fonts/[name]/[name].[hash].[ext]' } }]},
			{ test: /\.html$/i, include: paths.HTML_SOURCE_DIR, use: [{ loader: 'html-loader?htmlLoaderConfig', options: { minimize: false, removeComments: false, collapseWhitespace: false, ignoreCustomFragments: [/\{\{.*?}}/], root: paths.HTML_SOURCE_DIR, attrs: ['img:src', 'link:href'] } }]}
		]
    },
	plugins: [
		new CopyWebpackPlugin(
			[
				//{ from: path.join(paths.SOURCE_DIR, 'fonts'), to: 'fonts', cache: true },
				{ from: path.join(paths.SOURCE_DIR, 'images'), 			to: 'images', 		 cache: true },
				{ from: path.join(paths.SOURCE_DIR, 'robots.txt'), 		to: paths.BUILD_DIR, cache: true },
				{ from: path.join(paths.SOURCE_DIR, 'manifest.json'), 	to: paths.BUILD_DIR, cache: true },
				{ from: path.join(paths.SOURCE_DIR, 'favicon.ico'), 	to: paths.BUILD_DIR, cache: true }
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
			'app-root': paths.JS_SOURCE_DIR,
			'vendor': path.join(paths.JS_SOURCE_DIR, 'vendor')
		}
	}
};

module.exports = new Config().merge(BASE_CONFIG);
