/*globals module:true */
module.exports = function (grunt) {
    'use strict';

    var buildDirectory = grunt.config.get('buildDirectory');

    grunt.config('requirejs', {
        dist: {
            options: {
                baseUrl: buildDirectory,
                mainConfigFile: buildDirectory + "/main.js",
                name: "main", // assumes a production build using almond
                out: buildDirectory + "/main.js"
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-requirejs');

};