'use strict';

const packageJSON           = require('../package.json');
const path                  = require('path');
const MiniCssExtractPlugin  = require('mini-css-extract-plugin');
const SpriteLoaderPlugin    = require('svg-sprite-loader/plugin');
const root                  = path.resolve(__dirname, '..');
const dirs                  = packageJSON.config.directories;
const entries               = packageJSON.config.entries;

Object.keys(entries).forEach(key => entries[key] = path.resolve(root, dirs.source, dirs.files.js[0], entries[key]));

module.exports = {
  entry: entries,
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }]
    }, {
      test: /\.pug$/,
      use: [{
        loader: 'file-loader',
        options: {
          name: '[name].html'
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
          pretty: true,
          data: {
            base: '/'
          }
        }
      }]
    }, {
      test: /\.scss$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        {
          loader: 'sass-loader',
          options: {
            outputStyle: 'expanded'
          }
        }
      ]
    }, {
      test: /\.(woff|woff2|ttf|otf)$/,
      use: [{
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[ext]'
        }
      }]
    }, {
      test: /content\\.*\.(jpg|png|gif|svg|mp4)$/,
      use: [{
        loader: 'file-loader',
        options: {
          name: 'images/[name].[ext]'
        }
      }]
    }, {
      test: /svg\\.*\.svg$/,
      loader: 'svg-sprite-loader',
      options: {
        extract: true,
        spriteFilename: 'images/sprite.svg'
      }
    }, {
      test: /other\\.*$/,
      use: [{
        loader: 'file-loader',
        options: {
          name: '[name].[ext]'
        }
      }]
    }]
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: 'styles/[name].css' }),
    new SpriteLoaderPlugin()
  ]
};