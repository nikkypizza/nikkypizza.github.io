var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var imageminGuetzli = require('imagemin-guetzli');

gulp.task('imagemin', () =>
  gulp.src('source/img-build/**/*.{png,jpg}')
  .pipe(imagemin([
    imageminGuetzli({ quality: 85 }),
    imagemin.jpegtran({ progressive: true })
  ]))
  .pipe(gulp.dest('img'))
);
