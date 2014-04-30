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
    grunt.config.set('externalPluginsDirectory', ghaConfig.externalPluginsDirectory);
    grunt.config.set('version', version);

    grunt.loadTasks('grunt/initConfig');
    grunt.loadTasks('grunt/tasks');

    grunt.registerTask('saveData', 'Saves the current database to a local seed directory', [
        'clean:seedData',
        'shell:mongodump'
    ]);
    grunt.registerTask('loadData', 'Imports the local seed directory into the database', [
        'shell:mongorestore'
    ]);
    grunt.registerTask('mergeData', 'Attempts to merge the local seed directory with the database', [
        'shell:mongomerge'
    ]);
    grunt.registerTask('testApi', 'Test the heroku API', [
        'shell:test_heroku_api'
    ]);

    grunt.registerTask('build-no-optimize', 'Build and watch task', [
        'setupBowerCopy',
        'copy:build',
        'copy:vendor',
        'registerPlugins',
        'paths:app',
        'setBuildConfig',
        'sass',
        'autoprefixer:no_dest'
    ]);

    grunt.registerTask('server', 'Build and watch task', [
        'clean:build',
        'jshint',
        'setupBowerCopy',
        'copy:build',
        'copy:vendor',
        'registerPlugins',
        'paths:app',
        'setBuildConfig',
        'sass',
        'autoprefixer:no_dest',
        'connect:site',
        'watch'
    ]);

    grunt.registerTask('test', 'Build and watch task', [
        'clean:build',
        'jshint',
        'setupBowerCopy',
        'copy:build',
        'copy:vendor',
        'registerPlugins',
        'paths:tests',
        'setBuildConfig',
        'sass',
        'autoprefixer:no_dest',
        'connect:tests',
        'watch'
    ]);

    grunt.registerTask('build', [
        'shell:bowerInstall',
        'setupBowerCopy',
        'copy:build',
        'copy:vendor',
        'registerPlugins',
        'paths:app',
        'setBuildConfig',
        'sass',
        'autoprefixer:no_dest',
        'requirejs'
    ]);
};
