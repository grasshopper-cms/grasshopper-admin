define([], function () {
    'use strict';

    /**
     * @namespace formatters
     */
    return {
        collectionHasLength : collectionHasLength
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
});