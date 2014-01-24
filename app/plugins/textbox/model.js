define(['grasshopperModel', 'masseuse'], function (Model, masseuse) {
    'use strict';

    var ComputedProperty = masseuse.ComputedProperty;

    return Model.extend({
        defaults : {
            errorMessage: new ComputedProperty(['label'], function(label) {
                return label + ' is a required field.';
            })
        }
    });
});