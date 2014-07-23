/*global module:false, require:false*/
module.exports = function (grunt) {

    "use strict";

    // Notes : the server task will copy everything to the build directory and serve it from there.
    //

    grunt.registerTask('server', 'Build and watch task', [
        'clean:build',
        'jshint',
        'vendor:setup:vendorFiles',
        'copy:appJsAndHtmlToBuild',
        'copy:vendorFilesToBuild',
        'registerPlugins',
        'copy:fromTempToBuild',
        'clean:temp',
        'paths:toBuild',
        'interpolateConstantsBuild',
        'sass',
        'autoprefixer:no_dest',
        'express:site',
        'watch'
    ]);
};
