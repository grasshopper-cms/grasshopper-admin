define(['grasshopperCollection', 'backbone', 'underscore'], function (GrasshopperCollection, Backbone, _) {
    'use strict';

    return GrasshopperCollection.extend({
        reduceOptions : reduceOptions,
        reduceValues : reduceValues,
        hydrateOptionsWithValues : hydrateOptionsWithValues
    });

    function reduceOptions() {
        var json = Backbone.Collection.prototype.toJSON.apply(this);

        return _.map(json, function(option) {
            return  _.pick(option, '_id', 'label', 'isDefault');
        });
    }

    function reduceValues() {
        var json = Backbone.Collection.prototype.toJSON.apply(this);
            // obj = {};

        // _.each(json, function(option) {
        //     obj[option._id] = !!option.isDefault;
        // });

        return json;
    }

    function hydrateOptionsWithValues(values) {
        // var self = this;
        values;
        // _.each(values, function(value, key) {
        //     self.findWhere({ _id : key }).set('checked', value);
        // });
    }

});
