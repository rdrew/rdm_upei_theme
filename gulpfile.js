'use strict';

var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var imagemin = require('gulp-imagemin');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
//var cache = require('gulp-cache');


//===================
// Browsersync Proxy
//===================

gulp.task('browser-sync', function() {
    browserSync.init({
        proxy: "https://rdm-upei.researchspaces.ca/",
        serveStatic: ['.'],
        files: ['./css/style.css','./js/edux.js'],
        plugins: ['bs-rewrite-rules'],
        rewriteRules: [
            {
                match: '/themes/contrib/edux_roblib/js/edux.js',
                replace: '/js/edux.js'
            },
            {
                match: '/themes/contrib/edux_roblib/css/style.css',
                replace: '/css/style.css'
            }
        ]
    });
});


//====================
// Sass Compilation
//===================

gulp.task('sass', function () {
  return gulp.src('./css/sass/**/*.scss')
        .pipe(sass({
            //includePaths: ['./node_modules/breakpoint-sass/stylesheets']
        }))
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./css'));
});

//====================
// JS Concatination
//===================

gulp.task('js', function () {
    gulp.src('./src/js/*.js') // path to your files
    .pipe(concat('js.js'))  // concat and name it "concat.js"
    .pipe(gulp.dest('./js/'));
});

//====================
// Image Optimization
//===================

gulp.task('images', function(){
    gulp.src('src/img/**/*')
    //.pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
        .pipe(imagemin([
            imagemin.jpegtran({progressive: true}),
            imagemin.optipng({optimizationLevel: 5}),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false}
                ]
            })
        ]))
        .pipe(gulp.dest('img/'));
});

//==================
// Default Gulp Task
//=================

gulp.task ('default',['browser-sync'], function(){
    //watch sass folder and compile changes
    gulp.watch('css/sass/**/*.scss', ['sass']);
    //watch js folder and compile changes
    gulp.watch('src/js/**/*.js', ['js']);
    //watch image folder and optimize
    gulp.watch('src/img/**/*', ['images']);
});


