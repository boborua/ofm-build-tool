const path = require('path');
const fs = require('fs');

function getCustomWebpackConfig(rootPath, config, paths) {
  const filePath = path.join(rootPath, 'webpack.config.js');
  if (fs.existsSync(filePath)) {
    const customGenerate = require(filePath);
    return customGenerate(config, paths);
  }
  return config;
}

module.exports = getCustomWebpackConfig;
