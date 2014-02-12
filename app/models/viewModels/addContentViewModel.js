define(['grasshopperModel', 'resources', 'constants', 'masseuse', 'helpers', 'underscore'],
    function (Model, resources, constants, masseuse, helpers, _) {
    'use strict';

    var ComputedProperty = masseuse.ComputedProperty,
        validation = helpers.validation,
        ProxyProperty = masseuse.ProxyProperty;

    return Model.extend({
        initialize : initialize,
        defaults : {
            resources : resources,
            fields : {},
            slug : new ComputedProperty(['label'], _toUnderscore, true),
            labelHasError : new ComputedProperty(['label'], _validatePresence, true)
        },
        urlRoot : constants.api.content.url
    });

    function initialize() {
        this.on('change:schema', _findAndSetUseAsLabel, this);
    }

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

    function _findAndSetUseAsLabel() {
        var propertyName = _.findWhere(this.get('schema'), { useAsLabel : true })._id;

        this.set('label', new ProxyProperty('fields.' + propertyName, this));
    }
});