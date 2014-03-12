define(['underscore'],
    function (_) {
        'use strict';

        return {
            parseUrlToJson : parseUrlToJson
        };

        function parseUrlToJson(location) {
            var datum = location.split('&'),
                result = {},
                item;

            _.each(datum, function(data) {
                item = data.split('=');
                result[item[0]] = item[1];
            });

            return result;
        }

    });