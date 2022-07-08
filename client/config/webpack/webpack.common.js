const htmlWebpackPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const getEnviromentVariablesPlugin = require('./plugins/enviroment-variables');
const ESLintPlugin = require('eslint-webpack-plugin');

const resolveRoot = require('../utils/resolve-root');
const { getEsLintConfig } = require('../utils/get-paths');

const commonConfig = {
 entry: resolveRoot('src', 'index.js'),
 output: {
   path: resolveRoot('dist'),
   filename: 'bundle.js',
   clean: true,
 },
 module: {
   rules: [
     {
       test: /\.(js|jsx)$/,
       exclude: /node_modules/,
       use: {
         loader: 'babel-loader',
       }
     },
    {
      test: /\.s[ac]ss$/i,
      use: [
        miniCssExtractPlugin.loader,
        'css-loader',
        'postcss-loader',
        'sass-loader',
      ],
    },
   ],
 },
 resolve: {
  extensions: ['.js', '.jsx'],
  alias: {
    '@components': resolveRoot('src', 'components'),
    '@api': resolveRoot('src', 'api'),
    '@entities': resolveRoot('src', 'entities'),
    '@hooks': resolveRoot('src', 'hooks'),
    '@pages': resolveRoot('src', 'pages'),
    '@data-structures': resolveRoot('src', 'data-structures'),
    '@lib': resolveRoot('src', 'lib'),
    '@constants': resolveRoot('src', 'constants'),
    '@global-states': resolveRoot('src', 'global-states'),
    '@styles': resolveRoot('src', 'styles'),
  },
 },
 plugins: [
   new htmlWebpackPlugin({
    template: resolveRoot('public', 'index.html'),
    title: 'Сервис форм',
   }),
   new ESLintPlugin({
     overrideConfigFile: getEsLintConfig(),
   }),
   new miniCssExtractPlugin(),  
   getEnviromentVariablesPlugin(),
 ],
};

module.exports = commonConfig;
