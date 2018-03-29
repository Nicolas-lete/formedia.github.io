// Gulp required plugins
var gulp = require('gulp'),
    compass = require('gulp-compass'),
    minifyCSS = require('gulp-clean-css'),
    minifyJS = require('gulp-minify'),
    minifyHTML = require('gulp-htmlmin'),
    minifyImages = require('gulp-imagemin');

// Compile SASS into CSS
gulp.task('compass', function () {
  gulp.src('builds/development/sass/styles.scss')
    .pipe(compass({
      sass: 'builds/development/sass',
      style: 'expanded'
    }))
    .pipe(gulp.dest('builds/development/css'))
});

// Minify CSS
gulp.task('minifyCSS', function() {
  gulp.src('builds/development/css/styles.css')
    .pipe(minifyCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('builds/production/css'));
});

// Minify JS
gulp.task('minifyJS', function() {
  gulp.src('builds/development/js/*.js')
    .pipe(minifyJS({
        ext:{
            src:'-.js',
            min:'.js'
        },
    }))
    .pipe(gulp.dest('builds/production/js'))
});

// Minify HTML
gulp.task('minifyHTML', function() {
  gulp.src('builds/development/*.html')
    .pipe(minifyHTML({collapseWhitespace: true}))
    .pipe(gulp.dest('builds/production'));
}); 

// Minify images
gulp.task('minifyImages', () =>
  gulp.src('builds/development/images/*')
    .pipe(minifyImages())
    .pipe(gulp.dest('builds/production/images'))
);

// Watch changes for dev
gulp.task('watch-dev', function () {
  gulp.watch('builds/development/sass/*.scss', ['compass'])
});

// Default for prod
gulp.task('prod', ['minifyCSS', 'minifyImages', 'minifyJS', 'minifyHTML']);
