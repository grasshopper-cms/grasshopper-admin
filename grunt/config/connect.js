/*globals module:true */
module.exports = function (grunt) {
    'use strict';

    var path = require('path'),
        lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet,
        folderMount = function folderMount (connect, point) {
            return connect.static(path.resolve(point.toString()));
        };

    grunt.config('connect', {
        site : {
            options : {
                port : 9001,
                hostname : '0.0.0.0',
                base : './build/',
                middleware : function (connect, options) {
                    return [lrSnippet, folderMount(connect, options.base)];
                },
                open: true
            }
        },
        tests : {
            options : {
                port : 9001,
                hostname : 'localhost',
                base : './',
                open : {
                    target : 'http://localhost:9001/tests/'
                },
                middleware : function (connect, options) {
                    return [lrSnippet, folderMount(connect, options.base)];
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-connect');
};