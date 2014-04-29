/*global module:false, require:false*/
module.exports = function (grunt) {

    'use strict';

    var warning = {
            readme : 'Compiled file. Do not modify directly.'
        },
        path = require('path'),
        ghaConfig = grunt.file.findup('gha.json', {nocase: true}),
        ghaConfigPath = path.dirname(ghaConfig),
        version = grunt.file.readJSON('package.json').version;


    if (!ghaConfig) {
        grunt.fatal('Please create a build configuration file at "gha.json"');
    }

    ghaConfig = grunt.file.readJSON(ghaConfig);

    grunt.config.init(ghaConfig);

    grunt.config.set('apiEndpoint', ghaConfig.apiEndpoint);
    grunt.config.set('warning', warning);
    grunt.config.set('buildDirectory', ghaConfigPath + path.sep + ghaConfig.buildDirectory);
    grunt.config.set('version', version);

    grunt.loadTasks('grunt/initConfig');
    grunt.loadTasks('grunt/tasks');
};
