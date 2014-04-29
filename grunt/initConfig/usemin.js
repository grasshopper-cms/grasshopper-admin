module.exports = function (grunt) {
    'use strict';

    grunt.config('usemin', {
        options: {
            assetsDirs: ['build', 'build/themes/img']
        },
        html: ['build/index.html'],
        css: ['build/themes/main.css']
    });

    grunt.loadNpmTasks('grunt-usemin');
};

