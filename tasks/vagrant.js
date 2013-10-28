/*global module:false, require:false*/
module.exports = function (grunt) {

    "use strict";

    var _ = grunt.util._;

    grunt.registerTask('vagrant', "use vagrant:help", function vagrant (target, extra) {
        var tasks = {
                install : {
                    run : ["shell:install_api_node_modules", "shell:install_api_vagrant_plugins", "vagrant:run:up:--provision", "shell:test_vagrant_box", "copy:vagrant" ],
                    help : "Install and set up vagrant box "
                },
                test : {
                    run : ['shell:test_vagrant_box'],
                    help : "grabs an auth token to ensure box is running"
                },
                run : {
                    help : "runs arbitrary vagrant tasks - e.g. up, reload, destroy"
                },
                reload : {
                    run : ["vagrant:run:reload:--provision"],
                    help : "will reload vagrant and run provisioning shell tasks"
                }
            },
            vagrantCommands = Array.prototype.splice.call(arguments, 1);

        if (!extra) {
            if (tasks[target]) {
                grunt.task.run(tasks[target].run);
            } else {
                if ("help" === extra) {
                    _.each(_.keys(tasks), function (key) {
                        grunt.log.subhead(key).writeln(tasks[key].help);
                    });
                } else {
                    grunt.task.run(['vagrant:run:' + target]);
                }
            }
        } else {
            if ('help' === target) {
                grunt.log.subhead("Help:").subhead(tasks[extra] ? tasks[extra].help : 'use the form grunt vagrant:help:task');
            } else if ('run' === target) {
                vagrantCommands = vagrantCommands.join(' ');
                grunt.log
                    .subhead('Running...')
                    .subhead('vagrant ' + vagrantCommands)
                    .subhead(' ... go!');

                grunt.config.set('shell.vagrant_go.command', 'vagrant ' + vagrantCommands);
                grunt.task.run(['shell:vagrant_go']);
            } else {
                grunt.task.run(['vagrant:run:' + this.args.join(':')]);
            }
        }


    });
};
