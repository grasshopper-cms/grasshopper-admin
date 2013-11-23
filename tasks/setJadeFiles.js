/*global module:false, require:false*/
module.exports = function (grunt) {

    "use strict";

    var _ = grunt.util._,
        path = require('path');

    grunt.registerTask('setJadeFilesDev', 'Sets the Jade files dynamically', function() {
        // Get all Jade Files.
        var files = grunt.file.expandMapping(['**/*.jade'], 'temp/', {
            cwd : 'temp',
            rename : function (destBase, destPath) {
                return destBase + destPath.replace(/\.jade$/, '.html');
            }
        });
        grunt.config.set('jade.compile.files', files);
    });

    grunt.registerTask('setJadeFilesRedo', 'Sets the Jade files dynamically', function() {
        // Get all Jade Files.
        var files = grunt.file.expandMapping(['**/*.jade'], 'build/', {
            cwd : 'app',
            rename : function (destBase, destPath) {
                return destBase + destPath.replace(/\.jade$/, '.html');
            }
        });
        grunt.config.set('jade.compile.files', files);
    });

};