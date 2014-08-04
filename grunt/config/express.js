/*globals module:true */
module.exports = function (grunt) {
    'use strict';

    grunt.config('express', {
        site : {
            options: {
                script: 'server'
            }
        }
    });

    grunt.loadNpmTasks('grunt-express-server');
};