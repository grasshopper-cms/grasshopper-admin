/*global module:false, require:false*/
module.exports = function(grunt) {

    "use strict";

    var path = require('path'),
        lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet,
        folderMount = function folderMount(connect, point) {
            return connect.static(path.resolve(point));
        };

    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // Project configuration.
    grunt.initConfig({

        watch: {
            options: {
                // Start a live reload server on the default port: 35729
                livereload: true
            },
            dev: {
                files: [
                    '!app/**/*.scss',// Exclusion order is relevant. Exclude Sass files.
                    '!app/*.scss',
                    '!app/build',
                    '!app/vendor/**/*',
                    'app/**/*'
                ]
            },
            sass: {
                options: {
                    livereload: false // Set to false to prevent infinite loop.
                },
                files: [ //watch sass files for changes.
                    'app/**/*.scss',
                    'app/*.scss'
                ],
                tasks: [ // array of grunt tasks to run.
                    'sass'
                ]
            }
        },

        sass: {
            dist: { // Get and compile all view scss files
                options: {
                    style: 'compressed'
                },
                files: [{
                    expand: true,
                    cwd: 'app/views',
                    src: ['**/*.scss'],
                    dest: 'app/build',
                    flatten: true,
                    ext: '.css'
                }]
            },
            application: { // Get and compile application.scss
                options: {
                    style: 'compressed'
                },
                files: {
                    'app/build/application.css': 'app/application.scss'
                }
            }
        },

        connect: {
            livereload : {
                options : {
                    port       : 9001,
                    hostname: 'localhost',
                    base       : './app/',
                    middleware : function (connect, options) {
                        return [lrSnippet, folderMount(connect, options.base)]
                    }
                }
            }
        },

        open : {
            reload : {
                path : 'http://localhost:9001/'
            }
        },

        copy: {
            build: {
                files: [
                    {expand: true, cwd: 'app/', src: ['**'], dest: 'build'}
                ]
            }
        },

        build_gh_pages: {
            ghPages: {
                options: {
                    build_branch: "builds",
                    dist: "build"
                }
            }
        }

    });

    // To start editing your slideshow using livereload, run "grunt server"
    grunt.registerTask("server", "Build and watch task", ["connect","sass","open","watch"]);
    grunt.registerTask("deploy", "Deploy to gh-pages", ["copy", "build_gh_pages"]);
    grunt.loadNpmTasks('grunt-contrib-sass');
};