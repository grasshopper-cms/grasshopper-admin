/*global module:false, require:false*/
module.exports = function (grunt) {

    "use strict";

    var path = require('path'),
        lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet,
        folderMount = function folderMount (connect, point) {
            return connect.static(path.resolve(point));
        },
        _ = grunt.util._;

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

        clean: {
            build : ['build']
        },

        // TODO: add some clean up tasks after copy, or copy more selectively
        copy : {
            // TODO: target build copy tasks
            build : {
                files : [
                    {expand : true, cwd : 'app/', src : [
                        '**',
                        '!**/*.scss'
                    ], dest : 'build'}
                ]
            },
            deploy : {
                files : [
                    {expand : true, cwd : 'app/', src : [
                        '**',
                        '!**/*.scss',
                        '!**/*.js',
                        '!**/vendor/**/*',
                    ], dest : 'build'}
                ]
            },
            // TODO: remove redo and only copy the file that was changed:
            // TODO: https://github.com/gruntjs/grunt-contrib-watch#using-the-watch-event
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
                        'router.js',
                        'collections/**/*',
                        'localStorage',
                        'constants.js'
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
            vagrant_go : {
                command : 'set dynamically',
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
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        requirejs: {
            dist: {
                // Options: https://github.com/jrburke/r.js/blob/master/build/example.build.js
                options: {
                    // `name` and `out` is set by grunt-usemin
                    baseUrl: 'app',
                    optimize: 'none',
                    // TODO: Figure out how to make sourcemaps work with grunt-usemin
                    // https://github.com/yeoman/grunt-usemin/issues/30
                    //generateSourceMaps: true,
                    // required to support SourceMaps
                    // http://requirejs.org/docs/errors.html#sourcemapcomments
                    preserveLicenseComments: false,
                    useStrict: true,
                    wrap: true
                    //uglify2: {} // https://github.com/mishoo/UglifyJS2
                }
            }
        },
        useminPrepare: {
            html: ['app/index.html'],
            options: {
                dest: 'build'
            }
        },
        usemin: {
            html: [],
            css: ['build/{,*/}*.css'],
            options: {
                dirs: ['build']
            }
        },
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'app/images',
                    src: '{,*/}*.{png,jpg,jpeg}',
                    dest: 'build/images'
                }]
            }
        },
        rev: {
            dist: {
                files: {
                    src: [
                        'build/**/*.js',
                        'build/{,*/}*.css',
                        'build/images/{,*/}*.{png,jpg,jpeg,gif,webp}'
                    ]
                }
            }
        }
    });

    // To start editing your slideshow using livereload, run "grunt server"
    grunt.registerTask("server", "Build and watch task", ["jshint", "copy:build", "connect:site", "sass", "open:reload", "watch"]);
    grunt.registerTask("testServer", "Build and watch task", ["jshint", "copy:build", "connect:tests", "sass", "open:tests", "watch"]);
    grunt.registerTask("deploy", "Deploy to gh-pages", [
        "clean",
        'useminPrepare',
        'requirejs',
        //'imagemin',
        'concat',
        //'cssmin',
        'uglify',
        //'rev',
        'usemin',
        'copy:deploy',
        'sass',
        'connect:site',
        'open:reload',
        'watch'
        //"build_gh_pages"
    ]);
    grunt.registerTask("vagrant", "Starts vagrant", ['shell:start_vagrant_box']);
    grunt.registerTask("testVagrant", "grabs an auth token to ensure box is running", ['shell:test_vagrant_box']);
    grunt.registerTask('vagrant', "use vagrant:help", function vagrant(target, extra) {
        var tasks = {
            install : {
                run : ["shell:install_api_node_modules","shell:install_api_vagrant_plugins", "vagrant:run:up", "shell:test_vagrant_box" ],
                help : "Install and set up vagrant box "
            },
            test : {
                run : ['shell:test_vagrant_box'],
                help : "grabs an auth token to ensure box is running"
            },
            run : {
                help : "runs arbitrary vagrant tasks - e.g. up, reload, destroy"
            }
            },
            vagrantCommands = Array.prototype.splice.call(arguments, 1);

        if (!extra) {
            if (tasks[target]) {
                grunt.task.run(tasks[target].run);
            } else {
                _.each(_.keys(tasks), function(key) {
                    grunt.log.subhead(key).writeln(tasks[key].help);
                });
            }
        } else {
            if ('help' === target) {
                grunt.log.subhead("Help:").subhead(tasks[extra] ? tasks[extra].help : 'use the form grunt vagrant:help:task');
            } else if ('run' === target) {
                vagrantCommands = vagrantCommands.join(' ');
                grunt.log
                    .subhead('Running...')
                    .subhead('vagrant ' + vagrantCommands)
                    .subhead(' ... go!');

                grunt.config.set('shell.vagrant_go.command', 'vagrant ' + vagrantCommands);
                grunt.task.run(['shell:vagrant_go']);
            } else {
                grunt.task.run(['vagrant:run:' + this.args.join(':')]);
            }
        }


    });
};
