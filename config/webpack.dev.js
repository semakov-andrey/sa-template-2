'use strict';

const packageJSON               = require('../package.json');
const common                    = require('./webpack.common.js');
const webpack                   = require('webpack');
const merge                     = require('webpack-merge');
const path                      = require('path');
const autoprefixer              = require('autoprefixer');
const MiniCssExtractPlugin      = require('mini-css-extract-plugin');
const root                      = path.resolve(__dirname, '..');
const dirs                      = packageJSON.config.directories;
const browserList               = packageJSON.config.browsers;
const entries                   = packageJSON.config.entries;
const configServer           	  = require('../package.json').config.devServer;

Object.keys(entries).forEach(key => entries[key] = [path.resolve(root, dirs.source, dirs.files.js, entries[key])]);
entries.main.unshift(`webpack-dev-server/client?http://localhost:${configServer.port}`, 'webpack/hot/dev-server');

module.exports = merge(common, {
  entry: entries,
  mode: 'development',
  output: {
    path: path.resolve(root, dirs.development)
  },
  module: {
    rules: [{
      test: /\.pug$/,
      use: [{
        loader: 'file-loader',
        options: {
          name: `${dirs.files.html}[name].html`
        }
      },
        'extract-loader',
      {
        loader: 'html-loader',
        options: {
          interpolate: 'require'
        }
      }, {
        loader: 'pug-html-loader',
        options: {
          pretty: true
        }
      }]
    }, {
      test: /\.scss$/,
      use: [
        MiniCssExtractPlugin.loader, {
          loader: 'css-loader',
          options: {
            sourceMap: true
          }
        }, {
          loader: 'postcss-loader',
          options: {
            sourceMap: true,
            plugins: loader => [
              autoprefixer({
                browsers: browserList
              })
            ]
          }
        }, {
          loader: 'sass-loader',
          options: {
            outputStyle: 'expanded',
            sourceMap: true
          }
        }
      ]
    }, {
      test: /content\\.*\.(jpg|png|gif|webp|svg)$/,
      use: [{
        loader: 'file-loader',
        options: {
          name: `${dirs.files.images}[name].[ext]`
        }
      }]
    }, {
      test: /svg\\.*\.svg$/,
      use: [{
        loader: 'svg-sprite-loader',
        options: {
          extract: true,
          spriteFilename: `${dirs.files.sprite}sprite.svg`
        }
      }]
    }]
  },
  devServer: {
    contentBase: path.resolve(root, dirs.development),
    compress: true,
    hot: true,
    https: configServer.secure,
    inline: true,
    lazy: false,
    quiet: false,
    stats: 'minimal',
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    }
  },
  devtool: 'source-map',
  plugins: [
    new MiniCssExtractPlugin({
      filename: `${dirs.files.css}[name].css`
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
});