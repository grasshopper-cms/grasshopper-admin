/*global module:false, require:false*/
module.exports = function (grunt) {

    "use strict";

    grunt.registerTask('server', 'Build and watch task', [
        'clean:build',
        'jshint',
        'vendor:setup:vendorFiles',
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
};
