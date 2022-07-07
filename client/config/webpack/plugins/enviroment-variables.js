const webpack = require('webpack');
const dotenv = require('dotenv');

const getEnviromentVariablesPlugin = () => {
  const env = dotenv.config().parsed;
  if (env.length !== 0) {
    const envKeys = Object.keys(env).reduce((prev, next) => {
      prev[`process.env.${next}`] = JSON.stringify(env[next]);
      return prev;
    }, {});
    return new webpack.DefinePlugin(envKeys);
  }
}

module.exports = getEnviromentVariablesPlugin;