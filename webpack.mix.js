const mix = require('laravel-mix');
const path = require('path');

const config = {
  resolve: {
    extensions: ['js', 'jsx'],
    alias: {
      '@': path.resolve(__dirname, './resources/js/src'),
      '@components': path.resolve(__dirname, './resources/js/src/components'),
    }
  },
};

mix
  .webpackConfig(config)
  .js('resources/js/app.js', 'public/js')
  .react()
  .extract(['react'])
  .browserSync('127.0.0.1:8000');

if (process.env.APP_ENV === 'production') {
  mix.disableNotifications();
}
