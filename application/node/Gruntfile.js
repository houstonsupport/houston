module.exports = function(grunt) {
	grunt.initConfig({
		uglify: {
			options: {
				banner: '/* Houston Compiled, built <%=  grunt.template.today() %> */'
			},

			lib: {
				src: [
					'../assets/backbone/lib/underscore-min.js',
					'../assets/backbone/lib/backbone-min.js',
					'../assets/backbone/lib/handlebars-min.js',
					'../assets/backbone/lib/*.js'
				],
				
				dest: '../../public/js/lib.min.js'
			},

			loginapp: {
				src: [
					'../assets/backbone/loginapp/js/models/*.js',
					'../assets/backbone/loginapp/js/views/*.js',
					'../assets/backbone/loginapp/js/app.js',
					'../assets/backbone/loginapp/js/login.js'
				],

				dest: '../../public/js/loginapp.min.js'
			},

			ticketapp: {
				src: [
					'../assets/backbone/ticketapp/js/houston.js',
					'../assets/backbone/ticketapp/js/datahelper.js',
					'../assets/backbone/ticketapp/js/models/*.js',
					'../assets/backbone/ticketapp/js/collections/*.js',
					'../assets/backbone/ticketapp/js/views/*.js',
					'../assets/backbone/ticketapp/js/app.js'
				],

				dest: '../../public/js/ticketapp.min.js'
			}
		}
	});

	// Load the plugin that prvides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-uglify');

	// Default task(s).
	grunt.registerTask('default', ['uglify']);
}
