var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var plumber = require('gulp-plumber');
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");

gulp.task('sass', function() {
    gulp.src('sass/style.scss')
        .pipe(plumber())
        .pipe(sass({ includePaths: ['sass'] }))
        .pipe(postcss([
            autoprefixer()
        ]))
        .pipe(gulp.dest('css'));
});

gulp.task('browser-sync', function() {
    browserSync.init(["css/*.css", "js/*.js"], {
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('default', ['sass', 'browser-sync'], function() {
    gulp.watch("sass/**/*.scss", ['sass']);
});
