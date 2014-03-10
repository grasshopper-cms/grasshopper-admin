/*globals module:true */
module.exports = function (grunt) {
    'use strict';

    grunt.config('prompt', {
        provisionFilesCopied : {
            options : {
                questions : [
                    {
                        config: 'provisionConfig',
                        type: 'confirm',
                        message: 'Have you copied over provision files?'
                    }
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-prompt');
};