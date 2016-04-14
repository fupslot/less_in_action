var gulp = require('gulp');
var sass = require('gulp-sass');
var connect = require('gulp-connect');
var open = require('gulp-open');


gulp.task('sass', function () {
  return gulp.src('./sass/styles.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./sass/**/*.*', ['sass']);
});

gulp.task('connect', function() {
  connect.server({
    root: './',
    port: 9001,
    livereload: true
  });
});

gulp.task('open', function() {
  var options = {
    uri: 'http://localhost:9001'
  };
  gulp.src(__filename)
    .pipe(open(options));
});

gulp.task('serve', ['sass', 'connect', 'open', 'sass:watch']);
