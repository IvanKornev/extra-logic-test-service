const path = require('path');

const config = {
  resolve: {
    extensions: ['js', 'jsx', 'test.js'],
    alias: {
      '@components': path.resolve(__dirname, './resources/js/src/components'),
      '@services': path.resolve(__dirname, './resources/js/src/services'),
      '@domains': path.resolve(__dirname, './resources/js/src/domains'),
      '@hooks': path.resolve(__dirname, './resources/js/src/hooks'),
      '@data-structures': path.resolve(__dirname, './resources/js/src/data-structures'),
      '@lib': path.resolve(__dirname, './resources/js/src/lib'),
      '@constants': path.resolve(__dirname, './resources/js/src/constants'),
    }
  },
};

module.exports = config;
