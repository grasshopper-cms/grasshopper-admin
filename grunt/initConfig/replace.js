/*globals module:true */
module.exports = function (grunt) {
    'use strict';

    var buildDirectory = grunt.config.get('buildDirectory');

    grunt.config('replace', {
        requirejs: {
            options: {
                patterns: [
                    {
                        match: '<script data-main="main" src="vendor/requirejs/require.js"></script>',
                        replacement: '<script src="main.js"></script>'
                    }
                ],
                usePrefix: false
            },
            files: [
                {src: ['app/index.html'], dest: '<%= buildDirectory %>>/index.html'}
            ]
        }
    });

    grunt.loadNpmTasks('grunt-replace');
};
