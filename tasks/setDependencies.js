/*global module:false, require:false*/
module.exports = function (grunt) {

    "use strict";

    var _ = grunt.util._;

    grunt.registerTask('setPaths', function () {
        var paths = grunt.file.read('app/paths.json'),
            processedPaths = JSON.parse(grunt.template.process(paths, {
                data:
                {
                    platform: grunt.config.get('platform')
                }
            })),
            pathArray = [],
            template = grunt.file.read('app/main.js'),
            pathsToReturn = {};

        // De-nest the Paths.JSON
        for(var category in processedPaths) {
            for(var subcategory in processedPaths[category]) {
                pathsToReturn[subcategory] = processedPaths[category][subcategory];
            }
        }

        // Re-build into a string.
        _.each(pathsToReturn, function(value, key) {
            pathArray.push(key + ':' + "'" + value + "'" );
        })

        // Interpolate paths into Main.js
        var finished = grunt.template.process(template, {
            data:
            {
                paths: '\n, paths: {' + pathArray.join(', \n') + '\n }'
            }
        });

        grunt.file.write('temp/main.js', finished);
    });

    /////////////////////////

    grunt.registerTask('setTestPaths', function () {

        var paths = grunt.file.read('app/paths.json'),
            processedPaths = JSON.parse(grunt.template.process(paths, {
                                                                        data:
                                                                        {
                                                                            platform: grunt.config.get('platform')
                                                                        }
                                                                      })),
            pathArray = [],
            template = grunt.file.read('tests/main.js'),
            pathsToReturn = {};

        // De-nest the Paths.JSON
        for(var category in processedPaths) {
            for(var subcategory in processedPaths[category]) {
                pathsToReturn[subcategory] = processedPaths[category][subcategory];
            }
        }

        // Re-build into a string.
        _.each(pathsToReturn, function(value, key) {
            pathArray.push(key + ':' + "'../app/" + value + "'" );
        })

        // Interpolate paths into Main.js
        var finished = grunt.template.process(template, {
            data:
            {
                paths: '\n, \n' + pathArray.join(', \n')
            }
        });

        grunt.file.write('temp/main.js', finished);
    });


};