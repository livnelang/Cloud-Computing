/**
 * Load Gulp Dependencies
 * @type {Gulp|exports|module.exports}
 */
var gulp = require('gulp'),
    less = require('gulp-less'),
    watch = require('gulp-watch'),
    concat = require('gulp-concat');

/**
 * Compiles .less files into css
 */
gulp.task('less', function() {
    gulp.src('less/*.less')
        .pipe(less())
        .pipe(gulp.dest('css'));

});

/**
 * Concats .css files into one file
 */
gulp.task('concat', function() {
    return gulp.src('css/*.css')
        .pipe(concat('all.css'))
        .pipe(gulp.dest('css'));
});

/**
 * Watch task, looks for real time updated less files & saves them
 */
gulp.task('watch', function() {
    gulp.watch('less/*.less', ['concat', 'less']);
});

