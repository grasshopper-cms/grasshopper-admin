/* jshint node:true */
'use strict';

module.exports = function (grunt) {
    grunt.registerTask('loadGhConfigs', function () {
        if (!grunt.file.exists('ghapi.json')) {
            grunt.fail.fatal('no ghapi.json file found. please try again.');
            return;
        }

        var config = require('ghapi.json');
        if (config) {
            grunt.config.set('ghapiConfigs', JSON.stringify(config));
        }
    });
};


