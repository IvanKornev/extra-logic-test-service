const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const resolveRoot = require('./utils/resolve-root');

module.exports = merge(commonConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: resolveRoot('src'),
    port: 3030,
    open: true,
    hot: true,
  },
});
