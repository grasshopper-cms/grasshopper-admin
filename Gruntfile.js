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
                options : {
                    // Start a live reload server on the default port: 35729
                    livereload : true
                },
                files : [
                    'app/**/*',
                    '!app/**/*.scss',// Exclusion order is relevant. Exclude Sass files.
                    '!app/vendor/**/*'
                ],
                tasks : [
                    'jshint', 'copy:redo'
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
                    require : 'sass-globbing',
                    sourcemap : true
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

        // TODO: add some clean up tasks after copy, or copy more selectively
        copy : {
            build : {
                files : [
                    {expand : true, cwd : 'app/', src : [
                        '**',
                        '!**/*.scss'
                    ], dest : 'build'}
                ]
            },
            redo : {
                files : [
                    {expand : true, cwd : 'app/', src : [
                        '!**/*.scss',
                        'mixins/**/*',
                        'models/**/*',
                        'pages/**/*',
                        'views/**/*',
                        'workers/**/*',
                        'api/**/*',
                        'main.js',
                        'resources.js',
                        'index.html',
                        'app.js',
                        'router.js'
                    ], dest : 'build'}
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
        },
        shell : {
            install_api_node_modules : {
                command : 'npm install',
                options : {
                    failOnError : true,
                    stderr : true,
                    stdout: true,
                    execOptions : {
                        cwd : 'api'
                    }
                }
            },
            install_api_vagrant_plugins : {
                command : [
                    'vagrant plugin install vagrant-exec',
                    'vagrant plugin install vagrant-vbguest'
                ].join('&&'),
                options : {
                    failOnError : true,
                    stderr : true,
                    stdout: true,
                    execOptions : {
                        cwd : 'api'
                    }
                }
            },
            start_vagrant_box : {
                command : 'vagrant up',
                options : {
                    failOnError : true,
                    stderr : true,
                    stdout: true,
                    execOptions : {
                        cwd : 'api'
                    }
                }
            },
            test_vagrant_box : {
                command : 'curl http://localhost:8080/token -H "Accept: application/json" -H "Acceen_US" -u "apitestuser:TestPassword"',
                options : {
                    stdout: true
                }
            }
        },
        jshint : {
            files : [
                'app/**/*.js',
                '!app/vendor/**/*.js'
            ]
        }
    });

    // To start editing your slideshow using livereload, run "grunt server"
    grunt.registerTask("server", "Build and watch task", ["jshint", "copy:build", "connect:site", "sass", "open:reload", "watch"]);
    grunt.registerTask("testServer", "Build and watch task", ["jshint", "copy", "connect:tests", "sass", "open:tests", "watch"]);
    grunt.registerTask("deploy", "Deploy to gh-pages", ["copy", "build_gh_pages"]);
    grunt.registerTask("vagrantInstall", "Install and set up vagrant box ", ["shell:install_api_node_modules","shell:install_api_vagrant_plugins", "shell:start_vagrant_box", "shell:test_vagrant_box" ]);
    grunt.registerTask("vagrant", "Starts vagrant", ['shell:start_vagrant_box']);
    grunt.registerTask("testVagrant", "grabs an auth token to ensure box is running", ['shell:test_vagrant_box']);
};