/*globals module:true */
module.exports = function (grunt) {
    'use strict';

    grunt.config('express', {
        site : {
            options: {
                script : 'server',
                args :  ['GRASSHOPPER_CONFIG=\'<%= ghapiConfigs %>\'']
            }
        }
    });

    grunt.loadNpmTasks('grunt-express-server');
};