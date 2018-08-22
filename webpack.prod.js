'use strict';

const packageJSON           = require('./package.json');
const common                = require('./webpack.common.js');
const merge                 = require('webpack-merge');
const path                  = require('path');
const PostCSSAssetsPlugin   = require('postcss-assets-webpack-plugin');
const autoprefixer          = require('autoprefixer');
const cssnano               = require('cssnano');
const del                   = require('del');
const dirs                  = packageJSON.config.directories;

del.sync(path.resolve(__dirname, dirs.production));

module.exports = merge(common, {
  mode: 'production',
  output: {   
    filename: 'scripts/main.js', 
    path: path.resolve(__dirname, dirs.production),
    publicPath: '/'
  },
  optimization: {
    minimizer: [
      new PostCSSAssetsPlugin({
        test: /\.css$/,
        log: false,
        plugins: [
          autoprefixer({ browsers: packageJSON.config.browserList }),
          cssnano({
            preset: ['default', {
              discardComments: {
                removeAll: true,
              },
            }]
          })
        ],
      })
    ]
  }
});