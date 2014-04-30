/*global module:false, require:false*/
module.exports = function (grunt) {

    "use strict";

    grunt.registerTask('vendor:switch', function() {
        var vendorCopy = grunt.config.get('copy.vendor.files');
        grunt.config.set('vendorDest', grunt.config.get('buildDirectory'));
        vendorCopy[0].dest = grunt.config.get('buildDirectory');
        grunt.config.set('copy.vendor.files', vendorCopy);
    });
};
