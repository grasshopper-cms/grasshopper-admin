/*global module:false, require:false*/
module.exports = function (grunt) {

    'use strict';

    var warning = {
            readme : 'Compiled file. Do not modify directly.'
        },
        path = require('path'),
        ghaConfig = grunt.file.findup('gha.json', {nocase: true}),
        ghaConfigPath = path.dirname(ghaConfig);

    if (!ghaConfig) {
        grunt.fatal('Please create a build configuration file at "gha.json"');
    }

    ghaConfig = grunt.file.readJSON(ghaConfig);

    grunt.config.set('apiEndpoint', ghaConfig.apiEndpoint);


    grunt.config.set('warning', warning);
    grunt.config.set('buildDirectory', ghaConfigPath + path.sep + ghaConfig.buildDirectory);

    grunt.loadTasks('initConfig');
    grunt.loadTasks('tasks');

    grunt.registerTask('saveData', ['clean:seedData', 'shell:mongodump', 'copy:seedDataToGh']);
    grunt.registerTask('loadData', ['copy:seedDataToApi', 'shell:mongorestore']);
    grunt.registerTask('mergeData', ['copy:seedDataToApi', 'shell:mongomerge']);

    grunt.registerTask('build-no-optimize', 'Build and watch task', [
        'clean:build',
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
        'watch:dev'
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

    grunt.registerTask('build', ['build-no-optimize']);
// This is commented out, since ckEditor does not work on optimized build - aliasing to non optimized for now
//    grunt.registerTask('build', [
//        'clean:build',
//        'setupBowerCopy',
//        'copy:build',
//        'copy:vendor',
//        'registerPlugins',
//        'paths:app',
//        'setBuildConfig',
//        'sass',
//        'autoprefixer:no_dest',
//        'requirejs'
//    ]);
};
