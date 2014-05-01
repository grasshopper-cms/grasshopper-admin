/*global module:false */
module.exports = function (grunt) {
    'use strict';

    grunt.config('useminPrepare',  {
        options: {
            dest: '<%= buildDirectory %>'
        },
        html: '<%= buildDirectory %>/index.html'
    });
};
