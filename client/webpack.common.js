const htmlWebpackPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');

const path = require('path');

const htmlPluginConfig = {
  template: path.resolve(__dirname, 'src', 'index.html'),
};

const commonConfig = {
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
 plugins: [
   new htmlWebpackPlugin(htmlPluginConfig),
   new miniCssExtractPlugin(),
 ],
};

module.exports = commonConfig;
