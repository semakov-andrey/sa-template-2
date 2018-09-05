const ttf2woff2   = require('ttf2woff2');
const fs          = require('fs');
const path        = require('path');

module.exports = function ttf2woff2Loader(source) {
  console.log(this);
  let input = fs.readFileSync(this.resourcePath);
  if(!fs.existsSync(path.resolve(__dirname, '../', 'build'))) fs.mkdirSync(path.resolve(__dirname, '../', 'build'));
  fs.writeFileSync(path.resolve(__dirname, '../', 'build', 'font.woff2'), ttf2woff2(input));
  return 'module.exports = ' + JSON.stringify('456');
}