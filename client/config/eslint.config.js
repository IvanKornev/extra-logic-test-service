const { getClientFolder } = require('./_get-paths');

const eslintConfig = {
  parser: '@babel/eslint-parser',
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: ['plugin:react/recommended'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'prettier'],
  globals: {
    browser: true,
    before: true,
    after: true,
  },
  rules: {
    'no-alert': 'error',
    'react/react-in-jsx-scope': 'off',
    camelcase: 'error',
    'spaced-comment': 'error',
    quotes: ['error', 'single'],
    'no-use-before-define': 'off',
    'max-len': [
      'warn',
      {
        code: 80,
      },
    ],
    'no-duplicate-imports': 'error',
    'import/prefer-default-export': 'off',
    'react/prop-types': 'off',
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
      },
    ],
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx'],
      },
    ],
  },
  settings: {
    'import/resolver': {
      alias: {
        '@entities': getClientFolder('src', 'entities'),
        '@data-structures': getClientFolder('src', 'data-structures'),
        '@api': getClientFolder('src', 'api'),
        '@lib': getClientFolder('src', 'lib'),
        '@constants': getClientFolder('src', 'constants'),
        '@global-states': getClientFolder('src', 'global-states'),
      },
    },
  },
};

module.exports = eslintConfig;
