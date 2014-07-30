/* jshint node:true */
'use strict';

var savedConfig;

module.exports = function (grunt) {
    grunt.registerTask('getBowerVersions', function () {
        var versions = grunt.file.expand(['app/vendor/*/.bower.json']).map(function (filename) {
            var contents = grunt.file.readJSON(filename);
            return {
                name: contents.name,
                version: contents.version
            };
        });

        grunt.config.set('libraryVersions', versions);

    });
};


