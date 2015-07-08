var gulp = require("gulp");
var gutil = require('gulp-util');
var forEach = require("gulp-foreach");
var watchify = require('watchify');

var paths = require('./paths');
var bundles = require('./bundlesFunctions');

var srcPaths = [paths.jsSrc, paths.jsxSrc];

gulp.task('browserify', function() {
	var stream = gulp.src(srcPaths)
	      .pipe(forEach(function(stream, file) {
	          bundles.bundle(file, bundles.getBundler(file));
	      }));
	return stream;
});

/**
 * Watch applications and their dependencies for changes and automatically rebuild them.  This will keep build times small since
 * we don't have to manually rebuild all applications everytime we make even the smallest/most isolated of changes.
 */
gulp.task("watchify", function() {
	return gulp.src(srcPaths)
		.pipe(forEach(function(stream, file) {
			// Get our bundler just like in the "build" task, but wrap it with watchify and use the watchify default args (options).
			var w = watchify(bundles.getBundler(file, watchify.args));

			function rebundle() {
				gutil.log(gutil.colors.yellow('updating'), gutil.colors.green(file.path));
				return bundles.bundle(file, w);
			}

			w.on("update", rebundle);

			return rebundle();
		}));
});


