'use strict';
const gulp = require('gulp');
const lint = require('gulp-eslint');
const mocha = require('gulp-mocha');

var paths = ['*.js', 'test/*js', 'lib/*js'];
var tests = ['test/*js'];

gulp.task('lint', function() {
  return gulp.src(paths)
    .pipe(lint())
    .pipe(lint.format());
});

gulp.task('mocha', function() {
  return gulp.src(tests)
    .pipe(mocha({reporter: 'nyan'}));
});

gulp.task('default', ['lint', 'mocha']);

gulp.watch(paths, function(){
  gulp.run('default');
});
