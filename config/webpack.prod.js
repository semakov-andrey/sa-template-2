
'use strict';

const packageJSON               = require('../package.json');
const common                    = require('./webpack.common.js');
const merge                     = require('webpack-merge');
const path                      = require('path');
const MiniCssExtractPlugin      = require('mini-css-extract-plugin');
const autoprefixer              = require('autoprefixer');
const UglifyJsPlugin            = require('uglifyjs-webpack-plugin');
const PostCSSAssetsPlugin       = require('postcss-assets-webpack-plugin');
const cssnano                   = require('cssnano');
const root                      = path.resolve(__dirname, '..');
const dirs                      = packageJSON.config.directories;
const browserList               = packageJSON.config.browsers;

module.exports = merge(common, {
  mode: 'production',
  output: {
    path: path.resolve(root, dirs.production)
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
          interpolate: 'require',
          minimize: true,
          removeComments: true,
          collapseWhitespace: true,
          conservativeCollapse: false,
          quoteCharacter: '"',
          minifyCSS: true,
          minifyJS: true,
          removeOptionalTags: true
        }
      },
        'pug-html-loader'
      ]
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
      test: /content\\.*\.(jpg|png|gif|webp|svg)$/,
      use: [{
        loader: 'file-loader',
        options: {
          name: `${dirs.files.images}[name].[ext]`
        }
      }, {
        loader: 'image-webpack-loader',
        options: {
          mozjpeg: {
            progressive: true,
            quality: 80
          },
          gifsicle: {
            interlaced: false
          },
          optipng: {
            optimizationLevel: 7,
          },
          webp: {
            quality: 80
          },
          svgo: {
            plugins: [
              { removeViewBox: false },
              { removeEmptyAttrs: false }
            ]
          }
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
      },
        'svg-fill-loader',
        'svgo-loader'
      ]
    }]
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: `${dirs.files.css}[name].css` })
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        test: /\.js$/
      }),
      new PostCSSAssetsPlugin({
        test: /\.css$/,
        log: false,
        plugins: [
          autoprefixer({ browsers: browserList }),
          cssnano({
            preset: ['default', {
              discardComments: {
                removeAll: true,
              },
              minifyFontValues: {
                removeQuotes: false
              }
            }]
          })
        ],
      })
    ],
  },
  performance: {
    hints: 'warning',
    maxEntrypointSize: 512000,
    maxAssetSize: 4096000
  }
});