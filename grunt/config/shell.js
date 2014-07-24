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
            command : grunt.template.process('mongodump -h <%= mongo %> -d <%= herokuApp %> -u <%= herokuApp %> -p <%= herokuKey %> -o grunt/seedData')
        },
        mongorestore : {
            options : {
                stdout : true,
                stderr : true,
                failOnError : true
            },
            command : grunt.template.process('mongorestore --drop --db <%= herokuApp %> --host <%= mongo %> -u <%= herokuApp %> -p <%= herokuKey %> grunt/seedData/<%= herokuApp %>')
        },
        mongomerge : {
            options : {
                stdout : true,
                stderr : true,
                failOnError : true
            },
            command : grunt.template.process('mongorestore --db <%= herokuApp %> --host <%= mongo %> -u <%= herokuApp %> -p <%= herokuKey %> grunt/seedData/<%= herokuApp %>')
        },
        bowerInstall : {
            options : {
                stdout : true,
                stderr : true,
                failOnError : true
            },
            command : 'bower install'
        },
        bundlerInstall : {
            options : {
                stdout : true,
                stderr : true,
                failOnError : true
            },
            command : 'bundle install'
        }
    });

    grunt.loadNpmTasks('grunt-shell');
};