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
    .pipe(gulp.dest('./www/otecnya-questions-offline'))
))

gulp.task('build_prev', ['static-files'], () => (
  gulp
    .src(['./src/app.js', './src/sw.js'])
    .pipe(
      require('webpack-stream')({
        config: webpackConfig.config
      })
    )
    .pipe(gulp.dest('./www/otecnya-questions-offline'))
))

gulp.task('static-files:watch', ['static-files'], () => {
  gulp.watch(['./src/**/*.html'], ['static-files'])
})

gulp.task('static-files', () => (
  gulp.src(['./src/index.html'])
    .pipe(require('gulp-ejs')({

    }))
    .on('error', function (err) {
      console.log(err.toString())
      this.emit('end')
    })
    .pipe(gulp.dest('./www/otecnya-questions-offline'))
    .pipe(webpackConfig.browserSync.stream())
))

gulp.task('build', ['build_prev'], () => (
  gulp.src(['./www/otecnya-questions-offline/*']).pipe(gulp.dest('./docs'))
))
