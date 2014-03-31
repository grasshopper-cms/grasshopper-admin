/*global define:false*/
define(['backbone', 'fieldAccordionModel', 'underscore'], function(Backbone, fieldAccordionModel, _) {
    'use strict';

    return Backbone.Collection.extend({
        model : fieldAccordionModel,
        toJSON: function () {
            var json = Backbone.Collection.prototype.toJSON.apply(this);

            return _.map(json, function(obj) {
                return _.pick(obj, 'required', 'label', 'max', 'min',
                    'options', 'type', 'validation', '_id', 'useAsLabel', 'helpText', 'defaultValue');
            });
        }
    });
});