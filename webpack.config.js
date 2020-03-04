// https://linguinecode.com/post/how-to-setup-webpack-dev-server-react-babel

const path = require('path');
const fs = require('fs');

const HtmlWebPackPlugin = require('html-webpack-plugin');

// App directory
const appDirectory = fs.realpathSync(process.cwd());

// Gets absolute path of file within app directory
const resolveAppPath = relativePath => path.resolve(appDirectory, relativePath);

// Host
const host = process.env.HOST || 'localhost';

const htmlPlugin = new HtmlWebPackPlugin({
	template: './src/index.html',
	filename: './index.html'
});

module.exports = { 
	entry: './src/index.js',
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'dist')
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: ['babel-loader', 'eslint-loader']					
			}, 
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			}
		]
	},
	devServer: {
		contentBase: resolveAppPath('dist'),
		// Enable compression
		compress: true,
		host,
		// Enable hot reloading
		port: 5000,
		// Public path is root of content base
		publicPath: '/'
	},	
	plugins: [htmlPlugin] 
}