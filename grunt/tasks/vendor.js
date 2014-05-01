/*global module:false*/
module.exports = function (grunt) {

    'use strict';

    var _ = grunt.util._,
        path = require('path');

    grunt.registerTask('vendor:switch', function() {
        var vendorCopy = grunt.config.get('copy.vendor.files');
        grunt.config.set('vendorDest', grunt.config.get('buildDirectory'));
        vendorCopy[0].dest = grunt.config.get('buildDirectory');
        grunt.config.set('copy.vendor.files', vendorCopy);
    });

    grunt.registerTask('vendor:setup', 'reads main.js and grabs js deps', function(file) {

        var filesToCopy = grunt.file.readJSON(path.normalize(file + '.json')),
            copy = grunt.config.get('copy');

        copy.vendor.files[0].src = [];
        copy.vendorFilesToBuild.files[0].src = [];
        _.each(filesToCopy, function(path) {
            copy.vendor.files[0].src.push(path);
            copy.vendorFilesToBuild.files[0].src.push(path);
        });

        console.log(JSON.stringify(copy));

        grunt.config.set('copy', copy);
    });
};
