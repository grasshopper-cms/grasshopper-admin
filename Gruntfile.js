/*jshint node:true */
'use strict';

var warning = {
        readme : 'Compiled file. Do not modify directly.'
    },
    path = require('path'),
    version = require('./package').version,
    tempDir = '.tempo';

module.exports = function (grunt) {

    var ghaConfig =  config(grunt);

    grunt.config.init(ghaConfig);

    grunt.config.set('tempDirectory', tempDir);
    grunt.config.set('vendorDest', tempDir);
    grunt.config.set('apiEndpoint', ghaConfig.apiEndpoint);
    grunt.config.set('warning', warning);
    grunt.config.set('buildDirectory', ghaConfig.buildDirectory);
    grunt.config.set('externalPluginsDirectory', ghaConfig.externalPluginsDirectory);
    grunt.config.set('version', version);
    grunt.config.set('base', ghaConfig.base);

    grunt.loadTasks('grunt/config');
    grunt.loadTasks('grunt/tasks');
};

function config(grunt) {

    var processConfig = process.env.GRASSHOPPER_ADMIN_CONFIG,
        ghaConfig,
        ghaConfigPath;

    if (processConfig) {
        return JSON.parse(processConfig);
    }

    ghaConfig = grunt.file.findup('gha.json', {nocase: true});
    ghaConfigPath = path.dirname(ghaConfig);

    if (!ghaConfig) {
        grunt.fatal('Please create a build configuration file at "gha.json"');
    }

    ghaConfig = grunt.file.readJSON(ghaConfig);

    ghaConfig.buildDirectory = ghaConfigPath + path.sep + ghaConfig.buildDirectory;

    return ghaConfig;
};
