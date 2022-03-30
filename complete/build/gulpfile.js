var gulp = require('gulp');
var path = require('path');
var sass = require('gulp-sass')(require('sass'));
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var open = require('gulp-open');
var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");
var del = require("del");
var concat = require('gulp-concat');
var replace = require('gulp-replace');
var browserSync = require('browser-sync').create();
var fs = require('fs');
var rename = require("gulp-rename");
var Paths = {
  HERE: './',
  DIST: '../app/Views/js',
  CSS: '../app/Views/css/',
  SCSS_TOOLKIT_SOURCES: './assets/scss/argon-dashboard.scss',
  SCSS: './assets/scss/**/**'
};

gulp.task('compile-scss', function() {
  return gulp.src(Paths.SCSS_TOOLKIT_SOURCES)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write(Paths.HERE))
    .pipe(gulp.dest(Paths.CSS));
});

gulp.task("pages", function () {
    return gulp.src("./pages/*").pipe(rename(function (path) {
    
    path.extname = ".php";
  })).pipe(gulp.dest("../app/Views/pages"));
});
gulp.task("layout", function () {
    return gulp.src("./layout/*").pipe(rename(function (path) {
    
    path.extname = ".php";
  })).pipe(gulp.dest("../app/Views"));
});
gulp.task("assets", function () {
    return gulp.src("./assets/*/*.*").pipe(gulp.dest("../assets"));
});
gulp.task('buildjs', function() {
    
    return gulp.src([
            'node_modules/socket.io/client-dist/socket.io.js',
            //'node_modules/web3/dist/web3.min.js',
            'node_modules/moment/moment.js',
            'node_modules/axios/dist/axios.js',
        ])
        //.pipe(concat('web3.js'))
        //.pipe(uglify())
        .pipe(gulp.dest("./assets/js"))
        .pipe(browserSync.stream());
})

// Task which would transpile typescript to javascript
gulp.task("typescript", function () {
    return tsProject.src().pipe(tsProject()).js.pipe(gulp.dest("../assets/js"));
});

// Task which would delete the old dist directory if present
gulp.task("build-clean", function () {
    return del([Paths.DIST]);
});


// The default task which runs at start of the gulpfile.js
gulp.task("default", gulp.series("typescript","layout","buildjs","assets"), () => {
    console.log("Done");
});