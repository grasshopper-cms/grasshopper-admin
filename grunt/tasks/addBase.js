/*jshint node:true */
'use strict';

module.exports = function (grunt) {

    grunt.registerTask('addBase', function() {
        var base = grunt.config.get('base');

        if (!base) {
            return;
        }

        if (base) {
            grunt.config.set('base', '\n        <base href="' + base + '">');
            grunt.task.run('replace:base');
        }
    });
};
