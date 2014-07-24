/* jshint node:true */
'use strict';

module.exports = function (grunt) {
    grunt.registerTask('loadGhConfigs', function () {
        var config = require('ghapi.json');

        grunt.config.set('ghapiConfigs', JSON.stringify(config));
    });
};


