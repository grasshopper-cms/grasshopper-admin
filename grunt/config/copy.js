/*globals module:true */
module.exports = function (grunt) {
    'use strict';

    grunt.config('copy', {
        temp : {
            files : [
                {
                    expand : true,
                    cwd : 'app/',
                    src : [
                        '**',
                        '!**/*.scss',
                        '**/*.html',
                        '!index.html',
                        '!vendor/**'
                    ],
                    dest : '<%= tempDirectory %>'
                }
            ]
        },
        build : {
            files : [
                {
                    expand : true,
                    cwd : 'app/',
                    src : [
                        'themes/img/**'
                    ],
                    dest : '<%= buildDirectory %>'
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
                    dest : '<%= vendorDest %>'
                }
            ]
        },
        externalPluginsToBuild : {
            files : [
                {
                    expand : true,
                    src : [
                        '<%= externalPluginsDirectory %>/**/*'
                    ],
                    dest : '<%= tempDirectory %>'
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
                    dest : '<%= buildDirectory %>'
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
        /// Live Reload Stuff
        redo : {
            files : [
                {
                    expand : true,
                    cwd : 'app/',
                    src : [],
                    dest : '<%= buildDirectory %>'
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
                    dest : '<%= buildDirectory %>'
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
                    dest : '<%= buildDirectory %>'
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
                    dest : '<%= buildDirectory %>'
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
                    dest : '<%= buildDirectory %>'
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
                    dest : '<%= buildDirectory %>'
                }
            ]
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
};
