module.exports = function (grunt) {
    'use strict';

    grunt.registerTask('deploy:heroku', 'Deploy', function () {
        grunt.task.run([
            'loadGhConfigs',
            'clean:deploy',
            'releaseNotes',
            'shell:commitReleaseNotes',
            'build',
            'copy:deploy',
            'build_gh_pages:staging',
            'shell:setupHerokuEnvVariables',
            'shell:deployHeroku'
        ]);
    });
};