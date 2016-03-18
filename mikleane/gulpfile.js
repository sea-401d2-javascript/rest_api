'run strict';

var gulp = require('gulp');
var eslint = require('gulp-eslint');
var mocha = require('gulp-mocha');

var paths = ['*.js', 'test/*.js', 'routes/*.js', 'lib/*.js'];

gulp.task('eslint', function() {
  return gulp.src(paths)
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('mocha', function(){
  return gulp.src('test/*.js')
    .pipe(mocha({reporter: 'nyan'}));
});

gulp.task('watch', function() {
  gulp.watch('*.js', ['eslint']);
  gulp.watch('routes/*.js', ['eslint']);
  gulp.watch('lib/*.js', ['eslint']);
  gulp.watch('test/*.js', ['eslint','mocha']);
});

gulp.task('default', ['eslint', 'mocha']);
