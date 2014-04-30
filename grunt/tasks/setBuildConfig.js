/*global module:false, require:false*/
module.exports = function (grunt) {

    "use strict";

    var _ = require('lodash'),
        tempDirectory = grunt.config.get('tempDirectory'),
        apiEndpoint = grunt.config.get('apiEndpoint'),
        version = grunt.config.get('version');

    grunt.registerTask("setBuildConfig", "Sets the correct build config for constants", function () {
        var template = grunt.file.read('app/constants.js'),
            finished = grunt.template.process(template, {
                data : {
                    apiEndpoint : apiEndpoint,
                    version : version
                }
            });

        grunt.file.write(tempDirectory + '/constants.js', finished);
    });
}