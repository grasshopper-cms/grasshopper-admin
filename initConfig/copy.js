/*globals module:true */
module.exports = function (grunt) {
    'use strict';

    var buildDirectory = grunt.config.get('buildDirectory');

    grunt.config('copy', {
        build : {
            files : [
                {
                    expand : true,
                    cwd : 'app/',
                    src : [
                        '**',
                        '!**/*.scss',
                        '**/*.html',
                        '!vendor/**'
                    ],
                    dest : buildDirectory
                }
            ]
        },
        vendor : {
            files : [
                {
                    expand : true,
                    cwd : 'app/',
                    src : [
                        // created dynamically
                    ],
                    dest : buildDirectory
                }
            ]
        },
        deploy : {
            files : [
                {
                    expand : true,
                    cwd : 'app/',
                    src : [
                        '**',
                        '!**/*.scss',
                        '!**/*.js',
                        '!vendor/**/*'
                    ],
                    dest : buildDirectory
                }
            ]
        },
        redo : {
            files : [
                {
                    expand : true,
                    cwd : 'app/',
                    src : [],
                    dest : buildDirectory
                }
            ]
        },
        vagrantConfig : {
            files : [
                {
                    expand : true,
                    cwd : 'node_modules/grasshopper-api/lib/config/',
                    src : [
                        'configuration.test.json'
                    ],
                    dest : 'node_modules/grasshopper-api/lib/config/',
                    rename : function(dest, srcpath) {
                        return dest + srcpath.replace('.test', '');
                    }
                }
            ]
        },
        html : {
            files : [
                {
                    expand : true,
                    cwd : 'app/',
                    src : [
                        '**/*.html',
                        '!vendor/**/*.html'
                    ],
                    dest : buildDirectory
                }
            ]
        },
        rootJS : {
            files : [
                {
                    expand : true,
                    cwd : 'app/',
                    src : [
                        '**/*.js',
                        '!main.js',
                        '!constants.js',
                        '!plugins.js',
                        '!validation/**/*.js',
                        '!views/**/*.js',
                        '!vendor/**/*.js',
                        '!plugins/**/*.js'
                    ],
                    dest : buildDirectory
                }
            ]
        },
        validationJS : {
            files : [
                {
                    expand : true,
                    cwd : 'app/',
                    src : [
                        'validation/**/*.js'
                    ],
                    dest : buildDirectory
                }
            ]
        },
        pluginsJS : {
            files : [
                {
                    expand : true,
                    cwd : 'app/',
                    src : [
                        'plugins/**/*.js'
                    ],
                    dest : buildDirectory
                }
            ]
        },
        viewsJS : {
            files : [
                {
                    expand : true,
                    cwd : 'app/',
                    src : [
                        'views/**/*.js'
                    ],
                    dest : buildDirectory
                }
            ]
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
};
