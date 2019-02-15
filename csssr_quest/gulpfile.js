var gulp = require('gulp');

// ######################## //
// DEVELOPMENT images START //
// ####################### //

var imagemin = require('gulp-imagemin');
var svgstore = require("gulp-svgstore");
var rename = require("gulp-rename");
var imageminPngquant = require('imagemin-pngquant');
var cssmin = require("gulp-csso");
var run = require("run-sequence");
var del = require("del");
var uglify = require("gulp-uglify-es").default;
var webp = require("gulp-webp");

// Minify png
gulp.task('pngmin', () =>
  gulp.src(["app/img/**/*.png", "app/img/**/*.jpg"])
  .pipe(imagemin([
    imageminPngquant({ quality: 45 })
  ]))
  .pipe(gulp.dest('dist/img'))
)

// Minify SVG
gulp.task("svgo", function () {
  gulp.src("app/img/svg/*.svg")
    .pipe(imagemin([
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("dist/img/svg"));
});

gulp.task("webp", function() {
  return gulp.src("app/source/**/*.{png,jpg}")
    .pipe(webp({ quality: 75 }))
    .pipe(gulp.dest("app/img/webp"));
});

// Genetare SVG sprite from icons starting with "icon-"
gulp.task("sprite", function () {
  gulp.src("app/img/svg/icon_*.svg")
    .pipe(imagemin([
      imagemin.svgo()
    ]))
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("dist/img/svg"));
});

// ###################### //
// DEVELOPMENT images END //
// ###################### //


// --------------------------------------------//


//    ######################   //
// BrowserSync all files START //
//    ######################   //

var browserSync = require('browser-sync');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var pug = require('gulp-pug');
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");

// Monitor sass files + sync with local server
gulp.task('default', ['sass', 'pug'], function () {
  browserSync.init(["app/css/*.css", "app/js/*.js", "app/*.html", "app/sass/*.scss"], {
    server: "app/."
  });
  gulp.watch("app/sass/**/*.scss", ['sass']);
  gulp.watch("app/pug/**/*.pug", ['pug']);
  gulp.watch("app/*.html").on('change', browserSync.reload)
});

// Convert SCSS to CSS
gulp.task('sass', function () {
  gulp.src('app/sass/style.scss')
    .pipe(plumber())
    .pipe(sass({ includePaths: ['sass'] }))
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.stream())
});

// Convert .pug to HTML
gulp.task('pug', function buildHTML() {
  gulp.src('app/pug/*.pug')
    .pipe(plumber())
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest("app/."))
    .pipe(browserSync.stream())
});

//   #####################   //
// BrowserSync all files END //
//   #####################   //


// --------------------------------------------//


// ##### //
// Build //
// ##### //

gulp.task("copy", function () {
  return gulp.src([
      "app/*.html",
      "app/favicon.ico",
      "app/fonts/*",
      "app/img/**/*"
    ], {
      base: "./app"
    })
    .pipe(gulp.dest("dist/."));
});

gulp.task("clean", function () {
  return del("dist");
});

gulp.task("cssmin", function() {
  gulp.src("app/css/style.css")
    .pipe(cssmin())
    .pipe(gulp.dest("dist/css"));
});

gulp.task("jsmin", function () {
    gulp.src('app/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

gulp.task("build", function (done) {
  run("clean", "copy", "jsmin", "cssmin", done);
});
