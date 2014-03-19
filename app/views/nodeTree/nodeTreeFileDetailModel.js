define(['grasshopperModel', 'masseuse', 'underscore'],
    function (Model, masseuse, _) {

        'use strict';

        var ComputedProperty = masseuse.ComputedProperty;

        return Model.extend({
            defaults : {
                fileName : new ComputedProperty(['url'], function (url) {
                    return (url) ? _.last(url.split('/')) : '';
                }),
                _id : new ComputedProperty(['url'], function (url) {
                    return url;
                }),
                label : new ComputedProperty(['fileName'], function (fileName) {
                    return fileName;
                })
            }
        });

    });