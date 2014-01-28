define(['grasshopperModel', 'resources', 'constants', 'masseuse', 'helpers'],
    function (Model, resources, constants, masseuse, helpers) {
    'use strict';

    var ComputedProperty = masseuse.ComputedProperty,
        validation = helpers.validation;

    return Model.extend({
        defaults : {
            resources : resources,
            fields : {},
            slug : new ComputedProperty(['label'], function(label) {
                return toUnderscore(label);
            }, true),
            labelHasError : new ComputedProperty(['label'], validatePresence, true)

        },
        urlRoot : constants.api.content.url
    });

    function toUnderscore(string){
        return string.trim().toLowerCase().replace(/ /g, '_');
    }

    function validatePresence(string) {
        return !validation.stringHasLength(string);
    }
});