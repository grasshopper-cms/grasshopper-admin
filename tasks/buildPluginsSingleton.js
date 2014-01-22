/*global module:false, require:false*/
module.exports = function (grunt) {

    "use strict";

    var _ = grunt.util._,
        plugins = {},
        idCounter = 1;

    plugins.fields = [];

    grunt.registerTask('buildPluginsSingleton', function () {
        var pluginsFile,
            templatedFile;
        grunt.file.recurse('app/plugins', buildPluginsObject);
        pluginsFile = grunt.file.read('app/plugins.js');
        templatedFile = grunt.template.process(pluginsFile, {
            data: {
                plugins : JSON.stringify(plugins, null, "    ")
            }
        });

        grunt.file.write('build/plugins.js', templatedFile);
    });

    function buildPluginsObject(abspath, rootdir, subdir, filename) {
        var thisField,
            readMe;

        if(_.isEmpty(_.where(plugins.fields, {type: subdir}))) {
            plugins.fields.push({
                type: subdir,
                id : idCounter
            });
            idCounter++;
        }

        if(filename === 'view.js') {
            thisField = _.where(plugins.fields, {type: subdir})[0];
            thisField.view = abspath.replace('app', '.');
        }

        if(filename === 'readme.json') {
            thisField = _.where(plugins.fields, {type: subdir})[0];
            readMe = grunt.file.readJSON(abspath);
            thisField.helpText = readMe.helpText;
            thisField.name = readMe.name;
        }

        if(filename === 'config.js') {
            thisField = _.where(plugins.fields, {type: subdir})[0];
            thisField.config = abspath.replace('app', '.');
        }
    }
};