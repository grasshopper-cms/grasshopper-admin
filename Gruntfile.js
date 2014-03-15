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

    grunt.registerTask('build', 'Build and watch task', [
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

    grunt.registerTask('optomortis-rex', [
        'setupBowerCopy',
        'copy:build',
        'copy:vendor',

        'useminPrepare',
        'requirejs',
//        'imagemin',
        'concat',
        'uglify',
        'rev',
        'usemin',

        'registerPlugins',
        'paths:app',
        'setBuildConfig',
        'sass',
        'autoprefixer:no_dest'
    ]);
};