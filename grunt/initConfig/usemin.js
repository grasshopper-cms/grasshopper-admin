module.exports = function (grunt) {
    'use strict';

    grunt.config('usemin', {
        options: {
            assetsDirs: ['build', 'build/themes/images']
        },
        html: ['build/index.html'],
        css: ['build/main.css']
    });

    grunt.loadNpmTasks('grunt-usemin');
};

