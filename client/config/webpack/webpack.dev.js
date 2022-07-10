const { merge } = require('webpack-merge');
const { getClientFolder } = require('../_get-paths');

const commonConfig = require('./webpack.common.js');

module.exports = merge(commonConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: getClientFolder('src'),
    port: 3030,
    open: true,
    hot: true,
  },
});
