const path = require('path');

const getEsLintConfig = () =>
  path.resolve(__dirname, '..', 'eslint', 'eslint.config.js');

const paths = {
  getEsLintConfig,
};

module.exports = paths;
