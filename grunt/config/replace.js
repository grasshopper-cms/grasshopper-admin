/*globals module:true */
module.exports = function (grunt) {
    'use strict';

    var buildDirectory = grunt.config.get('buildDirectory');

    grunt.config('replace', {
        requirejs: {
            options: {
                patterns: [
                    {
                        replacement: '<script data-main="main" src="vendor/requirejs/require.js"></script>',
                        match: '<script src="main.js"></script>'
                    }
                ],
                usePrefix: false
            },
            files: [
                {src: ['app/index.html'], dest: '<%= buildDirectory %>/index.html'}
            ]
        },
        base: {
            options: {
                patterns: [
                    {
                        replacement: '<meta charset="utf-8"/><%= base %>',
                        match: '<meta charset="utf-8"/>'
                    }
                ],
                usePrefix: false
            },
            files: [
                {src: ['<%= buildDirectory %>/index.html'], dest: '<%= buildDirectory %>/index.html'}
            ]
        }
    });

    grunt.loadNpmTasks('grunt-replace');
};
