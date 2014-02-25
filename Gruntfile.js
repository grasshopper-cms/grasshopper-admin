/*global module:false, require:false*/
module.exports = function (grunt) {

    'use strict';

    var _ = grunt.util._,
        config = {
            warning : '_Compiled file. Do not modify directly._'
        },
        ghaConfig = grunt.file.findup('gha.json', {nocase: true});

    if (!ghaConfig) {
        grunt.fatal('Please create a build configuration file at "gha.json"');
    }

    ghaConfig = grunt.file.readJSON(ghaConfig);

    grunt.config.set('apiEndpoint', ghaConfig.apiEndpoint);
    grunt.config.set('buildDirectory', ghaConfig.buildDirectory);

    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.loadTasks('tasks');

    // load grunt Config. All config can be found in tasks/options
    grunt.initConfig(_.extend(config, loadConfig('./initConfig/')));

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

    function loadConfig(files) {
        var path = require('path'),
            object = {};

        grunt.file.recurse(files, function callback(abspath, rootdir, subdir, filename) {
            var name = path.basename(filename, path.extname(filename)),
                required = require(path.resolve('.', abspath));

            if (_.isFunction(required)) {
                required = required(grunt);
            }
            object[name] = required;
        });

        return object;
    }
};