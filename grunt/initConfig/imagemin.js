module.exports = function (grunt) {
    'use strict';

    grunt.config('imagemin', {
        dist : {
            files : [
                {
                    expand : true,
                    cwd : 'build/themes/images',
                    src : '{,*/}*.{png,jpg,jpeg}',
                    dest : 'build/themes/images'
                }
            ]
        }
    });

    grunt.loadNpmTasks('grunt-contrib-imagemin');
};