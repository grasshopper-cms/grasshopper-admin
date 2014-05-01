/*global module:false, require:false*/
module.exports = function (grunt) {

    "use strict";

    grunt.registerTask('test', 'Build and watch task', [
        'clean:build',
        'jshint',
        'vendor:setup:vendorFiles',
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
};
