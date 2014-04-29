/*global module:false, require:false*/
module.exports = function (grunt) {

    "use strict";

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
