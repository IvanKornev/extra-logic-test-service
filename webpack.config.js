const path = require('path');

const config = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: 'sass-loader',
      },
    ],
  },
  resolve: {
    extensions: ['js', 'jsx', 'test.js'],
    alias: {
      '@components': path.resolve(__dirname, './resources/js/src/components'),
      '@api': path.resolve(__dirname, './resources/js/src/api'),
      '@entities': path.resolve(__dirname, './resources/js/src/entities'),
      '@hooks': path.resolve(__dirname, './resources/js/src/hooks'),
      '@data-structures': path.resolve(__dirname, './resources/js/src/data-structures'),
      '@lib': path.resolve(__dirname, './resources/js/src/lib'),
      '@constants': path.resolve(__dirname, './resources/js/src/constants'),
      '@global-states': path.resolve(__dirname, './resources/js/src/global-states'),
      '@styles': path.resolve(__dirname, './resources/js/src/styles'),
    }
  },
};

module.exports = config;
