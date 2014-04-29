module.exports = function (grunt) {
    'use strict';

    var buildDirectory = grunt.config.get('buildDirectory'),
        tempDirectory = '.tmp';

    grunt.config('usemin', {
        options: {
            assetsDirs: [tempDirectory, 'build/themes/img']
        },
        html: [tempDirectory + '/index.html'],
        css: [tempDirectory + '/themes/main.css']
    });

    grunt.loadNpmTasks('grunt-usemin');
};

