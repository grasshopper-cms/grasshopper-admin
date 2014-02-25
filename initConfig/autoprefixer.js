module.exports = function(grunt) {

    var buildDirectory = grunt.config.get('buildDirectory');

    return {
        options : {},
        no_dest: {
            src: buildDirectory + '/themes/blue-dashboard/main.css'
        },
        redo: {
            src: buildDirectory + '/themes/blue-dashboard/main.css'
        }
    };
};