module.exports = function (grunt) {
    'use strict';

    grunt.registerTask('deploy:heroku', 'The deploy.\n' +
                                        'To change the env variables, use a truthy argument:\n' +
                                        'grunt deploy:heroku:1', function (loadConfigs) {
        var tasks = [
            'clean:deploy',
            'build',
            'copy:deploy',
        ];

        if (loadConfigs) {
            grunt.log.write('Loading ghapi configs');
            tasks = [
                'loadGhConfigs',
                'shell:setupHerokuEnvVariables'
            ]
                .concat(tasks)
                .concat([
                    'loadGhConfigs:restore'
                ]);
        }

        grunt.task.run(tasks);
    });
};