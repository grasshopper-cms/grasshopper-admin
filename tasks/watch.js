/*global module:false, require:false*/
module.exports = function (grunt) {

    "use strict";

    var _ = grunt.util._;

    var changedFiles = [];
    var changedJsFiles = [];

// We want to collect all file changes for a particular set of changed files
    var onChange = grunt.util._.debounce(function() {
        var filesArray = grunt.config.get('copy.redo.files');
        filesArray[0].src = changedFiles;
        grunt.config.set('copy.redo.files', filesArray);
        grunt.config.set('jshint.files', changedJsFiles);
        changedFiles = [];
        changedJsFiles = [];
    }, 200);

    grunt.event.on('watch', function(action, filepath) {

        if (/\.scss$|\.css$/.test(filepath)) {
            return;
        }

        switch (action) {
        case "changed":
            // TODO: remove hard coded app and replace with config variable
            filepath = filepath.match(/^app\/([^$]+)$/)[1];
            changedFiles.push(filepath);
            if ("js" === filepath.slice(-2)) {
                changedJsFiles.push(filepath);
            }
            onChange();
            break;
        }
    });

};