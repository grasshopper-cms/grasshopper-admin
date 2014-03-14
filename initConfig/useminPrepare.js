/*globals module:true */
module.exports = function (grunt) {
    'use strict';

    var buildDirectory = grunt.config.get('buildDirectory');

    grunt.config('useminPrepare', {
        html: ['app/index.html'],
        options: {
            dest: buildDirectory
        }
    });

};