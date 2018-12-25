'use strict';

const packageJSON           = require('../package.json');
const common                = require('./webpack.common.js');
const webpack               = require('webpack');
const merge                 = require('webpack-merge');
const path                  = require('path');
const root                  = path.resolve(__dirname, '..');
const dirs                  = packageJSON.config.directories;

module.exports = merge(common, {
  mode: 'development',
  output: {
    filename: `${dirs.files.js[1]}/main.js`, 
    path: path.resolve(root, dirs.development),
    publicPath: '/'
  },
  devServer: {
    contentBase: path.resolve(root, dirs.development),
    compress: true,
    hot: true,
    quiet: false,
    inline: true,
    lazy: false,
    stats: 'minimal',
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    }
  },
  devtool: 'source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
});