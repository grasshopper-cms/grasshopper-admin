/*globals module:true */
module.exports = function (grunt) {
    'use strict';

    var buildDirectory = grunt.config.get('buildDirectory');

    grunt.config('shell', {
        test_heroku_api : {
            command : 'curl '+ buildDirectory +'/token -H "Accept: application/json" -H "Acceen_US" -u "admin:TestPassword"',
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
            command : 'mongodump -h ds035448.mongolab.com:35448 -d heroku_app23638163 -c users -u heroku_app23638163 -p urektptiutkj0vvhg658v7v3t4 -o tasks/seedData/mongodb'
        },
        mongorestore : {
            options : {
                stdout : true,
                stderr : true,
                failOnError : true
            },
            command : 'mongorestore --drop --db heroku_app23638163 --host ds035448.mongolab.com:35448 -u heroku_app23638163 -p urektptiutkj0vvhg658v7v3t4 tasks/seedData/mongodb/grasshopper'
        },
        mongomerge : {
            options : {
                stdout : true,
                stderr : true,
                failOnError : true
            },
            command : 'mongorestore --db heroku_app23638163 --host ds035448.mongolab.com:35448 -u heroku_app23638163 -p urektptiutkj0vvhg658v7v3t4 tasks/seedData/mongodb/grasshopper'
        },
        bowerInstall : {
            options : {
                stdout : true,
                stderr : true,
                failOnError : true
            },
            command : 'bower install'
        }
    });

    grunt.loadNpmTasks('grunt-shell');
};