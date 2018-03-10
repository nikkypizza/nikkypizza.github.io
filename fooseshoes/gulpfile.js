var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var plumber = require('gulp-plumber');
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var imagemin = require("gulp-imagemin");
var svgstore = require("gulp-svgstore");
var rename = require("gulp-rename");
var webp = require("gulp-webp");
var cssmin = require("gulp-csso");
var del = require("del");
var run = require("run-sequence")

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
  browserSync.init(["css/*.css", "js/*.js", "*.html"], {
    server: {
      baseDir: "./"
    }
  });
});

gulp.task('default', ['sass', 'browser-sync'], function() {
  gulp.watch("sass/**/*.scss", ['sass']);
});

gulp.task("images", function() {
  return gulp.src("img/**/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.optipng({ optimizationLevel: 8 }),
      imagemin.jpegtran({ progressive: true }),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("public/img"));
});

gulp.task("sprite", function() {
  return gulp.src("img/svg/icon-*.svg")
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("public/img/svg"));
});

gulp.task("webp", function() {
  return gulp.src("img/**/*.{png,jpg}")
    .pipe(webp({ quality: 85 }))
    .pipe(gulp.dest("public/img/webp"));
});


gulp.task("cssmin", function() {
  gulp.src("css/style.css")
    .pipe(cssmin())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("css/"));
});

gulp.task("clean", function () {
  return del("public");
});

gulp.task("copy", function () {
  return gulp.src([
      "fonts/**/*.{woff,woff2}",
      "*.html",
      "favicon.ico",
      "css/style.min.css"
  ], {
      base: "."
  })
  .pipe(gulp.dest("public"));
});

gulp.task("build", function (done) {
  run("clean", "sass", "copy", "images", "webp", "sprite", done);
});
