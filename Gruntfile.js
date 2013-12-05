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

    grunt.loadTasks('tasks');

    // Project configuration.
    grunt.initConfig({
        prompt : {
            provisionFilesCopied : {
                options : {
                    questions : [
                        {
                            config: 'provisionConfig',
                            type: 'confirm',
                            message: 'Have you copied over provision files?'
                        }
                    ]
                }
            }
        },
        watch : {
            options : {
                // Start a live reload server on the default port: 35729
                livereload : false,
                nospawn: true
            },
            build : {
                options : {
                    // Start a live reload server on the default port: 35729
                    livereload : true
                },
                files : [
                    'build/**/*'
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
                files : grunt.file.expandMapping(['themes/**/main.scss'], 'css', {
                    cwd: 'app/',
                    rename: function (dest, matched) {
                        return 'build/' + matched.replace(/\.scss$/, '.css');
                    }
                })
            }
        },
        autoprefixer : {
            options : {},
            no_dest: {
                src: 'build/themes/blue-dashboard/main.css'
            },
            redo: {
                src: 'build/themes/blue-dashboard/main.css'
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
                    },
                    open: true
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
        clean: {
            build : ['build']
        },
        copy : {
            // TODO: target build copy tasks
            build : {
                files : [
                    {expand : true, cwd : 'app/', src : [
                        '**',
                        '!**/*.scss',
                        '**/*.html',
                        '!vendor/**'
                    ], dest : 'build'}
                ]
            },
            vendor : {
                files : [
                    {expand : true, cwd : 'app/', src : [
                        // created dynamically
                    ], dest : 'build'}
                ]
            },
            deploy : {
                files : [
                    {expand : true, cwd : 'app/', src : [
                        '**',
                        '!**/*.scss',
                        '!**/*.js',
                        '!vendor/**/*'
                    ], dest : 'build'}
                ]
            },
            redo : {
                files : [
                    {expand : true, cwd : 'app/', src : [

                    ], dest : 'build'}
                ]
            },
            vagrant : {
                files : [
                    {expand : true, cwd : 'api/lib/config/configuration.test.json', src : [

                    ], dest : 'api/lib/config/configuration.json'}
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
            html: ['build/index.html'],
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
    grunt.registerTask("server", "Build and watch task", [
        'clean',
        "jshint",
        "setupBowerCopy",
        "copy:build",
        "copy:vendor",
        "sass",
        "autoprefixer:no_dest",
        "connect:site",
        "watch"
    ]);
    grunt.registerTask("testServer", "Build and watch task", [
        "jshint",
        "copy:build",
        "connect:tests",
        "sass",
        "connect:tests",
        "watch"
    ]);
    grunt.registerTask("deploy", "Deploy to gh-pages", [
        "clean",
        'copy:deploy',
        'useminPrepare',
        'requirejs',
        'imagemin',
        'concat',
        'uglify',
        'rev',
        'sass',
        'usemin',
        "build_gh_pages"
    ]);
};
