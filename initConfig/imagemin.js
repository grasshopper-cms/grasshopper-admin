/*globals module:true */
module.exports = function (grunt) {
    'use strict';

    var buildDirectory = grunt.config.get('buildDirectory');

    grunt.config('imagemin', {
        dist: {
            files: [{
                expand: true,
                cwd: 'app/images',
                src: '{,*/}*.{png,jpg,jpeg}',
                dest: buildDirectory + '/images'
            }]
        }
    });

};