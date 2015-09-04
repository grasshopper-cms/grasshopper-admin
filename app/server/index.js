/* jshint node:true */
'use strict';

var express = require('express'),
    app = express(),
    path = require('path'),
    api = require('grasshopper-api'),
    sass = require('node-sass-middleware'),
    autoprefixer = require('express-autoprefixer'),
    child_process = require('child_process'),
    port = 3004;

setup();
ensureBowerDependenciesHaveBeenInstalled();
listen();

function setup() {
    api = api();

    app.use(sass({
        src : path.join(__dirname, '..', 'client'),
        dest : path.join(__dirname, '..', 'client'),
        debug : true,
        force : true,
        error : function(err) {
            console.log(err);
        }
    }));

    app.use(autoprefixer({ browsers: 'last 2 versions', cascade: false }));

    app.use(express.static(path.join(__dirname, '..', 'client')));

    app.use(api.ghApi || api.router);

    app.get('/admin', function(request, response) {
        response.sendFile(path.join(__dirname, '..', 'client', 'index.html'));
    });

    app.get('*', function(request, response) {
        response.redirect('/admin');
    });
}

function listen() {
    var server = app.listen(process.env.PORT || port, function () {
        console.log('Admin listening on port - ' + server.address().port);
    });
}

function ensureBowerDependenciesHaveBeenInstalled() {
    console.log('Ensuring Bower Dependencies Installed');
    child_process.execSync('bower install');
    console.log('Completed Dependencies Install');
}
