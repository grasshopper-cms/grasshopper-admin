/*globals module:true */
module.exports = function (grunt) {
    'use strict';

    var buildDirectory = grunt.config.get('buildDirectory');

    grunt.config('paths', {
        app : {
            options: {
                prefixComma : true,
                pathsJson : 'app/paths.json',
                mainTemplate : 'app/main.js',
                main : buildDirectory + '/main.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-requirejs-paths');
};