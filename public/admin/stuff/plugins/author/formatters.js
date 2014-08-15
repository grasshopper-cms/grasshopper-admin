/*global define:false*/
define([], function () {
    'use strict';

    return {
        asSelectedUser: {
            read: readAsSelectedUser,
            publish: publishAsSelectedUser
        }
    };

    function readAsSelectedUser(value) {
        if (value) {
            return value;//.toLowerCase().trim().replace(/[\s]+/g, '-').replace(/[^-a-zA-Z0-9._~]/g, '');
        }
        else {
            return '';
        }
    }

    function publishAsSelectedUser(value) {
        if (value) {
            return value;//.toLowerCase().trim().replace(/[\s]+/g, '-').replace(/[^-a-zA-Z0-9._~]/g, '');
        } else {
            return '';
        }
    }
});