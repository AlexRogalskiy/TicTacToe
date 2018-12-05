"use strict";

/**
 * Module dependencies
 */
const path = require('path');
const webpack = require('webpack');
const { Config } = require('webpack-config');

//npm install @gfx/zopfli --save-dev
//const zopfli = require('@gfx/zopfli');
    /*new CompressionPlugin({
      compressionOptions: {
         numiterations: 15
      },
      algorithm(input, compressionOptions, callback) {
        return zopfli.gzip(input, compressionOptions, callback);
      }
    })*/

const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
//const BundleBuddyWebpackPlugin = require("bundle-buddy-webpack-plugin");

const resolve = (...dirs) => path.resolve(__dirname, '..', ...dirs);

const DEFAULT_PATHS = {
	BUILD_DIR: resolve('public', 'build'),
	SOURCE_DIR: resolve('src'),
	JS_SOURCE_DIR: resolve('src', 'js'),
	SASS_SOURCE_DIR: resolve('src', 'sass')
};

const PRODUCTION_CONFIG = {
	mode: 'production',
    entry: path.resolve(DEFAULT_PATHS.JS_SOURCE_DIR, 'index.js'),
	cache: true,
    output: {
		path: DEFAULT_PATHS.BUILD_DIR,
		filename: path.join('js', '[name].min.js'),
		sourceMapFilename: path.join('js', '[name].map'),
		libraryTarget: 'umd',
		library: '[name]',
		pathinfo: true
    },
    module: {
		rules: [
			{ test: /\.(gif|png|jpe?g|svg)$/i, use: [{ loader: 'url-loader', options: { limit: 8192, name: 'images/[name].[hash].[ext]' } }, { loader: 'file-loader', options: { name: 'images/[name].[hash].[ext]' }}, { loader: 'image-webpack-loader', options: { mozjpeg: { progressive: true, quality: 70 }, optipng: { enabled: false }, pngquant: { quality: '65-90', speed: 4 }, gifsicle: { interlaced: false }, webp: { quality: 75 }}}]},
			{ test: /\.css$/i, use: [{ loader: MiniCssExtractPlugin.loader }, { loader: 'css-loader', options: { modules: true, url: false, minimize: true, sourceMap: true, importLoaders: 1 }}]},
			{ test: /\.html$/i, use: [{ loader: 'html-loader', options: { minimize: true } }]},
			{ test: /\.(sass|scss)$/i, exclude: /(node_modules|bower_components)/, use: [{ loader: MiniCssExtractPlugin.loader }, { loader: 'css-loader', options: { modules: true, url: false, minimize: true, sourceMap: true, importLoaders: 1 }}, { loader: 'resolve-url-loader' }, { loader: 'postcss-loader', options: { modules: true, url: false, importLoaders: 1, minimize: true, sourceMap: true, plugins: [ require('cssnano'), require('autoprefixer')({ browsers: ['last 4 versions', 'Firefox ESR', 'not ie < 9'] }) ]}}, { loader: 'sass-loader', options: { includePaths: [CSS_DIR], outputStyle: 'expanded', sourceMap: true, minimize: true }}] },
			{ test: /\.(js|mjs|jsx|es6)$/i, include: DEFAULT_PATHS.JS_SOURCE_DIR, exclude: [/(node_modules|bower_components)/], loader: 'babel-loader' }
		]
    },
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.optimize.OccurrenceOrderPlugin(true),
		new webpack.IgnorePlugin(/webpack-stats\.json$/),
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.DefinePlugin({
	      	"process.env": {
	        	NODE_ENV: JSON.stringify('production')
	      	}
	    }),
		new MiniCssExtractPlugin({
            filename: path.join('css', '[name].css'),
            chunkFilename: path.join('css', '[id].chunk.css'),
        }),
		new OptimizeCSSPlugin({
			{ safe: true, map: { inline: false } }
		}),
		new HtmlWebpackPlugin({
			template: path.join(DEFAULT_PATHS.SOURCE_DIR, 'index.html'),
			template: 'index.html',
			inject: true,
			minify: {
				removeComments: true,
				collapseWhitespace: true,
				removeAttributeQuotes: true
			},
			chunksSortMode: 'dependency'
		}),
		new webpack.HashedModuleIdsPlugin(),
		new webpack.optimize.ModuleConcatenationPlugin(),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			minChunks (module) {
				return (
				  module.resource &&
				  /\.js$/.test(module.resource) &&
				  module.resource.indexOf(
					path.join(__dirname, '../node_modules')
				  ) === 0
				)
			}
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'manifest',
			minChunks: Infinity
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'app',
			async: 'vendor-async',
			children: true,
			minChunks: 3
		}),
		new CompressionPlugin({
			asset: '[path].gz[query]',
			cache: true,
			threshold: 8192,
			minRatio: 0.8,
			deleteOriginalAssets: false,
			algorithm: 'gzip',
			filename: '[path].gz[query]',
			test: /\.js(\?.*)?$/i,
			include: /\/includes/,
			exclude: /\/excludes/,
			compressionOptions: { level: 1 }
		})
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
			uglifyOptions: {
				compress: {
					warnings: false
				}
			},
			sourceMap: config.build.productionSourceMap,
			parallel: true
		})*/
		// new BundleBuddyWebpackPlugin()
	],
	resolve: {
		modules: [
			'src',
			'node_modules'
		],
		extensions: ['.js', '.json', '.jsx', '.scss', '.sass']
	},
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