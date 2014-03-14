/*globals module:true */
module.exports = function (grunt) {
    'use strict';

    var buildDirectory = grunt.config.get('buildDirectory');

    grunt.config('requirejs', {
        dist: {
            // Options: https://github.com/jrburke/r.js/blob/master/build/example.build.js
            options: {
                // `name` and `out` is set by grunt-usemin
                baseUrl: buildDirectory,
                optimize: 'none',
                preserveLicenseComments: false,
                useStrict: true,
                wrap: true
                //uglify2: {} // https://github.com/mishoo/UglifyJS2
            }
        }
    });

};