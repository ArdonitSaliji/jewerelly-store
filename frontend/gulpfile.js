// core
var gulp = require('gulp');

// sass
var sass = require('gulp-sass')(require('sass'));
var autoprefixer = require('gulp-autoprefixer');

// js
var babel = require('gulp-babel');

// css + js
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var notify = require('gulp-notify');
var include = require('gulp-include');
var rename = require('gulp-rename');
var ignore = require('gulp-ignore');
var cleanCSS = require('gulp-clean-css');

// paths
var paths = {
  base: './',
  sass: './sass/**/*.scss',
  css: './public/css/',
};

var onError = function (err) {
  notify.onError({
    title: 'Gulp error in ' + err.plugin,
    Error: '<%= error.message %>',
  })(err);
  this.emit('end');
};

// SASS
function style() {
  return gulp
    .src(paths.sass, { base: paths.base + 'sass/' })
    .pipe(plumber({ errorHandler: onError }))
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(
      autoprefixer({
        browsers: ['last 2 versions', 'IE 11'],
        remove: true,
      })
    )
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(gulp.dest(paths.css));
}

function watch() {
  gulp.watch(paths.sass, style);
}

// Don't forget to expose the task!
exports.default = watch;
exports.style = style;
