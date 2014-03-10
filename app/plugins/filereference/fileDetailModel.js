define(['grasshopperModel', 'masseuse', 'underscore'],
    function (Model, masseuse, _) {

        'use strict';

        var ComputedProperty = masseuse.ComputedProperty;

        return Model.extend({
            defaults : {
                fileName : new ComputedProperty(['url'], function (url) {
                    return (url) ? _.last(url.split('/')) : '';
                })
            }
        });

    });