/*globals module:true */
module.exports = function (grunt) {
    'use strict';

    grunt.config('shell', {
        test_heroku_api : {
                command : grunt.template.process('curl <%= apiEndpoint %>/token -H "Accept: application/json" -H "Acceen_US" -u <%= userAdmin %>'),
                options : {
                    stdout: true
                }
        },
        mongodump : {
            options : {
                stdout : true,
                stderr : true,
                failOnError : true
            },
            command : 'mongodump -h <%= mongo %> -d <%= herokuApp %> -c users -u <%= herokuApp %> -p <%= herokuKey %> -o tasks/seedData/mongodb'
        },
        mongorestore : {
            options : {
                stdout : true,
                stderr : true,
                failOnError : true
            },
            command : 'mongorestore --drop --db <%= herokuApp %> --host <%= mongo %> -u <%= herokuApp %> -p <%= herokuKey %> tasks/seedData/mongodb/grasshopper'
        },
        mongomerge : {
            options : {
                stdout : true,
                stderr : true,
                failOnError : true
            },
            command : 'mongorestore --db <%= herokuApp %> --host <%= mongo %> -u <%= herokuApp %> -p <%= herokuKey %> tasks/seedData/mongodb/grasshopper'
        },
        bowerInstall : {
            options : {
                stdout : true,
                stderr : true,
                failOnError : true
            },
            command : 'bower install'
        },

    });

    grunt.loadNpmTasks('grunt-shell');
};