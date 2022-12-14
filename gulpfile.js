const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const prefix = require('gulp-autoprefixer');
const minify = require('gulp-clean-css');
const terser = require('gulp-terser');
const imagemin = require('gulp-imagemin');
const imagewebp = require('gulp-webp');

// scss
function compileScss(){
  return src('src/scss/*.scss')
    .pipe(sass())
    .pipe(prefix())
    .pipe(minify())
    .pipe(dest('dist/css'))
}

// js
function jsMin(){
  return src('src/js/*.js')
    .pipe(terser())
    .pipe(dest('dist/js'))
}

// images
function optimizeImage(){
  return src('src/images/*.{jpg,png}')
  .pipe(imagemin())
  .pipe(dest('dist/images'))
}

// wedp images
function webpImage(){
  return src('dist/images/*.{jpg,png}')
    .pipe(imagewebp())
    .pipe(dest('dist/images'))
}

function watchTask(){
  watch('src/scss/*.scss', compileScss);
  watch('src/js/*.js', jsMin);
  watch('src/images/*.{jpg,png}', optimizeImage);
  watch('dist/images/*.{jpg,png}', webpImage);
}

exports.default = series(
  compileScss,
  jsMin,
  optimizeImage,
  webpImage,
  watchTask
);