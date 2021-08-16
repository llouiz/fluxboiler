var gulp = require('gulp');
var browserify = require('browserify');
var reactify = require('reactify'); // Converts jsx to js
var source = require('vinyl-source-stream'); // Converts string to a stream

gulp.task('browserify', async function () {
  browserify('./src/js/main.js')
    .transform('reactify')
    .bundle()
    .pipe(source('main.js'))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('copy', async function () {
  gulp.src('src/index.html').pipe(gulp.dest('dist'));
  gulp.src('src/css/*.*').pipe(gulp.dest('dist/css'));
  gulp.src('src/js/vendors/*.*').pipe(gulp.dest('dist/js'));
});

gulp.task('default', gulp.series('browserify', 'copy'), async function () {
  return gulp.watch('src/**/*.*', ['browserify', 'copy']);
});
