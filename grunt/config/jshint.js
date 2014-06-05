/*globals module:true */
module.exports = function (grunt) {
    'use strict';

    grunt.config('jshint', {
        files : [
            'app/**/*.js',
            '!app/vendor/**/*.js',
            '!app/plugins.js'
        ],
        options: {
            jshintrc: '.jshintrc'
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
};