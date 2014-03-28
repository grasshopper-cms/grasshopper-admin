/*global define:false*/
define([], function () {
    'use strict';

    return {
        asSlug : asSlug
    };

    function asSlug(value) {
        if(value) {
            return value.toLowerCase().replace(/ /g, '_');
        }
    }
});