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
    index: path.join(__dirname, 'src', 'index.js')
  },
  output: {
    filename: '[name].[hash].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  devtool: devMode ? 'inline-source-map' : false,
  stats: {
    children: false,
    logging: 'verbose',
    outputPath: true,
    performance: true
  },
  devServer: {
    contentBase: './dist',
    historyApiFallback: true,
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
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom'
    },
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: 'css-hot-loader', options: { sourceMap: devMode } },
          {
            loader: MiniCssExtractPlugin.loader
          },
          { loader: 'css-loader', options: { sourceMap: devMode } },
          { loader: 'postcss-loader', options: { sourceMap: devMode } }
        ]
      },
      {
        test: /\.jpe?g$|\.ico$|\.gif$|\.png$|\.woff$|\.ttf$|\.wav$|\.mp3$/,
        loader: 'file-loader?name=[name].[hash].[ext]'
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      },
      {
        test: /\.js$|\.jsx$/,
        exclude: /node_modules/,
        enforce: 'pre',
        loaders: ['eslint-loader', 'standard-loader']
      },
      {
        test: /\.js$|\.jsx$/,
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
      handler: (percentage, message) => {
        console.info(percentage, message)
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
      context: 'src/styles',
      files: '*.css'
    }),
    new webpack.EnvironmentPlugin(['NODE_ENV', 'EBAY_API', 'EMAIL_API', 'MONGO_API']),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname, 'src', 'index.html'),
      chunks: ['index', 'styles']
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
