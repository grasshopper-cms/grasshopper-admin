/*globals module:true */
module.exports = function (grunt) {
    'use strict';

    var buildDirectory = grunt.config.get('buildDirectory');

    grunt.config('sass', {
        application : { // Get and compile application.scss
            options : {
                style : 'expanded',
                require : 'sass-globbing',
                sourcemap : true
            },
            files : grunt.file.expandMapping(['themes/**/main.scss'], 'css', {
                cwd: 'app/',
                rename: function (dest, matched) {
                    return buildDirectory +'/'+ matched.replace(/\.scss$/, '.css');
                }
            })
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
};
