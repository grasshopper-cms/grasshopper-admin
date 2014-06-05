/*global module:false */
module.exports = function (grunt) {

    'use strict';

    grunt.registerTask('stop', function() {
        grunt.fatal('STOPPING');
    });
};
