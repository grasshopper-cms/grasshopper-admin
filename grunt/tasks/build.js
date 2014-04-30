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

    // TODO: css is not being minified
    grunt.registerTask('build', [
        'shell:bowerInstall',
        'setupBowerCopy',
        'copy:temp',
        'copy:vendor',
        'registerPlugins',
        'paths:app',
        'setBuildConfig',
        'copy:build',
        'sass',
        'autoprefixer:no_dest',
        'requirejs',
        'replace:requirejs',
        'useminPrepare',
        'imagemin',
        'rev',
        'cssmin',
        'usemin',
        'vendor:switch',
        'copy:vendor',
        'clean:temp'
    ]);
};
