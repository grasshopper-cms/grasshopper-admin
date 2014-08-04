/*globals module:true */
module.exports = function (grunt) {
    'use strict';

    grunt.config('processTemplateResourceRefs', {
            production: {
                files: [{expand: true, src:grunt.config('buildDirectory') + '/main.*.js'}]
            },
            development: {
                // Files with RESOURCEREF should be specified there
                files: [
                    {expand: true, src:grunt.config('buildDirectory') + '/**/*.html'},
                    {expand: true, src:grunt.config('buildDirectory') + '/**/*.js'}/*,
                    {expand: true, src:grunt.config('buildDirectory') + '*//**.css'}*/
                ]
                // save some time by specifying files to process explicitly
                /*files: [
                    {expand: true, src:grunt.config('buildDirectory') + '/views/forbidden/forbiddenView.html'},
                    {expand: true, src:grunt.config('buildDirectory') + '/formatters.js'}
                ]*/
            }
        }
    );

};
