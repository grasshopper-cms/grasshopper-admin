/*globals module:true */
module.exports = function (grunt) {
    'use strict';

    grunt.config('releaseNotes', {
        main : {
            src : 'grunt/templates/README.template.md',
            dest : 'README.md',
            baseLinkPath : 'https://github.com/Solid-Interactive/grasshopper-admin/tree/master/'
        }
    });

    grunt.loadNpmTasks('grunt-release-notes');
};
