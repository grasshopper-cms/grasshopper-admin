/*globals module:true */
module.exports = function (grunt) {
    'use strict';

    grunt.config('watch', {
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
            options : {
                livereload : true
            },
            files : [ //watch sass files for changes.
                'app/**/*.scss',
                '!app/vendor/**/*.scss'
            ],
            tasks : [ // array of grunt tasks to run.
                'sass',
                'autoprefixer:no_dest'
            ]
        },
        appHtml : {
            options : {
                livereload : true
            },
            files : [
                'app/**/*.html',
                '!app/index.html',
                '!app/vendor/**/*.html'
            ],
            tasks : [
                'copy:appHtml'
            ]
        },
        indexHtml : {
            options : {
                livereload : true
            },
            files : [
                'app/index.html',
            ],
            tasks : [
                'copy:indexHtml',
                'replace:requirejs',
                'addBase',
            ]
        },
        rootJS : {
            options : {
                livereload : true
            },
            files : [
                'app/**/*.js',
                '!app/validation/**/*.js',
                '!app/views/**/*.js',
                '!app/plugins/**/*.js',
                '!app/vendor/**/*.js'
            ],
            tasks : [
                'jshint',
                'copy:rootJS'
            ]
        },
        validationJS : {
            options : {
                livereload : true
            },
            files : [
                'app/validation/**/*.js'
            ],
            tasks : [
                'jshint',
                'copy:validationJS'
            ]
        },
        pluginsJS : {
            options : {
                livereload : true
            },
            files : [
                'app/plugins/**/*.js'
            ],
            tasks : [
                'jshint',
                'copy:pluginsJS'
            ]
        },
        viewsJS : {
            options: {
                livereload : true
            },
            files : [
                'app/views/**/*.js'
            ],
            tasks : [
                'jshint',
                'copy:viewsJS'
            ]
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
};