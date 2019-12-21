'use strict'

require('dotenv').config()
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const path = require('path')
const devMode = process.env.NODE_ENV !== 'production'

module.exports = {
  mode: devMode ? 'development' : 'production',
  entry: {
    app: path.join(__dirname, 'src', 'js', 'app.js'),
    test: path.join(__dirname, 'src', 'js', 'test.js')
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: devMode ? 'inline-source-map' : false,
  stats: {
    children: false
  },
  devServer: {
    contentBase: './dist'
  },
  plugins: [
    new webpack.ProgressPlugin({
      entries: true,
      modules: true,
      modulesCount: 100,
      profile: true,
      handler: (percentage, message, ...args) => {
        console.info(percentage, message, ...args)
      }
    }),
    new CleanWebpackPlugin({
      verbose: true
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname, 'src', 'views', 'app.html'),
      chunks: ['app']
    })
  ]
}
