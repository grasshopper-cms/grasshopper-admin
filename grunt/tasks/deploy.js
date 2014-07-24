module.exports = function (grunt) {
    'use strict';

    grunt.registerTask('deploy', 'Deploy', function () {
        grunt.task.run(['releaseNotes', 'shell:commitReleaseNotes', 'build', 'copy:deploy', 'build_gh_pages:staging']);
    });
};