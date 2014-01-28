define(['grasshopperModel', 'masseuse', 'helpers'], function (Model, masseuse, helpers) {
    'use strict';

    var ComputedProperty = masseuse.ComputedProperty,
        validation = helpers.validation;

    return Model.extend({
        defaults : {
            hasError: new ComputedProperty(['value', 'required'], validatePresence, true),
            errorMessage: new ComputedProperty(['label'], function(label) {
                return label + ' is a required field.';
            })
        }
    });

    function validatePresence(value, required) {
        if (required) {
            return !validation.stringHasLength(value);
        }
        return false;
    }

});