// pubg的css modules生成规则

var cssLoaderGetLocalIdent = require('css-loader/lib/getLocalIdent.js');

function getLocalIdent(context, _localIdentName, localName, options) {
  const isW = /^win/.test(process.platform);
  let dir = context.resourcePath;
  if (isW) {
    dir = dir.replace(/\\/g, '/');
  }
  const match = dir.match(/\/(?:components|lib)\/(.*)\/style\/(.*)\.pubg\.less$/);
  if (match != null) {
    if (match[2] === 'index') {
      return 'pubg-' + match[1] + '-' + localName;
    }
    return 'pubg-' + match[1] + '-' + match[2] + '-' + localName;
  } else {
    return 'pubg-' + cssLoaderGetLocalIdent(context, '[local]-[hash:base64:8]', localName, options);
  }
}

module.exports = getLocalIdent;
