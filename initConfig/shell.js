/*globals module:true */
module.exports = function (grunt) {
    'use strict';

    grunt.config('shell', {
        install_api_node_modules : {
            command : 'npm install',
            options : {
                failOnError : true,
                stderr : true,
                stdout: true,
                execOptions : {
                    cwd : 'api'
                }
            }
        },
        install_api_vagrant_plugins : {
            command : [
                'vagrant plugin install vagrant-exec',
                'vagrant plugin install vagrant-vbguest'
            ].join('&&'),
            options : {
                failOnError : true,
                stderr : true,
                stdout: true,
                execOptions : {
                    cwd : 'api'
                }
            }
        },
        vagrant_go : {
            command : 'set dynamically',
            options : {
                failOnError : true,
                stderr : true,
                stdout: true,
                execOptions : {
                    cwd : 'api'
                }
            }
        },
        test_vagrant_box : {
            command : 'curl http://localhost:8080/token -H "Accept: application/json" -H "Acceen_US" -u "apitestuser:TestPassword"',
            options : {
                stdout: true
            }
        }
    });

    grunt.loadNpmTasks('grunt-shell');
};