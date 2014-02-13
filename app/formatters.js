define([], function () {
    'use strict';

    /**
     * @namespace formatters
     */
    return {
        prepend : prepend,
        asNumber : {
            read : readAsNumber,
            publish : publishAsNumber
        }
    };

    /**
     * @memberof formatters
     * @instance
     * @param value
     * @returns {string}
     */

    function prepend(value, string) {
        return string + value;
    }

    function readAsNumber(value) {
        return value;
    }

    function publishAsNumber(value) {
        return parseInt(value, 10);
    }
});