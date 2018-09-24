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
    output: {
		path: BUILD_DIR,
        filename: path.join('js', 'bundle.js'),
		sourceMapFilename: path.join('js', 'bundle.map'),
		libraryTarget: 'umd',
		library: 'bundle'
    },
    module: {
		rules: [
			{ test: /\.(gif|png|jpe?g|svg)$/i, use: [{ loader: 'url-loader', options: { limit: 8192, name: 'images/[name][hash].[ext]' } }, { loader: 'file-loader', options: { name: 'images/[name][hash].[ext]' }}, { loader: 'image-webpack-loader', options: { mozjpeg: { progressive: true, quality: 70 }}}]},
			{ test: /\.(eot|ttf|otf|woff2?)$/i, use: [{ loader: 'file-loader', options: { name: 'fonts/[name][hash].[ext]' }}]},
			//{ test: /\.ts$/i, loader: 'ts-loader' },
			{ test: /\.html$/i, use: [{ loader: 'html-loader', options: { minimize: false } }]},
			{ test: /\.css$/i, use: [ MiniCssExtractPlugin.loader, 'css-loader' ] },
			//{ test: /\.json$/i, exclude: /(node_modules|bower_components)/, loader: 'json-loader' },
			{ test: /\.(sass|scss)$/i, exclude: /(node_modules|bower_components)/, use: [{ loader: MiniCssExtractPlugin.loader }, { loader: 'css-loader', options: { sourceMap: true }}, { loader: 'postcss-loader', options: { plugins: [ require('autoprefixer')({ browsers: ['last 2 versions'] }) ]}}, { loader: 'sass-loader', options: { includePaths: [SASS_SOURCE_DIR], sourceMap: true }}] },
			//{test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192&name=images/[name][hash].[ext]'},
			{ test: /\.(js|jsx|es6)$/i, include: JS_SOURCE_DIR, exclude: /(node_modules|bower_components)/, loader: 'babel-loader' }
		]
    },
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.DefinePlugin({
	      	"process.env": {
	        	NODE_ENV: JSON.stringify('development')
	      	}
	    }),
		new CopyWebpackPlugin(
			[
				{ from: path.join(SOURCE_DIR, 'images'), to: 'images', cache: true },
				{ from: path.join(SOURCE_DIR, 'fonts'), to: 'fonts', cache: true }
			],
			{ ignore: [ '*.js', '*.css' ], copyUnmodified: true, debug: true }
		),
		 new HtmlWebpackPlugin({
			template: path.join(SOURCE_DIR, 'index.html'),
			filename: 'index.html',
			inject: 'body'
		}),
		new MiniCssExtractPlugin({
            filename: path.join('css', '[name].css'),
            chunkFilename: path.join('css', '[id].css'),
        })
	],
	devServer: {
		inline: true,
		compress: true,
		open: true,
		historyApiFallback: true,
        contentBase: BUILD_DIR,
        port: 8080,
		stats: 'errors-only',
	},
	watchOptions: {
		poll: 1000,
		aggregateTimeout: 1000
	}
};

module.exports = DEVELOPMENT_CONFIG;
//module.exports = new Config().extend('./webpack.base.config.js').merge(DEVELOPMENT_CONFIG);
