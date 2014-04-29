module.exports = function (grunt) {
    'use strict';

    grunt.config('rev', {
        dist: {
            files: {
                src: [
                    'build/main.js',
                    'build/themes/main.css',
                    'build/themes/img/{,*/}*.{png,jpg,jpeg,gif,webp}'
                ]
            }
        }

    });

    grunt.loadNpmTasks('grunt-rev');
};