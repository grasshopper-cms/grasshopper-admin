/*globals module:true */
module.exports = function (grunt) {
    'use strict';

    grunt.config('watch', {
        options : {
            // Start a live reload server on the default port: 35729
            livereload : false
//            nospawn: true
        },
        build : {
            options : {
                // Start a live reload server on the default port: 35729
                livereload : true
            },
            files : [
                'build/**',
                '!build/vendor/**'
            ]
        },
        dev : {
            options : {
                // Start a live reload server on the default port: 35729
                livereload : true
            },
            files : [
                'app/**',
                '!app/**/*.html',
                '!app/**/*.scss',// Exclusion order is relevant. Exclude Sass files.
                '!app/vendor/**'
            ],
            tasks : [
                'jshint',
                'setupBowerCopy',
                'copy:build',
                'registerPlugins',
                'paths',
                'setBuildConfig'
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
        html : {
            options : {
                livereload : true
            },
            files : [
                'app/**/*.html',
                '!app/vendor/**/*.html'
            ],
            tasks : [
                'copy:html'
            ]
        },
        rootJS : {
            options : {
                livereload : true
            },
            files : [
                'app/**/*.js',
                '!app/views/**/*.js',
                '!app/plugins/**/*.js',
                '!app/vendor/**/*.js'
            ],
            tasks : [
                'jshint',
                'setupBowerCopy',
                'copy:rootJS',
                'paths:app',
                'setBuildConfig'
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
                'setupBowerCopy',
                'copy:pluginsJS',
                'paths:app',
                'setBuildConfig'
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
                'setupBowerCopy',
                'copy:viewsJS',
                'paths:app',
                'setBuildConfig'
            ]
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
};