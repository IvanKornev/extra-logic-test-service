const path = require('path');

const getClientFolder = (...segments) =>
  path.resolve(__dirname, '..', ...segments);

const getConfigFolder = (configName) =>
  path.resolve(__dirname, `${configName}.config.js`)

const paths = {
  getClientFolder,
  getConfigFolder,
};

module.exports = paths;
