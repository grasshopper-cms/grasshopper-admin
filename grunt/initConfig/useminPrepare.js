module.exports = function (grunt) {
    'use strict';

    var buildDirectory = grunt.config.get('buildDirectory'),
        tempDirectory = '.tmp';

    grunt.config('useminPrepare',  {
        options: {
            dest: buildDirectory,
            flow : {
                steps: {
                    js: [],
                    css: []
                },
                post: {}
            }
        },
        html: tempDirectory + 'index.html'
    });
};
