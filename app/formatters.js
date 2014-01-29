define([], function () {
    'use strict';

    /**
     * @namespace formatters
     */
    return {
        prepend : prepend
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
});