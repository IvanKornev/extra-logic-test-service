const path = require('path');

const resolveRoot = (...segments) => (
  path.resolve(__dirname, '..', '..', '..', ...segments)
);

module.exports = resolveRoot;
