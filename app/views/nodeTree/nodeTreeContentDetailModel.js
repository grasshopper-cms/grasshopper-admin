define(['grasshopperModel', 'masseuse', 'underscore'], function (Model, masseuse, _) {
    'use strict';

    var ComputedProperty = masseuse.ComputedProperty;

    return Model.extend({
        defaults : {
            label : new ComputedProperty(['type'], function(type) {
                var firstFieldId;
                if(type) {
                    firstFieldId = _.first(_.findWhere(this.get('availableTypes'), { _id : type }).fields)._id;
                    return this.get('fields.'+ firstFieldId);
                }
            })
        }
    });

});