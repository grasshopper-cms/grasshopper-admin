/*global module:false */
module.exports = function (grunt) {
    'use strict';

    grunt.config('usemin', {
        options: {
            assetsDirs: ['<%= buildDirectory %>', '<%= buildDirectory %>/themes', '<%= buildDirectory %>/themes/img']
        },
        html: ['<%= buildDirectory %>/index.html'],
        css: ['<%= buildDirectory %>/themes/*.css']
    });

    grunt.loadNpmTasks('grunt-usemin');
};

