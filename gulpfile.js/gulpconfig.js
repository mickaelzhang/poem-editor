// ==== CONFIGURATION ==== //

module.exports = {
  path: {
    views: 'core/views/',
    src:  './src/', // Raw files of your theme
    build: './public/dist/', // Processed files of your theme
    dist: './dist/',
    composer: './vendor/', // Composer packages
    modules: './node_modules/', // npm packages
  },
	browsersync: {
		proxy: 'PROJECT_URL',
		browser: 'BROWSER_NAME',
	}
}
