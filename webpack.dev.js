'use strict';

const packageJSON           = require('./package.json');
const common                = require('./webpack.common.js');
const merge                 = require('webpack-merge');
const path                  = require('path');
const dirs                  = packageJSON.config.directories;

module.exports = merge(common, {
  mode: 'development',
  output: {   
    filename: 'scripts/main.js', 
    path: path.resolve(__dirname, dirs.development),
    publicPath: '/'
  },
  devServer: {
    contentBase: path.resolve(__dirname, dirs.development),
    compress: true,
    host: packageJSON.config.devServer.host,
    port: packageJSON.config.devServer.port,
    stats: 'minimal',
    historyApiFallback: {
      index: '/main.html'
    }
  },
  devtool: 'source-map'
});