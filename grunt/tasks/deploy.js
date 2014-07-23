module.exports = function (grunt) {
    'use strict';

    grunt.registerTask('deploy', 'Deploy', function () {

        grunt.task.run(['copy:deploy', 'build_gh_pages:staging']);
    });
};