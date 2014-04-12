define(['grasshopperModel', 'masseuse'], function (Model, masseuse) {
    'use strict';

    var ComputedProperty = masseuse.ComputedProperty;

    return Model.extend({
        defaults : {
            label : new ComputedProperty(['fields'], function(fields) {
                return fields[this.get('meta.fieldlabel')];
            })
        }
    });

});