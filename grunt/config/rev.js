module.exports = function (grunt) {
    'use strict';
    var fs=require('fs');

    grunt.config('filerev', {
        dist : {
            src : [
                '<%= buildDirectory %>/main.js',
                '<%= buildDirectory %>/themes/main.css',
                '<%= buildDirectory %>/themes/img/{,*/}*.{png,jpg,jpeg,gif,webp}'
            ],
            filter: function(filepath) {
                if (/(^.*)\.[0-9a-f]{8}(\.(?:png|jpg|jpeg|gif|webp))$/.test(filepath)){
                    var oldFilename=filepath.replace(/(^.*)\.[0-9a-f]{8}(\.(?:png|jpg|jpeg|gif|webp))$/g, "$1$2");
                    if (fs.lstatSync(oldFilename).isFile()){
                        return false;
                    }
                }
                return true;
            }

        }

    });

    grunt.loadNpmTasks('grunt-filerev');
};