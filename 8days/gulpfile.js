var gulp = require('gulp');

// DEV images START
var imagemin = require('gulp-imagemin');
var imageminGuetzli = require('imagemin-guetzli');
var webp = require("gulp-webp");
var svgstore = require("gulp-svgstore");
var rename = require("gulp-rename");

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

gulp.task("svgo", function() {
  gulp.src("source/svg/*.svg")
    .pipe(imagemin([
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("img/svg"));
});

gulp.task("sprite", function() {
  gulp.src("img/svg/icon-*.svg")
    .pipe(svgstore())
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("img/svg"));
});

// DEV images END
