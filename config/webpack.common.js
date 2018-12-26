'use strict';

const packageJSON           = require('../package.json');
const path                  = require('path');
//const MiniCssExtractPlugin  = require('mini-css-extract-plugin');
const SpriteLoaderPlugin    = require('svg-sprite-loader/plugin');
const root                  = path.resolve(__dirname, '..');
const dirs                  = packageJSON.config.directories;
const entries               = packageJSON.config.entries;

Object.keys(entries).forEach(key => entries[key] = [path.resolve(root, dirs.source, dirs.files.js, entries[key])]);
for(let folder in dirs.files) if(dirs.files[folder] !== '') dirs.files[folder] += '/';

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
          pretty: true,
          data: {
            base: '/'
          }
        }
      }]
    }, {
      test: /\.scss$/,
      use: [
        //MiniCssExtractPlugin.loader,
        'style-loader',
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
          name: `${dirs.files.fonts}[name].[ext]`
        }
      }]
    }, {
      test: /content\\.*\.(jpg|png|gif|svg|mp4)$/,
      use: [{
        loader: 'file-loader',
        options: {
          name: `${dirs.files.images}[name].[ext]`
        }
      }]
    }, {
      test: /svg\\.*\.svg$/,
      loader: 'svg-sprite-loader',
      options: {
        extract: true,
        spriteFilename: `${dirs.files.sprite}sprite.svg`
      }
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
    //new MiniCssExtractPlugin({ filename: `${dirs.files.css}[name].css` }),
    new SpriteLoaderPlugin()
  ]
};