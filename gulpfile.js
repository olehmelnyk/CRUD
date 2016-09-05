'use strict';

/**
 * browserify
 *      https://www.npmjs.com/package/gulp-browserify
 *      THIS PLUGIN IS NO LONGER MAINTAINED
 *
 * browser-sync
 *      https://www.npmjs.com/package/browser-sync
 *      https://www.browsersync.io/docs/gulp
 */

const gulp = require('gulp');

// JS
const eslint = require('gulp-eslint');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');

// CSS
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const concatCss = require('gulp-concat-css');
const cleanCSS = require('gulp-clean-css');

// HTML
const htmlmin = require('gulp-htmlmin');

// Other
const del = require('del');
const browserSync = require('browser-sync').create();


gulp.task('lint', () => {
    return gulp.src(['**/*.js', '!node_modules/**'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
        .pipe(eslint.result(result => {
            // Called for each ESLint result.
            console.log(`ESLint result: ${result.filePath}`);
            console.log(`# Messages: ${result.messages.length}`);
            console.log(`# Warnings: ${result.warningCount}`);
            console.log(`# Errors: ${result.errorCount}`);
        }));
});

gulp.task('browserify', () => {
    console.warn(`Can't find proper gulp plugin for browserify - https://www.npmjs.com/package/gulp-browserify is no longer maintained`);
    process.exit();
});

gulp.task('babel', () => {
    return gulp.src(['**/*.js', '!node_modules/**'])
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist'));
});

gulp.task('html', () => {
    return gulp.src(['**/*.html', '!node_modules/**'])
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist'));
});

gulp.task('sass', () => {
    return gulp.src(['**/*.scss', '**/*.sass'])
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css'));
});

gulp.task('css', ['sass'], () => {
    return gulp.src(['**/*.css', '!node_modules/**'])
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(sourcemaps.init())
        .pipe(concatCss('app.css'))
        .pipe(cleanCSS())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist'));
});

gulp.task('js', ['lint', 'babel'], () => {
    console.log('JS Done');
});

gulp.task('clean', () => {
    return del('dist');
});

gulp.task('build', ['clean', 'html', 'css', 'js'], () => {
    console.log('Build Done');
});

// not sure about this task
//gulp.task('serve', ['build'], () => {
//    browserSync.init({
//        server: "./spa/"
//    });
//
//    gulp.watch("**/*.html").on('change', browserSync.reload);
//    gulp.watch("**/*.css").on('change', browserSync.reload);
//    gulp.watch("**/*.js").on('change', browserSync.reload);
//});

//gulp.task('default', ['serve']);