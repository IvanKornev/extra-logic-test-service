const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

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
        "style-loader",
        "css-loader",
        "sass-loader",
      ],
    },
   ],
 },
 plugins: [
   new htmlWebpackPlugin(htmlPluginConfig),
 ],
};
