/*global module:false, require:false*/
module.exports = function (grunt) {

    'use strict';

    var warning = {
            readme : 'Compiled file. Do not modify directly.'
        },
        path = require('path'),
        ghaConfig = grunt.file.findup('gha.json', {nocase: true}),
        ghaConfigPath = path.dirname(ghaConfig),
        version = grunt.file.readJSON('package.json').version,
        tempDir = '.tempo',
        librariesVersions = grunt.file.expand(['bower.json']).map(function(filename){
            var contents=grunt.file.readJSON(filename);
            return {
                name: contents.name,
                version: contents.version
            };
        });



    if (!ghaConfig) {
        grunt.fatal('Please create a build configuration file at "gha.json"');
    }

    ghaConfig = grunt.file.readJSON(ghaConfig);

    grunt.config.init(ghaConfig);

    grunt.config.set('tempDirectory', tempDir);
    grunt.config.set('vendorDest', tempDir);
    grunt.config.set('apiEndpoint', ghaConfig.apiEndpoint);
    grunt.config.set('warning', warning);
    grunt.config.set('buildDirectory', ghaConfigPath + path.sep + ghaConfig.buildDirectory);
    grunt.config.set('externalPluginsDirectory', ghaConfig.externalPluginsDirectory);
    grunt.config.set('version', version);
    grunt.config.set('librariesVersions', librariesVersions);

    grunt.loadTasks('grunt/config');
    grunt.loadTasks('grunt/tasks');
};
