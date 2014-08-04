/*globals module:true */
module.exports = function (grunt) {
    'use strict';

    grunt.config('build_gh_pages', {
        options : {
            build_branch : 'builds',
            dist : 'build'
        },
        staging : {
            options: {
                build_branch: "staging",
                dist: "_deploy",
                pull: true
            }
        }
    });

    grunt.loadNpmTasks('grunt-build-gh-pages');
};