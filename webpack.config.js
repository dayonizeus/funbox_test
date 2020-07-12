const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  	entry: {
      index: './src/index.js',
    },
  	devServer: {
      stats: 'errors-only',
  		contentBase: path.resolve(__dirname, 'dist')
  	},
  	plugins: [
  		new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: './src/index.pug',
        filename: 'index.html'
      }),
      new MiniCssExtractPlugin({
        filename: 'style.css'
      })
  	],
  	output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  	},
  	module: {
  		rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader'
          }
        },
  			{
  				test: /\.scss$/,
  				use: [
  					//Создает файл со стилями в dist
  					MiniCssExtractPlugin.loader,
  					//Компилирует CSS в JS 
  					'css-loader',
  					//Компилирует SCSS в CSS
  					'sass-loader',
  					//Позволяет использовать конструкцию типа @import './**/*.scss';
  					'import-glob-loader'
  					]
  			},
  			{
  				test: /\.pug$/,
  				loader: {
  					loader: 'pug-loader',
  				}
  			},
  			{
  				test: /\.(woff|ttf|svg)$/,
  				loader: [{
            loader: 'file-loader',
            options: {
              outputPath: 'assets/fonts'
            }
          }]
  			},
        {
          test: /\.(png)$/,
          loader: [{
            loader: 'file-loader',
            options: {
              outputPath: 'assets/img'
            }
          }]
        }
  		]
  	}
}