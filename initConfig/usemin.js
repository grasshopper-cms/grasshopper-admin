/*globals module:true */
module.exports = function (grunt) {
    'use strict';

    var buildDirectory = grunt.config.get('buildDirectory');

    grunt.config('usemin', {
        html: [buildDirectory + '/index.html'],
        css: [buildDirectory + '/{,*/}*.css'],
        options: {
            dirs: [buildDirectory]
        }
    });

    grunt.loadNpmTasks('grunt-usemin');

};