const gulp = require('gulp');
const sass = require('gulp-sass');
const csso = require('gulp-csso');
const gulpjsminify = require('gulp-minify');
const gulprename = require('gulp-rename')
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const babel = require('gulp-babel');

function style () {  
    return gulp.src('./src/scss/**/*.scss')
    .pipe(sass())
    .pipe(postcss([autoprefixer()]))
    .pipe(gulp.dest('./dist/assets/css'))
}

function styleMin () {  
    return gulp.src('./src/scss/**/*.scss')
    .pipe(sass())
    .pipe(postcss([autoprefixer()]))
    .pipe(csso())
    .pipe(gulprename(function(path) {
        path.basename += ".min"
    }))
    .pipe(gulp.dest('./dist/assets/css'))
}

function jsMinify () {
    return gulp.src('./src/js/**/main.js')
    .pipe(babel())
    .pipe(gulpjsminify())
    .pipe(gulp.dest('./dist/assets/js'))
}

function watch () {
    gulp.watch('./src/scss/**/*.scss' , style);
    gulp.watch('./src/scss/**/*.scss' , styleMin);
    gulp.watch('./src/js/**/*.js' , jsMinify);
}

exports.style = style;
exports.styleMin = styleMin;
exports.jsMinify = jsMinify;
exports.watch = watch;