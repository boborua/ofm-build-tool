const path = require('path');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = function getLessLoader(env, cssModules, getLocalIdent, localIdentName, shouldUseRelativeAssetPaths) {
  const loaders = [];

  if (env === 'dev') {
    loaders.push({
      loader: 'cache-loader',
      options: {
        cacheDirectory: path.resolve('node_modules/.cache-loader'),
      },
    });
  }

  loaders.push({
    loader: MiniCssExtractPlugin.loader,
    options: Object.assign({}, shouldUseRelativeAssetPaths ? { publicPath: '../../' } : undefined),
  });

  if (cssModules) {
    const options = {
      importLoaders: 3,
      minimize: true,
      sourceMap: true,
      modules: true,
      getLocalIdent: getLocalIdent,
      localIdentName: localIdentName,
      namedExport: true,
      camelCase: true,
    };
    loaders.push({
      loader: require.resolve('css-loader'),
      options: options,
    });
  } else {
    loaders.push({
      loader: require.resolve('css-loader'),
      options: {
        importLoaders: 3,
        minimize: true,
        sourceMap: true,
      },
    });
  }

  loaders.push({
    loader: require.resolve('postcss-loader'),
    options: {
      ident: 'postcss',
      plugins: () => [
        require('postcss-flexbugs-fixes'),
        autoprefixer({
          browsers: [
            '>1%',
            'last 4 versions',
            'Firefox ESR',
            'not ie < 10', // React doesn't support IE8 anyway
          ],
          flexbox: 'no-2009',
        }),
      ],
    },
  });

  loaders.push({
    loader: require.resolve('less-loader'),
    options: {
      modifyVars: {
        '@primary-color': '#23b9b9',
        '@icon-url': '"/fonts/iconfont"',
      },
      sourceMap: true,
    },
  });

  return loaders;
};
