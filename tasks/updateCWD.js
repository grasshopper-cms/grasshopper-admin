/*global module:false, require:false*/
module.exports = function (grunt) {

    "use strict";

    var _ = grunt.util._;

    grunt.registerTask('updateCwd', 'sets it to build or temp', function () {
        grunt.config.set('workingDir', 'temp');
    });
};