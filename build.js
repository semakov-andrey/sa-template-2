'use strict';

const packageJSON           	  = require('./package.json');
const fs                        = require('fs');
const webpack                   = require('webpack');
const del                       = require('del');
const config                    = require('./config/webpack.prod.js');
const dirs                      = packageJSON.config.directories;
const statsOptions = {
  assets: false,
  builtAt: false,
  colors: true,
  children: false,
  chunks: false,
  hash: false,
  modules: false,
  version: false
};

if(fs.existsSync(dirs.production)) del.sync(`${dirs.production}/**/*`);

const compiler = webpack(config);

compiler.hooks.compile.tap('compile', () => console.log('Building frontend...'));

compiler.run((error, stats) => {
  if(error) {
    console.error(err.stack || err);
    if(err.details) console.error(err.details);
    return;
  }
  console.log(stats.toString(statsOptions));
});