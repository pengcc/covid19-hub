'use strict';
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const baseConfig = require('./webpack.base.conf');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

module.exports = {
	...baseConfig,
	devServer: {
		contentBase: path.join(__dirname, '..', 'wwwroot/dist/'),
		compress: true,
		historyApiFallback: true,
		hot: true,
		// disableHostCheck: true,
		port: 3001,
	},
	devtool: 'inline-cheap-module-source-map',
	plugins: [
		...baseConfig.plugins,
		new HardSourceWebpackPlugin(),
		new HardSourceWebpackPlugin.ExcludeModulePlugin([
			{
				// HardSource works with mini-css-extract-plugin but due to how
				// mini-css emits assets, assets are not emitted on repeated builds with
				// mini-css and hard-source together. Ignoring the mini-css loader
				// modules, but not the other css loader modules, excludes the modules
				// that mini-css needs rebuilt to output assets every time.
				test: /mini-css-extract-plugin[\\/]dist[\\/]loader/,
			},
		]),
		new MiniCssExtractPlugin({
			filename: '[name].css',
			chunkFilename: '[id].css',
		}),
	],
};
