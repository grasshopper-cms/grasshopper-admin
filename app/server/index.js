/* jshint node:true */
'use strict';

var express = require('express'),
    app = express(),
    path = require('path'),
    api = require('grasshopper-api'),
    PORT = process.env.PORT || 3000;

api = api();
app.use(api.ghApi || api.router);
app.use(express.static(path.join(__dirname, '../client')));

app.get('/admin*?', function(request, response) {
    response.sendfile(path.join(__dirname, '..', 'client', 'index.html'));
});

app.listen(PORT, function() {
    console.log('Listening on: ' + PORT);
});
