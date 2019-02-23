const gulp = require('gulp');

const cssmin = require("gulp-csso");
const run = require("run-sequence");
const del = require("del");
const uglify = require("gulp-uglify-es").default;
const browserSync = require('browser-sync');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const pug = require('gulp-pug');
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const bulkSass = require('gulp-sass-bulk-import');

//    ######################   //
// BrowserSync all files START //
//    ######################   //

// Monitor sass files + sync with local server
gulp.task('default', ['sass', 'pug'], function () {
  browserSync.init(["app/css/*.css", "app/js/*.js", "app/*.html", "app/sass/*.scss", "app/pug/**/*.scss"], {
    server: "app/."
  });
  gulp.watch("app/**/*.scss", ['sass']);
  gulp.watch("app/**/*.pug", ['pug']);
  gulp.watch("app/*.html").on('change', browserSync.reload)
});

// Convert SCSS to CSS
gulp.task('sass', function () {
  gulp.src('app/sass/style.scss')
    .pipe(bulkSass())
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
