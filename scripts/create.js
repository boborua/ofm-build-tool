/* eslint-disable no-console */

process.on('unhandledRejection', err => {
  throw err;
});

const fs = require('fs-extra');
const path = require('path');
const os = require('os');
const execSync = require('child_process').execSync;

function isInGitRepository() {
  try {
    execSync('git rev-parse --is-inside-work-tree', { stdio: 'ignore', cwd: appPath });
    return true;
  } catch (e) {
    return false;
  }
}

function tryGitInit(appPath) {
  let didInit = false;
  const options = {
    cwd: appPath
  }
  try {
    execSync('git --version', { stdio: 'ignore', cwd: appPath });
    if (isInGitRepository(appPath)) {
      return false;
    }

    execSync('git init', { stdio: 'ignore', cwd: appPath });
    didInit = true;

    execSync('git add -A', { stdio: 'ignore', cwd: appPath });
    execSync('git commit -m "Initial commit from Build Tool"', {
      stdio: 'ignore', cwd: appPath
    });
    return true;
  } catch (e) {
    if (didInit) {
      // If we successfully initialized but couldn't commit,
      // maybe the commit author config is not set.
      // In the future, we might supply our own committer
      // like Ember CLI does, but for now, let's just
      // remove the Git files to avoid a half-done state.
      try {
        // unlinkSync() doesn't work on directories.
        fs.removeSync(path.join(appPath, '.git'));
      } catch (removeErr) {
        // Ignore.
      }
    }
    return false;
  }
}

const args = process.argv.slice(2);

const projectName = args[0];
const rootDir = process.cwd();

if (typeof projectName === 'undefined') {
  console.error('Please specify the project directory.');
  process.exit(1);
}

const projectPath = path.join(rootDir, projectName);

fs.ensureDirSync(projectPath);

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
    '@siesam/build-tool': '^0.1.1',
    typescript: '^3.1.1',
  };

  // Setup the script rules
  appPackage.scripts = {
    start: 'npm run check && npm run locale && cross-env-shell PORT=4000 build-tool start',
    build: 'npm run check && npm run locale && build-tool build',
    check: 'node ./scripts/check',
    test: 'build-tool test --env=jsdom',
    locale: 'i18n-backend --url https://www.betameo.com/i18n/api/json/project/demo',
    'fix-stylelint': 'stylelint ./src/**/*.{css,less} --fix',
    'fix-prettier': 'prettier --write ./src/**/*.{ts,js,tsx,jsx,less,css}',
    'fix-lint': 'npm run fix-stylelint && npm run fix-prettier',
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
    '*.{css,less}': ['stylelint --fix', 'prettier --write', 'git add'],
    '*.{ts,js,tsx,jsx}': ['prettier --write', 'git add'],
  };

  // set browserslist
  appPackage.browserslist = ['>0.2%', 'not dead', 'not ie <= 11', 'not op_mini all'];

  fs.writeFileSync(path.join(appPath, 'package.json'), JSON.stringify(appPackage, null, 2) + os.EOL);

  fs.copySync(path.join(ownPath, 'template'), appPath);

  fs.copySync(path.join(ownPath, '.gitignore'), path.join(appPath, '.gitignore'), { overwrite: true });

  fs.copySync(path.join(ownPath, 'tsconfig.json'), path.join(appPath, 'tsconfig.json'));

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

  fs.copySync(path.join(ownPath, '.editorconfig'), path.join(appPath, '.editorconfig'));

  fs.copySync(path.join(ownPath, '.stylelintrc'), path.join(appPath, '.stylelintrc'));

  fs.copySync(path.join(ownPath, '.vscode'), path.join(appPath, '.vscode'));

  if (tryGitInit(appPath)) {
    console.log();
    console.log('Initialized a git repository.');
  }
}
