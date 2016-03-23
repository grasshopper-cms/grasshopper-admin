'use strict';

var route = require('./route');

module.exports = {
    register : register
};

function register(ghAdmin) {
    console.log('++++++');
    console.log('++++++');
    console.log('++++++');
    console.log('++++++');
    console.log('++++++');
    console.log('++++++');
    route(ghAdmin.router, ghAdmin.db);
}