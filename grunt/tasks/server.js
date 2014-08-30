/*global module:false, require:false*/
module.exports = function (grunt) {

    "use strict";

    // Notes : the server task will copy everything to the build directory and serve it from there.
    //

    grunt.registerTask('server', 'Build and watch task', [
        'clean:build',
        'jshint',
        'vendor:setup:vendorFiles',
        'getBowerVersions',
        'copy:appJsAndHtmlToBuild',
        'copy:vendorFilesToBuild',
        'registerPlugins',
        'copy:fromTempToBuild',
        'replace:requirejs',
        'addBase',
        'clean:temp',
        'paths:toBuild',
        'interpolateConstantsBuild',
        'sass',
        'processTemplateResourceRefs:development',
        'autoprefixer:no_dest',
        'loadGhConfigs',
        'env:localhost',
        'express:site',
        'watch'
    ]);
};
