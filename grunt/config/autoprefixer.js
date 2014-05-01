/*globals module:true */
module.exports = function (grunt) {
    'use strict';

    var buildDirectory = grunt.config.get('buildDirectory');

    grunt.config('autoprefixer', {
        options : {
        },
        no_dest: {
            src: buildDirectory + '/themes/main.css'
        },
        redo: {
            src: buildDirectory + '/themes/main.css'
        }
    });

    grunt.loadNpmTasks('grunt-autoprefixer');
};
