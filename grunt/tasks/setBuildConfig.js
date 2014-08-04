/*global module:false, require:false*/
module.exports = function (grunt) {

    "use strict";

    var tempDirectory = grunt.config.get('tempDirectory'),
        buildDirectory = grunt.config.get('buildDirectory'),
        apiEndpoint = grunt.config.get('apiEndpoint'),
        version = grunt.config.get('version');

    grunt.registerTask("interpolateConstantsTemp", "Sets the correct build config for constants", function () {
        var template = grunt.file.read('app/constants.js'),
            finished = grunt.template.process(template, {
                data : {
                    apiEndpoint : apiEndpoint,
                    version : version,
                    libraryVersions : grunt.config.get('libraryVersions')
                }
            });

        grunt.file.write(tempDirectory + '/constants.js', finished);
    });

    grunt.registerTask("interpolateConstantsBuild", "Sets the correct build config for constants", function () {
        var template = grunt.file.read('app/constants.js'),
            finished = grunt.template.process(template, {
                data : {
                    apiEndpoint : apiEndpoint,
                    version : version,
                    libraryVersions: grunt.config.get('libraryVersions')
                }
            });

        grunt.file.write(buildDirectory + '/constants.js', finished);
    });
}