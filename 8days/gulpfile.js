var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var imageminGuetzli = require('imagemin-guetzli');
var webp = require("gulp-webp");

gulp.task('imagemin', () =>
  gulp.src('source/img-build/**/*.{png,jpg}')
  .pipe(imagemin([
    imageminGuetzli({ quality: 85 }),
    imagemin.jpegtran({ progressive: true })
  ]))
  .pipe(gulp.dest('img'))
);

gulp.task("webp", function() {
  gulp.src("source/img-build/**/*.{png,jpg}")
    .pipe(webp({ quality: 60 }))
    .pipe(gulp.dest("img/webp"));
});
