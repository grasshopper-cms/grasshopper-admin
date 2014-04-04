define(['underscore'], function (_) {
    'use strict';

    return cleanCollection;

    function cleanCollection(collection){
        _.each(collection, function(value, key) {
            if(_.isObject(value) || _.isArray(value)) {
                cleanCollection(value);
            }

            if(_.isUndefined(value) || _.isNull(value) || _.isEmpty(value) || _.isNaN(value)) {
                delete collection[key];
            }
        });

        return collection;
    }
});