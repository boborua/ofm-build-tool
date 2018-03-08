const path = require('path');
const autoprefixer = require('autoprefixer');

module.exports = function getLessLoader(cssModules, getLocalIdent, localIdentName) {
    const loaders = [];

    loaders.push({
        loader: 'cache-loader',
        options: {
            cacheDirectory: path.resolve('node_modules/.cache-loader'),
        },
    });

    if (cssModules) {
        loaders.push({
            loader: require.resolve('typings-for-css-modules-loader'),
            options: {
                importLoaders: 2,
                minimize: true,
                sourceMap: true,
                modules: true,
                getLocalIdent: getLocalIdent,
                localIdentName: localIdentName,
                namedExport: true,
                camelCase: true,
            },
        });
    } else {
        loaders.push({
            loader: require.resolve('css-loader'),
            options: {
                importLoaders: 2,
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
                '@primary-color': '#697882',
                '@icon-url': '"/fonts/iconfont"',
            },
            sourceMap: true,
        },
    });

    return loaders;
}
