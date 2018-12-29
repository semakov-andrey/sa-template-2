'use strict';

const project                   = '../../';
const fs                        = require('fs');
const path                      = require('path');
const ncp                       = require('ncp');

if(path.basename(path.resolve(__dirname, '../')) !== 'node_modules') return;

const templateJSON              = require('./package.json');
const packageJSON               = require(`${project}package.json`);

/* update readme */
if(!fs.existsSync(path.resolve(__dirname, project, 'readme.md'))) {
  ncp.ncp(path.resolve(__dirname, 'readme.md'), path.resolve(__dirname, project, 'readme.md'), error => error ? console.error('\x1b[31m%s\x1b[0m', 'Error: ' + error) : console.log('Success: readme updated'));
}

/* update compiler scripts */
ncp.ncp(path.resolve(__dirname, 'start.js'), path.resolve(__dirname, project, 'start.js'), error => error ? console.error('\x1b[31m%s\x1b[0m', 'Error: ' + error) : console.log('Success: start.js updated'));
ncp.ncp(path.resolve(__dirname, 'start.js'), path.resolve(__dirname, project, 'start.js'), error => error ? console.error('\x1b[31m%s\x1b[0m', 'Error: ' + error) : console.log('Success: build.js updated'));

/* update webpack configuration */
ncp.ncp(path.resolve(__dirname, 'config'), path.resolve(__dirname, project, 'config'), error => error ? console.error('\x1b[31m%s\x1b[0m', 'Error: ' + error) : console.log('Success: webpack configuration updated'));

/* update package.json */
delete templateJSON.dependencies['ncp'];
const scripts = { 
  start: 'node start.js',
  build: 'node build.js',
  module: 'node node_modules/sa-template-1/module.js'
};
const json = {
  ...packageJSON,
  scripts: {
    ...packageJSON.scripts,
    ...scripts
  },
  devDependencies: {
    ...packageJSON.devDependencies,
    ...templateJSON.dependencies
  },
  config: {
    devServer: templateJSON.config.devServer,
    entries: templateJSON.config.entries,
    browsers: templateJSON.config.browsers,
    ...packageJSON.config,
    directories: {
      ...templateJSON.config.directories,
      ...(packageJSON.config && packageJSON.config.directories ? packageJSON.config.directories : {}),
      files: {
        ...templateJSON.config.directories.files,
        ...(packageJSON.config && packageJSON.config.directories && packageJSON.config.directories.files ? packageJSON.config.directories.files : {})
      }
    }
  }
};
fs.writeFile(path.resolve(__dirname, project, 'package.json'), JSON.stringify(json, null, 2), 'utf8', error => error ? console.error('\x1b[31m%s\x1b[0m', 'Error: ' + error) : console.log('Success: package.json updated'));

/* update gitignore */
const gitignore = ['node_modules', 'build', '.vscode', '*.log', 'Thumbs.db', '.idea', '.grunt', '.DS_Store', 'bash.exe.stackdump', '.editorconfig', '.yo-rc.json'];
const writeGitIgnore = (data, newData = []) => {
  fs.writeFile(path.resolve(__dirname, project, '.gitignore'), [...new Set([...data, ...newData])].join('\r\n'), 'utf8', error => error ? console.error('\x1b[31m%s\x1b[0m', 'Error: ' + error) : console.log('Success: gitignore updated'));
};
if(fs.existsSync(path.resolve(__dirname, project, '.gitignore'))) {
  fs.readFile(path.resolve(__dirname, project, '.gitignore'), 'utf8', (error, data) => {
    if(error) return console.error('\x1b[31m%s\x1b[0m', 'Error: ' + error);
    writeGitIgnore(data.split('\r\n'), gitignore);
  });
} else writeGitIgnore(gitignore);