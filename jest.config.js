const jestConfig = {
    roots: [
      '<rootDir>/resources/js/src',
    ],
    moduleNameMapper: {
      '^@components.*$': '<rootDir>/resources/js/src/components',
      '^@api.*$': '<rootDir>/resources/js/src/api',
      '^@entities.*$': '<rootDir>/resources/js/src/entities',
      '^@hooks.*$': '<rootDir>/resources/js/src/hooks',
      '^@data-structures.*$': '<rootDir>/resources/js/src/data-structures',
      '^@lib/converters.*$': '<rootDir>/resources/js/src/lib/converters',
      '^@lib/generators.*$': '<rootDir>/resources/js/src/lib/generators',
      '^@lib/tests.*$': '<rootDir>/resources/js/src/lib/tests',
      '^@constants.*$': '<rootDir>/resources/js/src/constants',
      '^@global-states.*$': '<rootDir>/resources/js/src/global-states'
    }
};

module.exports = jestConfig;
