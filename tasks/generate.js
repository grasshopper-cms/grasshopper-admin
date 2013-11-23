/*global module:false, require:false*/
module.exports = function (grunt) {

    "use strict";

    var _ = grunt.util._;

    grunt.registerTask("generate", "Use, 'grunt generate:help' to find out more about auto generating new vies", function(viewName, viewPath) {
        var generateOptions = ['viewName', 'viewPath'],
            toAsk = [],
            args = arguments;

        if ('help' === viewName) {
            grunt.log.subhead("Help for grunt generate")
                .writeln("Use, 'grunt generate' to generate new view interactively.")
                .writeln("Use, 'grunt:[name]:[path]' to quickly generate a new view")
                .writeln("Use, 'grunt:[name]' to generate a new view with a given name and interactive path generation.");
            return;
        }

        // Add options passed in on command lines
        _.each(generateOptions, function(option, index) {
            if (args[index]) {
                grunt.config.set(option, args[index]);
            } else {
                toAsk.push('prompt:' + option);
            }
        });

        grunt.task.run(toAsk.concat(["generate_createViews"]));
    });

    grunt.registerTask("generate_createViews", "generates the files for a new view", function () {

        var data = {
            viewName : grunt.config.get('viewName')
        };

        grunt.file.recurse('viewTemplates', function (abspath, rootdir, subdir, filename) {
            var template = grunt.file.read(abspath),
                finished = grunt.template.process(template, {data : data}),
                viewPath = grunt.config.get('viewPath'),
                newFileName = filename.replace('name', grunt.config.get('viewName')),
                newFilePath = null,
                section = null;

            // Guarantee trailing slash
            // TODO: filepaths should be os normalized - grunt has stuff for this
            viewPath += /\/$/.test(viewPath) ? "" : "/";


            // Check the file names, setting the path and section where appropriate.
            switch(filename) {
                case 'nameViewModel.js':
                    newFilePath = 'app/models/viewModels/' + newFileName;
                    section = 'viewModels';
                    break;
                case 'nameView.jade':
                    newFilePath =  viewPath + grunt.config.get('viewName') + '/' + newFileName;
                    break;
                case 'nameView.js':
                    newFilePath =  viewPath + grunt.config.get('viewName') + '/' + newFileName;
                    section = 'views';
                    break;
                case 'nameView.scss':
                    newFilePath =  viewPath + grunt.config.get('viewName') + '/' + newFileName;
                    break;
                case 'nameViewConfig.js':
                    newFilePath =  viewPath + grunt.config.get('viewName') + '/' + newFileName;
                    section = 'views';
                    break;
            }

            // Write the new file.
            grunt.file.write(newFilePath, finished);

            // If the file needs to be in the paths, then put it where it needs to be.
            if (section) {
                grunt.task.run('addToPaths:' + section + ':' + newFileName + ':' + newFilePath);
            }

        });

    });

    grunt.registerTask("addToPaths", function(section, name, path) {
        var file =  grunt.file.readJSON('app/paths.json');
        file[section][name.substring(0, name.length - 3)] = path.substring(4, path.length - 3);
        grunt.file.write('app/paths.json', JSON.stringify(file, null, 4));
    });
}