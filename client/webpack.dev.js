process.env.NODE_ENV = 'development';

const path = require('path');

const webpack = require('webpack');

const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(common, {
	mode: 'development',

	devtool: 'cheap-inline-module-source-map',

	module: {
		rules: [
			{
				test: /\.(png|jpg|svg|gif)$/,
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
				test: /\.less$/,
				use: [
					{
						loader: 'style-loader'
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
			}
		]
	},

	plugins: [
		new webpack.DefinePlugin({
			NODE_ENV: JSON.stringify('development')
		}),
		new webpack.HotModuleReplacementPlugin()
	]
});
