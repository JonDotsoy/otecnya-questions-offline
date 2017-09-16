const gulp = require('gulp')
const webpackConfig = require('./webpack.config.js')
const merge = require('lodash/merge')

gulp.task('watch', ['static-files:watch'], () => (
  gulp
  .src(['./src/app.js', './src/sw.js'])
  .pipe(
    require('webpack-stream')({
      config: webpackConfig.config,
      watch: true
    })
  )
  .pipe(gulp.dest('./www'))
))

gulp.task('static-files:watch', ['static-files'], () => {
  gulp.watch(['./src/**/*.html'], ['static-files'])
})

gulp.task('static-files', () => (
  gulp.src(['./src/index.html'])
  .pipe(gulp.dest('./www'))
  .pipe(webpackConfig.browserSync.stream())
))

