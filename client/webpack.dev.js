process.env.NODE_ENV = 'development';

const path = require('path');

const webpack = require('webpack');

const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(common, {
	mode: 'development',

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
			}
		]
	},

	devtool: 'cheap-inline-module-source-map',

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
		new webpack.DefinePlugin({
			NODE_ENV: JSON.stringify('development')
		}),
		new MiniCssExtractPlugin({ filename: 'styles/[name].css' }),
		new webpack.HotModuleReplacementPlugin()
	]
});
