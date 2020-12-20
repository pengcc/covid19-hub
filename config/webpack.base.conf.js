'use strict';
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
	.BundleAnalyzerPlugin;

const {NODE_ENV, NODE_ANALYSE} = process.env;
const isEnvDevelopment = NODE_ENV && NODE_ENV === 'development';
const isEnvAnalyse = NODE_ANALYSE && NODE_ANALYSE === 'analyse';
// const isEnvProduction = NODE_ENV && NODE_ENV === "production";

function resolvePath(dir) {
	return path.join(__dirname, '..', dir);
}

const webpackBaseConfig = {
	entry: isEnvDevelopment
		? {
				app: [
					'webpack-dev-server/client?http://localhost:3001',
					resolvePath('src/boot-client.jsx'),
				],
		  }
		: {
				app: resolvePath('src/boot-client.jsx'),
		  },
	mode: isEnvDevelopment ? 'development' : 'production',

	output: {
		path: resolvePath('wwwroot/dist'),
		filename: isEnvDevelopment ? 'app.bundle.js' : 'app.js',
		publicPath: '/',
	},

	// Enable sourcemaps for debugging webpack's output.
	// devtool: isEnvDevelopment ? 'inline-eval-cheap-source-map' : "source-map",

	optimization: {
		splitChunks: {
			chunks: 'all',
			name: true,
			cacheGroups: {
				vendors: {
					enforce: true,
					test: /node_modules/,
					name: 'vendor',
					filename: isEnvDevelopment
						? '[name].bundle.js'
						: '[name].[hash].js',
					priority: -10,
				},
			},
		},
	},
	node: {
		// Resolve node module use of fs
		fs: 'empty',
	},
	resolve: {
		modules: [path.resolve(__dirname, 'src'), 'node_modules'],
		extensions: ['.js', '.jsx', '.json', '.scss'],
		alias: {
			Styles: resolvePath('src/styles'),
			Utils: resolvePath('src/utils'),
			Store: resolvePath('src/store'),
			Routes: resolvePath('src/routes'),
			Http: resolvePath('src/http'),
			Images: resolvePath('src/images'),
			Constants: resolvePath('src/constants'),
			Context: resolvePath('src/context'),
			Intl: resolvePath('src/intl'),
			IntlMessage$: resolvePath('src/components/IntlMessage.jsx'),
			ImageAssets$: resolvePath('src/components/ImageAssets.jsx'),
			SvgIcons$: resolvePath('src/components/SvgIcons.jsx'),
		},
	},

	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.(png|gif|jpg|jpeg|xml|ico)$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: 'static/img/[name].[hash:7].[ext]',
				},
			},
			{
				test: /\.(js|mjs|jsx|ts|tsx)$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
				},
			},
			{
				test: /\.scss$/,
				exclude: [/node_modules/],
				oneOf: [
					{
						test: /\.module\.scss$/,
						//test: /\.scss$/,
						use: [
							process.env.NODE_ENV !== 'production'
								? 'style-loader'
								: MiniCssExtractPlugin.loader,
							{
								loader: 'css-loader',
								options: {
									modules: {
										localIdentName:
											'[path][name]__[local]--[hash:base64:5]',
									},
									sourceMap: isEnvDevelopment,
								},
							},
							{
								loader: 'sass-loader',
								options: {
									sourceMap: isEnvDevelopment,
								},
							},
						],
					},
					{
						use: [
							process.env.NODE_ENV !== 'production'
								? 'style-loader'
								: MiniCssExtractPlugin.loader,
							{
								loader: 'css-loader',
								options: {
									sourceMap: isEnvDevelopment,
								},
							},
							{
								loader: 'sass-loader',
								options: {
									sourceMap: isEnvDevelopment,
								},
							},
						],
					},
				],
			},
			{
				test: /\.svg$/,
				use: ['svg-react-loader'],
			},
			// All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
			{
				enforce: 'pre',
				test: /\.js$/,
				loader: 'source-map-loader',
			},
		],
	},
	plugins: [
		new AntdDayjsWebpackPlugin(),
		new webpack.DefinePlugin({
			// 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
		}),
		new HtmlWebpackPlugin({
			template: resolvePath('wwwroot/template.html'),
		}),
	],
};

if (isEnvDevelopment && isEnvAnalyse) {
	webpackBaseConfig.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = webpackBaseConfig;
