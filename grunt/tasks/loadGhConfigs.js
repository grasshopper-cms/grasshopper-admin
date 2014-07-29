/* jshint node:true */
'use strict';

var savedConfig;

module.exports = function (grunt) {
    grunt.registerTask('loadGhConfigs', function () {
        if (!grunt.file.exists('ghapi.json')) {
            grunt.fail.fatal('no ghapi.json file found. please try again.');
            return;
        }

        var config = savedConfig = grunt.file.readJSON('ghapi.json');
        if (config) {
            grunt.config.set('ghapiConfigs', JSON.stringify(config));
        }
    });

    grunt.registerTask('loadGhConfigs:restore', function () {
        grunt.file.write('ghapi.json', JSON.stringify(savedConfig,null,4));
    });
};


