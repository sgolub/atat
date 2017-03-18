module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			options: {
				separator: '\n'
			},
			index: {
				src: ['src/**/*.js', '!src/browser/**/*.js', '!src/iife/**/*.js'],
				dest: 'index.js'
			},
			browser: {
				src: ['src/**/*.js', '!src/express/**/*.js', '!src/iife/**/*.js'],
				dest: 'dist/<%= pkg.name %>.js'
			},
			index_iife: {
				src: ['src/iife/intro.js', 'index.js', 'src/iife/ontro.js'],
				dest: 'index.js'
			},
			browser_iife: {
				src: ['src/iife/intro.js', 'dist/<%= pkg.name %>.js', 'src/iife/ontro.js'],
				dest: 'dist/<%= pkg.name %>.js'
			}
		},
		babel: {
			index: {
				options: {
					presets: ['es2015']
				},
				files: {
					'index.js': 'index.js'
				}
			},
			browser: {
				options: {
					presets: ['es2015']
				},
				files: {
					'dist/<%= pkg.name %>.js': 'dist/<%= pkg.name %>.js'
				}
			}
		},
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			build: {
				src: 'dist/<%= pkg.name %>.js',
				dest: 'dist/<%= pkg.name %>.min.js'
			}
		},
		clean: {
			index: ['index.js'],
			dist: ['dist/*']
		},
		watch: {
			options: {
				spawn: false
			},
			scripts: {
				files: ['src/**/*.js'],
				tasks: ['build']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-babel');


	grunt.registerTask('build:index', ['concat:index', 'babel:index', 'concat:index_iife']);
	grunt.registerTask('build:browser', ['concat:browser', 'babel:browser', 'concat:browser_iife', 'uglify']);
	grunt.registerTask('build', ['build:index', 'build:browser']);
	grunt.registerTask('default', ['clean', 'build']);

};
