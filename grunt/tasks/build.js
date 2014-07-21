/*global module:false*/
module.exports = function (grunt) {

    'use strict';

    grunt.registerTask('build-no-optimize', 'Build and watch task', [
        'vendor:setup:vendorFiles',
        'copy:build',
        'copy:vendor',
        'registerPlugins',
        'paths:app',
        'setBuildConfig',
        'sass',
        'autoprefixer:no_dest'
    ]);

    grunt.registerTask('build', [
        'shell:bundlerInstall',
        'shell:bowerInstall',
        'vendor:setup:vendorFiles',
        'copy:temp',
        'copy:vendor',
        'registerPlugins',
        'paths:toTemp',
        'interpolateConstantsTemp',
        'copy:imagesToBuild',
        'sass',
        'autoprefixer:no_dest',
        'requirejs',
        'replace:requirejs',
        'vendor:switch',
        'vendor:setup:vendorBuilt',
        'copy:vendor',
        'useminPrepare',
        'imagemin',
        'filerev',
        'usemin',
        'processTemplateResourceRefs:production',
        'clean:temp'
    ]);
};
