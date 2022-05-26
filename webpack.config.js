const path = require('path');

const config = {
  resolve: {
    extensions: ['js', 'jsx'],
    alias: {
      '@components': path.resolve(__dirname, './resources/js/src/components'),
      '@services': path.resolve(__dirname, './resources/js/src/services'),
      '@domains': path.resolve(__dirname, './resources/js/src/domains'),
      '@hooks': path.resolve(__dirname, './resources/js/src/hooks'),
    }
  },
};

module.exports = config;
