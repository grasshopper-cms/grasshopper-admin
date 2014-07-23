/* jshint node:true */
'use strict';
console.log('starting');
var express = require('express'),
    app = express(),
    api = require('grasshopper-api'),
    PORT = process.env.PORT || 3000;

app.use(api('use proxy').ghApi);
app.use(express.static(__dirname + '/public'));
console.log('litening on: ' + PORT);
app.listen(PORT);