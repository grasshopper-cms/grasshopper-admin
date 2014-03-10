/*globals module:true */
module.exports = function (grunt) {
    'use strict';

    var buildDirectory = grunt.config.get('buildDirectory');

    grunt.config('clean', {
        build : [buildDirectory]
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
};