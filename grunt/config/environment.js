/*globals module:true */
module.exports = function (grunt) {
    'use strict';

    grunt.config('env', {
        localhost : {
            GRASSHOPPER_CONFIG : '<%= ghapiConfigs %>'
        }
    });

    grunt.loadNpmTasks('grunt-env');
};