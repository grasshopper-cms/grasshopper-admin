/*globals module:true */
module.exports = function (grunt) {
    'use strict';

    grunt.config('clean', {
        options: { force: true },
        build : ['<%= buildDirectory %>'],
        temp : ['<%= tempDirectory %>'],
        seedData : ['grunt/seedData'],
        deploy : ['_deploy']
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
};