/*global module:false, require:false*/
module.exports = function (grunt) {

    'use strict';
    var path = require('path');

    function replaceResourceFunction(match, p1) {
        var fullPath = path.resolve(grunt.config().buildDirectory + '/', p1),
            normalizePath = function (path) {
                return '/' + path.substring(grunt.config().buildDirectory.length + 1).replace(/\\/g, '/');
            };

        if (!grunt.filerev) {
            return '/' + p1;
        } else {
            return normalizePath(grunt.filerev.summary[fullPath]);
        }
    }

    /*
     * Should replace all {{RESOURCEREF: image.png}} strings in js, css or html with strong-versioned url from filerev
     */
    grunt.registerMultiTask('processTemplateResourceRefs', 'Replace resources references after grunt-rev', function () {
        //var files = grunt.file.expand(grunt.config().buildDirectory + '/main*.js');
        this.files.forEach(function (file) {
            var filenameIn = file.src[0], filenameOut = file.dest, contents = grunt.file.read(filenameIn), processed_contents;
            processed_contents = contents ? contents.replace(/\{\{RESOURCEREF:([^}]+)\}\}/g, replaceResourceFunction) : '';
            grunt.file.write(filenameOut, processed_contents);
        });

    });


};