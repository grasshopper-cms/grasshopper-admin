define([], function () {
    'use strict';

    /**
     * @namespace formatters
     */
    return {
        prepend : prepend,
        isGreaterThan : isGreaterThan,
        asNumber : {
            read : readAsNumber,
            publish : publishAsNumber
        },
        hasLength : hasLength,
        sort : sort,
        sortBy : sortBy
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

    function isGreaterThan(value, compareTo) {
        return value > compareTo;
    }

    function readAsNumber(value) {
        return value;
    }

    function publishAsNumber(value) {
        return parseInt(value, 10);
    }

    function hasLength(value) {
        return (value.length > 0);
    }

    function sort(arr, direction) {
        if(direction === 'desc') {
            return arr.sort().reverse();
        }
        return arr.sort();
    }

    function sortBy(arr, field, direction) {
        var reverse = (direction === 'desc'),
            out,
            sortFn = function(a, b) {
                if(a[field] < b[field]) {
                    out = -1;
                } else if (a[field] > b[field]) {
                    out = 1;
                } else {
                    out = 0;
                }

                return out * [1, -1][+!!reverse];
            };

        return arr.sort(sortFn);

    }
});