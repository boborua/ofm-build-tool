const babelJest = require('babel-jest');
const babelrc = require('../babelrc');

module.exports = babelJest.createTransformer({
  babelrc: false,
  presets: babelrc.presets,
  plugins: babelrc.plugins,
});
