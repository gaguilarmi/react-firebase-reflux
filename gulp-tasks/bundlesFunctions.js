var gulp = require("gulp");
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var browserify = require('browserify');
var source = require("vinyl-source-stream");
var _ = require("lodash");
var util = require('gulp-util');
var buffer = require('vinyl-buffer');
var sourcemaps = require("gulp-sourcemaps");
var babelify = require('babelify');
var paths = require('./paths');
var vendors = require('./vendors');
/**
 * Get a properly configured bundler for manual (browserify) and automatic (watchify) builds.
 *
 * @param {object} file The file to bundle (a Vinyl file object).
 * @param {object|null} options Options passed to browserify.
 */
var getBundler = function(file, options) {
  options = _.extend(options || {}, {debug:false, transform: [babelify]});

  // Initialize browserify with the file and options provided.
  var bundler = browserify(file.path, options);

  vendors.forEach(function(vendor) {
    bundler.external(vendor);
  });

  return bundler;
}


  /**
 * Build a single application with browserify creating two differnt versions: one normal and one minified.
 *
 * @param {object} file The file to bundle (a Vinyl file object).
 * @param {browserify|watchify} bundler  The bundler to use.  The "build" task will use browserify, the "autobuild" task will use watchify.
 */
var bundle = function(file, bundler) {
  // Remove file.base from file.path to create a relative path.  For example, if file looks like
  //   file.base === "/Users/johnsonj/dev/web/super-project/applications/client/<i>apps</i>/"
  //   file.path === "/Users/johnsonj/dev/web/super-project/applications/client/<i>apps</i>/login/reset-password/confirm.js"
  // then result is "login/reset-password/confirm.js"

  var relativeFilename = file.path.replace(file.base, "");
  relativeFilename = relativeFilename.replace('App', "bundle");
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
    .pipe(sourcemaps.init({loadMaps: false}))
    // Save normal source (useful for debugging)
    .pipe(gulp.dest(paths.jsDst))
    // Minify source for production
    .pipe(uglify())
    // Restore the sourceMap
    // .pipe(sourcemaps.write())
    // Add the .min suffix before the extension
    .pipe(rename({suffix: ".min"}))
    // Write the minified file.
    .pipe(gulp.dest(paths.jsDst));
}

module.exports.bundle = bundle;
module.exports.getBundler = getBundler;
