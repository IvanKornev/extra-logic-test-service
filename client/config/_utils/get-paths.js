const path = require('path');

const getEsLintConfig = () =>
  path.resolve(__dirname, '..', 'eslint', 'eslint.config.js');

const getPostCssConfig = () =>
  path.resolve(__dirname, '..', 'postcss', 'postcss.config.js');

const paths = {
  getEsLintConfig,
  getPostCssConfig,
};

module.exports = paths;
