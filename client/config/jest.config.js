const { getClientFolder } = require('./_get-paths');

const jestConfig = {
  testRegex: '^.+\.unit\.test\.js',
  rootDir: getClientFolder(),
  roots: [
    '<rootDir>/src',
  ],
  moduleNameMapper: {
    '^@components.*$': '<rootDir>/src/components',
    '^@api.*$': '<rootDir>/src/api',
    '^@entities.*$': '<rootDir>/src/entities',
    '^@hooks.*$': '<rootDir>/src/hooks',
    '^@data-structures.*$': '<rootDir>/src/data-structures',
    '^@lib/converters.*$': '<rootDir>/src/lib/converters',
    '^@lib/generators.*$': '<rootDir>/src/lib/generators',
    '^@lib/for-tests.*$': '<rootDir>/src/lib/for-tests',
    '^@constants.*$': '<rootDir>/src/constants',
    '^@global-states.*$': '<rootDir>/src/global-states',
  }
};

module.exports = jestConfig;
