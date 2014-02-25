module.exports = function(grunt) {

    var buildDirectory = grunt.config.get('buildDirectory');

    return {
        build : [buildDirectory]
    }
};