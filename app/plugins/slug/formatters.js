/*global define:false*/
define([], function () {
    'use strict';

    return {
        asSlug : asSlug
    };

    function asSlug(value) {
        if(value) {
            return value.toLowerCase().trim().replace(/[\s]+/g, '-').replace(/[^-a-zA-Z0-9._~]/g, '');
        }
    }
});