/* jshint node:true */
'use strict';

module.exports = function (grunt) {
    grunt.registerTask('getBowerVersions', function () {
        var bowerInfo = grunt.file.readJSON('bower.json'), versions = [];
        grunt.file.expand(['app/vendor/*/.bower.json']).forEach(function (filename) {
            var contents = grunt.file.readJSON(filename);
            console.log("Bower library " + contents.name + " version " + contents.version + " found");
            if (bowerInfo.dependencies[contents.name] !== undefined) {
                versions.push({
                    name: contents.name,
                    version: contents.version
                });
            }
        });

        grunt.config.set('libraryVersions', versions);

    });
};


