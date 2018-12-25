'use strict';

const packageJSON           = require('../package.json');
const path                  = require('path');
const root                  = path.resolve(__dirname, '..');
const dirs                  = packageJSON.config.directories;
const entries               = packageJSON.config.entries;

Object.keys(entries).forEach(key => entries[key] = path.resolve(root, dirs.source, dirs.files.js[0], entries[key]));

module.exports = {
  entry: entries,
  module: {}
};


// rules: [{
//   test: /\.js$/,
//   exclude: /node_modules/,
//   loader: 'babel-loader',
//   options: {
//     presets: ['env'],
//     plugins: ['transform-object-rest-spread']
//   }
// }, {
//   test: /\.pug$/,
//   use: [{
//     loader: 'file-loader',
//     options: {
//       name: '[name].html'
//     }
//   },
//     'extract-loader',
//     'html-loader',
//   {
//     loader: 'pug-html-loader',
//     options: {
//       pretty: true,
//       data: {
//         base: '/'
//       }
//     }
//   }]      
// }, {
//   test: /\.scss$/,
//   use: [
//     MiniCssExtractPlugin.loader,
//     'css-loader',
//     {
//       loader: 'sass-loader',
//       options: {
//         outputStyle: 'expanded'
//       }
//     }
//   ]
// }, {
//   test: /\.ttf$/,
//   use: [{
//     loader: 'ttf2woff2-loader',
//     options: {
//       publicPath: '/fonts'
//     }
//   }]
// }]


// plugins: [
//   new MiniCssExtractPlugin({
//     filename: 'styles/main.css'
//   })
// ],
// resolveLoader: {
//   modules: [
//     'node_modules',
//     path.resolve(__dirname, 'loaders')
//   ]
// }
