'use strict'

require('dotenv').config()
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const path = require('path')
const devMode = process.env.NODE_ENV !== 'production'

module.exports = {
  mode: devMode ? 'development' : 'production',
  entry: {
    index: path.join(__dirname, 'src', 'index.js'),
    // app: path.join(__dirname, 'src', 'js', 'app.js'),
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
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
    ]
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
      chunks: ['index']
    }),
    new HtmlWebpackPlugin({
      filename: 'test.html',
      template: path.join(__dirname, 'src', 'views', 'test.html'),
      chunks: ['test']
    }),
    new BrowserSyncPlugin(
      {
        host: '192.168.15.11',
        port: 3000,
        proxy: 'http://localhost:8080/'
      },
      {
        reload: false
      }
    )
  ]
}
