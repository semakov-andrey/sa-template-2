'use strict';

const packageJSON           = require('./package.json');
const path                  = require('path');
const glob                  = require('glob');
const MiniCssExtractPlugin  = require('mini-css-extract-plugin');
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
    }, {
      test: /\.pug$/,
      use: [{
        loader: 'file-loader',
        options: {
          name: '[name].html'
        }
      },
        'extract-loader',
        'html-loader',
      {
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
    }]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles/main.css'
    })
  ]
};