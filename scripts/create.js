/* eslint-disable no-console */

process.on('unhandledRejection', err => {
  throw err;
});

const fs = require('fs-extra');
const path = require('path');
const os = require('os');

const args = process.argv.slice(2);

const projectName = args[0];
const rootDir = process.cwd();

if (typeof projectName === 'undefined') {
  console.error('Please specify the project directory.');
  process.exit(1);
}

const projectPath = path.join(rootDir, projectName);

if (fs.existsSync(projectPath)) {
  console.error(`Project Name: ${projectName} is exist in ${projectPath}.`);
  process.exit(1);
} else {
  fs.ensureDirSync(projectPath);
}

create(projectName, path.join(rootDir, projectName));

function create(appName, appPath) {
  const ownPath = path.dirname(require.resolve(path.join(__dirname, '..', 'package.json')));

  const appPackage = {};

  appPackage.name = appName;
  appPackage.version = '0.0.0';
  appPackage.privete = true;

  appPackage.dependencies = {
    '@siesam/ajax': '0.1.0',
    '@siesam/history': '0.0.4',
    '@siesam/pubgd': '0.1.0-beta-3',
    antd: '^3.10.0',
    classnames: '^2.2.5',
    'deep-extend': '^0.6.0',
    'i18n-backend': '^0.1.13',
    'js-cookie': '^2.2.0',
    moment: '2.20.1',
    'query-string': '^5.0.1',
    react: '^16.5.2',
    'react-dom': '^16.5.2',
    'react-redux-loading-bar': '2.9.3',
    'react-router-dom': '^4.3.1',
    resa: '^4.0.0-beta-5',
  };

  appPackage.devDependencies = {
    '@types/node': '^9.6.6',
    '@types/react': '^16.4.16',
    '@types/react-dom': '^16.0.9',
    '@types/react-router-dom': '^4.3.0',
    '@siesam/build-tool': '^0.1.0',
    typescript: '^3.1.1',
    'postcss-cli': '^6.0.1',
    'postcss-sorting': '^4.0.0',
  };

  // Setup the script rules
  appPackage.scripts = {
    start: 'npm run check && npm run locale && cross-env-shell PORT=4000 build-tool start',
    build: 'npm run check && npm run locale && build-tool build',
    check: 'node ./scripts/check',
    test: 'build-tool test --env=jsdom',
    locale: 'i18n-backend --url https://www.betameo.com/i18n/api/json/project/demo',
    'fix-prettier': 'prettier --write ./src/**/*.{ts,js,tsx,jsx,css,less}',
    'fix-postcss': 'postcss -c postcss.config.js  --no-map -r ./src/**/*.{css,less}',
    'fix-lint': 'npm run fix-postcss && npm run fix-prettier',
  };

  appPackage.jest = {
    globals: {
      'ts-jest': {
        tsConfig: 'tsconfig.test.json',
      },
    },
  };

  // Setup the git hooks
  appPackage.husky = {
    hooks: {
      'pre-commit': 'lint-staged',
    },
  };
  appPackage['lint-staged'] = {
    '*.{css,less}': ['postcss -c postcss.config.js  --no-map -r', 'prettier --write', 'git add'],
    '*.{ts,js,tsx,jsx}': ['prettier --write', 'git add'],
  };

  // set browserslist
  appPackage.browserslist = ['>0.2%', 'not dead', 'not ie <= 11', 'not op_mini all'];

  fs.writeFileSync(path.join(appPath, 'package.json'), JSON.stringify(appPackage, null, 2) + os.EOL);

  fs.copySync(path.join(ownPath, 'template'), appPath);

  fs.copySync(path.join(ownPath, '.gitignore'), path.join(appPath, '.gitignore'), { overwrite: true });

  fs.copySync(path.join(ownPath, 'postcss.config.js'), path.join(appPath, 'postcss.config.js'));

  const tsConfig = require(path.join(ownPath, 'tsconfig.json'));
  tsConfig.compilerOptions.paths = {
    config: ['src/config/index'],
  };
  fs.writeFileSync(path.join(appPath, 'tsconfig.json'), JSON.stringify(tsConfig, null, 2) + os.EOL);

  const tsTestConfig = {
    extends: './tsconfig.json',
    compilerOptions: {
      module: 'commonjs',
      jsx: 'react',
      target: 'es5',
      esModuleInterop: true,
    },
  };
  fs.writeFileSync(path.join(appPath, 'tsconfig.test.json'), JSON.stringify(tsTestConfig, null, 2) + os.EOL);

  fs.copySync(path.join(ownPath, 'webpack.config.js'), path.join(appPath, 'webpack.config.js'));

  fs.copySync(path.join(ownPath, '.prettierrc'), path.join(appPath, '.prettierrc'));

  fs.copySync(path.join(ownPath, '.vscode'), path.join(appPath, '.vscode'));
}
