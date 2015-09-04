/* jshint node:true */
'use strict';

var express = require('express'),
    app = express(),
    path = require('path'),
    api = require('grasshopper-api'),
    port = process.env.PORT || 3004;

api = api();
app.use(api.ghApi || api.router);
app.use(express.static(path.join(__dirname, '../client')));

app.get('/admin', function(request, response) {
    response.sendFile(path.join(__dirname, '..', 'client', 'index.html'));
});

app.get('*', function(request, response) {
    response.redirect('/admin');
});

app.listen(port, function() {
    console.log('Listening on: ' + port);
});
