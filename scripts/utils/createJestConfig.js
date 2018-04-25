const fs = require('fs');
const chalk = require('chalk');
const paths = require('../../config/paths');

module.exports = (resolve, rootDir, isEjecting) => {
  const config = {
    "collectCoverageFrom": [
      "src/**/*.{js,jsx,ts,tsx}"
    ],
    "moduleFileExtensions": [
      "ts",
      "tsx",
      "js",
      "jsx"
    ],
    "testMatch": [
      "<rootDir>/src/**/__tests__/**/*.js?(x)",
      "<rootDir>/src/**/?(*.)(spec|test).js?(x)",
      "<rootDir>/src/**/__tests__/**/*.ts?(x)",
      "<rootDir>/src/**/?(*.)(spec|test).ts?(x)"
    ],
    "testEnvironment": "node",
    "testURL": "http://localhost",
    transform: {
      "^.+\\.(js|jsx)$": resolve('config/jest/babelTransform.js'),
      "^.+\\.(ts|tsx)$": "ts-jest",
      '^.+\\.css$': resolve('config/jest/cssTransform.js'),
      '^(?!.*\\.(js|jsx|mjs|css|json)$)': resolve(
        'config/jest/fileTransform.js'
      ),
    },
    "transformIgnorePatterns": [
      "[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$"
    ],
    "testPathIgnorePatterns": [
      "<rootDir>/src/core/components/util"
    ],
    "moduleNameMapper": {
      "^util(.*)$": "<rootDir>/src/package/util$1"
    }
  };
  return config;
};
