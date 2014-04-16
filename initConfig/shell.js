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
            command : grunt.template.process('mongodump -h <%= mongo %> -d <%= herokuApp %> -c users -u <%= herokuApp %> -p <%= herokuKey %> -o tasks/seedData')
        },
        mongorestore : {
            options : {
                stdout : true,
                stderr : true,
                failOnError : true
            },
            command : grunt.template.process('mongorestore --drop --db <%= herokuApp %> --host <%= mongo %> -u <%= herokuApp %> -p <%= herokuKey %> tasks/seedData/<%= herokuApp %>')
        },
        mongomerge : {
            options : {
                stdout : true,
                stderr : true,
                failOnError : true
            },
            command : grunt.template.process('mongorestore --db <%= herokuApp %> --host <%= mongo %> -u <%= herokuApp %> -p <%= herokuKey %> tasks/seedData/<%= herokuApp %>')
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