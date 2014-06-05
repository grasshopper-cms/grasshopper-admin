/*global module:false, require:false*/
module.exports = function (grunt) {

    "use strict";

    grunt.registerTask('api:test', [
        "shell:test_heroku_api"
    ]);
};
