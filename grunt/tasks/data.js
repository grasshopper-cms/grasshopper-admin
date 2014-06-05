/*global module:false, require:false*/
module.exports = function (grunt) {

    "use strict";

    grunt.registerTask('data:save', 'Saves the current database to a local seed directory', [
        'clean:seedData',
        'shell:mongodump'
    ]);
    grunt.registerTask('data:load', 'Imports the local seed directory into the database', [
        'shell:mongorestore'
    ]);
    grunt.registerTask('data:merge', 'Attempts to merge the local seed directory with the database', [
        'shell:mongomerge'
    ]);
};
