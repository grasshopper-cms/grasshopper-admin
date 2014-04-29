module.exports = function (grunt) {
    'use strict';

    var tempDir = '.tmp';
    grunt.config('rev', {
        dist: {
            files: {
                src: [
                    tempDir + '/main.js',
                    tempDir + '/themes/main.css',
                    tempDir + '/themes/img/{,*/}*.{png,jpg,jpeg,gif,webp}'
                ]
            }
        }

    });

    grunt.loadNpmTasks('grunt-rev');
};