/*global module:false, require:false*/
module.exports = function (grunt) {

    "use strict";

    var _ = require('lodash'),
        tempDirectory = grunt.config.get('tempDirectory'),
        fs = require('fs'),
        externalPluginsDirectory = grunt.config.get('externalPluginsDirectory'),
        plugins = {},
        idCounter = 1,
        defineBlock = [],
        argumentsBlock = [],
        pluginsAsTemplatedArray = [],
        eachPluginTemplate = '\n\t\t\t\t{' +
                                '\n\t\t\t\t\ttype: "<%= type %>", ' +
                                '\n\t\t\t\t\tid: <%= id %>, ' +
                                '\n\t\t\t\t\tconfig: <%= config + "Config" %>, ' +
                                '\n\t\t\t\t\thelpText: "<%= helpText %>", ' +
                                '\n\t\t\t\t\tname: "<%= name %>", ' +
                                '\n\t\t\t\t\tview: <%= view + "View" %>' +
                                '\n\t\t\t\t}';

    plugins.fields = [];

    grunt.registerTask('registerPlugins', function () {
        var pluginsFile = grunt.file.read('app/plugins.js'),
            templatedFile;

        _doCleanup();

        grunt.file.recurse('app/plugins', buildPluginsObject);

        if(fs.existsSync(externalPluginsDirectory)) {
            grunt.file.recurse(externalPluginsDirectory, buildPluginsObject);
        }

        grunt.log.writeln(['Registering Plugins:']);

        _.each(plugins.fields, function(plugin) {
            pluginsAsTemplatedArray.push(grunt.template.process(eachPluginTemplate, {
                data : plugin
            }));
            grunt.log.writeln([plugin.id + ' : ' + plugin.name + ' registered.']);
        });

        templatedFile = grunt.template.process(pluginsFile, {
            data: {
                plugins : pluginsAsTemplatedArray,
                defineBlock : JSON.stringify(defineBlock),
                argumentsBlock : argumentsBlock.join()
            }
        });

        grunt.file.write(tempDirectory + '/plugins.js', templatedFile);

        if(fs.existsSync(externalPluginsDirectory)) {
            grunt.task.run('copy:externalPluginsToTemp');
        }
    });

    function _doCleanup() {
        plugins = {};
        idCounter = 1;
        defineBlock = [];
        argumentsBlock = [];
        pluginsAsTemplatedArray = [];
        plugins.fields = [];
    }

    function buildPluginsObject(abspath, rootdir, subdir, filename) {
        var thisField,
            readMe;

        // TODO: This is really sub optimal.
        if(subdir.indexOf('/') === -1) {
            if(_.isEmpty(_.where(plugins.fields, {type: subdir}))) {
                plugins.fields.push({
                    type: subdir,
                    id : idCounter
                });
                idCounter++;
            }

            if(filename === 'view.js') {
                thisField = _.where(plugins.fields, {type: subdir})[0];
                thisField.view = subdir;
                defineBlock.push(abspath.replace('app/', '').toString());
                argumentsBlock.push(subdir + 'View');
            }

            if(filename === 'readme.json') {
                thisField = _.where(plugins.fields, {type: subdir})[0];
                readMe = grunt.file.readJSON(abspath);
                thisField.helpText = readMe.helpText;
                thisField.name = readMe.name;
            }

            if(filename === 'config.js') {
                thisField = _.where(plugins.fields, {type: subdir})[0];
                thisField.config = subdir;
                defineBlock.push(abspath.replace('app/', '').toString());
                argumentsBlock.push(subdir + 'Config');
            }
        }


    }
};
