/*global module:false*/
module.exports = function (grunt) {

    'use strict';

    grunt.registerTask('build-no-optimize', 'Build and watch task', [
        'vendor:setup:vendorFiles',
        'copy:build',
        'copy:vendor',
        'registerPlugins',
        'paths:app',
        'getBowerVersions',
        'setBuildConfig',
        'sass',
        'autoprefixer:no_dest',
        'addBase'
    ]);

    grunt.registerTask('build', [
        'shell:bundleInstall',
        'shell:bowerInstall',
        'getBowerVersions',
        'vendor:setup:vendorFiles',
        'copy:temp',
        'copy:vendor',
        'registerPlugins',
        'paths:toTemp',
        'interpolateConstantsTemp',
        'copy:imagesToBuild',
        'sass',
        'autoprefixer:no_dest',
        'copy:index',
        'requirejs',
        'vendor:switch',
        'vendor:setup:vendorBuilt',
        'copy:vendor',
        'useminPrepare',
        'imagemin',
        'filerev',
        'usemin',
        'addBase',
        'processTemplateResourceRefs:production',
        'clean:temp'
    ]);
};
