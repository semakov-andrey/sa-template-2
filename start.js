const config                    = require('./config/webpack.dev.js');
const configServer           	  = require('./package.json').config.devServer;
const webpack                   = require('webpack');
const WebpackDevServer          = require('webpack-dev-server');
const ifaces                    = require('os').networkInterfaces();
const protocol                  = `http${configServer.secure ? 's' : ''}:`;

const addresses = [ `${protocol}//localhost:${configServer.port}` ];
Object.keys(ifaces).forEach(ifname => {
  ifaces[ifname].forEach(iface => {
    if ('IPv4' !== iface.family || iface.internal !== false) return;
    addresses.push(`${protocol}//${iface.address}:${configServer.port}`);
  });
});

const compiler = webpack(config);
const server = new WebpackDevServer(compiler, config.devServer);
server.listen(configServer.port, configServer.host, error => {
  if (!error) {
    console.info('Frontend server:');
    addresses.forEach(address => console.info('\x1b[36m', address));
  } else {
    console.error('\x1b[31m%s\x1b[0m', `Error: ${error}`);
  }
});