var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');
var exec = require('child_process').exec;

gulp.task('sass', () => {
  return gulp.src('./dist/assets/scss/main.scss')
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(rename('bundle.css'))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/assets/css'));
});

gulp.task('sass:watch', () => {
  watch('./dist/assets/scss/**/*.scss', () => {
    gulp.start('sass');
  });
});

gulp.task('js', (cb) => {
  return gulp.src('./dist/assets/js/src/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('bundle.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/assets/js/dist'));
});

gulp.task('js:watch', () => {
  watch('./dist/assets/js/src/**/*.js', () => {
    gulp.start('js');
  });
});

gulp.task('template', (cb) => {
  exec('node template', function(err, stdout, stderr) {
    cb(err);
  });
});

gulp.task('template:watch', (cb) => {
  watch('./templates/**/*.hbs', () => {
    gulp.start('template');
  });
});

gulp.task('default', ['sass', 'js', 'sass:watch', 'js:watch']);
