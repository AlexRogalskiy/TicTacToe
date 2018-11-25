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

const DEFAULT_ROOT_DIR = '..';
const DEFAULT_PATHS = {
	BUILD_DIR: path.resolve(__dirname, DEFAULT_ROOT_DIR, 'public', 'build'),
	SOURCE_DIR: path.resolve(__dirname, DEFAULT_ROOT_DIR, 'src'),
	JS_SOURCE_DIR: path.resolve(__dirname, DEFAULT_ROOT_DIR, 'src', 'js'),
	HTML_SOURCE_DIR: path.resolve(__dirname, DEFAULT_ROOT_DIR, 'src', 'views')
};

const BASE_CONFIG = {
	mode: 'none',
    entry: ['babel-polyfill', path.resolve(DEFAULT_PATHS.JS_SOURCE_DIR, 'index.js')],
	devtool: 'none',
    output: {
		path: DEFAULT_PATHS.BUILD_DIR,
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
			{ test: /\.html$/i, include: DEFAULT_PATHS.HTML_SOURCE_DIR, use: [{ loader: 'html-loader?htmlLoaderConfig', options: { minimize: false, removeComments: false, collapseWhitespace: false, ignoreCustomFragments: [/\{\{.*?}}/], root: DEFAULT_PATHS.HTML_SOURCE_DIR, attrs: ['img:src', 'link:href'] } }]}
		]
    },
	plugins: [
		new CopyWebpackPlugin(
			[
				//{ from: path.join(DEFAULT_PATHS.SOURCE_DIR, 'fonts'), to: path.join(DEFAULT_PATHS.BUILD_DIR, 'fonts'), cache: true },
				{ from: path.join(DEFAULT_PATHS.SOURCE_DIR, 'images'), 			to: path.join(DEFAULT_PATHS.BUILD_DIR, 'images'), 		 cache: true },
				{ from: path.join(DEFAULT_PATHS.SOURCE_DIR, 'robots.txt'), 		to: DEFAULT_PATHS.BUILD_DIR, cache: true },
				{ from: path.join(DEFAULT_PATHS.SOURCE_DIR, 'manifest.json'), 	to: DEFAULT_PATHS.BUILD_DIR, cache: true },
				{ from: path.join(DEFAULT_PATHS.SOURCE_DIR, 'favicon.ico'), 	to: DEFAULT_PATHS.BUILD_DIR, cache: true }
			],
			{ ignore: [ '*.js', '*.css', '*.scss', '*.sass' ], copyUnmodified: true, debug: true }
		),
		 new HtmlWebpackPlugin({
			template: path.join(DEFAULT_PATHS.SOURCE_DIR, 'index.html'),
			filename: 'index.html',
			inject: 'body'
		}),
		/*new PurifyCSSPlugin({
			minimize: true,
			DEFAULT_PATHS: glob.sync([
				DEFAULT_PATHS.JS_SOURCE_DIR,
				path.join(DEFAULT_PATHS.SOURCE_DIR, '*.html')
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
			'app-root': DEFAULT_PATHS.JS_SOURCE_DIR,
			'actions': path.join(DEFAULT_PATHS.JS_SOURCE_DIR, 'actions'),
			'components': path.join(DEFAULT_PATHS.JS_SOURCE_DIR, 'components'),
			'constants': path.join(DEFAULT_PATHS.JS_SOURCE_DIR, 'constants'),
			'containers': path.join(DEFAULT_PATHS.JS_SOURCE_DIR, 'containers'),
			'libs': path.join(DEFAULT_PATHS.JS_SOURCE_DIR, 'libs'),
			'mixins': path.join(DEFAULT_PATHS.JS_SOURCE_DIR, 'mixins'),
			'reducers': path.join(DEFAULT_PATHS.JS_SOURCE_DIR, 'reducers'),
			'resources': path.join(DEFAULT_PATHS.JS_SOURCE_DIR, 'resources'),
			'schemas': path.join(DEFAULT_PATHS.JS_SOURCE_DIR, 'schemas'),
			'stores': path.join(DEFAULT_PATHS.JS_SOURCE_DIR, 'stores'),
			'types': path.join(DEFAULT_PATHS.JS_SOURCE_DIR, 'types'),
			'validators': path.join(DEFAULT_PATHS.JS_SOURCE_DIR, 'validators'),	
			'vendor': path.join(DEFAULT_PATHS.JS_SOURCE_DIR, 'vendor'),
			'views': path.join(DEFAULT_PATHS.JS_SOURCE_DIR, 'views'),
			'wrappers': path.join(DEFAULT_PATHS.JS_SOURCE_DIR, 'wrappers')
		}
	}
};

module.exports = new Config().merge(BASE_CONFIG);
