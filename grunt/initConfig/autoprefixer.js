/*globals module:true */
module.exports = function (grunt) {
    'use strict';

    var tempDirectory = '.tmp';

    grunt.config('autoprefixer', {
        options : {},
        no_dest: {
            src: tempDirectory + '/themes/main.css'
        },
        redo: {
            src: tempDirectory + '/themes//main.css'
        }
    });

    grunt.loadNpmTasks('grunt-autoprefixer');
};
