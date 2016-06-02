var gulp = require('gulp');
var sass = require('gulp-sass');
var connect = require('gulp-connect');
var open = require('gulp-open');
var concat = require('gulp-concat');
var replace = require('gulp-replace');
var uglify = require('gulp-uglify');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var wrap = require("gulp-wrap");

var VG_APP_WRAPPER = '(function (window, angular) {\n\r \'use strict\';\n\r\n\r  var vg = angular.module(\'fps.vigor\', []);\n\r<%= contents %>\n\r}(window, window.angular));';

// Autoprefixer options
var autoprefixerOptions = {
  browsers: ['last 2 versions']
};

gulp.task('sass', function () {
  return gulp.src('./sass/styles.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('connect', function() {
  connect.server({
    root: ['./', './demo'],
    port: 9001,
    livereload: true
  });
});

gulp.task('reload', function() {
  gulp.src('./demo/*.html')
    .pipe(connect.reload());
});

gulp.task('watch', function() {
  gulp.watch(['./demo/*.*'], ['reload']);
  gulp.watch('./sass/**/*.*', ['sass', 'reload']);
  gulp.watch('./js/**/*.*', ['build:src', 'reload']);
});

gulp.task('open', function() {
  var options = {
    uri: 'http://localhost:9001'
  };
  gulp.src(__filename)
    .pipe(open(options));
});

gulp.task('build:src', function() {
  gulp.src('./js/vg/**/*.js')
    .pipe(replace(/\s\s'use strict';\n/g, ''))
    .pipe(replace(/'use strict';\n/g, ''))
    .pipe(concat('vigor.js'))
    .pipe(wrap(VG_APP_WRAPPER))
    .pipe(gulp.dest('./dist'));
});

gulp.task('serve', ['sass', 'build:src', 'connect', 'open', 'watch']);
