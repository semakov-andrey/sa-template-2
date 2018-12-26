'use strict';

const packageJSON           	  = require('./package.json');
const fs                        = require('fs');
const webpack                   = require('webpack');
const del                       = require('del');
const config                    = require('./config/webpack.prod.js');
const dirs                      = packageJSON.config.directories;

//if(fs.existsSync(dirs.production)) del.sync(`${dirs.production}/**/*`);

const compiler = webpack(config);

const STATS_OPTIONS = {
  assets: false,
  colors: true,
  version: false,
  modules: false,
  hash: false,
  timings: false,
  chunks: false,
  chunkModules: false,
  reasons: true,
  cached: true,
  chunkOrigins: true
};

compiler.plugin('compile', () => console.log('Building frontend...'));

compiler.run(function(error, stats) {
  if (error) {
      console.error(error.stack || error);
      if (error.details) {
          console.error(error.details);
      }
      process.exit(1);
  }
  process.stdout.write(stats.toString(STATS_OPTIONS) + '\n');
});