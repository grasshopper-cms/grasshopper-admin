/*globals module:true */
module.exports = function (grunt) {
    'use strict';

    grunt.config('build_gh_pages', {
        options : {
            build_branch : 'builds',
            dist : 'build'
        }
    });

    grunt.loadNpmTasks('grunt-build-gh-pages');
};