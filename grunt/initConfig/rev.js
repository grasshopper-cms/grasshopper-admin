module.exports = function (grunt) {
    'use strict';

    grunt.config('rev', {
        dist: {
            files: {
                src: [
                    'build/main.js',
                    'build/main.css',
                    'build/themes/images/{,*/}*.{png,jpg,jpeg,gif,webp}'
                ]
            }
        }

    });

    grunt.loadNpmTasks('grunt-rev');
};