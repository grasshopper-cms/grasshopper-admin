define(['sparkmd5'], function (sparkmd5) {
    'use strict';

    /**
     * @namespace formatters
     */
    return {
        prepend: prepend,
        isGreaterThan: isGreaterThan,
        asNumber: {
            read: readAsNumber,
            publish: publishAsNumber
        },
        hasLength: hasLength,
        sort: sort,
        sortBy: sortBy,
        gravatarUrl: gravatarUrl
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
        return (value && value.length > 0);
    }

    function sort(arr, direction) {
        if (direction === 'desc') {
            return arr.sort().reverse();
        }
        return arr.sort();
    }

    function sortBy(arr, field, direction) {
        var reverse = (direction === 'desc'),
            out,
            sortFn = function (a, b) {
                if (a[field] < b[field]) {
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

    function gravatarUrl(email, args) {
        var md5value = sparkmd5.hash(email.toLowerCase());/*
            getAbsServerUrl = function () {
                return  window.location.protocol + '//' + window.location.host +
                    window.location.pathname.substring(0, window.location.pathname.lastIndexOf(' / ')) + '/';
            },
            defaultImageAbsUrl;
        // ip addr or localhost
        if (window.location.hostname.indexOf('localhost') === 0 || /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}/.test(window.location.hostname)) {
            // mystery man
            defaultImageAbsUrl = 'mm';
        }
        else {
            defaultImageAbsUrl = getAbsServerUrl + '{{RESOURCEREF:themes/img/default-avatar.png}}';
        }*/
        return 'http://www.gravatar.com/avatar/' + md5value + '?s=' + args + '&d=mm';
    }
});