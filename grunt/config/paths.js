/*globals module:true */
module.exports = function (grunt) {
    'use strict';

    grunt.config('paths', {
        toTemp : {
            options: {
                prefixComma : true,
                pathsJson : 'app/paths.json',
                mainTemplate : 'app/main.js',
                main : '<%= tempDirectory %>/main.js'
            }
        },
        toBuild : {
            options: {
                prefixComma : true,
                pathsJson : 'app/paths.json',
                mainTemplate : 'app/main.js',
                main : '<%= buildDirectory %>/main.js'
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