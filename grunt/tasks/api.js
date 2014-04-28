/*global module:false, require:false*/
module.exports = function (grunt) {

    "use strict";

    grunt.registerTask('apiTest', [
        "shell:test_heroku_api"
    ]);
};
