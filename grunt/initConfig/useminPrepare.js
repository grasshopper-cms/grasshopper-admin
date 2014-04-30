module.exports = function (grunt) {
    'use strict';

    grunt.config('useminPrepare',  {
        options: {
            dest: 'build'
        },
        html: 'build/index.html'
    });
};
