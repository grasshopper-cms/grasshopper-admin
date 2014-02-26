/*global module:false, require:false*/
module.exports = function (grunt) {

    'use strict';

    var warning = {
            readme : 'Compiled file. Do not modify directly.'
        },
        ghaConfig = grunt.file.findup('gha.json', {nocase: true}),
        path = require('path');

    if (!ghaConfig) {
        grunt.fatal('Please create a build configuration file at "gha.json"');
    }

    ghaConfig = grunt.file.readJSON(ghaConfig);

    grunt.config.set('apiEndpoint', ghaConfig.apiEndpoint);

    if(__dirname.split(path.sep).pop() === 'node_modules') {
        grunt.config.set('buildDirectory', '../../' + ghaConfig.buildDirectory);
    } else {
        grunt.config.set('warning', warning);
        grunt.config.set('buildDirectory', ghaConfig.buildDirectory);
    }

    grunt.loadTasks('initConfig');
    grunt.loadTasks('tasks');

    grunt.registerTask('build', 'Build and watch task', [
        'clean',
        'jshint',
        'setupBowerCopy',
        'copy:build',
        'copy:vendor',
        'registerPlugins',
        'setBuildConfig',
        'sass',
        'autoprefixer:no_dest'
    ]);

    grunt.registerTask('server', 'Build and watch task', [
        'clean',
        'jshint',
        'setupBowerCopy',
        'copy:build',
        'copy:vendor',
        'registerPlugins',
        'setBuildConfig',
        'sass',
        'autoprefixer:no_dest',
        'connect:site',
        'watch:dev'
    ]);
    grunt.registerTask('testServer', 'Build and watch task', [
        'jshint',
        'copy:build',
        'connect:tests',
        'sass',
        'connect:tests',
        'watch'
    ]);
    grunt.registerTask('deploy', 'Deploy to gh-pages', [
        'clean',
        'copy:deploy',
        'useminPrepare',
        'requirejs',
        'imagemin',
        'concat',
        'uglify',
        'rev',
        'sass',
        'usemin',
        'build_gh_pages'
    ]);
};