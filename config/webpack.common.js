'use strict';

const packageJSON           = require('../package.json');
const path                  = require('path');
const SpriteLoaderPlugin    = require('svg-sprite-loader/plugin');
const root                  = path.resolve(__dirname, '..');
const dirs                  = packageJSON.config.directories;

for(let folder in dirs.files) if(dirs.files[folder] !== '') dirs.files[folder] += '/';

module.exports = {
  output: {
    filename: `${dirs.files.js}main.js`,
    publicPath: '/'
  },
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
      test: /\.(woff|woff2|ttf|otf)$/,
      use: [{
        loader: 'file-loader',
        options: {
          name: `${dirs.files.fonts}[name].[ext]`
        }
      }]
    }, {
      test: /content\\.*\.mp4$/,
      use: [{
        loader: 'file-loader',
        options: {
          name: `${dirs.files.images}[name].[ext]`
        }
      }]
    }, {
      test: /other\\.*$/,
      use: [{
        loader: 'file-loader',
        options: {
          name: `${dirs.files.other}[name].[ext]`
        }
      }]
    }]
  },
  plugins: [
    new SpriteLoaderPlugin()
  ]
};