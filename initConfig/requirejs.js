/*globals module:true */
module.exports = function (grunt) {
    'use strict';

    var buildDirectory = grunt.config.get('buildDirectory');

    grunt.config('requirejs', {
        dist: {
            options: {
                baseUrl: buildDirectory,
                mainConfigFile: buildDirectory + '/main.js',
                name: 'main',
                out: buildDirectory + '/main.js',
                optimize: 'uglify',
                preserveLicenseComments: false
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-requirejs');

};