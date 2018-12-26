'use strict';

const packageJSON           	= require('./package.json');
const webpack                   = require('webpack');
const WebpackDevServer          = require('webpack-dev-server');
const config                    = require('./config/webpack.dev.js');
const devServerCofig            = packageJSON.config.devServer;

const compiler = webpack(config);
const server = new WebpackDevServer(compiler, config.devServer);

server.listen(devServerCofig.port, devServerCofig.host, error => error ? console.error('\x1b[31m%s\x1b[0m', 'Error: ' + error) : console.log(`Frontend server running at http://localhost:${devServerCofig.port}`));