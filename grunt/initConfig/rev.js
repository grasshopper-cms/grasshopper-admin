module.exports = function (grunt) {
    'use strict';

    grunt.config('filerev', {
        dist : {
            src : [
                '<%= buildDirectory %>/main.js',
                '<%= buildDirectory %>/themes/main.css',
                '<%= buildDirectory %>/themes/img/{,*/}*.{png,jpg,jpeg,gif,webp}'
            ]
        }

    });

    grunt.loadNpmTasks('grunt-filerev');
};