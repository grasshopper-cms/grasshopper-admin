/*global module:false, require:false*/
module.exports = function (grunt) {

    "use strict";

    var _ = grunt.util._,
        plugins = {},
        idCounter = 1;

    plugins.fields = [];

    grunt.registerTask('buildPluginsSingleton', function () {
        grunt.file.recurse('app/plugins', callback);
        console.log(plugins);
    });

    function callback(abspath, rootdir, subdir, filename) {
        var thisField;
        console.log(abspath);
        console.log(rootdir);
        console.log(subdir);
        console.log(filename);
        console.log('----------------------------');

        // Loop through the directory.
        // if the sub directory is not in the fields array. push it on.
        if(_.isEmpty(_.where(plugins.fields, {type: subdir}))) {
            plugins.fields.push({
                type: subdir,
                id : idCounter
            });
            idCounter++;
        }

        // if the filename is a view. then add its path minus the app/
        // to the view property on the field
        if(filename === 'view.js') {
            thisField = _.where(plugins.fields, {type: subdir})[0];
            thisField.view = abspath.replace('app', '.');
        }
        // then read the view file and get the 'Name', 'HelpText'
        // attach those to the field property as well.

        // if the filename is a config. Then add its path minuts the app/
        // to the config property on the field
        if(filename === 'config.js') {
            thisField = _.where(plugins.fields, {type: subdir})[0];
            thisField.config = abspath.replace('app', '.');
        }




    }

};