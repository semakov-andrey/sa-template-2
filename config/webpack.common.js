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