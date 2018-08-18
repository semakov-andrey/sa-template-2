'use strict';

const packageJSON           = require('./package.json');
const path                  = require('path');
const dirs                  = packageJSON.config.directories;

module.exports = {
  entry: {
    main: path.resolve(__dirname, dirs.source, packageJSON.config.entry)
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      options: {
        presets: ['env'],
        plugins: ['transform-object-rest-spread']
      }
    }]
  }
};