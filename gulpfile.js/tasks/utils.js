// ==== UTILITIES ==== //

var gulp        = require('gulp'),
    del         = require('del'),
    config      = require('../gulpconfig');

// Totally wipe the contents of the `dist` folder to prepare for a clean build
gulp.task('wipe-dist', function() {
  // Clean this out before creating a new distribution copy
  return del([
    config.path.dist
  ]);
});

// Clean out junk files after build
gulp.task('clean-build', ['build', 'wipe-dist'], function() {
  return del([ // A glob pattern matching junk files to clean out of `build`; feel free to add to this array
    config.path.project + '**/.DS_Store',
  ]);
});

// Copy files from the `build` folder to `dist/[project]`
gulp.task('copy-project', ['clean-build'], function() {
  return gulp.src([
    config.path.project + '**/*',
    '!' + config.path.project + '**/*.map',
    '!' + config.path.project + '**/composer.lock',
    '!' + config.path.project + '{src,src/**}',
    '!' + config.path.project + '{vendor,vendor/**}'
  ])
  .pipe(gulp.dest(
    config.path.dist
  ));
});
