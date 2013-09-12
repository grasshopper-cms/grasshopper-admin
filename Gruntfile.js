/*global module:false, require:false*/
module.exports = function (grunt) {

    "use strict";

    var path = require('path'),
        lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet,
        folderMount = function folderMount (connect, point) {
            return connect.static(path.resolve(point));
        };

    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // Project configuration.
    grunt.initConfig({

        watch : {
            options : {
                // Start a live reload server on the default port: 35729
                livereload : false
            },
            build : {
                options : {
                    // Start a live reload server on the default port: 35729
                    livereload : true
                },
                files : [
                    'build/**/*',
                    '!build/vendor/**/*'
                ]
            },
            dev : {
                files : [
                    'app/**/*',
                    '!app/**/*.scss',// Exclusion order is relevant. Exclude Sass files.
                    '!app/vendor/**/*'
                ],
                tasks : [
                    'copy'
                ]
            },
            tests : {
                options : {
                    // Start a live reload server on the default port: 35729
                    livereload : true
                },
                files : [
                    'tests/**/*.js'
                ]
            },
            sass : {
                files : [ //watch sass files for changes.
                    'app/**/*.scss',
                    'app/*.scss'
                ],
                tasks : [ // array of grunt tasks to run.
                    'sass'
                ]
            }
        },

        sass : {
            application : { // Get and compile application.scss
                options : {
                    style : 'compressed',
                    require : 'sass-globbing'
                },
                files : {
                    'build/application.css' : 'app/application.scss'
                }
            }
        },

        connect : {
            site : {
                options : {
                    port : 9001,
                    hostname : 'localhost',
                    base : './build/',
                    middleware : function (connect, options) {
                        return [lrSnippet, folderMount(connect, options.base)]
                    }
                }
            },
            tests : {
                options : {
                    port : 9001,
                    hostname : 'localhost',
                    base : './',
                    middleware : function (connect, options) {
                        return [lrSnippet, folderMount(connect, options.base)]
                    }
                }
            }
        },

        open : {
            reload : {
                path : 'http://localhost:9001/'
            },
            tests : {
                path : 'http://localhost:9001/tests/'
            }
        },

        copy : {
            build : {
                files : [
                    {expand : true, cwd : 'app/', src : ['**'], dest : 'build'}
                ]
            }
        },

        build_gh_pages : {
            ghPages : {
                options : {
                    build_branch : "builds",
                    dist : "build"
                }
            }
        }

    });

    // To start editing your slideshow using livereload, run "grunt server"
    grunt.registerTask("server", "Build and watch task", ["copy", "connect:site", "sass", "open:reload", "watch:build", "watch:sass", "watch:dev"]);
    grunt.registerTask("testServer", "Build and watch task", ["copy", "connect:tests", "sass", "open:tests", "watch:tests", "watch:dev"]);
    grunt.registerTask("deploy", "Deploy to gh-pages", ["copy", "build_gh_pages"]);
};