/*globals module:true */
module.exports = function (grunt) {
    'use strict';

    var tempDirectory = '.tmp';

    grunt.config('sass', {
        application : { // Get and compile application.scss
            options : {
                style : 'compressed',
                require : 'sass-globbing',
                sourcemap : true
            },
            files : grunt.file.expandMapping(['themes/**/main.scss'], 'css', {
                cwd: 'app/',
                rename: function (dest, matched) {
                    return tempDirectory +'/'+ matched.replace(/\.scss$/, '.css');
                }
            })
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
};
