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
  return gulp.src('./templates/scss/main.scss')
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
  watch('./templates/scss/**/*.scss', () => {
    gulp.start('sass');
  });
});

gulp.task('js', (cb) => {
  // return gulp.src('./dist/assets/js/src#<{(||)}>#*.js')
  return gulp.src('./templates/js/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(concat('bundle.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/assets/js'));
});

gulp.task('js:watch', () => {
  watch('./templates/js/**/*.js', () => {
    gulp.start('js');
  });
});

gulp.task('template', (cb) => {
  exec('node template', function(err, stdout, stderr) {
    cb(err);
  });
});

gulp.task('template:watch', (cb) => {
  watch([
    './templates/**/*.hbs',
    './templates/data/*.json'
  ], () => {
    gulp.start('template');
  });
});

gulp.task('default',
          ['sass',
            'js',
            'template',
            'sass:watch',
            'js:watch',
            'template:watch' ]);
