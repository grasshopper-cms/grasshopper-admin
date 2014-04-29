/*globals module:true */
module.exports = function (grunt) {
    'use strict';

    // TODO: make all usage of .tmp configurable w a default of .tmp
    var tempDirectory = '.tmp';

    grunt.config('paths', {
        app : {
            options: {
                prefixComma : true,
                pathsJson : 'app/paths.json',
                mainTemplate : 'app/main.js',
                main : tempDirectory + '/main.js'
            }
        },
        tests : {
            options : {
                pathsJson : ['app/paths.json', 'tests/paths.json'],
                pathsPrefix : '../app/',
                mainTemplate : 'tests/main.template.js',
                main : 'tests/main.js',
                prefixComma : true
            }
        }
    });

    grunt.loadNpmTasks('grunt-requirejs-paths');
};