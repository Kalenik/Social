process.env.NODE_ENV = 'production';

const webpack = require('webpack');

const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = merge(common, {
	mode: 'production',

	devtool: 'source-map',

	output: {
		filename: 'js/[name].[chunkhash].bundle.js',
		chunkFilename: 'js/[name].[chunkhash].bundle.js'
	},

	optimization: {
		minimizer: [
			new TerserPlugin({
				sourceMap: true
			})
		]
	},

	module: {
		rules: [
			{
				test: /\.(png|jpg|svg|gif)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[path][name].[hash:6].[ext]'
						}
					}
				]
			},
			{
				test: /\.less$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader
					},
					{
						loader: 'css-loader' // translates CSS into CommonJS
					},
					{
						loader: 'postcss-loader'
					},
					{
						loader: 'less-loader' // compiles Less to CSS
					}
				]
			},
			{
				test: /\.html$/,
				use: [
					{
						loader: 'html-loader',
						options: {
							minimize: true
						}
					}
				]
			}
		]
	},

	plugins: [
		new webpack.DefinePlugin({
			NODE_ENV: JSON.stringify('production')
		}),
		new MiniCssExtractPlugin({ filename: 'styles/[name].[hash].min.css' })
	]
});
