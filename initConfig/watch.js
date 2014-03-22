/*globals module:true */
module.exports = function (grunt) {
    'use strict';

    grunt.config('watch', {
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
            files : [ //watch sass files for changes.
                'app/**/*.scss',
                'app/*.scss'
            ],
            tasks : [ // array of grunt tasks to run.
                'sass'
            ]
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
};