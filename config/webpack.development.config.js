"use strict";
/**
 * Module dependencies
 */
const path = require('path');
const webpack = require('webpack');
const Config = require('webpack-config');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const BUILD_DIR = path.resolve(__dirname, '../public/build');

const SOURCE_DIR = path.resolve(__dirname, '../src');
const JS_SOURCE_DIR = path.resolve(SOURCE_DIR, 'js');
const SASS_SOURCE_DIR = path.resolve(SOURCE_DIR, 'sass');

const DEVELOPMENT_CONFIG = {
	mode: 'development',
    entry: path.resolve(JS_SOURCE_DIR, 'index.js'),
	devtool: 'source-map',
	cache: false,
    output: {
		path: BUILD_DIR,
        filename: path.join('js', '[name].[hash].js'),
		sourceMapFilename: path.join('js', '[name].[hash].map'),
		chunkFilename: path.join('js', '[id].[chunkhash].chunk.js'),
		libraryTarget: 'umd',
		library: '[name]',
		pathinfo: true
    },
    module: {
		rules: [
			{ test: /\.(gif|png|jpe?g|svg)$/i, use: [{ loader: 'url-loader', options: { limit: 8192, name: 'images/[name][hash].[ext]' } }, { loader: 'file-loader', options: { name: 'images/[name][hash].[ext]' }}, { loader: 'image-webpack-loader', options: { mozjpeg: { progressive: true, quality: 70 }, optipng: { enabled: false }, pngquant: { quality: '65-90', speed: 4 }, gifsicle: { interlaced: false }, webp: { quality: 75 }}}]},
			{ test: /\.(eot|ttf|otf|woff2?)$/i, use: [{ loader: 'file-loader', options: { name: 'fonts/[name][hash].[ext]' }}]},
			//{ test: /\.ts$/i, loader: 'ts-loader' },
			{ test: /\.html$/i, use: [{ loader: 'html-loader', options: { minimize: false } }]},
			{ test: /\.css$/i, use: [{ loader: MiniCssExtractPlugin.loader }, { loader: 'css-loader', options: { importLoaders: 1, sourceMap: true }}]},
			//{ test: /\.json$/i, exclude: /(node_modules|bower_components)/, loader: 'json-loader' },
			{ test: /\.(sass|scss)$/i, exclude: /(node_modules|bower_components)/, use: [{ loader: MiniCssExtractPlugin.loader }, { loader: 'css-loader', options: { importLoaders: 1, sourceMap: true, modules: true }}, { loader: 'postcss-loader', options: { plugins: [ require('autoprefixer')({ browsers: ['last 4 versions', 'Firefox ESR', 'not ie < 9'] }) ]}}, { loader: 'sass-loader', options: { includePaths: [SASS_SOURCE_DIR], outputStyle: 'expanded', sourceMap: true }}] },
			//{test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192&name=images/[name][hash].[ext]'},
			{ test: /\.(js|jsx|es6)$/i, include: JS_SOURCE_DIR, exclude: /(node_modules|bower_components)/, loader: 'babel-loader' }
		]
    },
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.optimize.OccurrenceOrderPlugin(true),
		new webpack.IgnorePlugin(/webpack-stats\.json$/),
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.DefinePlugin({
	      	"process.env": {
	        	NODE_ENV: JSON.stringify('development')
	      	}
	    }),
		new CopyWebpackPlugin(
			[
				{ from: path.join(SOURCE_DIR, 'images'), to: 'images', cache: true },
				{ from: path.join(SOURCE_DIR, 'fonts'), to: 'fonts', cache: true },
				{ from: path.join(SOURCE_DIR, 'manifest'), to: 'manifest', cache: true },
			],
			{ ignore: [ '*.js', '*.css' ], copyUnmodified: true, debug: true }
		),
		 new HtmlWebpackPlugin({
			template: path.join(SOURCE_DIR, 'index.html'),
			filename: 'index.html',
			inject: 'body'
		}),
		new MiniCssExtractPlugin({
            filename: path.join('css', '[name].[hash].css'),
            chunkFilename: path.join('css', '[id].[chunkhash].chunk.css'),
        })
	],
	resolve: {
		modules: [
			'src',
			'node_modules'
		],
		extensions: ['.json', '.js', 'jsx']
	},
	devServer: {
		clientLogLevel: 'warn',
		filename: path.join('js', 'bundle.js'),
		contentBase: BUILD_DIR,
		inline: true,
		compress: true,
		open: true,
		historyApiFallback: true,
        port: 8080,
		stats: 'errors-only',
		hot: true
	},
	watchOptions: {
		poll: 1000,
		aggregateTimeout: 1000
	},
	optimization: {
		runtimeChunk: false
    }
};

module.exports = DEVELOPMENT_CONFIG;
//module.exports = new Config().extend('./webpack.base.config.js').merge(DEVELOPMENT_CONFIG);
