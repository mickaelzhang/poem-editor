var gulp        = require('gulp'),
    browsersync = require('browser-sync'),
    config      = require('../gulpconfig');

gulp.task('browsersync', ['build'], function() {
	browsersync({
		files: [
			config.path.views+'**/*.twig',
			config.path.build+'**/*'
		],
    notify: true,
    open: true,
		browser: config.browsersync.browser,
    port: 3000,
    proxy: config.browsersync.proxy,
    watchOptions: {
      debounceDelay: 2000
    }
	});
});
