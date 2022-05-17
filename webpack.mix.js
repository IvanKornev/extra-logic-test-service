const mix = require('laravel-mix');

mix
  .js('resources/js/app.js', 'public/js')
  .react()
  .extract(['react'])
  .browserSync('127.0.0.1:8000');

if (process.env.APP_ENV === 'production') {
  mix.disableNotifications();
}
