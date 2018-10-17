// pubg的css modules生成规则
function getLocalIdent(context, _localIdentName, localName, _options) {
  const isW = /^win/.test(process.platform);
  let dir = context.resourcePath;
  if (isW) {
    dir = dir.replace(/\\/g, '/');
  }
  const match = dir.match(/\/(?:components|lib)\/(.*)\/style\/(.*)\.pubg\.less$/);
  if (match == null) {
    throw new Error('Should put less file in components/[name]/style directory! Please check file ' + localName);
  }
  if (match[2] === 'index') {
    return 'pubg-' + match[1] + '-' + localName;
  }
  return 'pubg-' + match[1] + '-' + match[2] + '-' + localName;
}

module.exports = getLocalIdent;
