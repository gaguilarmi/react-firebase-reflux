  var jshint = require('gulp-jshint');
  var gulp = require("gulp");
  var react = require('gulp-react');
  var uglify = require('gulp-uglify');
  var rename = require('gulp-rename');
  var browserify = require('browserify');
  var reactify = require('reactify');
  var source = require("vinyl-source-stream");
  var forEach = require("gulp-foreach");
  var _ = require("lodash");
  var util = require('gulp-util');
  var buffer = require('vinyl-buffer');
  var sourcemaps = require("gulp-sourcemaps");
  var babelify = require('babelify');


  var paths = require('./gulp_tasks/paths');

  /*gulp.task("javascript", function () {
    return gulp.src([paths.jsSrc, paths.jsxSrc])
        .pipe(react())
        .pipe(gulp.dest(paths.jsDst))

        //.pipe(uglify())
        //.pipe(rename({suffix: '.min'}))
        //.pipe(gulp.dest(paths.jsDst))

  });*/

  // gulp.task('browserify', ['javascript'], function() {
    // var stream = gulp.src('static/js/**/App.js')
       /*   .pipe(forEach(function(stream, file) {
              bundle(file, getBundler(file));
          }));
    return stream;

    //return browserify('static/js/core/App.js')
    //  .transform(reactify)
    //  .bundle()
    //  .pipe(source('bundle1.js'))
    //  .pipe(gulp.dest('static/js/core/'));
  });*/


  gulp.task('watch', function(){
    gulp.watch(paths.jsSrc, ['browserify']);
    // gulp.watch(paths.jsxSrc, ['javascript']);
  });

  gulp.task('default', ['browserify', 'watch']);


/**
 * Get a properly configured bundler for manual (browserify) and automatic (watchify) builds.
 *
 * @param {object} file The file to bundle (a Vinyl file object).
 * @param {object|null} options Options passed to browserify.
 */
function getBundler(file, options) {
  options = _.extend(options || {}, {debug:false});

  // Initialize browserify with the file and options provided.
  var bundler = browserify(file.path, options);

  return bundler;
}


  /**
 * Build a single application with browserify creating two differnt versions: one normal and one minified.
 *
 * @param {object} file The file to bundle (a Vinyl file object).
 * @param {browserify|watchify} bundler  The bundler to use.  The "build" task will use browserify, the "autobuild" task will use watchify.
 */
function bundle(file, bundler) {
  // Remove file.base from file.path to create a relative path.  For example, if file looks like
  //   file.base === "/Users/johnsonj/dev/web/super-project/applications/client/<i>apps</i>/"
  //   file.path === "/Users/johnsonj/dev/web/super-project/applications/client/<i>apps</i>/login/reset-password/confirm.js"
  // then result is "login/reset-password/confirm.js"

  console.log(file.base);
  console.log(file.path);
  console.log(file.name);
  var relativeFilename = file.path.replace(file.base, "");
  var dst = relativeFilename.replace('App.js', "");
  dst = 'static/js/';
  console.log(dst);
  return bundler
    // Log browserify errors
    .on("error", util.log.bind(util, "Browserify Error"))
    // Bundle the application
    .bundle()
    // Rename the bundled file to relativeFilename
    .pipe(source(relativeFilename))
    // Convert stream to a buffer
    .pipe(buffer())
    // Save the source map for later (uglify will remove it since it is a comment)
    .pipe(sourcemaps.init({loadMaps: true}))
    // Save normal source (useful for debugging)
    //.pipe(gulp.dest(APPS_DIST_DIR))
    // Minify source for production
    .pipe(uglify())
    // Restore the sourceMap
    .pipe(sourcemaps.write())
    // Add the .min suffix before the extension
    .pipe(rename({suffix: ".min"}))
    // Write the minified file.
    .pipe(gulp.dest(paths.jsDst));
}
