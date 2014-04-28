/*globals module:true */
module.exports = function (grunt) {
    'use strict';

    var buildDirectory = grunt.config.get('buildDirectory');

    grunt.config('autoprefixer', {
        options : {},
        no_dest: {
            src: buildDirectory + '/themes/blue-dashboard/main.css'
        },
        redo: {
            src: buildDirectory + '/themes/blue-dashboard/main.css'
        }
    });

    grunt.loadNpmTasks('grunt-autoprefixer');
};
