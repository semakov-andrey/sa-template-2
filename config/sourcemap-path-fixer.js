const getOptions          = require('loader-utils').getOptions;
const validateOptions     = require('schema-utils');

const schema = {
  type: 'object',
  properties: {
    sourceMap: {
      type: 'boolean'
    }
  }
};
const root = process.cwd().replace(/\\/g, '/');
const loader = function(source) {
  const options = getOptions(this);
  validateOptions(schema, options, 'SourceMap fixer');
  if (options.sourceMap) {
    source = fixer(source);
  }
  return source;
};
const fixer = source => source.replace(/"sources":\[((".+?",?)*)]/g, replacer);
const replacer = ($0, $1) => {
  if ($1) {
    const paths = $1.split(/,\s?/).map(originalPath => {
      let path = originalPath.slice(1, originalPath.length - 1);
      let foundRoot = path.lastIndexOf(root);
      if (foundRoot > -1) {
        path = path.slice(foundRoot + root.length);
        return `"webpack-internal:///.${path}"`;
      } else {
        return originalPath;
      }
    }).join(',');
    return `"sources":[${paths}]`;
  }
  return $0;
}

module.exports    = loader;
exports.fixer     = fixer;
exports.replacer  = replacer;