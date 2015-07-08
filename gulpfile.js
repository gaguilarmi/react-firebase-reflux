var gulp = require("gulp");
var browserify = require('browserify');
var source = require("vinyl-source-stream");
var uglify = require("gulp-uglify");
var buffer = require('vinyl-buffer');
var rename = require('gulp-rename');

var mbf = require('main-bower-files');
var concat = require('gulp-concat');


var paths = require('./gulp-tasks/paths');
var vendors = require('./gulp-tasks/vendors');
var requireDir = require('require-dir');

var tasks = requireDir('./gulp-tasks');

gulp.task('commonjs', function () {
    var stream = browserify({
            debug: false,
            require: vendors
        });

    stream.bundle()
          .pipe(source('vendors.common.js'))
          .pipe(buffer())
          .pipe(gulp.dest(paths.jsVendors))
          .pipe(uglify())
          .pipe(rename({suffix: ".min"}))
          .pipe(gulp.dest(paths.jsVendors));

    return stream;
});

gulp.task('bower', function () {
  console.log(mbf({includeDev: true}));
  gulp.src(mbf({includeDev: true}).filter(function (f) { return f.substr(-2) === 'js'; }))
    .pipe(concat('vendors.js'))
    .pipe(gulp.dest(paths.jsVendors))
    .pipe(uglify())
    .pipe(rename({suffix: ".min"}))
    .pipe(gulp.dest(paths.jsVendors));
});

gulp.task('default', ['watchify']);
