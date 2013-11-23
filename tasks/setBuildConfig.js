/*global module:false, require:false*/
module.exports = function (grunt) {

    "use strict";

    var _ = grunt.util._;

    grunt.registerTask("setBuildConfig", "Sets the correct build config for constants", function () {
        var template = grunt.file.read('app/constants.js'),
            data = grunt.file.readJSON('config.' + grunt.config.get('env') + '.json'),
            finished = grunt.template.process(template, {data : data});

        grunt.file.write('temp/constants.js', finished);
    });
}