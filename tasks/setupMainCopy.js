/*global module:false, require:false*/
module.exports = function (grunt) {

    "use strict";

    var _ = grunt.util._,
        path = require('path');

    grunt.registerTask('setupMainCopy', 'reads main.js and grabs js deps', function() {

        var main = grunt.file.read(path.normalize('app/main.js')),
            linefeed = /\r\n/g.test(main) ? '\r\n' : '\n',
            lines = main.split(linefeed),
            inPathsBlock = false,
            inPackagesBlock = true,
            file,
            location,
            directory,
            filesArray;



        _.each(lines, function(line) {
            if (/\s*packages\s*:\s*\[\s*/.test(line)) {
               inPackagesBlock = true;
            }

            if (/\s*\]\s*/.test(line)) {
                inPackagesBlock = false;
            }

            if (/\s*paths\s*:\s*\{\s*/.test(line)) {
                inPathsBlock = true;
            }
            if (/\s*\}\s*/.test(line)) {
                inPathsBlock = false;
            }
            if (inPathsBlock) {
                file = line.match(/[']([^']+)[']|["]([^"]+)["]/);
                if (file) {
                    filesArray = grunt.config.get('copy.vendor.files');
                    filesArray[0].src.push(file[1] + '.js');
                    grunt.config.set('copy.vendor.files', filesArray);
                }
            }

            // TODO: This does not work.
//            if (inPackagesBlock) {
//                file = line.match(/[']([^']+)[']|["]([^"]+)["]/);
//                if (file) {
//                    location = file.input.match(/location/);
//                    if (location) {
//                        directory = location.input.match(/[']([^']+)[']|["]([^"]+)["]/);
//                        if (directory) {
//                            filesArray = grunt.config.get('copy.vendor.files');
//                            filesArray[0].src.push(directory[1] + '.js');
//                            grunt.config.set('copy.vendor.files', filesArray);
//                        }
//                    }
//
//                }
//            }
        });

        filesArray = grunt.config.get('copy.vendor.files');
        filesArray[0].src.push('vendor/requirejs/require.js');
        grunt.config.set('copy.vendor.files', filesArray);

        grunt.log.verbose.writeln(JSON.stringify(grunt.config.get('copy.vendor.files')));
    });

};