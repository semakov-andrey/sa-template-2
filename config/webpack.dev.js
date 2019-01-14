'use strict';

const packageJSON               = require('../package.json');
const config                    = require('./webpack.common.js');
const sourcemapPathFixer        = require('./sourcemap-path-fixer.js');
const webpack                   = require('webpack');
const webpackMerge              = require('webpack-merge');
const path                      = require('path');
const autoprefixer              = require('autoprefixer');
const dirs                      = packageJSON.config.directories;
const browserList               = packageJSON.config.browsers;
const entries                   = packageJSON.config.entries;
const configServer           	  = packageJSON.config.devServer;
const protocol                  = `http${configServer.secure ? 's' : ''}:`;

Object.keys(entries).forEach((key, index) => {
  entries[key] = [path.resolve(dirs.source, dirs.files.js, entries[key])];
  if (!index) {
    entries[key].unshift(`webpack-dev-server/client?${protocol}//localhost:${configServer.port}`);
  }
});

module.exports = webpackMerge(config, {
  entry: entries,
  mode: 'development',
  output: {
    path: path.resolve(dirs.development)
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
      use: ['style-loader', {
          loader: path.resolve(__dirname, 'sourcemap-path-fixer'),
          options: {
            sourceMap: true
          }
        }, {
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
    contentBase: path.resolve('../', dirs.development),
    compress: true,
    //hot: true,
    //hotOnly: true,
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
  devtool: 'source-map'
});