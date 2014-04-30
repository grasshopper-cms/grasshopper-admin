/*global module:false, require:false*/
module.exports = function (grunt) {

    "use strict";

    grunt.registerTask('vendor:switch', function() {
        grunt.config.set('vendorDest', grunt.config.get('buildDirectory'));
    });
};
