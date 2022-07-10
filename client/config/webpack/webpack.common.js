const HtmlWebpackPlugin   = require('html-webpack-plugin');
const MiniCssExtractPlugin   = require('mini-css-extract-plugin');
const getEnviromentVariablesPlugin = require('./plugins/enviroment-variables');
const ESLintPlugin = require('eslint-webpack-plugin');

const { getClientFolder, getConfigFolder } = require('../_get-paths');

const commonConfig = {
  entry: getClientFolder('src', 'index.js'),
  output: {
    path: getClientFolder('dist'),
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
          options: {
            plugins: [
              'lodash',
              [ 'babel-plugin-import', {
                libraryName: '@mui/material',
                libraryDirectory: '',
                camel2DashComponentName: false,
              }, 'core',
              ],
            ],
          },
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                config: getConfigFolder('postcss'),
              },
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@components': getClientFolder('src', 'components'),
      '@api': getClientFolder('src', 'api'),
      '@entities': getClientFolder('src', 'entities'),
      '@hooks': getClientFolder('src', 'hooks'),
      '@pages': getClientFolder('src', 'pages'),
      '@data-structures': getClientFolder('src', 'data-structures'),
      '@lib': getClientFolder('src', 'lib'),
      '@constants': getClientFolder('src', 'constants'),
      '@global-states': getClientFolder('src', 'global-states'),
      '@styles': getClientFolder('src', 'styles'),
    },
  },
  plugins: [
    new HtmlWebpackPlugin  ({
      template: getClientFolder('public', 'index.html'),
      title: 'Сервис форм',
    }),
    new ESLintPlugin({
      overrideConfigFile: getConfigFolder('eslint'),
    }),
    new MiniCssExtractPlugin  (),
    getEnviromentVariablesPlugin(),
  ],
};

module.exports = commonConfig;
