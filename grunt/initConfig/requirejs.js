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
                preserveLicenseComments: false,
                include: ['vendor/requirejs/require.js']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-requirejs');

};