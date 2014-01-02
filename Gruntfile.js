/*global module:false, require:false*/
module.exports = function (grunt) {

    'use strict';

    var _ = grunt.util._,
        config = {};

    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.loadTasks('tasks');

    // load grunt Config. All config can be found in tasks/options
    grunt.initConfig(_.extend(config, loadConfig('./initConfig/')));

    grunt.registerTask('server', 'Build and watch task', [
        'clean',
        'jshint',
        'setupBowerCopy',
        'copy:build',
        'copy:vendor',
        'sass',
        'autoprefixer:no_dest',
        'connect:site',
        'watch'
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