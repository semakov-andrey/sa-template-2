
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
const SpriteLoaderPlugin        = require('svg-sprite-loader/plugin');
const root                      = path.resolve(__dirname, '..');
const dirs                      = packageJSON.config.directories;
const browserList               = packageJSON.config.browsers;
const entries                   = packageJSON.config.entries;

Object.keys(entries).forEach(key => entries[key] = [path.resolve(root, dirs.source, dirs.files.js, entries[key])]);

module.exports = merge(common, {
  entry: entries,
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
        'sass-loader'
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
            quality: 90
          },
          svgo: {
            plugins: [
              { removeViewBox: false },
              { convertColors: { shorthex: true }},
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
      {
        loader: 'svgo-loader',
        options: {
          plugins: [
            { removeViewBox: false },
            { convertColors: { shorthex: true }},
            { removeEmptyAttrs: false }
          ]
        }
      }]
    }]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `${dirs.files.css}[name].css`
    }),
    new SpriteLoaderPlugin({
      plainSprite: true
    })
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
          autoprefixer({
            browsers: browserList
          }),
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