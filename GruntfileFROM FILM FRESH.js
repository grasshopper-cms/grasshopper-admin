/*global module:false, require:false*/
module.exports = function (grunt) {

    "use strict";

     var _ = grunt.util._,
        config = {
            env : 'staging',
            workingDir : 'build',
            platform : 'browser'
        },
        path = require('path');

    // using grunt to store a few globals.
    grunt.connect = {};
    grunt.connect.lrSnippet = require(path.normalize('grunt-contrib-livereload/lib/utils')).livereloadSnippet;
    grunt.connect.folderMount = function folderMount (connect, point) {
                                    return connect.static(path.resolve(point));
                                };

    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.loadTasks('tasks');

    // Project configuration.
    grunt.initConfig(_.extend(config, loadConfig('./tasks/options/')));

    grunt.registerTask("server", "Build and watch task", [
        'prompt:server',
        'clean:build',
        'clean:temp',
        'jshint',
        'copy:app',
        'copy:dependencies',
        'setPaths', // interpolate paths.json into main.js in the Build Directory.
        'setupMainCopy', // build the vendor Paths to copy dynamically.
        'copy:vendor',
        'setJadeFilesDev',
        'jade:compile',
        'setBuildConfig',
        'sass:application',
        'autoprefixer:no_dest',
        'copy:build',
        'connect:site',
        'open:reload',
        'watch'
    ]);

    grunt.registerTask("testServer", "Build and watch task", [
        'clean:build',
        'clean:temp',
        'jshint',
        'copy:app',
        'copy:dependencies',
        'setTestPaths',
        'setupMainCopy',
        'copy:vendor',
        'setJadeFilesDev',
        'jade:compile',
        'setBuildConfig',
        'sass',
        'autoprefixer',
        'copy:build',
        'connect:tests',
        'open:tests',
        'watch'
    ]);

    grunt.registerTask("build", "Deploy to gh-pages", [
        'shell:gitSubmo',
        'updateCwd',
        'prompt:build',
        'clean:build',
        'clean:temp',
        'copy:app',
        'copy:dependencies',
        'setPaths',
        'setupMainCopy',
        'copy:vendor',
        'setJadeFilesDev',
        'jade:compile',
        'setBuildConfig',
        'sass',
        'autoprefixer',
        'copy:build',
        'useminPrepare',
        'requirejs',
        'imagemin',
        'concat',
        'uglify',
        'rev',
        'usemin',
        'clean:temp',
        'build_gh_pages',
        'shell:gitSubmo',
        'clean:build'
    ]);

    function loadConfig(path) {
        var glob = require('glob'),
            object = {},
            key,
            required;

        glob.sync('*', {cwd: path}).forEach(function(option) {
            key = option.replace(/\.js$/,'');
            required = require(path + option);
            if (_.isFunction(required)) {
                required = required(grunt);
            }
            object[key] = required;
        });

        return object;
    }
};


