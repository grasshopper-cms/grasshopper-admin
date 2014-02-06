define([], function () {
    'use strict';

    /**
     * @namespace formatters
     */
    return {
        collectionHasLength : collectionHasLength,
        booleanToYesNo : booleanToYesNo
    };

    /**
     * @memberof formatters
     * @instance
     * @param value
     * @returns {string}
     */

    function collectionHasLength(collection) {
        return (collection.length);
    }

    function booleanToYesNo(value) {
        return (value) ? 'Yes' : 'No';
    }
});