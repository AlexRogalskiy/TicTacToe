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
const JS_DIR = path.resolve(__dirname, '../src/js');
const CSS_DIR = path.resolve(__dirname, '../src/css');

const DEVELOPMENT_CONFIG = {
	mode: 'development',
    entry: path.resolve(JS_DIR, "index.js"),
	devtool: 'source-map',
    output: {
		path: BUILD_DIR,
        filename: "bundle.js",
		sourceMapFilename: 'bundle.map',
		libraryTarget: 'umd',
		library: 'bundle'
    },
    module: {
		rules: [
			{ test: /\.(gif|png|jpe?g|svg)$/i, use: [{ loader: 'file-loader', options: { name: 'images/[name][hash].[ext]' }}, { loader: 'image-webpack-loader', options: { mozjpeg: { progressive: true, quality: 70 }}}]},
			{ test: /\.(eot|svg|ttf|otf|woff|woff2)$/i, use: [{ loader: 'file-loader', options: { name: 'fonts/[name][hash].[ext]' }}]},
			//{ test: /\.ts$/i, loader: 'ts-loader' },
			{ test: /\.html$/i, use: 'html-loader' },
			{ test: /\.css$/i, loader: [ 'style-loader', 'css-loader' ] },
			//{ test: /\.json$/i, exclude: /(node_modules|bower_components)/, loader: 'json-loader' },
			{ test: /\.(sass|scss)$/i, exclude: /(node_modules|bower_components)/, use: [{ loader: MiniCssExtractPlugin.loader }, { loader: 'css-loader', options: { sourceMap: true }}, { loader: 'postcss-loader', options: { plugins: [ require('autoprefixer')({ browsers: ['last 2 versions'] }) ]}}, { loader: 'sass-loader', options: { includePaths: [CSS_DIR], sourceMap: true }}] },
			//{test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192&name=images/[hash].[ext]'},
			//{ test: /\.scss$/i, loader: ExtractTextPlugin.extract(['css', 'sass'])},
			{ test: /\.(js|jsx|es6)$/i, include: JS_DIR, exclude: /(node_modules|bower_components)/, loader: 'babel-loader' }
		]
    },
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.DefinePlugin({
	      	"process.env": {
	        	NODE_ENV: JSON.stringify("development")
	      	}
	    }),
		new CopyWebpackPlugin(
			[
				{ from: './src/images', to: 'images', cache: true },
				{ from: './src/fonts', to: 'fonts', cache: true }
			],
			{ ignore: [ '*.js', '*.css' ], copyUnmodified: true, debug: true }
		),
		 new HtmlWebpackPlugin({
			template: './src/index.html',
			filename: './index.html',
			inject: 'body'
		}),
		new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
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
