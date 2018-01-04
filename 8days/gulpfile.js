var gulp = require('gulp');

// ######################## //
//    DEVELOPMENT images START   //
// ####################### //
var imagemin = require('gulp-imagemin');
var imageminGuetzli = require('imagemin-guetzli');
var webp = require("gulp-webp");
var svgstore = require("gulp-svgstore");
var rename = require("gulp-rename");

// Minify png + jpg and make them progressive
gulp.task('imagemin', () =>
  gulp.src('source/img-build/**/*.{png,jpg}')
  .pipe(imagemin([
    imageminGuetzli({ quality: 85 }),
    imagemin.jpegtran({ progressive: true })
  ]))
  .pipe(gulp.dest('img'))
);

// Generate webp from jpeg\png
gulp.task("webp", function() {
  gulp.src("source/img-build/**/*.{png,jpg}")
    .pipe(webp({ quality: 60 }))
    .pipe(gulp.dest("img/webp"));
});

// Minify SVG
gulp.task("svgo", function() {
  gulp.src("source/svg/*.svg")
    .pipe(imagemin([
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("img/svg"));
});

// Genetare SVG sprite from icons starting with "icon-"
gulp.task("sprite", function() {
  gulp.src("img/svg/icon-*.svg")
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("img/svg"));
});

// ######################  //
//    DEVELOPMENT images END   //
// ###################### //


// --------------------------------------------//


// ######################  //
//     BrowserSync all files START   //
// ###################### //

var browserSync = require('browser-sync');
var pug = require('gulp-pug');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");

gulp.task('browser-sync', function() {
  browserSync.init(["css/*.css", "js/*.js", "*.html", "sass/*.scss"], {
    server: {
      baseDir: "./"
    }
  });
});

// Monitor sass and pug files + sync with local server
gulp.task('default', ['sass', 'pug'], function() {
  browserSync.init({
    server: "./"
  });
  gulp.watch("sass/**/*.scss", ['sass']);
  gulp.watch("pug/**/*.pug", ['pug']);
  gulp.watch("*.html").on('change', browserSync.reload);
});

// Convert SCSS to CSS
gulp.task('sass', function() {
  gulp.src('sass/style.scss')
    .pipe(plumber())
    .pipe(sass({ includePaths: ['sass'] }))
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest('css'))
    .pipe(browserSync.stream())
});

// Convert .pug to HTML
gulp.task('pug', function buildHTML() {
  gulp.src('pug/*.pug')
    .pipe(plumber())
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest("./"))
    .pipe(browserSync.stream())
});

// #####################  //
//     BrowserSync all files END   //
// #################### //
