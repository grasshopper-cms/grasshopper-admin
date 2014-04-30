module.exports = function (grunt) {
    'use strict';

    grunt.config('useminPrepare',  {
        options: {
            dest: 'build',
            flow : {
                steps: {
                    js: [],
                    css: []
                },
                post: {}
            }
        },
        html: 'build/index.html'
    });
};
