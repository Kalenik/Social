const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const DIST_DIR = path.resolve(__dirname, '../dist/public');
const SRC_DIR = __dirname;

module.exports = {
	context: SRC_DIR,

	entry: './scripts/index.tsx',

	output: {
		filename: 'js/[name].bundle.js',
		chunkFilename: 'js/[name].bundle.js',
		path: DIST_DIR,
		publicPath: '/'
	},

	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.json'],
		alias: {
			'@components': path.resolve(SRC_DIR, 'scripts/components'),
			'@contexts': path.resolve(SRC_DIR, 'scripts/contexts'),
			'@helpers': path.resolve(SRC_DIR, 'scripts/helpers'),
			'@utils': path.resolve(SRC_DIR, 'scripts/utils'),
			'@interfaces': path.resolve(SRC_DIR, 'scripts/interfaces'),
			'@pages': path.resolve(SRC_DIR, 'scripts/pages'),
			'@reducers': path.resolve(SRC_DIR, 'scripts/reducers'),
			'@services': path.resolve(SRC_DIR, 'scripts/services'),
			'@config': path.resolve(SRC_DIR, 'scripts/Config.ts'),
			'@images': path.resolve(SRC_DIR, 'assets/img')
		}
	},

	optimization: {
		splitChunks: {
			cacheGroups: {
				reactVendor: {
					test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
					name: 'react-vendor',
					chunks: 'all'
				}
			}
		}
	},

	module: {
		rules: [
			{
				test: /\.(ico)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[path][name].[ext]'
						}
					}
				]
			},
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/
			}
		]
	},

	devServer: {
		host: 'localhost',
		port: 3001,
		contentBase: path.resolve(__dirname, '../dist'),
		inline: true,
		hot: true,
		historyApiFallback: true,
		open: true
	},

	plugins: [
		new webpack.NoEmitOnErrorsPlugin(),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: 'index.html',
			inject: 'body'
		}),
		new WebpackNotifierPlugin()
	]
};
