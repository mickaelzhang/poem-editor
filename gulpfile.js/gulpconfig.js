// ==== CONFIGURATION ==== //

// Project settings
module.exports = {
  path: {
    views: './core/views/',
    src: './src/', // Raw files of your theme
    build: './public/dist/' // Processed files of your theme
  },
	browsersync: {
		proxy: 'localhost:8888/poem-editor/public/'
	}
}
