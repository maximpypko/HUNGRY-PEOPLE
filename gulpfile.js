const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');
const htmlmin = require('gulp-htmlmin');

// Styles
 function taskSass() {
    gulp
        .src('app/**/*.scss')
        .pipe(sass())
        .pipe(concat('style.css'))
        .pipe(autoprefixer({cascade: true, grid: true}))
        .pipe(cleanCSS())
        .pipe(gulp.dest('dist/styles'));
};
exports.sass = taskSass;

// Images
function taskImages() {
    gulp
        .src('app/image/*.+(jpeg|jpg|svg|png|gif)')
        .pipe(newer('dist/image'))
        .pipe(imagemin())
        .pipe(gulp.dest('dist/image'));
}
exports.images = taskImages;

// Copy favicon
 function taskCopyFavicon () {
    gulp
    .src('app/*.png')
    .pipe(gulp.dest('dist'))
}
exports.copyFavicon = taskCopyFavicon ;

// Watch
 function taskWatch() {
     // watch styles
    gulp.watch('app/**/*.scss', taskSass);
    // watch image
    gulp.watch('app/image/*.+(jpeg|jpg|svg|png|gif)', taskImages);
    // watch copy files
    gulp.watch('app', taskCopyFavicon );
    // watch HTML
    gulp.watch('app/*.html', taskHtml);
}
exports.watch = taskWatch;

// HTML
function taskHtml() {
    gulp
    .src('app/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('dist'));
}
exports.html = taskHtml;


exports.build = gulp.parallel(taskSass, taskImages, taskCopyFavicon, taskHtml, taskWatch);