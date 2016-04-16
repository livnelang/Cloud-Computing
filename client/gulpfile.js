var gulp = require('gulp');

//include plugins
var less = require('gulp-less'),
    watch = require('gulp-watch');

gulp.task('less', function() {
    gulp.src('less/*.less')
        .pipe(less())
        .pipe(gulp.dest('css'))
});


gulp.task('watch', function() {
    gulp.watch('less/*.less', ['less']);
});