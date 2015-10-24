module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        
        compass: {
            compile: {
                options: {
                    cssDir: 'public/css',
                    sassDir: 'src/scss',
                    outputStyle: 'compressed',
                    force: true
                }
            }
        },
        
        open: {
            app: {
                path: 'http://127.0.0.1:8080'
            }
        },
        
        watch: {
            js: {
                files: 'src/js/*.*',
                tasks: [
                    'copy:js'
                ]
            },
            scss: {
                files: 'src/scss/*.*',
                tasks: ['compass']
            },
            tpls: {
                files: 'src/tpls/*.*',
                tasks: ['copy:tpls']
            },
            root: {
                files: 'src/*.*',
                tasks: ['copy:root']
            },
            options: {
                livereload: true,
                debounceDelay: 1000
            }
        },
        
        clean: {
            public: 'public',
            options: {
                force: true
            }
        },
        
        copy: {
            js: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        cwd: 'src',
                        src: ['js/*.*'],
                        dest: 'public/js'
                    }
                ]
            },
            tpls: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        cwd: 'src',
                        src: ['tpls/*.*'],
                        dest: 'public/tpls'
                    }
                ]
            },
            root: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        cwd: 'src',
                        src: ['*.*'],
                        dest: 'public'
                    }
                ]
            },
            bower: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: [
                            'bower_components/angular/angular.min.js',
                            'bower_components/angular/angular.min.js.map'
                        ],
                        dest: 'public/bower/'
                    },
                    {
                        expand: true,
                        flatten: true,
                        src: [
                            'bower_components/angular-route/angular-route.min.js',
                            'bower_components/angular-route/angular-route.min.js.map'
                        ],
                        dest: 'public/bower/'
                    },
                    {
                        expand: true,
                        flatten: true,
                        src: [
                            'bower_components/angular-animate/angular-animate.min.js',
                            'bower_components/angular-animate/angular-animate.min.js.map'
                        ],
                        dest: 'public/bower/'
                    }
                ]
            }
        }
    });
    
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    
    grunt.registerTask('default', ['clean', 'copy', 'compass', 'open', 'watch']);
};