/*global define:false*/
define(['backbone', 'pluginSetupModel', 'underscore'], function(Backbone, PluginSetupModel, _) {
    'use strict';

    return Backbone.Collection.extend({
        model : PluginSetupModel,
        toJSON: function () {
            var json = Backbone.Collection.prototype.toJSON.apply(this);

            return _.map(json, function(obj) {
                return _.pick(obj, 'required', 'label', 'max', 'min',
                    'options', 'type', 'validation', '_id', 'useAsLabel', 'helpText', 'defaultValue');
            });
        }
    });
});