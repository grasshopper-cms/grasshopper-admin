define(['grasshopperModel', 'masseuse', 'helpers'], function (Model, masseuse, helpers) {
    'use strict';

    var ComputedProperty = masseuse.ComputedProperty,
        validation = helpers.validation;

    return Model.extend({
        defaults : {
            _id : new ComputedProperty(['label'], generateSlug),
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

    function generateSlug(label) {
        return label.replace(/ /g,'').toLowerCase();
    }

});