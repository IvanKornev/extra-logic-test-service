const htmlWebpackPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');

const path = require('path');

const resolveRoot = (...segments) => (
  path.resolve(__dirname, ...segments)
);

const htmlPluginConfig = {
  template: resolveRoot('src', 'index.html'),
};

module.exports = {
 output: {
   path: resolveRoot('dist'),
   filename: 'bundle.js',
   clean: true,
 },
 devServer: {
   static: resolveRoot('src'),
   port: 3000,
   open: true,
   hot: true,
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
