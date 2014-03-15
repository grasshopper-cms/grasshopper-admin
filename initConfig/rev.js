/*globals module:true */
module.exports = function (grunt) {
    'use strict';

    var buildDirectory = grunt.config.get('buildDirectory');

    grunt.config('rev', {
        dist: {
            files: {
                src: [
                    buildDirectory + '/**/*.js',
                    buildDirectory + '/{,*/}*.css',
                    buildDirectory + '/images/{,*/}*.{png,jpg,jpeg,gif,webp}'
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-rev');

};