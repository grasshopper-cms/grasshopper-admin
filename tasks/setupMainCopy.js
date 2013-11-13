/*global module:false, require:false*/
module.exports = function (grunt) {

    "use strict";

    var _ = grunt.util._,
        path = require('path');

    // TODO: see if this works
    grunt.registerTask('setupBowerCopy', 'reads main.js and grabs js deps', function() {

        var filesToCopy = grunt.file.readJSON(path.normalize('vendorFiles.json')),
            copy = grunt.config.get('copy');

        _.each(filesToCopy, function(path) {
            copy.build.files[0].src.push(path);
        });
    });

};