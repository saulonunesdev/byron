'use strict'

require('dotenv').config()
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const StylelintPlugin = require('stylelint-webpack-plugin')
const path = require('path')
const devMode = process.env.NODE_ENV !== 'production'

module.exports = {
  mode: devMode ? 'development' : 'production',
  entry: {
    index: path.join(__dirname, 'src', 'js', 'index.js'),
    other: path.join(__dirname, 'src', 'js', 'other.js')
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
    contentBase: './dist',
    publicPath: '/static/',
    hot: devMode
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          { loader: 'css-loader', options: { sourceMap: devMode } },
          { loader: 'postcss-loader', options: { sourceMap: devMode } }
        ]
      },
      {
        test: /\.jpe?g$|\.ico$|\.gif$|\.png$|\.woff$|\.ttf$|\.wav$|\.mp3$/,
        loader: 'file-loader?name=[name].[ext]'
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        enforce: 'pre',
        loaders: ['eslint-loader', 'standard-loader']
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
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
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    new StylelintPlugin({
      context: 'src/css',
      files: '*.css'
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname, 'src', 'views', 'index.html'),
      chunks: ['index', 'styles']
    }),
    new HtmlWebpackPlugin({
      filename: 'other.html',
      template: path.join(__dirname, 'src', 'views', 'other.html'),
      chunks: ['other', 'styles']
    }),
    new BrowserSyncPlugin(
      {
        host: '192.168.15.11',
        port: 3000,
        proxy: 'http://localhost:8080/static/'
      },
      {
        reload: true
      }
    )
  ]
}
