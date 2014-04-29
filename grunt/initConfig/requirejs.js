/*globals module:true */
module.exports = function (grunt) {
    'use strict';

    var tempDirectory = '.tmp';

    grunt.config('requirejs', {
        dist: {
            options: {
                baseUrl: tempDirectory,
                mainConfigFile: tempDirectory + '/main.js',
                name: 'main',
                out: tempDirectory + '/main.js',
                optimize: 'uglify',
                preserveLicenseComments: false,
                include: ['vendor/requirejs/require.js']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-requirejs');

};