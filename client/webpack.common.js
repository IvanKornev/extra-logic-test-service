const htmlWebpackPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');

const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');

const env = dotenv.config().parsed;
const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

const htmlPluginConfig = {
  template: path.resolve(__dirname, 'src', 'index.html'),
};

const commonConfig = {
 entry: path.resolve(__dirname, 'src', 'index.js'),
 output: {
   path: path.resolve(__dirname, 'dist'),
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
    '@components': path.resolve(__dirname, 'src', 'components'),
    '@api': path.resolve(__dirname, 'src', 'api'),
    '@entities': path.resolve(__dirname, 'src', 'entities'),
    '@hooks': path.resolve(__dirname, 'src', 'hooks'),
    '@pages': path.resolve(__dirname, 'src', 'pages'),
    '@data-structures': path.resolve(__dirname, 'src', 'data-structures'),
    '@lib': path.resolve(__dirname, 'src', 'lib'),
    '@constants': path.resolve(__dirname, 'src', 'constants'),
    '@global-states': path.resolve(__dirname, 'src', 'global-states'),
    '@styles': path.resolve(__dirname, 'src', 'styles'),
  },
 },
 plugins: [
   new htmlWebpackPlugin(htmlPluginConfig),
   new miniCssExtractPlugin(),
   new webpack.DefinePlugin(envKeys),
 ],
};

module.exports = commonConfig;
