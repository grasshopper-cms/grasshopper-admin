'use strict';

var BB = require('bluebird'),
    express = require('express'),
    fs = BB.promisifyAll(require('fs')),
    glob = BB.promisify(require('glob')),
    mongodb = BB.promisifyAll(require('mongodb')),
    MongoClient = mongodb.MongoClient,
    path = require('path');

module.exports = function(options) {
    var adminRouter = express.Router(),

    // https://docs.mongodb.org/manual/reference/connection-string/

        host = options.db.host,
        auth = options.db.password ? `${ options.db.username }:${ options.db.password }@` : '',
        url = `mongodb://${ auth }${ host }`,

        ghAdmin = {
            db : null,
            router : adminRouter
        };

    console.log('url', url);

    MongoClient.connect(url).then(function(db) {
            console.log("Connected correctly to server");

            ghAdmin.db = db;
            // Find all directories that do not begin with underscores in this directory
            glob(`${ __dirname }/preinstalled-plugins/[^_]*/`)
                .then(function(dirs) {
                    dirs.forEach(function(dir) {

                        console.log(`registering: ${ dir }`);
                        var plugin = require(`${ dir }`);
                        plugin.register(ghAdmin);
                    });
                });
        })
        .catch(function(e) {
            console.log('error', e);
        });

    adminRouter.use(express.static(path.join(__dirname, '_public')));


    return adminRouter;
};