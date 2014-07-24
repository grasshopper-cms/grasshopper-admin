module.exports = function (grunt) {
    'use strict';

    grunt.registerTask('deploy', 'Deploy', function () {
        grunt.task.run(['clean:deploy', 'releaseNotes', 'shell:commitReleaseNotes', 'build', 'copy:deploy', 'build_gh_pages:staging', 'shell:deployHeroku']);
    });
};