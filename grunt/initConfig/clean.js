/*globals module:true */
module.exports = function (grunt) {
    'use strict';

    var buildDirectory = grunt.config.get('buildDirectory');

    grunt.config('clean', {
        options: { force: true },
        build : [buildDirectory],
        seedData : ['grunt/tasks/seedData']
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
};