module.exports = function (grunt) {
    'use strict';

    grunt.config('imagemin', {
        dist : {
            files : [
                {
                    expand : true,
                    cwd : 'build/themes/img',
                    src : '{,*/}*.{png,jpg,jpeg}',
                    dest : 'build/themes/img'
                }
            ]
        }
    });

    grunt.loadNpmTasks('grunt-contrib-imagemin');
};