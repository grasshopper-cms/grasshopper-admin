define(['grasshopperModel', 'resources', 'constants', 'masseuse', 'helpers', 'underscore'],
    function (Model, resources, constants, masseuse, helpers, _) {
    'use strict';

    var ComputedProperty = masseuse.ComputedProperty,
        validation = helpers.validation;

    return Model.extend({
        defaults : {
            resources : resources,
            fields : {},
            slug : new ComputedProperty(['label'], _toUnderscore, true),
            label : new ComputedProperty(['schema'], _findAndSetUseAsLabel, true),
            labelHasError : new ComputedProperty(['label'], _validatePresence, true)
        },
        urlRoot : constants.api.content.url
    });

    function _toUnderscore(string){
        if(string) {
            return string.trim().toLowerCase().replace(/ /g, '_');
        } else {
            return '';
        }
    }

    function _validatePresence(string) {
        return !validation.stringHasLength(string);
    }

    function _findAndSetUseAsLabel(schema) {
        var propertyName = _.findWhere(schema, { useAsLabel : true })._id;

        return this.get('fields.' + propertyName);
    }
});