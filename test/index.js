/* jshint node:true */
'use strict';
console.log('starting');
var express = require('express'),
    app = express(),
    api = require('grasshopper-api'),
    PORT = process.env.PORT || 3000,
    grasshopper = api(config()),
    db = process.argv[2];

app.use('/api', grasshopper.router);
app.use(express.static(__dirname + '/public'));

app.listen(PORT, function(){
    console.log('Listening on: ' + PORT);
});


function config() {
    return {
        "grasshopperAdmin" : require('../app'),
        "assets": {
            "default": "local",
            "tmpdir": "/home/ubuntu/tmp",
            "engines": {
                "local": {
                    "path": "/vagrant/app/public/assets",
                    "urlbase": "/assets"
                }
            }
        },
        "cache": {
            "path": "./cache"
        },
        "crypto": {
            "secret_passphrase": "1249d143-7119-4142-9302886ccdd8"
        },
        "db": {
            "type": "mongodb",
            "defaultPageSize": "10000",
            "endpoint": `mongodb://127.0.0.1:27017/${ db }`,
            "host": `127.0.0.1:27017/${ db }`,
            "debug": false
        },
        "logger": {
            "adapters": [
                {
                    "type": "console",
                    "application": "grasshopper-api",
                    "machine": "localtest"
                }
            ]
        },
        "server": {
            "proxy": true
        }
    }
}