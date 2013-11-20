/*global module:false, require:false*/
module.exports = function (grunt) {

    "use strict";

    var _ = grunt.util._,
        path = require('path');

    grunt.registerTask('setupBowerCopy', 'reads main.js and grabs js deps', function() {

        var filesToCopy = grunt.file.readJSON(path.normalize('app/vendorFiles.json')),
            copy = grunt.config.get('copy');

        _.each(filesToCopy, function(path) {
            copy.vendor.files[0].src.push(path);
        });

        grunt.config.set('copy', copy);
    });
};