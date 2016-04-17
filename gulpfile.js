var gulp = require('gulp');
var sass = require('gulp-sass');
var connect = require('gulp-connect');
var open = require('gulp-open');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');

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
});

gulp.task('open', function() {
  var options = {
    uri: 'http://localhost:9001'
  };
  gulp.src(__filename)
    .pipe(open(options));
});

gulp.task('serve', ['sass', 'connect', 'open', 'watch']);
