define(['grasshopperModel', 'masseuse'], function (Model, masseuse) {
    'use strict';

    var ComputedProperty = masseuse.ComputedProperty;

    return Model.extend({
        defaults : {
            _id : new ComputedProperty(['label'], generateSlug)
        }
    });

    function generateSlug(label) {
        return label.replace(/ /g,'').toLowerCase();
    }
});