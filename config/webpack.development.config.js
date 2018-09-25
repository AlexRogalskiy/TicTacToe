"use strict";

/**
 * Module dependencies
 */
const path = require('path');
const webpack = require('webpack');
const { Config } = require('webpack-config');

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
			{ test: /\.(gif|png|jpe?g|svg)$/i, use: [{ loader: 'url-loader', options: { limit: 8192, name: 'images/[name].[hash].[ext]' } }, { loader: 'file-loader', options: { name: 'images/[name].[hash].[ext]' }}, { loader: 'image-webpack-loader', options: { mozjpeg: { progressive: true, quality: 70 }, optipng: { enabled: false }, pngquant: { quality: '65-90', speed: 4 }, gifsicle: { interlaced: false }, webp: { quality: 75 }}}]},
			{ test: /\.css$/i, use: [{ loader: MiniCssExtractPlugin.loader }, { loader: 'css-loader', options: { importLoaders: 1, sourceMap: true }}]},
			{ test: /\.(sass|scss)$/i, exclude: /(node_modules|bower_components)/, use: [{ loader: MiniCssExtractPlugin.loader }, { loader: 'css-loader', options: { importLoaders: 1, sourceMap: true, modules: true }}, { loader: 'resolve-url-loader' }, { loader: 'postcss-loader', options: { plugins: [ require('autoprefixer')({ browsers: ['last 4 versions', 'Firefox ESR', 'not ie < 9'] }) ]}}, { loader: 'sass-loader', options: { includePaths: [SASS_SOURCE_DIR], outputStyle: 'expanded', sourceMap: true }}] },
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
		extensions: ['.js', '.json', '.jsx', '.scss', '.sass']
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

module.exports = new Config().extend('config/webpack.base.config.js').merge(DEVELOPMENT_CONFIG);
