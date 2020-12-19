'use strict';

const gulp = require('gulp');
const { src, dest } = require('gulp');
const sync = require('browser-sync').create();
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const groupmq = require('gulp-group-css-media-queries');
const autoprefixer = require('gulp-autoprefixer');
const minify = require('gulp-clean-css');
const rename = require('gulp-rename');
const del = require('del');
const rollup = require('gulp-better-rollup');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');

function html() {
  return src('src/*.{html, ico}')
    .pipe(plumber())
    .pipe(dest('dist'))
    .pipe(sync.stream());
}

function style() {
  return src('src/sass/main.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(groupmq())
    .pipe(dest('dist/css'))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 5 versions'],
      cascade: true
    }))
    .pipe(minify())
    .pipe(rename('main.min.css'))
    .pipe(dest('dist/css'))
    .pipe(sync.stream());
}

function js() {
  return src('src/js/index.js')
    .pipe(plumber())
    .pipe(babel({
      presets: ['@babel/preset-env']
    }))
    .pipe(sourcemaps.init())
    .pipe(rollup({}))
    .pipe(sourcemaps.write(''))
    .pipe(dest('dist/js'))
    .pipe(sync.stream());
}

function fonts() {
  return src('src/fonts/*')
    .pipe(dest('dist/fonts'))
    .pipe(sync.stream());
}

function img() {
  return src('src/img/**/*')
    .pipe(dest('dist/img'))
    .pipe(sync.stream());
}

function serve() {
  sync.init({
    server: {
      baseDir: './dist'
    },
    port: 8800,
    notify: false,
    open: true
  });

  gulp.watch('src/sass/**/*.scss', style);
  gulp.watch('src/*.html').on('change', e => {
    if (e.type !== 'deleted') {
      html();
    }
  });
  gulp.watch('src/js/**/*.js', js);
  gulp.watch('src/fonts/**/*', fonts);
}

function clean() {
  return del('dist');
}

const build = gulp.series(clean, gulp.parallel(html, style, js, fonts, img));
const start = gulp.parallel(build, serve);

exports.style = style;
exports.clean = clean;
exports.build = build;
exports.start = start;
exports.default = start;
