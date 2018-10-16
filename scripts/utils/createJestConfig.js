module.exports = (resolve, rootDir) => {
  const config = {
    collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    resolver: 'jest-pnp-resolver',
    setupFiles: ['react-app-polyfill/jsdom'],
    testMatch: [
      '<rootDir>/src/**/__tests__/**/*.js?(x)',
      '<rootDir>/src/**/?(*.)(spec|test).js?(x)',
      '<rootDir>/src/**/__tests__/**/*.ts?(x)',
      '<rootDir>/src/**/?(*.)(spec|test).ts?(x)',
    ],
    setupTestFrameworkScriptFile: resolve('scripts/utils/setupTests.js'),
    testEnvironment: 'jsdom',
    testURL: 'http://localhost',
    transform: {
      '^.+\\.(js|jsx)$': resolve('config/jest/babelTransform.js'),
      '^.+\\.(ts|tsx)$': 'ts-jest',
      '^.+\\.css$': resolve('config/jest/cssTransform.js'),
      '^(?!.*\\.(js|jsx|mjs|css|json)$)': resolve('config/jest/fileTransform.js'),
    },
    transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$'],
  };
  if (rootDir) {
    config.rootDir = rootDir;
  }
  return config;
};
