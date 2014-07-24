/*globals module:true */
module.exports = function (grunt) {
    'use strict';

    grunt.config('copy', {
        // Dev Server related Tasks
        appJsAndHtmlToBuild : {
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
                    dest : '<%= buildDirectory %>'
                }
            ]
        },
        vendorFilesToBuild : {
            files : [
                {
                    expand : true,
                    cwd : 'app/',
                    src : [
                        // created dynamically
                    ],
                    dest : '<%= buildDirectory %>'
                }
            ]
        },
        fromTempToBuild : {
            files : [
                {
                    expand : true,
                    cwd : '<%= tempDirectory %>',
                    src : [
                        '**/*'
                    ],
                    dest : '<%= buildDirectory %>'
                }
            ]
        },
        // Build Related Tasks
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
        imagesToBuild : {
            files : [
                {
                    expand : true,
                    cwd : 'app/',
                    src : [
                        'themes/img/**',
                        'themes/*.png',
                        'themes/*.gif',
                        'themes/*.jp*g'
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
        externalPluginsToTemp : {
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
        /// Live Reload Tasks
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
        },
        deploy : {
            files : [
                {
                    expand : true,
                    cwd : 'server/',
                    src : [
                        '**',
                        '!node_modules/**'
                    ],
                    dest : '_deploy'
                }
            ]
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
};
