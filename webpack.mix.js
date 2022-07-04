const mix = require('laravel-mix');
const config = require('./webpack.config');

mix
  .webpackConfig(config)
  .js('resources/js/app.js', 'public/js')
  .react()
  .sourceMaps()
  .extract(['react'])
  .browserSync('127.0.0.1:8000');

if (process.env.APP_ENV === 'production') {
  mix.disableNotifications();
}
