'use strict';

var route = require('./route');

module.exports = {
    register : register
};

function register(ghAdmin) {
    route(ghAdmin.router, ghAdmin.db);
}