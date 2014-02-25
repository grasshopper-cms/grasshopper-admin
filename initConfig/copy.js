/*globals module:true */
module.exports = function (grunt) {
    'use strict';

    var buildDirectory = grunt.config.get('buildDirectory');
    
    grunt.config('copy', {
        build : {
            files : [
                {expand : true, cwd : 'app/', src : [
                    '**',
                    '!**/*.scss',
                    '**/*.html',
                    '!vendor/**'
                ], dest : buildDirectory}
            ]
        },
        vendor : {
            files : [
                {expand : true, cwd : 'app/', src : [
                    // created dynamically
                ], dest : buildDirectory}
            ]
        },
        deploy : {
            files : [
                {expand : true, cwd : 'app/', src : [
                    '**',
                    '!**/*.scss',
                    '!**/*.js',
                    '!vendor/**/*'
                ], dest : buildDirectory}
            ]
        },
        redo : {
            files : [
                {expand : true, cwd : 'app/', src : [

                ], dest : buildDirectory}
            ]
        },
        vagrant : {
            files : [
                {expand : true, cwd : 'api/lib/config/configuration.test.json', src : [

                ], dest : 'api/lib/config/configuration.json'}
            ]
        }
    });

    grunt.loadNpmTasks('grunt-copy');
};
